document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const links = document.querySelectorAll(".links a");
  const hamburger = document.querySelector(".hamburger");
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next-arrow");
  const backBtn = document.querySelector(".back-arrow");

  let currentSlide = 0;
  const totalSlides = slides.length;

  // Navbar scroll effect
  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
      links.forEach((link) => link.classList.add("scrolled-link"));
    } else {
      navbar.classList.remove("scrolled");
      links.forEach((link) => link.classList.remove("scrolled-link"));
    }
  };

  window.addEventListener("scroll", handleScroll);

  // Navbar responsiveness
  hamburger.addEventListener("click", function () {
    document.querySelector(".links").classList.toggle("show");
  });

  // Carousel functionality
  const updateSlides = () => {
    slides.forEach((slide, index) => {
      slide.classList.toggle("showcase", index === currentSlide);
      slide.style.display = index === currentSlide ? "block" : "none";
    });
  };

  const handleNext = () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlides();
  };

  const handleBack = () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlides();
  };

  nextBtn.addEventListener("click", handleNext);
  backBtn.addEventListener("click", handleBack);

  // Initial display
  updateSlides();

  // Form email sending
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      var formData = new FormData(this);

      fetch("https://formspree.io/f/xvgpkbeo", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            alert("Message sent successfully");
            resetForm();
          } else {
            response.json().then((data) => {
              if (data.errors) {
                alert(data.errors.map((error) => error.message).join(", "));
              } else {
                alert("Failed to send message.");
              }
            });
          }
        })
        .catch((error) => {
          alert("Failed to send message: " + error.message);
        });
    });

  // Form reset
  function resetForm() {
    document.getElementById("contact-form").reset();
  }
});
