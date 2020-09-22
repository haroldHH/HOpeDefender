<!--

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

-->
<!DOCTYPE html>
	<!--

		test.php and test2.php has a different picture / procedure .

		In test.php, you will send / submit a sanitized request and the server will render your input without any security features .

		In test2.php, you will send / submit an unsanitized request and the server will render your input without any server side
		security features, but in the source code there's a javascript code which runs HOpDefender.js ( this is the client side
		security mechanism and using HOpeDefender.js as the program to do it ) .

		NOTE : If you delete the HOpeDefender.js in test2.php, it's a 'self xss' case.

	-->
	<head>
		<title>
			Test HOpeDefender.js
		</title>
		<!-- Make sure to insert the HOpeDefender.js inside "head" tag -->
		<script src="HOpeDefender.js"></script>
		<!-- Here is the example of all features in HOpeDefender.js -->
		<script>
			function runAllFeatures(){
				// Create a new object
				var code_ = new HOpeDefender();
				// Run the features
				var a = code_.sanitize(document.getElementById("input1").value, "BLOCK_JAVASCRIPT");  // Make sure for scheme configuration is a string
				var b = code_.sanitize(document.getElementById("input2").value, "BLOCK_JAVASCRIPT")
				b = code_.sanitizeValidAtrributes(b);
				var c = code_.filter(document.getElementById("input3").value);
				/*
				 * Print all the results to the div tags
				 *
				 */
				 document.getElementById("input1").value = a;
				 document.getElementById("input2").value = b;
				 document.getElementById("input3").value = c;
				 document.getElementById("myForm").submit();
			}
		</script>
	</head>
	<body>
		<table align="center" style="text-align: center;">
			<form method="GET" action="" id="myForm">
				<tr>
					<td colspan="2">
						<br><h1><b>Testing page for HOpeDefender.js</b></h1><br>
					</td>
				</tr>
				<tr>
					<td>
						Sanitize : 
					</td>
					<td>
						<input type="text" id="input1" name="data1" size="140"><br>
					</td>
				</tr>
				<tr>
					<td>
						Sanitize with valid attribute sanitizer : 
					</td>
					<td>
						<input type="text" id="input2" name="data2" size="140"><br>
					</td>
				</tr>
				<tr>
					<td>
						Filter : 
					</td>
					<td>
						<input type="text" id="input3" name="data3" size="140"><br>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<!-- For submitting the form, you an event or other tricks -->
						<!-- The point is you need to sanitize the data first in client side, then submit the data to the server -->
						<br><input type="submit" value="TEST" onclick="runAllFeatures()">
					</td>
				</tr>
			</form>
		</table><br><br>
		<?php
			if (isset($_GET['data1']) or isset($_GET['data2']) oe isset($_GET['data3'])){
				print "<div>".$_GET['data1']."</div><br>\n";
				print "<div>".$_GET['data2']."</div><br>\n";
				print "<div>".$_GET['data3']."</div><br>\n";
			}
		?>
		<!-- You can add the script below to make sure that the client runs / has the HOpeDefender.js file to prevent SELF XSS -->
		<script>
			if (!HOpeDefender_is_present){
				// You can change this alert with anything you want
				alert("[-] HOpeDefender.js not found");
			}
		</script>
	</body>
</html>