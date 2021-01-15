var maxHealth = 10;
var currentHealth = 10;
var damageMulti = 1;
var chosenDiff;
var operatorsAvailable = 4;
var healthIndicator = document.getElementById("healthIndicator");

function diffDamage(){
	if(chosenDiff == "easy"){
		currentHealth - 2;
	}else if(chosenDiff == "medium"){
		currentHealth - 5;
	}else if(chosenDiff == "hard"){
		currentHealth - currentHealth;
	}
	healthIndicator.innerHTML = currentHealth + "/" + maxHealth;
}

function questionCreator(){
	switch(chosenDiff){
		case "easy":
			return Math.ceil(Math.random() * 50);
			break;
		case "medium":
			return Math.ceil(Math.random() * 200);
			break;
		case "hard":
			return hardQuestion();
	}
}

function hardQuestion(){
	var number1 = Math.ceil(Math.random() * 1000);
	var number2 = Math.ceil(Math.random() * 1000);
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
			return [number1 + " / " + number2, Math.ceil(number1 / number2)];
			break;
		case 4:
			return [number1 + "^" + number2, number1 ** number2];
			break;
	}
}