export type ApiResponseData = {
  data: MediaDataResponse[],
  maxPage: number
}

export type MediaDataResponse = {
  "Title": string, 
  "Year": string, 
  "imdbID": string,
  "Type": 'movie' | 'series' | 'episode', 
  "Poster": string
}

export const DATA: MediaDataResponse[] = [
  { "Title": "Batman Begins", 
    "Year": "2005", 
    "imdbID": "tt0372784", 
    "Type": "movie", 
    "Poster": "https://m.media-amazon.com/images/M/MV5BODIyMDdhNTgtNDlmOC00MjUxLWE2NDItODA5MTdkNzY3ZTdhXkEyXkFqcGc@._V1_SX300.jpg" 
  },
  {"Title":"Hell or High Water","Year":"2016",
    "imdbID":"tt2582782",
    "Type":"movie",
    "Poster":"https://m.media-amazon.com/images/M/MV5BMTg4NDA1OTA5NF5BMl5BanBnXkFtZTgwMDQ2MDM5ODE@._V1_SX300.jpg"
  },{"Title":"Drag Me to Hell","Year":"2009","imdbID":"tt1127180","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTQwNTMyNjc5Ml5BMl5BanBnXkFtZTcwOTI2MTQ0Mg@@._V1_SX300.jpg"},{"Title":"From Hell","Year":"2001","imdbID":"tt0120681","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNzA5N2RlZDItNzc5My00YjIwLWFiMzktYTI1NDg0MDc1YTY1XkEyXkFqcGc@._V1_SX300.jpg"},{"Title":"Hell on Wheels","Year":"2011–2016","imdbID":"tt1699748","Type":"series","Poster":"https://m.media-amazon.com/images/M/MV5BMjM5ODQ5Nzc3OF5BMl5BanBnXkFtZTgwOTQzMzM4NjE@._V1_SX300.jpg"},{"Title":"Jason Goes to Hell","Year":"1993","imdbID":"tt0107254","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMWVmZjc4YjYtYmY3Mi00MTY2LWIzMzctMjQ2MGEwNzE2YTZlXkEyXkFqcGc@._V1_SX300.jpg"},{"Title":"Hellraiser III: Hell on Earth","Year":"1992","imdbID":"tt0104409","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMjc0YjE0NDItZGU2MC00OGNiLWI3NGQtMDk5M2ZmZGIwNDJjXkEyXkFqcGc@._V1_SX300.jpg"},{"Title":"Hell House LLC","Year":"2015","imdbID":"tt4267026","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNDU2YTZhZTEtNjQ2Mi00ZTlkLWFhNTctNDAyNGNjNTVlYzdkXkEyXkFqcGc@._V1_SX300.jpg"},{"Title":"In Hell","Year":"2003","imdbID":"tt0339135","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNzA4NGU2ZTQtNGRiMy00ODAxLTk3YmUtOTkyNGMwMGJjZjlkXkEyXkFqcGc@._V1_SX300.jpg"},{"Title":"7 Days in Hell","Year":"2015","imdbID":"tt3895884","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BZjcwNDIyMTItODgyNy00YTg1LWIzNzgtNmE0ZjJmYmZjNTFhXkEyXkFqcGc@._V1_SX300.jpg"},{"Title":"Hell Fest","Year":"2018","imdbID":"tt1999890","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BOGFkMWM5MmEtZjY4YS00MmFhLWEyOWQtNTcwYmRlYmZkMzU3XkEyXkFqcGc@._V1_SX300.jpg"}

]