# 🍜 Taomchi E-Commerce Platform

Modern e-commerce platform for food delivery with Telegram Mini App integration.

[![Django](https://img.shields.io/badge/Django-5.0-green.svg)](https://www.djangoproject.com/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

## 🚀 Quick Start (3 Commands!)

```bash
git clone https://github.com/YOUR_USERNAME/taomchi-app.git
cd taomchi-app
make setup
```

**That's it!** Visit http://localhost:3000 🎉

---

## 🎯 Features

### 🛒 E-Commerce
- Product catalog with categories
- Shopping cart management
- Multi-branch support
- Delivery zones
- Order tracking
- SMS OTP authentication

### 📱 Telegram Mini App
- Native Telegram integration
- Real-time updates
- PWA support
- Mobile-first design

### ⚡ Performance
- Database optimization with indexes
- Gunicorn production server
- Nginx reverse proxy with gzip
- Code splitting & lazy loading
- Image optimization (AVIF, WebP)

### 🔒 Security
- Rate limiting (DDoS protection)
- CORS configuration
- Security headers
- Token-based authentication
- SQL injection prevention

---

## 🏗️ Tech Stack

### Backend
- **Framework:** Django 5.0.14 + Django REST Framework
- **Database:** PostgreSQL 16
- **Server:** Gunicorn + Nginx
- **SMS:** Eskiz.uz integration

### Frontend
- **Framework:** Next.js 16 (React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion
- **Maps:** Leaflet

### Mini-App
- **Framework:** Vite + React 19
- **State:** Zustand + TanStack Query
- **Telegram:** TWA SDK
- **Styling:** Tailwind CSS

### DevOps
- **Containerization:** Docker + Docker Compose
- **Reverse Proxy:** Nginx
- **SSL:** Certbot (Let's Encrypt)

---

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Git
- 2GB+ RAM
- 10GB+ disk space

### 🚀 One-Command Installation

```bash
# 1. Clone repository
git clone https://github.com/YOUR_USERNAME/taomchi-app.git
cd taomchi-app

# 2. Auto setup (creates env files, builds containers, runs migrations)
make setup

# 3. Create admin user
make superuser

# That's it! 🎉
```

### 📋 What `make setup` does automatically:

1. ✅ Creates `.env` files from examples (if not exist)
2. ✅ Builds Docker containers
3. ✅ Starts all services (PostgreSQL, Backend, Frontend, Mini-App)
4. ✅ Waits for database to be ready
5. ✅ Runs database migrations
6. ✅ Collects static files

**Total time: ~2-3 minutes** ⏱️

### 🛠️ Manual Installation (if needed)

```bash
# 1. Clone repository
git clone https://github.com/YOUR_USERNAME/taomchi-app.git
cd taomchi-app

# 2. Create environment files
cp .env.example .env
cp frontend/.env.example frontend/.env.local
cp mini-app/.env.example mini-app/.env

# 3. Update .env files (optional, defaults work for local)
nano .env  # Backend settings
nano frontend/.env.local  # Frontend settings
nano mini-app/.env  # Mini-app settings

# 4. Start all services
make up

# 5. Run migrations
make migrate

# 6. Create superuser
make superuser
```

### Access

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8001/api/
- **Admin Panel:** http://localhost:8001/admin/
- **Mini-App:** http://localhost:3001

---

## 📋 Environment Variables

### Backend (.env)

```env
# Django Settings
DJANGO_SECRET_KEY=your-secret-key-here-change-in-production
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,backend

# Database
DATABASE_URL=postgresql://ecommerce_user:ecommerce_secure_2024@db:5432/ecommerce

# CORS
CORS_ALLOWED_ORIGINS=

# SMS Gateway (Eskiz.uz)
ESKIZ_EMAIL=your-email@example.com
ESKIZ_PASSWORD=your-password
SMS_SENDER_NAME=4546
TEST_SMS_FIXED_CODE=1111
```

### Frontend (frontend/.env.local)

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8001/api
NEXT_PUBLIC_MEDIA_BASE_URL=http://localhost:8001
```

### Mini-App (mini-app/.env)

```env
VITE_API_BASE_URL=http://localhost:8001/api
```

---

## 🌐 Production Deployment

### Server Requirements

- Ubuntu 20.04+ / Debian 11+
- 2GB+ RAM
- 20GB+ SSD
- Docker & Docker Compose installed

### Deployment Steps

```bash
# 1. SSH to server
ssh root@YOUR_SERVER_IP

# 2. Clone repository
git clone https://github.com/YOUR_USERNAME/taomchi-app.git
cd taomchi-app

# 3. Setup production environment
cp .env.production .env
cp frontend/.env.production frontend/.env.local
cp mini-app/.env.production mini-app/.env

# 4. Update .env files with production values
nano .env  # Change SECRET_KEY, DEBUG=False, ALLOWED_HOSTS
nano frontend/.env.local  # Update API URLs
nano mini-app/.env  # Update API URL

# 5. Start production services
docker-compose -f docker-compose.production.yml up -d --build

# 6. Run migrations
docker-compose -f docker-compose.production.yml exec backend python manage.py migrate
docker-compose -f docker-compose.production.yml exec backend python manage.py collectstatic --noinput
docker-compose -f docker-compose.production.yml exec backend python manage.py createsuperuser

# 7. Configure firewall
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable

# 8. Setup SSL (after DNS configuration)
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### DNS Configuration

Add these A records in your domain provider:

```
Type: A, Name: @,       Value: YOUR_SERVER_IP
Type: A, Name: www,     Value: YOUR_SERVER_IP
Type: A, Name: api,     Value: YOUR_SERVER_IP
Type: A, Name: miniapp, Value: YOUR_SERVER_IP
```

---

## 🛠️ Development

### Backend Development

```bash
# Enter backend container
docker-compose exec backend bash

# Create new app
python manage.py startapp app_name

# Make migrations
python manage.py makemigrations

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run tests
python manage.py test
```

### Frontend Development

```bash
# Enter frontend container
docker-compose exec frontend sh

# Install dependencies
npm install

# Build
npm run build

# Lint
npm run lint
```

### Database Management

```bash
# Backup database
docker exec kamolon-db pg_dump -U ecommerce_user ecommerce > backup.sql

# Restore database
cat backup.sql | docker exec -i kamolon-db psql -U ecommerce_user -d ecommerce

# Access PostgreSQL
docker-compose exec db psql -U ecommerce_user -d ecommerce
```

---

## 📊 Project Structure

```
taomchi-app/
├── config/                 # Django settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── core/                   # Main Django app
│   ├── models.py          # Database models
│   ├── views.py           # API views
│   ├── serializers.py     # DRF serializers
│   └── urls.py            # API routes
├── frontend/              # Next.js web app
│   ├── src/
│   │   ├── app/          # Pages
│   │   ├── components/   # React components
│   │   └── context/      # React context
│   └── public/           # Static files
├── mini-app/             # Telegram Mini App
│   ├── src/
│   │   ├── pages/       # App pages
│   │   ├── components/  # React components
│   │   └── store/       # Zustand store
│   └── public/          # Static files
├── media/               # Uploaded files
├── docker-compose.yml   # Local development
├── docker-compose.production.yml  # Production
├── nginx.conf          # Local nginx config
├── nginx.production.conf  # Production nginx
├── gunicorn.conf.py    # Gunicorn config
└── requirements.txt    # Python dependencies
```

---

## 🔧 Troubleshooting

### Containers not starting

```bash
# Check container logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mini-app

# Restart containers
docker-compose restart

# Rebuild containers
docker-compose down && docker-compose up -d --build
```

### Database connection errors

```bash
# Check database status
docker-compose ps

# Restart database
docker-compose restart db

# Check database logs
docker-compose logs db
```

### Port already in use

```bash
# Check what's using port 8001
sudo lsof -i :8001

# Kill process
sudo kill -9 <PID>

# Or change port in docker-compose.yml
```

### Static files not loading

```bash
# Collect static files
docker-compose exec backend python manage.py collectstatic --noinput

# Check static volume
docker volume ls
```

---

## 📚 Documentation

- [Deployment Instructions](DEPLOYMENT_INSTRUCTIONS.md) - Local vs Production guide
- [Performance Guide](PERFORMANCE_GUIDE.md) - Optimization details
- [Server Deployment](CONTABO_DEPLOYMENT.md) - Server setup guide

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👤 Author

**Your Name**
- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)

---

## 🙏 Acknowledgments

- Django & Django REST Framework
- Next.js & React
- Telegram Mini Apps
- Docker & Docker Compose

---

## 📞 Support

For issues and questions:
- 📧 Email: support@yourdomain.com
- 💬 Telegram: @your_telegram
- 🐛 Issues: [GitHub Issues](https://github.com/YOUR_USERNAME/taomchi-app/issues)

---

**Made with ❤️ for food lovers**
