/*Template.header.stationNames = function(){
    var myStations = Stations.find().fetch().map(function(it){ return it.name; });
    console.log(myStations[0]);
    return myStations;
};*/

/*
Deps.autorun(function () {
    Meteor.subscribe("stations", {
        onReady: function () {
            console.log("onReady", arguments); },
        onError: function () { console.log("onError", arguments); }
    });
});
*/

Template.header.searchMessage = function(){

    /*var stationsList = Stations.find().fetch();

    if (stationsList.length == 0) {
        console.log("returned 0 stations for autocomplete");
        return;
    }*/

    return "Liveboard";
};

Template.header.events({
    'submit form': function( event ){

        var stationName = $('#search_station').val().toString();
        var liveboard_station = Stations.findOne({'name' : stationName});

        if (liveboard_station == null) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }

        console.log(liveboard_station);

        Router.go('stationPage', {_id: liveboard_station._id});
    }
});

Template.header.rendered = function() {
    Meteor.subscribe('stations', function() {

        var stationsList = Stations.find().fetch();

        if (stationsList.length == 0) {
            console.log("returned 0 stations for autocomplete");
            return;
        }

        var stations = new Bloodhound({
            datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
            queryTokenizer: Bloodhound.tokenizers.whitespace,
            local: stationsList
        });

        stations.initialize();

        $('.typeahead').typeahead(null, {
            name: 'twitter-oss',
            displayKey: 'name',
            source: stations.ttAdapter()
        });

    });
};