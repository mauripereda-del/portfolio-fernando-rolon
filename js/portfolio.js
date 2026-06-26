/**
 * portfolio.js — Filtro de projetos por categoria na página Portfólio
 * Mostra/esconde cards conforme o botão de filtro selecionado
 */

(function () {
  "use strict";

  var filterButtons = document.querySelectorAll(".filter-btn");
  var projectCards = document.querySelectorAll(".project-card");
  var emptyMessage = document.getElementById("emptyProjects");

  if (filterButtons.length === 0 || projectCards.length === 0) return;

  /**
   * Filtra os projetos exibidos com base na categoria selecionada
   * @param {string} category - Categoria do filtro ("todos", "web", "logica", "dados")
   */
  function filterProjects(category) {
    var visibleCount = 0;

    for (var i = 0; i < projectCards.length; i++) {
      var card = projectCards[i];
      var cardCategory = card.getAttribute("data-category");

      if (category === "todos" || cardCategory === category) {
        card.classList.remove("is-hidden");
        visibleCount++;
      } else {
        card.classList.add("is-hidden");
      }
    }

    /* Exibe mensagem quando nenhum projeto corresponde ao filtro */
    if (emptyMessage) {
      if (visibleCount === 0) {
        emptyMessage.classList.remove("hidden");
      } else {
        emptyMessage.classList.add("hidden");
      }
    }
  }

  /* Adiciona evento de clique em cada botão de filtro */
  for (var j = 0; j < filterButtons.length; j++) {
    filterButtons[j].addEventListener("click", function () {
      var selectedFilter = this.getAttribute("data-filter");

      /* Atualiza estado visual dos botões */
      for (var k = 0; k < filterButtons.length; k++) {
        filterButtons[k].classList.remove("active");
      }
      this.classList.add("active");

      filterProjects(selectedFilter);
    });
  }
})();
