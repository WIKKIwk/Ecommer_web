# 🚀 Server Deployment Guide - taomchi.app

## ✅ **JAVOB: Serverda Ngrok KERAK EMAS!**

Server deployment qilganingizda, domeningiz to'g'ridan-to'g'ri serverga ulanadi. Ngrok faqat local PC dan test uchun kerak.

---

## 📋 **Deployment Bosqichlari**

### **1️⃣ DNS Sozlamalari (Domen provayderida)**

Domeningizni qayerdan sotib oldingiz? (Namecheap, GoDaddy, Hostinger, va h.k.)

**DNS sozlamalariga kiring va quyidagi A recordlarni qo'shing:**

```
Type: A Record
Name: @
Value: <CONTABO_SERVER_IP>
TTL: Auto yoki 3600

Type: A Record
Name: www
Value: <CONTABO_SERVER_IP>
TTL: Auto

Type: A Record
Name: api
Value: <CONTABO_SERVER_IP>
TTL: Auto

Type: A Record
Name: miniapp
Value: <CONTABO_SERVER_IP>
TTL: Auto
```

**Misol (Namecheap uchun):**
```
Host: @          Type: A      Value: 123.45.67.89
Host: www        Type: A      Value: 123.45.67.89
Host: api        Type: A      Value: 123.45.67.89
Host: miniapp    Type: A      Value: 123.45.67.89
```

DNS propagation 5-10 daqiqa oladi.

---

### **2️⃣ Server Sozlamalari**

#### **A. SSL Sertifikat (HTTPS) o'rnatish**

```bash
# Certbot o'rnatish
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

# SSL sertifikat olish
sudo certbot --nginx -d taomchi.app -d www.taomchi.app -d api.taomchi.app -d miniapp.taomchi.app

# Avtomatik yangilanish
sudo certbot renew --dry-run
```

#### **B. Docker containers ishga tushirish**

```bash
cd /home/wikki/apps/my-ecommer

# Build va run
docker-compose up -d --build

# Static files to'plash
docker-compose exec backend python manage.py collectstatic --noinput

# Database migrations
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate

# Nginx restart
docker-compose restart nginx
```

---

### **3️⃣ Environment Variables**

Backend `.env` allaqachon yangilandi:
```env
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,backend,taomchi.app,api.taomchi.app,www.taomchi.app
CORS_ALLOWED_ORIGINS=https://taomchi.app,https://www.taomchi.app,https://miniapp.taomchi.app
```

Frontend `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=https://api.taomchi.app/api
NEXT_PUBLIC_MEDIA_BASE_URL=https://api.taomchi.app
```

Mini-app `.env`:
```env
VITE_API_BASE_URL=https://api.taomchi.app/api
```

---

### **4️⃣ Nginx Configuration**

Allaqachon yangilandi:
- ✅ `taomchi.app` - Frontend
- ✅ `api.taomchi.app` - Backend API
- ✅ `miniapp.taomchi.app` - Telegram Mini-App

---

### **5️⃣ Firewall Sozlamalari**

```bash
# UFW firewall
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

---

## 🎯 **Final Result:**

Serverda deployment qilganingizdan keyin:

- ✅ **https://taomchi.app** - Frontend (Next.js)
- ✅ **https://api.taomchi.app** - Backend API
- ✅ **https://miniapp.taomchi.app** - Telegram Mini-App
- ✅ **Ngrok KERAK EMAS!** - To'g'ridan-to'g'ri server

---

## 🔧 **Local Test (Ngrok siz)**

Agar hozir local PC da test qilmoqchi bo'lsangiz:

### **Option 1: Cloudflare Tunnel (BEPUL)**
```bash
# O'rnatish
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared.deb

# Login
cloudflared tunnel login

# Tunnel yaratish
cloudflared tunnel create taomchi-tunnel

# DNS route
cloudflared tunnel route dns taomchi-tunnel taomchi.app
cloudflared tunnel route dns taomchi-tunnel api.taomchi.app
cloudflared tunnel route dns taomchi-tunnel miniapp.taomchi.app

# Config yaratish
nano ~/.cloudflared/config.yml
```

`~/.cloudflared/config.yml`:
```yaml
tunnel: <TUNNEL_ID>
credentials-file: /home/wikki/.cloudflared/<TUNNEL_ID>.json

ingress:
  - hostname: taomchi.app
    service: http://localhost:3000
  - hostname: api.taomchi.app
    service: http://localhost:8001
  - hostname: miniapp.taomchi.app
    service: http://localhost:3001
  - service: http_status:404
```

```bash
# Run
cloudflared tunnel run taomchi-tunnel
```

### **Option 2: /etc/hosts (Faqat local test)**
```bash
# /etc/hosts ga qo'shish
sudo nano /etc/hosts

127.0.0.1 taomchi.app
127.0.0.1 api.taomchi.app
127.0.0.1 miniapp.taomchi.app
```

---

## 📊 **Deployment Comparison:**

| Feature | Local (Ngrok Pro) | Local (Cloudflare) | Server |
|---------|-------------------|-------------------|--------|
| Cost | $8/month | **FREE** | Server cost only |
| HTTPS | ✅ Auto | ✅ Auto | ✅ Certbot |
| Custom Domain | ✅ | ✅ | ✅ |
| Performance | Medium | Good | **Best** |
| Uptime | PC uptime | PC uptime | **24/7** |
| Recommended | ❌ | ✅ Test only | ✅ **Production** |

---

## 🎯 **Tavsiya:**

1. **Local test** - Cloudflare Tunnel ishlatish (BEPUL)
2. **Production** - Serverga deploy qilish (Ngrok kerak emas)

---

## ✅ **Ready to Deploy!**

Barcha sozlamalar tayyor. Faqat:

1. DNS recordlarni qo'shing (5-10 daqiqa)
2. Serverga kod ko'chiring
3. SSL sertifikat oling
4. Docker containers run qiling
5. Tayyor! 🚀

**Ngrok umuman kerak emas!** ✨
