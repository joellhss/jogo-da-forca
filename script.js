let newWord = document.getElementById("newWord")
let textArea = document.querySelector("textarea")
let saveText = document.getElementById("save")
let insertWord = document.getElementById("insertWord")
let start = document.getElementById("start");
let newGame = document.getElementById("newGame")
let divNewGame = document.getElementById("divNewGame")
let cancel = document.getElementById("cancel")
let startForca = document.getElementById("forca")
let resultado = document.getElementById("resultado")
let text = ""

function textToArray(x) {
    let text = x.toUpperCase()
    let newText = []
    for (let letter of text) {
        newText.push(letter)
    }
    return newText
}

function msgAjuda(texto, tempo, cor) {
    
    let help = document.getElementById("help-content")
    help.innerHTML = texto
    help.style.color = cor
    
    setTimeout(e=>{
        help.innerHTML = ""
    }, tempo)
}

newGame.addEventListener("click", e=> {
    let buttonNovoJogo = document.getElementById("newGame2")
    let buttonDesistir = document.getElementById("desistir")
    let LetrasErradas = document.getElementById("wrongLetters")
    let body = document.querySelector("body")
    let adaptarMobile = document.getElementById("adaptarMobile")
    let inputMobile = document.getElementById("inputMobile")

    function ocultaLogo(sim_nao) {
        let logo = document.querySelector("header")
        let main = document.querySelector("main")
        let help = document.getElementById("help")
        switch (sim_nao) {
            case "sim":
                logo.style.display = "none"
                main.style.minHeight = "600px"
                help.style.width = "100px"
                help.style.left = "25px"
                help.style.top = "80px"
                break;
            case "não":
                logo.style.display = "flex"
                main.style.minHeight = "400px"
                help.style.width = "100%"
                help.style.left = "0px"
                help.style.top = "90%"
                break;
        }
    }

    if (body.clientWidth < 415) {
        ocultaLogo("sim")
    } else {
        ocultaLogo("não")
    }

    buttonNovoJogo.setAttribute("disabled", "true")
    buttonDesistir.addEventListener ("click", desistir)

    body.addEventListener("click", e => {
        if (e.target.localName === "p" || e.target.localName === "path" || e.target.localName === "svg") {
                body.removeEventListener("keydown", escutaTecla)
                adaptarMobile.addEventListener("click", e => {
                inputMobile.focus()
                inputMobile.addEventListener("keydown", escutaTecla)
            })
        } else {
            inputMobile.removeEventListener("keydown", escutaTecla)
            body.addEventListener("keydown", escutaTecla)
        }
    })

    
    

    let textArray = textToArray(text)
    let arrayVerificador = []
    let contador = 0
    let newDivs = ""
    let nTentativa = 6
    let arrayLetrasDigitadas = []
    let fim = false

    alternaTela(3)

    desenhaForca()

    let input = document.getElementById("input")
    
    for (let i = 0; i < textArray.length; i++) {
        newDivs += `<div class="letter" id="letter${i}"></div>`
    }


    input.innerHTML = newDivs
    
    function desistir() {
        button(1)
        ocultaLogo("não")
    }

    function novoJogo() {
        button(2)
        resultado.style.display = "none"
        resultado.innerText = ""
        ocultaLogo("não")
    }

    function button(x) {
        alternaTela(x)
        text = ""
        textArray = ""
        contador = 0
        newDivs = ""
        nTentativa = 6
        arrayLetrasDigitadas = []
        arrayVerificador = []
        enableButton()
        LetrasErradas.innerHTML = ""
        limpaTela()
        body.removeEventListener("keydown", escutaTecla)
    }
    
    function escutaTecla(e) {
    let letter = e.key.toUpperCase()

       if (arrayLetrasDigitadas.indexOf(letter) < 0) {
        
        if(textArray.indexOf(letter) > -1){
            for(let i=0; i<textArray.length; i++) {
                if(textArray[i] === letter) {
                    document.getElementById(`letter${i}`).innerText = letter

                    arrayVerificador[i] = letter
                    contador++

                    if (arrayVerificador.length === textArray.length && textArray.length === contador && text !== "") {
                        buttonNovoJogo.removeAttribute("disabled")
                        buttonDesistir.setAttribute("disabled", "true")
                        resultado.style.display = "block"
                        resultado.innerText = "Você venceu!"
                        resultado.setAttribute("id", "resultado")
                        fim = true

                        buttonNovoJogo.addEventListener("click", novoJogo)
                    }
                }
            }
            
        } else if (text !== "" && fim === false){
                chamaForca(nTentativa)
                nTentativa--
                

                LetrasErradas.innerHTML += `<div class="wLetter">${letter}</div>`

                if(nTentativa === 0) {
                    resultado.style.display = "block"
                    resultado.innerText = "Você perdeu!"
                    buttonNovoJogo.removeAttribute("disabled")
                    buttonDesistir.setAttribute("disabled", "true")
                    buttonNovoJogo.addEventListener("click", novoJogo)
                    
                    text = ""
                    nTentativa = 6
                    contador = 0
                    fim = true



                    for(let i = 0; i < textArray.length; i++) {
                        if(textArray[i] != arrayVerificador[i]) {
                            document.getElementById(`letter${i}`).style.color="#B3888E"
                            document.getElementById(`letter${i}`).innerText = textArray[i]
                        }
                    }
                }
        }

        arrayLetrasDigitadas.push(letter)
        
       } else {

            if(fim === false) {
                msgAjuda("Você já utilizou esta letra!", 2000, "var(--lightBlue500)")
            }
        
       }
    
    }

})

newWord.addEventListener("click", e => {
    alternaTela(2)
});

textArea.addEventListener("focus", e => {
    textArea.removeAttribute("placeholder")
})

textArea.addEventListener("blur", e => {
    textArea.setAttribute("placeholder", "Digite uma palavra ou frase.")
})

saveText.addEventListener("click", e => {  
   
   if (textArea.value !== "" && textArea.value.length <= 10) {
    text = textArea.value;
    alternaTela(1)
    enableButton()
    msgAjuda("Tudo pronto para começar!", 3000, "var(--lightBlue500)")
    textArea.value = ""
   } else if (textArea.value !== "" && textArea.value.length > 10) {
    msgAjuda("Máximo de 10 letras!", 3000, "var(--lightBlue500)")
   } else {
    msgAjuda("O campo não pode estar vazio!", 3000, "var(--lightBlue500)")
   }

   
})

function enableButton() {
    if(text === "") {
        newGame.setAttribute("disabled", "false")
    } else {
        newGame.removeAttribute("disabled")
    }
}

divNewGame.addEventListener("mouseenter", e => {
    if (newGame.getAttribute("disabled") !== null) {
        msgAjuda("Não há palavras para começar!", 2000, "var(--lightBlue500)")
    }  
})

cancel.addEventListener("click", e => {
    textArea.value = ""
    text = ""
    alternaTela(1)
    enableButton()

})

enableButton()


function alternaTela(numero_tela) {
    switch(numero_tela) {
        case 1:
            start.style.display = "flex";
            insertWord.style.display = "none";
            startForca.style.display = "none";
            break
        case 2:
            start.style.display = "none";
            insertWord.style.display = "flex";
            startForca.style.display = "none";
            break
        case 3:
            start.style.display = "none";
            insertWord.style.display = "none";
            startForca.style.display = "flex";
            break
    }
}

// Canvas

let tela = document.querySelector("canvas")
let pincel = tela.getContext("2d")


function desenhaForca() {
    pincel.fillStyle = "#0A3871"
    pincel.fillRect(0, 355, 294, 5)
    pincel.fillRect(60, 0, 4, 360)
    pincel.fillRect(60, 0, 190, 4)
    pincel.fillRect(250, 0, 4, 80)
}

function desenhaCorpo() {
    pincel.fillStyle = "#0A3871"
    pincel.fillRect(250, 80, 4, 150)
    desenhaCabeca()
}

function desenhaBracoDireito() {
    pincel.beginPath();
    pincel.moveTo(251, 120);
    pincel.lineTo(211,170);
    pincel.lineWidth = 4
    pincel.strokeStyle = "#0A3871"
    pincel.stroke();
}
function desenhaBracoEsquerdo() {
    pincel.beginPath();
    pincel.moveTo(252, 120);
    pincel.lineTo(292,170);
    pincel.lineWidth = 4
    pincel.strokeStyle = "#0A3871"
    pincel.stroke();
}
function desenhaPernaEsquerda() {
    pincel.beginPath();
    pincel.moveTo(253, 228);
    pincel.lineTo(290, 300);
    pincel.lineWidth = 4
    pincel.strokeStyle = "#0A3871"
    pincel.stroke();
}

function desenhaPernaDireita() {
    pincel.beginPath();
    pincel.moveTo(251, 228);
    pincel.lineTo(214, 300);
    pincel.lineWidth = 4
    pincel.strokeStyle = "#0A3871"
    pincel.stroke();
}

function desenhaCabeca() {
    pincel.fillStyle = "#0A3871"
    pincel.beginPath();
    pincel.arc(250, 80, 31.5, 0, 2*Math.PI)
    pincel.fill()
    pincel.beginPath();
    pincel.fillStyle = "#F3F5FC"
    pincel.arc(250, 80, 27.5, 0, 2*Math.PI)
    pincel.fill()
}
    
function chamaForca(x) {
    switch(x) {
        case 6:
            desenhaCabeca()
            break;
        case 5:
            desenhaCorpo()
            break;
        case 4:
            desenhaBracoDireito()
            break;
        case 3:
            desenhaBracoEsquerdo()
            break;
        case 2:
            desenhaPernaDireita()
            break;
        case 1:
            desenhaPernaEsquerda()
            break;
    }
}

function limpaTela() {
    pincel.clearRect(0, 0, 294, 360)
}

// FIM CANVAS

