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
        <script src='HOpeDefender.js'></script>
	</head>
	<body>
		<table align="center" style="text-align: center;">
			<form method="GET" action="">
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
						<input type="text" name="data1" size="140"><br>
					</td>
				</tr>
				<tr>
					<td>
						Filter : 
					</td>
					<td>
						<input type="text" name="data2" size="140"><br>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<!-- For submitting the form, you an event or other tricks -->
						<!-- The point is you need to sanitize the data first in client side, then submit the data to the server -->
						<br><input type="submit" value="TEST">
					</td>
				</tr>
			</form>
        </table><br><br>
        <div id="result1"></div><br>
        <div id="result2"></div>
		<?php
			if (isset($_GET['data1']) or isset($_GET['data2'])){
                // To prevent XSS via javascript context, you need to filter ' character
                $data1 = str_replace("'", "\"", $_GET['data1']);
                $data2 = str_replace("'", "\"", $_GET['data1']);
                print "
            <!-- You can add the script below to make sure that the client runs / has the HOpeDefender.js file to prevent SELF XSS -->
            <script>
                if (!HOpeDefender_is_present){
                    // You can change this alert with anything you want
                    alert('[-] HOpeDefender.js not found');
                }
            </script>
            <script>
                // Create a new object
				var code_ = new HOpeDefender();
				// Run the features
				var a = code_.sanitize('".$data1."', 'BLOCK_JAVASCRIPT', false);  // Make sure for block type is a string
				var b = code_.filter('".$data2."');
				/*
				 * Print all the results to the div tags
				 *
				 */
				document.getElementById('result1').innerHTML = a;
				document.getElementById('result2').innerHTML = b;
            </script>";
			}
		?>
	</body>
</html>