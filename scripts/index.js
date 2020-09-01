var menuAnimation = false;
var sticked = false;


$(document).ready(function(){
    $('#logo-min').height($('#menu').height() - 10);
    $('#particles-js').height($(window).height() - $('#header').height());
    if(shouldStick($(window).scrollTop())) {
        stickMenu(true);
    }
});

$(document).scroll(function(){
    const scrollTop = $(window).scrollTop();    
    if(shouldStick(scrollTop) && !sticked){
        stickMenu(true);
    }
    if(!shouldStick(scrollTop) && sticked) {
        stickMenu(false);
    }
});

const menu = $('#menu');

function stickMenu(bool) {

    var calc = menu.width();
    $('.menu-item').each(function(){
        calc -= ($(this).width() + 0.05*$(window).width());
    });

    if(bool) {
        menu.css('position', 'fixed'); menu.css('top', 0);
        animateMargin(calc, bool);
    } else {
        menu.css('position', 'unset'); menu.css('top', 'unset');
        animateMargin('2.5vw', bool);
    }
    sticked = bool;
}

function shouldStick(scrollTop) {
    const menuHeight = menu.outerHeight();
    const headerHeight = $('#header').outerHeight();

    return (!isDesktop() && (scrollTop >= headerHeight - menuHeight));
}

function animateMargin(margin, show) {
    if(!menuAnimation) {
        menuAnimation = true;
        if(show) {
            $('#logo-min').fadeIn(500);
        } else {
            $('#logo-min').fadeOut(500);
        }
        $('.menu-item').first().animate({marginLeft: margin}).promise().done(function(){
            menuAnimation = false;
        });        
    }
}

function isDesktop() {
    return $(window).width() >= 800;
}