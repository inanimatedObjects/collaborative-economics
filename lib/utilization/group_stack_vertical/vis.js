const type = 3; // The number of series => UTILIZATION CATEGORY TYPE
const numberOfPeriods = 12; // The number of values per series  => MONTHLY USAGE

const timePeriods = d3.range(numberOfPeriods);
const byType = d3.range(type).map(() => bumps(numberOfPeriods));
const y01z = d3.stack()
        .keys(d3.range(type))(d3.transpose(byType));

const yMaxGrouped = d3.max(byType, y => d3.max(y)); // highest value that month
const yMaxStacked = d3.max(y01z, y => d3.max(y, d => d[1]));   //  highest stack value of year

const svg = d3.select('svg');
const controlHeight = 50;
const margin = {top: 20, right: 10, bottom: 20, left: 60};
const width = +svg.attr('width') - margin.left - margin.right;
const height = +svg.attr('height') - controlHeight - margin.top - margin.bottom;
const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

 const x = d3.scaleBand()
        .domain(timePeriods)
        .rangeRound([0, width])
        .paddingInner(0.35)     //  padding between bands
        .paddingOuter(0.38);    // padding before first/after last band

const y = d3.scaleLinear()
        .domain([0, yMaxStacked])
        .rangeRound([height, 0]);

const xAxis = d3.axisBottom(x)
        .tickSize(0)
        .tickPadding(6);
const yAxis = d3.axisLeft(y);

const color = d3.scaleOrdinal()
  .domain(d3.range(type))
  .range(d3.schemeCategory20c.slice(2, 5)); // greens

const series = g.selectAll('.series')
        .data(y01z)
        .enter().append('g')
                .attr('fill', (d, i) => color(i));

const rect = series.selectAll('rect')
        .data(d => d)
        .enter().append('rect')
                .attr("x", (d,i) => x(i))
                .attr("y", height)
                .attr('width', x.bandwidth())
                .attr('height', 0);

rect.transition()
        .delay((d, i) => i * 10)
        .attr('y', d => y(d[1]))
        .attr('height', d => y(d[0]) - y(d[1]));

g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0,${height})`)
        // .call(d3.axisBottom(x)
        //   .tickSize(0)
        //   .tickPadding(6));
        .call(xAxis);

g.append('g')
        .attr('class', 'axis axis--y')
        .call(yAxis);

d3.selectAll('input')
        .on('change', changed);

const timeout = d3.timeout(() => {
        d3.select('input[value=\'grouped\']')
                .property('checked', true)
                .dispatch('change');
        }, 2000);

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
        .attr('width', x.bandwidth() / type)
        .transition()
                .attr('y', d => y(d[1] - d[0]))
                .attr('height', d => y(0) - y(d[1] - d[0]));
}

function transitionStacked() {
  y.domain([0, yMaxStacked]);

  rect.transition()
        .duration(500)
        .delay((d, i) => i * 10)
                .attr('y', d => y(d[1]))
                .attr('height', d => y(d[0]) - y(d[1]))
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


        console.log('byType', byType);
        console.log('timePeriods', timePeriods);
        console.log('y01z', y01z);
        console.log('yMaxGrouped', yMaxGrouped);
        console.log('yMaxStacked', yMaxStacked);
