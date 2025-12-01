# 🚀 Deployment Instructions

## ⚠️ MUHIM: Local va Server alohida sozlangan!

Dastur endi **ikki rejimda** ishlaydi:

---

## 🏠 **LOCAL DEVELOPMENT (Hozirgi holat)**

### **Ishlatish:**
```bash
# Local PC da
cd /home/wikki/apps/my-ecommer
make up
```

### **Access:**
- Frontend: http://localhost:3000
- Backend: http://localhost:8001/api/
- Admin: http://localhost:8001/admin/
- Mini-app: http://localhost:3001

### **Fayllar:**
- `.env` - Local backend settings
- `frontend/.env.local` - Local frontend settings
- `mini-app/.env` - Local mini-app settings
- `docker-compose.yml` - Local docker config
- `nginx.conf` - Local nginx config

---

## 🌐 **SERVER DEPLOYMENT (84.247.179.221)**

### **1️⃣ Fayllarni tayyorlash:**

```bash
# Local PC da
cd /home/wikki/apps/my-ecommer

# Production fayllarni ko'chirish
cp .env.production .env.server
cp frontend/.env.production frontend/.env.server
cp mini-app/.env.production mini-app/.env.server
```

### **2️⃣ Serverga yuborish:**

```bash
# Loyihani serverga ko'chirish
scp -r /home/wikki/apps/my-ecommer root@84.247.179.221:/root/apps/

# Yoki git orqali
cd /home/wikki/apps/my-ecommer
git init
git add .
git commit -m "Production ready"
git remote add origin <YOUR_REPO>
git push origin main

# Serverda
ssh root@84.247.179.221
cd /root/apps
git clone <YOUR_REPO> my-ecommer
cd my-ecommer
```

### **3️⃣ Serverda sozlash:**

```bash
# Server uchun environment fayllarni rename qilish
mv .env.production .env
mv frontend/.env.production frontend/.env.local
mv mini-app/.env.production mini-app/.env

# Production docker-compose ishlatish
docker-compose -f docker-compose.production.yml up -d --build

# Database setup
docker-compose -f docker-compose.production.yml exec backend python manage.py migrate
docker-compose -f docker-compose.production.yml exec backend python manage.py collectstatic --noinput
docker-compose -f docker-compose.production.yml exec backend python manage.py createsuperuser
```

### **4️⃣ DNS Sozlamalari:**

Domen provayderida (Namecheap, GoDaddy, va h.k.):

```dns
Type: A Record, Name: @,        Value: 84.247.179.221
Type: A Record, Name: www,      Value: 84.247.179.221
Type: A Record, Name: api,      Value: 84.247.179.221
Type: A Record, Name: miniapp,  Value: 84.247.179.221
```

### **5️⃣ SSL Sertifikat:**

```bash
# Certbot o'rnatish
sudo apt install certbot python3-certbot-nginx -y

# SSL olish
sudo certbot --nginx -d taomchi.app -d www.taomchi.app -d api.taomchi.app -d miniapp.taomchi.app
```

### **Access (IP orqali):**
- Frontend: http://84.247.179.221:3000
- Backend: http://84.247.179.221:8001/api/
- Admin: http://84.247.179.221:8001/admin/
- Mini-app: http://84.247.179.221:3001

### **Access (Domen orqali - DNS dan keyin):**
- Frontend: https://taomchi.app
- Backend: https://api.taomchi.app
- Admin: https://api.taomchi.app/admin/
- Mini-app: https://miniapp.taomchi.app

---

## 📊 **Farqlar (Local vs Server):**

| Feature | Local | Server |
|---------|-------|--------|
| URL | localhost | 84.247.179.221 |
| DEBUG | True | False |
| SSL | No | Yes (after DNS) |
| Docker Compose | docker-compose.yml | docker-compose.production.yml |
| Nginx Config | nginx.conf | nginx.production.conf |
| Environment | .env | .env.production |

---

## 🔄 **O'zgarishlarni sync qilish:**

### **Local → Server:**
```bash
# Local da o'zgarishlar qiling
cd /home/wikki/apps/my-ecommer

# Git commit
git add .
git commit -m "New changes"
git push origin main

# Serverda
ssh root@84.247.179.221
cd /root/apps/my-ecommer
git pull origin main
docker-compose -f docker-compose.production.yml restart
```

---

## 🛠️ **Foydali Commandlar:**

### **Local:**
```bash
make up          # Start all containers
make down        # Stop all containers
make restart     # Restart all containers
make logs        # View logs
```

### **Server:**
```bash
# Start
docker-compose -f docker-compose.production.yml up -d

# Stop
docker-compose -f docker-compose.production.yml down

# Restart
docker-compose -f docker-compose.production.yml restart

# Logs
docker-compose -f docker-compose.production.yml logs -f backend

# Rebuild
docker-compose -f docker-compose.production.yml up -d --build
```

---

## ✅ **Checklist:**

### **Local Development:**
- [x] `.env` - localhost settings
- [x] `docker-compose.yml` - local config
- [x] `nginx.conf` - localhost
- [x] Works on http://localhost:3000

### **Server Deployment:**
- [ ] `.env.production` → `.env` (serverda)
- [ ] `frontend/.env.production` → `frontend/.env.local` (serverda)
- [ ] `mini-app/.env.production` → `mini-app/.env` (serverda)
- [ ] `docker-compose.production.yml` ishlatish
- [ ] DNS A records qo'shish
- [ ] SSL sertifikat olish
- [ ] Works on https://taomchi.app

---

## 🚨 **MUHIM ESLATMALAR:**

1. **Local da ishlayotganda** - Oddiy `make up` yoki `docker-compose up`
2. **Serverda deploy qilganda** - `docker-compose.production.yml` ishlatish
3. **Production fayllar** - `.env.production`, `.env.server` nomi bilan saqlangan
4. **Git da** - `.env` va `.env.local` fayllar `.gitignore` da bo'lishi kerak
5. **SECRET_KEY** - Production da o'zgartirish esdan chiqmasin!

---

**Hozir local PC da ishlaydi. Serverga deploy qilish uchun yuqoridagi qadamlarni bajaring!** ✨
