var animateBtn= document.getElementById('animateBtn')


function getAnimate(){

  animateBtn.addEventListener('click',function(event){
    var animHead= document.getElementById('anim-head')
    var animBody= document.getElementById('anim-body')
    
    animate(animHead,'bounceIn')
    animate(animBody,'rubberBand')
  })
 
  
}

function animate(element, animation) {
  element.classList.add('animate__animated','animate__' +animation); // animate__bounceIn
  var wait = setTimeout(function() {
  element.classList.remove('animate__animated','animate__' +animation)

  },1000);
}

getAnimate()
