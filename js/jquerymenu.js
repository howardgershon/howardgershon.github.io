$(document).ready(function(){
    $('#close').hide();
    $('div').click(function(){
        topPos = $('.menu').top;
        $(this).animate({width:500, height: 500, position: 'absolute', top: topPos});
        $('div').not(this).animate({width: 0, opacity: 0, padding: 0});
        $('#close').show();
    });
    $('#close').click(function(){
        $('.jq').css({padding: 10});
        $('.jq').fadeIn();
        $('.jq').animate({width: '100 px', height: '100 px', opacity:1});
        $('#close').hide();
    });
});