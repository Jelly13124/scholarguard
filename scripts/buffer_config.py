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
