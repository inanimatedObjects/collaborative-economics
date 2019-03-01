//////////////////////// CHART DIMENSIONS //////////////////
/////// LINE CHART /////////
const marginLineChart = {top: 50, right: 0, bottom: 50, left: 60};

const widthLineChart = 550 - marginLineChart.right - marginLineChart.left,
        heightLineChart = 300 - marginLineChart.top - marginLineChart.bottom,
        circleRadius = 6;

/////// BAR CHART /////////
const marginBarChart = {top: 40, right: 10, bottom: 20, left: 70};

const widthBarChart = 200 - marginBarChart.right - marginBarChart.left,
        heightBarChart = 500 - marginBarChart.top - marginBarChart.bottom;




//////////////////////////// D3 SCALES /////////////////////////////////
/////// LINE CHART /////////
const xLineChart = d3.scaleLinear().rangeRound([0, widthLineChart ]),
        yLineChart = d3.scaleLinear().rangeRound([heightLineChart, 0]);

const xAxisLineChart = d3.axisBottom(xLineChart).ticks(10).tickSize(2),
        yAxisLineChart = d3.axisLeft(yLineChart).ticks(4).tickSize(2);

/////// BAR CHART /////////
const xBarChart = d3.scaleLinear().rangeRound([0, widthBarChart]),
        yBarChart = d3.scaleLinear().rangeRound([heightBarChart, 0]);

const xAxisBarChart = d3.axisBottom(xBarChart).ticks(0).tickSize(0),
        yAxisBarChart = d3.axisLeft(yBarChart).ticks(10).tickSize(2);

// banding both scenarios for easy comparison
const x0 = d3.scaleBand()
                .rangeRound([0, widthBarChart])
                .paddingInner(0.15),   // spacing between groups of bars
        x1 = d3.scaleBand()
                .padding(0.05);   // spacing between bars grouped together


/////// COLOR SCALE /////////
const colorScale = d3.scaleOrdinal().range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);


////////////////// SVG, Gs ////////////////////////////////////////////
/////// LINE CHART /////////
const storyLineChart = d3.select("#line-chart").append("svg")
        .attr("width", widthLineChart + marginLineChart.left + marginLineChart.right)
        .attr("height", heightLineChart + marginLineChart.top + marginLineChart.bottom);

const storyGLineChart = storyLineChart.append("g")
        .attr("class", "line-chart")
        .attr("transform", "translate(" + marginLineChart.left + "," + marginLineChart.top + ")");

/////// BAR CHART /////////
const storyBarChart = d3.select("#bar-chart").append("svg")
        .attr("widthBarChart", widthBarChart + marginBarChart.left + marginBarChart.right)
        .attr("height", heightBarChart + marginBarChart.top + marginBarChart.bottom);
        // .attr("id", "story-bar-chart");

const storyGBarChart = storyBarChart.append("g")
        .attr("class", "bar-chart")
        .attr("transform", "translate(" + marginBarChart.left + "," + marginBarChart.top + ")");



////////////////////// LINE CHART FUNCTIONS//////////////////////
const lineOriginal = d3.line()
        .x((d) =>  xLineChart(d.per))
        .y((d) =>  yLineChart(d.exclusiveNet))
        .curve(d3.curveCardinal.tension(0.5));

const lineAlternative = d3.line()
        .x((d) =>  xLineChart(d.per))
        .y((d) =>  yLineChart(d.sharedNet))
        .curve(d3.curveCardinal.tension(0.5));

const lineProjected = d3.line()
        .x((d) => xLineChart(d.per))
        .y((d) => yLineChart(d.projectedAmount))
        .curve(d3.curveCardinal.tension(0.5));

const areaOriginal = d3.area()
        .x((d) => xLineChart(d.per))
        .y1((d) => yLineChart(d.exclusiveNet))
        .y0((d) => yLineChart(0))
        .curve(d3.curveCardinal.tension(0.5));

const areaAlternative = d3.area()
        .x((d) => xLineChart(d.per))
        .y1((d) => yLineChart(d.sharedNet))
        .y0((d) => yLineChart(0))
        .curve(d3.curveCardinal.tension(0.5));



////////////////////// STORY VARIABLES//////////////////////////
const storySteps = [
        {life: "exclusive", per: 0},
        {life: "exclusive", per: 1},
        // {life: "exclusive", per: 2},
        // {life: "exclusive", per: 3},
        {life: "exclusive", per: 4},
        // {life: "exclusive", per: 5},
        {life: "exclusive", per: 6},
        // {life: "exclusive", per: 7},
        {life: "exclusive", per: 8},
        {life: "exclusive", per: 12},
        {life: "exclusive", per: 13},
        {life: "exclusive", per: 17},
        {life: "exclusive", per: 20},
        {life: "shared", per: 0},
        {life: "shared", per: 1},
        {life: "shared", per: 2},
        // {life: "shared", per: 3},
        {life: "shared", per: 4},
        // {life: "shared", per: 5},
        // {life: "shared", per: 6},
        {life: "shared", per: 7},
        // {life: "shared", per: 8},
        {life: "shared", per: 9},
        {life: "shared", per: 11},
        // {life: "shared", per: 13},
        {life: "shared", per: 18},
        {life: "shared", per: 20},
];  // make sure pers align with chapter IDs in the table of contents.

let transitionDuration = 1000;

let storyNextStep = 0;
let storyPreviousStep = storyNextStep > 0 ? storyNextStep - 1 : 0;

let allStoryData = {};
let storydateData;

////////////////////// LOAD DATA ///////////////////////////////////

d3.dsv(",", "bananaData.csv", (d, i, columns)  => {
        for (var i = 1, n = columns.length; i < n; ++i)
                d[columns[i]] = +d[columns[i]];
        // d.exclusiveEvents = +d.exclusiveEvents;
        return d;
}).then( (dataStory) => {
        console.log("***new loaded data: ", dataStory);

        const keys = dataStory.columns.slice(1);
        console.log('****** keys: ', keys);

        allStoryData = dataStory;

        const timePeriods = d3.max(dataStory, (d) => +d.per) ;
                console.log("***timePeriods :", timePeriods);

        const maxY = d3.max([
                d3.max(dataStory, (d) => +d.exclusiveNet ),
                d3.max(dataStory, (d) => +d.sharedNet)
        ]);
                console.log("***maxY :", maxY);

        const minY = d3.max([
                d3.min(dataStory, (d) => +d.exclusiveNet),
                d3.min(dataStory, (d) => +d.sharedNet),
        ]);
                console.log("***minY :", minY);


        /////// LINE CHART SCALES /////////
        xLineChart.domain([ 0, timePeriods ]);    //set the domains using the loaded data
        yLineChart.domain([ -maxY, maxY ]);


        /////// BAR CHART SCALES /////////
        xBarChart.domain([ 0, 1 ]);
        yBarChart.domain([0, d3.max(dataStory, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

        console.log("yBarChart domin w Keys", yBarChart.domain());

        yBarChart.domain([
                d3.min([
                        d3.min(dataStory, (d) => +d.exclusiveAcc ),
                        d3.min(dataStory, (d) => +d.sharedAcc )
                ]),
                d3.max([
                        d3.max(dataStory, (d) => +d.exclusiveAcc ),
                        d3.max(dataStory, (d) => +d.sharedAcc )
                ])
        ]);
        console.log("yBarChart domin w PROPERTIES: ", yBarChart.domain());
                // console.log("+++exclMinAcc: ", d3.min(dataStory, (d) => d.exclusiveAcc ))
                // console.log("+++exclMaxAcc: ", d3.max(dataStory, (d) => d.exclusiveAcc ))
                // console.log("--------------------------------------------")
                // console.log("+++sharedMinAcc: ", d3.min(dataStory, (d) => d.sharedAcc))
                // console.log("+++sharedMaxAcc: ", d3.max(dataStory, (d) => d.sharedAcc))

        /////////////////// DRAW LINE CHART ///////////////////////////////////////
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


        /////////////// DRAW AREA W/ FILL GRADIENTS //////////////////////
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
                        {offset: "100%", color: '#8f0500'},
                ]).enter()
        .append("stop")
                .attr("offset", function(d) { return d.offset; })
                .attr("stop-color", function(d) { return d.color; });


        let storyOriginalArea = storyGLineChart.append("path")
                .datum(dataStory)
                .attr("clip-path", "url(#clip-original-line)")
                .attr("class", "area-original")
                .attr("d", areaOriginal)
                .style("fill", "url(#area-gradient)");

        let storyAlternativeArea = storyGLineChart.append("path")
                .datum(dataStory)
                .attr("clip-path", "url(#clip-alternative-line)")
                .attr("class", "area-alternative")
                .attr("d", areaAlternative)
                .style("fill", "url(#area-gradient)");


        ////////// DRAW AXES ////////////////
        xAxisLineChart.ticks(xLineChart.domain()[1]/2);    //tick every 2 years on the X axis
        yAxisLineChart.ticks(yLineChart.domain()[1]/50);    //tick every 50k on the y axis

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
                .attr("refX", "6")
                .attr("refY", "6")
                .attr("orient", "auto")
                .append("svg:path")
                .attr("d", "M1,1 L8,6 L1,11 ");

        let arrow = d3.selectAll(".line-chart").append("g")
                .attr("class", "axis-arrow")
                .attr("transform", "translate( -8 , 0)")
                .call(yAxisLineChart);

        arrow.append("line")
                .attr("class", "axis-arrow")
                .attr("x1", 0)
                .attr("y1", yLineChart(0))
                // .attr("y1", -20)
                .attr("x2", 0)
                .attr("y2", heightLineChart + 15)
                .attr("marker-end", "url(#arrowhead-bottom)")

        arrow.append("line")
                .attr("class", "axis-arrow")
                .attr("x1", 0)
                .attr("y1", yLineChart(50))
                .attr("x2", 0)
                .attr("y2", -15)
                .attr("marker-end", "url(#arrowhead-bottom)")

        //draw the original line
        let storyOriginalPath = storyGLineChart.append("path")
                .datum(dataStory)
                .attr("clip-path", "url(#clip-original-line)")
                .attr("class", "line-original")
                .attr("d", lineOriginal);

        let altPathData = dataStory;

        let alternativePath = storyGLineChart.append("path")
                .datum(altPathData)
                .attr("clip-path", "url(#clip-alternative-line)")
                .attr("class", "line-alternative")
                .attr("d", lineAlternative);

        //projected data

        let projectedData = [];
        let storyMaxdate = dataStory[dataStory.length-1].per;     // NM: combine/condense
        let maxdate = xLineChart.domain()[1];
        let storyLastAmount = dataStory[dataStory.length-1].sharedNet;

        for (storyMaxdate; storyMaxdate < maxdate; storyMaxdate++) {
                projectedData.push({per: storyMaxdate, projectedAmount: storyLastAmount});
        };

        let projectedPath = storyGLineChart.append("path")
                .datum(projectedData)
                .attr("clip-path", "url(#clip-alternative-line)")
                .attr("class", "line-projected")
                .attr("d", lineProjected);

        // draw ellipse highlighter for later

        storyGLineChart.append("ellipse")
                .attr("class", "call-out")
                .attr("cx", xLineChart(5))
                .attr("cy", yLineChart(82))
                .attr("rx", 50)
                .attr("ry", 40)
                .style("fill-opacity", 0)
                .style("stroke-opacity", 0);


///////////////////// DRAW BAR CHART //////////////////////////
        storydateData = allStoryData.filter((d) => { return d.per === storySteps[storyNextStep].per; } );
                // console.log("***** storydateData: ", storydateData);
                // console.log("***** storySteps: ", storySteps);

        storyGBarChart.selectAll(".bar-culum-original")
                .data(storydateData)
                .enter()
        .append("rect")
                .attr("class", "bar-culum-original")
                .attr("x", 0)
                .attr("y", function(d) { return yBarChart(d.exclusiveAcc); })
                .attr("width",  widthBarChart)
                .attr("height", function(d) { return heightBarChart - yBarChart(d.exclusiveAcc); })
                .style("fill", function(d) { return d.exclusiveAcc > 0 ? "#ff2600" : "#fffac7" ; })
                .style("fill-opacity", 0.7)
                .style("stroke-opacity", 0.9);


        storyGBarChart.selectAll(".bar-culum-alternative")
                .data(storydateData)
                .enter()
        .append("rect")
                .attr("class", "bar-culum-alternative")
                .attr("y", function(d) { return yBarChart(Math.min(d.sharedAcc, 0)) ; })
                .attr("height", function(d) { return Math.abs(yBarChart(d.sharedAcc) - yBarChart(0)); })
                .attr("x", function(d) { return xBarChart(0); })
                .attr("width",  widthBarChart)
                .style("fill", function(d) { return d.sharedAcc > 0 ? "blue" : "yellow"; })
                .style("fill-opacity", 0.7)
                .style("stroke-opacity", 0.7);

        const counter = d3.selectAll(".bar-chart").append("g")
                .attr("class", "counter")
                .attr("transform", "translate(" + xBarChart(0) + ", 10 )");  //start at zero on the x axis

        counter.append("text")
                .attr("class", "counter-label")
                .text("banana-boat bankroll")
                .attr("text-anchor", "start")
                .attr("dy", -30);

        d3.selectAll(".bar-chart").append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(-8," + yBarChart(0) + ")")
                .call(xAxisBarChart);

        d3.selectAll(".bar-chart").append("g")
                .attr("class", "axis axis--y")
                .attr("transform", "translate(" + xBarChart(-0.07) + ",0)")
                .call(yAxisBarChart);

});



///////////UPDATE CHARTS ON STORY NAV CLICKS ///////////////////
function changeCharts() {
        console.log ( storyNextStep + " : " + storySteps.length);

        let nextPara = "";
        let nextParaColour = "";

        if (storyNextStep == storySteps.length ) {  //show the culumative upon final step
                storyBarChart.selectAll("rect")
                        .transition().duration(500)
                        .style("fill", "cornflowerblue")
                        .style("fill-opacity", 1)
                        .style("stroke-opacity", 1);

                let totalGain = (allStoryData[allStoryData.length - 1].sharedAcc) + Math.abs(allStoryData[allStoryData.length - 1].exclusiveAcc);

                nextPara = "#story-step-conclusion" ;
                nextParaColour =  "grey";

                d3.select("#story-step-forward-button").text("Complete").attr("disabled", "disabled");

                console.log("end of data");

        } else if (storySteps[storyNextStep].life === "exclusive" ) { //exclusive ownership route

                nextPara = "#story-step-" + storySteps[storyNextStep].per;
                nextParaColour = "teal";

                updateBarChart(allStoryData, storySteps[storyNextStep].per, ".bar-culum-original", "story");
                updateCount(allStoryData, storySteps[storyNextStep].per, ".counter", "original", "story");

                // counter.append("text")
                //         .attr("class", "counter-label")
                //         .text((d) => { return d.exclusiveAcc > 0 ? "banana bankroll" : "banana broke"; })
                //         // .text("bananas!!")
                //         .attr("text-anchor", "start")
                //         .attr("dy", -30);

                storyLineChart.selectAll("#clip-original-line").selectAll("rect")
                        .transition().duration(transitionDuration)
                        .attr("width", xLineChart(storySteps[storyNextStep].per) );

                //create circle for lift event
                storyGLineChart.selectAll(".circle-label, .label-line").remove();

                let exclLifeEvent = storyGLineChart.selectAll(".life-event")
                        .data(allStoryData).enter()
                        .filter(function (d) { return d.per == storySteps[storyNextStep].per ;});

                exclLifeEvent.append("g")
                        .attr("class", "life-event")
                        .attr("transform", function (d) { return "translate(" + xLineChart(d.per) + ",0)" ; } );

                exclLifeEvent.append("text")
                        .attr("x", function(d) { return xLineChart(d.per); })
                        .attr("y", 1 )
                        .attr("class", "circle-label")
                        .text(function(d) { return (d.exclusiveEvents); } )
                        .text( function (d) { return "( " + d.cx + ", " + d.cy +" )"; })
                        // .text(function(d) { return d.per; } )
                        .attr("text-anchor", textAnchorPosition ) ;

                exclLifeEvent.append("line")
                        .attr("class", "label-line")
                        .attr("x1", function(d) { return xLineChart(d.per); } )
                        .attr("y1", 5)
                        .attr("x2", function(d) { return xLineChart(d.per); } )
                        .attr("y2", function(d) { return yLineChart(d.exclusiveNet) - circleRadius; } )
                        .style("stroke-opacity", 0);

                exclLifeEvent.append("circle")
                        .attr("id", function (d) { return "circle-original-" + d.per ; } )
                        .attr("class", "circle-original")
                        .attr("cx", function (d) { return xLineChart(d.per); } )
                        .attr("cy", function (d) { return yLineChart(d.exclusiveNet); } )
                        .attr("r", circleRadius)
                        .style("stroke-opacity", 0.0)
                        .style("fill-opacity", 0.0);

                storyGLineChart.select("#circle-original-" + storySteps[storyNextStep].per)
                        .transition()
                        .duration(transitionDuration)
                        .style("stroke-opacity", 1)
                        .style("fill-opacity", 1);

                storyGLineChart.select(".label-line")
                        .transition()
                        .duration(transitionDuration)
                        .style("stroke-opacity", 1);


        } else if ( storySteps[storyNextStep].life == "shared" ) {

                nextPara = "#story-step-alternative-" + storySteps[storyNextStep].per;
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
                // storyGLineChart.selectAll(".call-out").remove();

                updateBarChart(allStoryData, storySteps[storyNextStep].per, ".bar-culum-alternative", "story");
                updateCount(allStoryData, storySteps[storyNextStep].per, ".counter", "shared", "story");

                storyLineChart.selectAll("#clip-alternative-line").selectAll("rect")
                        .transition().duration(transitionDuration)
                        .attr("width", function() {
                    return storyNextStep == (storySteps.length - 1)
                            ? width
                            : xLineChart(storySteps[storyNextStep].per) ;
                  });

                  let sharedLifeEvent = storyGLineChart.selectAll(".life-event")
                          .data(allStoryData)
                          .enter()
                          .filter(function (d) { return d.per == storySteps[storyNextStep].per ;});

                  sharedLifeEvent.append("g")
                          .attr("class", "life-event")
                          .attr("transform", function (d) { return "translate(" + xLineChart(d.per) + ",0)" ; } );

                  sharedLifeEvent.append("text")
                          .attr("x", function(d) { return xLineChart(d.per); })
                          .attr("y", 1 )
                          .attr("class", "circle-label")
                          .text(function(d) { return d.sharedEvents; } )
                          .attr("text-anchor", textAnchorPosition ) ;

                  sharedLifeEvent.append("line")
                          .attr("class", "label-line")
                          .attr("x1", function(d) { return xLineChart(d.per); } )
                          .attr("y1", 5)
                          .attr("x2", function(d) { return xLineChart(d.per); } )
                          .attr("y2", function(d) { return yLineChart(d.sharedNet) - circleRadius; } )
                          .style("stroke-opacity", 0);

                  sharedLifeEvent.append("circle")
                          .attr("id", function (d) { return "circle-original-" + d.per ; } )
                          .attr("class", "circle-original")
                          .attr("cx", function (d) { return xLineChart(d.per); } )
                          .attr("cy", function (d) { return yLineChart(d.sharedNet); } )
                          .attr("r", circleRadius)
                          .style("stroke-opacity", 0.0)
                          .style("fill-opacity", 0.0);


                storyLineChart.select("ellipse")
                        .transition().duration(transitionDuration * 4)
                        .style("fill-opacity",0.1)
                        .style("stroke-opacity",0.8);

        };

        //scroll to the related paragraph
        d3.selectAll(".side-text").selectAll("p").style("background-color", "transparent");


        // highlight the related papagraph
        d3.select(nextPara).style("background-color", nextParaColour);

        //get ready for next click
        storyNextStep = storyNextStep + 1;

};



//////////////// UPDATE BAR CHART WITH NEW CUMULATIVE//////////////////////////

function updateBarChart(data, currentdate, chartClass) {
        let oldValue;
        let currentdateData;
        let chartID = "#bar-chart";

        let currentChart =   d3.selectAll(chartID).selectAll(chartClass);
        let culumValue = chartClass === ".bar-culum-original" ? "exclusiveAcc" : "sharedAcc" ;

        currentChart.property("__oldData__", function (d) {
        oldValue = d[culumValue];
        //return d.sharedAcc;
        } );

        currentdateData = data.filter(function (d) {return d.per === currentdate; } );

        if (oldValue < 0 && currentdateData[0][culumValue] > 0){

        //shrink the bar chart to the 0 axis - ie move X to 0 and reduce width to 0
        currentChart.data(currentdateData)
                .transition().duration(transitionDuration/2)
                .attr("width", 0)
                .attr("x", function(d) { return xBarChart(0); } );

        //then increase width, and keep X at 0
        currentChart.transition().duration(transitionDuration/2).delay(transitionDuration/2)
                .attr("width", function(d) { return Math.abs(xBarChart(d[culumValue]) - xBarChart(0)); } )
                .style("fill", function(d) { return d[culumValue] > 0 ? "green" : "orange" ; });

        } else {

        currentChart.data(currentdateData)
                .transition().duration(transitionDuration)
                .attr("x", function(d) { return xBarChart(Math.min(0, d[culumValue])); })
                .attr("width", function(d) { return Math.abs(xBarChart(d[culumValue]) - xBarChart(0)); } )
                .style("fill", function(d) { return d[culumValue] > 0 ? "#ff2600" : "#fffac7"; });
        };
};

function updateCount(data, currentdate, countClass, journey) {

        let currentdateData = data.filter(function (d) {return d.per == currentdate; } );
        let culumValue = journey == "exclusive" ? "exclusiveAcc" : "sharedAcc" ;
        let minimumAlternativedate = d3.min(storySteps.filter(function(d){ return d.life ===  "shared"; }), function(d) { return d.per; });
        let chartID = "#bar-chart";
        let currentChart =   d3.selectAll(chartID).selectAll(countClass);

        currentChart.data(currentdateData)
                .transition()
                .duration(function (d) { return culumValue == "sharedAcc" && currentdate <= minimumAlternativedate ? 0 : transitionDuration} )
                .attr("transform", function(d) { return "translate(" + xBarChart(d[culumValue]) + ", 10 )" ; });

        currentChart.selectAll("text")
                .data(currentdateData)
                .text(function (d) {
                        let culumText = "";
                        if (d[culumValue] < 0 ) {
                                culumText = "$" + formatNumberWithCommas(Math.abs(d[culumValue])) + " cost";
                        } else {
                                culumText = "$" + formatNumberWithCommas(Math.abs(d[culumValue])) + " contribution";   };
                        return culumText;
                });
}

function convertTextToNumbers(d) {
        d.year = new Date(+d.year, 5, 1); // convert year column to Date
        d.date = +d.date;
        // d.per = +d.per;
        // d.exclusiveEvents = d.exclusiveEvents;
        // d.exclusiveBal  = +d.exclusiveBal;
        // d.exclCapex = +d.exclCapex;
        // d.exclSavingsRate = +d.exclSavingsRate;
        // d.exclBurn = +d.exclBurn;
        // d.exclusiveNet = +d.exclusiveNet;
        // d.exclusiveAcc = +d.exclusiveAcc;
        // d.sharedEvents = d.sharedEvents;
        // d.sharedBal  = +d.sharedBal;
        // d.sharedCapex = +d.sharedCapex;
        // d.sharedSavingsRate = +d.sharedSavingsRate;
        // d.sharedBurn = +d.sharedBurn;
        // d.sharedNet = +d.sharedNet;
        // d.sharedAcc = +d.sharedAcc;
        // d.diffCapex = +d.diffCapex;
        // d.diffSavingsRate = +d.diffSavingsRate;
        // d.diffBurn = +d.diffBurn;
        // d.diffNet = +d.diffNet;
        // d.diffAcc = +d.diffAcc;
        return d;
};

function textAnchorPosition(d) {
        let textPosition;
        if (xLineChart(d.per) > (widthLineChart* 0.9)) {
                textPosition = "end";
        } else if (xLineChart(d.per) < (widthLineChart* 0.1)) {
                textPosition = "start";
        } else {
                textPosition = "middle";
        };
        return textPosition;
};


  // Layout inspired from Tom Shanley ( http://bl.ocks.org/tomshanley )



  // var svgBar = d3.select("svg"),
  //     marginBarChart = {top: 20, right: 20, bottom: 30, left: 40},
  //     width = +svgBar.attr("width") - marginBarChart.left - marginBarChart.right,
  //     height = +svgBar.attr("height") - marginBarChart.top - marginBarChart.bottom,
  //     gBar = svgBar.append("g").attr("transform", "translate(" + marginBarChart.left + "," + marginBarChart.top + ")");
