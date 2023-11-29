/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    // let html_response = await fetch(`http://localhost:8000/api/preview/${params.slug}`, {
    //   method: "GET",
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // });
    // let html_data = await html_response.text();
  
    let response = await fetch(`https://test.axelzublena.com/api/templates/${params.slug}`, {
      method: "GET"
    });
    let data = await response.json();

    return {
      // html: html_data,
      template: data
    };
  }
  