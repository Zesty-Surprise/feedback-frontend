/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    let response = await fetch(`http://localhost:8000/api/templates/${params.slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    let json = await response.json();
    return {
      template: json,
    };
  }
  