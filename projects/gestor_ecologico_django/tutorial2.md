### **Tutorial 2: Refactorización del Formulario de Iniciativas, Procesamiento con Axios y Creación del Modelo de Categorías**

**Objetivo**: En este tutorial, refactorizaremos el formulario de registro de iniciativas para separarlo en una nueva plantilla y procesarlo con Axios, evitando la recarga de la página. También agregaremos el modelo de categorías y lo incluiremos en el formulario. Además, crearemos una lista estilizada de iniciativas utilizando Bootstrap 5.

---

### **Paso 1: Crear el Modelo de Categorías**

Para manejar categorías como "Reciclaje", "Reforestación", etc., es necesario crear un modelo de categorías y luego vincularlo con el modelo de iniciativas.

1. **Actualizar el archivo `models.py`** en la aplicación `iniciativas` para añadir el modelo `Categoria` y su relación con `Iniciativa`:

   ```python
   from django.db import models

   class Categoria(models.Model):
       nombre = models.CharField(max_length=100)

       def __str__(self):
           return self.nombre

   class Iniciativa(models.Model):
       nombre = models.CharField(max_length=200)
       descripcion = models.TextField()
       categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
       direccion = models.CharField(max_length=255)
       ubicacion_lat = models.DecimalField(max_digits=9, decimal_places=6)
       ubicacion_lng = models.DecimalField(max_digits=9, decimal_places=6)
       fecha_creacion = models.DateTimeField(auto_now_add=True)

       def __str__(self):
           return self.nombre
   ```

2. **Realizar las migraciones** para crear las tablas en la base de datos:

   ```bash
   poetry run python manage.py makemigrations
   poetry run python manage.py migrate
   ```

3. **Crear algunas categorías iniciales** para poblar la base de datos:
   
   - Puedes crear categorías desde el panel de administración de Django o usando un archivo `fixtures`.

---

### **Paso 2: Refactorización del Formulario de Iniciativas**

Ya tienes un formulario de registro de iniciativas listo. El objetivo aquí es mover el código HTML a una plantilla separada y estilizarlo usando una plantilla base para unificar el diseño del sitio.

1. **Crear una Plantilla Base** en el archivo `base.html` dentro de `templates/iniciativas`:

   ```html
   <!DOCTYPE html>
   <html lang="es">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>{% block title %}Iniciativas Ecológicas{% endblock %}</title>
       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
       <link rel="stylesheet" href="{% static 'css/estilos.css' %}">
   </head>
   <body>
       <header>
           <nav class="navbar navbar-expand-lg navbar-light bg-light">
               <div class="container-fluid">
                   <a class="navbar-brand" href="{% url 'home' %}">Iniciativas Ecológicas</a>
               </div>
           </nav>
       </header>

       <div class="container mt-4">
           {% block content %}
           {% endblock %}
       </div>

       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
       <script src="{% static 'js/carrusel.js' %}"></script>
   </body>
   </html>
   ```

   Este archivo es la plantilla base donde todos los demás templates heredarán las configuraciones comunes, como los estilos de Bootstrap y el encabezado del sitio.

2. **Refactorizar la plantilla del formulario de registro de iniciativas**:

   Crea una nueva plantilla `registro_iniciativa.html` en `templates/iniciativas` y extiende la plantilla base:

   ```html
   {% extends 'iniciativas/base.html' %}

   {% block title %}Registrar Nueva Iniciativa{% endblock %}

   {% block content %}
   <h2>Registrar Nueva Iniciativa</h2>
   <form id="form-iniciativa" method="POST">
       {% csrf_token %}
       {{ form.as_p }}
       <div id="map" style="height: 400px; width: 100%;"></div>
       <button type="submit" class="btn btn-success">Registrar</button>
   </form>
   <div id="mensaje"></div>
   <script src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&callback=initMap" async defer></script>
   <script src="{% static 'js/axios.min.js' %}"></script>
   <script src="{% static 'js/registro.js' %}"></script>
   {% endblock %}
   ```

3. **Actualizar `forms.py` para incluir las categorías**:

   En el archivo `forms.py`, actualiza el formulario para que incluya el campo de categorías:

   ```python
   from django import forms
   from .models import Iniciativa, Categoria

   class IniciativaForm(forms.ModelForm):
       categoria = forms.ModelChoiceField(queryset=Categoria.objects.all(), empty_label="Seleccione una categoría")

       class Meta:
           model = Iniciativa
           fields = ['nombre', 'descripcion', 'categoria', 'direccion', 'ubicacion_lat', 'ubicacion_lng']
           widgets = {
               'ubicacion_lat': forms.HiddenInput(),
               'ubicacion_lng': forms.HiddenInput(),
           }
   ```

---

### **Paso 3: Procesamiento del Formulario con Axios**

Para evitar la recarga de la página al enviar el formulario, usaremos Axios.

1. **Crear un archivo `registro.js`** dentro de la carpeta `static/js`:

   ```javascript
   document.getElementById('form-iniciativa').addEventListener('submit', function(event) {
       event.preventDefault();
       
       let formData = new FormData(this);
       
       axios.post("{% url 'registrar_iniciativa' %}", formData)
           .then(response => {
               document.getElementById('mensaje').innerHTML = "<div class='alert alert-success'>Iniciativa registrada con éxito.</div>";
               this.reset();
           })
           .catch(error => {
               document.getElementById('mensaje').innerHTML = "<div class='alert alert-danger'>Ocurrió un error al registrar la iniciativa.</div>";
           });
   });
   ```

2. **Actualizar la vista `registrar_iniciativa` en `views.py`** para procesar la solicitud de Axios y devolver una respuesta JSON:

   ```python
   from django.http import JsonResponse

   def registrar_iniciativa(request):
       if request.method == 'POST':
           form = IniciativaForm(request.POST)
           if form.is_valid():
               form.save()
               return JsonResponse({'message': 'Iniciativa registrada correctamente'}, status=200)
           else:
               return JsonResponse({'errors': form.errors}, status=400)
       else:
           form = IniciativaForm()
       return render(request, 'iniciativas/registro_iniciativa.html', {'form': form})
   ```

---

### **Paso 4: Crear la Lista de Iniciativas**

1. **Crear la vista para listar las iniciativas** en `views.py`:

   ```python
   def lista_iniciativas(request):
       iniciativas = Iniciativa.objects.all()
       return render(request, 'iniciativas/lista_iniciativas.html', {'iniciativas': iniciativas})
   ```

2. **Crear la plantilla `lista_iniciativas.html`** y usar Bootstrap 5 para estilizarla:

   ```html
   {% extends 'iniciativas/base.html' %}

   {% block title %}Lista de Iniciativas{% endblock %}

   {% block content %}
   <h2>Iniciativas Registradas</h2>
   <table class="table table-striped">
       <thead>
           <tr>
               <th>Nombre</th>
               <th>Descripción</th>
               <th>Categoría</th>
               <th>Dirección</th>
               <th>Ubicación</th>
           </tr>
       </thead>
       <tbody>
           {% for iniciativa in iniciativas %}
           <tr>
               <td>{{ iniciativa.nombre }}</td>
               <td>{{ iniciativa.descripcion }}</td>
               <td>{{ iniciativa.categoria }}</td>
               <td>{{ iniciativa.direccion }}</td>
               <td>{{ iniciativa.ubicacion_lat }}, {{ iniciativa.ubicacion_lng }}</td>
           </tr>
           {% endfor %}
       </tbody>
   </table>
   {% endblock %}
   ```

---

### **Paso 5: Actualización de `urls.py`**

Asegúrate de que las rutas de `urls.py` estén configuradas correctamente para incluir tanto el registro como la lista de iniciativas:

```python
from django.urls import path
from . import views

urlpatterns = [
   path('', views.lista_iniciativas, name='home'),
   path('registrar/', views.registrar_iniciativa, name='registrar_iniciativa'),
]
```

---

### **Conclusión**

En este tutorial, refactorizamos el formulario de iniciativas para procesarlo con Axios, agregamos el modelo de categorías, y creamos una lista estilizada de iniciativas utilizando Bootstrap 5. El siguiente paso será mostrar las iniciativas en un mapa interactivo y agregar filtros avanzados.

---