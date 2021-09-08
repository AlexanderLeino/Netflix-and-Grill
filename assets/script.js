var letRollBtn = document.getElementById('letRoll')
var submitBtn = document.getElementById('submit')
var form= document.getElementById('form')


// <!-Replace Section with Form-->
function replaceSectionWithForm() {
    var imgChef = document.getElementById('chef')
    imgChef.classList.add('animate__animated', 'animate__bounceOutDown', 'animate__faster')
    imgChef.addEventListener('animationend', function () {
        imgChef.classList.add('hidden')
    })

    var section = document.getElementById('section-1')
    section.classList.add('animate__animated', 'animate__bounceOutLeft', 'animate__faster')

    section.addEventListener('animationend', generateForm)

    function generateForm() {
        section.classList.add('hidden')
        var form = document.getElementById('form')
        form.classList.remove('hidden')
        form.classList.add('animate__animated', 'animate__bounceInRight')
        letRollBtn.classList.add('hidden')
        showSubmitBtn()
    }
}

function showSubmitBtn() {

    var text = 'Show Me'
    submitBtn.textContent = text
    submitBtn.setAttribute('class', 'animate__animated bg-red-500 hover:bg-red-700 text-white font-bold my-3 p-3 shadow-inner')
    submitBtn.classList.add('animate__animated', 'animate__heartBeat', 'animate__infinite', 'animate__slower')
}

// <------Changing Select in Form---->
function addSelectClasses(element) {
    element.classList.add('mt-2', 'mb-3', 'text-sm', 'text-gray-300', 'p-2')
}

function addSelectedIndex(element) {
    element.addEventListener('change', getSelectedIndex)
}


function getSelectedIndex() {
    if (this.selectedIndex === 0) {
        this.classList.add('text-gray-300', 'text-sm', 'border-green-500')
        this.classList.remove('text-black', 'text-lg')
    } else {
        this.classList.remove('text-gray-300', 'text-sm')
        this.classList.add('text-black', 'text-lg',)
        this.classList.add('animate__animated', 'animate__bounce')
        this.addEventListener('animationend', function () {
            this.classList.remove('animate__animated', 'animate__bounce')
        })
    }
}
function selectChange() {

    var selectChange = document.getElementsByClassName('select-change')
    for (var i = 0; i < selectChange.length; i++) {
        addSelectClasses(selectChange[i])
        addSelectedIndex(selectChange[i])
    }
}

selectChange()
letRoll.addEventListener('click', replaceSectionWithForm)



// letRoll.addEventListener('click', validForm)
// function validForm(){
//   if(!selectChange[i] === selectedIndex){
//     moveToResult()
//   }
//   //  if( 1 of selectChange===selectedIndex){
//     // showInvalidForm()

//   //  }

// //showInvalidForm()
// //moveToResult

// //function showInvalifForm {
// //if(selectChange[i]===selectdIndex) {
// //red in outside and animation
// //show 'Let us know all!'

//function moveToResult {
//form is bounced out left




var form = document.getElementById('form')
var kidFriendly = document.getElementById('kid-friendly')
var movieGenres = document.getElementById('genres-movie')
var peopleCount = document.getElementById('people-count')
var tastes = document.getElementById('tastes')

function checkRequired(selectArr) {
    selectArr.forEach(function (item, index) {
        var select = item.querySelector('.select-change')
        if (select.selectedIndex === 0) {
            showErrorMessage(select, 'All fields are required')
            addSelectClasses(select)
            addSelectedIndex(select)
        } else {
            showSuccess(select)


        }
    })
}
//<---show Error Message---->

function showErrorMessage(e, message) {
    e.classList.remove('border-green-500')
    e.classList.add('border-red-500', 'border-solid', 'border-2', 'p-2')
    var small = document.getElementById('small')
    small.innerText = message
    small.classList.remove('hidden')
    small.classList.add('text-white')
}
//<---show Success Message--->
function showSuccess(e) {
    e.classList.remove('border-red-500')
    e.classList.add('text-black', 'border-green-500', 'border-solid', 'border-2', 'p-2', 'animate__animated', 'animate__bounce')
    e.addEventListener('animationend', function () {
        e.classList.remove('animate__animated', 'animate__bounce')
    })
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkRequired([kidFriendly, movieGenres, peopleCount, tastes])
})


function replaceFormWithResult(){
  form.classList.add('animate__animated','animate__bounceOutLeft', 'animate__faster')
  form.addEventListener('animationend', generateResult)
}

function generateResult() {

var movie= document.getElementById('movie')
var pairsWellWith = document.getElementById('pairs-well-with')
var food = document.getElementById('food')
var resultBackground = document.getElementById('result-background')
console.log(resultBackground)

form.classList.add('hidden')
resultBackground.classList.remove('hidden')
resultBackground.classList.add('animate__animated','animate__fadeInUp','animate__slower')
resultBackground.addEventListener('animationend', function() {
  movie.classList.remove('hidden')
  food.classList.remove('hidden')
  movie.classList.add('animate__animated','animate__fadeInDown','animate__slower')
  food.classList.add('animate__animated','animate__fadeInUp','animate__slower')
})



  }


  

// setTimeout(function() {
//   resultBackground.classList.remove('hidden')
//   movie.classList.remove('hidden')
//   food.classList.remove('hidden')
//   movie.classList.add('animate__animated','animate__bounceInDown','animate__slower')
//   food.classList.add('animate__animated','animate__bounceInUp','animate__slower','animate__delay-2s')
//   },2000)
// }

//  setTimeout(function() {
//     resultBackground.classList.remove('hidden')

//     movie.classList.add('animate__animated','animate__bounceInDown','animate__slower')
//     food.classList.add('animate__animated','animate__bounceInUp','animate__slower','animate__delay-2s')
//   },3000)
// }
// generateResult()
