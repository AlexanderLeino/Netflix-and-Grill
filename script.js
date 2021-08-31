
/*

*/
let movieBaseUrl = 'https://movie-database-imdb-alternative.p.rapidapi.com/?r=json' // Append queries to this string
let foodBaseUrl = ''


/*
MOVIE API:
=============================================================================
Fetch should look like this
    fetch("https://movie-database-imdb-alternative.p.rapidapi.com/?r=json", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
            "x-rapidapi-key": "0b3ba113c5msh66e12ed828c15d9p196e46jsna2205c88742e"
        }
    }) 


FOOD API:
=============================================================================
Fetch should look like this
    fetch("https://tasty.p.rapidapi.com/recipes/list?from=0&size=20", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "tasty.p.rapidapi.com",
		"x-rapidapi-key": "0b3ba113c5msh66e12ed828c15d9p196e46jsna2205c88742e"
	}
})
*/
fetch(movieBaseUrl,
    {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
            "x-rapidapi-key": "0b3ba113c5msh66e12ed828c15d9p196e46jsna2205c88742e"
        }
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        showData(data)
    })

function showData(data) {
    console.log(data)
}