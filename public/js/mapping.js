var rateById = d3.map()
var outputShow;
var lookupCounty;
var agencyId = "2800";


$(document).ready(function(){
 
  $(".dropDown").change(function(){
    
    agencyId = $(this).val()
   
    getData(agencyId);
  });
  
  $("#returnZoom").click(function(){
    $("#returnZoom").fadeOut();
    trans[0] = 0;
    trans[1] = 0;
    scale = 1;
    move();
  
  });
  
  function getData(agencyId){
    $("#descRightContent").html("<p>Loading...</p>");
    //$("#descRightContent").css("visibility","visible");
    $("#descriptionTableRight").css("visibility","visible");
    
    if(agencyId=="7022"){
      $("#disclaim").html("The vast majority (~1.2 trillion) of this number is a national flood insurance program backed up the federal government. So this is only Day After Tomorrow theoretical spending.") 
      }else{
        $("#disclaim").html("")
      }
          
    $.ajax({
        type: 'GET',
        url: '/change_map',
        data: {id: agencyId},
        success: function(output) {
        
         
      
          output= JSON.parse(output)
          outputStep = output['map_values']
          
          rateById.forEach(function(d,i) {this.set(d,0)})
          lookupCounty = [];
          for(i=0;i<outputStep.length;i++){
            rateById.set(outputStep[i].location_id, outputStep[i].per_capita_expend)
            lookupCounty[String(outputStep[i].location_id)] = Array(outputStep[i].per_capita_expend, outputStep[i].location_name,outputStep[i].rank,outputStep[i].program_portions)
          }
          
       
          thresholdArray = output['thresholds']
          thresholdArray[0] = 0   
          
          agencySummary = "<p>National Total: "+ numberToWords(output['totalSpend']) +"<br> National Per Capita: $"+Math.round(output['totalPerCap'])+"</p>"
          
          //$("#status").prepend(agencySummary)
          $("#descRightContent").html(agencySummary)
          //$("#descRightContent").css("visibility","visible")
          
          
          var quantizeChange = d3.scale.threshold()
            .domain(thresholdArray)
            .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));
          
         
          d3.select("#chloropleth").selectAll("g").selectAll("path").attr("class", function(d) { return quantizeChange(rateById.get(d.id)); })
         
         
          showCors(output['correlation_array'])
        }
      });
  
  
  
  }
  
  function showCors(correlationArray){
    show = "<h3>Spending Correlation</h3><table class='corrTable'><tr><td>% of Population...</td><td></td></tr>"
    for(i = 0; i<correlationArray.length; i++){
      show = show+"<tr><td>"+correlationArray[i]['metric']+"</td><td class='alignRightTD'>"+correlationArray[i]['correlation']+"</td></tr>"
    }
    show = show+"</table><h6>1 is a perfect positive correlation, -1 is a perfect negative correlation</h6>"
  
    $("#sidebar").html(show)
  
  }
  
  var width = 960,
      height = 500,
      scale,
      trans=[0,0],
      centered;
      
  var zoom = d3.behavior.zoom()
    .scaleExtent([1, 4])
    .on("zoom", move);
  
  
  //var rateById = d3.map();
  
  var quantize = d3.scale.threshold()
      .domain([0,2186.316,2436.062,2625.776,2937.09,3103.672,3322.938,3633.146,10853.32])
      .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));
  
  var path = d3.geo.path();
  
  var svg = d3.select("#chloropleth").append("svg")
      .attr("width", width)
      .attr("height", height)
       
  queue()
      //.defer(d3.json, "/json/allCounties.json")
      .defer(d3.json, "/json/topoCounties.json")
      .defer(d3.csv, "/json/socialSecInitial.txt", function(d) { rateById.set(d.id, 0); })
      .await(ready);
  
  function ready(error, us) {

    svg.append("g")
        .attr("class", "counties")
      .selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
      .enter().append("path")
        //.attr("class", "test1")
        .attr("d", path)
        .on("click", click)
        .on ("mouseover",mover)
        .on ("mouseout",mout)
        //.call(zoom)
        
  
    svg.append("path")
        //.datum(topojson.feature(us, us.objects.counties))
        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
        .attr("class", "states")
        .attr("d", path)
        
    getData(agencyId);
              
  }
  
  
  function click(d) {
   
    var x, y, k;
   
    if (d && centered !== d) {
      var centroid = path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      k = 3;
      centered = d;
      
      trans[0] = x - (width/k)/2
      trans[1] = y - (height/k)/2
      
      $("#returnZoom").fadeIn();
    } else {
      x = width / 2;
      y = height / 2;
      k = 1;
      centered = null;
      trans[0] = 0;
      trans[1] = 0;
      
  
    }
      scale = k;
    
    
    
    svg.selectAll("path")
        .classed("active", centered && function(d) { return d === centered; });
   
    svg.selectAll("path").transition()
        .duration(1000)
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
        .style("stroke-width", 1.5 / k + "px");
  }
  
  function move() {
  
    var s = 1,
        t = [0,0];
  
        
  
    t[0] = Math.min(width / 2 * (s - 1), Math.max(width / 2 * (1 - s), t[0]));
    t[1] = Math.min(height / 2 * (s - 1) + 230 * s, Math.max(height / 2 * (1 - s) - 230 * s, t[1]));
    //zoom.translate(t);
  
    svg.selectAll("path").attr("transform", "translate(" + t + ")scale(" + s + ")");  
  }
  
  
  
  function mover(d) {
    locationMouse = path.centroid(d);
    
    if(lookupCounty[(d.id)] != null){
      $(".countyName").html(lookupCounty[d.id][1])
      $(".countySpending").html("$"+lookupCounty[d.id][0])
      $(".countyRanking").html(lookupCounty[d.id][2])
      
      progDisplay = lookupCounty[d.id][3].split("||")
      displayOut = "<table>"
      for(i = 0; i<progDisplay.length;i++){
        temp = progDisplay[i].split(":")
        displayOut = displayOut+"<tr><td>"+temp[0]+"</td><td class='alignRightTD'>"+temp[1]+"</td></tr>"
      }
      displayOut = displayOut+"</table>"
      
      //$("#descRightContent").html(displayOut)
       $(".description").css("visibility","visible")
       //alert("what")
      
      
      
      $("#pop-up").fadeOut(100,function () {
        if(scale == null){
          scale = 1
          }
       
     
        $("#pop-desc").html(displayOut);
  
        // Popup position
       
        var popLeft = (locationMouse[0]-trans[0])*scale+295;
        var popTop = (locationMouse[1]-trans[1])*scale+220;
        
        if(popLeft > 950) popLeft = popLeft-400
       
        if(popTop < 300) {
          popTop = popTop+30
          popLeft = popLeft+50
          }
         
        $("#pop-up").css({"left":popLeft,"top":popTop});
        if($(".description").css("visibility") == "visible") $("#pop-up").fadeIn(100);
    });
    }
    
      //$(".description").css("visibility","visible")
  
  }
  
  function mout(d) {
     $(".description").css("visibility","hidden")
     $("#pop-up").fadeOut(50);
    
   
  }
  
  
  
  //function to zoom to a targeted county given the county FIP
  
  //d3.geo.path().centroid(d3.select("#content").selectAll("g").selectAll("path")[0][INDEX].__data__) <!-- will give the pixel coordinated where the index corresponds to the id of the given FIP




});