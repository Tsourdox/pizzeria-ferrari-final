$(document).ready(function () {
    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $('.navbar-collapse').hasClass('navbar-collapse collapse in')
        if (_opened === true && !clickover.hasClass('navbar-toggle')) {
            $('button.navbar-toggle').click()
        }
    });

    $.getJSON("http://api.dryg.net/dagar/v2.1/", function(object, status){
        if (status == 'success') {
            var workFeeDay = object.dagar[0]['arbetsfri dag'] == 'Ja'
            var holiday = object.dagar[0]['röd dag'] == 'Ja'
            var flagDay = object.dagar[0]['flaggdag'] != ''
            if (workFeeDay && holiday && flagDay) {
                var card2Info = $('#card2-info')
                card2Info.text('Idag har vi stängt 😬')
                card2Info.addClass('closed-today')

                var card3Info = $('#card3-info')
                card3Info.text('Välkommen åter! 😊')
                card3Info.addClass('closed-today')
            }
        }
    });
});
function collapseNavBarMenu() {
    $('#navbar-opened').collapse('hide');
    switchDashColor()
}
var isWhite = true
function switchDashColor() {
    var myElements = document.querySelectorAll(".mainDashColor");
    var color
    if (isWhite) {
        color = '#980f18'
        isWhite = false
    } else {
        color = '#fffafa'
        isWhite = true
    }
        
    for (var i = 0; i < myElements.length; i++) {
        if (isWhite) {
            myElements[i].style.backgroundColor = color
        } else {
            myElements[i].style.backgroundColor = color
        }
    }
    
}

