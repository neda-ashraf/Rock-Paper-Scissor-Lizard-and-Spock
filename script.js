let images = document.getElementsByClassName('imageDiv');
const rock = document.getElementById('rock');
const scissors = document.getElementById('scissors');
const paper = document.getElementById('paper');
const lizard = document.getElementById('lizard');
const spock = document.getElementById('spock');
let playerScore = document.getElementById('playerScore');
let computerScore = document.getElementById('computerScore');

const player = document.getElementById('player');
const computer = document.getElementById('computer');
let selectedPlayerImage = document.getElementById('image1');
let selectedComputerImage = document.getElementById('image2');
let result = document.getElementById('result');
const reset = document.getElementById('reset');

const winningCombinations = [
    ['scissors', 'paper'],
    ['paper', 'rock'],
    ['rock', 'lizard'],
    ['lizard', 'spock'],
    ['spock', 'scissors'],
    ['scissors', 'lizard'],
    ['lizard', 'paper'],
    ['paper', 'spock'],
    ['spock', 'rock'],
    ['rock', 'scissors']
];

images = Array.from(images);

let playerImage = images[0].id;
let computerImage = images[0].id;

let score1 = 0;
let score2 = 0;
let count = 0;

const playerChildDivs = player.children;
const computerChildDivs = computer.children;

let scoreUpdate = (playerImage, computerImage) => {
    const winningCombination = winningCombinations.find(([a, b]) =>
        (a === playerImage && b === computerImage) || (b === playerImage && a === computerImage)
    );

    if (winningCombination) {
        const [a, b] = winningCombination;
        if (a === playerImage && b === computerImage) {
            score1 += 1;
            playerScore.textContent = `${score1}`;
            playerChildDivs[1].classList.add('winningPlayer');
        } else if (b === playerImage && a === computerImage) {
            score2 += 1;
            computerScore.textContent = `${score2}`;
            computerChildDivs[1].classList.add('winningPlayer');
        }
    }
}


const checkResult = () => {
    result.style.visibility = 'visible';
    if (score1 > score2) {
        result.textContent = `Player Won🎉`;
    } else if (score2 > score1) {
        result.textContent = `Computer Won🎉`;
    } else {
        result.textContent = `Draw`;
    }
}

images.forEach(image => {
    image.addEventListener('click', () => {
        if (count >= 10) {
            checkResult();
            return;
        }

        playerChildDivs[1].classList.remove('winningPlayer');
        computerChildDivs[1].classList.remove('winningPlayer');

        playerImage = image.id;
        let imagesrc = image.firstChild.getAttribute('src');
        selectedPlayerImage.setAttribute('src', imagesrc);
        computerImage = images[Math.floor(Math.random() * images.length)];
        selectedComputerImage.setAttribute('src', computerImage.firstChild.getAttribute('src'));
        computerImage = computerImage.id;
        scoreUpdate(playerImage, computerImage);

        count += 1;
    });
});

reset.addEventListener('click', () => {
    count = 0;
    score1 = 0;
    score2 = 0;
    playerChildDivs[1].classList.remove('winningPlayer');
    computerChildDivs[1].classList.remove('winningPlayer');
    playerScore.textContent = `${score1}`;
    computerScore.textContent = `${score2}`;
    result.textContent = '';
    selectedPlayerImage.setAttribute('src', 'https://ipfs.filebase.io/ipfs/QmYnNosdda3wDWRPcRAuGrRQG3LJcQjYHMRdBSNg63FYfJ');
    selectedComputerImage.setAttribute('src', 'https://ipfs.filebase.io/ipfs/QmXHUWUonzaK1tDNkxrtTQi9X1LKNSc1jxMy36Adv5DiPC');
});





