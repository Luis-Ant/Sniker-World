# Sniker-World

---

## Pasos para la instalacion:

### 1. Tener **Node JS** instalado (version LTS de preferecia).

### 2. Tener **PostgreSQL** instalado.

### 3. Clonar el repositorio.

```bash
git clone https://github.com/Luis-Ant/Sniker-World.git
```

### 4. Moverse a la carpeta **_bacekend/_**.

```bash
cd backend/
```

### 5. Instalar las dependencias del **package.json**.

```bash
npm install
```

### 6. Agregar a la carpeta **backend/** el archivo **.env**

```bash
backend/
-- .env  // Variables de entorno para la base de datos y los tokens de acceso
```

### 7. Ejecutar el sigueinte comando para levantar el servidor.

```bash
npm run dev
```

### Accder a la ruta especificada.

```bash
Servidor corriendo en http://localhost:3001/
```

---

### 8. Moverse a la carpeta **_frontend/_**

```bash
cd frontend/
```

### 5. Instalar las dependencias del **package.json**.

```bash
npm install
```

### 7. Ejecutar el sigueinte comando para levantar el servidor.

```bash
npm run dev
```

### Accder a la ruta especificada.

```bash
Local:   http://localhost:5173/
```

## Pasos para agregar las imágenes de la bd de forma local

### 1. Abrir la terminal y situarse en la carpeta backend 

### 2. Ejecutar el siguiente comando:

```bash
node uploadImages.js
```

### 3. Prestar atención a los mensajes de exito o error

### 4. Verificar en los esquemas de tablas de pgAdmin4 que todas las columnas se hayan llenado correctamente con un formato tipo: \x...

---
