# 🚀 Cloudflare Tunnel bilan taomchi.app ni ulash (BEPUL!)

> Ngrok o'chirildi – tashqi ulanish uchun endi faqat Cloudflare Tunnel ishlatiladi.

## 1️⃣ Cloudflare da domen qo'shish

1. [cloudflare.com](https://dash.cloudflare.com) ga kiring
2. "Add a Site" tugmasini bosing
3. `taomchi.app` domenini kiriting
4. Free plan tanlang
5. Nameserverlarni domen provayderingizda o'zgartiring:
   ```
   ns1.cloudflare.com
   ns2.cloudflare.com
   ```

## 2️⃣ Cloudflared o'rnatish

```bash
# Cloudflared yuklab olish
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb

# O'rnatish
sudo dpkg -i cloudflared.deb

# Autentifikatsiya
cloudflared tunnel login
```

Browser ochiladi va Cloudflare ga kirasiz.

## 3️⃣ Tunnel yaratish

```bash
# Tunnel yaratish
cloudflared tunnel create kamolon-tunnel

# Tunnel ID ni ko'rish
cloudflared tunnel list
```

## 4️⃣ Tunnel konfiguratsiyasi

`~/.cloudflared/config.yml` faylini yaratish:

```yaml
tunnel: <TUNNEL_ID>
credentials-file: /home/wikki/.cloudflared/<TUNNEL_ID>.json

ingress:
  # Frontend - asosiy sayt
  - hostname: taomchi.app
    service: http://localhost:3000

  # Backend API
  - hostname: api.taomchi.app
    service: http://localhost:8001

  # Mini-app
  - hostname: miniapp.taomchi.app
    service: http://localhost:3001

  # 404 fallback
  - service: http_status:404
```

## 5️⃣ DNS sozlamalari

```bash
# Frontend
cloudflared tunnel route dns kamolon-tunnel taomchi.app

# Backend API
cloudflared tunnel route dns kamolon-tunnel api.taomchi.app

# Mini-app
cloudflared tunnel route dns kamolon-tunnel miniapp.taomchi.app
```

## 6️⃣ Tunnel ishga tushirish

```bash
# Test rejimda
cloudflared tunnel run kamolon-tunnel

# Yoki Makefile orqali (cloudflared sozlangan bo'lsa)
make tunnel

# Yoki background rejimda
cloudflared tunnel run kamolon-tunnel &

# Yoki systemd service sifatida
sudo cloudflared service install
sudo systemctl start cloudflared
sudo systemctl enable cloudflared
```

## ✅ Natija:

- **https://taomchi.app** - Frontend (Next.js)
- **https://api.taomchi.app** - Backend API
- **https://miniapp.taomchi.app** - Telegram Mini-App

---

## 🎯 Afzalliklari:

✅ **Bepul** - Hech qanday to'lov yo'q
✅ **HTTPS** - Avtomatik SSL sertifikat
✅ **Tez** - Cloudflare CDN
✅ **Xavfsiz** - DDoS protection
✅ **No port forwarding** - Router sozlamalari kerak emas

---

## 📌 Eslatma:

Frontend va Backend `.env` fayllarida URL larni yangilash kerak:

### Backend `.env`:
```env
DJANGO_ALLOWED_HOSTS=taomchi.app,api.taomchi.app,localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=https://taomchi.app,https://miniapp.taomchi.app
```

### Frontend `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=https://api.taomchi.app/api
NEXT_PUBLIC_MEDIA_BASE_URL=https://api.taomchi.app
```

### Mini-app `.env`:
```env
VITE_API_BASE_URL=https://api.taomchi.app/api
```

---

**Barcha o'rnatishdan keyin Docker containerlarni restart qiling:**

```bash
docker-compose restart backend frontend mini-app
```
