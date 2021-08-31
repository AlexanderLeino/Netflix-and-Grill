
let movieBaseUrl = 'https://movie-database-imdb-alternative.p.rapidapi.com/?r=json' // Append queries to this string
let foodBaseUrl = 'https://www.themealdb.com/api/json/v2/'
let testUrl = foodBaseUrl + mealKey + '/latest.php'


fetch(testUrl)
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then( data => {
        console.log(data);
    })
    .catch(err => {
        console.error(err);
    });