
let movieBaseUrl = 'https://movie-database-imdb-alternative.p.rapidapi.com/?r=json' // Append queries to this string
let foodBaseUrl = 'https://www.themealdb.com/api/json/v2/'
let testUrl = foodBaseUrl + mealKey + '/random.php'
// let alphabet = 'abcdefghijklmnopqrstuvwxyz'
// for (let i in alphabet) {
//     let loopUrl = testUrl + alphabet[i]
//     fetch(loopUrl)
//     .then(response => {
//         console.log(response);
//         return response.json();
//     })
//     .then( data => {
//         console.log(data);
//         localStorage.setItem(`Meals letter ${alphabet[i]} search: `, JSON.stringify(data))
//     })
//     .catch(err => {
//         console.error(err);
//     });
// }

let pasta = []
for (let i = 0; i < 20; i++) {

    fetch(testUrl)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => {
            console.log(data);
            randomArray.push(data)
            localStorage.setItem('Random', JSON.stringify(randomArray))
        })
        .catch(err => {
            console.error(err);
        });

}