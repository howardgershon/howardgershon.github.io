var width = 400,
height = 400,
endAngle = 2 * Math.PI,
colors = d3.scale.category20();

var svg = d3.select("#vis").append("svg")
.attr("class", "pie")
.attr("height", height)
.attr("width", width);
var pastColor;

var olddata;

var data;
function render(innerRadius) {

  var pie = d3.layout.pie().sort(null);

  data = rand(10);

  var arc = d3.svg.arc().outerRadius(200).innerRadius(innerRadius);

  svg.select("g").remove();

  svg.append("g")
  .attr("transform", "translate(200,200)")
  .selectAll("path.arc")
  .data(pie(data))
  .enter()
  .append("path")
  .attr("class", "arc")
  .attr("fill", function (d, i) {
    return colors(i);
  })
  .on("mouseover", function (d) {
    pastColor = d3.select(this).attr("fill");
    //alert(lighten(pastColor));
    d3.select(this).attr("fill", lighten(pastColor));
    //d3.select(this).enter().append("text").text("hello").attr("x", 100).attr("y", 100).attr("color", "black");
  })
  .on("mouseout", function(d) {
    d3.select(this).attr("fill", pastColor);
  })
  //.attr("d", function(d, i){
  //            return arc(d, i);
  //});
  .transition().duration(1000)
  .attrTween("d", function (d) {
    var start = {startAngle: 0, endAngle: 0};
    var interpolate = d3.interpolate(start, d);
    return function (t) {
      return arc(interpolate(t));
    };
  });
  //.attrTween("d", tweenDonut);
}

var lighten = function (clr) {
  clr = clr.split('#')[1];
  var r = parseInt(clr.split(/([a-z0-9]{2})/)[1], 16);
  var g = parseInt(clr.split(/([a-z0-9]{2})/)[3], 16);
  var b = parseInt(clr.split(/([a-z0-9]{2})/)[5], 16);

  //convert to hsl
  var hsl = rgbToHsl(r, g, b);

  //alert(hsl);

  //lighten
  hsl[2] = hsl[2]*1.1;

  if (hsl[2] > 1) { hsl[2] = .9};
  if (hsl[2] < 0) { hsl[2] = .1};

  //convert back to rgb
  var rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);

  rgb.forEach( function (d, i) { rgb[i] = (parseInt(d)).toString(16)});

  //alert("r = " + rgb[0] + " g = " + rgb[1] + " b = " + rgb[3]);

  //assemble new color
  r = ((rgb[0]).toString(16).length < 2) ? "0" + (rgb[0]).toString(16) : (rgb[0]).toString(16);
  g = ((rgb[1]).toString(16).length < 2) ? "0" + (rgb[1]).toString(16) : (rgb[1]).toString(16);
  b = ((rgb[2]).toString(16).length < 2) ? "0" + (rgb[2]).toString(16) : (rgb[2]).toString(16);

  //alert("r = " + r + " g = " + g + " b = " + b);

  return("#"+r+g+b);

}

function rgbToHsl(r, g, b){
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if(max == min){
    h = s = 0; // achromatic
  }else{
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function hslToRgb(h, s, l){
  var r, g, b;

  if(s == 0){
    r = g = b = l; // achromatic
  }else{
    function hue2rgb(p, q, t){
      if(t < 0) t += 1;
      if(t > 1) t -= 1;
      if(t < 1/6) return p + (q - p) * 6 * t;
      if(t < 1/2) return q;
      if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [r * 255, g * 255, b * 255];
}

function tweenDonut(b) {
  b.innerRadius = radius * .6;
  var i = d3.interpolate({innerRadius: 0}, b);
  return function(t) { return arc(i(t)); };
}

var rand = function (n) {
  var num = [];
  for (var i = 0; i < n; i++) {
    num[i] = Math.random()*100
  };
  return num;
}

var update = function () {
  olddata = data;
  data = rand(10);
  rerender(100);
}

function rerender(innerRadius) {

  var pie = d3.layout.pie().sort(null);

  var arc = d3.svg.arc().outerRadius(200).innerRadius(innerRadius);

  svg.select("g").remove();

  svg.append("g")
  .attr("transform", "translate(200,200)")
  .selectAll("path.arc")
  .data(pie(data))
  .enter()
  .append("path")
  .attr("class", "arc")
  .attr("fill", function (d, i) {
    return colors(i);
  })
  .on("mouseover", function (d) {
    pastColor = d3.select(this).attr("fill");
    //alert(lighten(pastColor));
    d3.select(this).attr("fill", lighten(pastColor));
    d3.select(this).enter().append("text").text("hello").attr("x", 100).attr("y", 100).attr("color", "black");
  })
  .on("mouseout", function(d) {
    d3.select(this).attr("fill", pastColor);
  })
  //.attr("d", function(d, i){
  //            return arc(d, i);
  //});
  .transition().duration(1000)
  .attrTween("d", function (d, i) {
    var interpolate = d3.interpolate(pie(olddata)[i], d);
    return function (t) {
      return arc(interpolate(t));
    };
  });
  //.attrTween("d", tweenDonut);
}

render(100);

setTimeout(setInterval( function() {
  var n = parseInt(Math.random()*10)+3;
  update();
}, 2500), 1000);
