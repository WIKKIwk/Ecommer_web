# 📦 GitHub Setup Guide

Bu qo'llanma loyihani GitHub ga yuklash va boshqalar uni serverga o'rnatish uchun.

---

## 🎯 GitHub ga yuklash (Siz uchun)

### 1️⃣ **Git repository yaratish:**

```bash
cd /home/wikki/apps/my-ecommer

# Git init
git init

# Branch nomi
git branch -M main

# .gitignore allaqachon bor
```

### 2️⃣ **Maxfiy ma'lumotlarni tekshirish:**

**MUHIM:** Quyidagi fayllar `.gitignore` da va GitHub ga yuklanmaydi:

- `.env` - Backend maxfiy ma'lumotlar
- `frontend/.env.local` - Frontend settings
- `mini-app/.env` - Mini-app settings
- `media/` - Yuklangan fayllar
- `db.sqlite3` - Local database
- `node_modules/` - Dependencies

**Tekshirish:**
```bash
# .gitignore ni tekshiring
cat .gitignore

# Git status
git status

# Agar .env ko'rinsa, .gitignore da qo'shilganini tekshiring
```

### 3️⃣ **GitHub repository yaratish:**

1. GitHub.com ga kiring
2. "New repository" bosing
3. Repository nomi: `taomchi-app` (yoki boshqa nom)
4. Description: "Modern E-Commerce Platform for Food Delivery"
5. **Public** yoki **Private** tanlang
6. **DO NOT** initialize with README (bizda bor)
7. "Create repository" bosing

### 4️⃣ **GitHub ga yuklash:**

```bash
# Remote qo'shish
git remote add origin https://github.com/YOUR_USERNAME/taomchi-app.git

# Fayllarni qo'shish
git add .

# Commit
git commit -m "Initial commit: E-commerce platform with performance optimizations"

# Push
git push -u origin main
```

### 5️⃣ **Repository sozlamalari:**

GitHub repository sahifasida:

1. **About** bo'limini to'ldiring:
   - Description: "Modern E-Commerce Platform"
   - Website: https://taomchi.app (agar bo'lsa)
   - Topics: `ecommerce`, `django`, `nextjs`, `react`, `docker`, `telegram-mini-app`

2. **README.md** avtomatik ko'rinadi

3. **Releases** yaratish (opsional):
   - "Create a new release" bosing
   - Tag: `v1.0.0`
   - Title: "Initial Release"
   - Description: Release notes

---

## 👥 Boshqalar uchun o'rnatish (Super Easy!)

Sizning repository ni clone qilganlar **faqat 3 ta command** ishlatadi:

### 🚀 **One-Command Installation:**

```bash
# 1. Clone repository
git clone https://github.com/YOUR_USERNAME/taomchi-app.git

# 2. Enter directory
cd taomchi-app

# 3. Auto setup (everything!)
make setup

# 4. Create admin user
make superuser
```

**That's it!** Visit http://localhost:3000 🎉

### 📋 **What `make setup` does automatically:**

1. ✅ Creates `.env` files from `.env.example` (if not exist)
2. ✅ Creates `frontend/.env.local` from example
3. ✅ Creates `mini-app/.env` from example
4. ✅ Builds all Docker containers
5. ✅ Starts all services (DB, Redis, Backend, Frontend, Mini-App)
6. ✅ Waits for database
7. ✅ Runs migrations
8. ✅ Collects static files

**Total: ~2-3 minutes** ⏱️

---

### 🔧 **Prerequisites (Must have):**

```bash
# Docker o'rnatish
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Docker Compose o'rnatish
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Git va Make o'rnatish
sudo apt install git make -y
```

---

### 3️⃣ **Environment o'zgartirish (Opsional):**

Default settings local development uchun ishlaydi. Lekin o'zgartirish kerak bo'lsa:

**`.env` (Backend):**
```env
DJANGO_SECRET_KEY=change-this-to-random-string  # CHANGE THIS!
DJANGO_DEBUG=False  # Production uchun
DJANGO_ALLOWED_HOSTS=your-domain.com,www.your-domain.com,your-server-ip

# SMS Gateway (eskiz.uz dan oling)
ESKIZ_EMAIL=your-email@example.com
ESKIZ_PASSWORD=your-password
```

**`frontend/.env.local`:**
```env
# Local development uchun:
NEXT_PUBLIC_API_BASE_URL=http://localhost:8001/api
NEXT_PUBLIC_MEDIA_BASE_URL=http://localhost:8001

# Production uchun:
# NEXT_PUBLIC_API_BASE_URL=https://api.your-domain.com/api
# NEXT_PUBLIC_MEDIA_BASE_URL=https://api.your-domain.com
```

**`mini-app/.env`:**
```env
# Local:
VITE_API_BASE_URL=http://localhost:8001/api

# Production:
# VITE_API_BASE_URL=https://api.your-domain.com/api
```

### 4️⃣ **Ishga tushirish:**

```bash
# Start all services
docker-compose up -d --build

# Run migrations
docker-compose exec backend python manage.py migrate

# Create superuser
docker-compose exec backend python manage.py createsuperuser

# Collect static files
docker-compose exec backend python manage.py collectstatic --noinput
```

### 5️⃣ **Access:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:8001/api/
- Admin: http://localhost:8001/admin/
- Mini-App: http://localhost:3001

---

## 🌐 Production Deployment

Production serverga o'rnatish uchun:

```bash
# 1. Server requirements
# - Ubuntu 20.04+ / Debian 11+
# - 2GB+ RAM, 20GB+ SSD
# - Docker installed

# 2. Clone repository
ssh root@YOUR_SERVER_IP
git clone https://github.com/YOUR_USERNAME/taomchi-app.git
cd taomchi-app

# 3. Use production configs
cp .env.production .env
cp frontend/.env.production frontend/.env.local
cp mini-app/.env.production mini-app/.env

# 4. Update production values
nano .env  # Change SECRET_KEY, DEBUG=False, ALLOWED_HOSTS
nano frontend/.env.local  # Update with server IP or domain
nano mini-app/.env  # Update with server IP or domain

# 5. Start production
docker-compose -f docker-compose.production.yml up -d --build

# 6. Setup
docker-compose -f docker-compose.production.yml exec backend python manage.py migrate
docker-compose -f docker-compose.production.yml exec backend python manage.py collectstatic --noinput
docker-compose -f docker-compose.production.yml exec backend python manage.py createsuperuser

# 7. Firewall
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable

# 8. SSL (after DNS)
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Batafsil: [DEPLOYMENT_INSTRUCTIONS.md](DEPLOYMENT_INSTRUCTIONS.md)

---

## 📚 Qo'shimcha dokumentatsiya:

- [README.md](README.md) - Asosiy dokumentatsiya
- [DEPLOYMENT_INSTRUCTIONS.md](DEPLOYMENT_INSTRUCTIONS.md) - Deployment guide
- [PERFORMANCE_GUIDE.md](PERFORMANCE_GUIDE.md) - Performance optimizations
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guide

---

## ✅ Checklist (GitHub ga yuklash oldidan):

- [x] `.gitignore` mavjud va to'g'ri
- [x] `.env.example` fayllar yaratilgan
- [x] `README.md` to'ldirilgan
- [x] Maxfiy ma'lumotlar `.env` da (GitHub ga yuklanmaydi)
- [x] `LICENSE` fayli qo'shilgan
- [x] `CONTRIBUTING.md` mavjud
- [x] Production config fayllar (`.production`) qo'shilgan
- [ ] Screenshot/demo qo'shish (opsional)
- [ ] GitHub repository yaratilgan
- [ ] Git push qilingan

---

**Tayyor! Loyihangizni GitHub ga yuklashingiz va boshqalar o'rnatishi mumkin!** 🚀
