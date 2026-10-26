```javascript
// ======================================================
// ZAK - LOGIN COM FIREBASE
// ======================================================

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";


// ======================================================
// 1. CONFIGURAÇÃO DO FIREBASE
// ======================================================
//
// COLOQUE AQUI OS DADOS DO SEU APLICATIVO WEB FIREBASE.
//
// Firebase Console:
// Configurações do projeto
// > Geral
// > Seus aplicativos
// > Aplicativo da Web
// > Configuração do SDK
//
// ======================================================

const firebaseConfig = {

  apiKey: "COLOQUE_SUA_API_KEY_AQUI",

  authDomain:
    "zak-ai-v4.firebaseapp.com",

  projectId:
    "zak-ai-v4",

  storageBucket:
    "zak-ai-v4.firebasestorage.app",

  messagingSenderId:
    "COLOQUE_SEU_SENDER_ID_AQUI",

  appId:
    "COLOQUE_SEU_APP_ID_AQUI"
};


// ======================================================
// 2. INICIAR FIREBASE
// ======================================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// ======================================================
// 3. ELEMENTOS DA PÁGINA
// ======================================================

const loginScreen =
  document.getElementById("login-screen");

const zakHub =
  document.getElementById("zak-hub");

const googleButton =
  document.getElementById("google-login");

const microsoftButton =
  document.getElementById("microsoft-login");

const appleButton =
  document.getElementById("apple-login");

const logoutButton =
  document.getElementById("logout");

const startButton =
  document.getElementById("start-zak");

const statusText =
  document.getElementById("login-status");

const userName =
  document.getElementById("user-name");


// ======================================================
// 4. GOOGLE
// ======================================================

googleButton.addEventListener("click", async () => {

  try {

    statusText.textContent =
      "Abrindo login do Google...";

    const provider =
      new GoogleAuthProvider();

    provider.setCustomParameters({
      prompt: "select_account"
    });

    await signInWithPopup(
      auth,
      provider
    );

  } catch (error) {

    console.error(error);

    statusText.textContent =
      "Não foi possível entrar com o Google.";

    alert(
      "Erro no login Google: " +
      error.message
    );
  }
});


// ======================================================
// 5. MICROSOFT
// ======================================================

microsoftButton.addEventListener(
  "click",
  async () => {

    try {

      statusText.textContent =
        "Abrindo login da Microsoft...";

      const provider =
        new OAuthProvider("microsoft.com");

      await signInWithPopup(
        auth,
        provider
      );

    } catch (error) {

      console.error(error);

      statusText.textContent =
        "Não foi possível entrar com a Microsoft.";

      alert(
        "Erro no login Microsoft: " +
        error.message
      );
    }
  }
);


// ======================================================
// 6. APPLE / ICLOUD
// ======================================================

appleButton.addEventListener(
  "click",
  async () => {

    try {

      statusText.textContent =
        "Abrindo login da Apple...";

      const provider =
        new OAuthProvider("apple.com");

      provider.addScope("email");
      provider.addScope("name");

      await signInWithPopup(
        auth,
        provider
      );

    } catch (error) {

      console.error(error);

      statusText.textContent =
        "Não foi possível entrar com a Apple.";

      alert(
        "Erro no login Apple: " +
        error.message
      );
    }
  }
);


// ======================================================
// 7. VERIFICAR USUÁRIO
// ======================================================

onAuthStateChanged(
  auth,
  (user) => {

    if (user) {

      // Usuário está logado

      loginScreen.classList.add("hidden");

      zakHub.classList.remove("hidden");

      const name =
        user.displayName ||
        user.email ||
        "Usuário ZAK";

      userName.textContent =
        "Olá, " + name + ". Seu acesso foi autorizado.";

    } else {

      // Usuário não está logado

      loginScreen.classList.remove("hidden");

      zakHub.classList.add("hidden");
    }
  }
);


// ======================================================
// 8. INICIAR CONVERSA
// ======================================================

startButton.addEventListener(
  "click",
  () => {

    alert(
      "A área de conversa do ZAK será aberta aqui."
    );

  }
);


// ======================================================
// 9. SAIR
// ======================================================

logoutButton.addEventListener(
  "click",
  async () => {

    try {

      await signOut(auth);

    } catch (error) {

      console.error(error);

      alert(
        "Não foi possível sair."
      );
    }
  }
);
```
