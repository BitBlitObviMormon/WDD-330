var itemPrices = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00]; // Stores the price of each sale item.
var itemNames = ["", "", "", "", "", "", "", ""] // Stores the name of each sale item
const JSON_ARRAY_SIZE = 43;
const CREDIT_REGEX = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/; // ie. 1234 1234 1234 1234
const PHONE_REGEX = /^\(\d{3}\)\s\d{3}-\d{4}$/; // ie. (123) 456-7890

function loadItems() {
	// Generates an 8 item array of unique numbers ranging from 0 to the last element in the sale item array
	let temp = [];
	while(temp.length < 8) {
		let r = Math.floor(Math.random() * JSON_ARRAY_SIZE);
		if(temp.indexOf(r) === -1) temp.push(r);
	}
	
	// Those items are then used to lookup JSON data for the shop item checklist
	for (let i = 0; i < 8; i++) {
		let r = temp[i];
		itemPrices[i] = items[r].price;
		itemNames[i] = items[r].name;
		document.getElementById("item_label_" + i).innerHTML = items[r].name + (itemPrices[i] == 0.00 ? ": FREE" : ": $" + itemPrices[i].toFixed(2));
	}
}

function displayError(id, error, displayStyle = "inline", focusElement = "") {
	let element = document.getElementById(id);
	element.innerHTML = error;
	element.style.display = displayStyle;
	if (focusElement != "") document.getElementById(focusElement).focus();
}

function getCheckedElements(name) {
	let elements = document.getElementsByName(name);
	return Array.prototype.slice.call(elements).filter(element => element.checked);
}

function parse(id, focusElement = false) {
	// Hide the error message for now
	switch (id) {
		case "first_name":
		case "last_name":
		case "address":
		case "phone":
		case "item_list":
		case "credit_card_list":
		case "credit_card":
		case "exp_date":
			document.getElementById(id + "_error").style.display = "none";
			break;
	}
	
	// Verify that the element is not empty
	switch (id) {
		case "first_name":
		case "last_name":
		case "address":
		case "phone":
		case "credit_card":
		case "exp_date":
			if (document.getElementById(id).value == "") {
				displayError(id + "_error", "Required.", "inline", focusElement ? id : "");
				return false;
			} break;
		case "item_list":
			if (getCheckedElements("item[]").length == 0) {
				displayError(id + "_error", "Required.", "inline", focusElement ? id : "");
				return false;
			} break;
		case "credit_card_list":
			if (getCheckedElements("card").length == 0) {
				displayError(id + "_error", "Required.", "inline", focusElement ? id : "");
				return false;
			} break;
	}	
	
	// Verify that the element has valid data
	switch (id) {
		case "phone":
			if (!PHONE_REGEX.test(document.getElementById(id).value)) {
				displayError(id + "_error", "10 digits are required.", "inline", focusElement ? id : "");
				return false;
			}
			break;
		case "item_list":
			if (document.getElementById("total").innerHTML == "$0.00") {
				displayError(id + "_error", "Items are only free with purchase.", "inline", focusElement ? id : "");
				return false;
			} break;
		case "credit_card":
			if (!CREDIT_REGEX.test(document.getElementById(id).value)) {
				displayError(id + "_error", "16 digits are required.", "inline", focusElement ? id : "");
				return false;
			} break;
		case "first_name":
		case "last_name":
		case "address":
		case "exp_date":
		case "credit_card_list":
			return true;
		default: // It's an unknown id, of course it's invalid!
			return false;
	}
	
	// My my, how did we get here??
	return true;
}

// Elements are addressed bottom-to-top so that the top-down offenders end up focused.
function validate() {
	let validated = true;
	validated = parse("exp_date", true) ? validated : false;
	validated = parse("credit_card", true) ? validated : false;
	validated = parse("credit_card_list", true) ? validated : false;
	validated = parse("item_list", true) ? validated : false;
	validated = parse("phone", true) ? validated : false;
	validated = parse("address", true) ? validated : false;
	validated = parse("last_name", true) ? validated : false;
	validated = parse("first_name", true) ? validated : false;
	
	return validated;
}

function clearErrors() {
	document.getElementById("first_name_error").style.display = "none";
	document.getElementById("last_name_error").style.display = "none";
	document.getElementById("address_error").style.display = "none";
	document.getElementById("phone_error").style.display = "none";
	document.getElementById("item_list_error").style.display = "none";
	document.getElementById("credit_card_list_error").style.display = "none";
	document.getElementById("credit_card_error").style.display = "none";
	document.getElementById("exp_date_error").style.display = "none";
}

// Finishes resetting the form
// setTimeout() is used for executing after the form resets and not before.
function finishReset() {
	setTimeout(function() {
		tallyTotal();
		clearErrors();
	}, 0);
}

// Taken from https://stackoverflow.com/questions/512528/set-keyboard-caret-position-in-html-textbox,
// courtesy to Ta01 who authored this function.
function setCaretPosition(elemId, caretPos) {
    let elem = document.getElementById(elemId);

    if(elem != null) {
        if(elem.createTextRange) {
            let range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}

function managePhoneInput() {
	let phoneNumber = document.getElementById("phone").value.replaceAll(/\D/g, "");
	let newPhone = "";
	
	if (!phoneNumber.length) {
		document.getElementById("phone").value = "";
		return;
	}
	
	// First segment (525)
	if (phoneNumber.length > 3) {
		newPhone += "(" + phoneNumber.substring(0, 3) + ") ";
		phoneNumber = phoneNumber.slice(3);
	} else {
		document.getElementById("phone").value = "(" + phoneNumber.padStart(3, ' ') + ")    -    ";
		setCaretPosition("phone", 4);
		return;
	}
	
	// Second segment (525) 555
	if (phoneNumber.length > 3) {
		newPhone += phoneNumber.substring(0, 3) + "-";
		phoneNumber = phoneNumber.slice(3);	
	} else {
		document.getElementById("phone").value = newPhone + phoneNumber.padStart(3, ' ') + "-    ";
		setCaretPosition("phone", 9);
		return;
	}
	
	// Third segment (525) 555-1234
	if (phoneNumber.length > 4) {
		document.getElementById("phone").value = newPhone + phoneNumber.substring(0, 4);
	} else {
		document.getElementById("phone").value = newPhone + phoneNumber.padStart(4, ' ');
		setCaretPosition("phone", 14);
		return;
	}
}

function manageCreditInput() {
	let creditNumber = document.getElementById("credit_card").value.replaceAll(/\D/g, "");
	let newCredit = "";

	if (!creditNumber.length) {
		document.getElementById("credit_card").value = "";
		return;
	}
	
	for (let i = 0; i < 4; i++) {
		if (creditNumber.length > 4) {
			newCredit += creditNumber.substring(0, 4) + (i == 3 ? "" : " ");
			creditNumber = creditNumber.slice(4);
		} else {
			document.getElementById("credit_card").value = newCredit + creditNumber.padStart(4, ' ');
			setCaretPosition("credit_card", (i + 1) * 5);
			return;
		}
	}
	
	document.getElementById("credit_card").value = newCredit.substring(0, 19);
}

function submitPayment() {
	if (validate() == true) {
		let i = 0; let j = 0;
		for(let v of document.getElementsByName("item[]")) {
			if (v.checked) {
				// Export the item name and prices as POST data
				nameElement = document.createElement("input");
				nameElement.setAttribute("type", "hidden");
				nameElement.setAttribute("name", "item_name[" + i + "]");
				nameElement.setAttribute("value", itemNames[j]);
				priceElement = document.createElement("input");
				priceElement.setAttribute("type", "hidden");
				priceElement.setAttribute("name", "item_price[" + i + "]");
				priceElement.setAttribute("value", itemPrices[j].toFixed(2));
				document.getElementById("credit_form").appendChild(nameElement);
				document.getElementById("credit_form").appendChild(priceElement);
				i++;
			}
			j++;
		}
		document.getElementById("credit_form").submit();
	}
}

function tallyTotal() {
	let checkboxes = document.getElementsByName("item[]");
	let sum = 0.00;
	for (let i = 0; i < 8; i++) {
		if (checkboxes[i].checked) {
			sum += itemPrices[i];
		}
	}
	
	document.getElementById("total").innerHTML = "$" + sum.toFixed(2);
}