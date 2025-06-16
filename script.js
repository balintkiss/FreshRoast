document.addEventListener("DOMContentLoaded", function () {
  const carouselInner = document.querySelector(".carousel-inner");
  const carouselItems = document.querySelectorAll(".carousel-item");
  const prevButton     = document.querySelector(".carousel-arrow.prev");
  const nextButton     = document.querySelector(".carousel-arrow.next");

  let currentIndex   = 0;
  const totalItems   = carouselItems.length;
  const itemsVisible = 4;

  /* ──────────────────────────────────────────────────────────
     Core update function
  ────────────────────────────────────────────────────────── */
  function updateCarousel() {
    const itemWidth   = carouselItems[0].offsetWidth;
    const newPosition = -currentIndex * itemWidth;
    carouselInner.style.transform = `translateX(${newPosition}px)`;
  }

  /* ──────────────────────────────────────────────────────────
     Manual controls (unchanged)
  ────────────────────────────────────────────────────────── */
  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % (totalItems - itemsVisible + 1);
    updateCarousel();
  });

  prevButton.addEventListener("click", () => {
    currentIndex =
      currentIndex === 0
        ? totalItems - itemsVisible
        : currentIndex - 1;
    updateCarousel();
  });

  window.addEventListener("resize", updateCarousel);

  /* ──────────────────────────────────────────────────────────
     🔥 NEW: autoplay
  ────────────────────────────────────────────────────────── */
  const AUTOPLAY_DELAY = 3000;      // 3 s between shifts
  const AUTOPLAY_STEP  = 1;         // how many cards to move each time
  const ANIMATION_ID   = Symbol();  // easy way to cancel without globals
  let   timers         = {};

  function startAutoplay() {
    timers[ANIMATION_ID] = setInterval(() => {
      currentIndex = (currentIndex + AUTOPLAY_STEP) %
                     (totalItems - itemsVisible + 1);
      updateCarousel();
    }, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    clearInterval(timers[ANIMATION_ID]);
  }

  /* start immediately … */
  startAutoplay();

  /* …but pause when user hovers, resume when they leave */
  carouselInner.addEventListener("mouseenter", stopAutoplay);
  carouselInner.addEventListener("mouseleave", startAutoplay);
});


/* Cart Dropdown */

document.addEventListener("DOMContentLoaded", () => {
  const cartToggle = document.querySelector(".cart-toggle");
  const cartDropdown = document.querySelector(".cart-dropdown");

  cartToggle.addEventListener("click", (e) => {
    e.preventDefault();
    cartDropdown.classList.toggle("show");
  });

  // Optional: Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!cartDropdown.contains(e.target) && !cartToggle.contains(e.target)) {
      cartDropdown.classList.remove("show");
    }
  });
});


/* Search Bar */
document.addEventListener("DOMContentLoaded", () => {
  const searchToggle = document.querySelector(".search-toggle");
  const searchDropdown = document.querySelector(".search-dropdown");

  searchToggle.addEventListener("click", (e) => {
    e.preventDefault();
    searchDropdown.classList.toggle("show");
  });

  document.addEventListener("click", (e) => {
    if (!searchDropdown.contains(e.target) && !searchToggle.contains(e.target)) {
      searchDropdown.classList.remove("show");
    }
  });
});


/* Modal for discounts */

document.addEventListener("DOMContentLoaded", () => {
  // Offer modal logic
  const offerBtn = document.querySelector(".offer-btn");
  const modal = document.getElementById("offer-modal");
  const closeBtn = document.querySelector(".close-btn");
  const copyBtn = document.getElementById("copy-btn");
  const couponCode = document.getElementById("coupon-code");

  offerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(couponCode.textContent).then(() => {
      copyBtn.textContent = "Copied!";
      setTimeout(() => copyBtn.textContent = "Copy", 1500);
    });
  });
});


/* Buy button */

document.addEventListener("DOMContentLoaded", () => {
  const buyButtons = document.querySelectorAll(".buy-btn");
  const toast = document.getElementById("cart-toast");

  buyButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Show the toast
      toast.classList.add("show");

      // Hide it after 2.5 seconds
      setTimeout(() => {
        toast.classList.remove("show");
      }, 2500);
    });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const buyButtons = document.querySelectorAll(".buy-btn");
  const toast = document.getElementById("cart-toast");
  const cartCount = document.getElementById("cart-count");

  let cartItems = 0;

  buyButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Increment and update cart count
      cartItems++;
      cartCount.textContent = cartItems;

      // Show toast
      toast.classList.add("show");

      // Hide toast after 2.5s
      setTimeout(() => {
        toast.classList.remove("show");
      }, 2500);
    });
  });
});