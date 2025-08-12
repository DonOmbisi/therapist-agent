# Environment Configuration Setup

This document explains how the environment variables are organized in this project after consolidating multiple `.env` files.

## Overview

The project previously had multiple `.env` files:
- Main project `.env` file (in root directory)
- AI Therapist Backend `.env` file (in `ai-therapist-agent-backend/` directory)

These have been **consolidated into a single `.env` file** in the root directory that serves both the main application and the backend service.

## Environment File Structure

### Single Source of Truth
- **Main `.env` file**: Located in the root directory (`./env`)
- **Example file**: `.env.example` shows the expected structure
- **Backup**: The old backend `.env` is saved as `ai-therapist-agent-backend/.env.backup`

### Configuration Sections

The consolidated `.env` file is organized into logical sections:

#### 1. Main Application Configuration
```bash
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=development
```

#### 2. AI Therapist Backend Configuration
```bash
BACKEND_PORT=3001
BACKEND_NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
```

#### 3. AI Service Configuration
```bash
GEMINI_API_KEY=your_gemini_api_key_here
ZEREPY_API_KEY=your_zerepy_api_key_here
```

#### 4. Database Configuration
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name
```

#### 5. Blockchain Configuration
```bash
SONIC_PRIVATE_KEY=your_sonic_private_key_here
WALLET_PRIVATE_KEY_SONIC_BLAZE_TESTNET=your_sonic_private_key_here
```

## How It Works

### Backend Configuration
The AI Therapist Backend (`ai-therapist-agent-backend/src/index.ts`) has been updated to:

1. **Load the main `.env` file first**: `dotenv.config({ path: '../.env' })`
2. **Load local overrides**: `dotenv.config()` (if a local `.env` exists)
3. **Use namespaced variables**: `BACKEND_PORT` instead of just `PORT`

### Port Configuration
- **Main App**: Runs on port 3000 (Next.js default)
- **Backend**: Runs on port 3001 (configurable via `BACKEND_PORT`)

## Setup Instructions

1. **Copy the example file**:
   ```bash
   cp .env.example .env
   ```

2. **Fill in your actual values**:
   - Add your real API keys
   - Update database connection strings
   - Set your private keys (keep them secure!)

3. **Start both services**:
   ```bash
   # Start main application
   npm run dev

   # Start backend (in separate terminal)
   cd ai-therapist-agent-backend
   npm run dev
   ```

## Security Notes

⚠️ **Important Security Reminders**:

1. **Never commit `.env` to version control**
2. **Keep private keys secure** - the ones in the example are placeholders
3. **Use different credentials** for development vs. production
4. **Regularly rotate API keys** and secrets

## Migration Notes

### What Changed
- ✅ Single `.env` file in root directory
- ✅ Organized into logical sections
- ✅ Backend updated to read from parent directory
- ✅ Namespaced variables to avoid conflicts
- ✅ Maintained backward compatibility

### What Stayed the Same
- All existing functionality works
- Same API keys and secrets (just organized better)
- Same port numbers (3000 for frontend, 3001 for backend)

## Troubleshooting

### Backend Can't Find Environment Variables
1. Check that the main `.env` file exists in the root directory
2. Verify the backend is loading from the correct path
3. Check console logs for environment loading errors

### Port Conflicts
1. Ensure `BACKEND_PORT=3001` is set
2. Check no other services are using ports 3000 or 3001
3. Update port numbers if needed

### Missing Variables
1. Compare your `.env` with `.env.example`
2. Check that all required variables are present
3. Verify variable names match exactly (case-sensitive)

## Benefits of Consolidation

✅ **Single source of truth** for all environment variables
✅ **Better organization** with clear sections
✅ **Reduced complexity** - no more juggling multiple files
✅ **Easier maintenance** - update once, use everywhere
✅ **Clear documentation** of all required variables
