$(".previous-button").click(function(){
      window.location = document.referrer;      
    });

$( document ).ready(function() {

  // SideNav Navigation Menu
  $('.sidenav').sidenav();

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


// On scroll on header
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

        if (scroll >= 50) {
            $("header").addClass("is-sticky");
        } else {
            $("header").removeClass("is-sticky");
        }
    });

// Image Data Filter Promotions
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
    var $grid_selectors = $('.promo-tabs > li > a');
    $grid_selectors.on('click', function () {
        $grid_selectors.parent().removeClass('active');
        $(this).parent().addClass('active');
        var selector = $(this).attr('data-filter');
        $portfolio_filter.find('.grid-item').removeClass('animated').css("visibility", ""); // avoid problem to filter after sorting
        $portfolio_filter.find('.grid-item').each(function () {
        });
        $portfolio_filter.isotope({ filter: selector });
        return false;
    });
  });

//Close Cookies Section
function hide(target) {
    document.getElementById(target).style.display = 'none';
}

//Wheel Scripts
var prev = 0;
  $(".w-spin").click(function(){
    resetWheel();
    playPing();
    $(".w-go").fadeOut(200);

    //get rand
    var rd = Math.floor((Math.random() * 7) + 2);
    var res = rd * 45,
      fin = res * 9,
      n = fin;

    var m = fin/rd;

    //anim rot
      $(".w-main").css({
        "transition":"transform 3s",
        "transform":"rotate("+fin+"deg)"
      });

      setTimeout(function(){
        var popup = rd;

        console.log(rd);
        console.log(popup);
        console.log(res);
        console.log(fin);
        console.log(m-45);
        console.log(n);

        if(popup==0){     // 0 deg = free spin      
            jackpotShow("free");
        }if(popup==1){      // 45 deg = $5 bonus
            jackpotShow("5bonus");
        }else if(popup==2){   // 90 deg = end
            jackpotShow("end");
        }else if(popup==3){   // 135 deg = $50 bonus
            jackpotShow("50bonus");
        }else if(popup==4){   // 180 deg = free spin
            jackpotShow("free");
        }else if(popup==5){   // 225 deg = free spin
            jackpotShow("free");
        }else if(popup==6){   // 270 deg = end
            jackpotShow("end");
        }else if(popup==7){   // 315 deg = $10 bonus
            jackpotShow("10bonus");
        }else if(popup==8){   // 360 deg = free spin
            jackpotShow("100bonus");
        }

      },3000);


    //set prev rot 
    prev += n;
  });

  var resetWheel = function(){
    $(".w-main").css({
      "transition":"transform 0s",
      "transform":"rotate(0deg)"
    });
  }

  var jackpotShow = function(j){
    $(".res-overlay").addClass('active');

    if(j=="free"){
      $(".w-freespin").addClass('active');
    }else if(j=="5bonus"){
      $(".w-5bonus").addClass('active');
      playPing();
    }else if(j=="50bonus"){
      $(".w-50bonus").addClass('active');
      playPing();
      spinLimit();
    }else if(j=="end"){
      $(".w-tryagain").addClass('active');
      spinLimit();
    }else if(j=="10bonus"){
      $(".w-10bonus").addClass('active');
      playPing();
      spinLimit();
    }else if(j=="100bonus"){
      $(".w-100bonus").addClass('active');
      playPing();
      spinLimit();
    }else if(j=="end"){
      spinLimit();
    }
  }

  var playPing = function(){
    var audioNew = document.querySelector('#pingSFX'); // <- might use jQuery for older browsers here
    if (audioNew.play) {
      audioNew.play();
    }
    else {
      audioNew.innerHTML = '<embed src="' + audioNew.attributes.src.value + '" autostart=true loop=false volume=100 hidden=true></embed>';
    }
  }
  
  var spinLimit = function(){
    $(".w-close").removeClass('no-show');
    $(".w-notice").removeClass('no-show');
  }

  var spinAgain = function(){
    $(".w-go").fadeIn(100);
  }

  var jackpotHide = function(){
    $(".res-overlay").removeClass('active');
    $(".w-res").removeClass('active');
  }

  var wheelShow = function(){
    $(".wheel-overlay").fadeIn(200);
    $(".wheel").fadeIn(200);
  }

  var wheelHide = function(){
    $(".wheel-overlay").fadeOut(200);
    $(".wheel").fadeOut(200);
  }

  $(".w-freespin").click(function(){
    spinAgain();
    jackpotHide();
    resetWheel();
  });

  $(".w-5bonus").click(function(){
    spinLimit();
    jackpotHide();
  });

  $(".w-50bonus").click(function(){
    spinLimit();
    jackpotHide();
  });

  $(".w-tryagain").click(function(){
    spinLimit();
    jackpotHide();
  });

  $(".w-10bonus").click(function(){
    spinLimit();
    jackpotHide();
  });

  $(".w-100bonus").click(function(){
    spinLimit();
    jackpotHide();
  });

  $(".w-close").click(function(){
    wheelHide();
    jackpotHide();
  });



