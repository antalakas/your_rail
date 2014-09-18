Router.map(function() {

  this.route('home', {
    path: '/',
    layoutTemplate: 'mainLayout',
    yieldTemplates: {
      'header': {to: 'header'},
      'map': {to: 'map'}
    }
  });

  this.route('stationsList', {
    layoutTemplate: 'mainLayout',
    yieldTemplates: {
      'header': {to: 'header'},
      'map': {to: 'map'}
    },
    data: function() { 
      Session.set('currentStationItemContext', 'stationsList');
    }
  });

  this.route('stationPage', {
    path: '/stations/:_id',
    layoutTemplate: 'mainLayout',
    yieldTemplates: {
      'header': {to: 'header'},
      'map': {to: 'map'}
    },
    data: function() { 
      Session.set('currentStationItemContext', 'stationPage');
      return Stations.findOne(this.params._id); 
    }
  });
});