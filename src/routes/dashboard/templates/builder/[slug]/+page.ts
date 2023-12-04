/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  let response = await fetch(`https://amp.test.axelzublena.com/api/templates/${params.slug}`, {
    method: "GET"
  });
  let json = await response.json();
  return {
    template: json,
  };
}