import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    OAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from
    "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// SUBSTITUI PELOS DADOS DO TEU PROJETO FIREBASE.
const firebaseConfig = {
    apiKey: "TUA_API_KEY",
    authDomain: "TEU_PROJETO.firebaseapp.com",
    projectId: "TEU_PROJECT_ID",
    appId: "TEU_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginScreen = document.getElementById("login-screen");
const zakHub = document.getElementById("zak-hub");
const loginMessage = document.getElementById("login-message");

function mostrarLogin() {
    loginScreen.hidden = false;
    zakHub.hidden = true;
}

function mostrarHub() {
    loginScreen.hidden = true;
    zakHub.hidden = false;
}

async function entrar(provider) {
    loginMessage.textContent = "A verificar a tua conta...";

    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error(error);

        const mensagens = {
            "auth/popup-closed-by-user":
                "O login foi cancelado.",

            "auth/popup-blocked":
                "Permite janelas pop-up no navegador.",

            "auth/unauthorized-domain":
                "Adiciona o domínio do site às configurações do Firebase.",

            "auth/operation-not-allowed":
                "Ativa este método de login no Firebase."
        };

        loginMessage.textContent =
            mensagens[error.code] ||
            "Não foi possível entrar. Verifica a configuração do Firebase.";
    }
}

document.getElementById("google-login").onclick = () => {
    entrar(new GoogleAuthProvider());
};

document.getElementById("microsoft-login").onclick = () => {
    entrar(new OAuthProvider("microsoft.com"));
};

document.getElementById("apple-login").onclick = () => {
    const provider = new OAuthProvider("apple.com");
    provider.addScope("email");
    provider.addScope("name");
    entrar(provider);
};

document.getElementById("logout-button").onclick = async () => {
    await signOut(auth);
};

// O estado real da autenticação controla as telas.
onAuthStateChanged(auth, (user) => {
    if (user) {
        mostrarHub();
    } else {
        mostrarLogin();
    }
});

// Demonstração da interface de conversa.
// Isto não conecta a uma IA real.
document.getElementById("chat-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const input = document.getElementById("user-message");
    const messages = document.getElementById("messages");
    const texto = input.value.trim();

    if (!texto) return;

    const mensagem = document.createElement("p");
    mensagem.textContent = "Você: " + texto;
    messages.appendChild(mensagem);

    const resposta = document.createElement("p");
    resposta.textContent =
        "ZAK: A área de conversa está pronta para ser conectada à IA.";
    messages.appendChild(resposta);

    input.value = "";
});
