var controller = new ScrollMagic.Controller();


var blockTween = new TweenMax.to('#block', 0.75, {
    opacity: 0
});

var blockTween2 = new TweenMax.to('#block2', 1, {
    opacity: 1
});

var blockTween3 = new TweenMax.to('#block3', 0.75, {
    opacity: 1
});

var bgColor2 = new TweenMax.to('body', 0.75, {
    backgroundColor: "#a6fcd4"
});

var bgColor = new TweenMax.to('body', 0.75, {
    backgroundColor: "#fca6b8"
});

var bgNav = new TweenMax.to('#navbar', 0.025, {
    backgroundColor: "#fff",
    boxShadow: " 0 2px 4px -1px rgba(0,0,0,0.25);"
});

//scenes 

var helloScene = new ScrollMagic.Scene({
    duration: $(window.top).height(),
}).setTween(blockTween);

var nameScene = new ScrollMagic.Scene({
    duration: $(window.top).height(),
}).setTween(blockTween2)

var introScene = new ScrollMagic.Scene({
    duration: $(window.top).height(),
    offset: 150
}).setTween(blockTween3)

var backgroundColorScene = new ScrollMagic.Scene({
    triggerElement: '#change1'
}).setTween(bgColor)

var navScene = new ScrollMagic.Scene({
    triggerElement: "#pinned-trigger1",
    duration: 50,
    triggerHook: 0,
    reverse: true,
})
.setPin("#navbar")
.setTween(bgNav);



controller.addScene([
    helloScene,
    nameScene,
    backgroundColorScene,
    introScene,
    navScene
])