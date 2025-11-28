// Main Banner Slideshow
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("fade");
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    slides[slideIndex-1].classList.add("fade");
    dots[slideIndex-1].classList.add("active");
}

// Auto-advance slides
let slideInterval = setInterval(() => {
    plusSlides(1);
}, 5000);

// Pause on hover
const slideshowContainer = document.querySelector('.slideshow-container');
slideshowContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

slideshowContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
        plusSlides(1);
    }, 5000);
});

// About Section Image Slider
const aboutImages = document.querySelectorAll('.image-slider img');
let currentImageIndex = 0;

function rotateAboutImages() {
    aboutImages[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % aboutImages.length;
    aboutImages[currentImageIndex].classList.add('active');
}

// Start the about image rotation
setInterval(rotateAboutImages, 3000);