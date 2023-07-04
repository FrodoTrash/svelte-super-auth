import { fail, type Actions, redirect } from "@sveltejs/kit";
import { superValidate, message } from 'sveltekit-superforms/server';

import { registerSchema } from '$lib/utils/schemas';


export const load = async (event) => {

  const form = await superValidate(event, registerSchema);

  return {
    form
  }
}


export const actions: Actions = {
  register: async (event) => {

    const form = await superValidate(event, registerSchema);


    if (!form.valid){
      return fail(400, {
        form
      })
    }
    
    try {
      await event.locals.pb.collection('users').create(form.data);
      await event.locals.pb.collection('users').authWithPassword(form.data.username, form.data.password);
    } catch (error) {
      return message(form, 'invalid credentials', {
        status: 400
      });
    }

    throw redirect(303, '/me');
  }
};