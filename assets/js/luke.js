/*-----------------------------------------------------------
 * Template Name    : Arshia | Bootstrap 5 Responsive Personal V-Card Resume HTML Template
 * Author           : Retrina Group
 * Version          : 1.0.0
 * Created          : November 2021
 * File Description : Main js file of the template
 *------------------------------------------------------------
 */

// repeated variables
var $window = $(window);
var $root = $('html, body');
var $lastWindowWidth = 0;
var $lastHash = 0;
var $isfirefox= 0;

$(document).ready(function() {

    "use strict";

    deviceScreen();
    date();
    mobileDesign();
    portfolioPopup();

    /* Interactive Portfolio */
interactivePortfolio();

    sidebarMenu();
    mapInit();

    /* Interactive portrait */
    heroImageReveal();

    /* Portfolio chatbot */
    portfolioChatbot();

    /* Interactive Resume */
    interactiveResume();

    /* Interactive Blog / Journal */
interactiveBlog();

    /* Custom cursor */
    mouseMagicCursor();

    ColorPallet();
    themeOption();
});

$window.on("load", function() {
    "use strict";
    $lastWindowWidth = $window.width();
    browserDetect();
    pagePreloader();
    scrollToAnchor();
    customScrollbar();
    portfolioIsotop();
    owlCrousel();
});

$window.on("resize", function() {
    "use strict";
    if ($lastWindowWidth != $window.width()) {
        location.replace(location.href);
    }
});

$window.on("popstate", function(){
    "use strict";
    if($lastHash ==1){
        $lastHash =0;
    }

    else if($lastHash == 0){
        
        var func = animateRandom();

        var $value = location.hash.replace('#', '');
        var $main = $('#main');
        var $first = '#' + $("#main > section:first-child").attr('id');
        var $last = '#' + $("#main > section:last-child").attr('id');
        var $id = location.hash;
        var $thisId = '#' + $("#main > section.active").attr('id');
        $(".menu > li a").removeClass("active");
        if($value == ''){
            $id = $first;
            $value = $("#main > section:first-child").attr('id');
        }
        if ($('.left-side').hasClass("nav-open")) {
            $(".menu-toggle").removeClass("menu-open");
            $(".menu-overlay").addClass("d-none");
            $('.left-side').animate({
                left: "200%"
            }, 300).removeClass("nav-open").addClass("nav-close");
        }
        $('.menu > li a[href$=' + $value + ']').addClass('active');
        if(  ($id == $last && !($thisId == $first)) ||
         ($id == $first && !($thisId == $last))){
            openMenu();
            if($window.width()<992){
                $("#main > section.active").addClass(func[1]).removeClass("active");    
            $main.children($id).addClass('active ' + func[0]);
            }
            else{
                $("#main > section.active").removeClass("active");      
                $main.children($id).addClass('active');
            }
            
            $('#main > section.active').css({width: '100%'});
        }
        else if( ($id != $last && $id != $first  && ($thisId == $first || $thisId == $last ))){
            closeMenu();
            if($window.width()<992){
                $("#main > section.active").addClass(func[1]).removeClass("active");    
            $main.children($id).addClass('active ' + func[0]);
            }
            else{
                $("#main > section.active").removeClass("active");      
                $main.children($id).addClass('active');
            }
        }
        else if(  ($id == $last && $thisId == $first ) || 
        ($id == $first && $thisId == $last ) ) {
            $("#main > section.active").addClass(func[1]).removeClass("active");    
            $main.children($id).addClass('active ' + func[0]);
        }
        else if(  ($id != $last && $thisId != $first ) || 
        ($id != $first && $thisId != $last ) ) {
            $("#main > section.active").addClass(func[1]).removeClass("active");    
            $main.children($id).addClass('active ' + func[0]);
        }
        

    }
});

/*-----------------------------------------------------------------------------
                                   FUNCTIONS
-----------------------------------------------------------------------------*/
/*-------------------------  browser Detect  -------------------------*/
function browserDetect() {        
    "use strict";
    if(window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1){
        $isfirefox = 1;
    }
    
}


/*-------------------------  deviceScreen  -------------------------*/
function deviceScreen() {
  "use strict";

  browserDetect();

  // Remove any zoom previously applied to the page.
  $("html").css("zoom", "");

  // Keep the loading line centered on every screen size.
  $(".middle-line").css({
    top: "50%",
    width: "2px",
    left: "50%",
    transform: "translate(-50%, -50%)"
  });
}

/*-------------------------  Date  -------------------------*/
function date() {
    "use strict";
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    //var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    var newDate = new Date();
    newDate.setDate(newDate.getDate());
    $('#date').html('<span><b>' + newDate.getDate() + '</b></span>' + '<span>' + monthNames[newDate.getMonth()] + '</span> ' + newDate.getFullYear());
}

/*-------------------------  Preloader  -------------------------*/
function pagePreloader() {

    "use strict";
    var preloader = $('#line-loader');
    preloader.addClass('preloaded');

    // setTimeout(function() {
    // }, 800);
    setTimeout(function() {
        preloader.remove();
    }, 1000);
    
}

/*-------------------------  Custom Scrollbar  -------------------------*/
function customScrollbar() {
    "use strict";
    if($window.width()>991){
        $.mCustomScrollbar.defaults.scrollButtons.enable = true;
        $.mCustomScrollbar.defaults.axis = "y";
        $(".section").not('.hero').mCustomScrollbar({
            theme: "light",
            callbacks: {
                whileScrolling: function() {
                    if ($("#main > section.active").attr('id') == 'about') {
                        skills();
                        countup();
                    }
                }
            },
        });
    } else {
        $("#about").on("scroll",function() {
            skills();
            countup();
        });
    }
}

/*-------------------------  Count up  -------------------------*/
function countup() {
    "use strict";
    var hT = $('.count-up').offset().top,
        hH = $('.count-up').outerHeight(),
        wH = $(window).height(),
        wS = $(window).scrollTop();
    if (wS > (hT + hH - wH)) {
        $('.timer').countTo();
        $('.count-number').removeClass('timer');
    }
}

/*-------------------------  Skills  -------------------------*/
function skills() {
    "use strict";
    var hT = $('.skills').offset().top,
        hH = $('.skills').outerHeight(),
        wH = $(window).height(),
        wS = $(window).scrollTop(),
        percent,
        progressEnd,
        skillDP;
    if (wS > (hT + hH - wH)) {
        $('.skill-box:not([data-processed]').each(function() {
            skillDP = $(this).find('.skillbar').attr('data-percent');
            $(this).attr("data-processed", "true");
            $(this).find('.skillbar-bar').animate({
                width: skillDP
            }, 4000);
            progressEnd = parseInt(skillDP);
            percent = $(this).find('.skill-bar-percent span');
            percent.countTo();

        });
        
    }
}

/*-------------------------  Mobile Menu  -------------------------*/
function mobileDesign() {
    "use strict";
    $('.menu-toggle').on('click', function() {
        menuAnimation();
    });
    $('.menu li a').on('click', function() {
        if ($window.width() < 992) {
            menuAnimation();
        }
    });
}

function menuAnimation() {

    "use strict";

    var $leftSide = $('.left-side');
    if ($leftSide.hasClass("nav-open")) {
        $(".menu-toggle").removeClass("menu-open");
        $(".menu-overlay").addClass("d-none");
        if ($window.width() < 992) {
            $(".next-prev-page").removeClass("d-none");
        }
        $leftSide.animate({
            left: "200%"
        }, 300).removeClass("nav-open").addClass("nav-close");
    } else if ($leftSide.hasClass("nav-close")) {
        $(".menu-toggle").addClass("menu-open");
        $(".menu-overlay").removeClass("d-none");
        if ($window.width() < 992) {
            $(".next-prev-page").addClass("d-none");
        }
        $leftSide.animate({
            left: "15px"
        }, 300).removeClass("nav-close").addClass("nav-open");
    }
}

/*-------------------------  Scroll To Anchor  -------------------------*/
function scrollToAnchor() {
    "use strict";

    //getting the anchor link in the URL and deleting the `#`
    var value = window.location.hash.replace('#', '');
    var firstId = $("#main > section:first-child").attr('id');
    var lastId = $("#main > section:last-child").attr('id');
    if (value.length == 0 || value == firstId) {
        $("#main > section:first-child").addClass('active');
        $('.menu > li:first-child a').addClass('active');
        $('.blog-single-page .menu > li:first-child a').removeClass('active');
        if ($('body.blog-single-page').length > 0)
        {
         closeMenu();
        }
        else{
            openMenu();
        }
    } else if (value == lastId) {
        $("#main > section:last-child").addClass('active');
        $('.menu > li:last-child a').addClass('active');
        openMenu();
    } else {
        var sectionAnchor = '#' + value;
        $("#main > section.active, .menu > li a").removeClass("active");
        $('#main > section' + sectionAnchor).addClass('active');
        $('.menu > li a[href$=' + value + ']').addClass('active');
        closeMenu();
    }
}

/*-------------------------  Open Menu  -------------------------*/
function openMenu() {
  "use strict";

  var childrenCount = $(".left-side .menu .list-group-item").length;
  var windowWidth = $window.width();

  $(".menu-align, .left-side .menu, .left-side, .left-side img, .left-side h1, .left-side a.download-cv, #main")
    .stop(true, true);

  if (windowWidth > 991) {
    /*
     * Reset all collapsed-menu positioning.
     * This is important when returning to Home.
     */
    $(".menu-align")
      .css({
        position: "absolute",
        top: "auto",
        left: "0",
        right: "auto",
        bottom: "0",
        transform: "none"
      })
      .animate({
        height: "160px",
        width: "300px"
      }, 350);

    $(".left-side .menu")
      .css({
        position: "relative",
        height: "100%",
        width: "100%"
      });

    $("#main").animate({
      width: (windowWidth * 0.9) - 410 + "px",
      left: (windowWidth * 0.05) + 315 + "px"
    }, 350);

    $("#main > section.active").css({
      width: "100%"
    });
  } else {
    $(".menu-align")
      .css({
        position: "absolute",
        top: "auto",
        left: "50%",
        right: "auto",
        bottom: "0",
        transform: "translateX(-50%)"
      })
      .animate({
        height: "46%",
        width: "300px"
      }, 350);
  }

  $(".left-side").animate({
    width: "300px",
    paddingTop: "40px"
  }, 350);

  $(".left-side img").animate({
    width: "180px"
  }, 350);

  $(".left-side h1").animate({
    fontSize: "32px"
  }, 350);

  $(".left-side a.download-cv")
    .css({
      display: "inline-block",
      borderWidth: ""
    })
    .animate({
      opacity: "1",
      fontSize: "16px",
      paddingTop: "10px",
      paddingRight: "30px",
      paddingBottom: "10px",
      paddingLeft: "30px"
    }, 350);

  /*
   * Restore the Home menu into a 3 × 2 grid.
   */
  for (var i = 0; i < childrenCount; i++) {
    $(".left-side .menu")
      .children()
      .eq(i)
      .stop(true, true)
      .css({
        position: "absolute",
        height: "auto"
      })
      .animate({
        left: (i % 3) * 100 + "px",
        top: Math.floor(i / 3) * 75 + "px",
        width: "100px"
      }, 350);
  }
}

/*-------------------------  Close Menu  -------------------------*/
function closeMenu() {
  "use strict";

  var childrenCount = $(".left-side .menu .list-group-item").length;
  var windowWidth = $window.width();

  $(".menu-align, .left-side .menu, .left-side, .left-side img, .left-side h1, .left-side a.download-cv, #main")
    .stop(true, true);

  if (windowWidth > 991) {
    /*
     * Give the collapsed menu a defined space below
     * the profile image and name.
     */
    $(".menu-align")
      .css({
        position: "absolute",
        top: "125px",
        bottom: "12px",
        left: "0",
        transform: "none"
      })
      .animate({
        width: "100%"
      }, 350);

    $(".left-side .menu").animate({
      height: "100%",
      width: "100%"
    }, 350);

    $(".left-side").animate({
      width: "80px",
      paddingTop: "16px"
    }, 350);

    $(".left-side img").animate({
      width: "60px"
    }, 350);

    $(".left-side h1").animate({
      fontSize: "12px"
    }, 350);

    $(".left-side a.download-cv").animate({
      opacity: "0",
      fontSize: "0",
      paddingTop: "0",
      paddingRight: "0",
      paddingBottom: "0",
      paddingLeft: "0",
      borderWidth: "0"
    }, 350, function () {
      $(this).hide();
    });

    /*
     * Fixed spacing prevents Contact from overlapping
     * and removes the large gap before Home.
     */
    for (var i = 0; i < childrenCount; i++) {
      $(".left-side .menu")
        .children()
        .eq(i)
        .stop(true, true)
        .animate({
          left: "0",
          top: i * 60 + "px",
          width: "80px"
        }, 350);
    }

    $("#main").animate({
      width: (windowWidth * 0.9) - 190 + "px",
      left: (windowWidth * 0.05) + 95 + "px"
    }, 350);

    $("#main > section.active").css({
      width: "100%"
    });
  } else {
    openMenu();
  }
}

/*-------------------------  Sidebar Menu  -------------------------*/
function sidebarMenu() {

    "use strict";
    var $menuLink = $(".menu > li a");
    var $main = $('#main');
    var $first = '#' + $("#main > section:first-child").attr('id');
    var $last = '#' + $("#main > section:last-child").attr('id');
    $menuLink.on("click", function() {
        var func = animateRandom();
        var $id = $(this).attr('href');
        var $thisId = '#' + $("#main > section.active").attr('id'); 
        var not_allowed = [$first, $last];

        if (not_allowed.indexOf($id) > -1 || not_allowed.indexOf($thisId) > -1) {

            if (not_allowed.indexOf($thisId) >= 0 && not_allowed.indexOf($id) >= 0) {
                $(".menu > li a").removeClass("active");
                $(this).addClass('active');
                $("#main > section.active").addClass(func[1]).removeClass("active");
                $main.children($id).addClass('active ' + func[0]);
            } 
            else if($window.width()<992){
                $(".menu > li a").removeClass("active");
                $(this).addClass('active');
                $("#main > section.active").addClass(func[1]).removeClass("active");
                $main.children($id).addClass('active ' + func[0]);
            }
            else {
                $(".menu > li a").removeClass('active');
                $("#main > section.active").removeClass('active');
                $(this).addClass('active');
                $main.children($id).addClass('active');
                if (not_allowed.indexOf($thisId) >= 0 && $window.width() > 992) {
                    closeMenu();
                }
                if (not_allowed.indexOf($id) >= 0) {
                    openMenu();
                }
            }
            owlCrousel();

        } else {
            $(".menu > li a").removeClass("active");
            $(this).addClass('active');
            $("#main > section.active").addClass(func[1]).removeClass("active");
            $main.children($id).addClass('active ' + func[0]);
            owlCrousel();

        }
        if ($id == '#portfolio') {
            setTimeout(function() {
                portfolioIsotop();
            }, 1000);
        }
        $lastHash = 1;

    });

    // To Contact Button
    $(".to-contact").on('click', function() {
        var func = animateRandom();

        $(".menu > li a").removeClass("active");
        $('.menu > li:last-child a').addClass('active');
        if($window.width()<992){
            $("#main > section.active").addClass(func[1]).removeClass("active");
            $('#main > section:last-child').addClass('active ' + func[0]);
        }
        else{

            $("#main > section.active").removeClass("active");
            $('#main > section:last-child').addClass('active ');
                    openMenu();


        }
        
        $lastHash = 1;


    })

    // Next Page Button
    $(".next-page").on("click", function() {
        $lastHash = 1;
        var func = animateRandom();
        if ($(".menu > li a.active").attr('href') !== $last) {
            $(".menu > li a.active").each(function() {
                $(this).parents('li').next('li').children('a').each(function() {
                    if ($(this).attr('href') !== $first && $(this).attr('href') !== $last && $window.width() > 991) {
                        closeMenu(); //decrease Menu width
                    } else {
                        openMenu(); //increase Menu width
                        $('#main > section:last-child').css({width: '100%'});
                    }
                    if($window.width()<992){
                        $(this).addClass('active');
                        var $id = $(this).attr('href');
                        changeWindowLocation($id);
                        $("#main > section.active").addClass(func[1]).removeClass("active");
                        $main.children($id).addClass('active ' + func[0]);
                    }
                    else if ($(".menu > li a.active").attr('href') == $first || $(this).attr('href') == $last){
                        $(this).addClass('active');
                        var $id = $(this).attr('href');
                        changeWindowLocation($id);
                        $("#main > section.active").removeClass("active");
                        $main.children($id).addClass('active');
                    }
                    else{
                        $(this).addClass('active');
                        var $id = $(this).attr('href');
                        changeWindowLocation($id);
                        $("#main > section.active").addClass(func[1]).removeClass("active");
                        $main.children($id).addClass('active ' + func[0]);
                    }
  
                })
                $(this).removeClass('active');
            });
            owlCrousel();
        } else {
            $("#main > section.active").addClass(func[1]).removeClass("active");
            $(".menu > li a.active").removeClass("active");
            $(".menu > li:first-child a").addClass('active');
            $("main > section:first-child").addClass('active ' + func[0]);
            changeWindowLocation($first);
        }

    });
    // Prev Page Button
    $(".prev-page").on("click", function() {
        $lastHash = 1;
        var func = animateRandom();
        if ($(".menu > li a.active").attr('href') !== $first) {
            $(".menu > li a.active").each(function() {
                $(this).parents('li').prev('li').children('a').each(function() {
                    if ($(this).attr('href') !== $first && $(this).attr('href') !== $last && $window.width() > 992) {
                        closeMenu(); //decrease Menu width
                    } else {
                        openMenu(); //increase Menu width
                        $('#main > section:first-child').css({width: '100%'});
                    }
                    if($window.width()<992){
                        $(this).addClass('active');
                        var $id = $(this).attr('href');
                        changeWindowLocation($id);
                        $("#main > section.active").addClass(func[1]).removeClass("active");
                        $main.children($id).addClass('active ' + func[0]);
                    }
                    else if ($(".menu > li a.active").attr('href') == $last || $(this).attr('href') == $first){
                        $(this).addClass('active');
                        var $id = $(this).attr('href');
                        changeWindowLocation($id);
                        $("main > section.active").removeClass("active");
                        $main.children($id).addClass('active ');    
                    }
                    else{
                        $(this).addClass('active');
                        var $id = $(this).attr('href');
                        changeWindowLocation($id);
                        $("main > section.active").addClass(func[1]).removeClass("active");
                        $main.children($id).addClass('active ' + func[0]);
                    }
                })
                $(this).removeClass('active');
            });
            owlCrousel();

        } else {
            $(".menu > li a.active").removeClass("active");
            $("main > section.active").addClass(func[1]).removeClass("active");
            $("main > section:last-child").addClass('active ' + func[0]);
            $(".menu > li:last-child a").addClass('active');
            changeWindowLocation($last);

        }

    });
}

/*-------------------------  Animate Random  -------------------------*/
function animateRandom() {
    const animate = [
        ["animate__backInDown", "animate__backOutDown"],
        ["animate__zoomIn", "animate__zoomOut"],
        ["animate__fadeInDown", "animate__fadeOutDown"],
    ];

    $.each(animate, function(i, v) {
        $("#main > section").removeClass(v[0]);
        $("#main > section").removeClass(v[1]);
    });

    const random = Math.floor(Math.random() * animate.length);
    return animate[random];
}

/*-------------------------  Change Window Location  -------------------------*/
function changeWindowLocation($id) {

    "use strict";
    window.location = $id;
}

/*-------------------------  Testimonial Owlcarousel  -------------------------*/
function owlCrousel() {
    "use strict";
    var counter = 1;
    $(".portfolio-page-carousel.owl-carousel").owlCarousel({
        items: 1,
        padding: 0,
        nav: false,
        autoplay: false,
        loop: true,
        dots: true,
        mouseDrag: true,
        touchDrag: true,
        smartSpeed: 1000,
        autoplayHoverPause: true,
    });
    if ($("#main > section.active").attr('id') == 'about') {

        $(".owl-carousel").owlCarousel({
            items: 1,
            padding: 0,
            nav: false,
            autoplay: false,
            loop: true,
            dots: true,
            mouseDrag: true,
            touchDrag: true,
            smartSpeed: 1000,
            autoplayHoverPause: true,
            margin: 20
        });
    }
}

/*-------------------------  ISOTOPE JS  -------------------------*/
/* =========================================================
   PORTFOLIO FILTERING
   Category + Selected / All modes
========================================================= */

function portfolioIsotop() {

  "use strict";


  var $portfolio =
    $("#portfolio");


  var $grid =
    $(".portfolio-items");


  var $filter =
    $("#portfolio-filter");


  var $modeButtons =
    $(".portfolio-mode-btn");


  if (
    !$portfolio.length ||
    !$grid.length
  ) {

    return;

  }



  /* -----------------------------------------
     Current state
  ----------------------------------------- */

  var currentFilter =
    $portfolio.attr(
      "data-current-filter"
    ) || "*";


  var currentMode =
    $portfolio.attr(
      "data-portfolio-mode"
    ) || "selected";



  /* -----------------------------------------
     Initialize / refresh Isotope
  ----------------------------------------- */

  if (
    !$grid.data(
      "isotope"
    )
  ) {

    $grid.isotope({

      itemSelector:
        ".portfolio-item",

      layoutMode:
        "masonry",

      transitionDuration:
        "0.45s"

    });

  }



  /* -----------------------------------------
     Combined filtering
  ----------------------------------------- */

  function applyPortfolioFilter() {

    $portfolio.attr(
      "data-current-filter",
      currentFilter
    );


    $portfolio.attr(
      "data-portfolio-mode",
      currentMode
    );


    $grid.isotope({

      filter: function () {

        var $item =
          $(this);


        var categoryMatches =
          currentFilter === "*" ||
          $item.is(
            currentFilter
          );


        var modeMatches =
          currentMode === "all" ||
          $item.hasClass(
            "selected-work"
          );


        return (
          categoryMatches &&
          modeMatches
        );

      }

    });



    /* ---------------------------------------
       Featured project visibility
    --------------------------------------- */

    var showFeatured =
      (
        currentFilter === "*" ||
        currentFilter === ".web"
      );


    $(".portfolio-featured")
      .toggleClass(
        "is-filtered-out",
        !showFeatured
      );



    /* ---------------------------------------
       Result label
    --------------------------------------- */

    var label =
      document.getElementById(
        "portfolioResultLabel"
      );


    if (label) {

      if (
        currentMode === "selected"
      ) {

        label.textContent =
          currentFilter === "*"
            ? "Showing selected work"
            : "Showing selected " +
              currentFilter
                .replace(".", "") +
              " projects";

      } else {

        label.textContent =
          currentFilter === "*"
            ? "Showing all projects"
            : "Showing all " +
              currentFilter
                .replace(".", "") +
              " projects";

      }

    }



    /* ---------------------------------------
       Recalculate after animation
    --------------------------------------- */

    window.setTimeout(
      function () {

        $grid.isotope(
          "layout"
        );

      },
      480
    );

  }



  /* -----------------------------------------
     Category filter
  ----------------------------------------- */

  $filter
    .find("a")
    .off(
      "click.portfolioV2"
    )
    .on(
      "click.portfolioV2",
      function (event) {

        event.preventDefault();


        currentFilter =
          $(this).attr(
            "data-filter"
          );


        $filter
          .find("a")
          .removeClass(
            "active"
          );


        $(this)
          .addClass(
            "active"
          );


        applyPortfolioFilter();

      }
    );



  /* -----------------------------------------
     Selected / All mode
  ----------------------------------------- */

  $modeButtons
    .off(
      "click.portfolioMode"
    )
    .on(
      "click.portfolioMode",
      function () {

        currentMode =
          $(this).attr(
            "data-portfolio-mode"
          );


        $modeButtons
          .removeClass(
            "active"
          );


        $(this)
          .addClass(
            "active"
          );


        applyPortfolioFilter();

      }
    );


  applyPortfolioFilter();

}
/*-------------------------  MAGNIFIC POPUP JS  -------------------------*/
function portfolioPopup() {

    "use strict";

   if ($('.portfolio-items').length > 0) {
        $('.portfolio-items').each(function() {
          $(this).magnificPopup({

    delegate:
      "a.portfolio-magnific",

    type:
      "image",

    removalDelay:
      300,

    mainClass:
      "mfp-fade",


    image: {

      titleSrc:
        "title"

    },


    gallery: {

      enabled:
        true,

      navigateByImgClick:
        true,

      preload:
        [0, 2],

      tCounter:
        "%curr% of %total%"

    },
                iframe: {
                    markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' + '<div class="mfp-title mfp-bottom-iframe-title"></div>' + "</div>",
                    patterns: {
                        youtube: {
                            index: "youtube.com/",
                            id: null,
                            src: "%id%?autoplay=1"
                        },
                        vimeo: {
                            index: "vimeo.com/",
                            id: "/",
                            src: "https://player.vimeo.com/video/%id%?autoplay=1"
                        },
                        gmaps: {
                            index: "//maps.google.",
                            src: "%id%&output=embed"
                        },
                    },
                    srcAction: "iframe_src",
                },
            });
        });
    }
}

/*-------------------------  GOOGLE Map  -------------------------*/
function mapInit() {

    "use strict";
    var myMap = $('#my-map');

    if (myMap.length) {
        var lat = myMap.data("location-lat");
        var lng = myMap.data("location-lng");
        var options = {
            center: new google.maps.LatLng(lat, lng),
            zoom: 7,
            mapTypeControl: true,
            gestureHandling: 'cooperative',
            panControl: false,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.DEFAULT,
                position: google.maps.ControlPosition.TOP_LEFT
            },
            scaleControl: false,
            styles: [{
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#576ee9"
                }, {
                    "lightness": 17
                }]
            }, {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f5f5"
                }, {
                    "lightness": 20
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 17
                }]
            }, {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 29
                }, {
                    "weight": 0.2
                }]
            }, {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 18
                }]
            }, {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }, {
                    "lightness": 18
                }]
            }, {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f5f5"
                }, {
                    "lightness": 21
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#d5d5d5"
                }, {
                    "lightness": 21
                }]
            }, {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#f8f8f8"
                }, {
                    "lightness": 25
                }]
            }, {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "saturation": 36
                }, {
                    "color": "#222222"
                }, {
                    "lightness": 30
                }]
            }, {
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#f5f5f5"
                }, {
                    "lightness": 19
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#fefefe"
                }, {
                    "lightness": 10
                }]
            }, {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#fefefe"
                }, {
                    "lightness": 17
                }, {
                    "weight": 1.2
                }]
            }],
        };
        var map = new google.maps.Map(document.getElementById('my-map'), options);
        var marker1 = new google.maps.Marker({
            position: map.getCenter(),
            title: $('title').text(),
            icon: myMap.data("location-icon"),
            animation: google.maps.Animation.BOUNCE
        });
        marker1.setMap(map);
    }
}

/*-------------------------  Mouse Magic Cursor  -------------------------*/
function mouseMagicCursor() {
  "use strict";

  const innerCursor = document.querySelector(".mmc-inner");
  const outerCursor = document.querySelector(".mmc-outer");
  const cursorText = document.querySelector(".cursor-text");

  if (
    !innerCursor ||
    !outerCursor ||
    !cursorText ||
    window.innerWidth <= 991
  ) {
    return;
  }

  const cursorMessages = [
    "HIRE ME 🥺",
    "PLEASE 🥺",
    "I'LL DO MY BEST 🌟",
    "PROMISE 🤞"
  ];

  let currentMessage = 0;

  cursorText.textContent = cursorMessages[currentMessage];

  const messageInterval = setInterval(function () {
    currentMessage = (currentMessage + 1) % cursorMessages.length;
    cursorText.textContent = cursorMessages[currentMessage];
  }, 2000);

  window.addEventListener("mousemove", function (event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    innerCursor.style.transform =
      `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    outerCursor.style.transform =
      `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    cursorText.style.transform =
      `translate3d(${mouseX + 20}px, ${mouseY + 16}px, 0)`;
  });

  document
  .querySelectorAll("a, button, .cursor-pointer")
  .forEach(function (element) {
    element.addEventListener("mouseenter", function () {
      innerCursor.classList.add("mmc-hover");
      outerCursor.classList.add("mmc-hover");

      // Hide text when hovering clickable items
      cursorText.style.opacity = "0";
    });

    element.addEventListener("mouseleave", function () {
      innerCursor.classList.remove("mmc-hover");
      outerCursor.classList.remove("mmc-hover");

      // Show text again
      cursorText.style.opacity = "1";
    });
  });

  innerCursor.style.visibility = "visible";
  outerCursor.style.visibility = "visible";
  cursorText.style.visibility = "visible";
  cursorText.style.opacity = "1";

  window.addEventListener("beforeunload", function () {
    clearInterval(messageInterval);
  });
}
/*-------------------------
   Interactive Hero Portrait
-------------------------*/
function heroImageReveal() {
  "use strict";

  const portrait = document.getElementById("heroPortraitReveal");
  const revealImage = document.getElementById("heroPortraitLayer");

  if (
    !portrait ||
    !revealImage ||
    window.innerWidth <= 991
  ) {
    return;
  }

  /*
    These images rotate every time
    the visitor enters the portrait.
  */
  const revealLayers = [
    "assets/img/webdesigner/hero-layers/profile-skeleton.png",
    "assets/img/webdesigner/hero-layers/profile-code.png",
    "assets/img/webdesigner/hero-layers/profile-automation.png",
    "assets/img/webdesigner/hero-layers/profile-data.png",
    "assets/img/webdesigner/hero-layers/profile-marketing.png",
    "assets/img/webdesigner/hero-layers/profile-software.png"
  ];

  /*
    Preload all images so the reveal does not
    flash or lag the first time each one appears.
  */
  revealLayers.forEach(function (src) {
    const image = new Image();
    image.src = src;
  });

  let currentLayer = -1;

  /*
    Move the reveal circle to the mouse position.
  */
  function updateRevealPosition(event) {
    const rect = portrait.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    portrait.style.setProperty(
      "--reveal-x",
      x + "px"
    );

    portrait.style.setProperty(
      "--reveal-y",
      y + "px"
    );
  }

  /*
    Every NEW hover selects the next image.

    Hover 1 = Skeleton
    Hover 2 = Code
    Hover 3 = Automation
    Hover 4 = Data
    Hover 5 = Marketing
    Hover 6 = Software Engineering
    Then repeat.
  */
  portrait.addEventListener(
    "mouseenter",
    function (event) {

      currentLayer =
        (currentLayer + 1) %
        revealLayers.length;

      revealImage.src =
        revealLayers[currentLayer];

      updateRevealPosition(event);

      portrait.classList.add(
        "is-revealing"
      );
    }
  );


  /*
    Follow the cursor while inside
    the portrait.
  */
  portrait.addEventListener(
    "mousemove",
    function (event) {

      updateRevealPosition(event);

    }
  );


  /*
    When the mouse leaves:
    return completely to normal photo.
  */
  portrait.addEventListener(
    "mouseleave",
    function () {

      portrait.classList.remove(
        "is-revealing"
      );

    }
  );
}

/*---------------------------------------------------------
                    PORTFOLIO CHATBOT
---------------------------------------------------------*/

function portfolioChatbot() {

  "use strict";


  const toggle =
    document.getElementById(
      "chatbotToggle"
    );

  const panel =
    document.getElementById(
      "chatbotPanel"
    );

  const closeButton =
    document.getElementById(
      "chatbotClose"
    );

  const form =
    document.getElementById(
      "chatbotForm"
    );

  const input =
    document.getElementById(
      "chatbotInput"
    );

  const messages =
    document.getElementById(
      "chatbotMessages"
    );


  /*
   * Stop if chatbot HTML
   * does not exist.
   */
  if (
    !toggle ||
    !panel ||
    !form ||
    !input ||
    !messages
  ) {

    return;

  }

  /*---------------------------------------------------------
              ROBOT CUTE POP-UP MESSAGES
---------------------------------------------------------*/

function robotTeaserMessages() {

  "use strict";

  const teaser =
    document.getElementById("chatbotTeaser");

  const teaserText =
    document.getElementById("chatbotTeaserText");

  const chatbotPanel =
    document.getElementById("chatbotPanel");

  const chatbotToggle =
    document.getElementById("chatbotToggle");


  if (!teaser || !teaserText) {
    return;
  }


  const messages = [

    "Hi! 👋",

    "Psst... hello! 🤖",

    "Need a hand? ✨",

    "Ask me about Luke 👀",

    "I know his projects! 😎",

    "Looking to hire? 👀",

    "Let's build something cool! 🚀",

    "Don't be shy! 🥺",

    "I'm friendly, promise! 🤖",

    "Got questions? I'm here! 💬"

  ];


  let messageIndex = 0;
  let hideTimer;


  function showTeaser() {

    if (
      chatbotPanel &&
      chatbotPanel.classList.contains("show")
    ) {

      teaser.classList.remove("show");

      return;

    }


    teaserText.textContent =
      messages[messageIndex];


    messageIndex =
      (messageIndex + 1) %
      messages.length;


    teaser.classList.add("show");


    clearTimeout(hideTimer);


    hideTimer =
      setTimeout(function() {

        teaser.classList.remove("show");

      }, 2700);

  }


  /* First message */
  setTimeout(
    showTeaser,
    1800
  );


  /* Repeat */
  setInterval(
    showTeaser,
    7000
  );


  /* Hide when robot is clicked */
  if (chatbotToggle) {

    chatbotToggle.addEventListener(
      "click",
      function() {

        teaser.classList.remove("show");

      }
    );

  }

}


/* IMPORTANT: actually start the pop-up messages */
robotTeaserMessages();


  /* =====================================
     OPEN / CLOSE CHAT
  ===================================== */

  function setChatOpen(isOpen) {

    panel.classList.toggle(
      "show",
      isOpen
    );

    panel.setAttribute(
      "aria-hidden",
      isOpen
        ? "false"
        : "true"
    );

    toggle.setAttribute(
      "aria-expanded",
      isOpen
        ? "true"
        : "false"
    );


    if (isOpen) {

      setTimeout(function() {

        input.focus();

      }, 250);

    }

  }


  toggle.addEventListener(
    "click",
    function(event) {

      event.stopPropagation();

      const isOpen =
        panel.classList.contains(
          "show"
        );

      setChatOpen(!isOpen);

    }
  );


  closeButton?.addEventListener(
    "click",
    function() {

      setChatOpen(false);

    }
  );


  /*
   * Do not close when clicking
   * inside the chatbot.
   */
  panel.addEventListener(
    "click",
    function(event) {

      event.stopPropagation();

    }
  );


  /*
   * Click outside to close.
   */
  document.addEventListener(
    "click",
    function() {

      if (
        panel.classList.contains(
          "show"
        )
      ) {

        setChatOpen(false);

      }

    }
  );


  /* =====================================
     ADD MESSAGE
  ===================================== */

  function addMessage(
    text,
    type
  ) {

    const message =
      document.createElement(
        "div"
      );

    message.className =
      "chat-message " +
      (
        type === "user"
          ? "user-message"
          : "bot-message"
      );


    if (type !== "user") {

      const avatar =
        document.createElement(
          "div"
        );

      avatar.className =
        "chat-message-avatar";

      avatar.textContent =
        "🤖";

      message.appendChild(
        avatar
      );

    }


    const bubble =
      document.createElement(
        "div"
      );

    bubble.className =
      "chat-message-bubble";

    /*
     * textContent prevents
     * HTML injection.
     */
    bubble.textContent =
      text;


    message.appendChild(
      bubble
    );

    messages.appendChild(
      message
    );


    /*
     * Always scroll to
     * newest message.
     */
    messages.scrollTop =
      messages.scrollHeight;

  }


  /* =====================================
     BOT KNOWLEDGE
  ===================================== */

  function getBotReply(question) {

    const text =
      question
        .toLowerCase()
        .trim();


    /* Greetings */

    if (
      text.includes("hello") ||
      text.includes("hi ") ||
      text === "hi" ||
      text.includes("hey")
    ) {

      return (
        "Hi! 👋 I'm Luke's virtual assistant. " +
        "You can ask me about his skills, " +
        "work, services, projects, or how to contact him."
      );

    }


    /* Skills */

    if (
      text.includes("skill") ||
      text.includes("technology") ||
      text.includes("tech stack") ||
      text.includes("tools")
    ) {

      return (
        "Luke works across software engineering, " +
        "web development, WordPress, data analytics, " +
        "automation and integrations, SEO, digital marketing, " +
        "and technical virtual assistance."
      );

    }


    /* Software */

    if (
      text.includes("software") ||
      text.includes("developer") ||
      text.includes("coding") ||
      text.includes("programming")
    ) {

      return (
        "Luke has software and web development experience " +
        "using technologies such as HTML, CSS, JavaScript, " +
        "React, PHP, Python, SQL, PL/SQL, and database technologies."
      );

    }


    /* Data */

    if (
      text.includes("data") ||
      text.includes("analytics") ||
      text.includes("dashboard")
    ) {

      return (
        "Luke works with data analysis, SQL, Python, Excel, " +
        "Tableau, Power BI, reporting, dashboards, " +
        "and turning raw data into useful insights."
      );

    }


    /* Automation */

    if (
      text.includes("automation") ||
      text.includes("integration")
    ) {

      return (
        "Luke builds and supports digital workflows, " +
        "automations, integrations, and systems that connect " +
        "websites, data, marketing, and business processes."
      );

    }


    /* Services */

    if (
      text.includes("service") ||
      text.includes("offer") ||
      text.includes("help with")
    ) {

      return (
        "Luke can help with web development, WordPress, " +
        "technical virtual assistance, automation, " +
        "data analytics, SEO, website optimization, " +
        "and digital marketing support."
      );

    }


    /* Portfolio / Work */

    if (
      text.includes("work") ||
      text.includes("portfolio") ||
      text.includes("project") ||
      text.includes("sample")
    ) {

      return (
        "You can explore Luke's projects in the Works section. " +
        "His portfolio includes web development, design, " +
        "data, automation, and digital projects."
      );

    }


    /* Experience */

    if (
      text.includes("experience") ||
      text.includes("background")
    ) {

      return (
        "Luke combines professional software engineering " +
        "experience with freelance technical work, " +
        "web development, data analytics, and community leadership."
      );

    }


    /* Hire / Availability */

    if (
      text.includes("hire") ||
      text.includes("available") ||
      text.includes("freelance") ||
      text.includes("job")
    ) {

      return (
        "Yes — Luke is open to discussing freelance, " +
        "technical, web, data, and software opportunities. " +
        "You can contact him through the Contact section, " +
        "Telegram, LinkedIn, or Viber."
      );

    }


    /* Contact */

    if (
      text.includes("contact") ||
      text.includes("email") ||
      text.includes("message")
    ) {

      return (
        "You can reach Luke using the Contact section " +
        "or through the Telegram, LinkedIn, and Viber icons " +
        "in this sidebar."
      );

    }


    /* Resume */

    if (
      text.includes("resume") ||
      text.includes("cv")
    ) {

      return (
        "Luke's CV is available through the Download CV " +
        "button in the left sidebar."
      );

    }


    /* Default */

    return (
      "I'm still learning about Luke! 🤖 " +
      "Try asking me about his skills, work, " +
      "services, experience, data expertise, " +
      "automation, or how to hire him."
    );

  }


  /* =====================================
     SEND QUESTION
  ===================================== */

  function submitQuestion(question) {

    const cleanQuestion =
      question.trim();


    if (!cleanQuestion) {

      return;

    }


    addMessage(
      cleanQuestion,
      "user"
    );


    input.value = "";


    /*
     * Small delay makes the bot
     * feel more natural.
     */
    setTimeout(function() {

      const reply =
        getBotReply(
          cleanQuestion
        );

      addMessage(
        reply,
        "bot"
      );

    }, 500);

  }


  /* Form submit */

  form.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();

      submitQuestion(
        input.value
      );

    }
  );


  /* =====================================
     QUICK ACTION BUTTONS
  ===================================== */

  document
    .querySelectorAll(
      ".chatbot-quick-btn"
    )
    .forEach(
      function(button) {

        button.addEventListener(
          "click",
          function() {

            const question =
              this.getAttribute(
                "data-question"
              );

            submitQuestion(
              question
            );

          }
        );

      }
    );

}

/*-------------------------  Color Panllet  -------------------------*/
function ColorPallet() {

    "use strict";

    $("ul.pattern .color1").click(function () {
        return $("#option-color").attr("href", "assets/colors/green.css")
    });
    $("ul.pattern .color2").click(function () {
        return $("#option-color").attr("href", "assets/colors/yellow.css")
    });
    $("ul.pattern .color3").click(function () {
        return $("#option-color").attr("href", "assets/colors/golden.css")
    });
    $("ul.pattern .color4").click(function () {
        return $("#option-color").attr("href", "assets/colors/sky-blue.css")
    });
    $("ul.pattern .color5").click(function () {
        return $("#option-color").attr("href", "assets/colors/blue.css")
    });
    $("ul.pattern .color6").click(function () {
        return $("#option-color").attr("href", "assets/colors/purple.css")
    });
    $("ul.pattern .color7").click(function () {
        return $("#option-color").attr("href", "assets/colors/orange.css")
    });
    $("ul.pattern .color8").click(function () {
        return $("#option-color").attr("href", "assets/colors/pink.css")
    });
    $("ul.pattern .color9").click(function () {
        return $("#option-color").attr("href", "assets/colors/red.css")
    });
    $("#color-switcher .pallet-button").click(function () {
        $("#color-switcher .color-pallet").toggleClass('show')
    })
}

/*-------------------------  Theme Option  -------------------------*/
function themeOption(){

    "use strict";

    $('.color-scheme li .dark-scheme').click(function() {
        $("body").addClass('dark-arshia');
        $('.color-scheme li a').removeClass('active');
        $(this).addClass('active');
    });

    $('.color-scheme li .light-scheme').click(function() {
        $("body").removeClass('dark-arshia');
        $('.color-scheme li a').removeClass('active');
        $(this).addClass('active');
    });

    $('.theme-skin li .flat-skin').click(function() {
        $("body").removeClass('neo-arshia');
        $('.theme-skin li a').removeClass('active');
        $(this).addClass('active');
    });

    $('.theme-skin li .neo-skin').click(function() {
        $("body").addClass('neo-arshia');
        $('.theme-skin li a').removeClass('active');
        $(this).addClass('active');
    });
}


/* =========================================================
   ABOUT SECTION
   Scroll reveal + animated metrics
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  const aboutSection = document.querySelector("#about");

  if (!aboutSection) {
    return;
  }


  /* -----------------------------------------
     Respect reduced-motion preference
  ----------------------------------------- */

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  const revealItems = aboutSection.querySelectorAll(
    ".about-reveal"
  );


  const metricNumbers = aboutSection.querySelectorAll(
    ".about-metric-number"
  );


  let metricsAnimated = false;



  /* -----------------------------------------
     Finalize counters immediately
     when motion is disabled
  ----------------------------------------- */

  function setFinalMetricValues() {

    metricNumbers.forEach(function (element) {

      const target = Number(
        element.dataset.target || 0
      );

      const suffix =
        element.dataset.suffix || "";

      element.textContent =
        target + suffix;

    });

  }


  if (reduceMotion) {

    revealItems.forEach(function (item) {

      item.classList.add(
        "is-visible"
      );

    });


    setFinalMetricValues();

    return;

  }



  /* Enable animation styles only after JS exists */

  aboutSection.classList.add(
    "about-animate-ready"
  );



  /* -----------------------------------------
     Counter animation
  ----------------------------------------- */

  function animateMetric(element) {

    const target = Number(
      element.dataset.target || 0
    );

    const suffix =
      element.dataset.suffix || "";

    const duration = 1200;

    const start =
      performance.now();


    function update(currentTime) {

      const progress = Math.min(
        (currentTime - start) / duration,
        1
      );


      /*
       * Ease-out cubic:
       * fast start, smooth finish
       */

      const eased =
        1 - Math.pow(
          1 - progress,
          3
        );


      const currentValue =
        Math.floor(
          target * eased
        );


      element.textContent =
        currentValue + suffix;


      if (progress < 1) {

        requestAnimationFrame(
          update
        );

      } else {

        element.textContent =
          target + suffix;

      }

    }


    requestAnimationFrame(
      update
    );

  }



  function animateAllMetrics() {

    if (metricsAnimated) {
      return;
    }


    metricsAnimated = true;


    metricNumbers.forEach(
      function (element, index) {

        window.setTimeout(
          function () {

            animateMetric(
              element
            );

          },

          index * 120
        );

      }
    );

  }



  /* -----------------------------------------
     Intersection observer
  ----------------------------------------- */

  if (
    !("IntersectionObserver" in window)
  ) {

    revealItems.forEach(
      function (item) {

        item.classList.add(
          "is-visible"
        );

      }
    );


    animateAllMetrics();

    return;

  }



  const revealObserver =
    new IntersectionObserver(

      function (entries, observer) {

        entries.forEach(
          function (entry) {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            entry.target.classList.add(
              "is-visible"
            );


            /*
             * Start metrics only when
             * the metrics row enters view
             */

            if (
              entry.target.classList.contains(
                "about-v2-metrics"
              )
            ) {

              animateAllMetrics();

            }


            observer.unobserve(
              entry.target
            );

          }
        );

      },

      {
        threshold: 0.12,

        rootMargin:
          "0px 0px -30px 0px"
      }

    );



  revealItems.forEach(
    function (item) {

      revealObserver.observe(
        item
      );

    }
  );

});

/* =========================================================
   INTERACTIVE RESUME
========================================================= */

function interactiveResume() {

    "use strict";


    var resumeSection =
        document.querySelector("#resume");

    if (!resumeSection) {
        return;
    }



    /* =====================================================
       1. CAPABILITY TABS
    ===================================================== */

    var serviceButtons =
        resumeSection.querySelectorAll(
            ".resume-capability-tab"
        );

    var servicePanels =
        resumeSection.querySelectorAll(
            ".resume-service-panel"
        );


    function activateService(serviceName) {

        serviceButtons.forEach(function(button) {

            button.classList.toggle(
                "active",
                button.dataset.service === serviceName
            );

        });


        servicePanels.forEach(function(panel) {

            panel.classList.toggle(
                "active",
                panel.dataset.servicePanel === serviceName
            );

        });

    }


    serviceButtons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                activateService(
                    button.dataset.service
                );

            }
        );

    });



    /* =====================================================
       2. RESPONSIVE WEBSITE DEMO
    ===================================================== */

    var deviceButtons =
        resumeSection.querySelectorAll(
            ".resume-device-btn"
        );

    var browserDemo =
        resumeSection.querySelector(
            ".resume-browser"
        );


    if (browserDemo) {

        deviceButtons.forEach(function(button) {

            button.addEventListener(
                "click",
                function() {

                    deviceButtons.forEach(
                        function(item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    browserDemo.classList.remove(
                        "device-desktop",
                        "device-tablet",
                        "device-mobile"
                    );


                    browserDemo.classList.add(
                        "device-" +
                        button.dataset.device
                    );

                }
            );

        });

    }



    /* =====================================================
       3. DESIGN BEFORE / AFTER
    ===================================================== */

    var designSlider =
        resumeSection.querySelector(
            ".resume-design-slider"
        );

    var designCompare =
        resumeSection.querySelector(
            ".resume-design-compare"
        );


    if (
        designSlider &&
        designCompare
    ) {

        function updateDesignComparison() {

            designCompare.style.setProperty(
                "--design-reveal",
                designSlider.value + "%"
            );

        }


        designSlider.addEventListener(
            "input",
            updateDesignComparison
        );


        updateDesignComparison();

    }



    /* =====================================================
       4. DATA DASHBOARD DEMO
    ===================================================== */

    var chartButtons =
        resumeSection.querySelectorAll(
            ".data-demo-btn"
        );

    var chartBars =
        resumeSection.querySelectorAll(
            ".data-chart-bars span"
        );


    var metricOne =
        document.getElementById(
            "demoMetricOne"
        );

    var metricTwo =
        document.getElementById(
            "demoMetricTwo"
        );

    var metricThree =
        document.getElementById(
            "demoMetricThree"
        );


    var metricOneLabel =
        document.getElementById(
            "demoMetricOneLabel"
        );

    var metricTwoLabel =
        document.getElementById(
            "demoMetricTwoLabel"
        );

    var metricThreeLabel =
        document.getElementById(
            "demoMetricThreeLabel"
        );


    var dashboardViews = {

        sales: {

            bars:
                [34, 52, 44, 71, 62, 86, 76],

            labels:
                ["Revenue", "Orders", "Growth"],

            values:
                ["₱482K", "1,284", "+18%"]

        },


        customers: {

            bars:
                [62, 48, 72, 55, 84, 69, 91],

            labels:
                ["Customers", "Returning", "Retention"],

            values:
                ["1,284", "42%", "76%"]

        },


        regions: {

            bars:
                [82, 58, 36, 72, 48, 64, 89],

            labels:
                ["Regions", "Top Market", "Coverage"],

            values:
                ["8", "NCR", "74%"]

        }

    };


    function updateDashboard(viewName) {

        var data =
            dashboardViews[viewName];

        if (!data) {
            return;
        }


        chartBars.forEach(
            function(bar, index) {

                bar.style.setProperty(
                    "--bar-height",
                    data.bars[index] + "%"
                );

            }
        );


        if (metricOne) {

            metricOne.textContent =
                data.values[0];

            metricOneLabel.textContent =
                data.labels[0];

        }


        if (metricTwo) {

            metricTwo.textContent =
                data.values[1];

            metricTwoLabel.textContent =
                data.labels[1];

        }


        if (metricThree) {

            metricThree.textContent =
                data.values[2];

            metricThreeLabel.textContent =
                data.labels[2];

        }

    }


    chartButtons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                chartButtons.forEach(
                    function(item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                updateDashboard(
                    button.dataset.chartView
                );

            }
        );

    });



    /* =====================================================
       5. WEB VA TASK DEMO
    ===================================================== */

    var taskDemoButton =
        resumeSection.querySelector(
            ".resume-task-demo-btn"
        );

    var taskItems =
        resumeSection.querySelectorAll(
            ".support-task"
        );


    var taskDemoRunning = false;


    if (taskDemoButton) {

        taskDemoButton.addEventListener(
            "click",
            function() {

                if (taskDemoRunning) {
                    return;
                }


                taskDemoRunning = true;


                taskItems.forEach(
                    function(item) {

                        item.classList.remove(
                            "done"
                        );

                    }
                );


                taskDemoButton.innerHTML =
                    'Working... <i class="bi bi-arrow-repeat"></i>';


                taskItems.forEach(
                    function(item, index) {

                        window.setTimeout(
                            function() {

                                item.classList.add(
                                    "done"
                                );


                                if (
                                    index ===
                                    taskItems.length - 1
                                ) {

                                    window.setTimeout(
                                        function() {

                                            taskDemoButton.innerHTML =
                                                'Run Again <i class="bi bi-arrow-repeat"></i>';

                                            taskDemoRunning =
                                                false;

                                        },
                                        450
                                    );

                                }

                            },
                            index * 450
                        );

                    }
                );

            }
        );

    }



    /* =====================================================
       6. CLIENT PROBLEM SELECTOR
    ===================================================== */

    var problemButtons =
        resumeSection.querySelectorAll(
            ".resume-problem-btn"
        );


    var recommendationIcon =
        document.getElementById(
            "recommendationIcon"
        );

    var recommendationTitle =
        document.getElementById(
            "recommendationTitle"
        );

    var recommendationText =
        document.getElementById(
            "recommendationText"
        );

    var recommendationTags =
        document.getElementById(
            "recommendationTags"
        );


    var problemData = {

        website: {

            service: "web",

            icon: "bi-window",

            title:
                "Build a strong digital foundation",

            text:
                "Start with Web Development, then connect design, SEO, analytics and ongoing optimization based on what the business needs.",

            tags:
                [
                    "Web Development",
                    "Design",
                    "SEO"
                ]

        },


        visibility: {

            service: "seo",

            icon: "bi-search",

            title:
                "Make it easier for the right audience to find you",

            text:
                "Combine SEO, content structure, technical optimization and analytics to improve discoverability and understand what is working.",

            tags:
                [
                    "SEO",
                    "Content",
                    "Analytics"
                ]

        },


        data: {

            service: "data",

            icon: "bi-bar-chart",

            title:
                "Turn scattered information into clearer decisions",

            text:
                "Start with data cleaning and analysis, then build reporting or dashboards around the questions that matter most.",

            tags:
                [
                    "Data Analysis",
                    "Dashboards",
                    "Reporting"
                ]

        },


        automation: {

            service: "automation",

            icon: "bi-diagram-3",

            title:
                "Reduce repetitive work and connect the process",

            text:
                "Map the workflow first, identify unnecessary manual steps, then connect systems and automate where it creates practical value.",

            tags:
                [
                    "Automation",
                    "Integration",
                    "Workflow"
                ]

        },


        branding: {

            service: "design",

            icon: "bi-palette",

            title:
                "Create a clearer and more consistent digital identity",

            text:
                "Use design, brand consistency, website visuals and content structure to make the business easier to recognize and understand.",

            tags:
                [
                    "Design",
                    "Branding",
                    "Content"
                ]

        },


        support: {

            service: "support",

            icon: "bi-person-workspace",

            title:
                "Create one reliable workflow for ongoing digital needs",

            text:
                "Combine website updates, content, reporting, SEO, creative support and troubleshooting instead of managing every task separately.",

            tags:
                [
                    "Web Support",
                    "Content",
                    "Operations"
                ]

        }

    };


    function updateRecommendation(problemName) {

        var data =
            problemData[problemName];

        if (!data) {
            return;
        }


        activateService(
            data.service
        );


        if (recommendationIcon) {

            recommendationIcon.className =
                "bi " + data.icon;

        }


        if (recommendationTitle) {

            recommendationTitle.textContent =
                data.title;

        }


        if (recommendationText) {

            recommendationText.textContent =
                data.text;

        }


        if (recommendationTags) {

            recommendationTags.innerHTML =
                "";


            data.tags.forEach(
                function(tag) {

                    var span =
                        document.createElement(
                            "span"
                        );

                    span.textContent =
                        tag;


                    recommendationTags.appendChild(
                        span
                    );

                }
            );

        }

    }


    problemButtons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                problemButtons.forEach(
                    function(item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                updateRecommendation(
                    button.dataset.problem
                );

            }
        );

    });



    /* =====================================================
       7. EXPERIENCE TIMELINE
    ===================================================== */

    var careerButtons =
        resumeSection.querySelectorAll(
            ".career-point"
        );

    var careerPanels =
        resumeSection.querySelectorAll(
            ".career-detail"
        );


    careerButtons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                var careerName =
                    button.dataset.career;


                careerButtons.forEach(
                    function(item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                careerPanels.forEach(
                    function(panel) {

                        panel.classList.toggle(
                            "active",
                            panel.dataset.careerPanel ===
                            careerName
                        );

                    }
                );


                button.classList.add(
                    "active"
                );

            }
        );

    });



    /* =====================================================
       8. SCROLL REVEAL
    ===================================================== */

    var revealItems =
        resumeSection.querySelectorAll(
            ".resume-v2-reveal"
        );


    var reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (reduceMotion) {

        revealItems.forEach(
            function(item) {

                item.classList.add(
                    "is-visible"
                );

            }
        );

        return;

    }


    resumeSection.classList.add(
        "resume-animate-ready"
    );


    if (
        !("IntersectionObserver" in window)
    ) {

        revealItems.forEach(
            function(item) {

                item.classList.add(
                    "is-visible"
                );

            }
        );

        return;

    }


    var revealObserver =
        new IntersectionObserver(

            function(entries, observer) {

                entries.forEach(
                    function(entry) {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        entry.target.classList.add(
                            "is-visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },

            {

                threshold: .08,

                rootMargin:
                    "0px 0px -20px 0px"

            }

        );


    revealItems.forEach(
        function(item) {

            revealObserver.observe(
                item
            );

        }
    );

}

/* =========================================================
   INTERACTIVE PORTFOLIO
========================================================= */

function interactivePortfolio() {

  "use strict";


  var portfolio =
    document.getElementById(
      "portfolio"
    );


  if (!portfolio) {

    return;

  }



  /* =====================================================
     PROJECT DATA FOR QUICK VIEW
  ===================================================== */

  var projects = {


    fire: {

      category:
        "WEB • LMS • SEO",

      title:
        "Fire & Rescue Academy",

      summary:
        "A professional digital training platform built to support emergency-services education, course delivery, content management, and online discoverability.",

      contribution: [

        "Website development and responsive implementation",

        "Learning management system setup and course structure",

        "SEO and content optimization",

        "Technical troubleshooting and performance improvements"

      ],

      stack: [

        "WordPress",
        "Elementor",
        "Tutor LMS",
        "CSS",
        "SEO"

      ],

      links: [

        {
          label:
            "Visit Live",

          url:
            "https://fireandrescueacademy.com/",

          external:
            true
        }

      ]

    },



    iskolar: {

      category:
        "WEB • PLATFORM",

      title:
        "IskolarLink",

      summary:
        "A student information and coordination platform designed to improve academic communication and organize digital workflows in one environment.",

      contribution: [

        "Website and platform development",

        "Information architecture and content organization",

        "Responsive interface implementation",

        "Digital workflow planning"

      ],

      stack: [

        "WordPress",
        "Web Development",
        "UI Structure",
        "Workflow"

      ],

      links: [

        {
          label:
            "Visit Live",

          url:
            "https://dev-iskolarlink.pantheonsite.io/",

          external:
            true
        }

      ]

    },



    corporate: {

      category:
        "WEB • CORPORATE",

      title:
        "Corporate Disaster Response & Training",

      summary:
        "A professional corporate website created for a disaster-response and training organization, focused on presenting services clearly and strengthening its digital presence.",

      contribution: [

        "Website design and development",

        "Responsive implementation",

        "Content presentation and structure",

        "Digital presence improvements"

      ],

      stack: [

        "WordPress",
        "Web Design",
        "Responsive",
        "Content"

      ],

      links: [

        {
          label:
            "Visit Live",

          url:
            "https://conquerorscc.com/",

          external:
            true
        }

      ]

    },



    let: {

      category:
        "DATA • EDUCATION ANALYTICS",

      title:
        "LET Performance Trends",

      summary:
        "A data-analysis project exploring licensure examination performance, regional patterns, and educational outcomes across multiple years.",

      contribution: [

        "Data preparation and exploratory analysis",

        "Trend and geographic analysis",

        "Visualization and interpretation",

        "Interactive case-study presentation"

      ],

      stack: [

        "Python",
        "Data Analysis",
        "Visualization",
        "Statistics"

      ],

      links: [

        {
          label:
            "Explore Analysis",

          url:
            "let-performance-analysis.html",

          external:
            false
        }

      ]

    },



    spending: {

      category:
        "DATA • CUSTOMER BEHAVIOR",

      title:
        "Spending Behavior Analysis",

      summary:
        "An analytical project examining customer spending behavior, meaningful market segments, purchasing relationships, and future transaction patterns.",

      contribution: [

        "Exploratory Data Analysis",

        "Customer segmentation using K-Means",

        "Association-rule analysis",

        "Time-series forecasting"

      ],

      stack: [

        "Python",
        "Pandas",
        "K-Means",
        "Apriori",
        "ARIMA"

      ],

      links: [

        {
          label:
            "Explore Analysis",

          url:
            "customer-spending-analysis.html",

          external:
            false
        }

      ]

    },



    campaign1: {

      category:
        "CONTENT • CAMPAIGN",

      title:
        "Campaign Landing Experience",

      summary:
        "A campaign-oriented digital experience combining front-end implementation, content presentation, and visual hierarchy for promotional engagement.",

      contribution: [

        "Front-end implementation",

        "Campaign page layout",

        "Responsive styling",

        "Interactive content presentation"

      ],

      stack: [

        "HTML",
        "CSS",
        "JavaScript",
        "PHP"

      ],

      links: [

        {
          label:
            "View Campaign",

          url:
            "http://paidmediasandbox.3jzvudtzb5-dv13xg0776gq.p.temp-site.link/luke/mood/v2-20off/v2startup.html",

          external:
            true
        }

      ]

    },



    campaign2: {

      category:
        "CONTENT • INTERACTIVE",

      title:
        "Interactive Campaign Blog",

      summary:
        "A front-end campaign experience focused on visual storytelling, interactive presentation, and engaging content delivery.",

      contribution: [

        "Page development",

        "Interactive front-end behavior",

        "Responsive styling",

        "Campaign presentation"

      ],

      stack: [

        "HTML",
        "CSS",
        "JavaScript"

      ],

      links: [

        {
          label:
            "View Campaign",

          url:
            "https://va-0097.github.io/Mood/",

          external:
            true
        }

      ]

    }

  };



  /* =====================================================
     QUICK VIEW DRAWER
  ===================================================== */

  var drawer =
    document.getElementById(
      "portfolioProjectDrawer"
    );


  var backdrop =
    document.getElementById(
      "portfolioDrawerBackdrop"
    );


  var closeButton =
    document.getElementById(
      "portfolioDrawerClose"
    );


  var category =
    document.getElementById(
      "portfolioDrawerCategory"
    );


  var title =
    document.getElementById(
      "portfolioDrawerTitle"
    );


  var summary =
    document.getElementById(
      "portfolioDrawerSummary"
    );


  var contribution =
    document.getElementById(
      "portfolioDrawerContribution"
    );


  var stack =
    document.getElementById(
      "portfolioDrawerStack"
    );


  var actions =
    document.getElementById(
      "portfolioDrawerActions"
    );

    /* =====================================================
   MOVE PROJECT DETAILS UI TO <body>
===================================================== */

/*
 * #portfolio lives inside the custom-scrolling
 * section system.
 *
 * Fixed elements inside transformed/custom-scroll
 * containers can create their own stacking context.
 *
 * Moving the drawer and backdrop directly under <body>
 * guarantees that they sit above:
 *
 * - right sidebar
 * - chatbot
 * - navigation arrows
 * - portfolio content
 */

if (
  backdrop &&
  backdrop.parentNode !== document.body
) {

  document.body.appendChild(
    backdrop
  );

}


if (
  drawer &&
  drawer.parentNode !== document.body
) {

  document.body.appendChild(
    drawer
  );

}


  function openPortfolioDrawer(
    projectKey
  ) {

    var project =
      projects[projectKey];


    if (
      !project ||
      !drawer
    ) {

      return;

    }


    category.textContent =
      project.category;


    title.textContent =
      project.title;


    summary.textContent =
      project.summary;



    /* Contribution */

    contribution.innerHTML =
      "";


    project.contribution.forEach(
      function (item) {

        var row =
          document.createElement(
            "div"
          );


        row.textContent =
          item;


        contribution.appendChild(
          row
        );

      }
    );



    /* Stack */

    stack.innerHTML =
      "";


    project.stack.forEach(
      function (item) {

        var tag =
          document.createElement(
            "span"
          );


        tag.textContent =
          item;


        stack.appendChild(
          tag
        );

      }
    );



    /* Actions */

    actions.innerHTML =
      "";


    project.links.forEach(
      function (link) {

        var anchor =
          document.createElement(
            "a"
          );


        anchor.href =
          link.url;


        anchor.innerHTML =
          link.label +
          ' <i class="bi bi-arrow-up-right"></i>';


        if (
          link.external
        ) {

          anchor.target =
            "_blank";

          anchor.rel =
            "noopener noreferrer";

        }


        actions.appendChild(
          anchor
        );

      }
    );


    document.body.classList.add(
  "portfolio-details-open"
);


    drawer.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.style
      .overflow =
      "hidden";

  }



  function closePortfolioDrawer() {

    document.body.classList.remove(
  "portfolio-details-open"
);


    if (drawer) {

      drawer.setAttribute(
        "aria-hidden",
        "true"
      );

    }


    document.body.style
      .overflow =
      "";

  }



  portfolio
    .querySelectorAll(
      ".portfolio-quick-view-btn"
    )
    .forEach(
      function (button) {

        button.addEventListener(
          "click",
          function () {

            openPortfolioDrawer(
              button.dataset.project
            );

          }
        );

      }
    );



  if (closeButton) {

    closeButton.addEventListener(
      "click",
      closePortfolioDrawer
    );

  }


  if (backdrop) {

    backdrop.addEventListener(
      "click",
      closePortfolioDrawer
    );

  }


  document.addEventListener(
    "keydown",
    function (event) {

      if (
  event.key === "Escape" &&
  document.body.classList.contains(
    "portfolio-details-open"
  )
) {

        closePortfolioDrawer();

      }

    }
  );


/* =====================================================
   CLICKABLE PROJECT MEDIA + FOLLOW-CURSOR LABEL
===================================================== */

portfolio
  .querySelectorAll(
    ".portfolio-v2-media"
  )
  .forEach(
    function (media) {

      var label =
        media.querySelector(
          ".portfolio-hover-label"
        );


      /*
       * Find the real project link that already exists
       * inside the project's card.
       *
       * Web projects:
       *   .portfolio-card-icon-link
       *
       * Featured project:
       *   .portfolio-browser-live / .portfolio-live-btn
       */
      var projectContainer =
        media.closest(
          ".portfolio-v2-card, .portfolio-featured"
        );


      var projectLink =
        projectContainer
          ? projectContainer.querySelector(
              ".portfolio-card-icon-link, " +
              ".portfolio-browser-live, " +
              ".portfolio-live-btn"
            )
          : null;



      /* -----------------------------------------
         Make the whole visual behave like a link
      ----------------------------------------- */

      if (projectLink) {

        media.setAttribute(
          "role",
          "link"
        );

        media.setAttribute(
          "tabindex",
          "0"
        );

        media.setAttribute(
          "aria-label",
          projectLink.getAttribute(
            "aria-label"
          ) || "Open project"
        );


        function openProject() {

          /*
           * Use the existing anchor so:
           *
           * target="_blank" stays respected
           * internal case-study links work normally
           */
          projectLink.click();

        }


        media.addEventListener(
          "click",
          function (event) {

            /*
             * Do not trigger twice if the visitor
             * clicked an actual link/button inside.
             */
            if (
              event.target.closest(
                "a, button"
              )
            ) {

              return;

            }


            openProject();

          }
        );


        media.addEventListener(
          "keydown",
          function (event) {

            if (
              event.key === "Enter" ||
              event.key === " "
            ) {

              event.preventDefault();

              openProject();

            }

          }
        );

      }



      /* -----------------------------------------
         Follow-cursor label
      ----------------------------------------- */

      if (!label) {

        return;

      }


      media.addEventListener(
        "mousemove",
        function (event) {

          var rect =
            media.getBoundingClientRect();


          var x =
            event.clientX -
            rect.left;


          var y =
            event.clientY -
            rect.top;


          label.style.left =
            x + "px";


          label.style.top =
            y + "px";

        }
      );

    }
  );

  /* =====================================================
     FEATURED PROJECT SUBTLE 3D TILT
  ===================================================== */

  var featuredVisual =
    portfolio.querySelector(
      ".portfolio-featured-visual"
    );


  var featuredBrowser =
    portfolio.querySelector(
      ".portfolio-browser-shell"
    );


  if (
    featuredVisual &&
    featuredBrowser &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {

    featuredVisual.addEventListener(
      "mousemove",
      function (event) {

        var rect =
          featuredVisual
            .getBoundingClientRect();


        var x =
          (
            event.clientX -
            rect.left
          ) /
          rect.width;


        var y =
          (
            event.clientY -
            rect.top
          ) /
          rect.height;


        var rotateY =
          (x - .5) * 3;


        var rotateX =
          (.5 - y) * 3;


        featuredBrowser.style
          .transform =
          "rotateX(" +
          rotateX +
          "deg) rotateY(" +
          rotateY +
          "deg)";

      }
    );


    featuredVisual.addEventListener(
      "mouseleave",
      function () {

        featuredBrowser.style
          .transform =
          "rotateX(0deg) rotateY(0deg)";

      }
    );

  }
/* =====================================================
   FULL CREATIVE GALLERY
   12 WORKS INCLUDING MOTION
===================================================== */

var creativeGalleryButton =
  document.getElementById(
    "openCreativeGallery"
  );


var creativeGalleryTriggers =
  portfolio.querySelectorAll(
    ".creative-gallery-trigger"
  );


/*
 * Complete Creative Collection
 *
 * 01 = GIF
 * 02 = MP4 motion
 * 03-09 = Graphics
 * 10-12 = Additional visual work
 */

var creativeGalleryItems = [

  {
    src:
      "assets/img/webdesigner/graphic1.gif",

    type:
      "image",

    title:
      "Creative Work 01"
  },


  {
    src:
      "#creativeVideo02",

    type:
      "inline",

    title:
      "Creative Work 02 — Motion"
  },


  {
    src:
      "assets/img/webdesigner/graphic3.png",

    type:
      "image",

    title:
      "Creative Work 03"
  },


  {
    src:
      "assets/img/webdesigner/graphic4.png",

    type:
      "image",

    title:
      "Creative Work 04"
  },


  {
    src:
      "assets/img/webdesigner/graphic5.png",

    type:
      "image",

    title:
      "Creative Work 05"
  },


  {
    src:
      "assets/img/webdesigner/graphic6.png",

    type:
      "image",

    title:
      "Creative Work 06"
  },


  {
    src:
      "assets/img/webdesigner/graphic7.png",

    type:
      "image",

    title:
      "Creative Work 07"
  },


  {
    src:
      "assets/img/webdesigner/graphic8.png",

    type:
      "image",

    title:
      "Creative Work 08"
  },


  {
    src:
      "assets/img/webdesigner/graphic9.png",

    type:
      "image",

    title:
      "Creative Work 09"
  },


  {
    src:
      "assets/img/webdesigner/img1.png",

    type:
      "image",

    title:
      "Creative Work 10"
  },


  {
    src:
      "assets/img/webdesigner/img2.png",

    type:
      "image",

    title:
      "Creative Work 11"
  },


  {
    src:
      "assets/img/webdesigner/img3.png",

    type:
      "image",

    title:
      "Creative Work 12"
  }

];



function pauseCreativeVideos() {

  document
    .querySelectorAll(
      ".creative-video-popup video"
    )
    .forEach(
      function (video) {

        video.pause();

      }
    );

}



function openCreativeGallery(
  startIndex
) {

  $.magnificPopup.open(

    {

      items:
        creativeGalleryItems,


      gallery: {

        enabled:
          true,

        navigateByImgClick:
          true,

        preload:
          [0, 2],

        tPrev:
          "Previous work",

        tNext:
          "Next work",

        tCounter:
          "%curr% of %total%"

      },


      image: {

        titleSrc:
          function (item) {

            return (
              item.data.title ||
              ""
            );

          }

      },


      mainClass:
        "mfp-fade creative-gallery-popup",


      removalDelay:
        250,


      callbacks: {

        change:
          function () {

            pauseCreativeVideos();

          },


        close:
          function () {

            pauseCreativeVideos();

          }

      }

    },

    startIndex || 0

  );

}



/* Main CTA */

if (creativeGalleryButton) {

  creativeGalleryButton.addEventListener(
    "click",
    function () {

      openCreativeGallery(
        0
      );

    }
  );

}



/* Mosaic preview items */

creativeGalleryTriggers.forEach(
  function (trigger) {

    trigger.addEventListener(
      "click",
      function () {

        var index =
          Number(
            trigger.dataset
              .galleryIndex || 0
          );


        openCreativeGallery(
          index
        );

      }
    );

  }
);
}


/* =========================================================
   INTERACTIVE BLOG / JOURNAL
========================================================= */

function interactiveBlog() {

  "use strict";


  var blog =
    document.getElementById(
      "blog"
    );


  if (!blog) {

    return;

  }



  /* =====================================================
     ELEMENTS
  ===================================================== */

  var filterButtons =
    blog.querySelectorAll(
      ".blog-filter-btn"
    );


  var featuredArticle =
    blog.querySelector(
      ".blog-featured-article"
    );


  var articleCards =
    blog.querySelectorAll(
      ".blog-v2-card"
    );


  var interestButtons =
    blog.querySelectorAll(
      ".blog-interest-item"
    );


  var resultLabel =
    document.getElementById(
      "blogResultsLabel"
    );



  /* =====================================================
     FILTER
  ===================================================== */

  function applyBlogFilter(
    category
  ) {


    /* -----------------------------------------
       Filter buttons
    ----------------------------------------- */

    filterButtons.forEach(
      function (button) {

        button.classList.toggle(

          "active",

          button.dataset.blogFilter ===
            category

        );

      }
    );



    /* -----------------------------------------
       Featured article
    ----------------------------------------- */

    if (featuredArticle) {

      var featuredCategory =
        featuredArticle.dataset
          .blogCategory;


      var showFeatured =
        category === "all" ||
        category ===
          featuredCategory;


      featuredArticle.classList.toggle(

        "blog-filter-hidden",

        !showFeatured

      );


      if (showFeatured) {

        featuredArticle.classList.remove(
          "blog-filter-showing"
        );


        /*
         * Force a reflow so animation
         * can replay.
         */

        void featuredArticle
          .offsetWidth;


        featuredArticle.classList.add(
          "blog-filter-showing"
        );

      }

    }



    /* -----------------------------------------
       Journal cards
    ----------------------------------------- */

    var visibleCount =
      featuredArticle &&
      (
        category === "all" ||
        category === "web"
      )
        ? 1
        : 0;


    articleCards.forEach(
      function (card) {

        var cardCategory =
          card.dataset
            .blogCategory;


        var showCard =
          category === "all" ||
          cardCategory === category;


        card.classList.toggle(

          "blog-filter-hidden",

          !showCard

        );


        if (showCard) {

          visibleCount++;


          card.classList.remove(
            "blog-filter-showing"
          );


          void card.offsetWidth;


          card.classList.add(
            "blog-filter-showing"
          );

        }

      }
    );



    /* -----------------------------------------
       Result label
    ----------------------------------------- */

    if (resultLabel) {

      if (
        category === "all"
      ) {

        resultLabel.textContent =
          "Showing all 4 insights";

      } else {

        var categoryLabels = {

          web:
            "web & digital strategy",

          data:
            "data & analytics",

          seo:
            "SEO & digital growth",

          career:
            "career & community"

        };


        resultLabel.textContent =
          "Showing " +
          visibleCount +
          " insight about " +
          categoryLabels[category];

      }

    }

  }



  /* =====================================================
     FILTER BUTTON EVENTS
  ===================================================== */

  filterButtons.forEach(
    function (button) {

      button.addEventListener(

        "click",

        function () {

          applyBlogFilter(
            button.dataset.blogFilter
          );

        }

      );

    }
  );



  /* =====================================================
     EXPLORE BY INTEREST
  ===================================================== */

  interestButtons.forEach(
    function (button) {

      button.addEventListener(

        "click",

        function () {

          var category =
            button.dataset.blogInterest;


          applyBlogFilter(
            category
          );


          /*
           * Bring the visitor back
           * to the filtered journal.
           */

          var filterArea =
            blog.querySelector(
              ".blog-v2-filter-wrap"
            );


          if (filterArea) {

            filterArea.scrollIntoView({

              behavior:
                "smooth",

              block:
                "start"

            });

          }

        }

      );

    }
  );



  /* =====================================================
     SCROLL REVEAL
  ===================================================== */

  var revealItems =
    blog.querySelectorAll(
      ".blog-v2-reveal"
    );


  var reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (reduceMotion) {

    revealItems.forEach(
      function (item) {

        item.classList.add(
          "is-visible"
        );

      }
    );


    return;

  }



  blog.classList.add(
    "blog-animate-ready"
  );



  if (
    !(
      "IntersectionObserver"
      in window
    )
  ) {

    revealItems.forEach(
      function (item) {

        item.classList.add(
          "is-visible"
        );

      }
    );


    return;

  }



  var observer =
    new IntersectionObserver(

      function (
        entries,
        revealObserver
      ) {

        entries.forEach(
          function (entry) {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            entry.target
              .classList.add(
                "is-visible"
              );


            revealObserver
              .unobserve(
                entry.target
              );

          }
        );

      },

      {

        threshold:
          .08,

        rootMargin:
          "0px 0px -20px 0px"

      }

    );



  revealItems.forEach(
    function (item) {

      observer.observe(
        item
      );

    }
  );



  /* Initial state */

  applyBlogFilter(
    "all"
  );

}