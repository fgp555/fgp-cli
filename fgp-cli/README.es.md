<!-- fgp-cli\readme.md -->

# 🧰 FGP CLI

Generador de proyectos rápido con soporte para **Node.js**, **TypeScript**, **HTML**, **Webhooks**, **GraphQL**, **Docker**, **OAuth**, **gRPC** y más.

> Crea apps con un solo comando, en segundos 🚀

---

## 📦 Instalación

```bash
npm install -g fgp-cli
npm update -g fgp-cli
npm uninstall -g fgp-cli
```

# Comandos

```sh
# 🧱 Proyectos Express
fgp create express [nombre]           # Express (JavaScript)
fgp create express-ts [nombre]        # Express (TypeScript)

# ⚡ Socket.io
fgp create socket.io [nombre]         # Express + Socket.io (JS)
fgp create socket.io-ts [nombre]      # Express + Socket.io (TS)

# 🔌 GraphQL
fgp create graphql [nombre]           # GraphQL (JS)
fgp create graphql-ts [nombre]        # GraphQL (TS)

# 💬 Webhook WhatsApp
fgp create whatsapp [nombre]          # Webhook WhatsApp (JS)
fgp create whatsapp-ts [nombre]       # Webhook WhatsApp (TS)

# 🎨 HTML
fgp create html [nombre]              # Proyecto HTML simple
fgp create html-tailwind [nombre]     # HTML + Tailwind vía CDN

# 🐳 Docker
fgp create docker [nombre]            # Dockerfile básico

# 🧠 Bases de datos
fgp create mongoose [nombre]          # MongoDB con Mongoose
fgp create postgres [nombre]          # PostgreSQL
fgp create mysql [nombre]             # MySQL
fgp create sqlite [nombre]            # SQLite

# 🔐 OAuth
fgp create oauth [nombre]             # OAuth 2.0 con Google

# 📬 Correo
fgp create mail [nombre]              # Envío de correos con Nodemailer

# 📦 Paquete npm
fgp create npm [nombre]               # Estructura de paquete npm

# 📡 Kafka
fgp create kafka [nombre]             # Kafka con Node.js

# 🧊 Redis
fgp create redis [nombre]             # Conexión a Redis

# 🛰️ gRPC
fgp create grpc [nombre]              # Servidor gRPC (JS/TS)

# 🧪 Generadores
fgp generate .gitignore
fgp generate method.http
fgp generate .env

# 🔁 Atajos
fgp g .gitignore
fgp g method.http
fgp g .env

# 📘 Ayuda
fgp --help
fgp -h
fgp --version
fgp -v
```
