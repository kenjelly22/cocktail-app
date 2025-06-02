const url = "www.thecocktaildb.com/api/json/v1/1/search.php?s="
const searchBtn = document.querySelector("#search-button")
const userInput = document.querySelector("#database-search").value

const searchCocktails = () => {
  // userInput
  searchBtn.addEventListener("click", () => {
    fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=moscow_mule"
    )
      .then((res) => res.json())
      .then((res) => {
        const drinkName = res.drinks[0].strDrink
        console.log(drinkName)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  })
}

searchCocktails()
