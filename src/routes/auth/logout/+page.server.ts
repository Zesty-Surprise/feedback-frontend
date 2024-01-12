import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from '../../dashboard/$types';

export const load: LayoutServerLoad = async (event) => {
    event.cookies.delete("access_token", { path: '/dashboard' }); 
    throw redirect(307, '/auth/login');
};

