var diceArr = [];
var points = 0;

function initializeDice() {
	for (i = 0; i < 6; i++) {
		diceArr[i] = {};
		diceArr[i].id = "die" + (i + 1);
		diceArr[i].value = i + 1;
		diceArr[i].clicked = 0;
	}
	updateDiceImg();
}

/*Rolling dice values*/
function rollDice() {
	for (var i = 0; i < 6; i++) {
		if (diceArr[i].clicked === 0) {
			diceArr[i].value = Math.floor((Math.random() * 6) + 1);
			updateDiceImg();
		}
	}
	if (checkScore() == false) {
		points = 0;
	}
}

/*Updating images of dice given values of rollDice*/
function updateDiceImg() {
	var diceImage;
	for (var i = 0; i < 6; i++) {
		diceImage = "images/" + diceArr[i].value + ".png";
		document.getElementById(diceArr[i].id).setAttribute("src", diceImage);
	}
}

function diceClick(img) {
	var i = img.getAttribute("data-number");

	img.classList.toggle("transparent");
	if (diceArr[i].clicked === 0) {
		diceArr[i].clicked = 1;
	}
	else {
		diceArr[i].clicked = 0;
	}
}

function checkScore() {
	var farkle;
	var newRolls = [];
	for (var i = 0; i < 6; i++) {
		if (diceArr[i].clicked === 0) {
			newRolls.push(diceArr[i].value);
		}
	}
	newRolls.sort();
	for (var i = 0; i < newRolls.length; i++) {
		// console.log(`${newRolls[i]} ... ${newRolls.filter(freq => freq==newRolls[i]).length}`);
		if (newRolls.filter(freq => freq == newRolls[i]).length >= 3) {
			farkle = false;
		} else if (newRolls[i] === 1 || newRolls[i] === 5) {
			farkle = false;
		}
	}
	if (farkle) {
		return false;
	}
	return true;
}

function bankScore() {
	var rollsToScore = [];
	for (var i = 0; i < 6; i++) {
		if (diceArr[i].clicked === 1) {
			rollsToScore.push(diceArr[i].value);
		}
	}
	rollsToScore.sort();

	// attempting to prevent a single die from being counted more than once
	function removeDiceFromScoring(i) {
		var idx = rollsToScore.indexOf(i);
		if (idx > -1) {
			array.splice(idx, 1);
		}
	}
	// if they are scoring fewer than 3 dice don't need to check for 3 of a kind
	if (rollsToScore.length < 3) {
		for (var i = 0; i < rollsToScore.length; i++) {
			if (rollsToScore[i] === 1) {
				points += 100;
				removeDiceFromScoring();

			} else if (rollsToScore[i] === 5) {
				points += 50;
				removeDiceFromScoring();
			}
		}
	} else {
		// check for 3 of a kind 
		var threeOfAKind;
		for (var i = 0; i < 6; i++) {
			if (rollsToScore.filter(freq => freq == rollsToScore[i]).length >= 3) {
				threeOfAKind = rollsToScore[i];
			}
			if (threeOfAKind) {
				if (threeOfAKind === 1) {
					points += 1000;
					removeDiceFromScoring();
				} else {
					points += (threeOfAKind * 100);
					removeDiceFromScoring();
				}
			}
		}
	}
	console.log(points);
	document.getElementById("gameTotal").innerHTML = points;
}

// reset functionality has a bug, not fully working yet 
// function resetGame(){
// 	points = 0;
// 	document.getElementById("gameTotal").innerHTML = points;
// 	initializeDice();
// 	console.log(points);
// }