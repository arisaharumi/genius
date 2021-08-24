
let order = []; // ordem
let clickedOrder = []; //ordem dos cliques
let score = 0; // pontuação
let level = 1; // nível
let lose = false; // perdeu

// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

const nivel = document.getElementById('nivel');
const pontos = document.getElementById('pontos');

// cria ordem aleatoria de cores
let shuffleOrder = () => {
    //variável para guardar o número a cada rodada
    let colorOrder = Math.floor(Math.random() * 2);
    //atribuir o valor na próxima posição do array order
    order[order.length] = colorOrder;
    //clique continua vazio
    clickedOrder = [];

    //acender o número sorteado
    for (let i in order) {

        let elementColor = createColorElement(order[i]);
        lightColor(order[i], elementColor, Number(i) + 5);
    }
}

//acender a próxima cor
let lightColor = (color, element, number) => {
    number = number * 1000;
    setTimeout(() => {
        element.classList.add('selected');
        soundColorPlay(color);
    }, number - 450);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number + 350);
}

// comparar se a order das cores clicadas é a mesma order das cores gerada no jogo
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            lose = true;
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length && lose == false) {
        score++;
        //alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        scoreTela(score);
        levelTela(score);
        setTimeout(() => {
            nextlevel();
        }, 1000);
    }
}

// função para o clique do jogador
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    soundColorPlay(color);

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 450);
}

// função que retorna a cor
let createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

// função para avançar o nível do jogo
let nextlevel = () => {
    shuffleOrder();
}

// função para quando perder.
let gameOver = () => {
    Swal.fire({
        type: 'error',
        title: 'Poxa! Você perdeu!',
        text: `Sua pontuação: ${score}!\n\nClique em Jogar para iniciar um novo jogo!`,
        onOpen: () => {
            soundErrorPlay();
        }
    });
    order = [];
    clickedOrder = [];

    // playGame();
}

// função para começar o jogo
let playGame = () => {
    event.preventDefault();

    score = 0;
    lose = false;

    scoreTela(score);
    levelTela(score);

    //Pop-up("Vamos jogar");
    Swal.fire({
        title: "Vamos começar o jogo!",
        html: 'Se prepare para começar em: <strong></strong> segundos.',
        type: "info",
        showConfirmButton: false,
        timer: 3000,
        onOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
                Swal.getContent().querySelector('strong')
                    .textContent = Math.ceil(Swal.getTimerLeft() / 1000)
            }, 100)
        },
        onClose: () => {
            clearInterval(timerInterval)
        }
    });
    setTimeout(() => {
        nextlevel();
    }, 3000);
}

//mudar a pontuação na tela
let scoreTela = (score) => {
    pontos.innerHTML = '0' + score;
}

//mudar a pontuação na tela
let levelTela = (score) => {
    //console.log((score / 5));
    level = ((score / 5) >= 1) ? (score / 5) + 1 : 1;
    nivel.innerHTML = '0' + Math.floor(level);
}

// evento de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


// som de cada cor
let soundColorPlay = (color) => {
    if ((color == 0) || (color == 'green')) {
        let audio = new Audio('./audio/audio_green.wav');
        audio.play();
        if (audio.currentTime > 0.5) {
            setTimeout(() => {
                audio.pause();
            }, 450);
        }
    } else if ((color == 1) || (color == 'red')) {
        let audio = new Audio('./audio/audio_red.wav');
        audio.play();
        if (audio.currentTime > 0.5) {
            setTimeout(() => {
                audio.pause();
            }, 450);
        }
    } else if ((color == 2) || (color == 'yellow')) {
        let audio = new Audio('./audio/audio_yellow.wav');
        audio.play();
        if (audio.currentTime > 0.5) {
            setTimeout(() => {
                audio.pause();
            }, 450);
        }
    } else if ((color == 3) || (color == 'blue')) {
        let audio = new Audio('./audio/audio_blue.wav');
        audio.play();
        if (audio.currentTime > 0.5) {
            setTimeout(() => {
                audio.pause();
            }, 450);
        }
    }
}

let soundErrorPlay = () => {
    let audio = new Audio('./audio/audio_error.wav');
    audio.play();
}
