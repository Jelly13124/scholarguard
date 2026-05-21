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
