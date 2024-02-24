function novoJogo(){
    document.querySelector('#som').play();
}

document.querySelector('.novo').onclick = novoJogo;

let numeroSorteados = [];
let numeroAleatorio = GerarNumeroAleatorio();
let tentativas = 1;

function exibirTexto(tag, frase){
    classe = document.querySelector(tag);
    classe.innerHTML = frase;
}

function textosJogo(){
    exibirTexto('.titulo', `Número Secreto`);
    exibirTexto('.paragrafo', 'Escolha um número de 0 a 10');
}

function limparInput(){
    numeroUsuario = document.querySelector('input');
    numeroUsuario.value = '';
}

textosJogo();

function GerarNumeroAleatorio(){
    let limiteNumero = 10;

    let numeroRandomico = parseInt(Math.random() * limiteNumero + 1);
    let quantidadeElementos = numeroSorteados.length;

    if(quantidadeElementos >= limiteNumero){
        numeroSorteados = [];
    }

    if(numeroSorteados.includes(numeroRandomico)){
        return GerarNumeroAleatorio();
    }else{
        numeroSorteados.push(numeroRandomico);
        return numeroRandomico;
    }
}

function verificarChute(){
    let numeroUsuario = document.querySelector('input').value
    if(numeroUsuario == numeroAleatorio){
        exibirTexto('.titulo', `Acertou!`);
        numeroTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTexto('.paragrafo', ` O número era ${numeroAleatorio}! Acertou com ${tentativas} ${numeroTentativas}!`);

        document.getElementById('novoJogo').removeAttribute('disabled');

    }else{
        if(numeroUsuario > numeroAleatorio){
            exibirTexto('.paragrafo', `O número ${numeroUsuario} é maior que o número secreto`);
        }else{
            exibirTexto('.paragrafo', `O número ${numeroUsuario} é menor que o número secreto`);
        }
    }

    tentativas++;

    limparInput();
}

document.querySelector('.botao').onclick = verificarChute;

function reiniciarJogo(){
    numeroAleatorio = GerarNumeroAleatorio();
    tentativas = 1;
    textosJogo();
    limparInput();
    document.getElementById('novoJogo').setAttribute('disabled', true);
}

document.querySelector('#novoJogo').onclick = reiniciarJogo;