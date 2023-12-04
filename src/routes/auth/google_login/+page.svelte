<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { setCookie } from "typescript-cookie";
    import { BACKEND_URI } from "$env/static/public"

    onMount(() => {
        // Check if the URL contains the authorization code after redirection
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get("code");

        if (authorizationCode) {
            // If the authorization code is present, exchange it for an access token
            exchangeAuthorizationCode(authorizationCode);
        }
    });

    /**
     * @param {any} code
     */
    function exchangeAuthorizationCode(code) {
        const state = localStorage.getItem("state");

        fetch(
            BACKEND_URI + `api/token?code=${code}&state=eaa7b80f376218876a5d69af4534ac6943acf6c32087f47d929cea91a05d254c`,
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Authentication failed");
                }
                return response.json();
            })
            .then((result) => {
                // Assuming the access token is present in the result
                const accessToken = result.access_token;

                setCookie("access_token", accessToken, { expires: 1 });
                goto("/dashboard");
            })
            .catch((error) => {
                console.error(error);
            });
    }
</script>
