const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
const searchBtn = document.querySelector("#search-button")
const userInput = document.querySelector("#database-search")

const handleSearchEvent = () => {
  searchBtn.addEventListener("click", () => {
    const inputText = userInput.value
    const underscoredString = inputText.split(" ").join("_")

    fetch(url + underscoredString)
      .then((res) => res.json())
      .then((drinkInfo) => console.log(drinkInfo))
  })
}

handleSearchEvent()
