var winWidth = $(window).width();
$(document).ready (function(){
    /*Navigations*/
    $('.hb-nav_toggle').click(function(){
        $(this).toggleClass('active');
        $('.hb-nav').toggleClass('active');
    });
    $('.footer-nav_toggle').click(function(){
        $(this).toggleClass('active');
        $('.footer-nav').toggleClass('active');
    });

    /*Scroll*/
	$( ".scroll__bar" ).draggable({ axis: "x",containment: "parent",scroll: false});
	$( ".scroll__bar" ).draggable({
		drag: function( event, ui ) {
			var left = parseFloat(ui.position.left / parseFloat($(this).parent().innerWidth() - $(this).innerWidth()));
			var target = $('#' + $(this).data('target'));
			var position = target.position();
			var width = target.width();
			var parentWidth = target.parent().width();
			var activeWidth = parseFloat(width - parentWidth);
			var resultWidth = left*activeWidth;
			target.css('left', - resultWidth + 'px');
			console.log(activeWidth);
		}
	});
    scrollResize();

	/*Init tabs*/
	$(".tabs").lightTabs();


    /*Card Slider*/
    if ( $('.card__slider-main').length ) {
        var $slider = $('.card__slider-main')
            .on('init', function(slick) {
                $('.card__slider-main').fadeIn(1000);
            })
            .slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                prevArrow: '<div class="card__sm_prev"></div>',
                nextArrow: '<div class="card__sm_next"></div>',
                autoplay: false,
                lazyLoad: 'ondemand',
                autoplaySpeed: 3000,
                asNavFor: '.card__slider-thmb'
            });

    var $slider2 = $('.card__slider-thmb')
            .on('init', function(slick) {
                $('.card__slider-thmb').fadeIn(1000);
            })
            .slick({
                arrows: false,
                slidesToShow: 3,
                slidesToScroll: 1,
                lazyLoad: 'ondemand',
                asNavFor: '.card__slider-main',
                infinite: true,
                dots: false,
                centerMode: false,
                focusOnSelect: true
            });

     //remove active class from all thumbnail slides
     $('.card__slider-thmb .slick-slide').removeClass('slick-active');

     //set active class to first thumbnail slides
     $('.card__slider-thmb .slick-slide').eq(0).addClass('slick-active');

     // On before slide change match active thumbnail to current slide
     $('.card__slider-main').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var mySlideNumber = nextSlide;
        $('.card__slider-thmb .slick-slide').removeClass('slick-active');
        $('.card__slider-thmb .slick-slide').eq(mySlideNumber).addClass('slick-active');
    });
      
      
      // init slider
    require(['js-sliderWithProgressbar'], function(slider) {

        $('.card__slider-main').each(function() {

            me.slider = new slider($(this), options, sliderOptions, previewSliderOptions);

            // stop slider
            //me.slider.stop();

            // start slider
            //me.slider.start(index);

            // get reference to slick slider
            //me.slider.getSlick();

        });
    });
      var options = {
        progressbarSelector    : '.bJS_progressbar'
        , slideSelector        : '.bJS_slider'
        , previewSlideSelector : '.bJS_previewSlider'
        , progressInterval     : ''
            // add your own progressbar animation function to sync it i.e. with a video
            // function will be called if the current preview slider item (".b_previewItem") has the data-customprogressbar="true" property set
        , onCustomProgressbar : function($slide, $progressbar) {}
    }

        // slick slider options
        // see: https://kenwheeler.github.io/slick/
    var sliderOptions = {
        slidesToShow   : 1,
        slidesToScroll : 1,
        arrows         : false,
        fade           : true,
        autoplay       : true
    }

        // slick slider options
        // see: https://kenwheeler.github.io/slick/
    var previewSliderOptions = {
        slidesToShow   : 3,
        slidesToScroll : 1,
        dots           : false,
        focusOnSelect  : true,
        centerMode     : true
    }
    }

});

$(window).on('load',function(){
    scrollResize();
    if(winWidth<769) {
        
    }
});

$(window).resize(function(){
    scrollResize();
});
function scrollResize() {
    if(winWidth < 769) {
        console.log($('.mb_items').length);
        console.log(winWidth);

        var a = $('.mb_items').length*winWidth;
        $('.mb_items').css('min-width',winWidth + 'px');
        $('.mb_items').css('width',winWidth + 'px');
        $('.mb_items').css('max-width',winWidth + 'px');
        console.log(a);

        /*$('.mb-list_inner').css('width', a + 'px');*/

        $('.mb-list_inner').slick({
            arrows: false,
            dots: true,
            mobileFirst:true,
            variableWidth: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false
        });
    }
}

/*Tabs Function*/
(function($){				
    jQuery.fn.lightTabs = function(options){
        
        var createTabs = function(){
            tabs = this;
            i = 0;
            
            showPage = function(i){
                $(tabs).children("div").children("div").hide();
                $(tabs).children("div").children("div").eq(i).show();
                $(tabs).children("ul").children("li").removeClass("active");
                $(tabs).children("ul").children("li").eq(i).addClass("active");
            }
            
            showPage(0);				
            
            $(tabs).children("ul").children("li").each(function(index, element){
                $(element).attr("data-page", i);
                i++;                        
            });
            
            $(tabs).children("ul").children("li").click(function(){
                showPage(parseInt($(this).attr("data-page")));
            });				
        };		
        return this.each(createTabs);
    };	
})(jQuery);
