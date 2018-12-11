
  var margin = {top: 30, right: 70, bottom: 20, left: 70};
  var width = 750 - margin.right - margin.left;
  var heightLineChart = 300 - margin.top - margin.bottom;
  var heightBarChart = 120 - margin.top - margin.bottom;

  var circleRadius = 6;

  ////////////////////////////////////////////////
  // STORY VARIABLES
  ////////////////////////////////////////////////

  var storySteps = [  //in order of how the story should flow. Make sure it aligns with the paragraph IDs in the HTML file.
    {life: "original", age: 0},
    {life: "original", age: 3},
    {life: "original", age: 5},
    {life: "original", age: 10},
    {life: "original", age: 13},
    {life: "original", age: 17},
    {life: "original", age: 21},

    {life: "alternative", age: 01},
    {life: "alternative", age: 04},
    {life: "alternative", age: 10},
    {life: "alternative", age: 20},
    {life: "alternative", age: 33}
  ];

  var storyNextStep = 0;
  var allStoryData = {};
  var storyAgeData;

  var transitionDuration = 1000;

  ////////////////////////////////////////////////

  ////////////////////////////////////////////////
  // SET UP SCALES FOR BOTH CHART
  ////////////////////////////////////////////////

  var xLineChart = d3.scaleLinear()
    .range([0, width]);

  var xBarChart = d3.scaleLinear()
    .range([0, width]);

  var yLineChart = d3.scaleLinear()
    .range([heightLineChart, 0]);

  var yBarChart = d3.scaleLinear()
    .range([heightBarChart, 0]);

  var xAxisLineChart = d3.axisBottom(xLineChart).tickSize(5);
  var yAxisLineChart = d3.axisLeft(yLineChart).ticks(0).tickSize(0);

  var xAxisBarChart = d3.axisBottom(xBarChart).ticks(8);
  var yAxisBarChart = d3.axisLeft(yBarChart).ticks(0).tickSize(0);

  ////////////////////////////////////////////////


  ////////////////////////////////////////////////
  // SET UP LINE FUNCTIONS
  ////////////////////////////////////////////////

  var lineOriginal = d3.line()
    .x((d) =>  xLineChart(d.age))
    .y((d) =>  yLineChart(d.originalnet))
    .curve(d3.curveCardinal.tension(0.5));

  var lineAlternative = d3.line()
        .x((d) =>  xLineChart(d.age))
        .y((d) =>  yLineChart(d.alternativenet))
        .curve(d3.curveCardinal.tension(0.5));

  var lineProjected = d3.line()
       .x((d) => xLineChart(d.age))
       .y((d) => yLineChart(d.projectedAmount))
        .curve(d3.curveCardinal.tension(0.5));

  var areaOriginal = d3.area()
    .x((d) => xLineChart(d.age))
    .y1((d) => yLineChart(d.originalnet))
    .y0((d) => yLineChart(0))
    .curve(d3.curveCardinal.tension(0.5));

  var areaAlternative = d3.area()
    .x((d) => xLineChart(d.age))
    .y1((d) => yLineChart(d.alternativenet))
    .y0((d) => yLineChart(0))
    .curve(d3.curveCardinal.tension(0.5));

  ////////////////////////////////////////////////

  ////////////////////////////////////////////////
  // CREATE SVG AND GROUPS (G) FOR THE CHARTS
  ////////////////////////////////////////////////

// line charts
  var storyLineChart = d3.select("#line-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", heightLineChart + margin.top + margin.bottom);

  var storyGLineChart = storyLineChart.append("g")
    .attr("class", "line-chart")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// bar charts
  var storyBarChart = d3.select("#bar-chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", heightBarChart + margin.top + margin.bottom);
    //.attr("id", "story-bar-chart");

  var storyGBarChart = storyBarChart.append("g")
    .attr("class", "bar-chart")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  ////////////////////////////////////////////////

  // load data
  d3.csv("story.csv", convertTextToNumbers, function(error1, dataStory) {

    if (error1) {throw error1;};

    //set the domains using the loaded data

    xLineChart.domain([ 0, 30 ]);

    var maxY = d3.max([
        Math.abs(d3.min(dataStory, (d) => d.originalnet)),
        Math.abs(d3.min(dataStory, (d) => d.alternativenet)),
        d3.max(dataStory, (d) => d.originalnet ),
        d3.max(dataStory, (d) => d.alternativenet)
    ]);

    // yLineChart.domain([ -maxY, maxY ]);
    yLineChart.domain([ -100000, 100000 ]);

    xBarChart.domain([ -100000, 100000 ]);

    xBarChart.domain([ -100000, 100000 ]);

    // xBarChart.domain([
    //   d3.min([
    //     d3.min(dataStory, (d) => d.originalculum ),
    //     d3.min(dataStory, (d) => d.alternativeculum )
    //   ]),
    //   d3.max([
    //     d3.max(dataStory, (d) => d.originalculum ),
    //     d3.max(dataStory, (d) => d.alternativeculum )
    //   ])
    // ]);

    yBarChart.domain([0,1]);

    allStoryData = dataStory;

    ////////////////////////////////////////////////
    // DRAW INITIAL LINE CHART
    ////////////////////////////////////////////////

    //draw the clip paths that will hide and reveal the line charts

    storyGLineChart.append("clipPath")
      .attr("id", "clip-original-line")
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 0)
      .attr("height", heightLineChart);

    storyGLineChart.append("clipPath")
      .attr("id", "clip-alternative-line")
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 0)
      .attr("height", heightLineChart);


    //draw the original area chart, using gradient fills for positive/negative values

    storyGLineChart.append("linearGradient")
      .attr("id", "area-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", 0)
      .attr("x2", 0).attr("y2", heightLineChart)
    .selectAll("stop")
      .data([
        {offset: "0%", color: "#00781c"},
        {offset: "50%", color: "#c2ffce"},
        {offset: "50%", color: "#ffcbc9"},
        {offset: "100%", color: '#8f0500'}
        // {offset: "50%", color: bananaColours.orange30},
      ])
    .enter().append("stop")
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; });


    var storyOriginalArea = storyGLineChart.append("path")
        .datum(dataStory)
        .attr("clip-path", "url(#clip-original-line)")
        .attr("class", "area-original")
        .attr("d", areaOriginal)
        // .style("stroke", "red")
        // .style("fill", "steelblue");
        .style("fill", "url(#area-gradient)");

    var storyAlternativeArea = storyGLineChart.append("path")
        .datum(dataStory)
        .attr("clip-path", "url(#clip-alternative-line)")
        .attr("class", "area-alternative")
        .attr("d", areaAlternative)
        .style("fill", "url(#area-gradient)");

    //draw the axes
    xAxisLineChart.ticks(xLineChart.domain()[1]/5); //tick every 5 years on the X axis

    d3.selectAll(".line-chart").append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + yLineChart(0) + ")")
      .call(xAxisLineChart);

    //remove the zero label and tick from x axis
    d3.selectAll(".tick")
      .each(function (d) {
        if ( d === 0 ) {
          this.remove();
        }
      });

     //draw the y axis arrow

    d3.selectAll(".line-chart").append("defs").append("marker")
      .attr("id", "arrowhead-bottom")
      .attr("class", "axis-arrow")
      .attr("markerWidth", "13")
      .attr("markerHeight", "13")
      .attr("refX", "8")
      .attr("refY", "6")
      .attr("orient", "auto")
      .append("svg:path")
        .attr("d", "M1,1 L8,6 L1,11 ");

    var arrow = d3.selectAll(".line-chart").append("g")
      .attr("class", "axis-arrow")
      .attr("transform", "translate( -10 , 0)");

    arrow.append("line")
      .attr("class", "axis-arrow")
      .attr("x1", 0)
      .attr("y1", yLineChart(0))
      .attr("x2", 0)
      .attr("y2", heightLineChart)
      .attr("marker-end", "url(#arrowhead-bottom)");

    arrow.append("line")
    .attr("class", "axis-arrow")
      .attr("x1", 0)
      .attr("y1", yLineChart(0))
      .attr("x2", 0)
      .attr("y2", 0)
      .attr("marker-end", "url(#arrowhead-bottom)");

    //draw the original line
    var storyOriginalPath = storyGLineChart.append("path")
        .datum(dataStory)
        .attr("clip-path", "url(#clip-original-line)")
        .attr("class", "line-original")
        .attr("d", lineOriginal);

    var altPathData = dataStory;

    var alternativePath = storyGLineChart.append("path")
        .datum(altPathData)
        .attr("clip-path", "url(#clip-alternative-line)")
        .attr("class", "line-alternative")
        .attr("d", lineAlternative);

        //projected data

  var projectedData = [];
  var storyMaxAge = dataStory[dataStory.length-1].age;
  var maxAge = xLineChart.domain()[1];
  var storyLastAmount = dataStory[dataStory.length-1].alternativenet;

  for (storyMaxAge; storyMaxAge < maxAge; storyMaxAge++) {
    projectedData.push({age: storyMaxAge, projectedAmount: storyLastAmount});
  };

    var projectedPath = storyGLineChart.append("path")
        .datum(projectedData)
        .attr("clip-path", "url(#clip-alternative-line)")
        .attr("class", "line-projected")
        .attr("d", lineProjected);

    // draw ellipse highlighter for later

     storyGLineChart.append("ellipse")
        .attr("class", "call-out")
        .attr("cx", xLineChart(15))
        .attr("cy", yLineChart(-2482))
        .attr("rx", 50)
        .attr("ry", 40)
        .style("stroke-opacity", 0);

    ////////////////////////////////////////////////

    ////////////////////////////////////////////////
    // DRAW INITIAL BAR CHARTS
    ////////////////////////////////////////////////


    //Story

    storyAgeData = allStoryData.filter(function (d) {return d.age == storySteps[storyNextStep].age; } );

    storyGBarChart.selectAll(".bar-culum-original")
      .data(storyAgeData)
    .enter()
      .append("rect")
      .attr("class", "bar-culum-original")
      .attr("x", function(d) { return xBarChart(Math.min(0, d.originalculum)) ; })
      .attr("width", function(d) { return Math.abs(xBarChart(d.originalculum) - xBarChart(0)); })
      .attr("y", function(d) { return yBarChart(1); })
      .attr("height",  heightBarChart)
      .style("fill", function(d) { return d.originalculum > 0 ? bananaColours.teal30 : bananaColours.orange30 ; })
      .style("fill-opacity", 0.7)
      .style("stroke-opacity", 0.7);

    storyGBarChart.selectAll(".bar-culum-alternative")
      .data(storyAgeData)
    .enter()
      .append("rect")
      .attr("class", "bar-culum-alternative")
      .attr("x", function(d) { return xBarChart(Math.min(0, d.alternativeculum)) ; })
      .attr("width", function(d) { return Math.abs(xBarChart(d.alternativeculum) - xBarChart(0)); })
      .attr("y", function(d) { return yBarChart(1); })
      .attr("height",  heightBarChart)
      .style("fill", function(d) { return d.alternativeculum > 0 ? bananaColours.teal30 : bananaColours.orange30 ; })
      .style("fill-opacity", 0.7)
      .style("stroke-opacity", 0.7);

    var counter = d3.selectAll(".bar-chart").append("g")
      .attr("class", "counter")
      .attr("transform", "translate(" + xBarChart(0) + ", 10 )");  //start at zero on the x axis

    counter.append("text")
      .attr("class", "counter-label")
      .text("$0")
      .attr("text-anchor", "middle")
      .attr("dy", -20);

    d3.selectAll(".bar-chart").append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + yBarChart(0) + ")")
      .call(xAxisBarChart);

    d3.selectAll(".bar-chart").append("g")
      .attr("class", "axis axis--y")
      .attr("transform", "translate(" + xBarChart(0) + ",0)")
      .call(yAxisBarChart);

  });//story

  ////////////////////////////////////////////////
  // UPDATE THE CHARTS WHEN THE BUTTON IS CLICKED
  ////////////////////////////////////////////////



  // update story

  function changeCharts() {

    console.log ( storyNextStep + " : " + storySteps.length);
    var nextPara = "";
    var nextParaColour = "";

    if (storyNextStep == storySteps.length ) {  //show the culumative effect of the investment

    storyBarChart.selectAll("rect")
        .transition().duration(300)
        .style("fill", bananaColours.green)
        .style("fill-opacity", 1)
        .style("stroke-opacity", 1);

      var totalGain = (allStoryData[allStoryData.length - 1].alternativeculum) + Math.abs(allStoryData[allStoryData.length - 1].originalculum);

      nextPara = "#story-step-conclusion" ;
      nextParaColour =  bananaColours.greyLight;

      d3.select("#story-step-button").text("Complete").attr("disabled", "disabled");

      console.log("end of data");

    } else if (storySteps[storyNextStep].life == "original" ) { //part of the orginal story

      nextPara = "#story-step-" + storySteps[storyNextStep].age;
      nextParaColour = bananaColours.greyLight;

      updateBarChart(allStoryData, storySteps[storyNextStep].age, ".bar-culum-original", "story");
      updateCount(allStoryData, storySteps[storyNextStep].age, ".counter", "original", "story");

      storyLineChart.selectAll("#clip-original-line").selectAll("rect")
        .transition().duration(transitionDuration)
        .attr("width", xLineChart(storySteps[storyNextStep].age) );

      //create circle for lift event

      storyGLineChart.selectAll(".circle-label, .label-line").remove();

      var lifeEvent = storyGLineChart.selectAll(".life-event")
        .data(allStoryData)
        .enter()
        .filter(function (d) { return d.age == storySteps[storyNextStep].age ;});

      lifeEvent.append("g")
        .attr("class", "life-event")
        .attr("transform", function (d) { return "translate(" + xLineChart(d.age) + ",0)" ; } );

      lifeEvent.append("text")
        .attr("x", function(d) { return xLineChart(d.age); })
        .attr("y", 1 )
        .attr("class", "circle-label")
        .text(function(d) { return d.events; } )
        .attr("text-anchor", textAnchorPosition ) ;

      lifeEvent.append("line")
        .attr("class", "label-line")
        .attr("x1", function(d) { return xLineChart(d.age); } )
        .attr("y1", 5)
        .attr("x2", function(d) { return xLineChart(d.age); } )
        .attr("y2", function(d) { return yLineChart(d.originalnet) - circleRadius; } )
        .style("stroke-opacity", 0);

      lifeEvent.append("circle")
        .attr("id", function (d) { return "circle-original-" + d.age ; } )
        .attr("class", "circle-original")
        .attr("cx", function (d) { return xLineChart(d.age); } )
        .attr("cy", function (d) { return yLineChart(d.originalnet); } )
        .attr("r", circleRadius)
        .style("stroke-opacity", 0.0)
        .style("fill-opacity", 0.0);

      storyGLineChart.select("#circle-original-" + storySteps[storyNextStep].age)
        .transition()
        .duration(transitionDuration)
        .style("stroke-opacity", 1)
        .style("fill-opacity", 1);

      storyGLineChart.select(".label-line")
        .transition()
        .duration(transitionDuration)
        .style("stroke-opacity", 1);


    } else if ( storySteps[storyNextStep].life == "alternative" ) {

      nextPara = "#story-step-alternative-" + storySteps[storyNextStep].age;
      nextParaColour = bananaColours.greyLight;

      //fade the original line and bar

      storyGBarChart.select(".bar-culum-original").transition(1000)
        .style("fill-opacity", 0.2)
        .style("stroke-opacity", 0.2);

      storyLineChart.select(".line-original").transition(1000)
        .style("stroke-opacity", 0.2);

      storyLineChart.select(".area-original").transition(1000)
        .style("fill-opacity", 0);

      //remove the original circles and life events
      storyGLineChart.selectAll("circle").remove();
      storyGLineChart.selectAll(".circle-label").remove();
      storyGLineChart.selectAll(".label-line").remove();

      updateBarChart(allStoryData, storySteps[storyNextStep].age, ".bar-culum-alternative", "story");
      updateCount(allStoryData, storySteps[storyNextStep].age, ".counter", "alternative", "story");

      storyLineChart.selectAll("#clip-alternative-line").selectAll("rect")
        .transition().duration(transitionDuration)
        .attr("width", function() {
            return storyNextStep == (storySteps.length - 1)
                    ? width
                    : xLineChart(storySteps[storyNextStep].age) ;
          });

      storyLineChart.select("ellipse")
        .style("stroke-opacity",0.8);


    };

    //scroll to the related paragraph
    d3.selectAll(".side-text").selectAll("p").style("background-color", "transparent");


    // highlight the related papagraph

    d3.select(nextPara).style("background-color", nextParaColour);

    //get ready for next click
    storyNextStep = storyNextStep + 1;
  };

  ////////////////////////////////////////////////


  ////////////////////////////////////////////////
  // update the bar chart with the new cumulative values
  ////////////////////////////////////////////////

  function updateBarChart(data, currentAge, chartClass) {
    var oldValue;
    var currentAgeData;
    var chartID = "#bar-chart";

    var currentChart =   d3.selectAll(chartID).selectAll(chartClass);
    var culumValue = chartClass == ".bar-culum-original" ? "originalculum" : "alternativeculum" ;

    currentChart.property("__oldData__", function (d) {
      oldValue = d[culumValue];
      //return d.alternativeculum;
    } );

    currentAgeData = data.filter(function (d) {return d.age == currentAge; } );

      if (oldValue < 0 && currentAgeData[0][culumValue] > 0){

        //shrink the bar chart to the 0 axis - ie move X to 0 and reduce width to 0
        currentChart.data(currentAgeData)
        .transition().duration(transitionDuration/2)
        .attr("width", 0)
        .attr("x", function(d) { return xBarChart(0); } );

        //then increase width, and keep X at 0

        currentChart.transition().duration(transitionDuration/2).delay(transitionDuration/2)
        .attr("width", function(d) { return Math.abs(xBarChart(d[culumValue]) - xBarChart(0)); } )
        .style("fill", function(d) { return d[culumValue] > 0 ? bananaColours.teal30 : bananaColours.orange30 ; });

      } else {

      currentChart.data(currentAgeData)
      .transition().duration(transitionDuration)
        .attr("x", function(d) { return xBarChart(Math.min(0, d[culumValue])); })
        .attr("width", function(d) { return Math.abs(xBarChart(d[culumValue]) - xBarChart(0)); } )
        .style("fill", function(d) { return d[culumValue] > 0 ? bananaColours.teal30 : bananaColours.orange30 ; });

      };



  };


  function updateCount(data, currentAge, countClass, journey) {

    var currentAgeData = data.filter(function (d) {return d.age == currentAge; } );
    var culumValue = journey == "original" ? "originalculum" : "alternativeculum" ;
    var minimumAlternativeAge = d3.min(storySteps.filter(function(d){ return d.life ==  "alternative"; }), function(d) { return d.age; });
    var chartID = "#bar-chart";
    var currentChart =   d3.selectAll(chartID).selectAll(countClass);

  currentChart.data(currentAgeData)
      .transition()
      .duration(function (d) { return culumValue == "alternativeculum" && currentAge <= minimumAlternativeAge ? 0 : transitionDuration} )
      .attr("transform", function(d) { return "translate(" + xBarChart(d[culumValue]) + ", 10 )" ; });

    currentChart.selectAll("text")
      .data(currentAgeData)
    .text(function (d) {

      var culumText = "";

      if (d[culumValue] < 0 ) {
        culumText = "$" + formatNumberWithCommas(Math.abs(d[culumValue])) + " cost";
      } else {
        culumText = "$" + formatNumberWithCommas(Math.abs(d[culumValue])) + " contribution";
      };
      return culumText;
    });

  }

  function convertTextToNumbers(d) {
    d.age = +d.age;
    d.originalnet = +d.originalnet;
    d.originalculum = +d.originalculum;
    d.alternativenet = +d.alternativenet;
    d.alternativeculum = +d.alternativeculum;
    d.diffculum = +d.diffculum;
    return d;
  };

  function textAnchorPosition(d) {
    var textPosition;
    if (xLineChart(d.age) > (width * 0.9)) { textPosition = "end"; }
    else if (xLineChart(d.age) < (width * 0.1)) { textPosition = "start"; }
    else { textPosition = "middle"; };
    return textPosition;
  };


  // Layout inspired from Tom Shanley ( http://bl.ocks.org/tomshanley )
