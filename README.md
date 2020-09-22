# HOpeDefender

HOpeDefender.js, manual & simple client side security program written in javascript. This program is a free and open source program.

## Sanitizing & filtering

This is the different of sanitizing and filtering

```text
Sanitizing : <img src=x onerror=alert(1)> -- becomes --> <img src=x>
```

```text
Filtering : <img src=x onerror=alert(1)> -- becomes --> &lt;img src=x onerror=alert(1)&gt;
```

## Features of HOpeDefender.js

   HOpeDefender.js has 2 main features which are sanitizing and filtering inputs to prevent XSS

## Usage

   You can look at the examples about how to use this program in 'samples' folder

## Documentation

   Look at my [wiki](https://github.com/haroldHH/HOpeDefender/wiki) for the documentation of this project

## NOTE

   * When you are testing the files in 'samples' folder, make sure to change the path of 'HOpeDefender.js' in the script tag
   * This program only works by using a browser that supports DOMParser API
   * Look at the comment in HOpeDefender.js for more information

## Versions

   Click [here](https://github.com/haroldHH/HOpeDefender/blob/master/VERSIONS.md) to check te versions' description

## Releases

   Click [here](https://github.com/haroldHH/HOpeDefender/releases) to check the releases

## License

   [MIT License](https://github.com/haroldHH/HOpeDefender/blob/master/LICENSE.txt)