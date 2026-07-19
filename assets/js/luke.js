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
    sidebarMenu();
    mapInit();

    /* Interactive portrait */
    heroImageReveal();

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
function portfolioIsotop() {

    "use strict";

    // init Isotope
    var $pfilter = $('#portfolio-filter');
    var $grid = $('.portfolio-items');
    $grid.isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'masonry',
    });
    $pfilter.find('a').on("click", function() {
        var filterValue = $(this).attr('data-filter');
        $pfilter.find('a').removeClass('active');
        $(this).addClass('active');
        $grid.isotope({
            filter: filterValue,
        });
        return false;
    });
}

/*-------------------------  MAGNIFIC POPUP JS  -------------------------*/
function portfolioPopup() {

    "use strict";

    if (('.portfolio-items').length > 0) {
        $('.portfolio-items').each(function() {
            $(this).magnificPopup({
                delegate: 'a.portfolio-magnific',
                type: 'image',
                removalDelay: 300,
                mainClass: "mfp-fade",
                image: {
                    titleSrc: "title",
                    gallery: {
                        enabled: true
                    }
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