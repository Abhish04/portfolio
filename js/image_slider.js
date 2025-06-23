document.addEventListener('DOMContentLoaded', () => {
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
        const slider = project.querySelector('.slider');
        const slides = project.querySelectorAll('.slide');
        const prevButton = project.querySelector('.prev');
        const nextButton = project.querySelector('.next');
        const dotsContainer = project.querySelector('.pagination');
        let currentIndex = 0;
        const slideCount = slides.length;
        let autoSlideInterval;

        // Create dots for pagination
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'pagination-dot';
            dot.setAttribute('data-index', index);
            dotsContainer.appendChild(dot);
        });

        const dots = project.querySelectorAll('.pagination-dot');

        // Initialize slider
        function updateSlider() {
            slides.forEach((slide, index) => {
                slide.style.transform = `translateX(-${currentIndex * 100}%)`;
            });

            // Update pagination dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        // Next slide
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateSlider();
            resetAutoSlide();
        }

        // Previous slide
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateSlider();
            resetAutoSlide();
        }

        // Reset auto slide timer
        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        // Click handlers
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);

        // Dot navigation
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.getAttribute('data-index'));
                updateSlider();
                resetAutoSlide();
            });
        });

        // Start auto slide
        autoSlideInterval = setInterval(nextSlide, 5000);

        // Pause on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        slider.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextSlide, 5000);
        });

        // Initialize
        updateSlider();
    });
});
