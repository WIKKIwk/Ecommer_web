.PHONY: up down restart logs clean setup migrate superuser help prod-up
.DEFAULT_GOAL := help

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
	@docker compose down --remove-orphans 2>/dev/null || true
	@echo ""
	@echo "📋 Step 3/6: Building and starting containers..."
	@docker compose up -d --build
	@echo ""
	@echo "📋 Step 4/6: Waiting for database to be ready..."
	@sleep 10
	@echo ""
	@echo "📋 Step 5/6: Running database migrations..."
	@docker compose exec -T backend python manage.py migrate
	@echo ""
	@echo "📋 Step 6/6: Collecting static files..."
	@docker compose exec -T backend python manage.py collectstatic --noinput
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
	@docker compose down --remove-orphans
	@docker compose up -d --build
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
	@docker compose down
	@echo "✅ All services stopped!"

# Restart all services
restart:
	@echo "🔄 Restarting all services..."
	@docker compose restart
	@echo "✅ All services restarted!"

# View logs
logs:
	@echo "📊 Viewing logs (Ctrl+C to exit)..."
	@docker compose logs -f

# Clean everything
clean:
	@echo "🧹 Cleaning all containers, volumes, and images..."
	@docker compose down -v --rmi all --remove-orphans
	@echo "✅ Cleanup complete!"

# Run migrations
migrate:
	@echo "🗄️  Running database migrations..."
	@docker compose exec backend python manage.py makemigrations
	@docker compose exec backend python manage.py migrate
	@echo "✅ Migrations complete!"

# Create superuser
superuser:
	@echo "👤 Creating superuser..."
	@docker compose exec backend python manage.py createsuperuser

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

# Production deployment
prod-up: check-domain
	@echo "🌐 Starting production services..."
	@docker compose -f docker-compose.production.yml down --remove-orphans
	@docker compose -f docker-compose.production.yml up -d --build
	@sleep 10
	@docker compose -f docker-compose.production.yml exec -T backend python manage.py migrate
	@docker compose -f docker-compose.production.yml exec -T backend python manage.py collectstatic --noinput
	@echo ""
	@echo "✅ Production services started!"
	@echo "🔒 Don't forget to configure SSL certificates!"
	@echo ""
