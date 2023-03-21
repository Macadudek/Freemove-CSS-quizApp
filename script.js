const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons')


let shuffledQuestions, currentQuestionIndex;


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    console.log('started');
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Which of the following is not a real eCommerce platform?',
        answers: [
            {text: 'ShopCommerce', correct: true},
            {text: 'Shopify', correct: false},
            {text: 'WooCommerce', correct: false},
            {text: 'BigCommerce', correct: false}
        ]
    },
    {
        question: 'If Shopify is so good, why are Shopify developers necessary?',
        answers: [
            {text: 'To save time on things like store setups and migrations', correct: false},
            {text: 'To extend the limited design options and functionalities of themes with custom code', correct: false},
            {text: 'To provide support with a deep understanding of how the platform works and what its limitations are', correct: false},
            {text: 'All the above', correct: true}
        ]
    },
    {
        question: 'Which of the following is true about Shopify developers?',
        answers: [
            {text: 'All of the above', correct: true},
            {text: 'They are paid extremely well', correct: false},
            {text: 'They need to know web development, the platform itself, and the liquid template language', correct: false},
            {text: 'There is a high demand for them', correct: false}
        ]
    },
]