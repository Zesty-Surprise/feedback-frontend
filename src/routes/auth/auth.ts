import { goto } from "$app/navigation";
import { getCookie } from "typescript-cookie";

export async function checkAuth(): Promise<boolean> {
    const token = getCookie("access_token");

    if (!token) {
        console.error("Unauthorized access");
        goto("http://localhost:5173/auth/login");
        return false;
    }

    return true;
}