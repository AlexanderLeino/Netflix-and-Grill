
let movieBaseUrl = 'https://movie-database-imdb-alternative.p.rapidapi.com/?r=json' // Append queries to this string
let foodBaseUrl = 'https://www.themealdb.com/api/json/v2/'


class meals {
    constructor(category, mealsList) {
        this.category = category
        this.mealsList = mealsList
    }
    getMealsList() {
        return this.mealsList
    }
    getCategory() {
        return this.category
    }
}

