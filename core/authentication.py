from __future__ import annotations

import uuid

from django.utils import timezone
from rest_framework import authentication, exceptions

from . import models


class CustomerTokenAuthentication(authentication.BaseAuthentication):
    """Authenticate requests using AuthToken (UUID)."""

    keyword = "Bearer"

    def authenticate(self, request):  # type: ignore[override]
        token_key = self._get_token_from_header(request)
        if not token_key:
            return None
        try:
            uuid.UUID(str(token_key))
        except ValueError as exc:  # invalid uuid
            raise exceptions.AuthenticationFailed("Token formati noto'g'ri.") from exc

        try:
            token = models.AuthToken.objects.select_related("customer").get(
                key=token_key, is_active=True
            )
        except models.AuthToken.DoesNotExist as exc:
            raise exceptions.AuthenticationFailed("Token topilmadi.") from exc

        if token.is_expired:
            token.is_active = False
            token.save(update_fields=["is_active", "updated_at"])
            raise exceptions.AuthenticationFailed("Token muddati tugagan.")

        token.customer.last_login_at = timezone.now()
        token.customer.save(update_fields=["last_login_at", "updated_at"])
        return (token.customer, token)

    def _get_token_from_header(self, request) -> str | None:
        auth_header = request.headers.get("Authorization") or ""
        if auth_header.startswith(f"{self.keyword} "):
            return auth_header.split(" ", 1)[1].strip()
        fallback = request.headers.get("X-Auth-Token")
        if fallback:
            return fallback.strip()
        return None
