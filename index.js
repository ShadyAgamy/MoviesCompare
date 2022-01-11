const API_KEY = "7bbee3bd234e91723f59f57f5ef6b033";
const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;
const selectMovieInput1 = document.getElementById("selectMovieInput1");
const selectMovieInput2 = document.getElementById("selectMovieInput2");
const column = document.querySelector(".column");
let input_options1 = document.getElementById("input_options1");
let input_options2 = document.getElementById("input_options2");

const detailsCard = document.createElement("div");
detailsCard.classList.add("card", "movieDetails");

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

const showMovieDetails = (movie) => {
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
    <article class="notification is-primary">
        <p class="title">${usdCurrencyFormatter.format(parseInt(revenue))}</p>
        <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${popularity}</p>
        <p class="subtitle">popularity</p>
    </article>
    <article class="notification is-primary">
        <p class="title">${vote_average}</p>
        <p class="subtitle">vote</p>
    </article>
    
  </div>
    `;
  column.append(detailsCard);
  const generesDiv = document.querySelector(`.generes${id}`);
  generesDiv.append(renderGeners);
};

selectMovieInput1.addEventListener(
  "input",
  debounce((e) => getMovies(e, input_options1, selectMovieInput1), 500)
);
selectMovieInput2.addEventListener(
  "input",
  debounce((e) => getMovies(e, input_options2, selectMovieInput2), 500)
);




document.addEventListener("click", (event) => {
  // for (let i = 0; i < input_containers.length; i++) {
  if (!column.contains(event.target)) {
    if (input_options1.childNodes.length > 0) {
      input_options1.classList.add("close");
    }
  }
  // }
});

const getMovie = async (movie, input_options, input) => {
    console.log(input)
    input.value = movie.title;
  input_options.classList.add("close");
  const movieDetails = await fetchMovieRequest(movie.id);
  showMovieDetails(movieDetails);
};

const fetchMovieRequest = async (id) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
    {}
  );
  return response.data;
};
