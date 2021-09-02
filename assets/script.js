
let movieBaseUrl = 'https://unogsng.p.rapidapi.com/' // Append queries to this string
let movieFetchObj = {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "unogsng.p.rapidapi.com",
        "x-rapidapi-key": rapidAPIKey
    }
}
let foodBaseUrl = `https://www.themealdb.com/api/json/v2/${mealDbKey}/`
let button = document.getElementById('send-call')
button.addEventListener('click', function (e) {
    e.preventDefault()
    let url = movieBaseUrl + 'search?genrelist=794&type=movie&orderby=rating&audiosubtitle_andor=and&limit=100&subtitle=english&countrylist=78&offset=0'
    fetch(url, movieFetchObj)
        .then(response => {
            console.log(trackAPICalls(response))
            return response.json()
        })
        .then(data => {
            console.log(data)
        })
})


function trackAPICalls(response) {
    return response.headers.get("x-ratelimit-requests-remaining")
}

class userSuggestions {
    constructor(genre, recipes) {
        this.genre = genre
        this.recipes = recipes
    }
    getMealsList() {
        return this.recipes
    }
    getCategory() {
        return this.genre
    }
}

