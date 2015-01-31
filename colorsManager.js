/**
 * Created by georgestrajan on 1/31/15.
 */

// returns an array of strings which are in 'rgb(R,G,B)' format
function createColors(numberOfColorsToCreate) {
    var divsColorsArray =
        ['rgb(255,51,0)',
            'rgb(255,153,0)',
            'rgb(102,153,51)',
            'rgb(0,0,204)',
            'rgb(102,0,255)',
            'rgb(255,102,0)',
            'rgb(0,102,51)'];

    var createdColors = [];

    function selectColor() {
        var randomColor = (Math.floor((Math.random() * divsColorsArray.length)));
        return divsColorsArray[randomColor];
    }

    for (var i = 0 ; i < numberOfColorsToCreate ; i++) {

        createdColors[i] = selectColor();

        // we don't want the previous color to be the same
        while (i > 0 && createdColors[i - 1] === createdColors[i]) {
            createdColors[i] = selectColor();
        }
    }

    return createdColors;
};