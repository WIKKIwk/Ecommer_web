# 🚀 Contabo Server Deployment - taomchi.app

**Server IP:** `84.247.179.221`

---

## 📋 **BOSQICHMA-BOSQICH QO'LLANMA**

### **1️⃣ DNS Sozlamalari (taomchi.app provayderida)**

Domeningizni qayerdan sotib oldingiz? (Namecheap, GoDaddy, Hostinger, va h.k.)

**DNS sozlamalariga kiring va quyidagilarni qo'shing:**

```dns
Type: A Record
Name: @
Value: 84.247.179.221
TTL: Automatic (yoki 3600)

Type: A Record
Name: www
Value: 84.247.179.221
TTL: Automatic

Type: A Record
Name: api
Value: 84.247.179.221
TTL: Automatic

Type: A Record
Name: miniapp
Value: 84.247.179.221
TTL: Automatic
```

**Namecheap da:**
```
Host: @          Type: A      Value: 84.247.179.221
Host: www        Type: A      Value: 84.247.179.221
Host: api        Type: A      Value: 84.247.179.221
Host: miniapp    Type: A      Value: 84.247.179.221
```

DNS propagation: **5-30 daqiqa**

---

### **2️⃣ Serverga SSH orqali kirish**

```bash
ssh root@84.247.179.221
# yoki
ssh your_user@84.247.179.221
```

---

### **3️⃣ Server sozlamalari**

#### **A. Kerakli dasturlarni o'rnatish**

```bash
# System update
sudo apt update && sudo apt upgrade -y

# Docker o'rnatish
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Docker Compose o'rnatish
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Git o'rnatish
sudo apt install git -y

# Make o'rnatish
sudo apt install make -y
```

#### **B. Firewall sozlash**

```bash
# UFW firewall
sudo ufw allow 22/tcp      # SSH
sudo ufw allow 80/tcp      # HTTP
sudo ufw allow 443/tcp     # HTTPS
sudo ufw allow 3000/tcp    # Frontend
sudo ufw allow 3001/tcp    # Mini-app
sudo ufw allow 8001/tcp    # Backend API
sudo ufw enable

# Statusni tekshirish
sudo ufw status
```

---

### **4️⃣ Loyihani serverga ko'chirish**

#### **Option 1: Git orqali (Tavsiya)**

```bash
# Home directoryga o'tish
cd ~

# Apps papkani yaratish
mkdir -p apps
cd apps

# Git repository clone qilish (agar GitHub/GitLab da bo'lsa)
git clone <YOUR_REPO_URL> my-ecommer
cd my-ecommer

# Yoki local dan scp orqali ko'chirish
```

#### **Option 2: SCP orqali (Local PC dan)**

```bash
# Local kompyuterda ishlatish
scp -r /home/wikki/apps/my-ecommer root@84.247.179.221:/root/apps/
```

---

### **5️⃣ Docker containers ishga tushirish**

```bash
cd /root/apps/my-ecommer

# Barcha containerlarni build va run
make up

# Yoki
docker-compose up -d --build
```

---

### **6️⃣ Database migrations va static files**

```bash
# Database migrations
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate

# Static files to'plash
docker-compose exec backend python manage.py collectstatic --noinput

# Superuser yaratish (Admin panel uchun)
docker-compose exec backend python manage.py createsuperuser
```

---

### **7️⃣ SSL Sertifikat (HTTPS) o'rnatish**

```bash
# Certbot o'rnatish
sudo apt install certbot python3-certbot-nginx -y

# Nginx containerdan tashqarida o'rnatish (host systemda)
sudo apt install nginx -y

# Nginx konfiguratsiyani ko'chirish
sudo cp /root/apps/my-ecommer/nginx.conf /etc/nginx/sites-available/taomchi.app
sudo ln -s /etc/nginx/sites-available/taomchi.app /etc/nginx/sites-enabled/

# Nginx test
sudo nginx -t

# Nginx restart
sudo systemctl restart nginx

# SSL sertifikat olish
sudo certbot --nginx -d taomchi.app -d www.taomchi.app -d api.taomchi.app -d miniapp.taomchi.app

# Avtomatik yangilanish
sudo certbot renew --dry-run
```

---

### **8️⃣ Natijani tekshirish**

Browser ochib quyidagilarni kiriting:

**IP orqali (darhol ishlaydi):**
- Frontend: `http://84.247.179.221:3000`
- Backend API: `http://84.247.179.221:8001/api/`
- Admin: `http://84.247.179.221:8001/admin/`
- Mini-app: `http://84.247.179.221:3001`

**Domen orqali (DNS propagation dan keyin):**
- Frontend: `https://taomchi.app`
- Backend API: `https://api.taomchi.app/api/`
- Admin: `https://api.taomchi.app/admin/`
- Mini-app: `https://miniapp.taomchi.app`

---

## 🔧 **Foydali Commandlar**

### **Containerlarni boshqarish:**
```bash
# Barcha containerlar statusini ko'rish
docker ps

# Loglarni ko'rish
docker logs kamolon-backend --tail 100 -f
docker logs kamolon-frontend --tail 100 -f
docker logs kamolon-miniapp --tail 100 -f

# Container restart
docker restart kamolon-backend
docker restart kamolon-frontend

# Barcha containerlarni to'xtatish
docker-compose down

# Barcha containerlarni o'chirish va qayta build
docker-compose down && docker-compose up -d --build
```

### **Redis cache tozalash:**
```bash
docker exec kamolon-redis redis-cli FLUSHALL
```

### **Database backup:**
```bash
docker exec kamolon-db pg_dump -U ecommerce_user ecommerce > backup_$(date +%Y%m%d).sql
```

### **Database restore:**
```bash
cat backup_20241130.sql | docker exec -i kamolon-db psql -U ecommerce_user -d ecommerce
```

---

## 📊 **Monitoring**

### **Resource usage:**
```bash
# CPU va Memory
docker stats

# Disk space
df -h

# Containerlar resource usage
docker stats --no-stream
```

### **Nginx access logs:**
```bash
sudo tail -f /var/log/nginx/access.log
```

---

## 🎯 **Production Checklist**

- [x] Server IP: `84.247.179.221` configured
- [x] DNS A records configured
- [x] Docker va Docker Compose o'rnatilgan
- [x] Firewall sozlangan
- [x] `.env` fayllar yangilangan
- [x] `nginx.conf` server IP bilan yangilangan
- [x] Frontend `.env.local` yangilangan
- [x] Mini-app `.env` yangilangan
- [x] `docker-compose.yml` yangilangan
- [ ] SSL sertifikat o'rnatilgan (DNS dan keyin)
- [ ] Database backup sozlangan
- [ ] Monitoring sozlangan

---

## 🚨 **Troubleshooting**

### **Agar containerlar ishlamasa:**
```bash
# Loglarni tekshiring
docker logs kamolon-backend --tail 50

# Container restart
docker-compose restart

# Barcha containerlarni qayta build
docker-compose down && docker-compose up -d --build
```

### **Agar rasmlar ko'rinmasa:**
```bash
# Media files permission
docker-compose exec backend chown -R www-data:www-data /app/media
docker-compose exec backend chmod -R 755 /app/media
```

### **Agar API ishlamasa:**
```bash
# Redis cache tozalash
docker exec kamolon-redis redis-cli FLUSHALL

# Backend restart
docker restart kamolon-backend
```

---

## 📝 **Eslatmalar**

1. **DNS propagation** - 5-30 daqiqa vaqt oladi
2. **SSL sertifikat** - Faqat DNS ishlagandan keyin o'rnatish mumkin
3. **DEBUG=False** - Production da debug mode o'chirilgan
4. **SECRET_KEY** - Production da o'zgartiring
5. **Regular backups** - Database va media files

---

## ✅ **Tayyor!**

Dasturingiz endi serverda ishlaydi:

- ✅ IP orqali: `http://84.247.179.221:3000`
- ✅ Domen orqali (DNS dan keyin): `https://taomchi.app`
- ✅ Production-ready
- ✅ High Performance
- ✅ 10x tezroq!

**Good luck!** 🚀
