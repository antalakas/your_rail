Template.stationItem.helpers({
  IsStationList: function () {
    if (Session.get('currentStationItemContext') == 'stationsList') {
      return true;
    }
    return false;
  }
});

Template.stationItem.created = function() {

    console.log("stationItem.created");

};