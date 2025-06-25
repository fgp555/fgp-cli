<!-- fgp-cli\readme.md -->

# 🧰 FGP CLI

Fast project generator with support for **Node.js**, **TypeScript**, **HTML**, **Webhooks**, **GraphQL**, **Docker**, **OAuth**, **gRPC**, and more.

> Create apps with a single command, in seconds 🚀

---

## 🎬 Demo Video

Watch the full demo on YouTube:  
📺 [FGP CLI - Fast Project Generator](https://youtu.be/btgmyqPEEhE)

---

## 📦 Installation

```bash
npm install -g fgp-cli
npm update -g fgp-cli
npm uninstall -g fgp-cli
```

# Comandos

```sh
# 🧱 Express Projects
fgp create express myapp             # Express (JavaScript)
fgp create express-ts myapp          # Express (TypeScript)
fgp create typeorm myapp             # Express (TypeScript)

# ⚡ Socket.io
fgp create socket.io myapp           # Express + Socket.io (JS)
fgp create socket.io-ts myapp        # Express + Socket.io (TS)

# 🔌 GraphQL
fgp create graphql myapp             # GraphQL (JS)
fgp create graphql-ts myapp          # GraphQL (TS)

# 💬 WhatsApp Webhook
fgp create whatsapp myapp            # WhatsApp Webhook (JS)
fgp create whatsapp-ts myapp         # WhatsApp Webhook (TS)

# 🎨 HTML
fgp create html myapp                # Basic HTML project
fgp create html-tailwind myapp       # HTML + Tailwind via CDN

# 🐳 Docker
fgp create docker myapp              # Basic Dockerfile

# 🧠 Databases
fgp create mongoose myapp            # MongoDB with Mongoose
fgp create postgres myapp            # PostgreSQL
fgp create mysql myapp               # MySQL
fgp create sqlite myapp              # SQLite

# 🔐 OAuth
fgp create oauth myapp               # OAuth 2.0 with Google

# 📬 Mail
fgp create mail myapp                # Send emails with Nodemailer

# 📦 Create npm package
fgp create npm myapp                 # npm package structure

# 📡 Kafka
fgp create kafka myapp               # Kafka basics with Node.js

# 🧊 Redis
fgp create redis myapp               # Redis connection

# 🛰️ gRPC
fgp create grpc myapp                # gRPC server (JS/TS)


# Quick Generators
fgp generate .gitignore               # .gitignore file
fgp generate request.http              # REST Client test file
fgp generate .env                     # Basic .env file

# Shortcuts
fgp g .gitignore
fgp g request.http
fgp g .env


# Help
fgp --help     # Show help
fgp -h
fgp --version  # Show installed version
fgp -v
```
