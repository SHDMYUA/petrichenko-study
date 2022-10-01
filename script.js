const numberOfFilms = +prompt("How match you wathed movies");
const personalDataMovieBase = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  privat: false
};

const a = prompt("Один из последних фильмов", "");
const b = prompt("На сколько оцените его?", "");
const c = prompt("Один из последних фильмов", "");
const d = prompt("На сколько оцените его?", "");

personalDataMovieBase.movies[a] = b;
personalDataMovieBase.movies[c] = d;

console.log(personalDataMovieBase);