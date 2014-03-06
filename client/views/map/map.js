var map, markers = [ ];

var initialize = function(element, centroid, zoom, features) {
    map = L.map(element, {
        scrollWheelZoom: true,
        doubleClickZoom: false,
        boxZoom: false,
        touchZoom: false
    }).setView(new L.LatLng(centroid[0], centroid[1]), zoom);

    L.Icon.Default.imagePath = 'packages/leaflet/images'
  
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {opacity: .5}).addTo(map);
    //L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {opacity: .5}).addTo(map);
    //L.tileLayer.provider('Stamen.Watercolor').addTo(map)
    
    map.attributionControl.setPrefix('');

    var attribution = new L.Control.Attribution();
    attribution.addAttribution("Geocoding data &copy; 2013 <a href='http://open.mapquestapi.com'>MapQuest, Inc.</a>");
    attribution.addAttribution("Map tiles by <a href='http://stamen.com'>Stamen Design</a> under <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>.");
    attribution.addAttribution("Data by <a href='http://openstreetmap.org'>OpenStreetMap</a> under <a href='http://creativecommons.org/licenses/by-sa/3.0'>CC BY SA</a>.");

    map.addControl(attribution);
}

Template.map.created = function() {

}

Template.map.rendered = function () {
    // basic housekeeping
    $(window).resize(function () {
        var h = $(window).height(), offsetTop = 90; // Calculate the top offset
        $('#map_canvas').css('height', (h - offsetTop));
    }).resize();

    // initialize map events
    if (!map) {
        initialize($("#map_canvas")[0], [ 50.5333, 4.7667 ], 8);
    }

    // add a marker in the given location, attach some popup content to it and open the popup
    L.marker([50.5333, 4.7667]).addTo(map)
        .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
        .openPopup();

    var circle = L.circle([51.508, -0.11], 500, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(map);

};