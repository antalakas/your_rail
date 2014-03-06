Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('home', {path: '/'});
    this.route('stationsList');
    this.route('liveboard');
    this.route('stationPage', {
        path: '/stations/:_id',
        data: function() { return Stations.findOne(this.params._id); }
    });
});