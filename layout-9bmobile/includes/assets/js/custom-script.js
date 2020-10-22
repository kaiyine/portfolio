$(".previous-button").click(function(){
      window.location = document.referrer;      
    });

$( document ).ready(function() {

  // SideNav Navigation Menu
  $('.sidenav').sidenav();

  //Carousel
  $('.carousel').carousel({
    duration:0,
    dist:-50,
    shift:10,
    padding:10
  });

  // Slider
  $('.carousel.carousel-slider').carousel({
    fullWidth: true
  });

  // Modal
  $('.modal').modal();

  // Collapse
  $('.collapsible').collapsible();

  // Dropdown
  $('.dropdown-trigger').dropdown();

  // Tabs
  $('.tabs').tabs();

  // Material Box
  $('.materialboxed').materialbox();

  // Parallax
  $('.parallax').parallax();

  // Tooltips
  $('.tooltipped').tooltip();

  // Scrollspy
  $('.scrollspy').scrollSpy();

  // Collapsible
  $('.collapsible').collapsible();

  //Select
  $('select').formSelect();
   
  $('#game-provider-toggle').click(function() {
        $('#gameproviders-icons').slideToggle();
    });

});

// WOW JS
wow = new WOW(
  {
  boxClass:     'wow',      // default
  animateClass: 'animated', // default
  offset:       0,          // default
  mobile:       true,       // default
  live:         true        // default
}
)
wow.init();

// Image Data Filter
$(document).ready(function(){
  var $portfolio_filter = $('.content-grid');
  $portfolio_filter.imagesLoaded(function () {
      $portfolio_filter.isotope({
          layoutMode: 'masonry',
          itemSelector: '.grid-item',
          percentPosition: true,
          masonry: {
              columnWidth: '.grid-sizer'
          }
      });
      $portfolio_filter.isotope();
  });

  var $grid_selectors2 = $('.about-menu >li > a');
  $grid_selectors2.on('click', function () {
      $grid_selectors2.parent().removeClass('active');
      $(this).parent().addClass('active');
      var selector = $(this).attr('data-filter');
      $portfolio_filter.find('.grid-item').removeClass('animated').css("visibility", ""); // avoid problem to filter after sorting
      $portfolio_filter.find('.grid-item').each(function () {
      });
      $portfolio_filter.isotope({ filter: selector });
      return false;
  });
});


// Gamelist Control
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    if(getUrlParameter("prv")=="yoplay"){
      $(".icon-yp").removeClass('no-show');
      $(".banner-yp").removeClass('no-show');
    }else if(getUrlParameter("prv")=="habanero"){
      $(".icon-hb").removeClass('no-show');
      $(".banner-hb").removeClass('no-show');
    }else if(getUrlParameter("prv")=="isoftbet"){
      $(".icon-isb").removeClass('no-show');
      $(".banner-isb").removeClass('no-show');
    }else if(getUrlParameter("prv")=="jumbo"){
      $(".icon-jb").removeClass('no-show');
      $(".banner-jb").removeClass('no-show');
    }else if(getUrlParameter("prv")=="microgaming"){
      $(".icon-mg").removeClass('no-show');
      $(".banner-mg").removeClass('no-show');
    }else if(getUrlParameter("prv")=="pragmatic"){
      $(".icon-pp").removeClass('no-show');
      $(".banner-pp").removeClass('no-show');
    }else if(getUrlParameter("prv")=="playtech"){
      $(".icon-pt").removeClass('no-show');
      $(".banner-pt").removeClass('no-show');
    }else if(getUrlParameter("prv")=="uc8"){
      $(".icon-uc8").removeClass('no-show');
      $(".banner-uc8").removeClass('no-show');
    }else if(getUrlParameter("prv")=="playngo"){
      $(".icon-png").removeClass('no-show');
      $(".banner-png").removeClass('no-show');
    }else if(getUrlParameter("prv")=="ttg"){
      $(".icon-ttg").removeClass('no-show');
      $(".banner-ttg").removeClass('no-show');
    }

    $(document).on("click",".show-all",function(){
      $(".grid-item_").removeClass('hideself');
      $(".swiper-slide").removeClass('active');
      $(this).parent().addClass('active');
    });

    $(document).on("click",".show-top",function(){
      $(".grid-item_").addClass('hideself');
      $(".top-games").removeClass('hideself');
      $(".swiper-slide").removeClass('active');
      $(this).parent().addClass('active');
    });
