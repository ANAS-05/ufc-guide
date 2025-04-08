document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector('[aria-controls="primary-nav"]');
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".primary-navigation");
  const headerHeight = header.offsetHeight;

  window.addEventListener("scroll", function () {
    // Check if we've scrolled past the header
    if (window.scrollY > headerHeight) {
      nav.classList.add("header-not-visible");
    } else {
      nav.classList.remove("header-not-visible");
    }
  });

  navToggle.addEventListener("click", () => {
    const navOpened = navToggle.getAttribute("aria-expanded");
    if (navOpened === "false") {
      navToggle.setAttribute("aria-expanded", true);
    } else {
      navToggle.setAttribute("aria-expanded", false);
    }
  });
});
