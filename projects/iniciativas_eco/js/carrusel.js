// Selecciona todos los slides
let slides = document.querySelectorAll('.slide');
let currentIndex = 0;

// Función para mostrar el slide actual y ocultar los demás
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? 'block' : 'none';
    });
}

// Mostrar el primer slide al cargar la página
showSlide(currentIndex);

// Función para ir al siguiente slide
function nextSlide() {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    showSlide(currentIndex);
}

// Función para ir al slide anterior
function prevSlide() {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    showSlide(currentIndex);
}

// Asignar los eventos a los botones
document.getElementById('next').addEventListener('click', nextSlide);
document.getElementById('prev').addEventListener('click', prevSlide);

// Cambiar automáticamente los slides cada 5 segundos
setInterval(nextSlide, 5000);