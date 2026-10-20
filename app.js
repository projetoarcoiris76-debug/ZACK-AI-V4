/*
    ZAK — ISAAC AI

    LOGIN

    Esta versão remove a senha.

    IMPORTANTE:
    Os botões abaixo são a interface.
    A autenticação REAL será conectada depois
    a um serviço de autenticação.
*/


const loginScreen =
    document.getElementById("loginScreen");

const app =
    document.getElementById("app");


const googleLogin =
    document.getElementById("googleLogin");

const microsoftLogin =
    document.getElementById("microsoftLogin");

const appleLogin =
    document.getElementById("appleLogin");

const otherLogin =
    document.getElementById("otherLogin");


const loginMessage =
    document.getElementById("loginMessage");


const logoutBtn =
    document.getElementById("logoutBtn");


const chatForm =
    document.getElementById("chatForm");

const userInput =
    document.getElementById("userInput");

const chatMessages =
    document.getElementById("chatMessages");

const chatStatus =
    document.getElementById("chatStatus");


/*
    FUNÇÃO PARA ABRIR O ZAK
*/

function entrarNoZak(nome) {

    loginMessage.textContent = "";

    loginScreen.classList.add("hidden");

    app.classList.remove("hidden");

    chatStatus.textContent =
        "Conectado como " + nome;

    userInput.focus();
}


/*
    GOOGLE
*/

googleLogin.addEventListener(
    "click",
    () => {

        loginMessage.textContent =
            "Login com Google será conectado na próxima etapa.";

    }
);


/*
    MICROSOFT
*/

microsoftLogin.addEventListener(
    "click",
    () => {

        loginMessage.textContent =
            "Login com Microsoft será conectado na próxima etapa.";

    }
);


/*
    APPLE / ICLOUD
*/

appleLogin.addEventListener(
    "click",
    () => {

        loginMessage.textContent =
            "Login com Apple/iCloud será conectado na próxima etapa.";

    }
);


/*
    OUTRO MÉTODO
*/

otherLogin.addEventListener(
    "click",
    () => {

        loginMessage.textContent =
            "Outros métodos de login serão adicionados depois.";

    }
);


/*
    SAIR
*/

logoutBtn.addEventListener(
    "click",
    () => {

        app.classList.add("hidden");

        loginScreen.classList.remove("hidden");

        loginMessage.textContent = "";

    }
);


/*
    CHAT
*/

function adicionarMensagem(
    texto,
    autor
) {

    const mensagem =
        document.createElement("div");


    mensagem.className =
        "message " +
        (
            autor === "user"
                ? "user-message"
                : "zak-message"
        );


    const nome =
        document.createElement("strong");


    nome.textContent =
        autor === "user"
            ? "VOCÊ"
            : "ZAK";


    const conteudo =
        document.createElement("p");


    conteudo.textContent =
        texto;


    mensagem.appendChild(nome);

    mensagem.appendChild(conteudo);

    chatMessages.appendChild(mensagem);


    mensagem.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

}


/*
    ENVIAR MENSAGEM
*/

chatForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const texto =
            userInput.value.trim();


        if (!texto) {
            return;
        }


        adicionarMensagem(
            texto,
            "user"
        );


        userInput.value = "";


        /*
            Temporariamente o ZAK responde
            enquanto o backend não estiver conectado.
        */

        setTimeout(
            () => {

                adicionarMensagem(
                    "Recebi sua mensagem! ⚡ Meu cérebro ainda precisa ser conectado ao servidor.",
                    "zak"
                );

            },
            500
        );

    }
);
