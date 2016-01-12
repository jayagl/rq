$(function () { // wait for document ready
  // init
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 'onLeave',
      duration: $('section').height(),
      // triggerHook: 0.025,
      reverse: true
    }
  });

  // get all slides
  var slides = $("section.panel");

  // create scene for every slide
  for (var i=0; i<slides.length; i++) {
    var slide = slides[i];
    new ScrollMagic.Scene({
      triggerElement: slide
    })
    .setPin(slide)
    .addIndicators(slide.id) // add indicators (requires plugin)
    .setClassToggle(slide.id+'-anchor', 'active')
    .addTo(controller);
  }

  var scene = new ScrollMagic.Scene({triggerElement: "header"})
								.setPin("header")
								.addIndicators({name: "header"}) // add indicators (requires plugin)
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


  //  Bind scroll to anchor links
  $(document).on("click", "a[href^=#]", function(e) {
    var id = $(this).attr("href");

    if($(id).length > 0) {
      e.preventDefault();

      // trigger scroll
      controller.scrollTo(id);

      // If supported by the browser we can also update the URL
      if (window.history && window.history.pushState) {
        history.pushState("", document.title, id);
      }
    }

  });
});
