var letGo= document.getElementById('letGo')

letGo.addEventListener('click', replaceSectionWithForm)

function replaceSectionWithForm(){
  var section= document.getElementById('section-1')
  section.classList.add('animate__animated','animate__bounceOutLeft')
 section.addEventListener('animationend', function(){
   section.classList.add('hidden')
 })

  var form= document.getElementById('form')
  form.classList.remove('hidden')
  form.classList.add('animate__animated','animate__bounceInRight')
  

}

// var section = document.getElementById('section-1')

// function getForm(){
// letGo.addEventListener('click',function (section) {
//   section.classList.add('.form'); // animate__bounceIn
//   section.classList.remove('.cool-intro')
//   })
 
  
// }





//click the button let's go
//cool intro gone--->form
//show the form
//append form to DOM
//button "Let's Netflix and Grill"


//
