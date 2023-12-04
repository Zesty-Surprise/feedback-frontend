<script>
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { setCookie } from "typescript-cookie";
    import { PUBLIC_BACKEND_URI } from "$env/static/public";

    let email = "";
    let password = "";

    const generateRandomState = () => {
        // Generate a random string to use as the state parameter
        return Math.random().toString(36).substring(2, 15);
    };

    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("access_token");
        const tokenType = params.get("token_type");

        if (accessToken && tokenType === "bearer") {
            setCookie("access_token", accessToken, { expires: 420 });

            goto("/dashboard");
        } else {
            // Handle authentication failure or missing parameters
            console.error("Authentication failed or missing parameters");
        }
    });

    /**
     * @param {{ preventDefault: () => void; }} event
     */
    function fetchData(event) {
        event.preventDefault();

        fetch(PUBLIC_BACKEND_URI + "token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: "",
                username: email,
                password: password,
                client_id: "",
                client_secret: "",
            }),
        })
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

    const handleGoogleLogin = async () => {
        const state = generateRandomState();

        localStorage.setItem("state", state);

        console.error("state" + state);
        // Redirect to the backend route responsible for Google authentication
        window.location.href = `http://localhost:8000/api/login?state=eaa7b80f376218876a5d69af4534ac6943acf6c32087f47d929cea91a05d254c`;
    };

    // export const fetchData = async (endpoint: string): Promise<any> => {
    //     try {
    //         // Retrieve the access token from the cookie
    //         const accessToken: string | undefined = Cookies.get(COOKIE_NAME);

    //         if (!accessToken) {
    //         throw new Error('Access token not found');
    //         }

    //         const response = await fetch(`${BASE_URL}${endpoint}`, {
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //         },
    //         });

    //         if (!response.ok) {
    //         throw new Error('API request failed');
    //         }

    //         const apiData = await response.json();
    //         return apiData;
    //     } catch (error) {
    //         console.error(error);
    //         throw error;
    //     }
    // };
</script>

<div class="min-h-screen flex flex-col justify-center items-center">
    <div>
        <a href="/">
            <img src="/src/images/logo.svg" alt="Your Surprise" />
        </a>
    </div>

    <div
        class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
    >
        <div class="text-2xl text-center font-bold text-gray-600">Login</div>

        <form method="POST" action="">
            <div>
                <label
                    class="block font-medium text-sm text-gray-700"
                    for="email">Email</label
                >
                <input
                    class="block text-black mt-1 w-full border-gray-300 focus:border-color-highlight focus:ring-color-highlight rounded-md shadow-sm"
                    id="email"
                    type="email"
                    name="email"
                    required
                    autocomplete="email"
                    bind:value={email}
                />
            </div>

            <div class="mt-4">
                <label
                    class="block font-medium text-sm text-gray-700"
                    for="password">Password</label
                >
                <input
                    class="block text-black mt-1 w-full border-gray-300 focus:border-color-highlight focus:ring-color-highlight rounded-md shadow-sm"
                    id="password"
                    type="password"
                    name="password"
                    required
                    bind:value={password}
                />
            </div>

            <div class="flex justify-end">
                <button
                    type="submit"
                    class="text-white mt-4 bg-color-accent hover:bg-orange-700 focus:outline-none font-medium rounded-2xl text-sm px-4 py-2"
                    on:click={fetchData}
                >
                    Submit
                </button>
            </div>
            <div class="flex justify-end">
                <button
                    class="text-white mt-2 bg-color-accent hover:bg-orange-700 focus:outline-none font-medium rounded-2xl text-sm px-4 py-2"
                    on:click={handleGoogleLogin}
                >
                    Login with Google
                </button>
            </div>
        </form>
    </div>
</div>
