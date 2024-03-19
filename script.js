const questions = [
    {
        question: "Who heads the RBI?",
        answers: [
            { text: "Persident", correct: false},
            { text: "Governor", correct: true},
            { text: "Prime minister", correct: false},
            { text: "Chif minister", correct: false},
        ]
    },
    {
        question: "Where is India’s Silicon Valley located?",
        answers :[
            { text: "Mumbai", correct: false},
            { text: "Chennai", correct: false},
            { text: "Banglore", correct: true},
            { text: "Pune", correct: false},
        ]
    },
    {
        question: "What is India’s rank in the 2023 World Press Freedom Index?",
        answers: [
            { text: "161 out of 180 Countries", correct: true},
            { text: "160 out of 180 Countries", correct: false},
            { text: "123 out of 180 Countries", correct: false},
            { text: "123 out of 120 Countries", correct: false},
        ]
    },
    {
        question: "Which is the Smallest Continent?",
        answers: [
            { text: "Europe", correct: false},
            { text: "Asia", correct: false},
            { text: "America", correct: false},
            { text: "Australia", correct: true},
        ]
    },
    {
        question: "Which is called, Land of Midnight Sun?",
        answers: [
            { text: "London", correct: false},
            { text: "New York", correct: false},
            { text: "Chicago", correct: false},
            { text: "Norway", correct: true},
        ]
    },
    {
        question: "Which has The largest Parliament in the world?",
        answers: [
            { text: "China", correct: true},
            { text: "America", correct: false},
            { text: "Russia", correct: false},
            { text: "India", correct: false},
        ] 
    },
    {
        question: "Which is the first state in India that has been formed on a purely linguistic basis?",
        answers: [
            { text: "Andra Pradesh", correct: true},
            { text: "Maharashtra", correct: false},
            { text: "Kerla", correct: false},
            { text: "Goa", correct: false},
        ]
    },
    {
        question: "Jammu & Kashmir was acceded to India on?",
        answers: [
            { text: "15th Augest 1949", correct: false},
            { text: "26th January 1949", correct: false},
            { text: "26th October 1947", correct: true},
            { text: "1st May 1949", correct: false},
        ]
    },
    {
        question: "How many members of the Rajya Sabha are nominated by the President?",
        answers: [
            { text: "16", correct: false},
            { text: "12", correct: true},
            { text: "7", correct: false},
            { text: "18", correct: false},
        ]
    },
    {
        question: "What is the escape velocity at Moon?",
        answers: [
            { text: "1.49km/s", correct: false},
            { text: "1.50km/s", correct: false},
            { text: "1.38km/s", correct: true},
            { text: "2.20km/hr", correct: false},
        ]  
    },
    {
        question: "Who were the immediate successors of the Mauryas in Magadha?",
        answers: [
            { text: "Sungas", correct: true},
            { text: "Moghal", correct: false},
            { text: "Maratha", correct: false},
            { text: "Nijam", correct: false},
        ] 
    },
    {
        question: "Which state in India is the major producer of mulberry silk?",
        answers: [
            { text: "Maharashtra", correct: false},
            { text: "Kerla", correct: false},
            { text: "Karnataka", correct: true},
            { text: "Dehli", correct: false},
        ] 
    },
    {
        question: "Which Article deals with the duties of the Prime Minister of India?",
        answers: [
            { text: "Article 78", correct: true},
            { text: "Artical 30", correct: false},
            { text: "Law of PMO", correct: false},
            { text: "Artical 45", correct: false},
        ] 
    },
    {
        question: "Who regulated Mutual Funds in India?",
        answers: [
            { text: "NSE", correct: false},
            { text: "BSE", correct: false},
            { text: "Finance department", correct: false},
            { text: "SEBI", correct: true},
        ] 
    },
    {
        question: "Where is the headquarter of the Food and Agriculture Organization located?",
        answers: [
            { text: "Italy", correct: false},
            { text: "France", correct: false},
            { text: "Rome", correct: false},
            { text: "Norway", correct: true},
        ] 
    }
];

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-button")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    answerButtons.innerHTML = ""; // Clear previous answer buttons

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.classList.add("btn");
        button.innerText = answer.text; // Set the text of the button
        button.addEventListener('click', () => selectAnswer(answer.correct)); // Add click event listener
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true"; // Corrected "ture" to "true"
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    } 
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

    
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();
