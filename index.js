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
        if (drinkInfo.drinks === null) {
          alert("Sorry... no matches. Try again.")
          return
        }
        const searchedDrinkDetails = drinkInfo.drinks[0]
        const drinkNameLowerCase = searchedDrinkDetails.strDrink.toLowerCase()

        if (drinkNameLowerCase === inputText) {
          renderDrink(searchedDrinkDetails)
        }
      })
  })
}

let currentDrink = null

const renderDrink = (searchedDrinkDetails) => {
  drinkDetails.style.display = "block"
  const drinkImage = searchedDrinkDetails.strDrinkThumb
  const drinkName = searchedDrinkDetails.strDrink

  currentDrink = searchedDrinkDetails

  const image = document.querySelector("#drink-image")
  image.src = drinkImage
  image.alt = drinkName

  const name = document.querySelector("#drink-name")
  name.innerText = drinkName

  const recipeButton = document.querySelector("#recipe-button")

  drinkDetails.append(recipeButton)

  recipeButton.addEventListener("click", () =>
    recipeClick(searchedDrinkDetails)
  )
}

const favoriteBtn = document.querySelector("#add-favorite")

favoriteBtn.addEventListener("click", () => {
  if (currentDrink) {
    addFavorite(currentDrink)
  }
})

const addFavorite = (searchedDrinkDetails) => {
  const favImage = document.createElement("img")
  favImage.className = "fav-drink"
  favImage.src = searchedDrinkDetails.strDrinkThumb

  favoritesContainer.append(favImage)

  mouseEvents(favImage)

  const newFavObj = {
    name: searchedDrinkDetails.strDrink,
    image: searchedDrinkDetails.strDrinkThumb,
    instructions: searchedDrinkDetails.strInstructions,
    ingredient1: searchedDrinkDetails.strIngredient1,
    ingredient2: searchedDrinkDetails.strIngredient2,
    ingredient3: searchedDrinkDetails.strIngredient3,
    ingredient4: searchedDrinkDetails.strIngredient4,
    ingredient5: searchedDrinkDetails.strIngredient5,
    ingredient7: searchedDrinkDetails.strIngredient7,
    ingredient8: searchedDrinkDetails.strIngredient8,
    ingredient6: searchedDrinkDetails.strIngredient6,
    ingredient9: searchedDrinkDetails.strIngredient9,
    ingredient10: searchedDrinkDetails.strIngredient10,
    measurement1: searchedDrinkDetails.strMeasure1,
    measurement2: searchedDrinkDetails.strMeasure2,
    measurement3: searchedDrinkDetails.strMeasure3,
    measurement4: searchedDrinkDetails.strMeasure4,
    measurement5: searchedDrinkDetails.strMeasure5,
    measurement6: searchedDrinkDetails.strMeasure6,
    measurement7: searchedDrinkDetails.strMeasure7,
    measurement8: searchedDrinkDetails.strMeasure8,
    measurement9: searchedDrinkDetails.strMeasure9,
    measurement10: searchedDrinkDetails.strMeasure10,
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
  }).then((res) => res.json())
}

const loadFavorites = () => {
  fetch("http://localhost:3000/favorites/")
    .then((res) => res.json())
    .then((favorites) => {
      favorites.forEach((favorite) => {
        renderFavorite(favorite)
      })
    })
}

const renderFavorite = (favorite) => {
  const favDrink = document.createElement("img")
  favDrink.className = "fav-drink"
  favDrink.src = favorite.image

  favoritesContainer.append(favDrink)

  mouseEvents(favDrink)
}

const mouseEvents = (favDrink) => {
  favDrink.addEventListener("mouseenter", () => {
    favDrink.style.height = "250px"
    favDrink.style.width = "250px"
  })

  favDrink.addEventListener("mouseleave", () => {
    favDrink.style.height = "200px"
    favDrink.style.width = "200px"
  })
}

const recipeClick = (searchedDrinkDetails) => {
  recipeInstructions.textContent = searchedDrinkDetails.strInstructions
  instructionHeader.textContent = "Instructions"

  getIngredients(searchedDrinkDetails)
  getMeasurements(searchedDrinkDetails)
  recipeContainer.style.display = "block"
}

const getIngredients = (searchedDrinkDetails) => {
  const ingredient1 = searchedDrinkDetails.strIngredient1
  const ingredient2 = searchedDrinkDetails.strIngredient2
  const ingredient3 = searchedDrinkDetails.strIngredient3
  const ingredient4 = searchedDrinkDetails.strIngredient4
  const ingredient5 = searchedDrinkDetails.strIngredient5
  const ingredient6 = searchedDrinkDetails.strIngredient6
  const ingredient7 = searchedDrinkDetails.strIngredient7
  const ingredient8 = searchedDrinkDetails.strIngredient8
  const ingredient9 = searchedDrinkDetails.strIngredient9
  const ingredient10 = searchedDrinkDetails.strIngredient10

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

const getMeasurements = (searchedDrinkDetails) => {
  const measurement1 = searchedDrinkDetails.strMeasure1
  const measurement2 = searchedDrinkDetails.strMeasure2
  const measurement3 = searchedDrinkDetails.strMeasure3
  const measurement4 = searchedDrinkDetails.strMeasure4
  const measurement5 = searchedDrinkDetails.strMeasure5
  const measurement6 = searchedDrinkDetails.strMeasure6
  const measurement7 = searchedDrinkDetails.strMeasure7
  const measurement8 = searchedDrinkDetails.strMeasure8
  const measurement9 = searchedDrinkDetails.strMeasure9
  const measurement10 = searchedDrinkDetails.strMeasure10

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
loadFavorites()
