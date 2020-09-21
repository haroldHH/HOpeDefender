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
	<head>
		<title>
			Test for automated HOpeDefender.js
		</title>
		<!-- Make sure to insert the HOpeDefender.js inside "head" tag -->
		<script src="HOpeDefender.js"></script>
	</head>
	<body>
		<table align="center" style="text-align: center;">
			<form method="GET" action="" id="HOpeDefenderForm">
				<tr>
					<td colspan="2">
						<br><h1><b>Testing page for automated HOpeDefender.js</b></h1><br>
					</td>
				</tr>
				<tr>
					<td>
						Sanitize : 
					</td>
					<td>
						<input type="text" class="inputSanitize" name="data1" size="140"><br>
					</td>
				</tr>
				<tr>
					<td>
						Filter : 
					</td>
					<td>
						<input type="text" class="inputFilter" name="data2" size="140"><br>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<br><input type="submit" value="TEST" id="submitForm">
					</td>
				</tr>
			</form>
		</table><br><br>
		<?php
			if (isset($_GET['data1']) or isset($_GET['data2'])){
				print "<div>".$_GET['data1']."</div><br>\n";
				print "<div>".$_GET['data2']."</div><br>\n";
			}
		?>
		<!-- You can add the script below to make sure that the client runs / has the HOpeDefender.js file to prevent SELF XSS -->
		<script>
			if (!HOpeDefender_is_present){
				// You can change this alert with anything you want
				alert("[-] HOpeDefender.js not found");
			}
		</script>
		<!-- Make sure automate.js always at the bottom of the body -->
		<script src="automate.js"></script>
	</body>
</html>