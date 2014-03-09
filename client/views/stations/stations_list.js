Template.stationsList.helpers({
  stations: function() {

    var stationsCursor = Stations.find()
    var stations = stationsCursor.fetch();

    // Clear local collection
    StationsLocal.remove({});

    for (I=0; I<stations.length; ++I) {
        stations[I].isCurrent = false;
        StationsLocal.insert(stations[I]);
    }

    return stationsCursor;
  }
});

Template.stationsList.created = function() {
  $(window).resize(function() {
    vph = $(window).height();
    console.log(vph);
    $('#list_of_stations').css({'height': vph*(8/9) + 'px'});
  });
};

Template.stationsList.destroyed = function() {
  $(window).off('resize');
};

Template.stationsList.rendered = function() {
};
