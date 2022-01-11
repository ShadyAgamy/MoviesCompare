const debounce = (func, delayTime = 1000) => {
  let timeOutId;
  return (...args) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, delayTime);
  };
};

const usdCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});


// adult: false
// backdrop_path: "/nNmJRkg8wWnRmzQDe2FwKbPIsJV.jpg"
// belongs_to_collection: {id: 86311, name: 'The Avengers Collection', poster_path: '/yFSIUVTCvgYrpalUktulvk3Gi5Y.jpg', backdrop_path: '/zuW6fOiusv4X9nnW3paHGfXcSll.jpg'}
// budget: 220000000
// genres: (3) [{…}, {…}, {…}]
// homepage: "http://marvel.com/avengers_movie/"
// id: 24428
// imdb_id: "tt0848228"
// original_language: "en"
// original_title: "The Avengers"
// overview: "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!"
// popularity: 461.005
// poster_path: "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg"
// production_companies: [{…}]
// production_countries: [{…}]
// release_date: "2012-04-25"
// revenue: 1518815515
// runtime: 143
// spoken_languages: (3) [{…}, {…}, {…}]
// status: "Released"
// tagline: "Some assembly required."
// title: "The Avengers"
// video: false
// vote_average: 7.7
// vote_count: 26119