
function roundUpToNearestFive(n) {
	return 5 * ( Math.ceil(n/5) );;
};

function formatNumberWithCommas(n) {
    var numberSegment = n.toString().split(".");
    numberSegment[0] = numberSegment[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return numberSegment.join(".");
}

var bananaColours = {
        black: "#262638",
        purple: "#414258",
        purple10: "#5B5C72",
        purple20: "#74758B",
        purple30: "#8E8FA5",
        teal: "#588D97",
        teal10: "#72A7B1",
        teal20: "#8BC0CA",
        teal30: "#A5DAE4",
        green: "#315259",
        green10: "#4B6C73",
        green20: "#64858C",
        green30: "#7E9FA6",
        orange: "#F47C20",
        orange10: "#FF963A",
        orange20: "#FFAF53",
        orange30: "#FFC96D",
        greyDark: "#BDBAC0",
        greyLight: "#D1D3D4"
};



/*
colors: (
  fill: #a972cb,
  pulse: #ef6eae,
  close: #ff7f82,
  raise: #ffa260,
  up: #e4cb58,
  slide: #8fc866,
  offset: #19bc8b
); */

/* stroke: steelblue; */
/* stroke: #f7ff00; */
/* stroke: #ff00ff; */
/* fill: #f5fcff */
/* fill:#ff00ff; */
/* fill:#ffcc00; */
/* background-color: #fff8e5; */
/* background-color: #fff9eb; */
/* background-color: #ffc01f; */
/* background-color: #ffb700; */
/* background-color: #f7e200; */
