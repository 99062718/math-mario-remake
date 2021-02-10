const healthIndicator = document.getElementById("healthIndicator");
const text = [document.getElementById("title"), document.getElementById("description")];
const container = document.getElementById("container");
const inputClass = document.getElementsByClassName("inputs");
const randomNumber = [50, 200, 1000];
const maxHealth = 10;
var currentHealth = 10;
var damageMulti = 1;
var chosenDiff;
var operatorsAvailable = 4;
var buttons = [];
var currentRoom;
var currentSubRoom = [0];

//----------------------Health system

function healthCalculator(healOrDamage){
	switch(healOrDamage){
		case "heal":
			currentHealth += 5;

			if(currentHealth > maxHealth){
				currentHealth = currentHealth - (currentHealth - maxHealth);
			}
			break;
		case "damage":
			if(chosenDiff == "easy"){
				currentHealth - 2;
			}else if(chosenDiff == "medium"){
				currentHealth - 5;
			}else if(chosenDiff == "hard"){
				currentHealth - currentHealth;
			}

			if(currentHealth <= 0){
				currentHealth = 0;
			}
			break;
	}
	healthIndicator.innerHTML = currentHealth + "/" + maxHealth;
}

//----------------------Question creators

function questionCreator(){
	switch(chosenDiff){
		case "easy":
			return Math.ceil(Math.random() * randomNumber[0]);
			break;
		case "medium":
			return Math.ceil(Math.random() * randomNumber[1]);
			break;
		case "hard":
			return hardQuestion();
	}
}

function hardQuestion(){
	var number1 = Math.ceil(Math.random() * randomNumber[2]);
	var number2 = Math.ceil(Math.random() * randomNumber[2]);
	var exponentialNumber = Math.ceil(Math.random() * 10);
	var devisionNumber = Math.ceil(Math.random() * 60);
	var operator = Math.floor(Math.random() * operatorsAvailable);

	switch(operator){
		case 0:
			return [number1 + " + " + number2, number1 + number2];
			break;
		case 1:
			return [number1 + " - " + number2, number1 - number2];
			break;
		case 2:
			return [number1 + " x " + number2, number1 * number2];
			break;
		case 3:
			return [number1 + " / " + devisionNumber, Math.ceil(number1 / devisionNumber)];
			break;
		case 4:
			return [number1 + "^" + exponentialNumber, number1 ** exponentialNumber];
			break;
		case 5:
			return ["What is the remainder of " + number1 + " / " + devisionNumber, number1 % devisionNumber];
			break;
	}
}

//----------------------Question checker

function questionChecker(correctAnswer){
	var playerAnswer = document.getElementById("input").value;
	if(playerAnswer == correctAnswer){

	}else{
		healthCalculator("damage");
	}
}

//----------------------Text and input

function buttonCreator(amount){
	for(i = 0; i < amount; i++){
		buttons[i] = document.createElement("BUTTON");
		buttons[i].id = "button" + i;
		document.getElementById("inputDiv").appendChild(buttons[i]);
	}
}

function buttonModify(modifier){
	for(i = 0; i < buttons.length; i++){
		if(modifier[i] == undefined){
			document.getElementById("button" + i).style.display = "none";
		}else{
			document.getElementById("button" + i).style.display = "inline";
			document.getElementById("button" + i).innerHTML = modifier[i];
		}
	}
}

function inputModify(showOrRemove){
	for(i = 0; i < inputClass.length; i++){
		inputClass[i].style.display = showOrRemove;
	}
}

function textModify(modifier){
	for(i = 0; i < text.length; i++){
		text[i].innerHTML = modifier[i];
	}
}

function stageLoader(buttonInput, textInput, background, room){
	buttonModify(buttonInput[room]);
	textModify(textInput[room]);
	container.style.backgroundImage = background[room];
}

//----------------------Events

function button0Events(){
	switch(currentRoom){
		case "titleScreen":
			diffSelec();
			break;
		case "diffSelec":
			chosenDiff = "easy";
			begin();
			break;
		case "begin":
			you();
			break;
		case "you":
			villageAttack();
			break;
		case "villageAttack":
			currentSubRoom[0] += 1;
			villageAttack();
	}
}

function button1Events(){
	switch(currentRoom){
		case "diffSelec":
			chosenDiff = "medium";
			begin();
			break;
	}
}

function button2Events(){
	switch(currentRoom){
		case "diffSelec":
			chosenDiff = "hard";
			begin();
			break;
	}
}

//----------------------Rooms

function titleScreen(){
	buttonModify(["Start",,,,]);
	textModify(["Math Mario: remake", "PLEASE STILL DON'T SUE ME NINTENDO!"]);
	container.style.backgroundImage = "url('images/mario.jpg')";
	inputModify("none");
	currentRoom = "titleScreen";
}

function diffSelec(){
	buttonModify(["Easy", "Medium", "Hard",,]);
	textModify(["Difficulty selector", "Select a difficulty"]);
	container.style.backgroundImage = "url('images/mario.jpg')";
	currentRoom = "diffSelec";
}

function begin(){
	buttonModify(["Continue",,,,]);
	textModify(["The castle has been taken over!", "The princess has been taken by the menacing dragon! And his minions have taken over the castle!"]);
	container.style.backgroundImage = "url('images/dragon.jpg')";
	currentRoom = "begin";
}

function you(){
	buttonModify(["Continue",,,,]);
	textModify(["You are a man from the village", "A land yet untouched by the dragon and his minions"]);
	container.style.backgroundImage = "url('images/dragon.jpg')";
	currentRoom = "you";
}

function villageAttack(){
	var buttonInput = [["Continue",,,,]];
	var textInput = [["But that has now changed!", "Fend off the coming attackers!"]];
	var background = ["url('images/dragon.jpg')"];
	if(currentSubRoom < 1){
		stageLoader(buttonInput, textInput, background, currentSubRoom);
		currentRoom = "villageAttack";
	}else{

	}
}

buttonCreator(5);
document.body.onload = titleScreen();
document.getElementById("button0").addEventListener("click", button0Events);
document.getElementById("button1").addEventListener("click", button1Events);
document.getElementById("button2").addEventListener("click", button2Events);