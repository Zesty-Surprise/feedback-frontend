import { writable, derived } from "svelte/store";

const apiData = writable([]);

export const drinkNames = derived(apiData, ($apiData) => {
    if ($apiData.drinks) {
      return $apiData.drinks.map((drink) => drink.strDrink);
    }
    return [];
  });

export async function eNPSData() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Bourbon")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      apiData.set(data);
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Bourbon
