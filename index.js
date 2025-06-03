const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
const searchBtn = document.querySelector("#search-button")
const userInput = document.querySelector("#database-search")
const drinkDetails = document.querySelector("#drink-details")

const handleSearchEvent = () => {
  searchBtn.addEventListener("click", () => {
    const inputText = userInput.value.toLowerCase()
    const underscoredString = inputText.split(" ").join("_")

    fetch(url + underscoredString)
      .then((res) => res.json())
      .then((drinkInfo) => {
        const selectedDrinkDetails = drinkInfo.drinks[0]
        renderDrink(selectedDrinkDetails)
      })
  })
}

const renderDrink = (selectedDrinkDetails) => {
  const image = document.createElement("img")
  image.className = "drink-image"
  image.src = selectedDrinkDetails.strDrinkThumb
  image.alt = selectedDrinkDetails.strDrink

  const name = document.createElement("h2")
  const drinkName = selectedDrinkDetails.strDrink
  name.innerText = drinkName

  const recipeButton = document.createElement("button")
  recipeButton.id = "recipe-button"
  recipeButton.innerText = "Make This Drink!"
  recipeButton.addEventListener("click", () => alert("Click"))

  drinkDetails.append(image, name, recipeButton)
}

const displayRecipe = () => {}

handleSearchEvent()
