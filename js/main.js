$(function () { // wait for document ready

  var LOGO_PIN_OFFSET = 60;
  var ARROW_TRIGGER_HOOK = 0.8;
  var TRANSPARENT_HEADER_OFFSET = 190;
  var SHOW_LOGO_OFFSET = 50;
  // init
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 0,
      reverse:true
    }
  });

  var scenes = {};

  var slides = $('section');

  // create scene for every slide
  for (var i=0; i<slides.length; i++) {
    var slide = slides[i];
    var scene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: $(slide).height()
    })
    // .addIndicators(slide.id) // add indicators (requires plugin)
    .setClassToggle('#'+slide.id+'-anchor', 'active')
    .addTo(controller);
    scenes[slide.id] = scene;
  }

  scenes.rippleLocker = new ScrollMagic.Scene({
    triggerElement: '.home'
  }).setPin('.home', {pushFollowers: false})
  .duration($('.home-container').height()/2-LOGO_PIN_OFFSET)
  .addTo(controller);

  scenes.arrowTgl = new ScrollMagic.Scene({
    triggerElement: '.about',
    // triggerHook: ARROW_TRIGGER_HOOK
  }).setClassToggle('.down-arrow', 'hidden')
  .addTo(controller).triggerHook(ARROW_TRIGGER_HOOK);

  scenes.transparentMenuTgl = new ScrollMagic.Scene({
    triggerElement: '.home',
    duration: $('.home-container').height()-TRANSPARENT_HEADER_OFFSET
  }).setClassToggle('body', 'transparent-header')
  .addTo(controller);

  scenes.menuLogoTgl = new ScrollMagic.Scene({
    triggerElement: '.home',
    duration: $('.home-container').height()-SHOW_LOGO_OFFSET
  }).setClassToggle('.nav-logo', 'hide-logo')
  .addTo(controller);

  // Change behaviour of controller
  // to animate scroll instead of jump
  controller.scrollTo(function(target) {
    TweenMax.to(window, 0.5, {
      scrollTo : {
        y : target,
        autoKill : true // Allow scroll position to change outside itself
      },
      ease : Cubic.easeInOut
    });
  });


  //scroll to #anchors
  $(document).on('click', 'a[href^="#"]', function(e) {
    var id = $(this).attr('href');

    if($(id).length > 0) {
      e.preventDefault();

      // trigger scroll
      controller.scrollTo(id);

      // If supported by the browser we can also update the URL
      if (window.history && window.history.pushState) {
        history.pushState('', document.title, id);
      }
    }
  });

  //close menu on click anywhere
  $(document).on('click', function(){
    $(".navbar-collapse").collapse('hide');
  });

  //Reload page on resize to deal with issues
  // var timeout;
  // var width = $(window).width();
  // $(window).on('resize', function(){
  //   if($(window).width() != width){
  //      width = $(this).width();
  //      if(timeout) clearTimeout(timeout);
  //      timeout = setTimeout(function(){
  //        location.reload();
  //      },100);
  //   }
  // });

});
