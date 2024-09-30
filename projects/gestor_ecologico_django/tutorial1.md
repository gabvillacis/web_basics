# **Tutorial 1: Configuración Inicial del Proyecto con Django, PostgreSQL y Variables de Entorno**

**Objetivo**: En este tutorial, configuraremos el entorno inicial del proyecto **Iniciativas Ecológicas** utilizando Django, PostgreSQL y variables de entorno para gestionar configuraciones sensibles como la base de datos y la clave secreta. Además, reutilizaremos el HTML, CSS y JavaScript existentes, y configuraremos los archivos estáticos.

---

### **Paso 1: Configuración del Entorno Virtual con Poetry**

1. **Instala Poetry (si aún no lo tienes instalado)**:
   ```bash
   pip install poetry
   ```

2. **Crea el entorno del proyecto con Poetry**:
   Desde la terminal, navega al directorio donde deseas crear el proyecto y ejecuta los siguientes comandos:

   ```bash
   poetry new gestor_ecologico --src
   cd gestor_ecologico
   poetry install
   ```

3. **Instala Django y psycopg2** (para PostgreSQL):

   ```bash
   poetry add django psycopg2-binary python-decouple
   ```

   - **`python-decouple`** te permitirá manejar las variables de entorno.

4. **Crea el Proyecto Django** (usa un nombre claro para el proyecto):

   ```bash
   poetry run django-admin startproject gestor_ecologico .
   poetry run python manage.py startapp iniciativas
   ```

   Esto creará el proyecto principal llamado `gestor_ecologico` y una aplicación llamada `iniciativas`, donde gestionaremos las iniciativas ecológicas.

---

### **Paso 2: Configuración de Variables de Entorno para la Base de Datos y el `SECRET_KEY`**

1. **Configura el uso de variables de entorno con `python-decouple`**:

   En el archivo `settings.py` de tu proyecto, cambia la configuración para usar variables de entorno. Primero, importa el módulo `config` de `decouple`:

   ```python
   from decouple import config
   ```

2. **Crea un archivo `.env`** en el directorio raíz del proyecto y añade las siguientes variables de entorno:

   ```bash
   SECRET_KEY=tu_secret_key
   DEBUG=True
   DB_NAME=iniciativas_db
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   ```

3. **Modifica el archivo `settings.py` para usar las variables de entorno**:

   ```python
   SECRET_KEY = config('SECRET_KEY')
   DEBUG = config('DEBUG', default=False, cast=bool)

   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': config('DB_NAME'),
           'USER': config('DB_USER'),
           'PASSWORD': config('DB_PASSWORD'),
           'HOST': config('DB_HOST'),
           'PORT': config('DB_PORT', default='5432'),
       }
   }
   ```

---

### **Paso 3: Creación de la Base de Datos con pgAdmin**

1. **Abre pgAdmin** y conéctate a tu servidor PostgreSQL.
2. **Crea la base de datos**:
   - Haz clic derecho en "Databases" y selecciona "Create > Database".
   - Nombre de la base de datos: `iniciativas_db`.
   - Propietario: `postgres` (o el usuario que hayas configurado).
3. Asegúrate de que la base de datos esté configurada correctamente.

---

### **Paso 4: Configuración de Archivos Estáticos (CSS, JS, Imágenes)**

1. **Configura la ruta para los archivos estáticos** en `gestor_ecologico/settings.py`:

   Asegúrate de que esta sección esté configurada correctamente para servir archivos estáticos:

   ```python
   STATIC_URL = '/static/'
   STATICFILES_DIRS = [
       BASE_DIR / 'static',
   ]
   ```

2. **Crea la carpeta para archivos estáticos**:

   Dentro de tu proyecto, crea una carpeta llamada `static` y dentro de ella, organiza tus archivos CSS, JavaScript e imágenes como se muestra a continuación:

   ```bash
   gestor_ecologico/
   ├── static/
       ├── css/
           └── estilos.css
       ├── js/
           └── carrusel.js
       └── img/
           └── (coloca aquí tus imágenes)
   ```

3. **Mueve los archivos actuales de CSS, JS e imágenes** que ya tienes a este directorio.

---

### **Paso 5: Reutilización del HTML en Django**

1. **Configura las vistas y las plantillas**:
   - Dentro de la aplicación `iniciativas`, crea una carpeta `templates/iniciativas` donde guardarás las plantillas HTML.

   ```bash
   mkdir -p iniciativas/templates/iniciativas
   ```

   - Copia el archivo `index.html` que ya tienes a esta carpeta.

2. **Configura una vista básica en `views.py`**:

   En el archivo `iniciativas/views.py`, crea una vista simple para renderizar la página de inicio.

   ```python
   from django.shortcuts import render

   def home(request):
       return render(request, 'iniciativas/index.html')
   ```

3. **Configura las URLs en `urls.py`**:

   Crea un archivo `urls.py` dentro de la aplicación `iniciativas` y enlaza las rutas:

   ```python
   from django.urls import path
   from . import views

   urlpatterns = [
       path('', views.home, name='home'),
   ]
   ```

   Luego, en el archivo `gestor_ecologico/urls.py`, incluye las rutas de la aplicación:

   ```python
   from django.contrib import admin
   from django.urls import path, include

   urlpatterns = [
       path('admin/', admin.site.urls),
       path('', include('iniciativas.urls')),
   ]
   ```

4. **Carga los archivos estáticos en la plantilla**:

   En el archivo `index.html`, asegura que los archivos CSS y JavaScript se carguen correctamente usando la etiqueta `{% load static %}` de Django.

   Modifica la cabecera del archivo `index.html` así:

   ```html
   {% load static %}
   <link rel="stylesheet" href="{% static 'css/estilos.css' %}">
   ```

   Al final del archivo `index.html`, asegúrate de cargar el archivo `carrusel.js`:

   ```html
   <script src="{% static 'js/carrusel.js' %}"></script>
   ```

---

### **Paso 6: Migraciones y Verificación**

1. **Realiza las migraciones iniciales** para preparar la base de datos:

   ```bash
   poetry run python manage.py migrate
   ```

2. **Inicia el servidor de desarrollo**:

   ```bash
   poetry run python manage.py runserver
   ```

3. **Verifica en el navegador**:
   - Abre tu navegador en `http://127.0.0.1:8000/` y verifica que tu página de inicio se cargue con los estilos CSS y el carrusel funcionando correctamente.

---

### **Conclusión**

En este primer tutorial, configuramos Django con PostgreSQL utilizando variables de entorno y **pgAdmin** para la creación de la base de datos. También reutilizamos los archivos HTML, CSS y JavaScript existentes, y configuramos el manejo de archivos estáticos.

---

### **Siguiente Paso: Tutorial 2 - Creación del CRUD de Iniciativas y Mapa Interactivo**

El siguiente tutorial abordará la creación del CRUD (Crear, Leer, Actualizar, Eliminar) de las iniciativas ecológicas, así como la integración del mapa interactivo usando la API de Google Maps.

---