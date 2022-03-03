var thing_backup = null;
var thing_text = document.getElementById("change_me");
var thing_button = document.getElementById("change_button");

var burger_backup = null;
var burger_button = document.getElementById("burger_button");
var burger_text = document.getElementById("burger_joint");

/* Rotating text messages */
function doThing() {
	thing_text.innerHTML = '&bull; I mean, you <span class="highlight"><b><i>do</i></b></span> see the difficulty in debugging such a function, right?';
	thing_button.innerHTML = 'click me <span class="highlight">MORE</span>';
	doThing = function() {
		thing_text.innerHTML = '&bull; Literally <i>anything</i> could happen! Just keep clicking that button and see what happens!';
		doThing = function() {
			thing_text.innerHTML = '&bull; We could go for miles and miles over here...';
			doThing = function() {
				thing_text.innerHTML = '&bull; Only to come right back around!';
				doThing = thing_backup;
}}}} thing_backup = doThing;

/* Order a burger */
function getBurger() {
	burger_text.innerHTML = "<p>&bull; Oh goodie, you <i>do</i> want a burger! It should be ready in a minute or so. I <b>PROMISE</b> you'll get one!</p>";
	setTimeout(() => {
		burger_text.innerHTML = "<p>&bull; Hold, on. It's taking a little longer than usual...</p>";
		setTimeout(() => {
			burger_text.innerHTML = "<p>&bull; Almost there...</p>";
			setTimeout(() => {
				burger_text.innerHTML = '<p>&bull; Got it! Here you go. Want another?</p><img alt="B01G3R" src="burger.jpg"></img>';
				burger_button.innerHTML = "Order";
				getBurger = burger_backup;
	}, 5000); }, 10000); }, 60000);

	/* Change our button if the user gets impatient */
	getBurger = function() {
		burger_button.innerHTML = "Please wait.";
		getBurger = function() {
			burger_button.innerHTML = "I said wait!";
			getBurger = function() {
				burger_button.innerHTML = '<span class="highlight">WAIT!</span>';
				getBurger = function() {
					burger_button.innerHTML = '<u><b><span class="highlight">WAIT!!!</span></b></u>';
}}}}} burger_backup = getBurger;
