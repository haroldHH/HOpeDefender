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
 * Program : HOpeDefender.js, manual client side security program with javascript
 *
 * Author : Harold H.
 *
 * Version : 0.0.1
 * 
 * FAQ / Q&A  :  1. How it works? - For sanitizer, this program will create a DOMParser class, traverse all the html tags and remove dangerous tags & attributes
 *                                - For filter, this program will encode the input with HTML entities by using a textarea element
 *
 *               2. Why i'm using DOMParser? DOMParser interprets the input as a real document ( in an environment that allows javascript but doesn't
 *                  execute javascript on the active window / web page. If you put a script tag inside DOMParser, DOMParser can parse / use / access the
 *                  script tag but doesn't run / execute it ).
 *
 *               3. Why this program called manual client side security program? Because you dont need to install any 3rd party libraries to run this program.
 *                  Just run it manually using a script tag in your html code and this program was written by me manually.
 *
 *               4. Does this program works 100% safely? No, maybe there are bugs in the parser because of some inputs ( eg: mutation XSS, and etc. )
 *                  or even bugs on the source code.
 *
 *               5. The main goal of this program? This program mainly created by me to share some knowledges to other programmers about javascript,
 *                  parser, and how sanitizing / filtering works.
 *
 *               6. How many features in this program? There are 3 features which are sanitization, sandboxed sanitization, and filterization.
 *
 *               7. Advantages of this program? - You can use / learn this program easily
 *                                              - You can use this program to sanitize / filter the result of an ajax request ( in case of asynchronous request )
 *                                              - This program is really small
 *
 *               8. Disadavantages of this program? - There are bunch of better programs out there for sanitizing / filtering
 *                                                  - This program runs really slow for complex tags / input ( in case of sanitizing, not filtering )
 *
 *
 * NOTE : This program works for client side.
 *
 */

var HOpeDefender_is_present = true;

/*
 * NOTE : Look at test.html / test.php for how to use this class.
 *
 */
class HOpeDefender{

	constructor(){
		/*
		 * These are the whitelisted tags and attributes.
		 *
		 * NOTE : You can edit the whitelists for your own purposes.
		 *
		 */
		this.valid_attributes = ["style", "src", "href", "name", "id", "class", "title"];
		this.valid_html_tags = [
			"table", "tr", "th", "td", "br", "keyboard", "form","tbody", "h1",
			"input", "div", "span", "b", "u", "s", "p", "img", "a", "li", "ul", "ol"
		];
		/*
		 * These are the blacklisted attributes in some tools / frameworks. for example, bootstrap and etc.
		 * These blacklists used to mitigates XSS via gadgets from the tools / frameworks ( DOM XSS can't be prevented 100% ).
		 * For DOM XSS cases, it depends on the web developer.
		 *
		 * NOTE : You can edit these blacklists for your own purposes.
		 * 
		 */
		this.invalid_bootstrap_bootstrap = ["data-toogle", "data-html"];
		this.invalid_attributes_angularjs = ["ng-app"];
	}
	/*
	 * Call this function to filter / encode your input with htmlentities
	 *
	 */
	filter(data){
		// Create a textarea element
		var ccdd = document.createElement('textarea');
		// Encode the data with htmlentities using textarea
		ccdd.innerHTML = data;
		// Return the encoded data ( text )
		return ccdd.innerHTML;
	}
	/*
	 * Call this function to sanitize your input ( This function will return the sanitized version of your input )
	 *
	 * NOTE : There 4 types of scheme configuration => - BLOCK_JAVASCRIPT, to block javascript uri in href attribute
	 *                                                 - FORCE_HTTP, force the uri scheme in href attribute to be http ( by appending 'http://' at the start of href )
	 *                                                 - FORCE_HTTPS, force the uri scheme in href attribute to be https
	 *                                                 - FORCE_FTP, force the uri scheme in href attribute to be ftp
	 */
	sanitize(data, scheme_configuration, check_framework_gadget){
		if(check_framework_gadget == false){
			this.valid_attributes = this.valid_attributes.concat(this.invalid_attributes_angularjs, this.invalid_bootstrap_bootstrap);
		}
		/*
		 * Create a DOMParser class and use html document mode
		 *
		 * NOTE : The reason why I use DOMParser is DOMParser automatically removes invalid / error tags. For example : <scr<b>Hello</b>ipt>alert(1)</script>
		 *        will be removed because the script tag is invalid eventhough the bold tag is valid.
		 *
		 */
		var b = new DOMParser().parseFromString(data, "text/html");
		var flag1 = false;
		var total_child1 = b.body.childElementCount;
		var aaa = 0;
		while(aaa<total_child1){
			if(flag1 == true){
					aaa -= 1;
					total_child1 -= 1;
					flag1 = false;
			}else{
				if(!this.valid_html_tags.includes(b.body.children[aaa].tagName.toLowerCase())){
					b.body.removeChild(b.body.children[aaa]);
					flag1 = true;
					aaa += 1;
				}else{
					var c = b.body.children[aaa].getAttributeNames();
					for(var j=0; j<c.length; j++){
						if(!this.valid_attributes.includes(c[j].toLowerCase())){
							b.body.children[aaa].removeAttribute(c[j].toLowerCase());
						}
						if(c[j].toLowerCase() == "href"){
							if (scheme_configuration != ""){
								var xxyy = b.body.children[aaa].href;
								xxyy = this.blockType(xxyy, scheme_configuration);
								b.body.children[aaa].href = xxyy;
							}
						}
						if(check_framework_gadget != false){
							var yyzz = this.checkFrameworkGadget(c[j].toLowerCase());
							if(yyzz == false){
								b.body.children[aaa].removeAttribute(c[j].toLowerCase());
							}
						}
					}
					// If there are children inside the tags, traverse all the children and sanitize them
					if(b.body.children[aaa].childElementCount !== 0){
						for(var o=0; o<total_child1; o++){
							this.recursiveChildSanitize(b.body.children[o], scheme_configuration);
						}
					}
					aaa += 1;
				}
			}
		}
		return b.body.innerHTML;
	}
	/*
	 * Call this function to sanitize your input and sandboxing it inside an iframe
	 *
	 * NOTE : You are just allowed to style the iframe, not your input.
	 *
	 */
	sandboxedSanitizing(data, scheme_configuration, css_styling){
		// Sanitize the data / input
		if (scheme_configuration != "") {
	 		var aabb = this.sanitize(data, scheme_configuration);
	 	}else{
	 		var aabb = this.sanitize(data);
	 	}
	 	// Create an iframe
	 	var bbcc = document.createElement('iframe');
	 	// Enable sandboxing
	 	bbcc.sandbox = "";
	 	// css_styling the iframe
	 	bbcc.style = css_styling;
	 	// Put the sanitized code inside the sandboxed iframe
	 	bbcc.srcdoc = aabb;
	 	// Return the sandboxed iframe that contains the sanitized data ( object )
	 	return bbcc;
	 }

	/*
	 * DO NOT CHANGE / MODIFY THESE FUNCTIONS BELOW IF YOU DONT KNOW HOW THEY WORKS AND HOW TO MODIFY THEM
	 *
	 */

	/*
	 * This function will traverse all tags and remove invalid tags and attributes
	 *
	 */
	recursiveChildSanitize(parentObject, scheme_configuration, check_framework_gadget){
		// Base case ( If there is no child )
		if(parentObject.childElementCount == 0){
			// Remove all invalid attributes
			var aa = parentObject.getAttributeNames();
			for(var jj=0; jj<aa.length; jj++){
				// Remove the invalid attributes
				if(!this.valid_attributes.includes(aa[jj].toLowerCase())){
					parentObject.removeAttribute(aa[jj].toLowerCase());
				}
				// Manage the block type for href attribute
				if(aa[jj].toLowerCase() == "href"){
					if (scheme_configuration != "") {
						var xxyy = parentObject.href;
						xxyy = this.blockType(xxyy, scheme_configuration);
						parentObject.href = xxyy;
					}
				}
				// Check some frameworks' gadgets and remove them
				if(check_framework_gadget != false){
					var zzaa = this.checkFrameworkGadget(aa[jj]);
					if(zzaa == false){
						parentObject.removeAttribute(aa[jj]);
					}
				}
			}
			return;
		}else{
			var flag = false;
			var total_child = parentObject.childElementCount;
			var aa = 0;
			while(aa<total_child){
				if(flag == true){
					aa -= 1;
					total_child -= 1;
					flag = false;
				}else{
					// Remove all invalid children
					if(!this.valid_html_tags.includes(parentObject.children[aa].tagName.toLowerCase())){
						parentObject.removeChild(parentObject.children[aa]);
						flag = true;
						aa += 1;
					}else{
						// Remove all the children's invalid attributes
						var p = parentObject.children[aa].getAttributeNames();
						for(var q=0; q<p.length; q++){
							if(!this.valid_attributes.includes(p[q].toLowerCase())){
								parentObject.children[aa].removeAttribute(p[q].toLowerCase());
							}
							if(p[q].toLowerCase() == "href"){
								if (scheme_configuration != "") {
									var xxyy = parentObject.children[aa].href;
									xxyy = this.blockType(xxyy, scheme_configuration);
									parentObject.children[aa].href = xxyy;
								}
							}
							if(check_framework_gadget != false){
								var yzab = this.checkFrameworkGadget(p[q]);
								if(yzab == false){
									parentObject.children[aa].removeAttribute(p[q]);
								}
							}
						}
						// Traverse all the children
						if(parentObject.children[aa].childElementCount !== 0){
							this.recursiveChildSanitize(parentObject.children[aa]);
						}
						aa += 1;
					}
				}
			}
		}
	}
	/*
	 * This function will check for invalid gadgets
	 *
	 */
	checkFrameworkGadget(_gadget_name){
		// Remove bootstrap's gadgets
		for (var index=0; index < this.invalid_bootstrap_bootstrap.length; index++){
			if(!this.invalid_bootstrap_bootstrap.includes(_gadget_name)){
				return false;
			}
		}
		// Remove angularjs's gadgets
		for (var index=0; index < this.invalid_attributes_angularjs.length; index++){
			if(!this.invalid_attributes_angularjs.includes(_gadget_name)){
				return false;
			}
		}
	}
	/*
	 * This function will block / force urls
	 *
	 */
	blockType(data, scheme_configuration){
		switch(scheme_configuration){
			case "BLOCK_JAVASCRIPT":
				var jjkk = data;
				jjkk = jjkk.replace(/^javascript(\s)*:(\s)*/, "[blocked]:");
				data = jjkk;
				break;
			case "FORCE_HTTP":
				var jjkk = data;
				jjkk = "http://" + jjkk;
				data = jjkk;
				break;
			case "FORCE_HTTPS":
				var jjkk = data;
				jjkk = "https://" + jjkk;
				data = jjkk;
				break;
			case "FORCE_FTP":
				var jjkk = data;
				jjkk = "ftp://" + jjkk;
				data = jjkk;
		}
		return data;
	}
}