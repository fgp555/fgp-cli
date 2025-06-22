<!-- fgp-cli\readme.md -->

# 🧰 FGP CLI

Fast project generator with support for **Node.js**, **TypeScript**, **HTML**, **Webhooks**, **GraphQL**, **Docker**, **OAuth**, **gRPC**, and more.

> Create apps with a single command, in seconds 🚀

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
fgp create express [name]             # Express (JavaScript)
fgp create express-ts [name]          # Express (TypeScript)

# ⚡ Socket.io
fgp create socket.io [name]           # Express + Socket.io (JS)
fgp create socket.io-ts [name]        # Express + Socket.io (TS)

# 🔌 GraphQL
fgp create graphql [name]             # GraphQL (JS)
fgp create graphql-ts [name]          # GraphQL (TS)

# 💬 WhatsApp Webhook
fgp create whatsapp [name]            # WhatsApp Webhook (JS)
fgp create whatsapp-ts [name]         # WhatsApp Webhook (TS)

# 🎨 HTML
fgp create html [name]                # Basic HTML project
fgp create html-tailwind [name]       # HTML + Tailwind via CDN

# 🐳 Docker
fgp create docker [name]              # Basic Dockerfile

# 🧠 Databases
fgp create mongoose [name]            # MongoDB with Mongoose
fgp create postgres [name]            # PostgreSQL
fgp create mysql [name]               # MySQL
fgp create sqlite [name]              # SQLite

# 🔐 OAuth
fgp create oauth [name]               # OAuth 2.0 with Google

# 📬 Mail
fgp create mail [name]                # Send emails with Nodemailer

# 📦 Create npm package
fgp create npm [name]                 # npm package structure

# 📡 Kafka
fgp create kafka [name]               # Kafka basics with Node.js

# 🧊 Redis
fgp create redis [name]               # Redis connection

# 🛰️ gRPC
fgp create grpc [name]                # gRPC server (JS/TS)


# Quick Generators
fgp generate .gitignore               # .gitignore file
fgp generate method.http              # REST Client test file
fgp generate .env                     # Basic .env file

# Shortcuts
fgp g .gitignore
fgp g method.http
fgp g .env


# Help
fgp --help     # Show help
fgp -h
fgp --version  # Show installed version
fgp -v
```
