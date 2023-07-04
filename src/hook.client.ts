import { currentUser, pb } from "$lib/utils/pocketbase";


pb.authStore.loadFromCookie(document.cookie);

// whenever the authStore changes set the current user
pb.authStore.onChange(() => {
  currentUser.set(pb.authStore.model);
  // http to false so frontend can read the cookie
  document.cookie = pb.authStore.exportToCookie( {httpOnly: false })
})