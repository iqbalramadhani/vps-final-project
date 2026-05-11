module.exports = {
  apps : [{
    name: "simple-node-app",
    script: "index.js",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "150M", // Jika aplikasi tembus 150MB RAM, PM2 akan merestartnya secara otomatis
    env: {
      NODE_ENV: "production",
      PORT: 3000
    }
  }]
}