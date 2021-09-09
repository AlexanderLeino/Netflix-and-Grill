let movieBaseUrl = "https://unogsng.p.rapidapi.com/" // Append queries to this string
let movieFetchObj = {
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "unogsng.p.rapidapi.com",
    "x-rapidapi-key": rapidAPIKey
  }
}
let tastyBaseUrl = "https://tasty.p.rapidapi.com/recipes"
let tastyFetchObj = {
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "tasty.p.rapidapi.com",
    "x-rapidapi-key": rapidAPIKey
  }
}
let section = document.getElementById('section-1')
let letRollBtn = document.getElementById('letRoll')
let submitBtn = document.getElementById('submit')
let form = document.getElementById('form')
let pastRecipes = []
let netflixGenres

// button.addEventListener('click', function (e) {
//     e.preventDefault()
//     let url = movieBaseUrl + 'search?genrelist=794&type=movie&orderby=rating&audiosubtitle_andor=and&limit=100&subtitle=english&countrylist=78&offset=0'
//     fetch(url, movieFetchObj)
//         .then(response => {
//             console.log(trackAPICalls(response))
//             return response.json()
//         })
//         .then(data => {
//             console.log(data)
//         })
// })


function trackAPICalls(response) {
  return response.headers.get("x-ratelimit-requests-remaining")
}

class movieSuggestion {
  constructor(title, description, rating, runtime, isTop250, posterImg) {
    this.title = title
    this.description = description
    this.rating = rating
    this.runtime = runtime
    this.isTop250 = isTop250
    this.posterImg = posterImg
  }
}

class recipeSuggestion {
  constructor(name, description, num_servings, instructions) {
    this.name = name
    this.description = description
    this.num_servings = num_servings
    this.instructions = instructions
  }
}

let x = new recipeSuggestion('name', 'description', 12, ['instructions'])
pastRecipes.push(x)



// <!-Replace Section with Form-->
function replaceSectionWithForm() {
  var imgChef = document.getElementById('chef')
  imgChef.classList.add('animate__animated', 'animate__bounceOutDown', 'animate__faster')
  imgChef.addEventListener('animationend', function () {
    imgChef.classList.add('hidden')
  })

  section.classList.add('animate__animated', 'animate__bounceOutLeft', 'animate__faster')

  section.addEventListener('animationend', generateForm)

  function generateForm() {
    section.classList.add('hidden')
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
function generateSelectOptions() {

  var selectChange = document.getElementsByClassName('select-change')
  for (var i = 0; i < selectChange.length; i++) {
    selectChange[i].classList.add('mt-2', 'mb-3', 'text-sm', 'text-gray-300', 'p-2')
    selectChange[i].addEventListener('change', getSelectedIndex)
  }
}


function checkRequired(selectArr) {
  var validForm = true
  selectArr.forEach(function (item, index) {
    var select = item.querySelector('.select-change')
    if (select.selectedIndex === 0) {
      showErrorMessage(select, 'All fields are required')
      addSelectClasses(select)
      getSelectedIndex(select)
      validForm = false

    } else {
      showSuccess(select)


    }
  })
  return validForm
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
  e.classList.add('text-black', 'border-green-500', 'border-solid', 'border-2', 'p-2')
}



function replaceFormWithResult() {
  if (localStorage.getItem('netflixGenres')) {
    netflixGenres = JSON.parse(localStorage.getItem('netflixGenres'))
  } else {
    fetch(movieBaseUrl + "genres", movieFetchObj)
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        netflixGenres = data
        localStorage.setItem('netflixGenres', JSON.stringify(netflixGenres))
      })

  }
  form.classList.add('animate__animated', 'animate__bounceOutLeft', 'animate__faster')
  form.addEventListener('animationend', generateResult)
}

function generateResult() {

  var movie = document.getElementById('movie')
  var pairsWellWith = document.getElementById('pairs-well-with')
  var food = document.getElementById('food')
  var resultBackground = document.getElementById('result-background')
  console.log(resultBackground)

  form.classList.add('hidden')
  resultBackground.classList.remove('hidden')
  resultBackground.classList.add('animate__animated', 'animate__fadeInUp', 'animate__slower')
  resultBackground.addEventListener('animationend', function () {
    movie.classList.remove('hidden')
    food.classList.remove('hidden')
    movie.classList.add('animate__animated', 'animate__fadeInDown', 'animate__slower')
    food.classList.add('animate__animated', 'animate__fadeInUp', 'animate__slower')
  })



}

generateSelectOptions()
letRollBtn.addEventListener('click', replaceSectionWithForm)
// Make api request
form.addEventListener('submit', function (e) {
  e.preventDefault();

  var kidFriendly = document.getElementById('kid-friendly')
  var movieGenres = document.getElementById('genres-movie')
  var peopleCount = document.getElementById('people-count')
  var tastes = document.getElementById('tastes')
  var checkForm = checkRequired([kidFriendly, movieGenres, peopleCount, tastes])
  if (checkForm === false) {
    return
  }
  setTimeout(function () {
    replaceFormWithResult()
  }, 300)
})



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



    // fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes", {
    //   "method": "GET",
    //   "headers": {
    //     "x-rapidapi-host": "tasty.p.rapidapi.com",
    //     "x-rapidapi-key": ""
    //   }
    // })
    //   .then(response => {
    //     return response.json()
    //   })
    //   .then(data => {
    //     console.log(data)
    //     console.log(data.results[0].name) //name of recipe
    //     console.log(`This represents servings for number of guests: ${data.results[0].num_servings}`)//obtains the number of servings per recipe. Issue number of servings isnt define in each object. May need to further investigate if the (property -> num-servings = undefined) if that means typically only one serving and what type of meal is it most commonly associated to? like dessert or appetizer? 
    //     console.log(`This is a tag: ${data.results[0].tags[1].name}`) //This will give us tags that we will be able to easily define if its considered at least either a lunch or dinner type of food. Can also include tags that help describe if its considered either under 30 mins or easy to make or many other applicable tags names
    //     console.log(`This is a tag: ${data.results[0].tags[1].name}`) // We will need to determine what are the most commonly held tags but also the most descriptive
    //     console.log(`This is a tag: ${data.results[0].tags[2].name}`) // We may want to boil down tag variety to like incorporates alcohol, 30mins or less, dinner , L
    //     console.log(`This is a tag: ${data.results[0].tags[3].name}`)
    //     console.log(`This is a tag: ${data.results[0].tags[4].name}`)
    //     console.log(`This is a tag: ${data.results[0].tags[5].name}`) // *Issue* all recipes have tags but not all recipes have the same amount of tags.
    //     console.log(data.results[0].instructions[0].display_text) // displays the text instruction
    //     console.log(data.results[0].instructions[1].display_text) // issue not all recipes have the same instruction length. 
    //     console.log(data.results[0].instructions[2].display_text)
    //     console.log(data.results[0].instructions[3].display_text)
    //     console.log(data.results[0].instructions[4].display_text)
    //     console.log(data.results[0].instructions[5].display_text)
    //     console.log(data.results[0].instructions[6].display_text)
    //     //FOR EXAMPLE WE MAY HAVE TO USE RECIPES instead of INSTRUCTIONS
    //     console.log(`This represents accessing a recipe by using .recipes[i] instead of using .results[0].instructions[i] like done earlier${data.results[1].recipes[2].instructions[0].display_text}`) //So we will have to check if we can access the array recipe 
    //     console.log(data.results[1].recipes[2].instructions[1].display_text) // after results or vice versa then loop through
    //     console.log(data.results[1].recipes[2].instructions[2].display_text)
    //     //Mostly ignore this I was just thinking of other ideas of checking the object before iterating through it using an if statement.
    //     /* 
    //      let recipeArray1 = []
    //     recipeArray1.push(data.results[1].name)
    //     recipeArray1.push(data.results[2].name)
    //     recipeArray1.push(data.results[3].name)
    //     console.log(recipeArray1)
    //     if(data.results[i].recipes[i] === null) {
    //      for( i = 0; i < data.results.length; i++)
    //      { recipeArray1.push(data.results[i].recipes)
    //      }
    //      else{
    //          for ( y = 0; y < data.results.length; y++){
    //              recipeArray1.push(data.results[y].instructions[y].display_text)
    //          }
    //      }
    //  }
    //    */
    //     //Main objective is to create new objects for each recipe to be placed within the recipeArray.
    //     let recipeArray = [{
    //       name: "Sweet Fresh Corn Tamales",
    //       descriptions: ['healthy', 'under_30_minutes', 'easy', 'mexican', 'fusion', 'desserts'],
    //       num_servings: "12",
    //       // We will need to determine what are hte most commonly held tags but also the most descriptive 
    //       recipe: ["Remove the husks and silk from the corn reserving the tender green leaves for wrapping.", "Using a large, sharp knife, remove the kernels from the cob and place into a high powered blender. Blend the kernels until smooth and then pass the corn puree through a fine-mesh strainer set over a bowl to let the excess liquid drain.", "Place the strained corn puree in a clean bowl and stir together with the sweetened condensed milk, cane sugar and cinnamon. Slowly drizzle in the masa until a thick batter forms.", "Place a bamboo steamer over a pot of boiling water.", "Place a corn husk on a flat surface with the pointed end away from you. Spoon about ½ cup of the corn puree into the middle. Snugly fold over the two long flaps like a business letter, then fold over a few inches of the pointed end of the husk, creating a little bit of tension so that the tamales don’t flatten while steaming. Repeat with the remaining filling and husks.", "Carefully lay the tamales in the steamer in a single layer, working in batches if necessary. Cover the steamer basket and cook the tamales until they are slightly firm, about 15 minutes.", "Enjoy!"]
    //     }
    //     ]
    //     console.log('dream object is logged below this')
    //     console.log(recipeArray)
    //     console.log('please read all comments as they are')
    //   })
    // /**/
    // // Possible issues they use the words instructions and recipe simultaniously 
    // // Also we need to be able to filter out length for each data type because some are longer than others.

    // //  ======================================== //