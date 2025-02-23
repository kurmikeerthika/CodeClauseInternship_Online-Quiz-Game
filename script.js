const startButton = document.getElementById('start-btn');
const submitButton = document.getElementById('submit-btn');
const nextButton = document.getElementById('next-btn');
const prevButton = document.getElementById('prev-btn');
const finalSubmitButton = document.getElementById('final-submit-btn');
const restartButton = document.getElementById('restart-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const questionNumberElement = document.getElementById('question-number');
const timerElement = document.getElementById('remaining-time-display');
const timeBar = document.getElementById('time-bar');
const resultScreen = document.getElementById('result-screen');
const resultText = document.getElementById('result-text'); // New result text element

let shuffledQuestions, currentQuestionIndex, timeLeft, timer;
let selectedAnswers = {}; // Stores selected answers
let score = 0; // Tracks correct answers

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
prevButton.addEventListener('click', () => {
    currentQuestionIndex--;
    setNextQuestion();
});
submitButton.addEventListener('click', lockAnswer);
finalSubmitButton.addEventListener('click', calculateScore);
restartButton.addEventListener('click', startGame);

function startGame() {
    document.getElementById('start-screen').classList.add('hide');
    resultScreen.classList.add('hide');
    startButton.classList.add('hide');
    shuffledQuestions = questions;
    currentQuestionIndex = 0;
    score = 0; // Reset score
    selectedAnswers = {}; // Reset selected answers
    questionContainer.classList.remove('hide');
    timeLeft = 10 * 60;
    startTimer();
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    updateNavigationButtons();
}

function showQuestion(question) {
    questionNumberElement.innerText = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    questionElement.innerText = question.question;
    
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.dataset.correct = answer.correct;
        
        button.addEventListener('click', () => selectAnswer(button, answer.correct));

        if (selectedAnswers[currentQuestionIndex] === answer.text) {
            button.classList.add('selected');
        }

        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(button, isCorrect) {
    Array.from(answerButtonsElement.children).forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
    selectedAnswers[currentQuestionIndex] = button.innerText;

    if (isCorrect) {
        score++; // Increase score for correct answers
    }
}

function resetState() {
    nextButton.classList.add('hide');
    submitButton.classList.remove('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function lockAnswer() {
    if (selectedAnswers[currentQuestionIndex]) {
        submitButton.classList.add('hide');
        nextButton.classList.remove('hide');
        if (currentQuestionIndex === shuffledQuestions.length - 1) {
            finalSubmitButton.classList.remove('hide');
        }
    } else {
        alert('Please select an answer before submitting.');
    }
}

function updateNavigationButtons() {
    prevButton.classList.toggle('hide', currentQuestionIndex === 0);
    nextButton.classList.toggle('hide', currentQuestionIndex >= shuffledQuestions.length - 1);
    submitButton.classList.toggle('hide', currentQuestionIndex >= shuffledQuestions.length - 1);
    finalSubmitButton.classList.toggle('hide', currentQuestionIndex !== shuffledQuestions.length - 1);
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        timeBar.style.width = `${(timeLeft / 600) * 100}%`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            calculateScore();
        }
    }, 1000);
}

function calculateScore() {
    clearInterval(timer);
    questionContainer.classList.add('hide');
    resultScreen.classList.remove('hide');
    resultText.innerText = `Test Submitted Successfully! 🎉 Your Score: ${score} / ${questions.length}`;
}

const questions = [
    { question: 'What is the capital of France?', answers: [{ text: 'Paris', correct: true }, { text: 'London', correct: false }, { text: 'Berlin', correct: false }, { text: 'Madrid', correct: false }] },
    { question: 'Which planet is known as the Red Planet?', answers: [{ text: 'Mars', correct: true }, { text: 'Jupiter', correct: false }, { text: 'Venus', correct: false }, { text: 'Saturn', correct: false }] },
    { question: 'What is the square root of 64?', answers: [{ text: '6', correct: false }, { text: '8', correct: true }, { text: '10', correct: false }, { text: '12', correct: false }] },
    { question: 'Who wrote "Hamlet"?', answers: [{ text: 'Shakespeare', correct: true }, { text: 'Hemingway', correct: false }, { text: 'Austen', correct: false }, { text: 'Dickens', correct: false }] },
    { question: 'What is the chemical symbol for water?', answers: [{ text: 'H2O', correct: true }, { text: 'O2', correct: false }, { text: 'CO2', correct: false }, { text: 'HO', correct: false }] },
    { question: 'Which continent is the Sahara Desert in?', answers: [{ text: 'Africa', correct: true }, { text: 'Asia', correct: false }, { text: 'Australia', correct: false }, { text: 'South America', correct: false }] },
    { question: 'What is the boiling point of water?', answers: [{ text: '100°C', correct: true }, { text: '50°C', correct: false }, { text: '150°C', correct: false }, { text: '200°C', correct: false }] },
    { question: 'Who painted the Mona Lisa?', answers: [{ text: 'Da Vinci', correct: true }, { text: 'Van Gogh', correct: false }, { text: 'Picasso', correct: false }, { text: 'Rembrandt', correct: false }] },
    { question: 'Which is the largest ocean?', answers: [{ text: 'Pacific', correct: true }, { text: 'Atlantic', correct: false }, { text: 'Indian', correct: false }, { text: 'Arctic', correct: false }] },
    { question: 'What gas do plants absorb?', answers: [{ text: 'Carbon Dioxide', correct: true }, { text: 'Oxygen', correct: false }, { text: 'Nitrogen', correct: false }, { text: 'Helium', correct: false }] },
];