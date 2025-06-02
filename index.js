const url = "www.thecocktaildb.com/api/json/v1/1/search.php?s="
const searchBtn = document.querySelector("#search-button")
const userInput = document.querySelector("#database-search").value

const searchCocktails = () => {
  userInput
  searchBtn.addEventListener("click", () => console.log(userInput))
}

searchCocktails()
