<!-- fgp-cli\readme.md -->

# 🧰 FGP CLI

Fast project generator with support for **Node.js**, **TypeScript**, **HTML**, **Webhooks**, **GraphQL**, **Docker**, **OAuth**, **gRPC**, and more.

> Create apps with a single command, in seconds 🚀

---

## 🌐 Visit My Website

🔗 [https://frankgp.com](https://frankgp.com?npm) — Explore tools, tips, and development resources by **Frank GP**.

---

## 🎬 Demo Video

Watch the full demo on YouTube:

- [📺 FGP CLI - Fast Project Generator](https://youtu.be/btgmyqPEEhE)
- [📺 fgp create google-sheet](https://youtu.be/qyjSOd1Xf18)

---

## 📦 Installation

```bash
npm install -g fgp-cli
npm update -g fgp-cli
npm uninstall -g fgp-cli
```

# Comandos

```sh
# 🛠️ Generators
fgp generate .env                   # ⚙️ Basic .env file
fgp generate .gitignore             # 🙈 .gitignore file
fgp generate request.http           # 🌐 REST Client test file
fgp generate module [name]          # 📦 Full module (controller, service, routes, etc.)
fgp generate component UserPage src/components

# Shortcuts
fgp g .env
fgp g .gitignore
fgp g request.http
fgp g module [name]                 # 📦 Full module (controller, service, routes, etc.)
fgp g component UserPage src/components

# 🧱 Express Projects
fgp create express myapp            # Express (JavaScript)
fgp create express-ts myapp         # Express (TypeScript)
fgp create express-auth myapp       # Express (TypeScript)
fgp create typeorm myapp            # Express + TypeORM

# 🔗 Google
fgp create google-sheet myapp       # Google Sheet integration
fgp create google-drive myapp       # Google Drive integration

# 🧠 Databases
fgp create mongoose myapp           # MongoDB with Mongoose
fgp create postgres myapp           # PostgreSQL
fgp create mysql myapp              # MySQL
fgp create sqlite myapp             # SQLite

# ⚡ Socket.io
fgp create socket.io myapp          # Express + Socket.io (JavaScript)
fgp create socket.io-ts myapp       # Express + Socket.io (TypeScript)

# 🔌 GraphQL
fgp create graphql myapp            # GraphQL (JavaScript)
fgp create graphql-ts myapp         # GraphQL (TypeScript)

# 💬 WhatsApp Webhook
fgp create whatsapp myapp           # WhatsApp Webhook (JavaScript)
fgp create whatsapp-ts myapp        # WhatsApp Webhook (TypeScript)

# 🎨 HTML
fgp create html myapp               # Basic HTML project
fgp create html-tailwind myapp      # HTML + Tailwind via CDN

# 🐳 Docker
fgp create docker myapp             # Basic Dockerfile

# 🧊 Redis
fgp create redis myapp              # Redis integration

# 📡 Kafka
fgp create kafka myapp              # Kafka setup with Node.js

# 🔐 OAuth
fgp create oauth myapp              # OAuth 2.0 with Google

# 📬 Mail
fgp create mail myapp               # Send emails with Nodemailer

# 📦 npm Package
fgp create npm myapp                # npm package starter

# 🛰️ gRPC
fgp create grpc myapp               # gRPC server (JavaScript/TypeScript)

# Help
fgp --help     # Show help
fgp -h
fgp --version  # Show installed version
fgp -v
```
