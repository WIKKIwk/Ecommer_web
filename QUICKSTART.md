# ⚡ Quick Start Guide

## 🎯 3-Command Installation

```bash
# 1. Clone
git clone https://github.com/YOUR_USERNAME/taomchi-app.git

# 2. Enter directory
cd taomchi-app

# 3. Auto setup
make setup
```

**Done!** 🎉

---

## 📍 Access Your App

After `make setup` completes (~2-3 minutes):

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8001/api/
- **Admin Panel:** http://localhost:8001/admin/ (after creating superuser)
- **Mini-App:** http://localhost:3001

---

## 👤 Create Admin User

```bash
make superuser
```

Follow the prompts:
- Username: admin
- Email: admin@example.com
- Password: (your secure password)

---

## 🎮 Useful Commands

```bash
make help       # Show all available commands
make logs       # View logs
make restart    # Restart services
make down       # Stop services
make clean      # Remove everything
```

---

## 🔧 What if something goes wrong?

### Services not starting?

```bash
# Stop everything
make down

# Clean and restart
make clean
make setup
```

### Port already in use?

```bash
# Check what's using port 8001
sudo lsof -i :8001

# Kill the process
sudo kill -9 <PID>

# Or change ports in docker-compose.yml
```

### Database errors?

```bash
# Restart database
docker compose restart db

# Re-run migrations
make migrate
```

---

## 📚 Next Steps

1. ✅ Create admin user: `make superuser`
2. ✅ Visit admin: http://localhost:8001/admin/
3. ✅ Add categories and products
4. ✅ Visit frontend: http://localhost:3000
5. ✅ Test ordering flow

---

## 🌐 Production Deployment

For production server deployment:

```bash
# On server
git clone https://github.com/YOUR_USERNAME/taomchi-app.git
cd taomchi-app

# Use production setup
cp .env.production .env
cp frontend/.env.production frontend/.env.local
cp mini-app/.env.production mini-app/.env

# Edit production values
nano .env

# Start production
make prod-up
```

See [DEPLOYMENT_INSTRUCTIONS.md](DEPLOYMENT_INSTRUCTIONS.md) for details.

---

## 💡 Tips

- Default credentials work for local development
- SMS OTP uses test mode (code: 1111)
- Database data persists in Docker volumes
- Edit `.env` files to customize settings

---

## 🆘 Need Help?

- 📚 Full docs: [README.md](README.md)
- 🚀 Deployment: [DEPLOYMENT_INSTRUCTIONS.md](DEPLOYMENT_INSTRUCTIONS.md)
- ⚡ Performance: [PERFORMANCE_GUIDE.md](PERFORMANCE_GUIDE.md)
- 🐛 Issues: GitHub Issues

---

**Enjoy coding!** 🚀
