.PHONY: up down restart logs clean setup migrate superuser help prod-up
.DEFAULT_GOAL := help

# Detect Docker Compose command (supports both old and new versions)
DOCKER_COMPOSE := $(shell if docker compose version >/dev/null 2>&1; then echo "docker compose"; else echo "docker-compose"; fi)


help:
	@echo "🍜 Taomchi E-Commerce - Available Commands:"
	@echo ""
	@echo "  🚀 Quick Start (First time):"
	@echo "     make setup     - Full auto setup (env files + up + migrate + superuser)"
	@echo ""
	@echo "  🐳 Docker Commands:"
	@echo "     make up        - Start all services"
	@echo "     make down      - Stop all services"
	@echo "     make restart   - Restart all services"
	@echo "     make logs      - View logs"
	@echo "     make clean     - Stop and remove all containers, volumes, images"
	@echo ""
	@echo "  🗄️  Database:"
	@echo "     make migrate   - Run database migrations"
	@echo "     make superuser - Create admin user"
	@echo ""
	@echo "  🌐 Production:"
	@echo "     make prod-up   - Start production services"
	@echo ""
	@echo "  📚 Access URLs:"
	@echo "     Frontend:  http://localhost:3000"
	@echo "     Backend:   http://localhost:8001/api/"
	@echo "     Admin:     http://localhost:8001/admin/"
	@echo "     Mini-App:  http://localhost:3001"
	@echo ""

# 🎯 Full Auto Setup (GitHub dan yuklab birinchi marta ishlatish uchun)
setup:
	@echo "🚀 Starting auto setup..."
	@echo ""
	@echo "📋 Step 1/6: Checking environment files..."
	@if [ ! -f .env ]; then \
		echo "  ⚙️  Creating .env from .env.example..."; \
		cp .env.example .env; \
		echo "  ✅ .env created"; \
	else \
		echo "  ✅ .env already exists"; \
	fi
	@if [ ! -f frontend/.env.local ]; then \
		echo "  ⚙️  Creating frontend/.env.local..."; \
		cp frontend/.env.example frontend/.env.local; \
		echo "  ✅ frontend/.env.local created"; \
	else \
		echo "  ✅ frontend/.env.local already exists"; \
	fi
	@if [ ! -f mini-app/.env ]; then \
		echo "  ⚙️  Creating mini-app/.env..."; \
		cp mini-app/.env.example mini-app/.env; \
		echo "  ✅ mini-app/.env created"; \
	else \
		echo "  ✅ mini-app/.env already exists"; \
	fi
	@echo ""
	@echo "📋 Step 2/6: Stopping existing containers..."
	@$(DOCKER_COMPOSE) down --remove-orphans 2>/dev/null || true
	@echo ""
	@echo "📋 Step 3/6: Building and starting containers..."
	@$(DOCKER_COMPOSE) up -d --build
	@echo ""
	@echo "📋 Step 4/6: Waiting for database to be ready..."
	@sleep 10
	@echo ""
	@echo "📋 Step 5/6: Running database migrations..."
	@$(DOCKER_COMPOSE) exec -T backend python manage.py migrate
	@echo ""
	@echo "📋 Step 6/6: Collecting static files..."
	@$(DOCKER_COMPOSE) exec -T backend python manage.py collectstatic --noinput
	@echo ""
	@echo "✅ Setup complete!"
	@echo ""
	@echo "🎉 Next steps:"
	@echo "  1. Create admin user:  make superuser"
	@echo "  2. Visit frontend:     http://localhost:3000"
	@echo "  3. Visit admin:        http://localhost:8001/admin/"
	@echo ""

# Start all services
up:
	@echo "🚀 Starting all services..."
	@$(DOCKER_COMPOSE) down --remove-orphans
	@$(DOCKER_COMPOSE) up -d --build
	@echo ""
	@echo "✅ All services started!"
	@echo ""
	@echo "📍 Access URLs:"
	@echo "  Frontend:  http://localhost:3000"
	@echo "  Backend:   http://localhost:8001/api/"
	@echo "  Admin:     http://localhost:8001/admin/"
	@echo "  Mini-App:  http://localhost:3001"
	@echo ""
	@echo "📊 View logs:     make logs"
	@echo "🛑 Stop services: make down"
	@echo ""

# Stop all services
down:
	@echo "🛑 Stopping all services..."
	@$(DOCKER_COMPOSE) down
	@echo "✅ All services stopped!"

# Restart all services
restart:
	@echo "🔄 Restarting all services..."
	@$(DOCKER_COMPOSE) restart
	@echo "✅ All services restarted!"

# View logs
logs:
	@echo "📊 Viewing logs (Ctrl+C to exit)..."
	@$(DOCKER_COMPOSE) logs -f

# Clean everything
clean:
	@echo "🧹 Cleaning all containers, volumes, and images..."
	@$(DOCKER_COMPOSE) down -v --rmi all --remove-orphans
	@echo "✅ Cleanup complete!"

# Run migrations
migrate:
	@echo "🗄️  Running database migrations..."
	@$(DOCKER_COMPOSE) exec backend python manage.py makemigrations
	@$(DOCKER_COMPOSE) exec backend python manage.py migrate
	@echo "✅ Migrations complete!"

# Create superuser
superuser:
	@echo "👤 Creating superuser..."
	@$(DOCKER_COMPOSE) exec backend python manage.py createsuperuser

# Check and configure domain
check-domain:
	@if [ ! -f .env ]; then \
		echo "⚙️  Creating .env from .env.example..."; \
		cp .env.example .env; \
	fi
	@if grep -q "DOMAIN_OR_IP=your-domain.com" .env || grep -q "DOMAIN_OR_IP=" .env; then \
		echo ""; \
		echo "⚠️  Domain not configured!"; \
		echo "👉 Please enter your domain name or server IP (e.g., my-shop.com or 123.45.67.89):"; \
		read -p "   > " domain_val; \
		if [ ! -z "$$domain_val" ]; then \
			sed -i "s/DOMAIN_OR_IP=your-domain.com/DOMAIN_OR_IP=$$domain_val/" .env; \
			sed -i "s/DOMAIN_OR_IP=/DOMAIN_OR_IP=$$domain_val/" .env; \
			echo "✅ Domain configured to: $$domain_val"; \
		else \
			echo "❌ Domain cannot be empty!"; \
			exit 1; \
		fi \
	fi
	@if ! grep -q "CLOUDFLARE_TUNNEL_TOKEN=." .env; then \
		echo ""; \
		echo "🌥️  Cloudflare Tunnel (optional):"; \
		echo "👉 Enter your Cloudflare Tunnel token (press Enter to skip):"; \
		echo "   Get it from: https://one.dash.cloudflare.com"; \
		read -p "   > " cf_token; \
		if [ ! -z "$$cf_token" ]; then \
			sed -i "s/CLOUDFLARE_TUNNEL_TOKEN=/CLOUDFLARE_TUNNEL_TOKEN=$$cf_token/" .env; \
			echo "✅ Cloudflare Tunnel configured!"; \
		else \
			echo "⏭️  Skipping Cloudflare Tunnel (you can add it later to .env)"; \
		fi \
	fi


# Production deployment
prod-up: check-domain
	@echo "🌐 Starting production services..."
	@$(DOCKER_COMPOSE) -f docker-compose.production.yml down --remove-orphans
	@if grep -q "CLOUDFLARE_TUNNEL_TOKEN=." .env && ! grep -q "CLOUDFLARE_TUNNEL_TOKEN=$$" .env; then \
		echo "🌥️  Cloudflare Tunnel detected, activating tunnel..."; \
		$(DOCKER_COMPOSE) -f docker-compose.production.yml --profile cloudflare up -d --build; \
	else \
		$(DOCKER_COMPOSE) -f docker-compose.production.yml up -d --build; \
	fi
	@sleep 10
	@$(DOCKER_COMPOSE) -f docker-compose.production.yml exec -T backend python manage.py migrate
	@$(DOCKER_COMPOSE) -f docker-compose.production.yml exec -T backend python manage.py collectstatic --noinput
	@echo ""
	@echo "✅ Production services started!"
	@echo "🔒 Don't forget to configure SSL certificates!"
	@echo ""

