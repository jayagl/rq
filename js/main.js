$(function () { // wait for document ready
  // init
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      // triggerHook: 0.045,
      triggerHook: 'onLeave',
      duration: $('section').height(),
      reverse:true
    }
  });

  // get all slides
  var slides = $('section');

  // create scene for every slide
  for (var i=0; i<slides.length; i++) {
    var slide = slides[i];
    var scene = new ScrollMagic.Scene({
      triggerElement: slide
    })
    .addIndicators(slide.id) // add indicators (requires plugin)
    .setClassToggle(slide.id+'-anchor', 'active')
    .addTo(controller);

    switch (slide.id) {
      case 'home':
      scene.setPin(slide);
        // scene.setPin('.home .content');
        break;
      default:

    }
    console.log(slide.id);
  }


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
});
