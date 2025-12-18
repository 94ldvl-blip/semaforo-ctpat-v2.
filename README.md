# Semáforo AVISO (C-TPAT) — PWA

Incluye franja **AVISO** y dos espacios de logotipos (izquierda y derecha) encima del título.

## Colocar tus logos
Sustituye los archivos de la carpeta `assets/`:
- `assets/lear-scaled.jpg` → Logo de tu empresa
- `assets/ctpat-logo-1.png` → Logo del programa (CTPAT)

Los estilos `.logo` ajustan tamaño (alto 32px). Si necesitas más grande, edita en `styles.css`:
```css
.logo{ height:48px; }
```

## Probabilidades
En `script.js`:
```js
const umbralRojo = 0.6; // 60% rojo
const color = Math.random() < umbralRojo ? 'rojo' : 'verde';
```

## PWA y GitHub Pages
- Manifest configurado para **Project Pages** en `/semaforo-ctpat-v2/`.
- Service Worker con estrategia **cache-first** para estáticos y **fallback offline**.
- Activa GitHub Pages en Settings → Pages → *Deploy from a branch* → `main` → `/ (root)`.

### Actualizaciones
Si cambias archivos estáticos, incrementa `CACHE_VERSION` en `sw.js` para forzar recacheo.
