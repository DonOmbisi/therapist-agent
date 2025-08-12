# 🔧 Development Process Management Guide

## 🚀 **RECOMMENDED: Use npm run dev:parallel**

Always use `npm run dev:parallel` instead of `npm run dev:both` for the best experience:

```bash
# ✅ BEST: Beautiful parallel output with color coding
npm run dev:parallel

# ❌ AVOID: Basic output, harder to read
npm run dev:both
```

## 🔍 **Why dev:parallel is Better**

### npm run dev:parallel:
- ✅ **Color-coded output**: Frontend (cyan), Backend (magenta)
- ✅ **Clear labeling**: `[Frontend]` and `[Backend]` prefixes
- ✅ **Better process management**: Kills all processes when stopped
- ✅ **Professional output**: Easy to read and debug

### npm run dev:both:
- ❌ **No color coding**: All output looks the same
- ❌ **Confusing output**: `[0]` and `[1]` prefixes
- ❌ **Port conflicts**: May leave processes running

## 🛠️ **Port Conflict Solutions**

### If you get "Port already in use" errors:

#### Option 1: Kill all Node processes (Windows)
```bash
taskkill /f /im node.exe
```

#### Option 2: Kill specific ports (Windows)
```bash
# Find what's using port 3000 (frontend)
netstat -ano | findstr :3000

# Find what's using port 3001 (backend)  
netstat -ano | findstr :3001

# Kill specific process by PID
taskkill /f /pid <PID_NUMBER>
```

#### Option 3: Use different ports
```bash
# Frontend on different port
npm run dev:fast -- --port 3002

# Backend on different port (edit ai-therapist-agent-backend/.env)
# Set BACKEND_PORT=3002
```

## 📋 **Daily Development Workflow**

### 1. Start Development
```bash
# Always use this command
npm run dev:parallel
```

**Expected Output:**
```
[Frontend] ✓ Ready in 2.3s
[Frontend] ○ Local:        http://localhost:3000
[Frontend] ○ Environments: .env

[Backend] info: Connected to MongoDB Atlas
[Backend] info: 🚀 AI Therapy Backend started successfully
[Backend] info: 📍 Server running on port 3001
[Backend] info: 🔗 Health check: http://localhost:3001/health
```

### 2. Stop Development
- Press `Ctrl+C` in the terminal
- Or close the terminal window

### 3. If Ports Are Stuck
```bash
# Kill all Node processes
taskkill /f /im node.exe

# Wait a moment
timeout /t 2

# Start again
npm run dev:parallel
```

## 🚨 **Troubleshooting Common Issues**

### Issue: "Port 3001 is already in use"
**Solution:**
```bash
taskkill /f /im node.exe
npm run dev:parallel
```

### Issue: Frontend won't connect to backend
**Check:**
1. Backend is running on port 3001
2. Frontend is running on port 3000
3. No firewall blocking connections

### Issue: "TURBOPACK=1 not found" 
**Solution:**
```bash
npm install cross-env
npm run dev:parallel
```

### Issue: Backend crashes immediately
**Check:**
1. MongoDB connection string in environment
2. All dependencies installed: `cd ai-therapist-agent-backend && npm install`
3. No syntax errors in backend code

## ⚡ **Performance Tips**

### For Maximum Speed:
1. **Always use `dev:parallel`** - fastest startup
2. **Keep terminal open** - maintains warm cache
3. **Use SSD storage** - faster file watching
4. **Close other apps** - more CPU/memory available

### Startup Times:
- `npm run dev:parallel`: **2-3 seconds** ⚡
- `npm run dev:both`: **3-5 seconds**
- Individual commands: **5-8 seconds**

## 🎯 **Commands Summary**

### Development:
```bash
# 🔥 BEST: Parallel with beautiful output
npm run dev:parallel

# ⚡ Good: Parallel with basic output  
npm run dev:both

# 🛠️ Manual: Start individually
npm run dev:fast        # Frontend only
npm run dev:backend     # Backend only
```

### Building:
```bash
# 🔥 BEST: Parallel build
npm run build:parallel

# ⚡ Good: Sequential build
npm run build:both

# 🛠️ Manual: Build individually
npm run build:fast      # Frontend only
npm run build:backend   # Backend only
```

### Maintenance:
```bash
# Clean everything
npm run clean:all

# Optimize startup
npm run optimize:startup

# Kill stuck processes
taskkill /f /im node.exe
```

## 🎉 **Ready to Develop!**

**Start your ultra-fast development experience:**
```bash
npm run dev:parallel
```

**Your apps will be available at:**
- 🎨 Frontend: http://localhost:3000
- 🔧 Backend: http://localhost:3001
- 🩺 Health Check: http://localhost:3001/health

Enjoy your lightning-fast development experience! ⚡

