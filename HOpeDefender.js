/*
 *
 * Program : HOpeDefender.js, manual client side security program with javascript
 *
 * Author : Harold H.
 *
 * Version : 0.1.0
 * 
 * License : https://github.com/haroldHH/HOpeDefender/blob/master/LICENSE.txt
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
			"h1", "h2", "h3", "h4", "h5", "h6", "hr", "br", "textarea",
			"div", "span", "b", "u", "s", "p", "img", "a", "li", "ul", "ol"
		];
	}
	/*
	 * Call this method to filter / encode your input with htmlentities
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
	 * Call this method to sanitize your input ( This function will return the sanitized version of your input )
	 *
	 * NOTE : There 5 types of scheme configuration => - BLOCK_JAVASCRIPT, block javascript scheme in href attribute
	 *                                                 - FORCE_HTTP, force a http scheme in href attribute to be http ( by appending 'http://' at the start of href )
	 *                                                 - FORCE_HTTPS, force a https scheme in href attribute to be https
	 *                                                 - FORCE_FTP, force a ftp scheme in href attribute to be ftp
	 *                                                 - BLOCK_FTP, block ftp scheme in href attribute
	 */
	sanitize(data, scheme_configuration){
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
						}else{
							// Manage the scheme configuration for href attribute
							if(c[j].toLowerCase() == "href"){
								if (scheme_configuration != ""){
									var xxyy = b.body.children[aaa].href;
									xxyy = this.blockType(xxyy, scheme_configuration);
									b.body.children[aaa].href = xxyy;
								}
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
	 		var aabb = this.sanitize(data, scheme_configuration, "", false, false);
	 	}else{
	 		var aabb = this.sanitize(data, "", "", false, false);
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
	  * Call this function to sanitize your valid attributes' value
	  *
	  * NOTE : It's better to run sanitize() then run this method, because this method
	  * 
	  */
	sanitizeValidAttributes(data){
		var _bb = new DOMParser().parseFromString(data, "text/html");
		var _total_child = _bb.body.childElementCount;
		for (var index=0; index<_total_child; index++) {
			if(_bb.body.children[index].childElementCount >= 0){
				this.recursiveChildSanitizeValidAttribute(_bb.body.children[index]);
			}
		}
		return _bb.body.innerHTML;
	}
	/*
	 * DO NOT CHANGE / MODIFY THESE METHODS BELOW IF YOU DONT KNOW HOW THEY WORKS AND HOW TO MODIFY THEM
	 *
	 */

	/*
	 * This method will traverse all tags and remove invalid tags and attributes
	 *
	 */
	recursiveChildSanitize(parentObject, scheme_configuratio){
		// Base case ( If there is no child )
		if(parentObject.childElementCount == 0){
			var aa = parentObject.getAttributeNames();
			for(var jj=0; jj<aa.length; jj++){
				if(!this.valid_attributes.includes(aa[jj].toLowerCase())){
					parentObject.removeAttribute(aa[jj].toLowerCase());
				}else{
					if(aa[jj].toLowerCase() == "href"){
						if (scheme_configuration != "") {
							var xxyy = parentObject.href;
							xxyy = this.blockType(xxyy, scheme_configuration);
							parentObject.href = xxyy;
						}
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
					if(!this.valid_html_tags.includes(parentObject.children[aa].tagName.toLowerCase())){
						parentObject.removeChild(parentObject.children[aa]);
						flag = true;
						aa += 1;
					}else{
						var p = parentObject.children[aa].getAttributeNames();
						for(var q=0; q<p.length; q++){
							if(!this.valid_attributes.includes(p[q].toLowerCase())){
								parentObject.children[aa].removeAttribute(p[q].toLowerCase());
							}else{
								if(p[q].toLowerCase() == "href"){
									if (scheme_configuration != "") {
										var xxyy = parentObject.children[aa].href;
										xxyy = this.blockType(xxyy, scheme_configuration);
										parentObject.children[aa].href = xxyy;
									}
								}
							}
						}
						// Traverse all the children
						if(parentObject.children[aa].childElementCount !== 0){
							this.recursiveChildSanitize(parentObject.children[aa], scheme_configuration, check_framework_gadget);
						}
						aa += 1;
					}
				}
			}
		}
	}
	/*
	 * This method will traverse all tags and sanitize the valid attributes' value
	 * 
	 */
	recursiveChildSanitizeValidAttribute(parentObject){
		if(parentObject.childElementCount == 0){
			var _aa = parentObject.getAttributeNames();
			for(var index=0; index<_aa.length; index++){
				var attr_name = _aa[index].valueOf();
				parentObject.setAttribute(attr_name, this.sanitize(parentObject.getAttribute(attr_name), "", false));
			}
			return;
		}else{
			var _aa = parentObject.getAttributeNames();
			for(var index=0; index<_aa.length; index++){
				var attr_name = _aa[index].valueOf();
				parentObject.setAttribute(attr_name, this.sanitize(parentObject.getAttribute(attr_name), "", false));
			}
			for(var _index=0; _index<parentObject.childElementCount; _index++){
				this.recursiveChildSanitizeValidAttribute(parentObject.children[_index]);
			}
		}
	}
	/*
	 * This method will block / force schemes
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
			case "BLOCK_FTP":
				var jjkk = data;
				jjkk = jjkk.replace(/^ftp(\s)*:(\s)*/, "[blocked]:");
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

// Look at your console and find this message below
console.log("[+] HOpeDefender.js version 0.1.0 is available");