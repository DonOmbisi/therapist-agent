# 🔧 Port Conflict Troubleshooting Guide

## 🚨 **Quick Fix for "Port Already in Use" Errors**

### ⚡ **One-Command Solution:**
```bash
npm run clean:ports && npm run dev:parallel
```

### 🛠️ **Manual Solution:**
```bash
# Kill specific ports
netstat -ano | findstr :3001
taskkill /f /pid <PID_NUMBER>

# Or kill all Node processes
taskkill /f /im node.exe

# Wait and restart
timeout /t 2
npm run dev:parallel
```

## 🔍 **Understanding the Issue**

### Why This Happens:
1. **Previous processes didn't close properly**
2. **Multiple terminals running dev servers**
3. **Background processes holding ports**
4. **System didn't release ports immediately**

### Ports Used:
- **Port 3000**: Frontend (Next.js)
- **Port 3001**: Backend (Express.js)

## 📋 **Step-by-Step Solutions**

### Solution 1: Use the Clean Ports Script
```bash
# This will automatically clean up ports and restart
npm run clean:ports
npm run dev:parallel
```

### Solution 2: Manual Port Cleanup
```bash
# Step 1: Check what's using the ports
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# Step 2: Kill specific processes (replace PID with actual number)
taskkill /f /pid <PID_FROM_STEP_1>

# Step 3: Verify ports are free
netstat -ano | findstr ":3000\|:3001"

# Step 4: Start development
npm run dev:parallel
```

### Solution 3: Nuclear Option (Kill All Node)
```bash
# Kill all Node.js processes
taskkill /f /im node.exe

# Wait for cleanup
timeout /t 3

# Start fresh
npm run dev:parallel
```

## 🎯 **Prevention Tips**

### Best Practices:
1. **Always use `npm run dev:parallel`** (not `dev:both`)
2. **Stop with Ctrl+C** instead of closing terminal
3. **One development session at a time**
4. **Close IDE terminals when switching projects**

### Daily Workflow:
```bash
# Start development
npm run dev:parallel

# Stop development (use Ctrl+C in terminal)
# Don't just close the terminal window

# If ports get stuck
npm run clean:ports
npm run dev:parallel
```

## 🔧 **Advanced Troubleshooting**

### Check Port Usage:
```bash
# See all port usage
netstat -ano | findstr LISTENING

# Check specific port
netstat -ano | findstr :3001

# Find process details
tasklist | findstr <PID>
```

### Alternative Ports:
If you need to use different ports:

```bash
# Frontend on port 3002
npm run dev:fast -- --port 3002

# Backend on port 3002 (edit .env in backend folder)
# Set: BACKEND_PORT=3002
cd ai-therapist-agent-backend
echo BACKEND_PORT=3002 >> .env
npm run dev
```

### Windows-Specific Issues:
```bash
# Sometimes Windows doesn't release ports immediately
# Wait longer before restarting
timeout /t 5

# Or restart network stack (as admin)
netsh int ip reset
```

## 📊 **Common Error Messages**

### "Port 3001 is already in use"
**Cause**: Backend process already running
**Fix**: `npm run clean:ports`

### "EADDRINUSE :::3000"
**Cause**: Frontend process already running  
**Fix**: `taskkill /f /im node.exe`

### "connect ECONNREFUSED ::1:3001"
**Cause**: Frontend can't reach backend
**Fix**: Ensure backend is running on port 3001

## 🚀 **Quick Reference Commands**

```bash
# Start development (recommended)
npm run dev:parallel

# Fix port conflicts
npm run clean:ports

# Emergency reset
taskkill /f /im node.exe && timeout /t 2 && npm run dev:parallel

# Check what's running
netstat -ano | findstr ":3000\|:3001"

# Kill specific process
taskkill /f /pid <PID>
```

## ✅ **Success Indicators**

When everything is working correctly, you should see:

```
[Frontend] ✓ Ready in 2.1s
[Frontend] ○ Local:        http://localhost:3000

[Backend] info: Connected to MongoDB Atlas
[Backend] info: 🚀 AI Therapy Backend started successfully
[Backend] info: 📍 Server running on port 3001
[Backend] info: 🔗 Health check: http://localhost:3001/health
```

## 🆘 **Emergency Contacts**

If all else fails:

1. **Restart your computer** (nuclear option)
2. **Check antivirus/firewall** settings
3. **Verify Node.js installation**: `node --version`
4. **Reinstall dependencies**: `npm install`

---

## 🎉 **You're All Set!**

Use these commands for smooth development:

```bash
# Daily workflow
npm run dev:parallel

# If ports get stuck
npm run clean:ports && npm run dev:parallel
```

Happy coding! 🚀

