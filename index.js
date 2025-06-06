const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
const searchBtn = document.querySelector("#search-button")
const userInput = document.querySelector("#database-search")
const randomBtn = document.querySelector("#random")
const favoriteBtn = document.querySelector("#favorite-button")

const favoritesContainer = document.querySelector("#favorites-container")

const drinkDetails = document.querySelector("#drink-details")
const recipeContainer = document.querySelector("#recipe-container")
const recipeInstructions = document.querySelector("#instructions")
const ingredientList = document.querySelector("#ingredients")
const measurementList = document.querySelector("#measurements")
const ingredientHeader = document.querySelector("#ingredient-header")
const measurementHeader = document.querySelector("#measurement-header")
const instructionHeader = document.querySelector("#instruction-header")

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
        userInput.value = ""
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
  recipeContainer.style.display = "none"
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

const recipeClick = (currentDrink) => {
  recipeInstructions.textContent = currentDrink.strInstructions
  instructionHeader.textContent = "Instructions"

  getIngredients(currentDrink)
  getMeasurements(currentDrink)
  recipeContainer.style.display = "block"
}

const getIngredients = (currentDrink) => {
  const ingredient1 = currentDrink.strIngredient1
  const ingredient2 = currentDrink.strIngredient2
  const ingredient3 = currentDrink.strIngredient3
  const ingredient4 = currentDrink.strIngredient4
  const ingredient5 = currentDrink.strIngredient5
  const ingredient6 = currentDrink.strIngredient6
  const ingredient7 = currentDrink.strIngredient7
  const ingredient8 = currentDrink.strIngredient8
  const ingredient9 = currentDrink.strIngredient9
  const ingredient10 = currentDrink.strIngredient10

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

const getMeasurements = (currentDrink) => {
  const measurement1 = currentDrink.strMeasure1
  const measurement2 = currentDrink.strMeasure2
  const measurement3 = currentDrink.strMeasure3
  const measurement4 = currentDrink.strMeasure4
  const measurement5 = currentDrink.strMeasure5
  const measurement6 = currentDrink.strMeasure6
  const measurement7 = currentDrink.strMeasure7
  const measurement8 = currentDrink.strMeasure8
  const measurement9 = currentDrink.strMeasure9
  const measurement10 = currentDrink.strMeasure10

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

const getRandomDrink = () => {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((res) => res.json())
    .then((cocktails) => {
      const randomDrink = cocktails.drinks[0]
      renderDrink(randomDrink)
    })
}

randomBtn.addEventListener("click", () => {
  getRandomDrink()
})

favoriteBtn.addEventListener("click", () => {
  if (currentDrink) {
    addFavorite(currentDrink)
  }
})

const addFavorite = (currentDrink) => {
  const existingFavorites = favoritesContainer.querySelectorAll(".fav-drink")
  for (const fav of existingFavorites) {
    if (fav.src === currentDrink.strDrinkThumb) {
      alert("This drink is already in your favorites!")
      return
    }
  }
  const favImage = document.createElement("img")
  favImage.className = "fav-drink"
  favImage.src = currentDrink.strDrinkThumb

  favoritesContainer.append(favImage)

  mouseEvents(favImage)

  const newFavObj = {
    name: currentDrink.strDrink,
    image: currentDrink.strDrinkThumb,
    instructions: currentDrink.strInstructions,
    ingredient1: currentDrink.strIngredient1,
    ingredient2: currentDrink.strIngredient2,
    ingredient3: currentDrink.strIngredient3,
    ingredient4: currentDrink.strIngredient4,
    ingredient5: currentDrink.strIngredient5,
    ingredient7: currentDrink.strIngredient7,
    ingredient8: currentDrink.strIngredient8,
    ingredient6: currentDrink.strIngredient6,
    ingredient9: currentDrink.strIngredient9,
    ingredient10: currentDrink.strIngredient10,
    measurement1: currentDrink.strMeasure1,
    measurement2: currentDrink.strMeasure2,
    measurement3: currentDrink.strMeasure3,
    measurement4: currentDrink.strMeasure4,
    measurement5: currentDrink.strMeasure5,
    measurement6: currentDrink.strMeasure6,
    measurement7: currentDrink.strMeasure7,
    measurement8: currentDrink.strMeasure8,
    measurement9: currentDrink.strMeasure9,
    measurement10: currentDrink.strMeasure10,
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
    .then()
}

const loadFavorites = () => {
  fetch("http://localhost:3000/favorites/")
    .then((res) => res.json())
    .then((favorites) => {
      favorites.forEach((favorite) => {
        displayFavorite(favorite)
      })
    })
}

const displayFavorite = (favorite) => {
  const favDrink = document.createElement("img")
  favDrink.className = "fav-drink"
  favDrink.src = favorite.image

  favDrink.addEventListener("click", () => {
    const fullDrinkDetails = {
      strDrink: favorite.name,
      strDrinkThumb: favorite.image,
      strInstructions: favorite.instructions,
      strIngredient1: favorite.ingredient1,
      strIngredient2: favorite.ingredient2,
      strIngredient3: favorite.ingredient3,
      strIngredient4: favorite.ingredient4,
      strIngredient5: favorite.ingredient5,
      strIngredient6: favorite.ingredient6,
      strIngredient7: favorite.ingredient7,
      strIngredient8: favorite.ingredient8,
      strIngredient9: favorite.ingredient9,
      strIngredient10: favorite.ingredient10,
      strMeasure1: favorite.measurement1,
      strMeasure2: favorite.measurement2,
      strMeasure3: favorite.measurement3,
      strMeasure4: favorite.measurement4,
      strMeasure5: favorite.measurement5,
      strMeasure6: favorite.measurement6,
      strMeasure7: favorite.measurement7,
      strMeasure8: favorite.measurement8,
      strMeasure9: favorite.measurement9,
      strMeasure10: favorite.measurement10,
    }

    renderDrink(fullDrinkDetails)
  })

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

handleSearchEvent()
loadFavorites()
