// +page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { fetchAPI } from '$lib/functions';

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        
        let body = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            role: formData.get('role')
        }
        
        let response = await fetchAPI(`users`, "POST", cookies.get("access_token") ?? "", body)

        if (response.status === 200) {
            throw redirect(302, '/dashboard/settings');
          } else if (response.status === 409) {
            return fail(404, {fail: true, details: "This email has already been taken" })
        }  else{
            return fail(404, {fail: true, details: "Unknown error happened - reload your page" })
        }
    }
}