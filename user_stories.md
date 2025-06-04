# MVP

---

## Feature 1: Search Cocktails

**User Story:** As a user, I want to search for my favorite cocktails by name.
**Details:** Use a search bar to fetch cocktail data from [Cocktail API](https://www.thecocktaildb.com/api.php) and display it.

## Feature 2: Display Cocktail Recipe onClick

**User Story:** As a user, when I click on the recipe button, I want to see the recipe details displayed on the page. Should include: Name, Ingredients, Measurements, Instructions.
**Details:** Create an onClick Event forEach cocktail image. Fetch the recipe date from the Cocktail API and display below the search bar.

## Feature 3: Add Cocktail to My Favorites List

**User Story:** As a user, I want to save my favorite cocktails and display them on the page.
**Details:** Create a Button with an onClick Event to add Cocktail to My Favorites List. Post saved cocktails to local db.json file. Display the cocktail image and name at the top of the page.

## Feature 4: Remove Cocktails from Favorites List

**User Story:** As a user, I want to be able to remove cocktails from My Favorites list and remove image and name from page.
**Details:** Create a Button with an onClick Event that will Delete the targeted cocktail and remove image and name from page.

## Feature 5: Show Enlarged Image on Mouseover

**User Story:** As a user, I want the cocktail images in My Favorites list to increase in size on mouseover and return to the original size on mouseout.
**Details:** Create a mouseover Event that will increase the size of the image and a mouseout Event that will decrease it to the original size.

---

# Stretch Goals

---

## Feature: Display Cocktail Recipe onClick

1. **Display Random Cocktail**
   **User Story:** As a user, I want to click on a 'Try Something New' Button and display a random cocktail.
   **Details:** Create a button with an onClick Event that will fetch data from [Cocktail API](https://www.thecocktaildb.com/api.php) and display below the search bar.
