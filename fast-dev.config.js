// Fast development configuration
module.exports = {
  // Environment settings for maximum speed
  env: {
    NODE_ENV: 'development',
    NEXT_TELEMETRY_DISABLED: '1',
    TURBOPACK: '1',
    FAST_REFRESH: 'true',
    NEXT_PRIVATE_PROFILING: 'false',
    NEXT_PRIVATE_DEBUG_CACHE: 'false',
  },
  
  // Backend settings
  backend: {
    port: 3001,
    logLevel: 'error',
    dbPoolSize: 5,
    dbTimeout: 5000,
  },
  
  // Cache settings
  cache: {
    ttl: 300,
    enabled: true,
    maxSize: '100mb',
  },
  
  // Development optimizations
  dev: {
    parallel: true,
    incremental: true,
    skipLibCheck: true,
    transpileOnly: true,
  }
};

// Set environment variables
Object.assign(process.env, module.exports.env);
