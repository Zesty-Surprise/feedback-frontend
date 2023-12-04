import { writable, derived } from "svelte/store";
import { getCookie } from "typescript-cookie";
import { env } from "$env/dynamic/public";

const apiData = writable([]);

// export const drinkNames = derived(apiData, ($apiData) => {
//     if ($apiData.drinks) {
//       return $apiData.drinks.map((drink) => drink.strDrink);
//     }
//     return [];
//   });

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

export async function fetchAPI(route:string, method: string, body?:any):Promise<Response>{
  const token = getCookie("access_token");
  if (method === "POST" || method === "PUT") {
    let response = await fetch(env.PUBLIC_BACKEND_URI + route, {
      method: method,
      headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type" : "application/json",
      },
      body:JSON.stringify(body)
    });
    return response
  } else {
    let response = await fetch(env.PUBLIC_BACKEND_URI + route, {
      method: method,
      headers: {
            Authorization: `Bearer ${token}`,
      }
    });
    return response
  }
}