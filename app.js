/*
  ZAK — ISAAC AI

  1. Altere TROQUE_PELA_SUA_SENHA para a senha que você escolheu.
  2. Para conectar a inteligência artificial, configure API_URL
     com o endereço do seu servidor.
  3. Não coloque chaves secretas de API neste arquivo público.
*/

const DEMO_PASSWORD = "TROQUE_PELA_SUA_SENHA";

// Exemplo: "https://seu-servidor.onrender.com/chat"
const API_URL = "";

const loginScreen = document.getElementById("loginScreen");
const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const loginError = document.getElementById("loginError");

const app = document.getElementById("app");
const logoutBtn = document.getElementById("logoutBtn");

const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");
const chatStatus = document.getElementById("chatStatus");

// Mostrar ou ocultar a senha
togglePassword.addEventListener("click", () => {
  const mostrar = passwordInput.type === "password";

  passwordInput.type = mostrar ? "text" : "password";

  togglePassword.setAttribute(
    "aria-label",
    mostrar ? "Ocultar senha" : "Mostrar senha"
  );
});

// Verificar a senha e abrir o painel
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (passwordInput.value === DEMO_PASSWORD) {
    loginError.textContent = "";

    loginScreen.classList.add("hidden");
    app.classList.remove("hidden");

    userInput.focus();
  } else {
    loginError.textContent = "Senha incorreta. Tente novamente.";

    passwordInput.select();
  }
});

// Sair do painel
logoutBtn.addEventListener("click", () => {
  app.classList.add("hidden");
  loginScreen.classList.remove("hidden");

  passwordInput.value = "";
  loginError.textContent = "";

  passwordInput.focus();
});

// Adicionar mensagens ao chat
function adicionarMensagem(texto, autor) {
  const mensagem = document.createElement("div");

  mensagem.className =
    "message " +
    (autor === "user" ? "user-message" : "zak-message");

  const nome = document.createElement("strong");

  nome.textContent = autor === "user" ? "VOCÊ" : "ZAK";

  const conteudo = document.createElement("p");

  conteudo.textContent = texto;

  mensagem.appendChild(nome);
  mensagem.appendChild(conteudo);

  chatMessages.appendChild(mensagem);

  mensagem.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}

// Enviar mensagem para o chat
chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const texto = userInput.value.trim();

  if (!texto) {
    return;
  }

  adicionarMensagem(texto, "user");

  userInput.value = "";
  userInput.focus();

  // Se o servidor ainda não foi configurado
  if (!API_URL) {
    adicionarMensagem(
      "Minha interface está funcionando! ⚡ Porém, meu servidor de inteligência artificial ainda não está conectado. Configure o endereço da API no app.js para eu responder usando sua IA.",
      "zak"
    );

    chatStatus.textContent =
      "Servidor da IA não configurado.";

    return;
  }

  chatStatus.textContent = "ZAK está pensando...";

  try {
    const resposta = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        message: texto
      })
    });

    if (!resposta.ok) {
      throw new Error("Erro HTTP: " + resposta.status);
    }

    const dados = await resposta.json();

    const textoResposta =
      dados.reply ??
      dados.response ??
      dados.message ??
      "O servidor respondeu, mas não encontrei o texto da resposta.";

    adicionarMensagem(String(textoResposta), "zak");

    chatStatus.textContent = "Conectado ao servidor.";
  } catch (erro) {
    console.error("Erro ao conectar com o servidor:", erro);

    adicionarMensagem(
      "Não consegui conectar ao meu servidor agora. Verifique se ele está online e se o endereço da API está correto.",
      "zak"
    );

    chatStatus.textContent =
      "Falha de conexão com a IA.";
  }
});
