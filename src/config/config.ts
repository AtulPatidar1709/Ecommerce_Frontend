
const _config = {
  RZP_TEST_API_KEY    : import.meta.env.VITE_TEST_API_KEY,
  RZP_TEST_API_SECRET : import.meta.env.VITE_TEST_KEY_SECRET,
  enviroment          : import.meta.env.VITE_CLIENT_ID,
}

export const config = Object.freeze(_config);