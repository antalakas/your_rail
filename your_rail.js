if (Meteor.isClient) {
  
  Template.hello.mySvg = function () {
    var width = 960,
        height = 1160;
    
    var projection = d3.geo.albers()
    .center([9, 49.8])
    .rotate([4.4, 0])
    .parallels([50, 60])
    .scale(1200 * 14)
    .translate([width / 2, height / 2]);
    
    var path = d3.geo.path()
    .projection(projection)
    .pointRadius(2);
    
    var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

    g = svg.append("g");  
    
    // Zoom behavior
    var zoom = d3.behavior.zoom()
    .translate(projection.translate())
    .scaleExtent([height, Infinity])
    .scale(projection.scale())
    .on("zoom", function() {
      projection.translate(d3.event.translate).scale(d3.event.scale)
      g.selectAll("path.zoomable").attr("d", path);
      
      projection.translate(d3.event.translate).scale(d3.event.scale)
      svg.selectAll(".place").attr("d", path);    
      
      projection.translate(d3.event.translate).scale(d3.event.scale)
      svg.selectAll("place").attr("d", path);    
      
      projection.translate(d3.event.translate).scale(d3.event.scale)
      svg.selectAll(".place-label").attr("d", path);  
      
      projection.translate(d3.event.translate).scale(d3.event.scale)
      svg.selectAll(".subunit.BCR").attr("d", path);  
     
      projection.translate(d3.event.translate).scale(d3.event.scale)
      svg.selectAll(".subunit.BFR").attr("d", path); 
      
      projection.translate(d3.event.translate).scale(d3.event.scale)
      svg.selectAll(".subunit.BWR").attr("d", path); 
      
      projection.translate(d3.event.translate).scale(d3.event.scale)
      svg.selectAll(".subunit-boundary").attr("d", path); 
      
      projection.translate(d3.event.translate).scale(d3.event.scale)
      svg.selectAll(".subunit-label").attr("d", path);
    });
    svg.call(zoom);
    
    d3.json("/be.json", function(error, be) {
      var subunits = topojson.feature(be, be.objects.subunits),
          places = topojson.feature(be, be.objects.places);
      
      svg.selectAll(".subunit")
      .data(subunits.features)
      .enter().append("path")
      .attr("class", function(d) { return "subunit " + d.id; })
      .attr("d", path);
      
      svg.append("path")
      .datum(topojson.mesh(be, be.objects.subunits, function(a, b) { return a !== b; }))
      .attr("d", path)
      .attr("class", "subunit-boundary");
      
      svg.selectAll(".subunit-label")
      .data(subunits.features)
      .enter().append("text")
      .attr("class", function(d) { return "subunit-label " + d.id; })
      .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .text(function(d) { return d.properties.name; });
      
      svg.append("path")
      .datum(places)
      .attr("d", path)
      .attr("class", "place");
      
      svg.selectAll(".place-label")
      .data(places.features)
      .enter().append("text")
      .attr("class", "place-label")
      .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
      .attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
      .attr("dy", ".35em")
      .style("text-anchor", function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; })
      .text(function(d) { return d.properties.name; });
    });
    
    return svg;
  };
    
  /*myTick = function() {
    
    var myobject = Meteor.http.get("http://data.irail.be/NMBS/Stations.json", 
                                   function(err,result){
                                     console.log(result);
                                   });
    
    //console.log("timer");
    
    //Meteor.setTimeout(
    //  myTick, 1000
    //);
    
  }

  myTick();
  */
  //Template.hello.greeting = function () {
  //  return "Welcome to your_rail.";
  //};

  //Template.hello.events({
  //  'click input': function () {
  //    // template data, if any, is available in 'this'
  //    if (typeof console !== 'undefined')
  //      console.log("You pressed the button");
  //  }
  //});
  
  //Template.hello.rendered = function() {
  //  var x = 1;
  //};
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
/*
<body>
  <script src="http://d3js.org/d3.v3.min.js"></script>
  <script src="http://d3js.org/topojson.v1.min.js"></script>
  <!--{{> hello}}-->
</body>

<template name="hello">
  <!--
  <h1>Hello World!</h1>
  {{greeting}}
  <input type="button" value="Click" />
  -->
</template>*/