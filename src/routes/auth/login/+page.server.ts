// +page.server.ts
import { redirect } from '@sveltejs/kit';
import { PUBLIC_BACKEND_URI } from "$env/static/public";
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, cookies }) => {

        const formData = await request.formData();
        
        const email = formData.get('email');
        const password = formData.get('password');

        if ( email != null && password != null){

        const response =  await fetch(PUBLIC_BACKEND_URI + "token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                username: email.toString(),
                password: password.toString(),
            })
        })
        
        let token = await response.json();

        if (response.status === 200) {
            cookies.set('access_token', token.access_token, {
                path: '/dashboard',
            });

            
            throw redirect(302, '/dashboard');
          } else {
            return { errors: await response.json() }
        }  
        } else {
            return {
                errors: "no password or email input"
            }
        }
    }
}