# The Appeal Lab — Week 1 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete all pre-launch foundation work so Week 2 content production can begin with zero blockers — external service accounts active, Buffer scheduling automation working end-to-end, brand voice documented, and first 10 anonymized cases ready to consume.

**Architecture:** Three layers. **(1) External accounts:** user manually creates/configures X, Buffer, ConvertKit, Cal.com, domain, Gemini API. **(2) Automation layer:** Python module wrapping Buffer GraphQL API with tested `create_post` / `delete_post` / `create_thread` functions; auto-loads token from `.env`. **(3) Content prep:** `cases/` directory holding 10 markdown files following a fixed anonymization template, plus a `voice/` directory with the generated brand voice doc.

**Tech Stack:** Python 3.10+, `requests`, `python-dotenv`, `pytest`, Buffer GraphQL API at `https://api.buffer.com/graphql`, Claude Code skills (`voice-builder` from `charlie947/social-media-skills`).

**Spec reference:** `docs/superpowers/specs/2026-05-20-appeal-lab-content-system-design.md`

**Estimated time:** 8-10 hours total for Week 1 (this is the brief's acknowledged W1-2 ramp window; steady state drops to 3-5 h/week from W3+).

---

## File Structure

Files this plan creates or touches:

```
social_media_auto/
├── .env                                  (already exists, append GEMINI_API_KEY)
├── .env.example                          CREATE — placeholder copy for reference
├── .gitignore                            MODIFY — add .venv
├── requirements.txt                      CREATE — Python deps
├── scripts/
│   ├── __init__.py                       CREATE — empty marker
│   ├── buffer_config.py                  CREATE — env loader + channel IDs
│   └── buffer_client.py                  CREATE — GraphQL wrapper (createPost, deletePost, etc.)
├── tests/
│   ├── __init__.py                       CREATE — empty marker
│   ├── conftest.py                       CREATE — pytest fixtures
│   ├── test_buffer_config.py             CREATE — config loader tests
│   └── test_buffer_client.py             CREATE — integration tests against Buffer draft mode
├── cases/
│   ├── CASE-TEMPLATE.md                  CREATE — C-S-O + anonymization template
│   └── CASE-001..010-*.md                CREATE — 10 anonymized real cases
├── voice/
│   └── the-appeal-lab-voice.md           CREATE — output of voice-builder skill
└── docs/superpowers/plans/
    └── 2026-05-21-appeal-lab-week-1-foundation.md   (this file)
```

---

## Task 1: Python Environment Setup

**Files:**
- Modify: `C:\Users\Jerry\Desktop\social_media_auto\.gitignore`
- Create: `C:\Users\Jerry\Desktop\social_media_auto\requirements.txt`

- [ ] **Step 1: Verify Python 3.10+ is installed**

Run in PowerShell:
```powershell
python --version
```

Expected: `Python 3.10.x` or higher. If missing or older, install Python 3.12 from https://www.python.org/downloads/ (check "Add to PATH" during install) and reopen PowerShell.

- [ ] **Step 2: Add .venv to .gitignore**

The current `.gitignore` already has `.venv/`. Verify with:
```powershell
Select-String -Path .gitignore -Pattern "^\.venv"
```

Expected: one match `.venv/`. If missing, append it:
```powershell
Add-Content -Path .gitignore -Value "`n.venv/"
```

- [ ] **Step 3: Create virtual environment**

```powershell
python -m venv .venv
```

Expected: `.venv` directory created, no output on success.

- [ ] **Step 4: Activate venv**

```powershell
.\.venv\Scripts\Activate.ps1
```

Expected: prompt prefix changes to `(.venv)`. If you get an execution policy error, run once:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
Then re-activate.

- [ ] **Step 5: Create requirements.txt**

Write file `requirements.txt`:
```
requests==2.32.3
python-dotenv==1.0.1
pytest==8.3.4
```

- [ ] **Step 6: Install dependencies**

```powershell
pip install -r requirements.txt
```

Expected: `Successfully installed ...` lines for all three packages.

- [ ] **Step 7: Verify imports**

```powershell
python -c "import requests, dotenv, pytest; print('OK')"
```

Expected: `OK`

- [ ] **Step 8: Commit**

```powershell
git add .gitignore requirements.txt
git -c user.name="The Appeal Lab" -c user.email="noreply@theappeallab.com" commit -m "chore: add python venv + requirements"
```

---

## Task 2: Project Directory Scaffolding

**Files:**
- Create: `scripts/__init__.py`, `tests/__init__.py`, `tests/conftest.py`
- Create: `cases/.gitkeep`, `voice/.gitkeep`, `lead-magnets/.gitkeep`, `kpi/.gitkeep`, `posts/.gitkeep`, `web/.gitkeep`

- [ ] **Step 1: Create directory structure**

```powershell
New-Item -ItemType Directory -Force -Path scripts, tests, cases, voice, "lead-magnets", kpi, posts, web | Out-Null
```

- [ ] **Step 2: Create empty marker files**

```powershell
"" | Set-Content scripts\__init__.py
"" | Set-Content tests\__init__.py
"" | Set-Content cases\.gitkeep
"" | Set-Content voice\.gitkeep
"" | Set-Content lead-magnets\.gitkeep
"" | Set-Content kpi\.gitkeep
"" | Set-Content posts\.gitkeep
"" | Set-Content web\.gitkeep
```

- [ ] **Step 3: Create conftest.py with shared fixtures**

Write file `tests/conftest.py`:
```python
"""Pytest fixtures shared across tests."""
import os
import pytest
from dotenv import load_dotenv

load_dotenv()


@pytest.fixture(scope="session")
def buffer_token():
    token = os.getenv("BUFFER_ACCESS_TOKEN")
    if not token:
        pytest.skip("BUFFER_ACCESS_TOKEN not set in .env")
    return token


@pytest.fixture(scope="session")
def channel_x():
    cid = os.getenv("BUFFER_CHANNEL_X")
    if not cid:
        pytest.skip("BUFFER_CHANNEL_X not set in .env")
    return cid


@pytest.fixture(scope="session")
def channel_ig():
    cid = os.getenv("BUFFER_CHANNEL_IG")
    if not cid:
        pytest.skip("BUFFER_CHANNEL_IG not set in .env")
    return cid
```

- [ ] **Step 4: Commit scaffolding**

```powershell
git add scripts/__init__.py tests/__init__.py tests/conftest.py cases/.gitkeep voice/.gitkeep lead-magnets/.gitkeep kpi/.gitkeep posts/.gitkeep web/.gitkeep
git -c user.name="The Appeal Lab" -c user.email="noreply@theappeallab.com" commit -m "chore: scaffold project directory layout"
```

---

## Task 3: Buffer Config Module (TDD)

**Files:**
- Create: `scripts/buffer_config.py`
- Create: `tests/test_buffer_config.py`

- [ ] **Step 1: Write the failing test**

Write file `tests/test_buffer_config.py`:
```python
"""Tests for buffer_config.py — env loading and validation."""
import pytest
from scripts.buffer_config import BufferConfig, ConfigError


@pytest.fixture(autouse=True)
def _disable_dotenv_reload(monkeypatch):
    """Prevent load_dotenv() inside from_env() from re-reading the real .env file
    during tests, so monkeypatch.delenv/.setenv stays authoritative."""
    monkeypatch.setattr("scripts.buffer_config.load_dotenv", lambda *a, **kw: None)


def test_config_loads_from_env(monkeypatch):
    monkeypatch.setenv("BUFFER_ACCESS_TOKEN", "test-token")
    monkeypatch.setenv("BUFFER_CHANNEL_X", "x-id")
    monkeypatch.setenv("BUFFER_CHANNEL_IG", "ig-id")
    monkeypatch.setenv("BUFFER_ORG_ID", "org-id")

    cfg = BufferConfig.from_env()

    assert cfg.access_token == "test-token"
    assert cfg.channel_x == "x-id"
    assert cfg.channel_ig == "ig-id"
    assert cfg.org_id == "org-id"


def test_config_raises_when_token_missing(monkeypatch):
    monkeypatch.delenv("BUFFER_ACCESS_TOKEN", raising=False)
    monkeypatch.setenv("BUFFER_CHANNEL_X", "x-id")
    monkeypatch.setenv("BUFFER_CHANNEL_IG", "ig-id")
    monkeypatch.setenv("BUFFER_ORG_ID", "org-id")

    with pytest.raises(ConfigError, match="BUFFER_ACCESS_TOKEN"):
        BufferConfig.from_env()


def test_config_raises_when_channel_missing(monkeypatch):
    monkeypatch.setenv("BUFFER_ACCESS_TOKEN", "test-token")
    monkeypatch.delenv("BUFFER_CHANNEL_X", raising=False)
    monkeypatch.setenv("BUFFER_CHANNEL_IG", "ig-id")
    monkeypatch.setenv("BUFFER_ORG_ID", "org-id")

    with pytest.raises(ConfigError, match="BUFFER_CHANNEL_X"):
        BufferConfig.from_env()
```

**Note:** The autouse `_disable_dotenv_reload` fixture is required because `conftest.py` calls `load_dotenv()` at module level, and `from_env()` also calls it; without the stub, `monkeypatch.delenv` is undone when `load_dotenv()` re-reads the real `.env`. Production code unaffected.

- [ ] **Step 2: Run test to verify it fails**

```powershell
pytest tests/test_buffer_config.py -v
```

Expected: `ModuleNotFoundError: No module named 'scripts.buffer_config'`

- [ ] **Step 3: Implement buffer_config.py**

Write file `scripts/buffer_config.py`:
```python
"""Configuration loader for Buffer API client.

Reads credentials from environment variables (loaded from .env by
python-dotenv). Fails loudly if anything required is missing — we
never want to hit the API with a partially-configured client.
"""
from __future__ import annotations

import os
from dataclasses import dataclass
from dotenv import load_dotenv


class ConfigError(Exception):
    """Raised when required configuration is missing or invalid."""


@dataclass(frozen=True)
class BufferConfig:
    access_token: str
    channel_x: str
    channel_ig: str
    org_id: str

    @classmethod
    def from_env(cls) -> "BufferConfig":
        load_dotenv()

        required = {
            "BUFFER_ACCESS_TOKEN": os.getenv("BUFFER_ACCESS_TOKEN"),
            "BUFFER_CHANNEL_X": os.getenv("BUFFER_CHANNEL_X"),
            "BUFFER_CHANNEL_IG": os.getenv("BUFFER_CHANNEL_IG"),
            "BUFFER_ORG_ID": os.getenv("BUFFER_ORG_ID"),
        }
        missing = [k for k, v in required.items() if not v]
        if missing:
            raise ConfigError(
                f"Missing required env vars: {', '.join(missing)}. "
                f"Check your .env file."
            )

        return cls(
            access_token=required["BUFFER_ACCESS_TOKEN"],
            channel_x=required["BUFFER_CHANNEL_X"],
            channel_ig=required["BUFFER_CHANNEL_IG"],
            org_id=required["BUFFER_ORG_ID"],
        )
```

- [ ] **Step 4: Run test to verify it passes**

```powershell
pytest tests/test_buffer_config.py -v
```

Expected: 3 passed.

- [ ] **Step 5: Commit**

```powershell
git add scripts/buffer_config.py tests/test_buffer_config.py
git -c user.name="The Appeal Lab" -c user.email="noreply@theappeallab.com" commit -m "feat: add buffer config loader with env validation"
```

---

## Task 4: Buffer GraphQL Client — createPost + deletePost (TDD)

**Files:**
- Create: `scripts/buffer_client.py`
- Create: `tests/test_buffer_client.py`

This task uses real Buffer API integration tests in **draft mode** (`saveToDraft: true`) so we never publish accidental content. Every test that creates a post also deletes it in teardown.

- [ ] **Step 1: Write the failing integration test for createPost (as draft)**

Write file `tests/test_buffer_client.py`:
```python
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

    # cleanup
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
```

- [ ] **Step 2: Run test to verify it fails**

```powershell
pytest tests/test_buffer_client.py -v
```

Expected: `ModuleNotFoundError: No module named 'scripts.buffer_client'`

- [ ] **Step 3: Implement minimal BufferClient with createPost and deletePost**

Write file `scripts/buffer_client.py`:
```python
"""Thin wrapper around Buffer GraphQL API.

Endpoint: https://api.buffer.com/graphql
Auth:     Bearer token (loaded from BufferConfig)

Only the operations needed for The Appeal Lab content pipeline are
exposed. Threads (X multi-tweet) are added in a separate method.
"""
from __future__ import annotations

import json
from typing import Optional

import requests

from scripts.buffer_config import BufferConfig


GRAPHQL_ENDPOINT = "https://api.buffer.com/graphql"


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
            raise BufferAPIError(
                f"HTTP {resp.status_code}: {resp.text[:500]}"
            )

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
        """Create a single post on one channel. Returns post id.

        Args:
            channel_id: Buffer channel id (e.g. self._config.channel_x)
            text: post text (X: <=280 chars; IG: caption)
            due_at: ISO-8601 datetime UTC; if None and not draft, queues to next slot
            save_to_draft: if True, post is saved as draft, not scheduled
        """
        if not text or not text.strip():
            raise ValueError("text must be non-empty")

        mutation = """
        mutation CreatePost($input: CreatePostInput!) {
          createPost(input: $input) {
            id
            __typename
          }
        }
        """
        scheduling_type = ["draft"] if save_to_draft else (["scheduled"] if due_at else ["queue"])
        variables = {
            "input": {
                "channelId": [channel_id],
                "text": text,
                "schedulingType": scheduling_type,
                "saveToDraft": save_to_draft,
                "assets": [],
            }
        }
        if due_at and not save_to_draft:
            variables["input"]["dueAt"] = due_at

        data = self._post(mutation, variables)
        result = data.get("createPost") or {}
        post_id = result.get("id")
        if not post_id:
            raise BufferAPIError(f"createPost returned no id: {data}")
        return post_id

    def delete_post(self, post_id: str) -> bool:
        """Delete a post by id. Returns True on success."""
        mutation = """
        mutation DeletePost($input: DeletePostInput!) {
          deletePost(input: $input) {
            id
            __typename
          }
        }
        """
        variables = {"input": {"id": [post_id]}}
        self._post(mutation, variables)
        return True
```

- [ ] **Step 4: Run tests to verify they pass**

```powershell
pytest tests/test_buffer_client.py -v
```

Expected: 3 passed.

If `create_draft_post_to_x_returns_id` fails with a Buffer error mentioning required asset/media, the GraphQL schema may demand at least an empty asset list — confirm `assets: []` is in the variables payload. (It is in the implementation above; check the raw error.)

- [ ] **Step 5: Commit**

```powershell
git add scripts/buffer_client.py tests/test_buffer_client.py
git -c user.name="The Appeal Lab" -c user.email="noreply@theappeallab.com" commit -m "feat: buffer client with createPost and deletePost (draft mode)"
```

---

## Task 5: Buffer Client — X Thread Support (TDD)

**Files:**
- Modify: `scripts/buffer_client.py`
- Modify: `tests/test_buffer_client.py`

X threads use `PostInputMetaData.twitter` with `threadedPosts` (per spec introspection results showing `ThreadedPostInput` exists). We test this by creating a 3-tweet thread as draft and deleting it.

- [ ] **Step 1: Write the failing test**

Append to `tests/test_buffer_client.py`:
```python
def test_create_x_thread_returns_id(client, channel_x):
    segments = [
        "TEST thread 1/3: foundation smoke test",
        "TEST thread 2/3: continuation",
        "TEST thread 3/3: end. ignore.",
    ]
    post_id = client.create_thread(
        channel_id=channel_x,
        segments=segments,
        save_to_draft=True,
    )
    assert post_id

    # cleanup
    client.delete_post(post_id)


def test_create_thread_rejects_short_segment_list(client, channel_x):
    with pytest.raises(ValueError, match="at least 2"):
        client.create_thread(
            channel_id=channel_x,
            segments=["just one"],
            save_to_draft=True,
        )


def test_create_thread_rejects_oversized_tweet(client, channel_x):
    with pytest.raises(ValueError, match="280"):
        client.create_thread(
            channel_id=channel_x,
            segments=["short tweet", "x" * 281],
            save_to_draft=True,
        )
```

- [ ] **Step 2: Run tests to verify failure**

```powershell
pytest tests/test_buffer_client.py -k thread -v
```

Expected: `AttributeError: 'BufferClient' object has no attribute 'create_thread'`

- [ ] **Step 3: Add create_thread method**

Append to `scripts/buffer_client.py` inside the `BufferClient` class (before the final closing of the class — add as a new method below `delete_post`):
```python
    def create_thread(
        self,
        *,
        channel_id: str,
        segments: list[str],
        due_at: Optional[str] = None,
        save_to_draft: bool = False,
    ) -> str:
        """Create an X thread (multi-tweet post).

        First segment becomes the head tweet (text field). Remaining
        segments are added as ThreadedPostInput in twitter metadata.
        """
        if len(segments) < 2:
            raise ValueError("Thread requires at least 2 segments")
        for i, s in enumerate(segments):
            if len(s) > 280:
                raise ValueError(
                    f"Segment {i} is {len(s)} chars (X limit is 280)"
                )

        head, *rest = segments
        threaded_posts = [{"text": s, "assets": []} for s in rest]

        mutation = """
        mutation CreatePost($input: CreatePostInput!) {
          createPost(input: $input) {
            id
            __typename
          }
        }
        """
        scheduling_type = ["draft"] if save_to_draft else (["scheduled"] if due_at else ["queue"])
        variables = {
            "input": {
                "channelId": [channel_id],
                "text": head,
                "schedulingType": scheduling_type,
                "saveToDraft": save_to_draft,
                "assets": [],
                "metadata": {
                    "twitter": {
                        "threadedPosts": threaded_posts,
                    }
                },
            }
        }
        if due_at and not save_to_draft:
            variables["input"]["dueAt"] = due_at

        data = self._post(mutation, variables)
        result = data.get("createPost") or {}
        post_id = result.get("id")
        if not post_id:
            raise BufferAPIError(f"createPost (thread) returned no id: {data}")
        return post_id
```

- [ ] **Step 4: Run all client tests to verify passing**

```powershell
pytest tests/test_buffer_client.py -v
```

Expected: 6 passed.

If the GraphQL schema rejects `threadedPosts` (e.g. field name mismatch), run an introspection check:
```powershell
$token = (Get-Content .env | Select-String "^BUFFER_ACCESS_TOKEN=").ToString().Split("=")[1]; $body = '{"query":"{ __type(name: \"TwitterPostMetadataInput\") { inputFields { name } } }"}'; (Invoke-WebRequest -Uri "https://api.buffer.com/graphql" -Headers @{Authorization="Bearer $token"; "Content-Type"="application/json"} -Method Post -Body $body -UseBasicParsing).Content
```
Adjust the field name in `metadata.twitter` accordingly and rerun the tests.

- [ ] **Step 5: Commit**

```powershell
git add scripts/buffer_client.py tests/test_buffer_client.py
git -c user.name="The Appeal Lab" -c user.email="noreply@theappeallab.com" commit -m "feat: x thread support via threadedPosts metadata"
```

---

## Task 6: Create .env.example for Reference

**Files:**
- Create: `.env.example`

The real `.env` is gitignored. `.env.example` documents what's expected without leaking secrets.

- [ ] **Step 1: Create .env.example**

Write file `.env.example`:
```
# Buffer API credentials and channel IDs
# Get token from: https://buffer.com/developers/apps → "Create Access Token"
BUFFER_ACCESS_TOKEN=your_buffer_token_here
BUFFER_ORG_ID=your_org_id_here
BUFFER_CHANNEL_X=your_x_channel_id_here
BUFFER_CHANNEL_IG=your_ig_channel_id_here

# Google AI Studio key for Gemini API (gemini-carousel / gemini-infographic skills)
# Get key from: https://aistudio.google.com/apikey
GEMINI_API_KEY=your_gemini_key_here

# ConvertKit (added in Task 7)
# CONVERTKIT_API_KEY=
# CONVERTKIT_API_SECRET=
```

- [ ] **Step 2: Commit**

```powershell
git add .env.example
git -c user.name="The Appeal Lab" -c user.email="noreply@theappeallab.com" commit -m "docs: add .env.example reference"
```

---

## Task 7: External Service Registration (USER ACTION)

These are manual user actions. Each has a verification step the agent can confirm afterward.

- [ ] **Step 1: Register ConvertKit Free**

Go to https://app.kit.com/users/signup (ConvertKit rebranded to Kit). Sign up with email. Free tier supports up to 10,000 subscribers as of 2026 (per Kit pricing page).

After login, go to **Settings → Advanced → API**. Copy V3 API Key and V3 API Secret.

Append to `.env`:
```
CONVERTKIT_API_KEY=<paste_v3_key_here>
CONVERTKIT_API_SECRET=<paste_v3_secret_here>
```

Verification:
```powershell
$key = ((Get-Content .env | Select-String "^CONVERTKIT_API_KEY=").ToString() -split "=", 2)[1]; (Invoke-RestMethod -Uri "https://api.convertkit.com/v3/account?api_secret=$(((Get-Content .env | Select-String '^CONVERTKIT_API_SECRET=').ToString() -split '=', 2)[1])" -Method Get) | ConvertTo-Json
```

Expected: JSON with account info (`name`, `plan_type`).

- [ ] **Step 2: Register Cal.com Free**

Go to https://app.cal.com/signup. Sign up with email. Skip team setup. Connect Google Calendar in **Settings → Integrations**.

Create one event type: "30-min appeal strategy call", duration 30 min, default availability.

Verification: visit `https://cal.com/<your-handle>/30min` in a browser and confirm a booking page loads.

- [ ] **Step 3: Purchase theappeallab.com**

Recommended registrar: **Cloudflare Registrar** (https://dash.cloudflare.com/) — at-cost pricing, no upselling, free WHOIS privacy.

Sign in, search `theappeallab.com`. Approx $9-12/year. If taken, fall back to `theappeallab.co` or `appeallab.io` (update spec accordingly).

Verification:
```powershell
nslookup theappeallab.com
```
Expected: returns either Cloudflare nameservers (post-purchase) or NXDOMAIN if you haven't bought yet.

- [ ] **Step 4: Get Gemini API key**

Go to https://aistudio.google.com/apikey. Sign in with Google account. Click "Create API key" → "Create API key in new project".

Copy the key. Append to `.env`:
```
GEMINI_API_KEY=<paste_key_here>
```

Verification:
```powershell
$key = ((Get-Content .env | Select-String "^GEMINI_API_KEY=").ToString() -split "=", 2)[1]; (Invoke-RestMethod -Uri "https://generativelanguage.googleapis.com/v1beta/models?key=$key" -Method Get).models | Select-Object -First 3 -ExpandProperty name
```

Expected: list of model names like `models/gemini-2.5-flash`, `models/gemini-2.5-pro`, etc.

- [ ] **Step 5: Commit .env.example updates (NOT the real .env)**

If you added `CONVERTKIT_*` placeholders to `.env.example` during this task, commit them:
```powershell
git diff .env.example
git add .env.example
git -c user.name="The Appeal Lab" -c user.email="noreply@theappeallab.com" commit -m "docs: add convertkit and gemini placeholders to env example"
```

Confirm `.env` itself is NOT staged:
```powershell
git status
```
Expected: `.env` not listed under "Changes to be committed".

---

## Task 8: X Account Rename + Buffer Reconnect (USER ACTION)

- [ ] **Step 1: Rename X handle**

Go to https://twitter.com/settings/screen_name. Change `RuizheYuan15453` → `theappeallab`. Save.

Verification: visit https://twitter.com/theappeallab. Expected: your profile loads.

- [ ] **Step 2: Reconnect X channel in Buffer**

Go to https://publish.buffer.com/channels. Click on the X (Twitter) channel. Click **Disconnect**, confirm. Then click **Connect a channel → X**, authorize with the renamed account.

- [ ] **Step 3: Verify new handle via Buffer API**

```powershell
$token = ((Get-Content .env | Select-String "^BUFFER_ACCESS_TOKEN=").ToString() -split "=", 2)[1]; $body = '{"query":"query { account { organizations { channels { service name } } } }"}'; (Invoke-WebRequest -Uri "https://api.buffer.com/graphql" -Headers @{Authorization="Bearer $token"; "Content-Type"="application/json"} -Method Post -Body $body -UseBasicParsing).Content
```

Expected: in the response, the twitter channel `name` field is `theappeallab`.

- [ ] **Step 4: If channel ID changed (because of reconnect), update .env**

Reconnect may issue a new channel ID. If the X channel id in the verification output differs from `BUFFER_CHANNEL_X` in `.env`, update `.env`:

```powershell
# manually edit .env replacing BUFFER_CHANNEL_X with the new id
```

Then re-run buffer client tests to confirm:
```powershell
pytest tests/test_buffer_client.py -v
```
Expected: 6 passed.

---

## Task 9: Buffer Timezone Change (USER ACTION)

- [ ] **Step 1: Change X channel timezone to America/New_York**

Go to https://publish.buffer.com → click on the X channel (now @theappeallab). Click **Settings** (gear icon) → **Posting Schedule** → **Time Zone** dropdown → select `(GMT-05:00) New York` → **Save**.

- [ ] **Step 2: Change IG channel timezone to America/New_York**

Repeat Step 1 for the Instagram channel (@appeal_lab).

- [ ] **Step 3: Verify via API**

```powershell
$token = ((Get-Content .env | Select-String "^BUFFER_ACCESS_TOKEN=").ToString() -split "=", 2)[1]; $body = '{"query":"query { account { organizations { channels { service name timezone } } } }"}'; (Invoke-WebRequest -Uri "https://api.buffer.com/graphql" -Headers @{Authorization="Bearer $token"; "Content-Type"="application/json"} -Method Post -Body $body -UseBasicParsing).Content
```

Expected: both channels show `"timezone":"America/New_York"`.

---

## Task 10: Generate The Appeal Lab Voice Doc

**Files:**
- Create: `voice/the-appeal-lab-voice.md`

This task invokes the `voice-builder` skill from the `charlie947/social-media-skills` marketplace via Claude Code.

- [ ] **Step 1: Reload plugins to confirm voice-builder is available**

In Claude Code, run:
```
/reload-plugins
```

Then ask Claude:
> "List skills you have access to that contain the word 'voice' or are from charlie947/social-media-skills."

Expected: `voice-builder` appears (or equivalent). If not, install the marketplace plugin per the original brief setup.

- [ ] **Step 2: Invoke voice-builder with The Appeal Lab inputs**

Tell Claude:
> "Invoke the voice-builder skill to create a voice doc for 'The Appeal Lab'. Inputs:
>
> - **Brand:** The Appeal Lab — faceless case-analysis research team. Tagline: 'We break down real US & UK academic appeal cases — so yours can win too.'
> - **Audience:** US and UK university students facing academic misconduct allegations, failing grades, AI-detection false positives, extenuating circumstances
> - **Voice traits:** 'we'/'the lab' (never 'I'), direct, evidence-based, no hype, no urgency, no fake scarcity, never claims legal advice, never guarantees outcomes
> - **Vocabulary to avoid:** 'guaranteed', 'always wins', 'secret', 'foolproof', 'crush it', 'destroy', and AI-tell phrases listed in the humanizer skill (em-dash overuse, rule-of-three filler, 'leverage', 'utilize', 'in today's landscape', etc.)
> - **Vocabulary to favor:** plain English, specific verbs, concrete numbers, named structures
> - **5 example posts to seed:** synthesize 5 hooks/short examples that follow C-S-O formula from the spec at `docs/superpowers/specs/2026-05-20-appeal-lab-content-system-design.md`
> - **Save to:** `voice/the-appeal-lab-voice.md`"

- [ ] **Step 3: Verify the voice doc covers required constraints**

Open `voice/the-appeal-lab-voice.md` and confirm it contains all of:
- [ ] "we" / "the lab" usage rule (never first-person singular)
- [ ] Explicit "no legal advice" disclaimer language pattern
- [ ] Explicit "no guaranteed outcomes" rule
- [ ] List of vocabulary to avoid (at least 10 entries including hype words + AI-tell phrases)
- [ ] List of vocabulary to favor (specific, concrete)
- [ ] 3+ example post openings showing C-S-O formula
- [ ] Hook patterns with jurisdiction emoji placement (🇺🇸 / 🇬🇧 / 🇺🇸🇬🇧)

If any item is missing, re-prompt the voice-builder skill with the missing items explicitly listed.

- [ ] **Step 4: Commit voice doc**

```powershell
git add voice/the-appeal-lab-voice.md
git -c user.name="The Appeal Lab" -c user.email="noreply@theappeallab.com" commit -m "feat: generate the appeal lab voice doc"
```

---

## Task 11: Create Case Anonymization Template

**Files:**
- Create: `cases/CASE-TEMPLATE.md`

- [ ] **Step 1: Write the template**

Write file `cases/CASE-TEMPLATE.md`:
```markdown
---
case_id: CASE-XXX
pillar: P1 | P2 | P3 | P4 | P5
jurisdiction: US | UK | US/UK
created: YYYY-MM-DD
anonymized: false
---

# Case CASE-XXX — [Short descriptor, no identifiers]

## Anonymization Checklist (complete before marking anonymized: true)

- [ ] No school name (use "R1 university", "Russell Group university", "Ivy League", "regional public US university", etc.)
- [ ] No course code or course name (use "200-level STEM course", "graduate-level humanities seminar", etc.)
- [ ] No specific dates (use "Fall semester 2024", "Spring term", relative timing)
- [ ] No demographic identifiers beyond what is pedagogically necessary
- [ ] No professor names, department names, or office references
- [ ] No quoted text from the case file longer than 1 sentence
- [ ] No allegation-evidence detail that could let an outsider identify the student via search

## C-S-O Master Draft

### CASE
- **Student:** [generic descriptor]
- **Allegation:** [violation type — paraphrased, no direct quotes]
- **Evidence stage:** [Turnitin / GPTZero / faculty report / student tip / etc.]

### STRUCTURE (what worked)
- [Move 1 — what was done, why]
- [Move 2]
- [Move 3]

### OUTCOME
- [Result — anonymized timeline]
- [Generalizable lesson]

## Content Mapping

- **X thread draft:** (link to posts/YYYYMMDD-x-... when produced)
- **IG carousel draft:** (link to posts/YYYYMMDD-ig-... when produced)
- **Featured in lead magnet:** none | LM-A | LM-B
- **Featured on /case-studies:** false | true (URL when live)
```

- [ ] **Step 2: Commit template**

```powershell
git add cases/CASE-TEMPLATE.md
git -c user.name="The Appeal Lab" -c user.email="noreply@theappeallab.com" commit -m "feat: case anonymization template with c-s-o structure"
```

---

## Task 12: Anonymize First Batch (Cases 001-003)

**Files:**
- Create: `cases/CASE-001-*.md`, `cases/CASE-002-*.md`, `cases/CASE-003-*.md`

For each of the first 3 real cases the user provides, the operator (with Claude's assistance) creates a markdown file from the template and fills it in with anonymized content. Each case must pass the anonymization checklist before marking `anonymized: true`.

This task is collaborative — Claude can draft the anonymization given raw notes, but the operator confirms each checklist item.

- [ ] **Step 1: Choose first 3 cases**

The operator selects 3 cases from the real client library, prioritizing:
1. One P2 AI-detection case (highest pillar weight in Phase 1)
2. One P1 academic misconduct case
3. One P3 or P4 case (failing grade or UK EC)

- [ ] **Step 2: Draft Case 001 (P2 — AI detection)**

Copy template:
```powershell
Copy-Item cases\CASE-TEMPLATE.md cases\CASE-001-ai-detection-stem.md
```

Operator provides raw case notes to Claude. Claude drafts the markdown with all identifiers scrubbed. Operator reviews the anonymization checklist and confirms each box.

Filename convention: `CASE-{NNN}-{kebab-case-short-descriptor}.md`. Descriptor must not contain identifying info.

Set `anonymized: true` in frontmatter only after all checklist boxes are checked.

- [ ] **Step 3: Draft Case 002 (P1 — misconduct)**

Repeat Step 2 with a P1 case. Filename example: `CASE-002-plagiarism-defense-r1.md`.

- [ ] **Step 4: Draft Case 003 (P3 or P4)**

Repeat with a P3 or P4 case. Filename example: `CASE-003-uk-ec-mental-health.md`.

- [ ] **Step 5: Run anonymization verification grep**

Make sure no obvious identifiers leaked through:
```powershell
Select-String -Path cases\CASE-00*.md -Pattern "(?i)(university of |@\w+\.edu|fall 202\d|spring 202\d|professor \w+|\bMIT\b|\bharvard\b|\bstanford\b|\boxford\b|\bcambridge\b|\bUCL\b|\bLSE\b)" | Format-Table Path, LineNumber, Line -Wrap
```

Expected: **no matches**. Any match → fix the case and re-run.

- [ ] **Step 6: Commit batch**

```powershell
git add cases/CASE-001-*.md cases/CASE-002-*.md cases/CASE-003-*.md
git -c user.name="The Appeal Lab" -c user.email="noreply@theappeallab.com" commit -m "feat: anonymize first 3 cases (P2 ai-detection, P1 misconduct, P3/P4)"
```

---

## Task 13: Anonymize Second Batch (Cases 004-006)

**Files:**
- Create: `cases/CASE-004-*.md`, `cases/CASE-005-*.md`, `cases/CASE-006-*.md`

Aim for pillar balance: 1 more P2, 1 more P1, 1 more P3/P4 (or P5 process-template if available).

- [ ] **Step 1: Repeat Task 12 Steps 2-5 for cases 004-006**

- [ ] **Step 2: Run anonymization verification grep across all cases**

```powershell
Select-String -Path cases\CASE-00*.md -Pattern "(?i)(university of |@\w+\.edu|fall 202\d|spring 202\d|professor \w+|\bMIT\b|\bharvard\b|\bstanford\b|\boxford\b|\bcambridge\b|\bUCL\b|\bLSE\b)" | Format-Table Path, LineNumber, Line -Wrap
```

Expected: no matches.

- [ ] **Step 3: Commit batch**

```powershell
git add cases/CASE-004-*.md cases/CASE-005-*.md cases/CASE-006-*.md
git -c user.name="The Appeal Lab" -c user.email="noreply@theappeallab.com" commit -m "feat: anonymize cases 004-006"
```

---

## Task 14: Anonymize Final Batch (Cases 007-010)

**Files:**
- Create: `cases/CASE-007-*.md` through `cases/CASE-010-*.md`

Aim for final pillar balance over all 10 cases: 4× P2, 3× P1, 2× P3+P4, 1× P5 (or whatever matches Phase 1 weighting).

- [ ] **Step 1: Draft cases 007-010 using template, with Claude's assistance**

- [ ] **Step 2: Run anonymization verification grep across all 10 cases**

```powershell
Select-String -Path cases\CASE-0*.md -Pattern "(?i)(university of |@\w+\.edu|fall 202\d|spring 202\d|professor \w+|\bMIT\b|\bharvard\b|\bstanford\b|\boxford\b|\bcambridge\b|\bUCL\b|\bLSE\b)" | Format-Table Path, LineNumber, Line -Wrap
```

Expected: no matches.

- [ ] **Step 3: Verify pillar distribution**

```powershell
Select-String -Path cases\CASE-0*.md -Pattern "^pillar:" | ForEach-Object { ($_.Line -split ":")[1].Trim() } | Group-Object | Format-Table Name, Count
```

Expected: rough distribution matching Phase 1 weights — P2 ~40%, P1 ~25%, others ~10-15% each.

- [ ] **Step 4: Commit final batch**

```powershell
git add cases/CASE-007-*.md cases/CASE-008-*.md cases/CASE-009-*.md cases/CASE-010-*.md
git -c user.name="The Appeal Lab" -c user.email="noreply@theappeallab.com" commit -m "feat: anonymize cases 007-010, complete 10-case foundation library"
```

---

## Task 15: End-to-End Smoke Test (CASE-001 → Buffer draft)

**Files:**
- None modified. This task verifies the full pipeline by running scripts and inspecting Buffer.

- [ ] **Step 1: Pick CASE-001 and draft an X thread**

Open `cases/CASE-001-*.md`. Using the voice doc and the case's C-S-O master, hand-write or Claude-assist a 5-segment X thread. Each segment <=280 chars. Save the draft inline in a temporary file `tmp/smoke_test_thread.txt` (one segment per blank-line-separated block).

- [ ] **Step 2: Schedule the thread to Buffer as draft via Python**

Open a Python REPL:
```powershell
python
```

In the REPL:
```python
from scripts.buffer_client import BufferClient
from scripts.buffer_config import BufferConfig

cfg = BufferConfig.from_env()
client = BufferClient(cfg)

with open("tmp/smoke_test_thread.txt", "r", encoding="utf-8") as f:
    segments = [s.strip() for s in f.read().split("\n\n") if s.strip()]

post_id = client.create_thread(
    channel_id=cfg.channel_x,
    segments=segments,
    save_to_draft=True,
)
print(f"Created draft: {post_id}")
```

Expected: prints a non-empty draft id.

- [ ] **Step 3: Verify the draft appears in Buffer dashboard**

Open https://publish.buffer.com/drafts in browser. Confirm the thread is visible with all segments.

- [ ] **Step 4: Delete the draft via API**

In the same REPL:
```python
client.delete_post(post_id)
print("Deleted.")
```

Refresh Buffer dashboard. Expected: draft is gone.

- [ ] **Step 5: Clean up the temporary file**

```powershell
Remove-Item tmp\smoke_test_thread.txt; Remove-Item tmp -ErrorAction SilentlyContinue
```

(Do NOT commit `tmp/`.)

---

## Task 16: Week 1 Completion Status + W2 Readiness Note

**Files:**
- Create: `kpi/week-2026-05-21-foundation-complete.md`

- [ ] **Step 1: Write completion status note**

Write file `kpi/week-2026-05-21-foundation-complete.md`:
```markdown
# Week 1 (Foundation) — Completion Status

**Period:** 2026-05-21 to 2026-05-27 (or whenever started/finished)

## Pre-launch Checklist (from spec)

- [x] X renamed @RuizheYuan15453 → @theappeallab
- [x] Buffer X channel reconnected, new handle reflected via API
- [x] Buffer X channel timezone = America/New_York
- [x] Buffer IG channel timezone = America/New_York
- [x] ConvertKit Free account active, API keys in .env
- [x] Cal.com Free account active, Google Calendar connected, 30-min event type created
- [x] theappeallab.com purchased (or fallback recorded: ___)
- [x] Gemini API key in .env, verified working
- [x] voice/the-appeal-lab-voice.md exists and covers required constraints
- [x] 10 anonymized cases in cases/ (verified by anonymization grep)
- [x] Buffer client end-to-end smoke test passed (draft created + deleted)

## Numbers

- Posts published this week: 0 (foundation week, no content yet)
- Followers: baseline snapshot
  - X: ___ (note baseline)
  - IG: ___ (note baseline)
- Email subs: 0
- DMs received: 0
- Revenue: $0

## W2 Readiness

Ready to enter content production:
- [ ] Canva account active (Free tier OK to start)
- [ ] Canva templates for X-thread hook image + IG carousel slides (Task in W2 plan)
- [ ] First content batch case selected from cases/

## Blockers carried into W2

(list any pre-launch checklist items that did not complete)

## Notes for next plan

The W2 plan should focus on:
1. Canva template construction
2. First case dual-output (X thread + IG carousel, including images via gemini-carousel)
3. v0.1 homepage on Cloudflare Pages with email capture wired to ConvertKit
4. First 6 posts scheduled to Buffer queue
```

- [ ] **Step 2: Verify all earlier tasks committed**

```powershell
git log --oneline
git status
```

Expected: `git status` shows only the new kpi file (or clean). `git log` shows ~12+ commits from W1 progression.

- [ ] **Step 3: Final commit**

```powershell
git add kpi/week-2026-05-21-foundation-complete.md
git -c user.name="The Appeal Lab" -c user.email="noreply@theappeallab.com" commit -m "docs: w1 foundation complete status note"
```

- [ ] **Step 4: Run full test suite one last time**

```powershell
pytest tests/ -v
```

Expected: all tests pass (9 tests if Tasks 3-5 implemented exactly as specified).

---

## Self-Review

**Spec coverage check:**
- Brand positioning (spec §1): no W1 task touches brand identity — correct, brand is locked in spec
- Content pillars + C-S-O formula (spec §2): Task 11 (case template) bakes the formula into every case file ✓
- Platform strategy / Buffer API automation (spec §3.4): Tasks 3-5 implement the client ✓; Tasks 7-9 set up channels ✓
- Funnel architecture (spec §4): W1 does NOT build homepage or lead magnets — those are W2. ConvertKit + Cal.com signup is in Task 7 ✓
- Tool stack (spec §5.1): Buffer Free + API (Tasks 3-5), Gemini API (Task 7), ConvertKit (Task 7), Cal.com (Task 7), domain (Task 7), Python (Task 1) all covered ✓
- Pre-launch checklist (spec): Task 7 (services), Task 8 (X rename + reconnect), Task 9 (TZ), Task 10 (voice), Tasks 12-14 (cases), Task 16 (completion note). Domain purchase in Task 7 Step 3, Gemini in Task 7 Step 4 ✓
- Operator pre-launch ops task (#7 in TaskList): fully covered ✓

**No gaps detected.**

**Placeholder scan:** No "TODO" / "TBD" / "fill in later" remaining. All code blocks contain actual code. All commands have expected output. Template files contain real structure to fill in (this is intentional — the template IS the deliverable).

**Type consistency:** `BufferConfig` fields (`access_token`, `channel_x`, `channel_ig`, `org_id`) referenced identically across Task 3 (definition), Task 4 (use in client), Task 5 (use in thread method), Task 15 (use in smoke test). `BufferClient.create_post()` / `delete_post()` / `create_thread()` method names consistent across tasks. ✓

---

## Execution Notes

Tasks 1-6 + 11 are pure code/scaffolding (Claude can execute autonomously). Tasks 7-9 require operator manual action in external dashboards (X, Buffer, Cal.com, Kit, Cloudflare, AI Studio). Tasks 10, 12-14 are collaborative (operator provides raw case material, Claude drafts, operator verifies anonymization). Task 15 is a smoke test the operator runs in REPL. Task 16 is a status snapshot.

**Estimated time per task** (cumulative ~8-10 hours):
- Task 1: 10 min
- Task 2: 5 min
- Task 3: 20 min
- Task 4: 30 min (includes API debugging if needed)
- Task 5: 20 min
- Task 6: 3 min
- Task 7: 60 min (signups + verifications)
- Task 8: 15 min
- Task 9: 5 min
- Task 10: 30 min (voice-builder + verification)
- Task 11: 5 min
- Tasks 12-14: 2 hours total (10 cases × ~12 min each, operator-paced)
- Task 15: 15 min
- Task 16: 10 min

**Total: ~5-6 focused hours,** matching brief's W1 ramp expectation of 5-7 h/week.
