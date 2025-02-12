
let listaDeSorteados = [];
let numeroSecreto = '';
let tentativas = 1;
let numeroLimite = 50;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

novoJogo();

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTexto('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Voce descobriu o numero secreto com ${tentativas}
        ${palavraTentativa}`;
        exibirTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        chute < numeroSecreto ? exibirTexto('p', 'O numero secreto é maior !') : 
        exibirTexto('p', 'O numero secreto é menor !'); 
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;
    let quantidadeElementosLista = listaDeSorteados.length;

    if(quantidadeElementosLista == numeroLimite) {
        listaDeSorteados = [];
    }

    if(listaDeSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeSorteados.push(numeroEscolhido);
        console.log(listaDeSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo() {
    numeroSecreto = gerarNumeroAleatorio()
    limparCampo();
    exibirTexto('h1', 'Jogo do numero secreto');
    exibirTexto('p', 'Escolha um numero entre 1 e 50');
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', true);
}