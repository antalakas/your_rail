Template.stationsList.helpers({
  stations: function() {
    return Stations.find();
  }
});

Template.stationsList.created = function() {
  $(window).resize(function() {
    vph = $(window).height();
    console.log(vph);
    $('#list_of_stations').css({'height': vph*(8/9) + 'px'});
  });
};

Template.stationsList.destroyed = function() {
  $(window).off('resize');
};

Template.stationsList.rendered = function() {
  //$(window).resize(function() {
  //  vph = $(window).height();
  //  console.log(vph);
  //  $('#list_of_stations').css({'height': vph*(9/10) + 'px'});
  //});
};

/*
Template.stationsList.events({
  'submit form': function(e) {
    e.preventDefault();

    var company = {
      nameEn: $(e.target).find('[name=nameEn]').val(),
      nameGr: $(e.target).find('[name=nameEl]').val()
    }

    company._id = Companies.insert(company);
    Router.go('companyPage', company);
  }
});


Template.stationsList.rendered = function () {
    $(window).onresize(function () {
      vpw = $(window).width();
      
      console.log(vpw);
      
      vph = $(window).height();
      
      console.log(vph);
      //$('#list_of_stations').css({‘height’: vph + ‘px’});
    }
};
*/
/*
$(document).ready(function(){
resizeDiv();
});

window.onresize = function(event) {
resizeDiv();
}

function resizeDiv() {
vpw = $(window).width();
vph = $(window).height();
$(‘#somediv’).css({‘height’: vph + ‘px’});
}*/