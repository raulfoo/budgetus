var datacheck;
function drawBarGraph(id,input,titles,taxLevel,type,restrictedArray,timelineIds){

divName = "timeline"+id;
var data = new google.visualization.DataTable();


data.addColumn('string', 'Category');
data.addColumn('number', 'Expenditure');

for(i=0;i<input.length;i++){
 
  temp = input[i];
  output = new Array(temp[0])

   

   if(type=="dollars"){
    output.push(parseFloat(Math.round(temp[1]))/1e6)
    }else if(type=="gdp_percent"){
     
      output.push(temp[j]*100*gdpSize[i]);
      }else{
  
    output.push(parseFloat(temp[1]*100));
    } 
  data.addRow(output);
 
}
 
 
if(type=="percent" || type=="budget_percent"){
  var options = {
      //'focusTarget': 'category'
      /*'legendPosition': 'newRow',
      'displayExactValues': true*/
      vAxis : {title: 'Percent of Federal Budget', gridlines: {count: 5},  minValue : 0},
      legend :{position: 'top'},
      backgroundColor: 'transparent',
      title : 'Relative to other Spending, 2012',
      hAxis : {baselineColor : 'black'}
      
      
        };
    }else if(type=="gdp_percent"){
      var options = {
        //'focusTarget': 'category'
        /*'legendPosition': 'newRow',
        'displayExactValues': true*/
        vAxis : {title: 'Percent of US GDP', gridlines: {count: 5},  minValue : 0},
        legend :{position: 'top'},
        backgroundColor: 'transparent',
        title : 'Relative to other Spending, 2012',
        hAxis : {baselineColor : 'black'}
        
        
          };
        
      }
    else{
      var options = {
      //'focusTarget': 'category'
      /*'legendPosition': 'newRow',
      'displayExactValues': true*/
      vAxis : {title: 'Budget (Million $)', gridlines: {count: 5},  minValue : 0},
      legend :{position: 'top'},
      backgroundColor: 'transparent',
      title : 'Relative to other Spending, 2012',
      hAxis : {baselineColor : 'black'}
      
      
        };
      
    }

  tempDat = data;
  var barGraph = new google.visualization.ColumnChart(
    document.getElementById(divName));
    
  barGraph.draw(data, options);
  
  google.visualization.events.addListener(barGraph, 'select', function(){
     
      if(barGraph.getSelection()[0].row == null) {
        return
      }
    
      id = timelineIds[barGraph.getSelection()[0].row]  
      findData(id,1,false,null,"budget_percent","line");
    
    });
 
    google.visualization.events.addListener(barGraph, 'onmouseover', function(e){
    
      if(e.row == null) {
        return
      }
      datacheck = data
      percentUse = restrictedArray[e.row][1]  
   
      //output =  "In 2012, "+data.getValue(e.row,0)+" cost you: $"+decimalRound(percentUse*taxLevel)+". Click this column to navigate there.";
      
      if(type=="gdp_percent"){
        output = "In 2012 "+data.getValue(e.row,0)+" was "+decimalRound(data.getValue(e.row,1))+"% of the GDP"//decimalRound(percentUse); //*taxLevel

      }else if(type=="dollars"){
                output = "In 2012 "+data.getValue(e.row,0)+" costs $"+numberToWords(data.getValue(e.row,1))//+"% of total Government Spending"//decimalRound(percentUse); //*taxLevel

      }
      else{
        output = "In 2012 "+data.getValue(e.row,0)+" was "+decimalRound(data.getValue(e.row,1))+"% of total Government Spending"//decimalRound(percentUse); //*taxLevel

      }
      
      $("#timelineDat"+id).html(output);
    });
    
    google.visualization.events.addListener(barGraph, 'onmouseout', function(e){
      //if hovering over the legend
      if(e.row == null) {
        return
      }
    
      
      output = ""
      $("#timelineDat"+id).html(output);
    });
 

}





function drawLineGraph(id,input,titles,taxLevel,type,restrictedArray,normalBudget) {
  divName = "timeline"+id;
  var data = new google.visualization.DataTable();

  data.addColumn('date', 'Date');

  for(j=0;j<titles.length;j++){
     data.addColumn('number', titles[j]);   
   
  
  }

  for(i=0;i<input.length;i++){
   
    temp = input[i];
    
  
    tempDat = temp.shift();

    date = new Date(tempDat,0,1);
    output = new Array(date);
   
    for(j=0;j<temp.length;j++){
     
     if(type=="dollars"){
      output.push(Math.round(temp[j])/1e6)
     }else if(type=="gdp_percent"){
     
      output.push(temp[j]*100*gdpSize[i]);
      }else{
       output.push(temp[j]*100);
      }
      
    }
    data.addRow(output);
   
  }
  

  
  
  
  if(type=="percent" || type=="budget_percent"){
    var options = {
        vAxis : {logScale: true, title: 'Percent of Federal Budget  (Log Scale!)', gridlines: {count: 12}},
        legend :{position: 'top'},
        backgroundColor: 'transparent',
        title : 'Historical Context 1980-2015',
        hAxis : {baselineColor : 'black'}        
          };
      }else if(type=="gdp_percent"){
      var options = {
        vAxis : {logScale: true, title: 'Percent of US GDP  (Log Scale!)', gridlines: {count: 12}},
        legend :{position: 'top'},
        backgroundColor: 'transparent',
        title : 'Historical Context 1980-2015',
        hAxis : {baselineColor : 'black'}        
          };
      
      }
      else{
        var options = {
          vAxis : {logScale: true, title: 'Budget (Million $) (Log Scale!)', gridlines: {count: 7}},
          legend :{position: 'top'},
          backgroundColor: 'transparent',
          title : 'Historical Context 1980-2015',
          hAxis : {baselineColor : 'black'}
          };
        
      }


  var annotatedtimeline = new google.visualization.LineChart(
      document.getElementById(divName));
  
  dataCheck = data
  annotatedtimeline.draw(data, options);
  //if(type == "percent"){
    google.visualization.events.addListener(annotatedtimeline, 'onmouseover', function(e){
      //if hovering over the legend
      if(e.row == null) {
        return
      }
      percentUse = restrictedArray[e.row][e.column]  
      
      /*if(normalBudget !="f"){
        today = data.getValue(32,e.column)
        mouseDate = data.getValue(e.row,e.column)
        percentUse = percentUse*(mouseDate/today)
      }*/
      
      if(type=="gdp_percent"){
        output = "In "+data.getValue(e.row,0).getFullYear()+", '"+data.getColumnLabel(e.column)+"' was "+decimalRound(data.getValue(e.row,e.column))+"% of the GDP"//decimalRound(percentUse); //*taxLevel

      }else if(type=="dollars"){
                output = "In "+data.getValue(e.row,0).getFullYear()+", '"+data.getColumnLabel(e.column)+"' was "+numberToWords(data.getValue(e.row,e.column))//+"% of total Government Spending"//decimalRound(percentUse); //*taxLevel

      }
      else{
        output = "In "+data.getValue(e.row,0).getFullYear()+", '"+data.getColumnLabel(e.column)+"' was "+decimalRound(data.getValue(e.row,e.column))+"% of total Government Spending"//decimalRound(percentUse); //*taxLevel

      }
      $("#timelineDat"+id).html(output);
    });
    
    google.visualization.events.addListener(annotatedtimeline, 'onmouseout', function(e){
    
      if(e.row == null) {
        return
      }
    
      
      output = ""
      $("#timelineDat"+id).html(output);
    });
 
}
 
