# Aura3.0 Scripts Guide

## 🚀 Available Scripts

### Development
```bash
npm run dev          # Start both frontend and backend development servers
```

### Production
```bash
npm run build        # Build both frontend and backend for production
npm run start        # Start both frontend and backend production servers
```

### Individual Backend Operations
```bash
npm run build:backend    # Build only the backend
npm run start:backend    # Start only the backend
```

### Code Quality
```bash
npm run lint         # Run ESLint with auto-fix
```

### Database
```bash
npm run db:push      # Push database schema changes
npm run db:studio    # Open Drizzle Studio
```

## 🎯 What Was Removed

The following unnecessary scripts were removed to simplify the package.json:

- ❌ Complex development variants (dev:fast, dev:backend, dev:both, dev:parallel)
- ❌ Complex build variants (build:fast, build:backend, build:both, build:parallel)
- ❌ Performance optimization scripts (optimize:startup, performance)
- ❌ Cleanup scripts (clean, clean:all, clean:ports)
- ❌ Pre/post hooks (predev, prebuild, postinstall)
- ❌ Analysis scripts (build:analyze, analyze)

## 🚀 Benefits of Clean Scripts

1. **Simpler**: Easy to understand and remember
2. **Faster**: No unnecessary startup optimizations
3. **Maintainable**: Fewer dependencies and complexity
4. **Standard**: Follows Next.js conventions
5. **Full-Stack**: Handles both frontend and backend in single commands

## 💡 Usage Examples

```bash
# Start both frontend and backend development
npm run dev

# Build both frontend and backend for production
npm run build

# Start both frontend and backend production servers
npm run start

# Individual backend operations (if needed)
npm run build:backend
npm run start:backend

# Check code quality
npm run lint

# Manage database
npm run db:push
npm run db:studio
```

## 🔧 How It Works

- **`npm run dev`**: Uses `concurrently` to run both `next dev` and backend dev server simultaneously
- **`npm run build`**: First builds the backend, then builds the frontend
- **`npm run start`**: Uses `concurrently` to start both production servers simultaneously

---

**Result**: Clean, simple scripts that handle both frontend and backend! 🎉
