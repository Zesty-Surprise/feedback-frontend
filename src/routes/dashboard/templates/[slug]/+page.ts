/** @type {import('./$types').PageLoad} */
export async function load({ params }) {

  let html_response = await fetch(`https://amp.test.axelzublena.com/api/email/${params.slug}`, {
    method: "GET"
  });
  let html_data = await html_response.text();

  return {
    html: html_data,
    template: params.slug
  };
}
