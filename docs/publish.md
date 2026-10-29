```sh
# Iniciar sesión con adduser o login
npm adduser
npm login
npm whoami

npm list -g

npm link
npm unlink -g

npm version patch
npm publish

# fgp commands
where fgp
fgp --help
fgp --version
```

## Notas

```sh
npm version major   # 1.0.0 → 2.0.0
npm version minor   # 1.0.0 → 1.1.0
npm version patch   # 1.0.0 → 1.0.1

# Si es un paquete con scope (@tuusuario/paquete) o lo quieres público:
npm publish --access public
```

# 📁 Ver rutas útiles

```bash
# Carpeta global de instalación de módulos
npm root -g
# C:\Users\Frank\AppData\Roaming\npm\node_modules

# Prefijo global de instalación
npm config get prefix
# C:\Users\Frank\AppData\Roaming\npm

```
