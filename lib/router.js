Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('home', {path: '/'});
    this.route('stationsList', {
      data: function() { 
        Session.set('currentStationItemContext', 'stationsList');
      }
    });
    this.route('liveboard', {
      data: function() { 
        Session.set('currentStationItemContext', '');
      }
    });  
    this.route('stationPage', {
        path: '/stations/:_id',
        data: function() { 
          Session.set('currentStationItemContext', 'stationPage');
          return Stations.findOne(this.params._id); 
        }
    });
});