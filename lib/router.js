Router.configure({
    layoutTemplate: 'layout'
});

Router.map(function() {
    this.route('home', {path: '/'});
    this.route('stations');
    this.route('liveboard');
});