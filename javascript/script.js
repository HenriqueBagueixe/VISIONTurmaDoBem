
document.addEventListener("DOMContentLoaded", () => {

  
  // MENU HAMBÚRGUER GLOBAL
 
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");

  if (hamburger && menu) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("menu--ativo");
      hamburger.setAttribute(
        "aria-expanded",
        menu.classList.contains("menu--ativo")
      );
    });

    // Fecha o menu ao clicar em qualquer link
    const links = menu.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("menu--ativo");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });

    // Fecha o menu ao pressionar ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("menu--ativo")) {
        menu.classList.remove("menu--ativo");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  
  // HEADER FIXO COM SOMBRA AO ROLAR
  
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("header-scroll");
      } else {
        header.classList.remove("header-scroll");
      }
    });
  }

  
  // ANIMAÇÃO SCROLL - SEÇÃO "TURMA DO BEM EM NÚMEROS"
 
  const sectionNumeros = document.querySelector(".numeros");
  if (sectionNumeros) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            sectionNumeros.classList.add("visible");
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(sectionNumeros);
  }

 
  // EFEITO FADE-IN PARA ELEMENTOS AO ROLAR (GENÉRICO)
  // Basta adicionar class="fade-scroll" no HTML
  
  const fadeElements = document.querySelectorAll(".fade-scroll");
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeElements.forEach(el => fadeObserver.observe(el));

  
  // INTERAÇÃO FAQ )
  
  const perguntas = document.querySelectorAll(".pergunta");

  perguntas.forEach(pergunta => {
    const title = pergunta.querySelector("h3");

    if (title) {
      // Cria o ícone +/- apenas se ainda não existir
      if (!title.querySelector(".faq-icon")) {
        const icon = document.createElement("span");
        icon.classList.add("faq-icon");
        icon.innerHTML = "+";
        title.appendChild(icon);
      }

      title.addEventListener("click", () => {
        const isAtiva = pergunta.classList.contains("ativa");

        // Fecha todas as outras perguntas
        perguntas.forEach(p => {
          p.classList.remove("ativa");
          const i = p.querySelector(".faq-icon");
          if (i) i.textContent = "+";
        });

        // Alterna o estado atual
        if (!isAtiva) {
          pergunta.classList.add("ativa");
          const icon = title.querySelector(".faq-icon");
          if (icon) icon.textContent = "–";
        }
      });
    }
  });

  // =======================================================
  // ANIMAÇÃO SUAVE PARA SEÇÃO DE INTEGRANTES
  // =======================================================
  const integrantes = document.querySelectorAll(".integrante");

  if (integrantes.length > 0) {
    const observerIntegrantes = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      { threshold: 0.3 }
    );

    integrantes.forEach(i => observerIntegrantes.observe(i));
  }

});

// =======================================================
  // ANIMAÇÃO PAGINA DE CADASTRO
  // =======================================================
