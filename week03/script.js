// The order matters here, and this may report false positives for unlisted browsers.
function getBrowser() {
  let sBrowser, sUsrAg = navigator.userAgent;
  if (sUsrAg.indexOf("Firefox") > -1) {
    sBrowser = "Mozilla Firefox";
    // "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:61.0) Gecko/20100101 Firefox/61.0"
  } else if (sUsrAg.indexOf("SamsungBrowser") > -1) {
    sBrowser = "Samsung Internet";
    // "Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36
  } else if (sUsrAg.indexOf("Opera") > -1 || sUsrAg.indexOf("OPR") > -1) {
    sBrowser = "Opera";
    // "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.106"
  } else if (sUsrAg.indexOf("Trident") > -1) {
    sBrowser = "Microsoft Internet Explorer";
    // "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; Zoom 3.6.0; wbx 1.0.0; rv:11.0) like Gecko"
  } else if (sUsrAg.indexOf("Edge") > -1) {
    sBrowser = "Microsoft Edge (Legacy)";
    // "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299"
  } else if (sUsrAg.indexOf("Edg") > -1) {
    sBrowser = "Microsoft Edge (Chromium)";
    // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.64
  } else if (sUsrAg.indexOf("Chrome") > -1) {
    sBrowser = "Google Chrome or Chromium";
    // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/66.0.3359.181 Chrome/66.0.3359.181 Safari/537.36"
  } else if (sUsrAg.indexOf("Safari") > -1) {
    sBrowser = "Apple Safari";
    // "Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1 980x1306"
  } else {
    sBrowser = "unknown";
  }

  return sBrowser;
}

/* Destroys the page with document.write() and then mercilessly mocks the user */
function destroyPage() {
	document.write('<link rel="stylesheet" type="text/css" href="style.css"/><p>Welp, you called document.write() on an already loaded page. Look what you got yourself into!</p><a class="button" onclick="document.getElementById(\'merciless-response\').style.display = \'inline\'">Help me!!</a><br><br><p id="merciless-response" hidden>Then refresh the page! You got yourself into this mess, not me.</p>');
}

/* Returns the number of loads from a cookie, incrementing the cookie by 1 */
function updateLoads() {
	let loads = 0;

	if (document.cookie != "") {
		loads = parseInt(document.cookie.substring(2));
	}
	
	document.cookie = "i=" + (loads + 1);
	return loads + 1;
}

/* An annoying function that makes a few popups */
function gimmePopup() {
	let response = ""

	alert("Do you like popups? You DO?? Well, then I guess you're going to love this...");
	if (confirm("Prepare for the ULTIMATE popup...") == true) {
		response = "Hmm, you said \"" + prompt("What do you think of THIS?!", "I LOVE IT!!!") + "\"; I agree!"
	} else {
		response = prompt("You CANCELED! Please type here, explaining why you canceled.", "Your app sucks!")
		if (response == "" || response == null) {
			response = "Ohoho! Looks like somebody may have a popup blocker."
		} else {
			response = "\"" + response + "\" Hmph! If you say so."
		}
	}
	
	document.getElementById("popup-response").innerHTML = response;
}

/* Functions that are run after the page has finished loading */
function init() {
	// Detect browser info
	document.getElementById("browser-header").innerHTML = 'Your browser tells me you are browsing <a href="' + window.location.href + '">' + window.location.href + '</a> using ' + getBrowser() + '.';
	
	// Determine how many times the page was loaded this session
	let loads = updateLoads();
	if (loads == 1) {
		document.getElementById("page-loads").innerHTML = 'You loaded this page ' + loads + ' time this session. (Notice how it only works on a server; if you run this file locally, it will not work!)';
	} else {
		document.getElementById("page-loads").innerHTML = 'You loaded this page ' + loads + ' times this session. (Notice how it only works on a server; if you run this file locally, it will not work!)';
	}
}

window.onload = init;
