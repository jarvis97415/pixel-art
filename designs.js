//Define global variables
let gridzoom, gridheight, gridwidth, colIndex, rowIndex, pxcolor;
let x, y, bg;
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");
//Following function draws the editor table
function makeGrid() {
    //Clear table
    $('#pixel_canvas').empty();
    //for next loops to draw the rows and colums in the table
    for (y = 0; y < gridheight; y++) {
        $('#pixel_canvas').append('<tr>');
        for (x = 0; x < gridwidth; x++) {
            $('#pixel_canvas > tr').last().append('<td>');
        }
    }
}
//This code makes sure that I get hex values from the table tr td
function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
}
$.cssHooks.backgroundColor = {
    get: function (elem) {
        if (elem.currentStyle) {
            bg = elem.currentStyle.backgroundColor;
        } else if (window.getComputedStyle) {
            bg = document.defaultView.getComputedStyle(elem,
                null).getPropertyValue("background-color");
        }
        if (bg.search("rgb") == -1) {
            return bg;
        } else {
            bg = bg.match(/\d+/g);
            return "#" + hex(bg[0]) + hex(bg[1]) + hex(bg[2]);
        }
    }
};
//Change gridzoom if slider is adjusted
$('#slideContainer').mouseup(function(){
    gridzoom = $(this).val();
    $('tr').css('height', gridzoom + 'px');
    $('td').css('width', gridzoom + 'px');
});
//Detect the click of the submit button
$('#submit_button').click(function(){
    //Set gridheight and gridwidth
    gridheight = $('#input_height').val().valueOf();
    gridwidth = $('#input_width').val().valueOf();
    //Call function to draw grid
    makeGrid();
    //Set color of all table elements to white
    $('#pixel_canvas > tr, td').css('background-color', '#ffffff');
    //Set canvas dimensions
    $('#myCanvas').attr('width', gridwidth).attr('height', gridheight);
    //Set initial zoom value for the table
    gridzoom = $('#slideContainer').val();
    $('tr').css('height', gridzoom + 'px');
    $('td').css('width', gridzoom + 'px');
    //Unhide on-screen help text
    $('span').css('visibility', 'visible');
    //Unhide the clear canvas button
    $('#clear_color').css('visibility', 'visible');
});
//Clear table and redraw to current color
$('#clear_color').click(function(){
    //Call function to draw grid
    makeGrid();
    //Check zoom value and assign css values
    gridzoom = $('#slideContainer').val();
    $('tr').css('height', gridzoom + 'px');
    $('td').css('width', gridzoom + 'px');
    //Make sure we have pxcolor set from color picker
    pxcolor = $('#colorPicker').val();
    //Set all tr and td elements to pxcolor
    $('tr, td').css('backgroundColor', pxcolor);
    console.log(pxcolor);
    //Fill preview canvas with pxcolor
    ctx.fillStyle = pxcolor;
    ctx.fillRect(0, 0, gridwidth, gridheight);
});
//Check for click within table
$('#pixel_canvas').on('click','td', function(){
    //Get colIndex and rowIndex values
    colIndex = parseInt( $(this).index() ) + 1;
    rowIndex = parseInt( $(this).parent().index() )+1;
    //Make sure we have pxcolor set from color picker
    pxcolor = $('#colorPicker').val();
    //Change the css background color of the clicked element
    $('tr:nth-child(' + rowIndex + ') > td:nth-child(' + colIndex + ')').css({backgroundColor: pxcolor});
    //Draw pixel on preview canvas
    ctx.fillStyle = pxcolor;
    ctx.fillRect( colIndex - 1 , rowIndex - 1, 1, 1 );
});
//detect right click on table element, set pxcolor and picker to the existing color
$('#pixel_canvas').on('auxclick','td', function(){
    //Get colIndex and rowIndex values
    colIndex = parseInt( $(this).index() ) + 1;
    rowIndex = parseInt( $(this).parent().index() )+1;
    //Get existing css background color of the auxclicked element
    pxcolor = $('tr:nth-child(' + rowIndex + ') > td:nth-child(' + colIndex + ')').css('background-color');
    //Set the color picker to the color stored in pxcolor
    $('#colorPicker').val(pxcolor);
});