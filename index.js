const cells = document.getElementsByTagName('td');

//Stores each colour className as the key and the Id's of two cells.
let colourId = {
	red: [],
	green: [],
	blue: [],
	orange: [],
	purple: [],
	yellow: [],
	pink: [],
	black: [],
	violet: [],
	turquoise: []
};
//Keeps track of the number of clicks.
let counter = 0;

//Array containing matched Id's
let revealed = [];

//Array containing the current guess pair of Id's.
let guess = [];

//Removes all the eventListeners after every second click.
function clickRemove() {
	for (let i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', handleClick);
	}
}


//Removes the current guess pair and changes the colour back to grey.
//Call back to clickAssign to.
function clearGuess() {
	for (let i = 0; i < guess.length; i++) {
		let id = document.getElementById(guess[i]);
		id.style.backgroundColor = "grey";
	}
	guess = [];
	clickAssign();
}
//Updates the colour and counter. Removes the eventListener from the target cell.
//Every second click all the event listeners are removed and checks for valid match
function handleClick(e) {
	const {style, className, id} = e.target;
	e.target.removeEventListener('click', handleClick);
	style.backgroundColor = className;
	guess.push(id);
	counter++;
	if (counter % 2 === 0) {
		clickRemove();
		validMatch(e);
	}
}	

//Checks to see if the click is a valid colour match.
function validMatch(e) {
	const {id, className} = e.target;
	const colArr = colourId[className];
	if (colArr.indexOf(guess[0]) !== -1 && colArr.indexOf(guess[1]) !== -1) {
		revealed = [...revealed, ...guess];
		guess = [];
		clickAssign();
	}
	else {
		setTimeout(clearGuess, 1000)
	}
}

//Assigns click event handler to each cell, untouched if in revealed array.
function clickAssign() {
	for (let i = 0; i < cells.length; i++) {
		if (revealed.length === 0) {
			cells[i].addEventListener('click', handleClick);
		}	
		else if (revealed.indexOf(cells[i].id) !== -1) {
			continue;
		}
		else {
			cells[i].addEventListener('click', handleClick);
		}
	}
}



//Assigns each cell a classname to a corrresponding colour with a max of two cells per colour.
function hiddenAssign() {
	let colours = ["red", "green", "blue", "orange", "purple","yellow", "pink", "black", "violet", "turquoise"];
	for (let i = 0; i < cells.length; i++) {
		clickAssign();
		const rand = Math.floor(Math.random() * colours.length);
		const randCol = colours[rand];
		cells[i].className = randCol;
		if (colourId[randCol].length < 2) {
			colourId[randCol] = [...colourId[randCol], cells[i].id];
		}
		else {
			colours.splice(rand, 1);
			i--;
			continue;
		}
	}
}

//Initializes the timer
let time = 0;

//Updates the timer message until the game is finished.
function timer() {
	let clock = document.getElementById('clock');
	if (revealed.length === 20) {
		clock.innerHTML = "You finished in " + time + " seconds!";
		clearInterval(t);
	}
	else {
		clock.innerHTML = (time++) + " seconds";
	}
}

//Sets the timer to callback every second.
let t = setInterval(timer, 1000);
function init() {
	hiddenAssign();
}

window.onload = init;