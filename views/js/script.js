

/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}

class Polygon{

  constructor(svg, coordinates, friction){
    this.svg = svg
    this.steps = ($(window).height())/2
    this.item = null
    this.friction = friction
    this.coordinates = coordinates
    this.position = this.coordinates.y
    this.dimensions = this.render()
    this.move()
    this.rotation = Math.random() > 0.5 ? "-" : "+"
    this.scale = 0.5 + Math.random()
    this.siner = 200 * Math.random()
  }

  destroy(){
    this.item.remove()
  }

  move(){
    this.position = this.position - this.friction
    let top = this.position;
    let left = this.coordinates.x + Math.sin(this.position*Math.PI/this.steps) * this.siner;
    this.item.css({
      transform: "translateX("+left+"px) translateY("+top+"px) scale(" + this.scale + ") rotate("+(this.rotation)+(this.position + this.dimensions.height)+"deg)"
    })

    if(this.position < -(this.dimensions.height)){
      this.destroy()
    }else{
      requestAnimationFrame(this.move.bind(this))
    }
  }

  render(){
    this.item = $(this.svg, {
      css: {
        transform: "translateX("+this.coordinates.x+"px) translateY("+this.coordinates.y+"px)"
      }
    })
    $(".background").append(this.item)
    return {
      width: this.item.width(),
      height: this.item.height()
    }
  }
}

const point = '<svg viewBox="0 0 12 12"> <path class="point" d="M6,7.5L6,7.5C5.1,7.5,4.5,6.9,4.5,6v0c0-0.9,0.7-1.5,1.5-1.5h0c0.9,0,1.5,0.7,1.5,1.5v0C7.5,6.9,6.9,7.5,6,7.5z "/> </svg>'

function randomInt(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

const data = [point]

let isPaused = false;
window.onblur = function() {
    isPaused = true;
}.bind(this)
window.onfocus = function() {
    isPaused = false;
}.bind(this)

setInterval(function(){
  if (!isPaused){
    new Polygon(data[randomInt(0,data.length-1)], {
     "x": (Math.random() * $(window).width()),
     "y": $(window).height()
    }, (1 + Math.random() * 3) )
  }
}, 200)
