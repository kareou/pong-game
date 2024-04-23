let board;
let boardWidth = 800;
let boardHeight = 800;
let cntx;

let pwidth = 10;
let pheight = 100;
let veclocityY = 0;
let player1 = {
	score : 0,
	width : pwidth,
	height : pheight,
	x : 10,
	y : (boardHeight / 2) - pheight/2,
	pvelocityY : veclocityY,
}

let player2 = {
	score : 0,
	width : pwidth,
	height : pheight,
	x : boardWidth - pwidth - 10,
	y : (boardHeight / 2) - pheight / 2,
	pvelocityY : veclocityY,
}
var p1score;
var p2score;
let ballradius = 10;
let ball= {
	height : ballradius,
	width : ballradius,
	x : (boardWidth / 2) - (ballradius / 2),
	y : (boardHeight / 2) - (ballradius / 2),
	bVelocityX : 4,
	bVelocityY : 4,
}

window.onload = () => {
	board = document.getElementById("board");
	var modal = document.querySelector(".modal");
	p1score = document.getElementById("p1");
	p2score = document.getElementById("p2");
	board.height = boardHeight;
	board.width = boardWidth;
	cntx = board.getContext("2d");
	cntx.fillStyle = "red";
	cntx.fillRect(player1.x, player1.y, player1.width, player1.height);
	cntx.fillStyle = "white";
	cntx.fillRect(player2.x, player2.y, player2.width, player2.height);
	cntx.fillStyle = "green";
	cntx.beginPath();
	cntx.arc(ball.x, ball.y, ballradius,0, Math.PI * 2, 1);
	cntx.fill();
	cntx.closePath();
	document.addEventListener("keydown",movePlayer);
	document.addEventListener("keyup",(e) => {
		if (e.code == "KeyW" || e.code == "KeyS")
			player1.pvelocityY = 0;
		else if (e.code == "ArrowUp" || e.code == "ArrowDown")
			player2.pvelocityY = 0;
		else{
			modal.style.display = "none";
			requestAnimationFrame(update);
		}
	})
}

const update = () => {
	requestAnimationFrame(update);
	p1score.innerText = player1.score;
	p2score.innerText = player2.score;
	cntx.clearRect(0,0,boardWidth,boardHeight);
	cntx.fillStyle = "red";
	let nextPost1 = player1.y + player1.pvelocityY;
	if (!outOfBound(nextPost1))
		player1.y = nextPost1;
	cntx.fillRect(player1.x, player1.y, player1.width, player1.height);
	cntx.fillStyle = "white";
	let nextPost2 = player2.y + player2.pvelocityY;
	if (!outOfBound(nextPost2))
		player2.y = nextPost2;
	cntx.fillRect(player2.x, player2.y, player2.width, player2.height);
	cntx.fillStyle = "green";
	wallCollision(ball.x,ball.y);
	if (padelCollistion(ball,player1)){
		console.log(ball.x, [player1.x , player1.width]);
		if (ball.x - ballradius <= player1.x + player1.width)
		ball.bVelocityX *= -1;
	}
	else if (padelCollistion(ball,player2)){
		if (ball.x + ball.width >= player2.x)
			ball.bVelocityX *= -1;
	}
	if (marked(ball.x))
		resetAllPos();
	ball.x += ball.bVelocityX;
	ball.y += ball.bVelocityY;
	cntx.beginPath();
	cntx.arc(ball.x, ball.y, ballradius,0, Math.PI * 2, 1);
	cntx.fill();
	cntx.closePath();
}

function marked(x){
	if (x <= 0)
		player2.score += 1;
	if (x >= boardWidth)
		player1.score += 1;
	return (x <= 0 || x >= boardWidth)
}

function resetAllPos(){
	ball.x = (boardWidth / 2) - (ballradius / 2);
	ball.y = (boardHeight / 2) - (ballradius / 2);
	ball.bVelocityX = 2;
	ball.bVelocityY = 2;
	player1.x = 10;
	player1.y = (boardHeight / 2) - pheight/2;
	player2.x = boardWidth - pwidth - 10;
	player2.y = (boardHeight / 2) - pheight / 2;
	player1.pvelocityY = 0;
	player2.pvelocityY = 0;
}

function wallCollision(x,y){
	if (y <= ball.height || y === (boardHeight - ball.height - 1))
		ball.bVelocityY *= -1;
}

function padelCollistion(a,b){
	return a.x + ballradius >= b.x &&
	a.x - ballradius <= b.x + b.width &&
	a.y + ballradius >= b.y &&
	a.y - ballradius <= b.y + b.height;
}

function outOfBound(playery){
	return (playery < 0 || playery + pheight > boardHeight)
}

function movePlayer(e){
	if (e.code == "KeyW")
		player1.pvelocityY = -7;
	else if (e.code == "KeyS")
		player1.pvelocityY = 7;
	if (e.code == "ArrowUp")
		player2.pvelocityY = -7;
	else if (e.code == "ArrowDown")
		player2.pvelocityY = 7;
}
