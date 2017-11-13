// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

//Define global variables
let gridzoom, gridheight, gridwidth, colIndex, rowIndex, pxcolor;
let x, y, bg;
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
//Create the makeGrid function
function makeGrid() {
    //for next loops to draw the rows and colums in the table
    for (y = 0; y < gridheight; y++) {
        $('#pixel_canvas').append('<tr>');
        for (x = 0; x < gridwidth; x++) {
            $('#pixel_canvas > tr').last().append('<td>');
        }
    }
    //Create canvas to draw preview in and fill it with the background color
    $('#myCanvas').attr('width', gridwidth).attr('height', gridheight);
    pxcolor = document.getElementById("colorPicker").value;
    ctx.fillStyle = pxcolor;
    ctx.fillRect(0, 0, gridwidth, gridheight);
}

//This code makes sure that I get hex values from the table tr td
$.cssHooks.backgroundColor = {
    get: function (elem) {
        if (elem.currentStyle) {
            bg = elem.currentStyle["backgroundColor"];
        } else if (window.getComputedStyle) {
            bg = document.defaultView.getComputedStyle(elem,
                null).getPropertyValue("background-color");
        }
        if (bg.search("rgb") == -1) {
            return bg;
        } else {
            bg = bg.match(/\d+/g);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(bg[0]) + hex(bg[1]) + hex(bg[2]);
        }
    }
}

//Change gridzoom if slider is adjusted
$('[type="range"]').mouseup(function(){
    gridzoom = document.getElementById("slideContainer").value;
    $('tr').css('height', gridzoom + 'px');
    $('td').css('width', gridzoom + 'px');
});

//set pxcolor from the color picker upon choice
$('#colorPicker').mouseout(function(){
    pxcolor = document.getElementById("colorPicker").value;
});

//Clear table, set gridheight and gridwidth from input fields call makegrid
//set gridzoom from slider, set css valuse for tr height and td width
//set pxcolor from colorPicker, set all tr and td to background color
//unhide span elements
$('[type="submit"]').click(function(){
    $('#pixel_canvas').empty();
    gridheight = $('#input_height').val().valueOf();
    gridwidth = $('#input_width').val().valueOf();
    makeGrid();
    gridzoom = document.getElementById("slideContainer").value;
    $('tr').css('height', gridzoom + 'px');
    $('td').css('width', gridzoom + 'px');
    pxcolor = document.getElementById("colorPicker").value;
    $('tr td').css({backgroundColor: pxcolor});
    $('span').css('visibility', 'visible');
});

//Check for click within table and determine row and colum of clicked td
//set clicked td to pxcolor
//draw pixel on the preview canvas
$('#pixel_canvas').on('click','td', function(){
    colIndex = parseInt( $(this).index() ) + 1;
    rowIndex = parseInt( $(this).parent().index() )+1;
    $('tr:nth-child(' + rowIndex + ') > td:nth-child(' + colIndex + ')').css({backgroundColor: pxcolor});
    ctx.fillStyle = pxcolor;
    ctx.fillRect( colIndex - 1 , rowIndex - 1, 1, 1 );
});

//detect right click on td and set pxcolor and picker to that color
$('#pixel_canvas').on('auxclick','td', function(){
    colIndex = parseInt( $(this).index() ) + 1;
    rowIndex = parseInt( $(this).parent().index() )+1;
    pxcolor = $('tr:nth-child(' + rowIndex + ') > td:nth-child(' + colIndex + ')').css('background-color');
    $('#colorPicker').val(pxcolor);
});
