/**
 * contact.js — Validação e simulação de envio do formulário de contato
 * Requisitos: campos obrigatórios, e-mail válido, feedback visual de erro/sucesso
 */

(function () {
  "use strict";

  var form = document.getElementById("contactForm");
  if (!form) return;

  var nomeInput = document.getElementById("nome");
  var emailInput = document.getElementById("email");
  var mensagemInput = document.getElementById("mensagem");

  var errorNome = document.getElementById("errorNome");
  var errorEmail = document.getElementById("errorEmail");
  var errorMensagem = document.getElementById("errorMensagem");

  var successModal = document.getElementById("successModal");
  var modalClose = document.getElementById("modalClose");
  var modalOk = document.getElementById("modalOk");

  /**
   * Expressão regular para validar formato de e-mail (usuario@dominio.com)
   */
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /**
   * Exibe mensagem de erro abaixo do campo correspondente
   * @param {HTMLElement} input - Campo do formulário
   * @param {HTMLElement} errorEl - Elemento que exibe o erro
   * @param {string} message - Texto do erro (vazio limpa o erro)
   */
  function showError(input, errorEl, message) {
    errorEl.textContent = message;
    if (message) {
      input.classList.add("input-error");
    } else {
      input.classList.remove("input-error");
    }
  }

  /**
   * Valida todos os campos e retorna true se estiver tudo correto
   */
  function validateForm() {
    var isValid = true;

    /* Validação do nome — não pode estar vazio */
    var nome = nomeInput.value.trim();
    if (nome === "") {
      showError(nomeInput, errorNome, "Por favor, informe seu nome.");
      isValid = false;
    } else {
      showError(nomeInput, errorNome, "");
    }

    /* Validação do e-mail — obrigatório e formato válido */
    var email = emailInput.value.trim();
    if (email === "") {
      showError(emailInput, errorEmail, "Por favor, informe seu e-mail.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      showError(emailInput, errorEmail, "Informe um e-mail válido (ex: usuario@dominio.com).");
      isValid = false;
    } else {
      showError(emailInput, errorEmail, "");
    }

    /* Validação da mensagem — não pode estar vazia */
    var mensagem = mensagemInput.value.trim();
    if (mensagem === "") {
      showError(mensagemInput, errorMensagem, "Por favor, escreva uma mensagem.");
      isValid = false;
    } else {
      showError(mensagemInput, errorMensagem, "");
    }

    return isValid;
  }

  /**
   * Exibe o modal de confirmação de envio
   */
  function openModal() {
    successModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  /**
   * Fecha o modal de confirmação
   */
  function closeModal() {
    successModal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  /**
   * Simula o envio: valida, limpa campos e mostra confirmação
   */
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    /* Simulação de envio — limpa os campos após validação bem-sucedida */
    form.reset();
    showError(nomeInput, errorNome, "");
    showError(emailInput, errorEmail, "");
    showError(mensagemInput, errorMensagem, "");

    openModal();
  });

  /* Fechar modal pelos botões ou clicando fora */
  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modalOk) {
    modalOk.addEventListener("click", closeModal);
  }

  successModal.addEventListener("click", function (event) {
    if (event.target === successModal) {
      closeModal();
    }
  });

  /* Fechar modal com tecla Escape */
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !successModal.classList.contains("hidden")) {
      closeModal();
    }
  });

  /* Limpa erro individual ao digitar no campo */
  nomeInput.addEventListener("input", function () {
    if (nomeInput.value.trim() !== "") {
      showError(nomeInput, errorNome, "");
    }
  });

  emailInput.addEventListener("input", function () {
    if (emailInput.value.trim() !== "") {
      showError(emailInput, errorEmail, "");
    }
  });

  mensagemInput.addEventListener("input", function () {
    if (mensagemInput.value.trim() !== "") {
      showError(mensagemInput, errorMensagem, "");
    }
  });
})();
