```javascript
/* =========================================
   ZAK — APP
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  console.log("⚡ ZAK iniciado.");

});


/* =========================================
   INICIAR CONVERSA
   ========================================= */

function startZAK() {

  console.log("⚡ Iniciando conversa com ZAK...");

  const hub = document.getElementById("zak-hub");

  if (!hub) {
    return;
  }

  /*
    Por enquanto o botão abre a área de conversa
    em uma tela simples.

    Depois podemos conectar o cérebro/API do ZAK aqui.
  */

  const existingChat = document.getElementById("zak-chat");

  if (existingChat) {
    existingChat.classList.remove("hidden");
    return;
  }

  const chat = document.createElement("section");

  chat.id = "zak-chat";

  chat.innerHTML = `
    <div class="chat-box">

      <div class="chat-header">
        <span>⚡ ZAK</span>
        <span class="chat-status">ONLINE</span>
      </div>

      <div class="chat-messages">

        <div class="zak-message">
          ⚡ Sistema ZAK online.
          <br><br>
          Bem-vindo ao meu núcleo de inteligência.
        </div>

      </div>

      <div class="chat-input-area">

        <input
          id="zak-message-input"
          type="text"
          placeholder="Digite sua mensagem..."
          autocomplete="off"
        >

        <button id="zak-send">
          ➤
        </button>

      </div>

    </div>
  `;

  document.body.appendChild(chat);

  const input = document.getElementById("zak-message-input");
  const send = document.getElementById("zak-send");

  send.addEventListener("click", sendMessage);

  input.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
      sendMessage();
    }

  });

  input.focus();
}


/* =========================================
   ENVIAR MENSAGEM
   ========================================= */

function sendMessage() {

  const input = document.getElementById("zak-message-input");

  const messages = document.querySelector(".chat-messages");

  if (!input || !messages) {
    return;
  }

  const text = input.value.trim();

  if (!text) {
    return;
  }

  const userMessage = document.createElement("div");

  userMessage.className = "user-message";

  userMessage.textContent = text;

  messages.appendChild(userMessage);

  input.value = "";

  messages.scrollTop = messages.scrollHeight;

  setTimeout(() => {

    const zakMessage = document.createElement("div");

    zakMessage.className = "zak-message";

    zakMessage.textContent =
      "⚡ Recebi sua mensagem. O cérebro do ZAK ainda precisa ser conectado à API para gerar respostas de IA.";

    messages.appendChild(zakMessage);

    messages.scrollTop = messages.scrollHeight;

  }, 500);
}


/* =========================================
   FECHAR CHAT
   ========================================= */

function closeZAKChat() {

  const chat = document.getElementById("zak-chat");

  if (chat) {
    chat.remove();
  }

}
```
