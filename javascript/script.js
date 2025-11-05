
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
//   PAGINA DE BENEFICIARIO 
// =======================================================

const benefMenuBtn = document.getElementById('benefMenuToggle');
const benefMenu = document.getElementById('benefMenu');
if (benefMenuBtn && benefMenu) {
  benefMenuBtn.addEventListener('click', () => {
    benefMenu.classList.toggle('abrir');
  });
}

// ======== BOTÃO SAIR (funciona em todas as páginas) ========
document.addEventListener('DOMContentLoaded', () => {
  // pega tanto pelo id quanto pela classe que você usa no HTML
  const logoutButtons = document.querySelectorAll('#logoutBtn, .benef-logout-btn');
  logoutButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Saindo da conta...');
      window.location.href = 'index.html'; 
    });
  });
});

// ====== BOTÃO CONFIRMAR CADASTRO =======//
document.addEventListener("DOMContentLoaded", function () {
  const botaoConfirmar = document.getElementById("btnConfirmar");

  if (botaoConfirmar) {
    botaoConfirmar.addEventListener("click", function (event) {
      event.preventDefault(); 
      alert("Cadastro realizado com sucesso, entraremos em contato!");
    });
  }
});


// ======== CONSULTAS ========
const consultas = [
  { procedimento: 'Limpeza e Restauração', data: '01/11/2025', hora: '08:30' },
  { procedimento: 'Tratamento de Canal', data: '02/12/2025', hora: '09:00' },
  { procedimento: 'Extração de Dente', data: '03/01/2026', hora: '09:50' }
];

const container = document.getElementById('consultas-container');
if (container) {
  consultas.forEach(c => {
    const card = document.createElement('div');
    card.classList.add('benef-consulta-card');
    card.innerHTML = `
      <div class="consulta-info">
        <i>🦷</i>
        <div><strong>Procedimento:</strong> ${c.procedimento}</div>
      </div>
      <div class="consulta-data">${c.data} às ${c.hora}</div>
    `;
    container.appendChild(card);
  });
}
// =======================================================
//   PAINÉL DO DENTISTA — FUNCIONALIDADES UNIFICADAS
// =======================================================

document.addEventListener("DOMContentLoaded", () => {


  // ====================== HISTÓRICO — REGISTRO DE PROCEDIMENTOS ======================
  const form = document.querySelector(".hist-form");
  const tabela = document.querySelector(".hist-tabela tbody");

  if (form && tabela) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const dente = document.getElementById("numeroDente").value.trim();
      const procedimento = document.getElementById("procedimento").value.trim();
      const descricao = document.getElementById("descricao").value.trim();
      const status = document.getElementById("status").value.trim();
      const data = document.getElementById("dataAtendimento").value.trim();

      if (!dente || !procedimento || !descricao || !status || !data) {
        showToast("⚠️ Preencha todos os campos antes de salvar.", true);
        return;
      }

      const linha = document.createElement("tr");
      linha.innerHTML = `
        <td>${dente}</td>
        <td>${procedimento}</td>
        <td>${descricao}</td>
        <td>${status}</td>
        <td>${data.split("-").reverse().join("/")}</td>
        <td class="hist-acoes">
          <button class="btn-editar">✏️</button>
          <button class="btn-excluir">🗑️</button>
        </td>
      `;

      tabela.appendChild(linha);
      form.reset();
      showToast("✅ Procedimento registrado com sucesso!");
    });

    // Editar e excluir
    tabela.addEventListener("click", (e) => {
      const linha = e.target.closest("tr");

      if (e.target.classList.contains("btn-excluir")) {
        if (confirm("Deseja realmente excluir este procedimento?")) {
          linha.remove();
          showToast("🗑️ Procedimento excluído.");
        }
      }

      if (e.target.classList.contains("btn-editar")) {
        const celulas = linha.querySelectorAll("td");
        document.getElementById("numeroDente").value = celulas[0].textContent;
        document.getElementById("procedimento").value = celulas[1].textContent;
        document.getElementById("descricao").value = celulas[2].textContent;
        document.getElementById("status").value = celulas[3].textContent;
        const data = celulas[4].textContent.split("/").reverse().join("-");
        document.getElementById("dataAtendimento").value = data;

        linha.remove();
        showToast("✏️ Edite os dados e salve novamente.");
      }
    });
  }

  // ====================== FUNÇÃO DE ALERTA VISUAL (TOAST) ======================
  function showToast(mensagem, isErro = false) {
    let toast = document.createElement("div");
    toast.className = "toast-msg";
    toast.textContent = mensagem;
    if (isErro) toast.classList.add("toast-erro");

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  // ====================== ANIMAÇÃO SUAVE ======================
  const elementos = document.querySelectorAll(
    ".dent-dados, .dent-agenda, .pac-card, .hist-dados, .hist-atendimentos, .hist-arcada"
  );

  if (elementos.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    elementos.forEach((el) => {
      el.classList.add("fade-scroll");
      observer.observe(el);
    });
  }
});

// =======CADASTRO=======//
(function () {
      const selectTipo = document.getElementById('tipo');
      const blocks = document.querySelectorAll('[data-show-for]');

      function toggleByTipo() {
        const tipo = selectTipo.value;

        blocks.forEach(block => {
          const targets = block.dataset.showFor.split(',').map(s => s.trim());
          const show = targets.includes(tipo);

          // mostra/esconde bloco
          block.classList.toggle('hidden', !show);

          // liga/desliga required dos inputs internos
          block.querySelectorAll('input, select, textarea').forEach(input => {
            if (show) {
              if (input.dataset.wasRequired === 'true') {
                input.required = true;
                delete input.dataset.wasRequired;
              }
            } else {
              if (input.required) {
                input.dataset.wasRequired = 'true';
                input.required = false;
              }
              // limpa valor quando oculta
              if (input.tagName === 'SELECT') {
                input.selectedIndex = 0;
              } else {
                input.value = '';
              }
            }
          });
        });
      }

      if (selectTipo) {
      selectTipo.addEventListener('change', toggleByTipo);
      document.addEventListener('DOMContentLoaded', toggleByTipo);
      toggleByTipo(); // executa logo ao carregar
      }
      })();

// ====== FORM CADASTRO ====== //
document.addEventListener("DOMContentLoaded", () => {
  // Verifica se estamos na página de cadastro antes de rodar o código
  if (!window.location.pathname.includes("paginaCadastro.html")) return;

  const formCadastro = document.querySelector('form.form');
  if (formCadastro) {
    formCadastro.addEventListener("submit", (e) => {
      if (!formCadastro.checkValidity()) {
        e.preventDefault();
        formCadastro.reportValidity(); 
        return;
      }

      e.preventDefault(); // simula envio
      alert("Cadastro realizado com sucesso, entraremos em contato!");
      window.location.href = "paginaLogin.html"; // redireciona após cadastrar
    });
  }
});


// ====== LOGIN SIMULADO ====== //
document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("formLogin"); // <form id="formLogin" ...>
  if (!formLogin) return; // <-- evita erro em outras páginas

  const routes = {
    beneficiario: "./paginaBeneficiario.html",
    gestor: "./paginaGestor.html",
    dentista: "./dentista.html",
  };

  formLogin.addEventListener("submit", (e) => {
    if (!formLogin.checkValidity()) {
      e.preventDefault();
      formLogin.reportValidity();
      return;
    }
    e.preventDefault();

    const perfil = document.getElementById("perfil").value;
    const destino = routes[perfil];
    if (!destino) {
      alert("Selecione um perfil válido.");
      return;
    }

    alert("Login efetuado!");
    window.location.assign(destino);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menu =
    document.querySelector(".dent-menu") ||
    document.querySelector(".pac-menu") ||
    document.querySelector(".hist-menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && e.target !== menuToggle) {
        menu.classList.remove("show");
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 600) {
        menu.classList.remove("show");
      }
    });
  }
});







