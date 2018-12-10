const type = 3; // The number of series => UTILIZATION CATEGORY TYPE
const numberOfPeriods = 12; // The number of values per series  => MONTHLY USAGE

const byType = d3.range(type).map(() => bumps(numberOfPeriods));
const timePeriods = d3.range(numberOfPeriods);
const x01z = d3.stack().keys(d3.range(type))(d3.transpose(byType));
const yMaxGrouped = d3.max(byType, (y, i) => d3.max(y)); // highest value that month
const yMaxStacked = d3.max(x01z, y => d3.max(y, d => d[1]));   //  highest stack value of year
        console.log('byType', byType);
        console.log('timePeriods', timePeriods);
        console.log('x01z', x01z);
        console.log('yMaxGrouped', yMaxGrouped);
        console.log('yMaxStacked', yMaxStacked);

const svg = d3.select('svg');
const controlHeight = 90;
const margin = {top: 20, right: 10, bottom: 20, left: 60};
const width = +svg.attr('width') - margin.left - margin.right;
const height = +svg.attr('height') - controlHeight - margin.top - margin.bottom;
const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

 const color = ["#fdd0a2",  "#c7e9c0", "#9e9ac8"];  // set specific group color

 const x = d3.scaleBand()
        .domain(yMaxStacked)
        .rangeRound([0, width])
        .paddingInner(0.15)     //  padding between bands
        .paddingOuter(0.38);    // padding before first/after last band

const y = d3.scaleLinear()
        .domain([0, yMaxStacked])
        .range([height, 0]);

const x0 = d3.scaleBand().rangeRound([0,width]).paddingInner(0.1);
const x1 = d3.scaleBand();
const xAxis = d3.axisBottom(x0);
const yAxis = d3.axisLeft(y);




const series = g.selectAll('.series')
        .data(x01z)
        .enter().append('g')
                .attr('fill', (d, i) => color[i]);

const rect = series.selectAll('rect')
        .data(d => d)
        .enter().append('rect')
                // .attr('x', (d, i) => x(i))
                // .attr('y', 0)
                // .attr('height', x.bandwidth())
                // .attr('width', 0)
                // .attr('x', (d, i) => x(i))
                // .attr('y', 0)
                // .attr('height', y.bandwidth());
                .attr("x", (d,i) => i * 10)
                 .attr("y", (d) => y(d))
                 .attr("width", x.bandwidth())
                 .attr("height", (d) => height - y(d[1]))


// rect.transition()
//   .delay((d, i) => i * 10)
//   .attr('x', d => x(d[0]))
//   .attr('y', (d, i) => y(i))
//   .attr('width', d => x(d[1]) - x(d[0]));

g.append('g')
        .attr('class', 'axis axis--y')
        .attr('transform', `translate(0,` + height + `)`)
        .call(d3.axisBottom(x)
        .tickSize(5)
        .tickPadding(1));

d3.selectAll('input')
        .on('change', changed);

const timeout = d3.timeout(() => {
        d3.select('input[value=\'grouped\']')
                .property('checked', true)
                .dispatch('change');
        }, 100);

function changed() {
        timeout.stop();
        if (this.value === 'grouped') transitionGrouped();
        else transitionStacked();
}

function transitionGrouped() {
  y.domain([0, yMaxGrouped]);

  rect.transition()
        .duration(500)
        .delay((d, i) => i * 10)
                .attr('x', function(d, i) {
                        return x(i) + x.bandwidth() / type * this.parentNode.__data__.key;
                })
                .attr('width', y.bandwidth() / n)
        .transition()
                  .attr('y', d => y(0))
                  .attr('height', d => y(0) + y(d[1] - d[0]));
        //         .attr('width', x.bandwidth() / type)
        // .transition()
        //         .duration((d, i) => i * 10)
        //         .attr('y', d => height - y(0))
        //         .attr('height', d => y(0) + y(d[1] - d[0]));
}

function transitionStacked() {
  y.domain([0, yMaxStacked]);

  rect.transition()
        .duration(500)
        .delay((d, i) => i * 10)
                .attr('y', d => y(d[0]))
                .attr('height', d => y(d[1]) - y(d[0]))
        .transition()
                .attr('x', (d, i) => x(i))
                .attr('width', x.bandwidth());
}

// Returns an array of m psuedorandom, smoothly-varying non-negative numbers.
// Inspired by Lee Byron’s test data generator.
// http://leebyron.com/streamgraph/
function bumps(numberOfPeriods) {
        const values = [];
        // let i, j, w, x, y, z;
        let i;
        let j;
        let w;
        let x;
        let y;
        let z;

  // Initialize with uniform random values in [0.1, 0.2).
  for (i = 0; i < numberOfPeriods; ++i) {
    // values[i] = i * Math.round(Math.random(), 1);
    values[i] = i * i;

    // console.log('values', values);
  }
  console.log('values', values);

  // // Add five random bumps.
  // for (j = 0; j < 5; ++j) {
  //   x = 1 / (0.1 + Math.random());
  //   y = 4 - 0.5;
  //   z = 10 / (0.1 + Math.random());
  //
  //   for (i = 0; i < numberOfPeriods; i++) {
  //     w = (i / numberOfPeriods - y) * z;
  //     values[i] += x * Math.exp(-w * w);
  //   }
  // }

  // // Ensure all values are positive.
  for (i = 0; i < numberOfPeriods; ++i) {
    values[i] = Math.max(0, values[i]);
  }


  return values;
}
