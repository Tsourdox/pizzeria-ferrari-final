var handleMediaChange = function (mediaQueryList) {
    switch (mediaQueryList.media) {
        case "(max-width: 991px)":
            if (mediaQueryList.matches) {
                console.log("Small Device / Tablet")
                generateMenuList(2)
            }
            break
        case "(max-width: 1199px) and (min-width: 992px)":
            if (mediaQueryList.matches) {
                console.log("Medium Device / Desktop")
                generateMenuList(2)
            }
            break
        case "(min-width: 1200px)":
            if (mediaQueryList.matches) {
                console.log("Large Device / Wide Screen")
                generateMenuList(3)
            }
            break
        default:
            console.log("default")
    }
}

var mqlSM = window.matchMedia("(max-width: 991px)");
var mqlMD = window.matchMedia("(max-width: 1199px) and (min-width: 992px)");
var mqlLG = window.matchMedia("(min-width: 1200px)");
mqlSM.addListener(handleMediaChange);
mqlMD.addListener(handleMediaChange);
mqlLG.addListener(handleMediaChange);


function emptyMenu() {
    $("#menu-list").empty()
}

function loadMenu() {
    $.getJSON("menu.txt", storeMenu)
}
function storeMenu(jsonString) {
    menuArray = jsonString
    generateNavBarMenuItems()
    
    handleMediaChange(mqlSM);
    handleMediaChange(mqlMD);
    handleMediaChange(mqlLG);
}

function generateNavBarMenuItems() {
    for(m=0; m < menuArray.length; m++) {
        // NavBar title
        var menu = 'menu' + m;
        
        var navBarItem = '<li class="hidden-sm hidden-md hidden-lg">' +
                            '<a href="#' + menu + '" onclick="collapseNavBarMenu()" class="nav-item-secondary main-text-color">' + menuArray[m].title + '</a>' +
                         '</li>';
        document.getElementById("navbar-menu").innerHTML += navBarItem;
    }
}

function getMenuItemsDelta(columnMappings) {
    var maxValue = Number.MIN_SAFE_INTEGER
    var minValue = Number.MAX_SAFE_INTEGER
    
    for (i=0; i < columnMappings.length; i++) {
        var sum = 0
        for (j=0; j < columnMappings[i].length; j++) {
            sum += columnMappings[i][j]      
        }
        if (sum > maxValue) {
            maxValue = sum
        }
        if (sum < minValue) {
            minValue = sum
        }
    }
    return maxValue - minValue
}

function generateMenuList(nrOfColumns) {
    // Find list collections
    var lowestDelta = Number.MAX_SAFE_INTEGER
    var savedColumnMappings
    
    //-------- Awesome Algorithm --------//
    var grayCodes = getGrayCodes(nrOfColumns)
    var nrOfGrayCodes = getNrOfGrayCodes(nrOfColumns)
    
    // Map menu to columns
    for (gc=0; gc < nrOfGrayCodes; gc++) {
        var currentValue = 0
        var currentColumn = 0
        var calculateGV = true
        
        var columnMappingsSum = []
        while(columnMappingsSum.push([]) < nrOfColumns);
        var columnMappings = []
        while(columnMappings.push([]) < nrOfColumns);
        var currentGrayCode = grayCodes[gc]
        
        for (j=0; j < menuArray.length; j++) {
            // Calculate goldevValue
            if (calculateGV) {
                var goldenValue = 0
                for (var i=j; i < menuArray.length; i++) {
                    goldenValue += menuArray[i].items.length + 2 // Number of menu items (+2 for menuTitle)
                }
                goldenValue /= (nrOfColumns - currentColumn)
                calculateGV = false
            }
            // Calculate currentValue
            currentValue += menuArray[j].items.length + 2 // (+2 for menuTitle)
            
            // Add menu to column
            if (currentValue < goldenValue || currentColumn == nrOfColumns-1) {
                columnMappingsSum[currentColumn].push(menuArray[j].items.length);
                columnMappings[currentColumn].push(j);
            } else if (currentValue >= goldenValue && currentGrayCode[currentColumn]){
                columnMappingsSum[currentColumn].push(menuArray[j].items.length);
                columnMappings[currentColumn].push(j);
                currentColumn++
                currentValue = 0
                calculateGV = true
            } else {
                currentColumn++
                currentValue = 0
                j--
                calculateGV = true
            }
        }
        var delta = getMenuItemsDelta(columnMappingsSum)
        if (delta < lowestDelta) {
            lowestDelta = delta
            savedColumnMappings = columnMappings.slice()
        }
    }
    
    //-----------------------------------//
    
    // Build Menulist html
    var out = ""
    var counter = 0
    for (x=0; x < nrOfColumns; x++) {
        out += '<div class="col-sm-6 col-md-6 col-lg-4 menu-column">';
        
        for (m=0; m < savedColumnMappings[x].length; m++) {
            var menuItem = savedColumnMappings[x][m]
            var menu = 'menu' + savedColumnMappings[x][m]
            var counter = 0
            
            // Menu title
            out += '<div id="' + menu + '" class="menu-container">' + 
                        '<div id="menu-header-continer">' +
                        '<span id="menu-item-span-title">' +
                            '<h4 id="menu-header">' + menuArray[menuItem].title + '</h4>';
            if (menuArray[menuItem].title == 'PIZZOR') {
                out += '<span class="menu-item-price-span">' +
                            '<h5 class="menu-header-price">Vanlig</h5>' +
                            '<h5 class="menu-header-price">Familj</h5>' +
                        '</span>';
            } 
            out += '</span></div>';
            
            // Menu extra
            out += '<ul class="list-group">';
            if (menuArray[menuItem].extra != "") {
                out +=  '<li class="list-extra">' +
                            '<p class="menu-extra">' + menuArray[menuItem].extra + '</p>' +
                        '</li>';
            }
            // Menu list
            var items = menuArray[menuItem].items;
            for(var i=0; i < items.length; i++) {
                counter++
                var titleColor = items[i].veg ? 'class="my-text-green"': 'class="my-text-yellow"'            
                if (menuArray[menuItem].title == 'PIZZOR') {
                    var prisVan = items[i].prisVan + ':-'
                    
                    
                    var prisFam = ''
                    var menuItemPrice = ''
                    if (items[i].prisFam > 0) {
                        prisFam = items[i].prisFam + ':-'
                        menuItemPrice = 'menu-item-price'
                    }
                    else {
                        prisFam = '✘'
                        menuItemPrice = 'menu-item-cross'
                    }
                    out += 	
                                '<li class="list-item">' +
                                    '<span id="menu-item-span">' +
                                        '<h5 id="menu-item-name" ' + titleColor + '>' + counter + '. ' + items[i].namn + '</h5>' +
                                        '<span class="menu-item-price-span-title">' +
                                            '<h5 class="menu-item-price">' + prisVan + '</h5>' +
                                            '<h5 class="' + menuItemPrice + '">' + prisFam + '</h5>' +
                                        '</span>' +
                                    '</span>' +
                                    '<p class="menu-item-description">' + items[i].ingredienser + '</p>' +
                                '</li>';
                } else {
                    out += 	
                                '<li class="list-item">' +
                                    '<span id="menu-item-span">' +
                                        '<h5 id="menu-item-name" ' + titleColor + '>' + counter + '. ' + items[i].namn + '</h5>' +
                                        '<h5 class="menu-item-price">' + items[i].prisVan + ':-</h5>' +
                                    '</span>' +
                                    '<p class="menu-item-description">' + items[i].ingredienser + '</p>' +
                                '</li>';
                }      
            }
            
            out +=      '</ul>' +
                    '</div>';
        }
        out += '</div>';
    }
    document.getElementById("menu-list").innerHTML = out;
}