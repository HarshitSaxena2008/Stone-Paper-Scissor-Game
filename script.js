let userScore = 0;
let compScore = 0;
let drawScore = 0;

let options = document.querySelectorAll(".sign-option");
let choices = document.querySelector(".choices");
let userChoiceImg = document.querySelector(".user-choice-img");
let compChoiceImg = document.querySelector(".comp-choice-img");
let userCount = document.querySelector("#user-count");
let compCount = document.querySelector("#comp-count");
let drawCount = document.querySelector("#draw-count");
let result = document.querySelector(".result");
let msg = document.querySelector(".win-msg");
let frstBox = document.querySelector(".frst-content");
let newBtn = document.querySelector("#new-button");
let rounds = document.querySelector(".rounds");
let resetBtn = document.querySelector("#reset-button");

userChoiceImg.style.pointerEvents = "none";
compChoiceImg.style.pointerEvents = "none";

let reset = () =>{
    userScore = 0;
    compScore = 0;
    drawScore = 0;
    enableBoxes();
    choices.classList.add("hide");
    result.innerText = "Play your move?";
    result.style.backgroundColor = "#0e0f19";
    frstBox.classList.add("hide");
    userCount.innerText = 0;
    compCount.innerText = 0;
    drawCount.innerText = 0;
    count = 0;
    rounds.classList.remove("hide");
    resetBtn.classList.add("hide");
}
let genCompOption = () => {
    const optionArray = ["rock","paper","scissor"];
    let randomIdx = Math.floor(Math.random() * 3);
    return optionArray[randomIdx];
}

let showOptions = (userOption,compOption) =>{
    if(userOption === 'rock') userChoiceImg.style.backgroundImage = "URL('stone.png')";
    else if(userOption === 'paper') userChoiceImg.style.backgroundImage = "URL('paper.png')";
    else userChoiceImg.style.backgroundImage = "URL('scissor.png')";

    if(compOption === 'rock') compChoiceImg.style.backgroundImage = "URL('stone.png')";
    else if(compOption === 'paper') compChoiceImg.style.backgroundImage = "URL('paper.png')";
    else compChoiceImg.style.backgroundImage = "URL('scissor.png')";
}

let findWinner = (userOption,compOption) => {
    if(userOption === compOption ){
        result.innerText = "Draw!!"
        result.style.backgroundColor = "orange";
        drawCount.innerText = ++drawScore;
    } else if( userOption === 'rock'){
        if(compOption === 'paper') {
            result.innerText = "Computer Wins!!, paper covers rock";
            result.style.backgroundColor = "red";
            compCount.innerText = ++compScore;
        } else {
            result.innerText = "You Wins!!, rock smashes scissor";
            result.style.backgroundColor = "green";
            userCount.innerText = ++userScore;
        }
    } else if ( userOption === 'paper'){
        if(compOption === 'scissor') {
            result.innerText = "Computer Wins!!, scissor cuts paper";
            result.style.backgroundColor = "red";
            compCount.innerText = ++compScore;
        } else {
            result.innerText = "You Wins!!, paper covers rock";
            result.style.backgroundColor = "green";
            userCount.innerText = ++userScore;
        }
    } else {
        if(compOption === 'rock') {
            result.innerText = "Computer Wins!!, rock smashes scissor";
            result.style.backgroundColor = "red";
            compCount.innerText = ++compScore;
        } else {
            result.innerText = "You Wins!!, scissor cuts paper";
            result.style.backgroundColor = "green";
            userCount.innerText = ++userScore;
        }
    }
}

let disableBoxes = () => {
    for(let option of options){
        option.style.pointerEvents = "none" ;
    }
}

let enableBoxes = () => {
    for(let option of options){
        option.style.pointerEvents = "auto" ;
    }
}

const playgame = (userOption) => {
    rounds.classList.add("hide");
    resetBtn.classList.remove("hide");
    let compOption = genCompOption();
    choices.classList.remove("hide");
    showOptions(userOption,compOption);
    findWinner(userOption,compOption);
}
let showWinner = () => {
    resetBtn.classList.add("hide");
    if(userScore === compScore){
    msg.innerText = "Match Draw!!";
    frstBox.classList.remove("hide");
    } else if(userScore >= compScore){
        msg.innerText = "Congratulations, You wins!!";
        frstBox.classList.remove("hide");
    } else {
        msg.innerText = "Computer wins!!";
        frstBox.classList.remove("hide");
    }
}
let count = 0;
let maxCount ;
rounds.addEventListener("click", () =>{
    maxCount = prompt("Give number of rounds..?");
    rounds.classList.add("hide");
})
options.forEach( (option) => {
    option.addEventListener("click", () => {
        let userOption = option.getAttribute("id");
        playgame(userOption);
        count++;
        if(count == maxCount) {
            disableBoxes();
            showWinner();
        };
    });
});

newBtn.addEventListener("click" , reset);
resetBtn.addEventListener("click" , reset);