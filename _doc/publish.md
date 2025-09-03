```sh
# Vuelve a vincular globalmente tu CLI local
npm link

# Verifica que esté instalado globalmente
npm list -g

# Desvincula globalmente tu CLI
npm unlink -g

# Publicar un paquete en NPM
npm version patch && npm publish

# Verifica que el comando esté disponible
where fgp

# Probar comandos
fgp --help
fgp --version
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
