import axios from "axios";
const baseUrl = "https://note-sigma-black.vercel.app/api/v1/users/";

export async function registerApi(formData) {
  try {
    const { data } = await axios.post(baseUrl + "signUp", formData);
    return data;
  } catch (error) {
    return error.response ? error.response.data : { error: error.message };
  }
}

export async function loginApi(formData) {
  try {
    const { data } = await axios.post(baseUrl + "signIn", formData);
    return data;
  } catch (error) {
    return error.response ? error.response.data : { error: error.message };
  }
}
