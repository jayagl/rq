$(function () { // wait for document ready
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
      triggerElement: slide
    })
    // .addIndicators(slide.id) // add indicators (requires plugin)
    .setClassToggle('#'+slide.id+'-anchor', 'active')
    .addTo(controller);
    scenes[slide.id] = scene;
  }

  scenes.home
  .setPin('.home', {pushFollowers: false})
  .duration($('.home-container').height()/2-60);

  scenes.about
  .setClassToggle('.down-arrow', 'hidden')
  .triggerHook(0.8);

  scenes.menuHelper = new ScrollMagic.Scene({
    triggerElement: '.home',
    duration: $('.home-container').height()-160
  }).setClassToggle('body', 'transparent-header')
  .addTo(controller);

  scenes.menuLogoHelper = new ScrollMagic.Scene({
    triggerElement: '.home',
    duration: $('.home-container').height()-50
  }).setClassToggle('.nav-logo', 'hidden')
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
  var timeout;
  $(window).on('resize', function(){
    if(timeout) clearTimeout(timeout);
    timeout = setTimeout(function(){
      location.reload();
    },100);
  });

});
