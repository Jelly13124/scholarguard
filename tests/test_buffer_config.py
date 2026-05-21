"""Tests for buffer_config.py — env loading and validation."""
import os
import pytest
from unittest.mock import patch
from scripts.buffer_config import BufferConfig, ConfigError


@patch("scripts.buffer_config.load_dotenv")
def test_config_loads_from_env(mock_load_dotenv, monkeypatch):
    monkeypatch.setenv("BUFFER_ACCESS_TOKEN", "test-token")
    monkeypatch.setenv("BUFFER_CHANNEL_X", "x-id")
    monkeypatch.setenv("BUFFER_CHANNEL_IG", "ig-id")
    monkeypatch.setenv("BUFFER_ORG_ID", "org-id")

    cfg = BufferConfig.from_env()

    assert cfg.access_token == "test-token"
    assert cfg.channel_x == "x-id"
    assert cfg.channel_ig == "ig-id"
    assert cfg.org_id == "org-id"
    mock_load_dotenv.assert_called_once()


@patch("scripts.buffer_config.load_dotenv")
def test_config_raises_when_token_missing(mock_load_dotenv, monkeypatch):
    monkeypatch.delenv("BUFFER_ACCESS_TOKEN", raising=False)
    monkeypatch.setenv("BUFFER_CHANNEL_X", "x-id")
    monkeypatch.setenv("BUFFER_CHANNEL_IG", "ig-id")
    monkeypatch.delenv("BUFFER_ORG_ID", raising=False)

    with pytest.raises(ConfigError, match="BUFFER_ACCESS_TOKEN"):
        BufferConfig.from_env()


@patch("scripts.buffer_config.load_dotenv")
def test_config_raises_when_channel_missing(mock_load_dotenv, monkeypatch):
    monkeypatch.setenv("BUFFER_ACCESS_TOKEN", "test-token")
    monkeypatch.delenv("BUFFER_CHANNEL_X", raising=False)
    monkeypatch.setenv("BUFFER_CHANNEL_IG", "ig-id")
    monkeypatch.delenv("BUFFER_ORG_ID", raising=False)

    with pytest.raises(ConfigError, match="BUFFER_CHANNEL_X"):
        BufferConfig.from_env()
