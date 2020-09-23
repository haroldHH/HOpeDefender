/*
 * [ Sorry for my bad english because english is not my native ]
 * 
 * Program : automate.js, a javascript file to automate HOpeDefender functions / features
 *
 * Author : Harold H.
 *
 * Version : 0.1.0
 * 
 * License : https://github.com/haroldHH/HOpeDefender/blob/master/LICENSE.txt
 *
 * Usage : There are 2 classes and 2 ids for this automated tools, which are => inputSanitize, inputFilter, submitForm, HCSSForm. HTML tags that have class name 'inputSanitize'
 *         will be sanitized using HOpeDefender.sanitize() before submitting the request. HTML tags that have class name 'inputFilter' will be filtered using HOpeDefender.filter()
 *         before submitting the request. For submitting the request, the specific button / tag for submition use 'submitForm' for the id atrribute ( only allowed 1 submit button
 *         ). For the specific form to be sanitized / filtered, use 'HOpeDefenderForm' for the id attribute.
 *
 * NOTE : This program only works for 1 form and 1 submit button in each page, but you can use inputSanitize and inputFilter more than 1
 *
 */

function run(){
	// Create a HOpeDefender object
	var tool_ = new HOpeDefender();
	// Sanitize all inputSanitize elements
	var total_sanitize = document.getElementsByClassName('inputSanitize').length;
	for (var i=0; i<total_sanitize; i++) {
		document.getElementsByClassName('inputSanitize')[i].value = tool_.sanitize(document.getElementsByClassName('inputSanitize')[i].value, "BLOCK_JAVASCRIPT", false);
	}
	// Filter all inputFilter elements
	var total_filter = document.getElementsByClassName('inputFilter').length;
	for (var i=0; i<total_filter; i++) {
		document.getElementsByClassName('inputFilter')[i].value = tool_.filter(document.getElementsByClassName('inputFilter')[i].value);
	}
	// Submit the form
	document.getElementById('HOpeDefenderForm').submit();
}

document.getElementById('submitForm').addEventListener("click", run);