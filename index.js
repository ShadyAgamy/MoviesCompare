const API_KEY = "7bbee3bd234e91723f59f57f5ef6b033";

const autoCompleteConfig = {
  createOption: (movie) => {
    const posterPathUrl = "https://image.tmdb.org/t/p/w185/";
    const { poster_path, title } = movie;
    const media = document.createElement("div");
    media.classList.add("media");
    const img = poster_path ? `<img src=${posterPathUrl + poster_path}>` : "";
    media.innerHTML = `<figure class="media-left">
            <p class="image is-64x64">
            ${img}
            </p>
          </figure>
          <div class="media-content">
            <div class="content">
                <p class="movieTitle">${title} </p> 
            </div>
          </div>`;
    return media;
  },

  async fetchData(queryName) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;
    const response = await axios.get(url, {
      params: {
        query: queryName,
      },
    });
    if (response.data.results.length === 0) {
      return [];
    }
    return response.data.results.slice(0, 10);
  },
};

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector(".left-auto-complete"),
  onOptionSelect: (movie) => {
    getMovie(movie, document.querySelector(".left-auto-complete"), "left");
  },
});
createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector(".right-auto-complete"),
  onOptionSelect: (movie) => {
    getMovie(movie, document.querySelector(".right-auto-complete"), "right");
  },
});

let leftMovie;
let rightMovie;
const getMovie = async (movie, root, side) => {
  const input = root.querySelector("input");
  const options = root.querySelector(".input_options");
  input.value = movie.title;
  options.classList.add("close");
  const movieDetails = await fetchMovieRequest(movie.id);
  showMovieDetails(movieDetails, root);
  side === "left" ? (leftMovie = movie) : (rightMovie = movie);
  if (leftMovie && rightMovie) {
    runComparison();
  }
};

const runComparison = () => {
  console.log(leftMovie);
  console.log(rightMovie);
  if (leftMovie.vote_average > rightMovie.vote_average) {
    const notification = document
      .querySelector(".left-auto-complete")
      .querySelector(".vote_average");
      console.log(notification)
      notification.classList.add('is-primary')
  } else if (leftMovie.vote_average === rightMovie.vote_average) {
    console.log("equel");
  } else {
    console.log("right");
  }
};

const fetchMovieRequest = async (id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
    {}
  );
  return response.data;
};

const showMovieDetails = (movie, root) => {
  const posterPathUrl = "https://image.tmdb.org/t/p/w185/";
  const detailsCard = root.querySelector(".card");
  const { poster_path, title, genres, id, revenue, popularity, vote_average } =
    movie;
  const renderGeners = showGeneres(genres);
  detailsCard.innerHTML = "";
  detailsCard.innerHTML = `
    <div class="card-image">
      <figure class="image is-4by3">
        <img style="object-fit:contain;" src="${
          posterPathUrl + poster_path
        }" alt="Movie Poster">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">${title}</p>
          <p class="subtitle ${"generes" + id} is-6"></p>
        </div>
      </div>
      <article class="notification is-info">
          <p class="title">${usdCurrencyFormatter.format(parseInt(revenue))}</p>
          <p class="subtitle">Awards</p>
      </article>
      <article class="notification is-info">
          <p class="title">${popularity}</p>
          <p class="subtitle">popularity</p>
      </article>
      <article class="notification is-info vote_average">
          <p class="title">${vote_average}</p>
          <p class="subtitle">vote</p>
      </article>
      
    </div>
      `;
  root.append(detailsCard);
  const generesDiv = document.querySelector(`.generes${id}`);
  generesDiv.append(renderGeners);
};
const showGeneres = (generes) => {
  const ul = document.createElement("ul");
  ul.classList.add("generes-list");
  generes.forEach((genere) => {
    const li = document.createElement("li");
    li.innerHTML = genere.name;
    ul.append(li);
  });
  return ul;
};
