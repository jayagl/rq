$(function () { // wait for document ready
  // init
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 0,
      reverse:true
    }
  });
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
        scene.setPin(slide, {pushFollowers: false})
        .duration($('.home-container').height()/2-60)
        .setClassToggle('body', 'transparent-header');
        // scene.duration('100%');
      break;
      case 'about':
        scene.triggerHook(0.4);
      break;
      default:
    }
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

  //Reload page on resize to deal with issues
  var timeout;
  $(window).on('resize', function(){
    if(timeout) clearTimeout(timeout);
    timeout = setTimeout(function(){
      location.reload();
    },100);
  });

  //close menu on click
  var navMain = $(".navbar-collapse");
   navMain.on("click", "a", null, function () {
       navMain.collapse('hide');
   });
});
