Meteor.subscribe("stations");

Meteor.startup(function () {
  Meteor.autorun(function () {

    /*if (Stations.find().count() === 0) {
      var stations_response = Meteor.http.get("http://data.irail.be/NMBS/Stations.json", 
                                              function(err,result){
                                                console.log(result);
                                              });


    }*/

    //var station = Stations.findOne();
  });
});