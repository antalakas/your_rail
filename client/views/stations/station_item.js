Template.stationItem.helpers({
  IsStationList: function () {
    if (Session.get('currentStationItemContext') == 'stationsList') {
      return true;
    }

    Session.set('currentStation', this);
    return false;
  },
  liveboardEntries: function() {
      return LiveBoardCollection.find();
  }
});

Template.stationItem.created = function() {
  
  if (Session.get('currentStationItemContext') == 'stationsList') {
      return;
    }
  
  console.log("stationItem.created");
  
  //https://data.irail.be/NMBS/Liveboard/Simonis/2014/03/07/16/36.json
  
  // construct livedata json url
  var currentdate = new Date(); 
  var year = currentdate.getFullYear();
  var month = currentdate.getMonth()+1;
  var day = currentdate.getDate();
  var hour = currentdate.getHours();
  var minutes = currentdate.getMinutes();
  
  var liveboardUrl = "https://data.irail.be/NMBS/Liveboard/" + 
      this.data.name + "/" + 
      year + "/" + month + "/" + day + "/" + 
      hour + "/" + minutes + ".json"
  
  console.log(liveboardUrl);
 
  Meteor.http.get(liveboardUrl, 
                  function(error, result){
                    if(error) {
                      console.log('http get FAILED!');
                    } else {
                      console.log('http get SUCCESS');
                      if (result.statusCode === 200) {
                        console.log('Status code = 200!');
                        console.log('Printing one for testing...');
                        var liveboard_data = JSON.parse(result.content)
                        console.log(liveboard_data.Liveboard.departures[0]);

                        console.log('Clearing all liveboard entries in Liveboard collection');
                        LiveBoardCollection.remove({});

                        console.log('Adding all liveboard entries to Liveboard collection');
                        for (I = 0; I < liveboard_data.Liveboard.departures.length; ++I) {
                            LiveBoardCollection.insert(liveboard_data.Liveboard.departures[I]);
                        }
                        console.log(liveboard_data.Liveboard.departures.length.toString() + ' liveboard entries added');
                      }
                    } 
                  });
  
};