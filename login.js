import { initializeApp } from
    "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider,
    OAuthProvider,
    signInWithPopup,
    onAuthStateChanged
} from
    "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// 1. CONFIGURAÇÃO DO FIREBASE
// Substitui pelos dados do teu projeto Firebase.

const firebaseConfig = {
    apiKey: "COLOCA_TUA_API_KEY",
    authDomain: "TEU_PROJETO.firebaseapp.com",
    projectId: "TEU_PROJECT_ID",
    appId: "TEU_APP_ID"
};

// 2. INICIALIZAR FIREBASE

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 3. ELEMENTOS DA TELA

const message = document.getElementById("login-message");

const googleButton = document.getElementById("google-login");
const microsoftButton = document.getElementById("microsoft-login");
const appleButton = document.getElementById("apple-login");

// 4. DESTINO APÓS LOGIN
// Altera "hub.html" caso o teu hub tenha outro nome.

const HUB_URL = "./hub.html";

// 5. LOGIN COM GOOGLE

googleButton.addEventListener("click", async () => {
    const provider = new GoogleAuthProvider();

    await login(provider);
});

// 6. LOGIN COM MICROSOFT

microsoftButton.addEventListener("click", async () => {
    const provider = new OAuthProvider("microsoft.com");

    await login(provider);
});

// 7. LOGIN COM APPLE

appleButton.addEventListener("click", async () => {
    const provider = new OAuthProvider("apple.com");

    provider.addScope("email");
    provider.addScope("name");

    await login(provider);
});

// 8. FUNÇÃO DE AUTENTICAÇÃO

async function login(provider) {
    message.textContent = "Aguarda, a verificar a tua conta...";

    googleButton.disabled = true;
    microsoftButton.disabled = true;
    appleButton.disabled = true;

    try {
        await signInWithPopup(auth, provider);

        window.location.replace(HUB_URL);

    } catch (error) {
        console.error("Erro de autenticação:", error);

        const messages = {
            "auth/popup-closed-by-user":
                "O login foi cancelado.",

            "auth/popup-blocked":
                "O navegador bloqueou a janela de login.",

            "auth/unauthorized-domain":
                "Este domínio ainda não está autorizado no Firebase.",

            "auth/operation-not-allowed":
                "Este método de login ainda não foi ativado no Firebase."
        };

        message.textContent =
            messages[error.code] ||
            "Não foi possível entrar. Verifica a configuração e tenta novamente.";

    } finally {
        googleButton.disabled = false;
        microsoftButton.disabled = false;
        appleButton.disabled = false;
    }
}

// 9. VERIFICAR SE JÁ EXISTE UMA SESSÃO

onAuthStateChanged(auth, (user) => {
    if (user && window.location.pathname.endsWith("/login.html")) {
        window.location.replace(HUB_URL);
    }
});
