let rapidAPIKey = "0b3ba113c5msh66e12ed828c15d9p196e46jsna2205c88742e"
let mealDbKey = '9973533'
let movieBaseUrl = "https://unogsng.p.rapidapi.com/search"
let movieFetchObj = {
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "unogsng.p.rapidapi.com",
    "x-rapidapi-key": rapidAPIKey
  }
}
let mealDbUrl = 'https://www.themealdb.com/api/json/v2/' + mealDbKey
let tastyBaseUrl = "https://tasty.p.rapidapi.com/recipes/list"
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
let movieContainer = document.getElementById('movie-background')
let pairsWellWith = document.getElementById('pairs-well-with')
let foodContainer = document.getElementById('food-background')
let resultBackground = document.getElementById('result-background')
let backBtn = document.getElementById('back-to-form')
let kidFriendly = document.getElementById('kid-friendly')
let movieGenres = document.getElementById('genres-movie')
let peopleCount = document.getElementById('people-count')
let userSelections = [kidFriendly.children[1], movieGenres.children[1], peopleCount.children[1]]
let intro = document.getElementById('intro')
let child = document.getElementById('child')
let saveBtn = document.getElementById('save-button')
let newSuggestionBtn = document.getElementById('generate-button')
let loaderIcons = document.getElementsByClassName('loader')
let newMovieBtn = document.getElementById('new-movie')
let newRecipeBtn = document.getElementById('new-recipe')

let savedSuggestions = JSON.parse(localStorage.getItem('savedSuggestions')) || []
let savedCount = 0

let randomMovie, randomRecipe
let currentMovie, currentRecipe

const netflixGenres = {
  "Drama": ["11", "384", "452", "500", "794", "1989", "2748", "2757", "2893", "3916", "3947", "4282", "4425", "5012", "5051", "5572", "5763", "6206", "6763", "6889", "7687", "9299", "9873", "11075", "11729", "12994", "13158", "29809", "31901", "56169", "58677", "62116", "62140", "62235", "71591"],
  "Comedy": ["26", "869", "1009", "1402", "2030", "1747", "2700", "3300", "3903", "3996", "4058", "4426", "4906", "4922", "5286", "5610", "6102", "6197", "6626", "7120", "7539", "9229", "9302", "9702", "9736", "9942", "10256", "10778", "11039", "11559", "11755", "17648", "31694", "43040", "56174"],
  "Science Fiction": ["1492", "1568", "3327", "4734", "6000", "6926", "75448", "90166", "108533", "852491", "1433679", "1626246"],
  "Romance": ["3329", "3830", "5756", "6384", "7908", "9257", "9916", "13335", "13573", "16890", "17241", "29281", "31273", "32392", "35800", "36103", "52852", "53915", "58900", "61656", "62752", "78250", "107985", "1412508", "1474327", "1522234"],
  "Films in Various Languages": ["262", "798", "799", "1105", "1613", "3761", "3960", "5230", "5254", "5480", "5685", "5875", "5977", "6133", "6299", "7825", "8221", "8248", "9196", "9292", "10398", "10463", "10606", "26835", "29764", "31853", "56181", "56184", "58676", "58700", "58741", "58750", "58755", "58796", "58798"],
  "Action": ["899", "2653", "4344", "27018", "27756", "30140", "31244", "7700", "8985", "8999", "43048", "9584", "10702", "11804", "46576", "47465", "70023", "48744", "75418", "76501", "76510", "77232", "90176", "801362", "852490"],
  "Sports": ["4370", "7243", "9327", "12339", "12443", "12762", "12549", "12549"],
  "Horror": ["1694", "947", "4809", "6895", "6998", "8195", "8646", "8711", "9509", "10750", "10944", "42023", "45028", "48303", "52147", "65209", "75405", "75804", "75930", "89585", "1475312"],
  "Superhero": ["10118", "67698"],
  "Thriller": ["972", "1321", "1774", "3269", "5505", "6047", "6867", "8933", "9147", "10306", "10504", "10719", "11014", "11140", "11283", "46588", "65558", "75390", "78507", "852488", "1663282"],
  "Mystery": ["79049"],
  "Adventure": ["1159", "1252", "7442", "8248", "52858"],
  "For Kids": ["561", "783", "2340", "5455", "5507", "6218", "6796", "6962", "10056", "48586", "51056", "51058", "52849", "52904", "58879", "65218", "65437", "67673", "74253", "89513", "413820", "751423"],
  "Fantasy": ["47147", "9744"],
  "Anime": ["2729", "3063", "4698", "6721", "7424", "7992", "11146", "11881", "1408777", "1519826", "1522235", "1622375", "1623841", "1819777", "2246382", "2797624", "2867624", "2951909", "2867325"],
  "Crime": ["1884", "5824", "6051", "10499", "61695", "78463", "81050"],
  "Documentary/movies": ["180", "920", "1096", "2595", "2760", "3179", "3215", "3652", "3675", "3682", "4006", "4649", "4720", "5161", "5349", "6839", "7018", "8673", "9875", "10005", "15456", "17672", "25485", "28269", "48768", "49110", "56178", "58710", "63286", "71590", "90361", "852494", "1515639", "1650093", "2243108"]
}

/* 

TODO: Add modal with recipe information and links

*/

// Tracks API calls from Rapid APIs
function trackAPICalls(response) {
  console.log(response.headers.get("x-ratelimit-requests-remaining"))

}

class movieSuggestion {
  constructor(title, description, rating, runtime, isTop250, posterImg) {
    this.title = title
    this.description = description
    this.rating = rating
    this.runtime = runtime / 60
    this.isTop250 = isTop250
    if (posterImg !== null) {
      this.posterImg = posterImg
    }
  }
}

class recipeSuggestion {
  constructor(name, image, num_servings, instructions, link) {
    this.name = name
    this.image = image
    this.num_servings = num_servings
    this.instructions = instructions
    this.link = link
  }
}




// Remove landing page and display form
function removeSection() {
  // Hide chef image
  let imgChef = document.getElementById('chef')
  imgChef.classList.add('animate__animated', 'animate__bounceOutDown', 'animate__faster')
  imgChef.addEventListener('animationend', function () {
    imgChef.classList.add('hidden')
  })

  //  Remove open page and when it ends, generate the form
  section.classList.add('animate__animated', 'animate__bounceOutLeft', 'animate__faster')

  section.addEventListener('animationend', showForm)

}
function showForm() {
  section.classList.add('hidden')
  form.classList.remove('hidden')
  form.classList.add('animate__animated', 'animate__bounceInRight')
  letRollBtn.classList.add('hidden')
  showSubmitBtn()
}
function showSubmitBtn() {
  let text = 'Show Me'
  submitBtn.textContent = text
  submitBtn.setAttribute('class', 'animate__animated bg-red-500 hover:bg-red-700 text-white font-bold my-3 p-3 shadow-inner')
}

//<---set select style based on selection--->
function getSelectedIndex(e) {
  if (e.selectedIndex === 0) {
    e.classList.add('text-gray-300', 'text-sm',)
    e.classList.remove('text-black', 'text-lg')
  } else {
    e.classList.remove('text-gray-300', 'text-sm')
    e.classList.add('text-black', 'text-lg',)
    e.classList.add('animate__animated', 'animate__bounce')
    e.addEventListener('animationend', function () {
      e.classList.remove('animate__animated', 'animate__bounce')
    })
  }
}
function generateSelectOptions() {

  let selectChange = document.getElementsByClassName('select-change')
  for (let i = 0; i < selectChange.length; i++) {
    selectChange[i].classList.add('mt-2', 'mb-3', 'text-sm', 'text-gray-300', 'p-2')
    selectChange[i].classList.remove('border-green-500')

    selectChange[i].addEventListener('change', function (event) {
      event.target.classList.remove('border-red-500')
      getSelectedIndex(event.target)
    })
  }
}



// Remove form and display result
function removeForm() {
  // form.classList.remove('')
  // form.classList.add('animate__animated','animate__bounce','border-green-500')
  form.classList.remove('animate__animated', 'animate__bounceInRight')
  form.classList.add('animate__animated', 'animate__bounceOutLeft', 'animate__faster')
  form.addEventListener('animationend', showResult)
}
function showResult() {
  
  form.removeEventListener('animationend', showResult)
  form.classList.add('hidden')
  resultBackground.classList.remove('hidden')
  pairsWellWith.classList.remove('hidden')
  resultBackground.classList.add('animate__animated', 'animate__fadeInUp', 'animate__slow')
  resultBackground.addEventListener('animationend', function () {
    movieContainer.classList.remove('invisible')
    foodContainer.classList.remove('invisible')
    movieContainer.classList.add('animate__animated', 'animate__fadeInDown', 'animate__slower')
    foodContainer.classList.add('animate__animated', 'animate__fadeInUp', 'animate__slower')
  })
}


// Create movie card
function createMovieCard(movie) {
  console.log(movie.posterImg)
  currentMovie = movie
  if (movie.posterImg !== undefined) {
    let posterImageEl = document.createElement('img')
    posterImageEl.setAttribute('src', movie.posterImg)
    loaderIcons[0].classList.toggle('hidden')
    posterImageEl.classList.add('m-auto', 'rounded-lg')
    movieContainer.appendChild(posterImageEl)

  } else if (!movie.posterImg) {
    
  }
   else {
    let errorEl = document.createElement('div')
    errorEl.innerHTML = '<span class="text-red-100"> Sorry, couldn\'t find the poster of the movie. </span>'
    loaderIcons[0].classList.toggle('hidden')
    movieContainer.appendChild(errorEl)
  }

  let movieTitleEl = document.createElement('h2')
  movieTitleEl.innerHTML = movie.title
  movieTitleEl.classList.add('text-center')
  movieContainer.appendChild(movieTitleEl)

  let synopsisEl = document.createElement('p')
  synopsisEl.innerHTML = movie.description
  movieContainer.appendChild(synopsisEl)
}

// Create recipe card
function createRecipeCard(recipe) {
  console.log(recipe)
  currentRecipe = recipe
  console.log(loaderIcons)
  let foodImgEl = document.createElement('img')
  foodImgEl.setAttribute('src', recipe.image)
  loaderIcons[1].classList.toggle('hidden')
  foodImgEl.classList.add('m-auto', 'rounded-lg')
  foodContainer.appendChild(foodImgEl)

  let foodTitleEl = document.createElement('h2')
  foodTitleEl.innerHTML = recipe.name
  foodTitleEl.classList.add('text-center')
  foodContainer.appendChild(foodTitleEl)

  if (recipe.link !== null) {
    let foodLink = document.createElement('a')
    foodLink.href = recipe.link
    foodLink.target = '_blank'
    foodLink.innerText = 'Click here for a video\n'
    foodContainer.appendChild(foodLink)
    let foodSource = document.createElement('a')
    foodSource.href = recipe.instructions
    foodSource.innerText = 'Click here for the recipe\n'
    foodContainer.appendChild(foodSource)
  }
}

// Check if user selected all required criteria
function checkRequired(selectArr) {
  let validForm
  selectArr.forEach(function (item) {
    let select = item.querySelector('.select-change')
    console.log(item)
    console.log(select)
    if (select.selectedIndex === 0) {
      showErrorMessage(select, 'All fields are required')
      getSelectedIndex(select)
      validForm = false
    } else {
      showSuccess(select)
      validForm = true

    }
  })
  return validForm
}


// Show Error Message
function showErrorMessage(e, message) {
  e.classList.remove('border-green-500')
  e.classList.add('border-red-500', 'border-solid', 'border-2', 'p-2')
  let small = document.getElementById('small')
  small.innerText = message
  small.classList.remove('hidden')
  small.classList.add('text-white')
}
// Show Success Message
function showSuccess(e) {
  e.classList.remove('border-red-500')
  e.classList.add('text-black', 'border-green-500', 'border-solid', 'border-2', 'p-2','animate__animated', 'animate__bounce')
}


function getRecipeSuggestion() {
  let foodQuery
  let randomRecipe
  if (kidFriendly.children[1].value === 'Yes') {
    foodQuery = '?from=0&size=100&tags=kid_friendly'
    if (localStorage.getItem('tastymeals')) {
      let y = JSON.parse(localStorage.getItem('tastymeals'))
      randomRecipe = y['results'][Math.floor(Math.random() * y['results'].length)]
      createRecipeCard(new recipeSuggestion(randomRecipe.name, randomRecipe.thumbnail_url, '', '#', ''))
    } else {
      fetch(tastyBaseUrl + foodQuery, tastyFetchObj)
        .then(response => {
          trackAPICalls(response)
          return response.json()
        })
        .then(data => {
          console.log(data)
          localStorage.setItem('tastymeals', JSON.stringify(data))
          randomRecipe = data['results'][Math.floor(Math.random() * data['results'].length)]
          createRecipeCard(new recipeSuggestion(randomRecipe.name, randomRecipe.thumbnail_url, '', '#', randomRecipe.renditions[0].url))
        })

    }
  } else {
    // Get recipe suggestion
    foodQuery = '/randomselection.php'
    fetch(mealDbUrl + foodQuery)
      .then(response => {
        trackAPICalls(response)
        console.log(response)
        return response.json()
      })
      .then(data => {
        console.log(data)
        localStorage.setItem('meals', JSON.stringify(data))
        randomRecipe = data['meals'][Math.floor(Math.random() * data['meals'].length)]
        createRecipeCard(new recipeSuggestion(randomRecipe.strMeal, randomRecipe.strMealThumb, '0', randomRecipe.strSource, randomRecipe.strYoutube))
      })

  }
  foodQuery = ''
  removeForm()
}


function getMovieSuggestion() {
  // Get movie suggestion
  let chosenGenre = netflixGenres[movieGenres.children[1].value]
  let genreArray = chosenGenre.join(',')
  let movieQuery = "?genrelist=" + genreArray + "&audiosubtitle_andor=and&countrylist=46&audio=english&country_andorunique=country&type=movie&start_rating=6"
  if (localStorage.getItem(movieGenres.children[1].value)) {
    let x = JSON.parse(localStorage.getItem(movieGenres.children[1].value))
    randomMovie = x['results'][Math.floor(Math.random() * x['results'].length)]
    createMovieCard(new movieSuggestion(randomMovie.title, randomMovie.synopsis, randomMovie.imdbrating, randomMovie.runtime, randomMovie.top250, randomMovie.poster))
  } else {
    fetch(movieBaseUrl + movieQuery, movieFetchObj)
      .then(response => {
        trackAPICalls(response)
        return response.json()
      })
      .then(data => {
        localStorage.setItem(movieGenres.children[1].value, JSON.stringify(data))
        console.log(data)
        randomMovie = data['results'][Math.floor(Math.random() * data['results'].length)]
        createMovieCard(new movieSuggestion(randomMovie.title, randomMovie.synopsis, randomMovie.imdbrating, randomMovie.runtime, randomMovie.top250, randomMovie.poster))

      })
  }
}

function saveSuggestion(savedMovie, savedRecipe) {
  let savedSuggestionBtn = document.createElement('button')
  let title = savedMovie.title
  let saved
  savedSuggestions.push({movie: savedMovie, recipe: savedRecipe})
  savedSuggestionBtn.innerText = savedMovie.title + ' and ' + savedRecipe.name
  savedSuggestionBtn.classList.add('bg-gray-500', 'hover:bg-gray-700', 'text-black', 'p-2', 'm-2')
  savedSuggestionBtn.id = savedCount
  localStorage.setItem('savedSuggestions', JSON.stringify(savedSuggestions))
  
  savedSuggestionBtn.addEventListener('click', e => {
    e.preventDefault()
    clearResults()
    createMovieCard(savedMovie)
    createRecipeCard(savedRecipe)
    
  })
  savedSuggestionsArray = JSON.parse(localStorage.getItem('savedSuggestions'))

  pairsWellWith.appendChild(savedSuggestionBtn)
  savedCount++
}

function clearResults() {
  movieContainer.innerHTML = '<div class="loader m-auto my-10"></div>'
  foodContainer.innerHTML = '<div class="loader m-auto my-10"></div>'
}

// Creating form input selections
generateSelectOptions()

//   Replace Intro with Section 
intro.addEventListener('animationend', function () {
  setTimeout(function () {
    child.style.removeProperty('animation')

    child.classList.add('animate__animated', 'animate__fadeOutUp', 'animate__slower')
    child.addEventListener('animationend', function () {
      intro.classList.add('hidden')
      container.classList.remove('hidden')
    })

  }, 1000)
  // var container= document.getElementById('container')
})


// Event listener for first button
letRollBtn.addEventListener('click', removeSection)

// Back button event listener
backBtn.addEventListener('click', function (e) {
  e.preventDefault()
  for (let i = 0; i < userSelections.length; i++) {
    userSelections[i].value = userSelections[i].children[0].value
  }
  form.removeEventListener('animationend', showResult)
  clearResults()
  resultBackground.classList.remove('animate__fadeInUp', 'animate__slower')
  resultBackground.classList.add('hidden')
  form.classList.remove('hidden', 'animate__bounceOutLeft', 'animate__faster')
  form.classList.add('animate__animated', 'animate__bounceInRight')
  generateSelectOptions()

})

// 
saveBtn.addEventListener('click', function (e) {
  e.preventDefault();
  saveSuggestion(currentMovie, currentRecipe)


})

// 
newSuggestionBtn.addEventListener('click', function (e) {
  e.preventDefault();
  clearResults();
  getRecipeSuggestion();
  getMovieSuggestion();
})

// Make api request when user submits their form
submitBtn.addEventListener('click', function (e) {
  e.preventDefault()
  let checkForm = checkRequired([kidFriendly, movieGenres, peopleCount])
  if (checkForm === false) {
    return
  } else {
    setTimeout(function() {
      getMovieSuggestion()
      getRecipeSuggestion()
    }, 1500)
  }
})

newMovieBtn.addEventListener('click', function(e) {
  e.preventDefault()
  console.log('movie')
  clearResults()
  getMovieSuggestion();
  createRecipeCard(currentRecipe)
})

newRecipeBtn.addEventListener('click', function(e) {
  e.preventDefault()
  console.log('recipe')
  clearResults()
  getRecipeSuggestion();
  createMovieCard(currentMovie)
})

