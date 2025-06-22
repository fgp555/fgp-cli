<!-- fgp-cli\readme.md -->

# 🧰 FGP CLI

Generador de proyectos rápido con soporte para **Node.js**, **TypeScript**, **HTML**, **Webhooks**, **GraphQL**, **Docker** y más.

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
fgp create express [nombre]           # Express (JS)
fgp create express-ts [nombre]        # Express (TypeScript)
fgp create socket.io [nombre]         # Express + Socket.io (JS)
fgp create socket.io-ts [nombre]      # Express + Socket.io (TS)
fgp create graphql [nombre]           # GraphQL (JS)
fgp create graphql-ts [nombre]        # GraphQL (TS)
fgp create whatsapp [nombre]          # Webhook WhatsApp (JS)
fgp create whatsapp-ts [nombre]       # Webhook WhatsApp (TS)
fgp create html [nombre]              # Proyecto HTML simple
fgp create html-tailwind [nombre]     # HTML + Tailwind vía CDN
fgp create docker [nombre]            # Dockerfile básico (próximamente)

fgp generate .gitignore               # Genera un archivo .gitignore
fgp generate method.http              # Archivo HTTP para pruebas con REST Client
fgp g .gitignore
fgp g method.http


fgp --help     # Muestra ayuda
fgp -h
fgp --version  # Muestra la versión instalada
fgp -v

```
