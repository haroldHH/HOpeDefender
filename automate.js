/*

MIT License

Copyright (c) 2020 Harold H.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

/*
 * [ Sorry for my bad english because english is not my native ]
 * 
 * Program : automate.js, a javascript file to automate HOpeDefender functions / features
 *
 * Author : Harold H.
 *
 * Version : 0.1.0
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