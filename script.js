document.addEventListener("DOMContentLoaded", function () {
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.getElementById("navLinks");
  var links = document.querySelectorAll(".nav-links a");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll("[data-accordion] .acc-head").forEach(function (button) {
    button.addEventListener("click", function () {
      var item = button.closest(".acc-item");
      var group = button.closest("[data-accordion]");
      var wasOpen = item.classList.contains("open");

      group.querySelectorAll(".acc-item").forEach(function (other) {
        other.classList.remove("open");
        var otherButton = other.querySelector(".acc-head");
        if (otherButton) otherButton.setAttribute("aria-expanded", "false");
      });

      if (!wasOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  var sections = ["hero", "services", "process", "profile", "contact"];
  function setActiveNav() {
    var current = "hero";
    sections.forEach(function (id) {
      var section = document.getElementById(id);
      if (!section) return;
      if (section.getBoundingClientRect().top <= 90) current = id;
    });

    links.forEach(function (link) {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach(function (element) {
      observer.observe(element);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (element) {
      element.classList.add("visible");
    });
  }

  document.querySelectorAll("[data-profile-image]").forEach(function (image) {
    image.addEventListener("error", function () {
      var frame = image.closest(".hero-photo-wrap, .profile-image-frame");
      if (frame) frame.classList.add("photo-missing");
    });
  });
});
