
 var content = document.getElementById('num1');

 window.addEventListener('scroll', function(){
   content.style.opacity = (window.innerHeight-3*window.scrollY)/window.innerHeight;
 }, false);

var fam = document.getElementById('fam');
var math = document.getElementById('math');
var code = document.getElementById('code');
var info = document.getElementById('info');

var source = window.location.hash.split('#')[1];
var line = (source == 'uc') ? 'I will receive my MS in statistics from the University of Cincinnati.':'I am currently working on my PhD in statistics at the University of Cincinnati.'

window.addEventListener('load', function(){
  fam.addEventListener('mouseover', function(){
    info.innerHTML = 'My family is the most important aspect of my life. I am married with five wonderful children: our three sons Kyle (6), Aiden (4), and Owen (1), and our two daughters Charlie (2) and Milly (&lt;1)';
    info.style.display = 'inline-block';
  });
  math.addEventListener('mouseover', function(){
    info.innerHTML = 'I have been studying mathematics for many years. I can remember how exicited I was when I first realized that you could multiply numbers and work outside of base-10. I received my BS in mathematics from the University of Utah in 2013 and my MS in computational engineering and sciences from the University of Utah in 2015.'+line;
    info.style.display = 'inline-block';
  });


  code.addEventListener('mouseover', function(){
    info.innerHTML = 'From the time I used the C-prompt to play Wolfenstein 3D until now computers have been an intergral part of my life. Currenlty, I use computers for mathematical and statistical computing (in R) and web development (HTML5, CSS3, and JavaScript)';
    info.style.display = 'inline-block';
  });
  fam.addEventListener('mouseout', function(){
    info.innerHTML = '';
    info.style.display = 'none';
  });
  math.addEventListener('mouseout', function(){
    info.innerHTML = '';
    info.style.display = 'none';
  });
  code.addEventListener('mouseout', function(){
    info.innerHTML = '';
    info.style.display = 'none';
  });
});

// for the latex rendering

$(function () {
  $(".latex").latex();
});

// add d3 code
