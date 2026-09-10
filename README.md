# ¿Cuánto subió.cr?

Aplicación React/Vite para consultar precios de productos en Costa Rica, comparar supermercados y revisar variaciones en colones (CRC).

## Desarrollo local

```bash
npm install
npm run dev
```

La web corre en `http://localhost:5173` y la API local en `http://localhost:3141`. Si no existe `DATABASE_URL`, la aplicación usa automáticamente el catálogo local de demostración.

## Verificación

```bash
npm run typecheck
npm run lint
npm run build
```

## Deploy en Vercel desde GitHub

Importá el repositorio en Vercel. El proyecto ya incluye `vercel.json`, el build `npm run build`, la salida `dist` y una función Node para las rutas `/api/*`. Vercel desplegará cada push de la rama conectada y creará previews para pull requests.

Variables opcionales en Vercel:

- `VITE_SITE_URL`: URL pública del proyecto.
- `DEMO_MODE=true`: fuerza el catálogo local.
- `DATABASE_URL`: conexión PostgreSQL para usar datos persistentes.
- `LIVE_MARKET_ENABLED=false`: desactiva la consulta de catálogo en vivo.

Si no configurás una base de datos, el deploy funciona con los datos locales incluidos y no expone secretos del archivo `.env`.
