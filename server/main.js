Meteor.startup(function () {
  
  console.log('------------------------------your-rail---------------------------------');
  console.log('-------------------------------startup----------------------------------');
  
  //console.log(Stations.find().count());
  //Stations.remove({});
  //console.log(Stations.find().count());
  
  if (Stations.find().count() === 0) {
    
    console.log('Did not find any station, add them all');
    console.log('Calling : http://data.irail.be/NMBS/Stations.json');
    
    Meteor.http.get("http://data.irail.be/NMBS/Stations.json", 
                    function(error, result){
                      if(error) {
                        console.log('http get FAILED!');
                      } else {
                        console.log('http get SUCCESS');
                        if (result.statusCode === 200) {
                          console.log('Status code = 200!');
                          console.log('Printing one for testing...');
                          var station_data = JSON.parse(result.content)
                          console.log(station_data.Stations[0]);
                          console.log('Adding all stations to Stations collection');
                          for (I = 0; I < station_data.Stations.length; ++I) {
                            Stations.insert(station_data.Stations[I]);
                          }
                          console.log(station_data.Stations.length.toString() + ' Stations added');
                        }
                      } 
                    });
  }
  else {
    console.log('Stations are already filled-in');
  }
  
  console.log('------------------------------------------------------------------------');
});