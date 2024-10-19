const saveCredentials = async (name, credentials) => {
  try {
    await localStorage.setItem(name, JSON.stringify(credentials));
  } catch (error) {
    console.error("Invalid JSON:", error);
  }
};

const getCredentials = async (name) => {
  try {
    const credentials = await JSON.parse(localStorage.getItem(name));
    if (credentials) return credentials;
  } catch (error) {
    console.error("Invalid JSON:", error);
  }
};

const clearCredentials = async (name) => {
  try {
    await localStorage.clear(name);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  saveCredentials,
  getCredentials,
  clearCredentials,
};
