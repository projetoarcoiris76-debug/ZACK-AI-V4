/* =====================================
   ZAK — SISTEMA DE ENTRADA
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  const loginScreen = document.getElementById("login-screen");
  const zakHub = document.getElementById("zak-hub");

  const googleButton = document.getElementById("google-login");
  const microsoftButton = document.getElementById("microsoft-login");
  const appleButton = document.getElementById("apple-login");
  const guestButton = document.getElementById("guest-login");

  const startChat = document.getElementById("start-chat");


  /* =====================================
     ENTRAR NO HUB
  ===================================== */

  function enterZAK() {

    loginScreen.classList.add("hidden");

    zakHub.classList.remove("hidden");

    sessionStorage.setItem("zakAccess", "true");

  }


  /* =====================================
     BOTÃO GOOGLE
     
     POR ENQUANTO:
     abre a tela do ZAK.
     
     A autenticação real do Google
     será conectada posteriormente.
  ===================================== */

  googleButton.addEventListener("click", () => {

    console.log("Login Google selecionado");

    enterZAK();

  });


  /* =====================================
     MICROSOFT
  ===================================== */

  microsoftButton.addEventListener("click", () => {

    console.log("Login Microsoft selecionado");

    enterZAK();

  });


  /* =====================================
     APPLE
  ===================================== */

  appleButton.addEventListener("click", () => {

    console.log("Login Apple selecionado");

    enterZAK();

  });


  /* =====================================
     ENTRADA DIRETA
     
     ÚTIL PARA TESTAR O SITE
  ===================================== */

  guestButton.addEventListener("click", () => {

    enterZAK();

  });


  /* =====================================
     BOTÃO INICIAR CONVERSA
  ===================================== */

  startChat.addEventListener("click", () => {

    console.log("Abrindo conversa do ZAK...");

    alert("A área de conversa do ZAK será aberta aqui.");

  });


  /* =====================================
     MANTER LOGIN DURANTE A SESSÃO
  ===================================== */

  if (sessionStorage.getItem("zakAccess") === "true") {

    loginScreen.classList.add("hidden");

    zakHub.classList.remove("hidden");

  }

});
