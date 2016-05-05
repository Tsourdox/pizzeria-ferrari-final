var myCenter = new google.maps.LatLng(57.651936, 12.138159);

function initialize() {
    var mapProp = {
        center:myCenter,
        zoom:15,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp)
    var marker = new google.maps.Marker({ position:myCenter });
    var infowindow = new google.maps.InfoWindow({ content:"Kaveldunsvägen 1" })
    
    map.setOptions({draggable: false})
    marker.setMap(map)
    infowindow.open(map, marker)
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker)
    });
}
google.maps.event.addDomListener(window, 'load', initialize)