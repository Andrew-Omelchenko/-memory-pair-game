var colorsTable = [
	"Red",
	"Green",
	"Blue",
	"Cyan",
	"Magenta",
	"Yellow",
	"Brown",
	"GreenYellow ",
	"Red",
	"Green",
	"Blue",
	"Cyan",
	"Magenta",
	"Yellow",
	"Brown",
	"GreenYellow "
];

// class Cell
var Cell = function(color) {
	this.face_color = color;
};
Cell.prototype.draw = function() {
	var front_div = document.createElement("div");
	front_div.classList.add("front");
	front_div.style.backgroundColor = this.face_color;
	var back_div = document.createElement("div");
	back_div.classList.add("back");
	back_div.style.color = this.face_color;	// trick only
	var sub_root_div = document.createElement("div");
	sub_root_div.classList.add("flipper");
	sub_root_div.appendChild(front_div);
	sub_root_div.appendChild(back_div);
	var root_div = document.createElement("div");
	root_div.classList.add("flip-container");
	root_div.appendChild(sub_root_div);
	var table = document.getElementById("game-table");
	table.appendChild(root_div);
};

// class GameTable
var GameTable = function(table) {
	this.table = table;
};
GameTable.prototype.shuffle = function() {
	for(var j, x, i = this.table.length; 
		i; 
		j = parseInt(Math.random() * i), 
		x = this.table[--i], 
		this.table[i] = this.table[j], 
		this.table[j] = x);
};
GameTable.prototype.draw = function() {
	for(var index = 0; index < this.table.length; index++) {
		var cell = new Cell(this.table[index]);
		cell.draw();
	}
};

// class Game
var Game = function(table) {
	this.gameTable = new GameTable(table);
	this.selectedCells = [];
	this.nTurns = 0;
	this.nPairsFound = 0;
};
Game.prototype.init = function() {
	this.gameTable.shuffle();
	this.gameTable.draw();
	this.updateCounter();
};
Game.prototype.updateCounter = function() {
	var span = document.getElementById("numder-of-turns");
	span.innerText = this.nTurns;
};

window.onload = function() {
	// TODO
	var game = new Game(colorsTable);
	game.init();

	// add event listener to Reset button
	document.getElementById("reset_button").addEventListener("click", function() {
		window.location.reload();
	});

	// add event listener to cells
	document.addEventListener("click", function(event) {
		var isBack = (event.target.className == "back");
		var isHidden = (event.target.parentElement.className == "hidden-cell");
		var isSelected = (event.target.parentElement.className == "selected-cell")
		if (isBack && !(isSelected || isHidden)) {
			turnOver(event.target);
			if (game.selectedCells.length == 0) {
				game.selectedCells.push(event.target);
			} else if (game.selectedCells.length == 1) {
				var oldEventTarget = game.selectedCells[0];
				if (event.target.style.color == oldEventTarget.style.color) {
					setTimeout(function() {
						hide(event.target);
						hide(oldEventTarget);
					}, 1200);
					game.nPairsFound++;
				} else {
					setTimeout(function() {
						turnOver(event.target);
						turnOver(oldEventTarget);
					}, 1200);
				}
				game.nTurns++;
				game.updateCounter();
				game.selectedCells = [];
			}
		}
		if (game.nPairsFound == 8) {
			setTimeout(function() {
				alert("Congratulations!!! You won in " + game.nTurns + " turns.");
				window.location.reload();
			}, 1400);
		}
	});
};

// utility functions
function turnOver(targetCell) {
	targetCell.parentElement.classList.toggle("selected-cell");
};

function hide(targetCell) {
	targetCell.parentElement.classList.toggle("hidden-cell");
	setTimeout(function() {
						
		targetCell.style.display = "none";
	}, 1400);
};