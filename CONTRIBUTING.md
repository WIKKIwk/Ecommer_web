# Contributing to Taomchi E-Commerce

Thank you for your interest in contributing! 🎉

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/taomchi-app.git
   cd taomchi-app
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Set up development environment**
   ```bash
   cp .env.example .env
   cp frontend/.env.example frontend/.env.local
   cp mini-app/.env.example mini-app/.env
   docker-compose up -d
   ```

## Development Workflow

### Backend Development

```bash
# Enter backend container
docker-compose exec backend bash

# Run tests
python manage.py test

# Check code style
black .
flake8 .

# Run migrations
python manage.py makemigrations
python manage.py migrate
```

### Frontend Development

```bash
# Enter frontend container
docker-compose exec frontend sh

# Run linter
npm run lint

# Type check
npm run type-check

# Build
npm run build
```

## Code Style

### Python (Backend)
- Follow PEP 8
- Use Black for formatting
- Use type hints
- Write docstrings

### TypeScript (Frontend/Mini-App)
- Follow ESLint rules
- Use TypeScript strict mode
- Write meaningful variable names
- Add comments for complex logic

## Commit Messages

Follow conventional commits:

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

## Pull Request Process

1. Update README.md if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update documentation
5. Create Pull Request with clear description

## Questions?

Open an issue or reach out to maintainers.

Thank you for contributing! 🚀
