const questions = [
    {
        question: " The base of the temple is made in ___ stone while most of the superstructure is in softer sandstone. ",
        optionA: " Soft granite ",
        optionB: " hard granite ",
        optionC: " Both A & B",
        optionD: " None of the above",
        correctOption: "optionB"
    },

    {
        question: " Kanchipuram, in the state of Tamil Nadu, is one of the most sacred cities in southern India and also known as ____",
        optionA: " The City of Thousand Temples ",
        optionB: " The City of Hundered Temples",
        optionC: " The City of Temples",
        optionD: " None of the above ",
        correctOption: "optionA"
    },

    {
        question: " The oldest temple of Kancheepuram, ___ is a classic example of Pallava architecture. Dedicated to the Hindu God Shiva. ",
        optionA: " Meenakshi ",
        optionB: " Vinagar ",
        optionC: " Shiva ",
        optionD: " Kailasanathar ",
        correctOption: "optionD"
    },

    {
        question: " Vaikunta Perumal Temple is a temple dedicated to ___ located in Kanchipuram in the South Indian state of Tamil Nadu. Constructed in the Dravidian style of architecture,The temple is considered the second oldest extant temple in Kanchipuram after the Kailasanthar temple. ",
        optionA: " Shiva ",
        optionB: " Muruga ",
        optionC: " Vishnu ",
        optionD: " None ",
        correctOption: "optionC"
    },

    {
        question: " The round pillars with bottom carved in the shape of mythical animal lions are the signature stamp of ___ dynasty. ",
        optionA: " Pandiya ",
        optionB: " Chola ",
        optionC: " Chera ",
        optionD: " Pallava ",
        correctOption: "optionD"
    },

    {
        question: "The Shiva Lingam which is present in the main shrine has the feature of having __ faces and is ___ feet high and approximately 108 lingams. ",
        optionA: " 16 , 10 ",
        optionB: " 16 , 11 ",
        optionC: " 10 , 16 ",
        optionD: " 15 , 10",
        correctOption: "optionA"
    },

    {
        question: " The city is important to both ___  ",
        optionA: " Shaivism  ",
        optionB: " Sri Vaishnavism. ",
        optionC: " Both A & B ",
        optionD: " None of the above ",
        correctOption: "optionC"
    },

    {
        question: " The temple’s foundations are made of ___, which could withstand the weight of the temple, while the superstructure, including the carvings, are all made of sandstone.  ",
        optionA: " granite ",
        optionB: " Stone ",
        optionC: " Bricks ",
        optionD: " None ",
        correctOption: "optionA"
    },

    {
        question: " This Kanchi Kailasanathar temple is famous for its ____, the gopuram over the Sanctum Sanctorum. It speaks volumes of architectural beauty that flourished in the reign of Pallava King ",
        optionA: " Paintings ",
        optionB: " Palace ",
        optionC: " Temple Architecture ",
        optionD: " Magnificent Vimana ",
        correctOption: "optionD"
    },

    {
        question 10:" This temple is a stand-alone __ with no other temple in its complex ",
        optionA: "single temple ",
        optionB: " Large Temple ",
        optionC: " Couple temple ",
        optionD: " None of the above ",
        correctOption: "optionA"
    },


]


let shuffledQuestions = [] 

function handleQuestions() { 
    
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1 
let playerScore = 0  
let wrongAttempt = 0
let indexNumber = 0 

function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;

}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] 
    const currentQuestionAnswer = currentQuestion.correctOption 
    const options = document.getElementsByName("option"); 
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            
            correctOption = option.labels[0].id
        }
    })

    
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++ 
            indexNumber++ 
            
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++  
            indexNumber++
            
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}


function handleNextQuestion() {
    checkForAnswer() 
    unCheckRadioButtons()
    
    setTimeout(() => {
        if (indexNumber <= 9) {

            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}


function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}


function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}


function handleEndGame() {
    let remark = null
    let remarkColor = null

    
    if (playerScore <= 3) {
        remark = "Bad Grades, Keep Practicing."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Average Grades, You can do better."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Excellent, Keep the good work going."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"

}


function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}


function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}
