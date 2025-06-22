# 📦 Documentación para publicar un paquete en NPM

## 🧪 Desarrollo local

```bash
# Vuelve a vincular globalmente tu CLI local
npm link

# Desvincula globalmente el paquete (si ya estaba)
npm unlink -g

# Verifica que esté instalado globalmente
npm list -g

# Verifica que el comando esté disponible
where fgp

# Probar comandos
fgp --help
fgp --version
fgp create express
fgp create express mi-app

```

# Publicar to npmjs.com

```sh
# Iniciar sesión en npm (solo la primera vez)
npm adduser

# Limpiar antes de publicar
rm -rf node_modules package-lock.json

npm version major   # 1.0.0 → 2.0.0
npm version minor   # 1.0.0 → 1.1.0
npm version patch   # 1.0.0 → 1.0.1

# Publicar el paquete
npm publish

npm version patch && npm publish

# Si es un paquete con scope (@tuusuario/paquete) o lo quieres público:
npm publish --access public
```

# 📁 Ver rutas útiles

```bash
# Carpeta global de instalación de módulos
npm root -g
# Ejemplo: C:\Users\fgp55\AppData\Roaming\npm\node_modules

# Prefijo global de instalación
npm config get prefix
# Ejemplo: C:\Users\fgp55\AppData\Roaming\npm

```

# 💡 Sugerencias y mejoras futuras

> - fgp create from https://github.com/fgp/templates/mi-template
> - fgp init
