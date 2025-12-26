```
████████╗ █████╗  ██████╗ ███╗   ███╗ ██████╗██╗  ██╗██╗
╚══██╔══╝██╔══██╗██╔═══██╗████╗ ████║██╔════╝██║  ██║██║
   ██║   ███████║██║   ██║██╔████╔██║██║     ███████║██║
   ██║   ██╔══██║██║   ██║██║╚██╔╝██║██║     ██╔══██║██║
   ██║   ██║  ██║╚██████╔╝██║ ╚═╝ ██║╚██████╗██║  ██║██║
   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝
```

# FOOD DELIVERY E-COMMERCE PLATFORM

```
PROJECT: Taomchi Multi-Platform E-Commerce System
ARCHITECTURE: Microservices (Django + Next.js + Telegram Mini App)
DEPLOYMENT: Docker Containerization | Nginx Reverse Proxy
PROTOCOL: RESTful API | WebSocket Real-time Updates
DATABASE: PostgreSQL 16 (Optimized with Indexes)
```

![Django](https://img.shields.io/badge/Django-5.0-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)

---

## SYSTEM OVERVIEW

```
Enterprise-grade food delivery platform featuring three integrated user interfaces:
1. Web Application (Next.js) - Full-featured desktop experience
2. Telegram Mini App (Vite+React) - Native Telegram integration
3. RESTful API (Django) - Headless backend architecture

DEPLOYMENT ARCHITECTURE
┌──────────────────────────────────────────────────────────────┐
│                     Nginx Reverse Proxy                      │
│                         (Port 80)                            │
└────────┬────────────────┬──────────────┬─────────────────────┘
         │                │              │
    ┌────▼─────┐    ┌────▼──────┐  ┌────▼──────────┐
    │  Next.js │    │Telegram   │  │ Django       │
    │ Frontend │    │ Mini App  │  │ Backend API  │
    │ (3000)   │    │ (3001)    │  │ (8001)       │
    └──────┬───┘    └─────┬─────┘  └──────┬───────┘
           │              │                │
           └──────────────┴────────────────▼
                                    ┌────────────┐
                                    │PostgreSQL  │
                                    │   (5432)   │
                                    └────────────┘

Stack Isolation:
├── Database Layer: PostgreSQL 16-alpine (persistent data)
├── Backend Layer: Django 5.0 + DRF (business logic)
├── Frontend Layer: Next.js 16 + React 19 (web UI)
├── Mini App Layer: Vite + React 19 + TWA SDK (Telegram)
└── Proxy Layer: Nginx (routing, static files, compression)
```

---

## CAPABILITY MATRIX

### CORE FEATURES

```
E-COMMERCE ENGINE
├── Product catalog management
│   ├── Category hierarchy support
│   ├── Multi-image gallery
│   ├── Stock tracking system
│   └── Price variant management
│
├── Shopping cart operations
│   ├── Real-time price calculation
│   ├── Quantity validation
│   ├── Persistent cart state
│   └── Cross-platform synchronization
│
├── Order processing workflow
│   ├── Multi-step checkout
│   ├── Delivery zone validation
│   ├── Real-time order tracking
│   └── Status notification system
│
└── Multi-branch infrastructure
    ├── Geographic location mapping
    ├── Delivery zone definitions
    ├── Branch-specific inventory
    └── Automated branch selection

AUTHENTICATION & SECURITY
├── SMS OTP verification (Eskiz.uz)
├── Token-based API authentication
├── Rate limiting (DDoS mitigation)
├── CORS policy enforcement
├── SQL injection prevention (Django ORM)
├── XSS protection (CSP headers)
└── HTTPS enforcement (production)

TELEGRAM INTEGRATION
├── Native Telegram Web App (TWA)
├── Seamless user authentication
├── Push notification support
├── In-app payment processing
├── Deep linking capabilities
└── PWA offline functionality

PERFORMANCE OPTIMIZATIONS
├── Database query optimization
│   ├── Strategic indexing on frequent queries
│   ├── Connection pooling (max 200 connections)
│   └── Shared buffers: 256MB
│
├── Frontend optimizations
│   ├── Code splitting & lazy loading
│   ├── Image optimization (AVIF, WebP fallback)
│   ├── Minification & tree shaking
│   └── Browser caching strategies
│
└── Server-level optimizations
    ├── Gzip compression (Nginx)
    ├── Static file serving (Whitenoise)
    ├── Gunicorn worker management
    └── Async request handling
```

---

## TECHNICAL REQUIREMENTS

### SYSTEM PREREQUISITES

```
Docker Environment:
├── Docker Engine: 20.10+ with BuildKit support
├── Docker Compose: v2.0+ (plugin-based)
└── Docker resources: 2GB RAM minimum, 10GB disk

Operating System:
├── Ubuntu: 20.04 LTS, 22.04 LTS (recommended)
├── Debian: 11+, 12+
├── macOS: 12+ with Docker Desktop
└── Windows: 11 with WSL2 + Docker Desktop

Network:
├── Ports required: 80, 3000, 3001, 5432, 8001
├── Firewall: Allow inbound on required ports
└── DNS: A records for domain deployment
```

### TECHNOLOGY STACK

```
BACKEND RUNTIME
├── Framework: Django 5.0.14
├── API Framework: Django REST Framework 3.16.1
├── Database Driver: psycopg2-binary 2.9.9
├── Server: Gunicorn 21.2.0 (WSGI)
├── Admin Interface: django-unfold 0.42.0
├── Static Files: whitenoise 6.6.0
├── Environment: django-environ 0.12.0
├── Image Processing: Pillow 12.0.0
└── HTTP Client: requests 2.32.5

FRONTEND WEB APP (Next.js)
├── Framework: Next.js 16.0.1 (React 19.2.0)
├── Language: TypeScript 5.x
├── Styling: Tailwind CSS 4.x
├── Animation: Framer Motion 11.0.14
├── Maps: Leaflet 1.9.4 + react-leaflet 5.0.0
├── Icons: lucide-react 0.553.0
└── Build Tool: Native Next.js bundler

MINI APP (Telegram)
├── Build Tool: Vite 7.2.4
├── Framework: React 19.2.0
├── Router: react-router-dom 7.9.6
├── State Management: Zustand 5.0.8
├── API Client: TanStack Query 5.90.11
├── Telegram SDK: @twa-dev/sdk 8.0.2
├── HTTP Client: Axios 1.13.2
└── Styling: Tailwind CSS 3.4.18

DATABASE & CACHE
├── PostgreSQL: 16-alpine
├── Connection Pooling: PgBouncer (optional)
└── Backup: pg_dump automated scripts

INFRASTRUCTURE
├── Reverse Proxy: Nginx (alpine)
├── SSL/TLS: Certbot (Let's Encrypt)
├── Container Orchestration: Docker Compose
├── Database Admin: pgAdmin 4 (optional)
└── Process Manager: Supervisor (production)
```

---

## DEPLOYMENT PROTOCOLS

### [PROTOCOL 1] RAPID LOCAL DEPLOYMENT

```bash
# Prerequisites verification
docker --version          # Expected: 20.10+
docker compose version    # Expected: v2.0+

# Step 1: Acquire source code
git clone https://github.com/WIKKIwk/Ecommer_web.git
cd Ecommer_web

# Step 2: Automated setup (creates env files, builds, migrates)
make setup

# Step 3: Create administrative user
make superuser
# Interactive prompts: username, email, password

# Access endpoints:
# - Web App: http://localhost:3000
# - Mini App: http://localhost:3001
# - API: http://localhost:8001/api/
# - Admin: http://localhost:8001/admin/
```

**MAKE SETUP AUTOMATION SEQUENCE:**
1. Environment file generation (.env, frontend/.env.local, mini-app/.env)
2. Docker image builds (backend, frontend, mini-app, nginx)
3. Container orchestration startup
4. PostgreSQL healthcheck wait loop
5. Database schema migration (91 tables)
6. Static file collection
7. Media directory initialization

**TOTAL DEPLOYMENT TIME:** 2-3 minutes (first run)

### [PROTOCOL 2] MANUAL INSTALLATION

```bash
# Step 1: Environment configuration
cp .env.example .env
cp frontend/.env.example frontend/.env.local
cp mini-app/.env.example mini-app/.env

# Step 2: Configure environment variables
nano .env                    # Backend settings
nano frontend/.env.local     # Frontend API endpoints
nano mini-app/.env           # Mini app API endpoint

# Step 3: Build and start containers
docker compose up -d --build

# Step 4: Database initialization
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py collectstatic --noinput

# Step 5: Create superuser
docker compose exec backend python manage.py createsuperuser

# Step 6: Verify deployment
docker compose ps
curl -I http://localhost:8001/api/health
```

### [PROTOCOL 3] PRODUCTION DEPLOYMENT

#### SERVER PROVISIONING

```bash
# Target: Ubuntu 22.04 LTS (recommended)
# Minimum specs: 2 vCPU, 4GB RAM, 40GB SSD

# Step 1: Server access
ssh root@YOUR_SERVER_IP

# Step 2: System preparation
apt update && apt upgrade -y
apt install -y docker.io docker-compose-plugin git nginx certbot python3-certbot-nginx

# Step 3: Docker service activation
systemctl enable docker
systemctl start docker

# Step 4: User configuration (optional, security best practice)
useradd -m -s /bin/bash deploy
usermod -aG docker deploy
su - deploy
```

#### APPLICATION DEPLOYMENT

```bash
# Step 1: Repository acquisition
git clone https://github.com/WIKKIwk/Ecommer_web.git
cd Ecommer_web

# Step 2: Production environment configuration
cp .env.production .env
nano .env
# CRITICAL CHANGES:
#   DJANGO_DEBUG=False
#   DJANGO_SECRET_KEY=<generate_strong_key>
#   DJANGO_ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
#   DATABASE_URL=postgresql://user:pass@db:5432/dbname

cp frontend/.env.production frontend/.env.local
nano frontend/.env.local
# UPDATE:
#   NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
#   NEXT_PUBLIC_MEDIA_BASE_URL=https://api.yourdomain.com

cp mini-app/.env.production mini-app/.env
nano mini-app/.env
# UPDATE:
#   VITE_API_BASE_URL=https://api.yourdomain.com/api

# Step 3: Production container deployment
docker compose -f docker-compose.production.yml up -d --build

# Step 4: Database initialization
docker compose -f docker-compose.production.yml exec backend python manage.py migrate
docker compose -f docker-compose.production.yml exec backend python manage.py collectstatic --noinput --clear
docker compose -f docker-compose.production.yml exec backend python manage.py createsuperuser

# Step 5: Firewall configuration
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw enable
ufw status
```

#### DNS CONFIGURATION

```
Required A Records (add in domain registrar):
┌──────────┬─────────────────┬────────────────┐
│ Type     │ Name            │ Value          │
├──────────┼─────────────────┼────────────────┤
│ A        │ @               │ SERVER_IP      │
│ A        │ www             │ SERVER_IP      │
│ A        │ api             │ SERVER_IP      │
│ A        │ miniapp         │ SERVER_IP      │
└──────────┴─────────────────┴────────────────┘

Propagation time: 5-30 minutes (varies by provider)
Verification: dig yourdomain.com +short
```

#### SSL/TLS CERTIFICATE PROVISIONING

```bash
# Prerequisite: DNS records must be propagated and pointing to server

# Step 1: Stop nginx temporarily
docker compose -f docker-compose.production.yml stop nginx

# Step 2: Certbot certificate acquisition
certbot --nginx -d yourdomain.com -d www.yourdomain.com -d api.yourdomain.com -d miniapp.yourdomain.com
# Interactive prompts: email, agree to TOS, redirect HTTP to HTTPS (yes)

# Step 3: Restart nginx
docker compose -f docker-compose.production.yml start nginx

# Step 4: Auto-renewal configuration
# Certbot cron automatically installed at: /etc/cron.d/certbot
# Manual renewal test: certbot renew --dry-run

# Step 5: Verify HTTPS
curl -I https://yourdomain.com
# Expected: HTTP/2 200, Strict-Transport-Security header present
```

---

## CONFIGURATION MATRIX

### BACKEND ENVIRONMENT (.env)

```env
# Django Core Configuration
DJANGO_SECRET_KEY=your-secret-key-change-in-production
# Generate: python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
DJANGO_DEBUG=True                    # MUST be False in production
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1,backend
# Production: DJANGO_ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com,api.yourdomain.com

# Database Configuration (PostgreSQL)
DATABASE_URL=postgresql://ecommerce_user:ecommerce_secure_2024@db:5432/ecommerce
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE
# Production: Use strong password, avoid default credentials

# CORS Policy
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
# Production: https://yourdomain.com,https://miniapp.yourdomain.com

# SMS Gateway Integration (Eskiz.uz)
ESKIZ_EMAIL=your-email@example.com
ESKIZ_PASSWORD=your-password
SMS_SENDER_NAME=4546              # Eskiz sender ID
TEST_SMS_FIXED_CODE=1111           # Testing only, remove in production

# Security Headers
SECURE_SSL_REDIRECT=False          # True in production
SECURE_HSTS_SECONDS=31536000       # 1 year
SESSION_COOKIE_SECURE=False        # True in production with HTTPS
CSRF_COOKIE_SECURE=False           # True in production with HTTPS
```

### FRONTEND ENVIRONMENT (frontend/.env.local)

```env
# API Endpoints
NEXT_PUBLIC_API_BASE_URL=http://localhost:8001/api
# Public-facing API (browser requests)

INTERNAL_API_BASE_URL=http://backend:8001/api
# Server-side requests (Next.js SSR)

NEXT_PUBLIC_MEDIA_BASE_URL=http://localhost:8001
# Media files base URL

# Production values:
# NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
# INTERNAL_API_BASE_URL=http://backend:8001/api
# NEXT_PUBLIC_MEDIA_BASE_URL=https://api.yourdomain.com
```

### MINI APP ENVIRONMENT (mini-app/.env)

```env
VITE_API_BASE_URL=http://localhost:8001/api
# Production: https://api.yourdomain.com/api

# Optional: Telegram Bot Token (for enhanced features)
# VITE_TELEGRAM_BOT_TOKEN=your_bot_token
```

---

## OPERATIONAL PROCEDURES

### MAKE COMMAND REFERENCE

```bash
# Setup & Installation
make setup ................ Full automated setup (env + build + migrate)
make up ................... Start all containers
make down ................. Stop all containers
make restart .............. Restart all containers
make build ................ Rebuild images without starting

# Database Operations
make migrate .............. Run database migrations
make makemigrations ....... Create new migrations
make superuser ............ Create Django admin user
make dbshell .............. PostgreSQL interactive shell

# Development
make shell ................ Django shell (interactive)
make logs ................. View all container logs
make backend-logs ......... Backend container logs only
make frontend-logs ........ Frontend container logs only
make miniapp-logs ......... Mini app container logs only

# Code Quality
make lint ................. Run linters (backend + frontend)
make test ................. Execute test suite
make coverage ............. Generate test coverage report

# Maintenance
make collectstatic ........ Collect static files
make backup-db ............ Backup PostgreSQL database
make restore-db ........... Restore database from backup
make clean ................ Remove containers, volumes, images
```

### CONTAINER MANAGEMENT

```bash
# View running containers
docker compose ps

# Execute commands in backend container
docker compose exec backend python manage.py <command>

# Access container shell
docker compose exec backend bash      # Backend
docker compose exec frontend sh       # Frontend
docker compose exec mini-app sh       # Mini App

# View real-time logs
docker compose logs -f backend
docker compose logs -f --tail=100 backend  # Last 100 lines

# Resource monitoring
docker stats
docker compose top
```

### DATABASE ADMINISTRATION

```bash
# Access PostgreSQL CLI
docker compose exec db psql -U ecommerce_user -d ecommerce

# Common SQL operations
\dt                 # List tables
\d table_name       # Describe table
SELECT * FROM core_category LIMIT 10;

# Backup database
docker exec kamolon-db pg_dump -U ecommerce_user ecommerce > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore database
cat backup.sql | docker exec -i kamolon-db psql -U ecommerce_user -d ecommerce

# Database optimization
docker compose exec backend python manage.py dbshell
VACUUM ANALYZE;  # Rebuild statistics
REINDEX DATABASE ecommerce;  # Rebuild indexes
```

---

## API REFERENCE

### AUTHENTICATION ENDPOINTS

```
POST /api/auth/request-code/
Description: Request SMS OTP code
Payload: {
  "phone": "+998901234567"
}
Response: {
  "message": "SMS sent successfully",
  "code_length": 4
}

POST /api/auth/verify-code/
Description: Verify OTP and receive token
Payload: {
  "phone": "+998901234567",
  "code": "1234"
}
Response: {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "user": {
    "id": 1,
    "phone": "+998901234567",
    "full_name": "John Doe"
  }
}

GET /api/auth/me/
Headers: Authorization: Bearer <token>
Description: Get current user profile
Response: {
  "id": 1,
  "phone": "+998901234567",
  "full_name": "John Doe",
  "created_at": "2025-01-01T00:00:00Z"
}
```

### PRODUCT CATALOG ENDPOINTS

```
GET /api/categories/
Description: List all product categories
Response: [
  {
    "id": 1,
    "name": "Pizza",
    "slug": "pizza",
    "image": "http://localhost:8001/media/categories/pizza.jpg",
    "product_count": 15
  }
]

GET /api/products/
Query Params: category=<id>, search=<query>, page=<num>
Description: List products with filtering
Response: {
  "count": 45,
  "next": "http://localhost:8001/api/products/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "Margherita Pizza",
      "description": "Classic Italian pizza",
      "price": "45000.00",
      "category": 1,
      "images": [
        {"id": 1, "image": "http://localhost:8001/media/products/pizza1.jpg", "order": 1}
      ],
      "in_stock": true
    }
  ]
}

GET /api/products/<id>/
Description: Get product details
Response: {product_object}
```

### CART & ORDER ENDPOINTS

```
POST /api/cart/add/
Headers: Authorization: Bearer <token>
Payload: {
  "product_id": 1,
  "quantity": 2
}
Response: {
  "cart_item_id": 5,
  "product": {...},
  "quantity": 2,
  "total_price": "90000.00"
}

GET /api/cart/
Headers: Authorization: Bearer <token>
Description: Get current cart
Response: {
  "items": [{...}],
  "total_amount": "90000.00",
  "item_count": 2
}

POST /api/orders/create/
Headers: Authorization: Bearer <token>
Payload: {
  "branch_id": 1,
  "delivery_address": "Tashkent, Yunusabad",
  "payment_method": "cash",
  "note": "Ring doorbell twice"
}
Response: {
  "order_id": 123,
  "status": "pending",
  "total_amount": "90000.00",
  "estimated_delivery": "2025-01-01T14:30:00Z"
}
```

---

## PROJECT STRUCTURE

```
taomchi-ecommerce/
├── config/                    # Django project configuration
│   ├── __init__.py
│   ├── asgi.py               # ASGI application entry
│   ├── wsgi.py               # WSGI application entry
│   ├── urls.py               # Root URL configuration
│   ├── settings.py           # Development settings
│   └── settings_production.py # Production overrides
│
├── core/                      # Main Django application
│   ├── models.py             # Database models (15KB)
│   │   ├── Category
│   │   ├── Product
│   │   ├── ProductImage
│   │   ├── Branch
│   │   ├── Cart
│   │   ├── CartItem
│   │   ├── Order
│   │   └── OrderItem
│   ├── serializers.py        # DRF serializers (20KB)
│   ├── views.py              # API views (9KB)
│   ├── urls.py               # API routing
│   ├── admin.py              # Django admin customization (6KB)
│   ├── authentication.py     # Custom auth backend
│   ├── services.py           # Business logic layer
│   └── migrations/           # Database migrations
│
├── frontend/                  # Next.js web application
│   ├── src/
│   │   ├── app/              # App Router pages
│   │   │   ├── page.tsx      # Homepage
│   │   │   ├── products/     # Product listing
│   │   │   ├── cart/         # Shopping cart
│   │   │   └── checkout/     # Checkout flow
│   │   ├── components/       # React components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── CartItem.tsx
│   │   │   └── Header.tsx
│   │   └── context/          # React Context API
│   │       └── CartContext.tsx
│   ├── public/               # Static assets
│   ├── package.json          # Dependencies
│   └── tsconfig.json         # TypeScript config
│
├── mini-app/                  # Telegram Mini App (Vite)
│   ├── src/
│   │   ├── pages/            # Application pages
│   │   │   ├── Home.tsx
│   │   │   ├── Products.tsx
│   │   │   └── Cart.tsx
│   │   ├── components/       # Reusable components
│   │   ├── store/            # Zustand state management
│   │   │   └── cartStore.ts
│   │   └── main.tsx          # Application entry
│   ├── package.json
│   └── vite.config.ts        # Vite configuration
│
├── media/                     # Uploaded files (products, categories)
├── staticfiles/               # Collected static files (production)
│
├── docker-compose.yml         # Development orchestration
├── docker-compose.production.yml # Production orchestration
├── Dockerfile.backend         # Backend container image
├── nginx.conf                 # Nginx config (development)
├── nginx.production.conf      # Nginx config (production)
├── gunicorn.conf.py           # Gunicorn WSGI server config
├── requirements.txt           # Python dependencies
├── manage.py                  # Django management script
├── Makefile                   # Build automation (12KB)
├── .env.example               # Environment template
└── README.md                  # This documentation
```

---

## DIAGNOSTIC PROCEDURES

### ISSUE: Containers Fail to Start

```bash
# Diagnosis Sequence
[1] Check Docker service
    systemctl status docker
    docker info

[2] View container logs
    docker compose logs
    docker compose logs backend --tail=50

[3] Check port conflicts
    sudo lsof -i :8001  # Backend
    sudo lsof -i :3000  # Frontend
    sudo lsof -i :5432  # PostgreSQL

[4] Verify disk space
    df -h
    docker system df

Resolution:
# Kill conflicting processes
sudo kill -9 $(sudo lsof -t -i:8001)

# Clean Docker resources
docker compose down -v
docker system prune -a
docker compose up -d --build
```

### ISSUE: Database Connection Errors

```bash
# Diagnosis Sequence
[1] Check PostgreSQL container
    docker compose ps db
    docker compose logs db

[2] Test connection
    docker compose exec backend python -c "
    import psycopg2
    conn = psycopg2.connect('postgresql://ecommerce_user:ecommerce_secure_2024@db:5432/ecommerce')
    print('Connection successful')
    "

[3] Verify credentials
    cat .env | grep DATABASE_URL

Resolution:
# Restart database
docker compose restart db

# Wait for healthcheck
docker compose up -d db
sleep 10
docker compose exec db pg_isready -U ecommerce_user

# Re-run migrations
docker compose exec backend python manage.py migrate
```

### ISSUE: Static Files Not Loading

```bash
# Diagnosis:
[1] Verify static file collection
    docker compose exec backend python manage.py collectstatic --noinput

[2] Check Nginx volume mounts
    docker compose exec nginx ls -la /app/staticfiles

[3] Review Nginx logs
    docker compose logs nginx

Resolution:
# Recollect static files
docker compose exec backend python manage.py collectstatic --noinput --clear

# Restart Nginx
docker compose restart nginx

# For development, ensure Whitenoise is working:
docker compose exec backend python manage.py findstatic admin/css/base.css
```

### ISSUE: API Returns 500 Internal Server Error

```bash
# Diagnosis:
[1] Check backend logs
    docker compose logs backend --tail=100 -f

[2] Access Django shell for debugging
    docker compose exec backend python manage.py shell
    >>> from core.models import Product
    >>> Product.objects.count()

[3] Verify database migrations
    docker compose exec backend python manage.py showmigrations

Resolution:
# Run pending migrations
docker compose exec backend python manage.py migrate

# Check for code errors via logs
docker compose logs backend | grep -i error

# Restart backend
docker compose restart backend
```

---

## SECURITY CONSIDERATIONS

```
PRODUCTION SECURITY CHECKLIST
┌───────────────────────────────────────────────────────┐
│ [X] DJANGO_DEBUG=False in .env                       │
│ [X] Strong DJANGO_SECRET_KEY (50+ random chars)      │
│ [X] ALLOWED_HOSTS limited to domain names           │
│ [X] CORS_ALLOWED_ORIGINS restricted                 │
│ [X] HTTPS enforced (SECURE_SSL_REDIRECT=True)        │
│ [X] HSTS header enabled (31536000 seconds)          │
│ [X] Secure cookies (SESSION_COOKIE_SECURE=True)      │
│ [X] Database credentials changed from defaults       │
│ [X] Firewall rules configured (UFW)                  │
│ [X] SSH key-based auth (disable password login)     │
│ [X] Regular system updates (unattended-upgrades)     │
│ [X] SSL certificate auto-renewal (certbot cron)      │
│ [X] Database backups automated                      │
│ [X] Error logging configured (Sentry/etc)           │
└───────────────────────────────────────────────────────┘

SECURITY best practices
├── API rate limiting ........... 100 req/hour per IP (Django-ratelimit)
├── Password hashing ............ PBKDF2 with SHA256 (Django default)
├── SQL injection prevention .... Django ORM (parameterized queries)
├── XSS protection .............. Template auto-escaping
├── CSRF protection ............. Token-based (Django middleware)
├── Clickjacking prevention ..... X-Frame-Options: DENY
└── Security headers ............ Nginx configuration

SMS OTP Security:
├── Code expiration: 5 minutes
├── Max attempts: 3 per phone number
├── Rate limiting: 1 request/minute per phone
└── Production: Remove TEST_SMS_FIXED_CODE
```

---

## PERFORMANCE TUNING

```
DATABASE OPTIMIZATIONS
├── PostgreSQL configuration (docker-compose.yml)
│   ├── shared_buffers: 256MB
│   ├── effective_cache_size: 1GB
│   └── max_connections: 200
│
├── Django query optimization
│   ├── select_related() for ForeignKey
│   ├── prefetch_related() for ManyToMany
│   ├── .only() to limit fields
│   └── Database indexes on frequent lookups

NGINX OPTIMIZATIONS
├── Gzip compression enabled (level 6)
├── Static file caching (1 year)
├── Client body buffer: 10M
├── Proxy buffering enabled
└── Connection keep-alive

FRONTEND OPTIMIZATIONS
├── Next.js Image component (automatic optimization)
├── Code splitting (dynamic imports)
├── Lazy loading (React.lazy + Suspense)
├── Build-time static generation
└── CDN distribution (Cloudflare/etc recommended)

GUNICORN CONFIGURATION
├── Workers: (2 * CPU cores) + 1
├── Worker class: sync
├── Timeout: 30 seconds
├── Max requests: 1000 (worker recycling)
└── Access logging: off in production
```

---

## TROUBLESHOOTING GUIDE

```
Common Issues & Solutions:

"Port already in use"
→ kill -9 $(lsof -t -i:PORT_NUMBER)
→ Or change port in docker-compose.yml

"CORS error in browser console"
→ Verify CORS_ALLOWED_ORIGINS in .env matches frontend URL
→ Include protocol (http/https) and no trailing slash

"SMS not sending"
→ Check Eskiz.uz credentials in .env
→ Verify SMS balance: https://notify.eskiz.uz/user/balance
→ Check TEST_SMS_FIXED_CODE only in development

"Docker build fails"
→ docker system prune -a (clean cache)
→ docker compose build --no-cache

"Database migration error"
→ docker compose exec backend python manage.py migrate --fake
→ Or reset: docker compose down -v && make setup

"Next.js build timeout"
→ Increase Node memory: NODE_OPTIONS=--max-old-space-size=4096
→ Or build outside container: cd frontend && npm run build

Performance Issues:
→ Enable PostgreSQL query logging (log_min_duration_statement)
→ Use Django Debug Toolbar in development
→ Monitor with: docker stats
→ Check Nginx access logs for slow requests
```

---

## DEVELOPMENT GUIDELINES

### BACKEND DEVELOPMENT

```bash
# Create new Django app
docker compose exec backend python manage.py startapp app_name

# Database workflow
docker compose exec backend python manage.py makemigrations
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py dbshell

# Testing
docker compose exec backend python manage.py test
docker compose exec backend pytest

# Shell access
docker compose exec backend python manage.py shell_plus
```

### FRONTEND DEVELOPMENT

```bash
# Install new dependencies
cd frontend
npm install package-name
docker compose restart frontend

# Type checking
cd frontend
npm run build  # TypeScript compilation check
npx tsc --noEmit

# Linting
npm run lint
npm run lint -- --fix
```

---

## ROADMAP & ENHANCEMENTS

```
Planned Features:
├── Real-time order tracking ......... WebSocket integration
├── Payment gateway integration ....... Click, Payme, Uzum
├── Multi-language support ............ i18n (Uz, Ru, En)
├── Push notifications ................ FCM + Telegram
├── Admin analytics dashboard ......... Charts & metrics
├── Mobile apps ....................... React Native
└── AI recommendation engine .......... Product suggestions
```

---

## LICENSE

```
MIT License

Copyright (c) 2025 Taomchi Development Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## SUPPORT & CONTRIBUTIONS

```
Issue Reporting:
Platform: GitHub Issues
URL: https://github.com/WIKKIwk/Ecommer_web/issues

Required Information:
├── Environment: Development or Production
├── OS & Docker version
├── Error logs: docker compose logs <service>
├── Steps to reproduce
└── Expected vs actual behavior

Response SLA:
├── Critical (production down): 4 hours
├── High (broken feature): 24 hours
├── Medium (degraded): 72 hours
└── Low (enhancement): Best effort

Pull Request Guidelines:
[1] Fork repository
[2] Create feature branch (feature/amazing-feature)
[3] Write tests for new features
[4] Ensure all tests pass
[5] Update documentation
[6] Submit PR with detailed description
```

---

```
PROJECT: Taomchi Food Delivery Platform
ARCHITECTURE: Microservices (3-tier)
VERSION: 1.0.0
LAST_UPDATED: 2025-12-26
MAINTAINER: Development Team
STATUS: PRODUCTION_READY
```

**END DOCUMENTATION**
