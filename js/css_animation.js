function showImages(el) {
    var windowHeight = jQuery( window ).height();
    $(el).each(function(){
        var thisPos = $(this).offset().top;

        var topOfWindow = $(window).scrollTop();
        if (topOfWindow + windowHeight - 200 > thisPos ) {
            $(this).removeClass("animate-image");
            $(this).addClass("animate__animated");
            $(this).addClass("animate__zoomIn");
        }
    });
}

// if the image in the window of browser when the page is loaded, show that image
$(document).ready(function(){
        showImages('.animate-image');
});

// if the image in the window of browser when scrolling the page, show that image
$(window).scroll(function() {
        showImages('.animate-image');
});