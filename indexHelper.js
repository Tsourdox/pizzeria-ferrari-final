$(document).ready(function () {
    $(document).click(function (event) {
        var clickover = $(event.target);
        var _opened = $(".navbar-collapse").hasClass("navbar-collapse collapse in");
        if (_opened === true && !clickover.hasClass("navbar-toggle")) {
            $("button.navbar-toggle").click();
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

