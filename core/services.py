"""Domain services for the core app."""

from __future__ import annotations

import logging
import random
from typing import Any

import requests
from django.conf import settings
from django.core.cache import cache

from .models import GatewaySetting

logger = logging.getLogger(__name__)


def generate_numeric_code(length: int = 4) -> str:
    digits = "0123456789"
    return "".join(random.choice(digits) for _ in range(length))


def _get_gateway_config() -> dict[str, Any]:
    config = GatewaySetting.get_active()
    email = (
        (config.sms_email if config and config.sms_email else getattr(settings, "ESKIZ_EMAIL", ""))
    )
    password = (
        (config.sms_password if config and config.sms_password else getattr(settings, "ESKIZ_PASSWORD", ""))
    )
    sender = (
        (config.sender_name if config and config.sender_name else getattr(settings, "SMS_SENDER_NAME", "4546"))
    )
    use_real = config.use_real_gateway if config else False
    test_code = config.test_code if config else getattr(settings, "TEST_SMS_FIXED_CODE", "0000")
    return {
        "config": config,
        "email": email,
        "password": password,
        "sender": sender,
        "use_real": use_real,
        "test_code": test_code,
    }


def send_sms_code(phone: str, code: str) -> None:
    """Send SMS using Eskiz gateway (or log/test fallback)."""

    cfg = _get_gateway_config()
    config = cfg["config"]

    if not cfg["use_real"]:
        logger.info("Test SMS mode enabled. Code for %s: %s", phone, cfg["test_code"])
        return

    email = cfg["email"]
    password = cfg["password"]
    sender = cfg["sender"]

    if not (email and password):
        logger.info("SMS code for %s: %s (gateway credentials yo'q)", phone, code)
        return

    token = cache.get("eskiz_token")
    if not token:
        try:
            response = requests.post(
                "https://notify.eskiz.uz/api/auth/login",
                json={"email": email, "password": password},
                timeout=10,
            )
            response.raise_for_status()
            token = response.json().get("data", {}).get("token")
            if token:
                # Eskiz token valid for 24h
                cache.set("eskiz_token", token, timeout=23 * 3600)
        except requests.RequestException as exc:
            body = getattr(exc.response, "text", "")
            logger.error("Eskiz login error: %s %s", exc, body)
            token = None

    if not token:
        logger.info("SMS code for %s: %s (token missing)", phone, code)
        return

    payload: dict[str, Any] = {
        "mobile_phone": phone.replace("+", "").strip(),
        "message": f"Tasdiqlash kodi: {code}",
        "from": sender,
    }

    try:
        response = requests.post(
            "https://notify.eskiz.uz/api/message/sms/send",
            json=payload,
            headers={"Authorization": f"Bearer {token}"},
            timeout=10,
        )
        if response.status_code == 401:
            cache.delete("eskiz_token")
        response.raise_for_status()
        logger.info("SMS successfully sent to %s", phone)
    except requests.RequestException as exc:
        logger.error("Eskiz send error: %s", exc)
        logger.info("SMS code for %s: %s (fallback log)", phone, code)
