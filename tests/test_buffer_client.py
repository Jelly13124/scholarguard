"""Integration tests for buffer_client.py against the live Buffer GraphQL API.

All tests use saveToDraft=True. Posts created are deleted in teardown.
Tests will skip if BUFFER_ACCESS_TOKEN is not set.
"""
import pytest
from scripts.buffer_client import BufferClient
from scripts.buffer_config import BufferConfig


@pytest.fixture
def client(buffer_token):
    cfg = BufferConfig.from_env()
    return BufferClient(cfg)


def test_create_draft_post_to_x_returns_id(client, channel_x):
    post_id = client.create_post(
        channel_id=channel_x,
        text="TEST: foundation smoke test, ignore",
        save_to_draft=True,
    )

    assert post_id, "createPost should return a non-empty id"
    assert isinstance(post_id, str)

    client.delete_post(post_id)


def test_delete_post_removes_it(client, channel_x):
    post_id = client.create_post(
        channel_id=channel_x,
        text="TEST: will be deleted immediately",
        save_to_draft=True,
    )
    assert post_id

    deleted = client.delete_post(post_id)
    assert deleted is True


def test_create_post_raises_on_missing_text(client, channel_x):
    with pytest.raises(ValueError, match="text"):
        client.create_post(channel_id=channel_x, text="", save_to_draft=True)
