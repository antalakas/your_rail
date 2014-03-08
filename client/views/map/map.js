var map, markers = [ ];
//var stationsLayer;

/*
Template.map.helpers({

});

Template.map.ShowStationMarker = function () {
  var currentStation = Session.get('currentStation');
  alert(currentStation);
  // add a marker in the given location, attach some popup content to it and open the popup
  L.marker([51.5333, 5.7667]).addTo(map)
  .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
  .openPopup();
};

Deps.autorun(function() {
  var currentStation = Session.get('currentStation');
  alert(currentStation);
});
*/

var initialize = function(element, centroid, zoom, features) {
  map = L.map(element, {
    scrollWheelZoom: true,
    doubleClickZoom: false,
    boxZoom: false,
    touchZoom: false
  }).setView(new L.LatLng(centroid[0], centroid[1]), zoom);
  
  L.Icon.Default.imagePath = 'packages/leaflet/images'
  
  //L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {opacity: .5}).addTo(map);
  L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {opacity: .5}).addTo(map);
  //L.tileLayer.provider('Stamen.Watercolor').addTo(map)
  
  map.attributionControl.setPrefix('');
  
  var attribution = new L.Control.Attribution();
  attribution.addAttribution("Geocoding data &copy; 2013 <a href='http://open.mapquestapi.com'>MapQuest, Inc.</a>");
  attribution.addAttribution("Map tiles by <a href='http://stamen.com'>Stamen Design</a> under <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a>.");
  attribution.addAttribution("Data by <a href='http://openstreetmap.org'>OpenStreetMap</a> under <a href='http://creativecommons.org/licenses/by-sa/3.0'>CC BY SA</a>.");
  
  map.addControl(attribution);
}

var createIcon = function(station) {
    var className = 'leaflet-div-icon ';
    className += station.isCurrent ? 'private' : 'public';
    return L.divIcon({
        iconSize: [30, 30],
        html: '<b>' + 'S' + '</b>',
        className: className
    });
}

var addMarker = function(station) {

    var stationMarker = new L.Marker([station.latitude, station.longitude], {
        _id: station._id,
        icon: createIcon(station)
    }).on('click', function(e) {
            Session.set("selected", e.target.options._id);
        });

    stationMarker.bindPopup(station.name);
    map.addLayer(stationMarker);
    markers[station._id] = stationMarker;
    //markers[marker.options._id] = marker;

    /*
    var stationMarker = L.marker([station.latitude, station.longitude]);

    if (map.hasLayer(stationMarker))
        return;

    stationMarker.bindPopup(station.name);
    map.addLayer(stationMarker);
    markers[station._id] = stationMarker;
    */
}

var removeMarker = function(_id) {
    var marker = markers[_id];
    if (map.hasLayer(marker)) {
        map.removeLayer(marker);
        delete markers[_id];
    }
}

Template.map.created = function() {

    StationsLocal.find({}).observe({
        added: function(station) {
            console.log("added");
            //var marker = new L.Marker(party.latlng, {
            //    _id: party._id,
            //    icon: createIcon(party)
            //}).on('click', function(e) {
            //        Session.set("selected", e.target.options._id);
            //    });
            addMarker(station);
        },
        changed: function(station) {
            console.log("changed");
            //var marker = markers[party._id];
            //if (marker) marker.setIcon(createIcon(party));
        },
        removed: function(station) {
            console.log("removed");
            removeMarker(station._id);
        }
    });
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

  /*
  if (!stationsLayer) {
    stationsLayer = L.layerGroup();
  }
  else {
    stationsLayer.clearLayers();
    map.removeLayer(stationsLayer); 
  }    
  
  if (Session.get('currentStationItemContext') == 'stationsList') {
    var stations = Stations.find().fetch();
    
    for (I=0; I<stations.length; ++I) {
      //console.log( stations[I].name );
      var stationMarker = L.marker([stations[I].latitude, stations[I].longitude]).bindPopup(stations[I].name);
      stationsLayer.addLayer(stationMarker);
    }
    
    stationsLayer.addTo(map);
  }
  
  if (Session.get('currentStationItemContext') == 'stationPage') {
    
    var station = Session.get('currentStation');
    console.log( station.name );
    var singleStationMarker = L.marker([station.latitude, station.longitude]).bindPopup(station.name);
    stationsLayer.addLayer(singleStationMarker);
    
    stationsLayer.addTo(map);
  }
  */

  /*while ( stationsCursor.hasNext() ) {
        station = stationsCursor.next();
        console.log( station.name );
    }*/
  
  /*
    // add a marker in the given location, attach some popup content to it and open the popup
    L.marker([50.5333, 4.7667]).addTo(map)
        .bindPopup('A pretty CSS3 popup. <br> Easily customizable.')
        .openPopup();

    var circle = L.circle([51.508, -0.11], 500, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(map);
    */
};