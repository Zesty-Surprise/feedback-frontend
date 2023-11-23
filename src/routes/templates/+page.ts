/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  let response = await fetch("https://test.axelzublena.com/api/templates", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  let json = await response.json();

  return {
    templates: json,
  };
}
