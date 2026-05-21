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
