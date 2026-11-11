# Tech Academy

Plataforma educativa de tecnología con módulos de Ciberseguridad y OSINT e Historia de la Informática e IA. Usa React, TypeScript, Vite, Tailwind CSS y React Router.

## Desarrollo local

Usa Node.js 24 y ejecuta estos comandos desde la carpeta que contiene `package.json`.

```sh
npm ci
npm run dev
npm run lint
npm run build
```

## Primer despliegue en GitHub Pages

1. Abre [DeKxy/informatica](https://github.com/DeKxy/informatica). En **Settings → Pages → Build and deployment → Source**, selecciona **GitHub Actions**. Si el repositorio vacío todavía no muestra esa opción, haz el primer push, activa Pages y vuelve a ejecutar el workflow desde **Actions**.
2. Desde la raíz de la aplicación, verifica que `origin` apunte a `https://github.com/DeKxy/informatica.git` y sube el primer commit a `main`.

   ```sh
   git remote -v
   git status --short
   git add .
   git commit -m "Publicar Tech Academy con GitHub Pages"
   git push -u origin main
   ```

   Si trabajas desde una copia de esta carpeta sin metadatos de Git y el repositorio remoto sigue vacío, ejecuta antes `git init -b main` y `git remote add origin https://github.com/DeKxy/informatica.git`.

3. En **Actions**, abre **Deploy Tech Academy to GitHub Pages**. Cuando termine correctamente, el sitio estará disponible en [GitHub Pages](https://dekxy.github.io/informatica/) con el dominio predeterminado.

## Actualizaciones automáticas

Cada push o fusión a `main` instala las dependencias con `npm ci`, ejecuta lint, compila y publica `dist` si las comprobaciones pasan. El workflow obtiene la ruta base de la configuración de Pages. Vite usa esa base para los recursos y React Router la usa para los enlaces internos.

Para abrir o recargar una ruta interna directamente, Pages sirve `404.html` como respaldo y React Router abre la vista correspondiente. En una petición directa a una ruta interna, el servidor devuelve HTTP 404 aunque el navegador muestre la vista solicitada.

