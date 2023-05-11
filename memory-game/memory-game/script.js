const cardArray = [
  {
    name: 'alien-cartoon1',
    img: 'images/alien-cartoon1.jpg',
  },
  {
    name: 'alien-cartoon2',
    img: 'images/alien-cartoon2.jpeg',
  },
  {
    name: 'alien-cartoon3',
    img: 'images/alien-cartoon3.jpeg',
  },
  {
    name: 'alien-cartoon4',
    img: 'images/alien-cartoon4.jpeg',
  },
  {
    name: 'alien-cartoon5',
    img: 'images/alien-cartoon5.jpeg',
  },
  {
    name: 'alien-cartoon6',
    img: 'images/alien-cartoon6.jpeg',
  },
  {
    name: 'alien-cartoon1',
    img: 'images/alien-cartoon1.jpg',
  },
  {
    name: 'alien-cartoon2',
    img: 'images/alien-cartoon2.jpeg',
  },
  {
    name: 'alien-cartoon3',
    img: 'images/alien-cartoon3.jpeg',
  },
  {
    name: 'alien-cartoon4',
    img: 'images/alien-cartoon4.jpeg',
  },
  {
    name: 'alien-cartoon5',
    img: 'images/alien-cartoon5.jpeg',
  },
  {
    name: 'alien-cartoon6',
    img: 'images/alien-cartoon6.jpeg',
  },
]

cardArray.sort(() => 0.5 - Math.random() )

let score = 0;
const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []

function createBoard() {
  for (let i = 0; i < cardArray.length; i++ ){
    const card = document.createElement('img')
    card.setAttribute('src', 'images/blank.jpeg')
    card.setAttribute('data-id', i)
    card.addEventListener('click', flipCard)
    gridDisplay.appendChild(card)
  }
}


function checkMatch(){
  const cards = document.querySelectorAll('#grid img')
  const optionOneId = cardsChosenIds[0]
  const optionTwoId = cardsChosenIds[1]
  console.log('check for match!')
  if(optionOneId === optionTwoId){
    cards[optionOneId].setAttribute('src', 'images/blank.jpeg')
    cards[optionTwoId].setAttribute('src', 'images/blank.jpeg')
    alert('You have clicked on the same card!')
  }

  if (cardsChosen[0] == cardsChosen[1]) {
    alert('you found a match')
    cards[optionOneId].setAttribute('src', 'images/white.png')
    cards[optionTwoId].setAttribute('src', 'images/white.png')
    cards[optionOneId].removeEventListener('click', flipCard)
    cards[optionTwoId].removeEventListener('click', flipCard)
    cardsWon.push(cardsChosen)
    score++;
  }else {
    cards[optionOneId].setAttribute('src', 'images/blank.jpeg')
    cards[optionTwoId].setAttribute('src', 'images/blank.jpeg')
    alert('Sorry try again!')
    updateLowestScore();
    displayScore();
  }

  resultDisplay.textContent = cardsWon.length
  cardsChosen = []
  cardsChosenIds = []

  if (cardsWon.length === cardArray.length/2){
    resultDisplay.textContent = 'Congrats you matched them all!'
  }


}

function flipCard () {
  console.log(cardArray)
  const cardId = this.getAttribute('data-id')
  cardsChosen.push(cardArray[cardId].name)
  cardsChosenIds.push(cardId)
  this.setAttribute('src', cardArray[cardId].img)
  if (cardsChosen.length === 2) {
    setTimeout( checkMatch, 500)
  }

}

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", function() {
  startButton.remove();
  createBoard();
});

const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", function() {
  resetGame();
});

function resetGame() {
  gridDisplay.innerHTML="",
  resultDisplay.textContent="";
  cardsChosen=[];
  cardsChosenIds=[];
  cardsWon.length = 0;
  cardArray.sort(() => 0.5 - Math.random());
  createBoard();

}

function getLowestScore() {
  const lowestScore = localStorage.getItem('lowestScore');
  return lowestScore ? parseInt(lowestScore) : Infinity;
}

function updateLowestScore() {
  const lowestScore = getLowestScore();
  if (score < lowestScore) {
    localStorage.setItem('lowestScore', score);
  }
}

function displayScore() {
  resultDisplay.textContent = "Score: " + score;
}
