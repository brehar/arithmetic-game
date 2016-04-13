var answer;
var score = 0;

document.addEventListener('DOMContentLoaded', init);

function init() {
	generateQuestion();

	var numButtons = document.querySelectorAll('.num');

	for (var i = 0; i < numButtons.length; i++) {
		numButtons[i].addEventListener('click', numButtonClicked);
	}

	if (document.attachEvent) {
		document.attachEvent('onkeydown', handler);
	} else {
		document.addEventListener('keydown', handler);
	}

	document.getElementById('clear').addEventListener('click', function() {
		document.getElementById('answer').textContent = '';
	});

	document.getElementById('plusminus').addEventListener('click', function() {
		document.getElementById('answer').textContent *= -1;
	});

	document.getElementById('skip').addEventListener('click', generateQuestion);

	document.getElementById('submit').addEventListener('click', evaluateAnswer);
}

function handler(e) {
	var key = window.event ? e.keyCode : e.which;

	if (key <= 57 && key >= 48) {
		document.getElementById('answer').textContent += String.fromCharCode(key);
	}

	if (key === 67) {
		document.getElementById('answer').textContent = '';
	}

	if (key === 187 || key === 13) {
		evaluateAnswer();
	}
}

function generateQuestion() {
	var op1 = Math.floor(Math.random() * 100 + 1);
	var op2 = Math.floor(Math.random() * 100 + 1);
	var operation = Math.floor(Math.random() * 4);

	if (operation === 3) {
		while (op2 === 0) {
			op2 = Math.floor(Math.random() * 100 + 1);
		}

		while (op1 % op2 !== 0) {
			op1 = Math.floor(Math.random() * 100 + 1);
			op2 = Math.floor(Math.random() * 100 + 1);
		}
	}

	document.getElementById('operand1').textContent = op1;
	document.getElementById('operand2').textContent = op2;

	switch (operation) {
		case 0:
			document.getElementById('operation').textContent = '+';
			answer = op1 + op2;
			break;
		case 1:
			document.getElementById('operation').textContent = '-';
			answer = op1 - op2;
			break;
		case 2:
			document.getElementById('operation').textContent = '×';
			answer = op1 * op2;
			break;
		case 3:
			document.getElementById('operation').textContent = '÷';
			answer = op1 / op2;
			break;
	}
}

function numButtonClicked(event) {
	document.getElementById('answer').textContent += event.target.textContent;
}

function evaluateAnswer() {
	var inputString = document.getElementById('answer').textContent;
	var inputNum = parseInt(inputString);

	if (inputNum === answer) {
		document.querySelector('.success').classList.remove('hidden');
		score++;
		var audio = new Audio('win.wav');
		audio.play();
	} else {
		document.querySelector('.failure').classList.remove('hidden');
		console.log(answer);
		document.getElementById('correctAnswer').textContent = answer;
		score--;
		var audio = new Audio('lose.wav');
		audio.play();
	}

	document.getElementById('score').textContent = score;

	reset();
}

function reset() {
	setTimeout(function() {
		document.querySelector('.success').classList.add('hidden');
		document.querySelector('.failure').classList.add('hidden');
		document.getElementById('answer').textContent = '';

		generateQuestion();
	}, 3000);
}