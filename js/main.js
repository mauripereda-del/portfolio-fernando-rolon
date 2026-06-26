/**
 * main.js — Funcionalidades compartilhadas em todas as páginas
 * 1. Menu responsivo (hambúrguer)
 * 2. Alternância de tema claro/escuro com persistência no localStorage
 */

(function () {
  "use strict";

  /* ===== Tema claro/escuro ===== */
  var THEME_KEY = "portfolio-theme";
  var themeToggle = document.getElementById("themeToggle");

  /**
   * Aplica o tema escolhido adicionando ou removendo a classe no body
   * @param {string} theme - "light" ou "dark"
   */
  function applyTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }

  /**
   * Carrega o tema salvo no localStorage ou usa preferência do sistema
   */
  function loadTheme() {
    var saved = localStorage.getItem(THEME_KEY);

    if (saved === "dark" || saved === "light") {
      applyTheme(saved);
      return;
    }

    /* Respeita a preferência de tema do sistema operacional */
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      applyTheme("dark");
    }
  }

  /**
   * Alterna entre tema claro e escuro ao clicar no botão
   */
  function toggleTheme() {
    var isDark = document.body.classList.contains("dark-theme");
    var newTheme = isDark ? "light" : "dark";

    applyTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  loadTheme();

  /* ===== Menu responsivo mobile ===== */
  var menuToggle = document.getElementById("menuToggle");
  var mainNav = document.getElementById("mainNav");

  /**
   * Abre ou fecha o menu de navegação em telas pequenas
   */
  function toggleMenu() {
    var isOpen = mainNav.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", toggleMenu);

    /* Fecha o menu ao clicar em um link (melhora UX em mobile) */
    var navLinks = mainNav.querySelectorAll(".nav-link");
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", function () {
        if (mainNav.classList.contains("is-open")) {
          toggleMenu();
        }
      });
    }

    /* Fecha o menu ao redimensionar para desktop */
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768 && mainNav.classList.contains("is-open")) {
        toggleMenu();
      }
    });
  }
})();
