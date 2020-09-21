# HOpeDefender

HOpeDefender.js, manual client side security program with javascript. This is a free and open source program.

## Sanitizing & filtering

This is the different of sanitizing and filtering

```text
Sanitizing : <img src=x onerror=alert(1)> -- becomes --> <img src=x>
```

```text
Filtering : <img src=x onerror=alert(1)> -- becomes --> &lt;img src=x onerror=alert(1)&gt;
```

## Features of HOpeDefender.js

HOpeDefender has 2 main features which are sanitizing and filtering inputs to prevent XSS

## Usage

You can look at the examples about how to use this program in 'samples' folder

## NOTE

* When you are testing the files in 'samples' folder, make sure to change the path of 'HOpeDefender.js' in the script tag
* This program only works by using a browser that supports DOMParser API
* Look at the comment in HOpeDefender.js for more information

## Version 0.0.1
In version 0.0.1, this program provides basic sanitizer / filter & filter which is framework's gadget filter.

## License

MIT License