(function () {
  "use strict";

  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.getElementById("nav-menu");
  var navLinks = navMenu ? navMenu.querySelectorAll("a") : [];
  var sections = document.querySelectorAll("main section[id]");
  var yearNodes = document.querySelectorAll("[data-year]");
  var mqDesktop = window.matchMedia("(min-width: 761px)");

  yearNodes.forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  function setMenuOpen(isOpen) {
    if (!navToggle || !navMenu) {
      return;
    }

    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    navMenu.classList.toggle("is-open", isOpen);

    if (isOpen) {
      var firstLink = navMenu.querySelector("a");
      if (firstLink) {
        firstLink.focus();
      }
    }
  }

  function closeMenu() {
    var wasOpen = navToggle && navToggle.getAttribute("aria-expanded") === "true";
    setMenuOpen(false);
    if (wasOpen && navToggle) {
      navToggle.focus();
    }
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      setMenuOpen(!isOpen);
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        if (!mqDesktop.matches) {
          setMenuOpen(false);
        }
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (
        event.key !== "Tab" ||
        navToggle.getAttribute("aria-expanded") !== "true" ||
        mqDesktop.matches
      ) {
        return;
      }

      var focusable = [navToggle].concat(Array.prototype.slice.call(navLinks));
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      var active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (navToggle.getAttribute("aria-expanded") !== "true") {
        return;
      }

      var header = event.target.closest(".site-header");
      if (!header) {
        setMenuOpen(false);
      }
    });

    mqDesktop.addEventListener("change", function (event) {
      if (event.matches) {
        setMenuOpen(false);
      }
    });
  }

  function updateActiveNav() {
    var scrollPos = window.scrollY + 96;
    var currentId = "home";

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href") || "";
      var isSectionLink = href.charAt(0) === "#";
      var isActive = isSectionLink && href === "#" + currentId;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav, { passive: true });
  updateActiveNav();

  document.querySelectorAll(".project-media img").forEach(function (img) {
    var media = img.closest(".project-media");

    function showFallback() {
      if (media) {
        media.classList.add("is-missing");
      }
      img.setAttribute("hidden", "");
    }

    img.addEventListener("error", showFallback);

    if (img.complete && img.naturalWidth === 0) {
      showFallback();
    }
  });
})();
