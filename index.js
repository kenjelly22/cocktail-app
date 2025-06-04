const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
const searchBtn = document.querySelector("#search-button")
const userInput = document.querySelector("#database-search")
const drinkDetails = document.querySelector("#drink-details")
const recipeContainer = document.querySelector("#recipe-container")
const recipeInstructions = document.querySelector("#instructions")
const ingredientList = document.querySelector("#ingredients")
const measurementList = document.querySelector("#measurements")
const ingredientHeader = document.querySelector("#ingredient-header")
const measurementHeader = document.querySelector("#measurement-header")
const instructionHeader = document.querySelector("#instruction-header")
const favoritesContainer = document.querySelector("#favorites-container")

drinkDetails.style.display = "none"

const handleSearchEvent = () => {
  searchBtn.addEventListener("click", () => {
    recipeContainer.style.display = "none"

    const inputText = userInput.value.toLowerCase()
    if (inputText === "") {
      alert("Looks like you forgot to enter a drink!")
      return
    }
    fetch(url + inputText)
      .then((res) => res.json())
      .then((drinkInfo) => {
        if (drinkInfo.drinks == null) {
          alert("Sorry... no matches. Try again.")
          return
        }
        const selectedDrinkDetails = drinkInfo.drinks[0]
        const drinkNameLowerCase = selectedDrinkDetails.strDrink.toLowerCase()

        if (drinkNameLowerCase === inputText) {
          renderDrink(selectedDrinkDetails)
        }
      })
  })
}

const renderDrink = (selectedDrinkDetails) => {
  drinkDetails.style.display = "block"
  const drinkImage = selectedDrinkDetails.strDrinkThumb
  const drinkName = selectedDrinkDetails.strDrink

  const image = document.querySelector("#drink-image")
  image.src = drinkImage
  image.alt = drinkName

  const name = document.querySelector("#drink-name")
  name.innerText = drinkName

  const favoriteBtn = document.querySelector("#add-favorite")

  const form = document.querySelector("form")

  const comment = document.querySelector("#user-input")

  const recipeButton = document.querySelector("#recipe-button")

  drinkDetails.append(recipeButton)

  favoriteBtn.addEventListener("click", () => addFavorite(selectedDrinkDetails))

  recipeButton.addEventListener("click", () =>
    recipeClick(selectedDrinkDetails)
  )
}

// Handle Favorites (Add, Delete, Update)

const addFavorite = (selectedDrinkDetails) => {
  const favImage = document.createElement("img")
  favImage.className = "fav-drink"
  favImage.src = selectedDrinkDetails.strDrinkThumb
  if (
    !favoritesContainer.querySelector(
      `img[src="${selectedDrinkDetails.strDrinkThumb}"]`
    )
  ) {
    favoritesContainer.append(favImage)
  }

  const newFavObj = {
    name: selectedDrinkDetails.strDrink,
    image: selectedDrinkDetails.strDrinkThumb,
    instructions: selectedDrinkDetails.strInstructions,
    ingredient1: selectedDrinkDetails.strIngredient1,
    ingredient2: selectedDrinkDetails.strIngredient2,
    ingredient3: selectedDrinkDetails.strIngredient3,
    ingredient4: selectedDrinkDetails.strIngredient4,
    ingredient5: selectedDrinkDetails.strIngredient5,
    ingredient7: selectedDrinkDetails.strIngredient7,
    ingredient8: selectedDrinkDetails.strIngredient8,
    ingredient6: selectedDrinkDetails.strIngredient6,
    ingredient9: selectedDrinkDetails.strIngredient9,
    ingredient10: selectedDrinkDetails.strIngredient10,
    measurement1: selectedDrinkDetails.strMeasure1,
    measurement2: selectedDrinkDetails.strMeasure2,
    measurement3: selectedDrinkDetails.strMeasure3,
    measurement4: selectedDrinkDetails.strMeasure4,
    measurement5: selectedDrinkDetails.strMeasure5,
    measurement6: selectedDrinkDetails.strMeasure6,
    measurement7: selectedDrinkDetails.strMeasure7,
    measurement8: selectedDrinkDetails.strMeasure8,
    measurement9: selectedDrinkDetails.strMeasure9,
    measurement10: selectedDrinkDetails.strMeasure10,
  }

  saveFavorite(newFavObj)
}

const saveFavorite = (newFavObj) => {
  fetch("http://localhost:3000/favorites/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newFavObj),
  })
    .then((res) => res.json())
    .then((favDrinks) => {
      console.log(favDrinks)
    })
}

// Display Recipes:

const recipeClick = (selectedDrinkDetails) => {
  recipeInstructions.textContent = selectedDrinkDetails.strInstructions
  instructionHeader.textContent = "Instructions"

  getIngredients(selectedDrinkDetails)
  getMeasurements(selectedDrinkDetails)
  recipeContainer.style.display = "block"
}

const getIngredients = (selectedDrinkDetails) => {
  const ingredient1 = selectedDrinkDetails.strIngredient1
  const ingredient2 = selectedDrinkDetails.strIngredient2
  const ingredient3 = selectedDrinkDetails.strIngredient3
  const ingredient4 = selectedDrinkDetails.strIngredient4
  const ingredient5 = selectedDrinkDetails.strIngredient5
  const ingredient6 = selectedDrinkDetails.strIngredient6
  const ingredient7 = selectedDrinkDetails.strIngredient7
  const ingredient8 = selectedDrinkDetails.strIngredient8
  const ingredient9 = selectedDrinkDetails.strIngredient9
  const ingredient10 = selectedDrinkDetails.strIngredient10

  const ingredientArr = [
    ingredient1,
    ingredient2,
    ingredient3,
    ingredient4,
    ingredient5,
    ingredient6,
    ingredient7,
    ingredient8,
    ingredient9,
    ingredient10,
  ]

  ingredientList.innerHTML = ""

  for (const ingredient of ingredientArr) {
    if (ingredient != null) {
      ingredientHeader.textContent = "Ingredients"
      const li = document.createElement("li")
      li.innerText = ingredient
      ingredientList.append(li)
    }
  }
}

const getMeasurements = (selectedDrinkDetails) => {
  const measurement1 = selectedDrinkDetails.strMeasure1
  const measurement2 = selectedDrinkDetails.strMeasure2
  const measurement3 = selectedDrinkDetails.strMeasure3
  const measurement4 = selectedDrinkDetails.strMeasure4
  const measurement5 = selectedDrinkDetails.strMeasure5
  const measurement6 = selectedDrinkDetails.strMeasure6
  const measurement7 = selectedDrinkDetails.strMeasure7
  const measurement8 = selectedDrinkDetails.strMeasure8
  const measurement9 = selectedDrinkDetails.strMeasure9
  const measurement10 = selectedDrinkDetails.strMeasure10

  const measurementArr = [
    measurement1,
    measurement2,
    measurement3,
    measurement4,
    measurement5,
    measurement6,
    measurement7,
    measurement8,
    measurement9,
    measurement10,
  ]

  measurementList.innerHTML = ""

  for (const measurement of measurementArr) {
    if (measurement != null) {
      measurementHeader.textContent = "Measurements"
      const li = document.createElement("li")
      li.innerText = measurement
      measurementList.append(li)
    }
  }
}

handleSearchEvent()
