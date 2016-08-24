var svg = d3.select('#imggrid').append('svg')
  .attr('width', 440)
  .attr('height', 440)
  .append('g');

//var fibspir = function(a, th, ß, n){
var fibspir = function(a, n, s){
  
  if (n == 10) return null;
  
  var gr = (1+Math.sqrt(5))/2;
  //var gr = 1/2;
  var b = a/gr;
  var c = b/gr;
  var d = c/gr;
  var e = d/gr;
  var f = e/gr;
  
  var grect = s.append('rect')
    .attr('height', a)
    .attr('width', (a+b))
    .style('stroke', '#000')
    .attr('transform', 'translate(0,0)')
    .style('fill', '#fff');
  
  var rect = s.append('rect')
    .attr('height', a)
    .attr('width', a)
    .style('stroke', '#000')
    .style('fill', 'transparent')
    .attr('transform', 'translate(0,0)')
    .style('fill', '#fff');
  
  var rect2 = s.append('rect')
    .attr('height', b)
    .attr('width', b)
    .style('stroke', '#000')
    .attr('transform', 'translate('+a+', 0)')
    .style('fill', '#fff');

  var rect3 = s.append('rect')
    .attr('height', c)
    .attr('width', c)
    .style('stroke', '#000')
    .attr('transform', 'translate('+(a+d)+', '+b+')')
    .style('fill', '#fff');
  
  var rect4 = s.append('rect')
    .attr('height', d)
    .attr('width', d)
    .style('stroke', '#000')
    .attr('transform', 'translate('+a+', '+(b+e)+')')
    .style('fill', '#fff');
  
  var rect5 = s.append('rect')
    .attr('height', e)
    .attr('width', e)
    .style('stroke', '#000')
    .attr('transform', 'translate('+a+', '+b+')')
    .style('fill', '#fff');
  
  var rect6 = s.append('rect')
    .attr('height', f)
    .attr('width', f)
    .style('stroke', '#000')
    .attr('transform', 'translate('+(a+e)+', '+(b)+')')
    .style('fill', '#fff');
  
  var arc = d3.svg.arc()
    .innerRadius((a-1))
    .outerRadius(a)
    .startAngle(1.5 * Math.PI)
    .endAngle(2 * Math.PI);
  
  var arc2 = d3.svg.arc()
    .innerRadius((b-1))
    .outerRadius(b)
    .startAngle(1.5 * Math.PI)
    .endAngle(2 * Math.PI);
  
  var arc3 = d3.svg.arc()
    .innerRadius((c-1))
    .outerRadius(c)
    .startAngle(1.5 * Math.PI)
    .endAngle(2 * Math.PI);
  
  var arc4 = d3.svg.arc()
    .innerRadius((d-1))
    .outerRadius(d)
    .startAngle(1.5 * Math.PI)
    .endAngle(2 * Math.PI);
  
  var arc5 = d3.svg.arc()
    .innerRadius((e-1))
    .outerRadius(e)
    .startAngle(1.5 * Math.PI)
    .endAngle(2 * Math.PI);
  
  var arc6 = d3.svg.arc()
    .innerRadius((f-1))
    .outerRadius(f)
    .startAngle(1.5 * Math.PI)
    .endAngle(2 * Math.PI);
  
  s.append("path")
    .attr("class", "arc")
    .attr("d", arc)
    .attr("transform", "translate("+a+","+a+")");
  
  s.append("path")
    .attr("class", "arc")
    .attr("d", arc2)
    .attr("transform", "translate("+a+","+b+") rotate(90)");
  
  var abc = a+b-c;
  console.log(abc);
  s.append("path")
    .attr("class", "arc")
    .attr("d", arc3)
    .attr("transform", "translate("+(a+d)+","+b+") rotate(180)");
  
  s.append("path")
    .attr("class", "arc")
    .attr("d", arc4)
    .attr("transform", "translate("+(a+d)+","+(a-d)+") rotate(270)");
  s.append("path")
    .attr("class", "arc")
    .attr("d", arc5)
    .attr("transform", "translate("+(a+e)+","+(b+e)+")");
  var af = a-f;
  s.append("path")
    .attr("class", "arc")
    .attr("d", arc6)
    .attr("transform", "translate("+(a+e)+","+(b+f)+") rotate(90)");
  

//fibspir(b, (n+1), rect2);
  
};

fibspir(200, 1, svg);


