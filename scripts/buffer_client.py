"""Thin wrapper around Buffer GraphQL API.

Endpoint: https://api.buffer.com/graphql
Auth:     Bearer token (loaded from BufferConfig)

createPost returns a PostActionPayload UNION; deletePost returns a
DeletePostPayload UNION. Each has its own success / error members:

  PostActionPayload:
    PostActionSuccess { post { id } }
    NotFoundError, UnauthorizedError, UnexpectedError,
    RestProxyError, LimitReachedError, InvalidInputError { message }

  DeletePostPayload:
    DeletePostSuccess { id }
    VoidMutationError { message }

CreatePostInput required fields (verified via schema introspection):
  channelId (single ChannelId scalar), text, schedulingType
  (automatic|notification), mode (addToQueue|shareNow|shareNext|
  customScheduled|recommendedTime), assets (NON_NULL list, may be empty).
saveToDraft is an optional Boolean that overrides scheduling behavior.
"""
from __future__ import annotations

import json
from typing import Optional

import requests

from scripts.buffer_config import BufferConfig


GRAPHQL_ENDPOINT = "https://api.buffer.com/graphql"


_CREATE_FRAGMENT = """
    __typename
    ... on PostActionSuccess { post { id } }
    ... on NotFoundError { message }
    ... on UnauthorizedError { message }
    ... on UnexpectedError { message }
    ... on RestProxyError { message code link }
    ... on LimitReachedError { message }
    ... on InvalidInputError { message }
"""

_DELETE_FRAGMENT = """
    __typename
    ... on DeletePostSuccess { id }
    ... on VoidMutationError { message }
"""


class BufferAPIError(Exception):
    """Raised when Buffer returns an error response."""


class BufferClient:
    def __init__(self, config: BufferConfig, *, timeout: float = 15.0):
        self._config = config
        self._timeout = timeout
        self._session = requests.Session()
        self._session.headers.update({
            "Authorization": f"Bearer {config.access_token}",
            "Content-Type": "application/json",
        })

    def _post(self, query: str, variables: Optional[dict] = None) -> dict:
        payload = {"query": query}
        if variables is not None:
            payload["variables"] = variables

        resp = self._session.post(
            GRAPHQL_ENDPOINT,
            data=json.dumps(payload),
            timeout=self._timeout,
        )

        if resp.status_code != 200:
            raise BufferAPIError(f"HTTP {resp.status_code}: {resp.text[:500]}")

        body = resp.json()
        if "errors" in body and body["errors"]:
            raise BufferAPIError(json.dumps(body["errors"]))

        return body.get("data", {})

    def create_post(
        self,
        *,
        channel_id: str,
        text: str,
        due_at: Optional[str] = None,
        save_to_draft: bool = False,
    ) -> str:
        if not text or not text.strip():
            raise ValueError("text must be non-empty")

        mutation = (
            "mutation CreatePost($input: CreatePostInput!) {\n"
            "  createPost(input: $input) {"
            + _CREATE_FRAGMENT
            + "  }\n}"
        )
        mode = "customScheduled" if (due_at and not save_to_draft) else "addToQueue"
        variables = {
            "input": {
                "channelId": channel_id,
                "text": text,
                "schedulingType": "automatic",
                "mode": mode,
                "saveToDraft": save_to_draft,
                "assets": [],
            }
        }
        if due_at and not save_to_draft:
            variables["input"]["dueAt"] = due_at

        data = self._post(mutation, variables)
        result = data.get("createPost") or {}
        typename = result.get("__typename")
        if typename == "PostActionSuccess":
            post = result.get("post") or {}
            post_id = post.get("id")
            if not post_id:
                raise BufferAPIError(
                    f"createPost: PostActionSuccess returned no post.id ({result})"
                )
            return post_id
        message = result.get("message", "")
        raise BufferAPIError(f"createPost: {typename}: {message}")

    def create_thread(
        self,
        *,
        channel_id: str,
        segments: list[str],
        due_at: Optional[str] = None,
        save_to_draft: bool = False,
    ) -> str:
        """Create an X thread (multi-tweet post).

        First segment becomes the head tweet (text field). Remaining segments
        are added under metadata.twitter.thread as ThreadedPostInput items.
        """
        if len(segments) < 2:
            raise ValueError("Thread requires at least 2 segments")
        for i, s in enumerate(segments):
            if len(s) > 280:
                raise ValueError(
                    f"Segment {i} is {len(s)} chars (X limit is 280)"
                )

        head, *rest = segments
        thread_items = [{"text": s, "assets": []} for s in rest]

        mutation = (
            "mutation CreatePost($input: CreatePostInput!) {\n"
            "  createPost(input: $input) {"
            + _CREATE_FRAGMENT
            + "  }\n}"
        )
        mode = "customScheduled" if (due_at and not save_to_draft) else "addToQueue"
        variables = {
            "input": {
                "channelId": channel_id,
                "text": head,
                "schedulingType": "automatic",
                "mode": mode,
                "saveToDraft": save_to_draft,
                "assets": [],
                "metadata": {
                    "twitter": {
                        "thread": thread_items,
                    }
                },
            }
        }
        if due_at and not save_to_draft:
            variables["input"]["dueAt"] = due_at

        data = self._post(mutation, variables)
        result = data.get("createPost") or {}
        typename = result.get("__typename")
        if typename == "PostActionSuccess":
            post = result.get("post") or {}
            post_id = post.get("id")
            if not post_id:
                raise BufferAPIError(
                    f"create_thread: PostActionSuccess returned no post.id ({result})"
                )
            return post_id
        message = result.get("message", "")
        raise BufferAPIError(f"create_thread: {typename}: {message}")

    def delete_post(self, post_id: str) -> bool:
        mutation = (
            "mutation DeletePost($input: DeletePostInput!) {\n"
            "  deletePost(input: $input) {"
            + _DELETE_FRAGMENT
            + "  }\n}"
        )
        variables = {"input": {"id": post_id}}
        data = self._post(mutation, variables)
        result = data.get("deletePost") or {}
        typename = result.get("__typename")
        if typename == "DeletePostSuccess":
            return True
        message = result.get("message", "")
        raise BufferAPIError(f"deletePost: {typename}: {message}")
