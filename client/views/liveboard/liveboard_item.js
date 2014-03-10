Template.liveboardItem.events({
  
  'click #direction': function(event){
    event.preventDefault();
    event.stopPropagation();
    
    var direction = event.target.text;
    var liveboard_station = Stations.findOne({'name' : direction});
    
    if (liveboard_station == null) {
      alert("cannot find station for direction: " + direction)
      return false;
    }
    
    console.log(liveboard_station);
    
    Router.go('stationPage', {_id: liveboard_station._id});
  }
  
  /*
    'submit form': function( event ){

        event.preventDefault();
        event.stopPropagation();
      
        var stationName = $('#search_station').val().toString();
        var liveboard_station = Stations.findOne({'name' : stationName});

        if (liveboard_station == null) {
            return false;
        }

        console.log(liveboard_station);

        Router.go('stationPage', {_id: liveboard_station._id});
        //Session.set('currentStation', liveboard_station);
        //renderLiveboard(liveboard_station);
    }*/
});