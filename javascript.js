var state = "default";
var playerChoice;
var computerChoice;
var pPoint = 0;
var cPoint = 0;
var winnerName;
var savedPicture = 1;
var selectedPicture = 1;
var userName = "Játékos";

function convert(x){
	return (x * 2) - 2;
}

function choice(item){
	if(state == "default"){
		state = "game";
		computerChoice = Math.floor(Math.random() * 3);
		playerChoice = item;
		winner();
		draw();
		if((pPoint > 0 || cPoint > 0))
			document.getElementById("reset").style.display = "flex";
	}
}

function draw(){
	document.getElementById("itemButtons").style.opacity = 0.15;
	document.images.playerValue.src = "img/" + playerChoice + ".png";
	document.getElementById("playerValue").style.display = "initial";
	document.getElementById("result").style.display = "initial";
	document.images.computerValue.src = "img/" + computerChoice + ".png";
	document.getElementById("computerValue").style.display = "initial";
	document.getElementById("playerPoint").innerText = pPoint;
	document.getElementById("computerPoint").innerText = cPoint;
	document.getElementById("name").innerText = winnerName.toUpperCase();
}

function winner(){
	if(playerChoice != computerChoice){
		winnerName = "Nyertes:\n";
		if((!playerChoice && computerChoice == 2) || (playerChoice - computerChoice == 1)){
			pPoint++;
			winnerName += userName;
		}
		else{
			cPoint++;
			winnerName += "számítógép";
		}
	}
	else
		winnerName = "Döntetlen";
}

function reset(){
	setTimeout(() => {
		document.getElementById("result").style.display = "none";
		document.getElementById("playerValue").style.display = "none";
		document.getElementById("computerValue").style.display = "none";
		document.getElementById("itemButtons").style.opacity = 1;
		state = "default";
	}, 100);
}

function newGame(){
	reset();
	pPoint = 0;
	cPoint = 0;
	document.getElementById("playerPoint").innerText = pPoint;
	document.getElementById("computerPoint").innerText = cPoint;
	document.getElementById("reset").style.display = "none";
}

function mark(item){
	item.style.border = "3px solid #ffea00";
	item.style.margin = "5px";
}

function deselect(item){
	item.style.border = "none";
	item.style.margin = "8px";
}

function openSettingsPanel() {
	document.getElementById("dark-bg").style.display = "flex";
	document.getElementById("transparent-bg").style.display = "flex";
	document.getElementById("settingsPanel").style.display = "flex";
	mark(document.getElementById("profileImages").getElementsByTagName("*")[convert(savedPicture)]);
	document.getElementById("nameInput").value = userName;
	document.getElementById("nameInput").focus();
}

function choosePicture(n){
	var pictures = document.getElementById("profileImages").getElementsByTagName("*");
	mark(pictures[convert(n)]);
	deselect(pictures[convert(selectedPicture)]);
	selectedPicture = n;
}

function save(){
	savedPicture = selectedPicture;
	if(document.getElementById("nameInput").value){
		userName = document.getElementById("nameInput").value;
		document.getElementById("playerName").innerText = userName;
	}
	closeSettingsPanel();
	document.images.playerAvatar.src = "img/profilePictures/" + savedPicture + ".jpg";
}

function closeSettingsPanel() {
	if(savedPicture != selectedPicture){
		deselect(document.getElementById("profileImages").getElementsByTagName("*")[convert(selectedPicture)]);
		selectedPicture = savedPicture;
	}
	document.getElementById("dark-bg").style.display = "none";
	document.getElementById("transparent-bg").style.display = "none";
	document.getElementById("settingsPanel").style.display = "none";
}