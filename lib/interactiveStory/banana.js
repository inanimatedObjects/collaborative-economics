
////////////////////////////////// STORY VARIABLES//////////////////////////////////////
const storySteps = [
        {life: "exclusive", date: 0},
        {life: "exclusive", date: 2},
        {life: "exclusive", date: 7},
        {life: "exclusive", date: 12},
        {life: "exclusive", date: 13},
        {life: "exclusive", date: 17},
        {life: "exclusive", date: 21},
        {life: "shared", date: 1},
        {life: "shared", date: 8},
        {life: "shared", date: 9},
        {life: "shared", date: 10},
        {life: "shared", date: 11}
];  // make sure dates align with chapter IDs in the table of contents.

let transitionDuration = 1000;

let storyNextStep = 0;
let storyPreviousStep;

let allStoryData = {};
let storydateData;


/////////////////////////////// CHART DIMENSIONS ///////////////////////////////////////////
/////// LINE CHART /////////
const margin = {top: 40, right: 120, bottom: 30, left: 70};
const width = 750 - margin.right - margin.left;
const heightLineChart = 220 - margin.top - margin.bottom;
const circleRadius = 6;

/////// BAR CHART /////////
const marginBarChart = {top: 60, right: 50, bottom: 60, left: 60};
const widthBarChart = 250 - marginBarChart.right - marginBarChart.left;
const heightBarChart = 600 - marginBarChart.top - marginBarChart.bottom;



//////////////////////////// D3 SCALES /////////////////////////////////
/////// LINE CHART /////////
const xLineChart = d3.scaleLinear().range([0, width]);
const yLineChart = d3.scaleLinear().range([heightLineChart, 0]);

const xAxisLineChart = d3.axisBottom(xLineChart).tickSize(5);
const yAxisLineChart = d3.axisLeft(yLineChart).ticks(6).tickSize(2);

/////// BAR CHART /////////
const xBarChart = d3.scaleLinear().range([0, widthBarChart]);
const yBarChart = d3.scaleLinear().range([heightBarChart, 0]);
// const yBarChart = d3.scaleLinear().range([100, -100]);

const xAxisBarChart = d3.axisBottom(xBarChart).ticks(3).tickSize(6);
const yAxisBarChart = d3.axisLeft(yBarChart).ticks(4).tickSize(3);



////////////////////// LINE CHART FUNCTIONS//////////////////////
const lineOriginal = d3.line()
        .x((d) =>  xLineChart(d.date))
        .y((d) =>  yLineChart(d.exclusiveNet))
        .curve(d3.curveCardinal.tension(0.5));

const lineAlternative = d3.line()
        .x((d) =>  xLineChart(d.date))
        .y((d) =>  yLineChart(d.sharedNet))
        .curve(d3.curveCardinal.tension(0.5));

const lineProjected = d3.line()
        .x((d) => xLineChart(d.date))
        .y((d) => yLineChart(d.projectedAmount))
        .curve(d3.curveCardinal.tension(0.5));

const areaOriginal = d3.area()
        .x((d) => xLineChart(d.date))
        .y1((d) => yLineChart(d.exclusiveNet))
        .y0((d) => yLineChart(0))
        .curve(d3.curveCardinal.tension(0.5));

const areaAlternative = d3.area()
        .x((d) => xLineChart(d.date))
        .y1((d) => yLineChart(d.sharedNet))
        .y0((d) => yLineChart(0))
        .curve(d3.curveCardinal.tension(0.5));



////////////////// SVG, Gs ////////////////////////////////////////////
/////// LINE CHART /////////
const storyLineChart = d3.select("#line-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", heightLineChart + margin.top + margin.bottom);

const storyGLineChart = storyLineChart.append("g")
        .attr("class", "line-chart")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


/////// BAR CHART /////////
const storyBarChart = d3.select("#bar-chart").append("svg")
        .attr("widthBarChart", widthBarChart + marginBarChart.left + marginBarChart.right)
        .attr("height", heightBarChart + marginBarChart.top + marginBarChart.bottom);
        //.attr("id", "story-bar-chart");

const storyGBarChart = storyBarChart.append("g")
        .attr("class", "bar-chart")
        .attr("transform", "translate(" + marginBarChart.left + "," + marginBarChart.top + ")");



////////////////////// LOAD DATA /////////////////////////////////////////////
d3.csv("bananaData.csv", convertTextToNumbers, function(error1, dataStory) {
        if (error1) {throw error1;};

        var maxY = d3.max([
                Math.abs(d3.min(dataStory, (d) => d.exclusiveNet)),
                Math.abs(d3.min(dataStory, (d) => d.sharedNet)),
                d3.max(dataStory, (d) => d.exclusiveNet ),
                d3.max(dataStory, (d) => d.sharedNet)
        ]);
                // console.log("***maxY :", maxY);

        /////// LINE CHART /////////
        xLineChart.domain([ 0, 60 ]);    //set the domains using the loaded data
        yLineChart.domain([ -maxY, maxY ]);


        /////// BAR CHART /////////
        yBarChart.domain([ -maxY, maxY ]);
        // xBarChart.domain([ -maxY, maxY ]);
        // xBarChart.domain([ -100000, 100000 ]);

        // xBarChart.domain([
        //   d3.min([
        //     d3.min(dataStory, (d) => d.exclusiveAcc ),
        //     d3.min(dataStory, (d) => d.sharedAcc )
        //   ]),
        //   d3.max([
        //     d3.max(dataStory, (d) => d.exclusiveAcc ),
        //     d3.max(dataStory, (d) => d.sharedAcc )
        //   ])
        // ]);

        xBarChart.domain([0,1]);

        allStoryData = dataStory;


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


        /////////////////// DRAW AREA W/ FILL GRADIENTS //////////////////////////////////////
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
        {offset: "50%", color: bananaColours.orange30}
        ])
        .enter().append("stop")
        .attr("offset", function(d) { return d.offset; })
        .attr("stop-color", function(d) { return d.color; });


        var storyOriginalArea = storyGLineChart.append("path")
        .datum(dataStory)
        .attr("clip-path", "url(#clip-original-line)")
        .attr("class", "area-original")
        .attr("d", areaOriginal)
        .style("fill", "url(#area-gradient)");

        var storyAlternativeArea = storyGLineChart.append("path")
        .datum(dataStory)
        .attr("clip-path", "url(#clip-alternative-line)")
        .attr("class", "area-alternative")
        .attr("d", areaAlternative)
        .style("fill", "url(#area-gradient)");

        //draw the axes
        xAxisLineChart.ticks(xLineChart.domain()[1]/5); //tick every 5 years on the X axis
        // yAxisLineChart.ticks(yLineChart.domain([-100000,100000]); //tick every 5 years on the X axis

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
                .attr("transform", "translate( -10 , 0)")
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
                .attr("y1", yLineChart(30))
                .attr("x2", 0)
                .attr("y2", -15)
                .attr("marker-end", "url(#arrowhead-bottom)")

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
        var storyMaxdate = dataStory[dataStory.length-1].date;
        var maxdate = xLineChart.domain()[1];
        var storyLastAmount = dataStory[dataStory.length-1].sharedNet;

        for (storyMaxdate; storyMaxdate < maxdate; storyMaxdate++) {
                projectedData.push({date: storyMaxdate, projectedAmount: storyLastAmount});
        };

        var projectedPath = storyGLineChart.append("path")
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
        //Story

        storydateData = allStoryData.filter(function (d) {return d.date == storySteps[storyNextStep].date; } );

        storyGBarChart.selectAll(".bar-culum-original")
                .data(storydateData)
                .enter()
        .append("rect")
                .attr("class", "bar-culum-original")
                // .attr("x", function(d) { return xBarChart(Math.min(0, d.exclusiveAcc)) ; })
                // .attr("widthBarChart", function(d) { return Math.abs(xBarChart(d.exclusiveAcc) - xBarChart(0)); })
                // .attr("y", function(d) { return yBarChart(1); })
                // .attr("height",  heightBarChart)

                .attr("x", function(d) { return xBarChart(1); })
                .attr("width",  widthBarChart)

                .attr("y", function(d) { return xBarChart(Math.min(0, d.exclusiveAcc)) ; })
                .attr("heightBarChart", function(d) { return Math.abs(yBarChart(d.exclusiveAcc) - yBarChart(0)); })
                .style("fill", function(d) { return d.exclusiveAcc > 0 ? bananaColours.teal30 : bananaColours.orange30 ; })
                .style("fill-opacity", 0.7)
                .style("stroke-opacity", 0.7);

        storyGBarChart.selectAll(".bar-culum-alternative")
                .data(storydateData)
                .enter()
        .append("rect")
                .attr("class", "bar-culum-alternative")
                .attr("y", function(d) { return yBarChart(Math.min(d.sharedAcc, 0)) ; })
                .attr("height", function(d) { return Math.abs(yBarChart(d.sharedAcc) - yBarChart(0)); })
                .attr("x", function(d) { return xBarChart(0); })
                .attr("width",  widthtBarChart)
                .style("fill", function(d) { return d.sharedAcc > 0 ? "blue" : "yellow"; })
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

});



///////////UPDATE CHARTS ON STORY NAV CLICKS ///////////////////
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

                var totalGain = (allStoryData[allStoryData.length - 1].sharedAcc) + Math.abs(allStoryData[allStoryData.length - 1].exclusiveAcc);

                nextPara = "#story-step-conclusion" ;
                nextParaColour =  bananaColours.greyLight;

                d3.select("#story-step-forward-button").text("Complete").attr("disabled", "disabled");

                console.log("end of data");

        } else if (storySteps[storyNextStep].life == "exclusive" ) { //part of the orginal story

                nextPara = "#story-step-" + storySteps[storyNextStep].date;
                nextParaColour = bananaColours.greyLight;

                updateBarChart(allStoryData, storySteps[storyNextStep].date, ".bar-culum-original", "story");
                updateCount(allStoryData, storySteps[storyNextStep].date, ".counter", "original", "story");

                storyLineChart.selectAll("#clip-original-line").selectAll("rect")
                .transition().duration(transitionDuration)
                .attr("width", xLineChart(storySteps[storyNextStep].date) );

                //create circle for lift event

                storyGLineChart.selectAll(".circle-label, .label-line").remove();

                var lifeEvent = storyGLineChart.selectAll(".life-event")
                .data(allStoryData)
                .enter()
                .filter(function (d) { return d.date == storySteps[storyNextStep].date ;});

                lifeEvent.append("g")
                .attr("class", "life-event")
                .attr("transform", function (d) { return "translate(" + xLineChart(d.date) + ",0)" ; } );

                lifeEvent.append("text")
                .attr("x", function(d) { return xLineChart(d.date); })
                .attr("y", 1 )
                .attr("class", "circle-label")
                .text(function(d) { return d.events; } )
                .attr("text-anchor", textAnchorPosition ) ;

                lifeEvent.append("line")
                .attr("class", "label-line")
                .attr("x1", function(d) { return xLineChart(d.date); } )
                .attr("y1", 5)
                .attr("x2", function(d) { return xLineChart(d.date); } )
                .attr("y2", function(d) { return yLineChart(d.exclusiveNet) - circleRadius; } )
                .style("stroke-opacity", 0);

                lifeEvent.append("circle")
                .attr("id", function (d) { return "circle-original-" + d.date ; } )
                .attr("class", "circle-original")
                .attr("cx", function (d) { return xLineChart(d.date); } )
                .attr("cy", function (d) { return yLineChart(d.exclusiveNet); } )
                .attr("r", circleRadius)
                .style("stroke-opacity", 0.0)
                .style("fill-opacity", 0.0);

                storyGLineChart.select("#circle-original-" + storySteps[storyNextStep].date)
                .transition()
                .duration(transitionDuration)
                .style("stroke-opacity", 1)
                .style("fill-opacity", 1);

                storyGLineChart.select(".label-line")
                .transition()
                .duration(transitionDuration)
                .style("stroke-opacity", 1);


        } else if ( storySteps[storyNextStep].life == "shared" ) {

                nextPara = "#story-step-alternative-" + storySteps[storyNextStep].date;
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

                updateBarChart(allStoryData, storySteps[storyNextStep].date, ".bar-culum-alternative", "story");
                updateCount(allStoryData, storySteps[storyNextStep].date, ".counter", "shared", "story");

                storyLineChart.selectAll("#clip-alternative-line").selectAll("rect")
                .transition().duration(transitionDuration)
                .attr("width", function() {
                    return storyNextStep == (storySteps.length - 1)
                            ? width
                            : xLineChart(storySteps[storyNextStep].date) ;
                  });

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
var oldValue;
var currentdateData;
var chartID = "#bar-chart";

var currentChart =   d3.selectAll(chartID).selectAll(chartClass);
var culumValue = chartClass == ".bar-culum-original" ? "exclusiveAcc" : "sharedAcc" ;

currentChart.property("__oldData__", function (d) {
oldValue = d[culumValue];
//return d.sharedAcc;
} );

currentdateData = data.filter(function (d) {return d.date == currentdate; } );

if (oldValue < 0 && currentdateData[0][culumValue] > 0){

//shrink the bar chart to the 0 axis - ie move X to 0 and reduce width to 0
currentChart.data(currentdateData)
.transition().duration(transitionDuration/2)
.attr("width", 0)
.attr("x", function(d) { return xBarChart(0); } );

//then increase width, and keep X at 0

currentChart.transition().duration(transitionDuration/2).delay(transitionDuration/2)
.attr("width", function(d) { return Math.abs(xBarChart(d[culumValue]) - xBarChart(0)); } )
.style("fill", function(d) { return d[culumValue] > 0 ? bananaColours.teal30 : bananaColours.orange30 ; });

} else {

currentChart.data(currentdateData)
.transition().duration(transitionDuration)
.attr("x", function(d) { return xBarChart(Math.min(0, d[culumValue])); })
.attr("width", function(d) { return Math.abs(xBarChart(d[culumValue]) - xBarChart(0)); } )
.style("fill", function(d) { return d[culumValue] > 0 ? bananaColours.teal30 : bananaColours.orange30 ; });

};



};


function updateCount(data, currentdate, countClass, journey) {

var currentdateData = data.filter(function (d) {return d.date == currentdate; } );
var culumValue = journey == "exclusive" ? "exclusiveAcc" : "sharedAcc" ;
var minimumAlternativedate = d3.min(storySteps.filter(function(d){ return d.life ==  "shared"; }), function(d) { return d.date; });
var chartID = "#bar-chart";
var currentChart =   d3.selectAll(chartID).selectAll(countClass);

currentChart.data(currentdateData)
.transition()
.duration(function (d) { return culumValue == "sharedAcc" && currentdate <= minimumAlternativedate ? 0 : transitionDuration} )
.attr("transform", function(d) { return "translate(" + xBarChart(d[culumValue]) + ", 10 )" ; });

currentChart.selectAll("text")
.data(currentdateData)
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
d.date = +d.date;
d.exclusiveNet = +d.exclusiveNet;
d.exclusiveAcc = +d.exclusiveAcc;
d.sharedNet = +d.sharedNet;
d.sharedAcc = +d.sharedAcc;
d.diffAcc = +d.diffAcc;
return d;
};

function textAnchorPosition(d) {
var textPosition;
if (xLineChart(d.date) > (width * 0.9)) { textPosition = "end"; }
else if (xLineChart(d.date) < (width * 0.1)) { textPosition = "start"; }
else { textPosition = "middle"; };
return textPosition;
};


  // Layout inspired from Tom Shanley ( http://bl.ocks.org/tomshanley )
