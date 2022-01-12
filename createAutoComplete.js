const createAutoComplete = ({ root, createOption, onOptionSelect,fetchData }) => {
  const input = root.querySelector("input");
  const options = root.querySelector(".input_options");

  // fetch data func
  const onInput = async (e) => {
    document.querySelector('.tutorial').classList.add('close')
    options.innerHTML = "";
    const items = await fetchData(e.target.value);
    options.classList.remove("close");
    items.length === 0
      ? options.classList.add("close")
      : items.forEach((movie) => {
          let media = createOption(movie);
          options.appendChild(media);
          media.addEventListener("click", () => onOptionSelect(movie,input,options));
        });
  };


  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) {
      if (options.childNodes.length > 0) {
        options.classList.add("close");
      }
    }
  });

  input.addEventListener("input", debounce(onInput, 500));
};
