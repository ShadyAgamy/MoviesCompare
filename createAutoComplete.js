const posterPathUrl = "https://image.tmdb.org/t/p/w185/";


// create option func
const createOption = (movie) => {
    const {poster_path, title} = movie
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
};

// fetch data func
const fetchData = async (queryName, input_options, input) => {
  const response = await axios
    .get(url, {
      params: {
        query: queryName,
      },
    })
    .then(
      (response) => {
        const data = response.data.results.slice(0, 10);
        showData(data, input_options, input);
      },
      (error) => {
        input_options.classList.add("close");
      }
    );
};

// show data 
const showData = (data, options, input) => {
  options.classList.remove("close");
  data.length === 0
    ? options.classList.add("close")
    : data.forEach((movie) => {
        let media = createOption(movie);
        options.appendChild(media);
        media.addEventListener("click", () => getMovie(movie, options, input));
      });
};


const getMovies = (e, options, input) => {
  const movieName = e.target.value;
  options.innerHTML = "";
  fetchData(movieName, options, input);
};
