import axios from "axios";
const baseUrl = "https://note-sigma-black.vercel.app/api/v1/";

export async function addNoteApi(noteData) {
  try {
    const { data } = await axios.post(baseUrl + "notes", noteData, {
      headers: {
        token: "3b8ny__" + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : { error: error.msg };
  }
}
export async function getUserNotes() {
  try {
    const { data } = await axios.get(baseUrl + "notes", {
      headers: {
        token: "3b8ny__" + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : { error: error.msg };
  }
}
export async function updateNoteApi(noteId, formData) {
  try {
    const { data } = await axios.put(baseUrl + "notes/" + noteId, formData, {
      headers: {
        token: "3b8ny__" + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : { error: error.msg };
  }
}
export async function deleteNoteApi(noteId) {
  try {
    const { data } = await axios.delete(baseUrl + "notes/" + noteId, {
      headers: {
        token: "3b8ny__" + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return error.response ? error.response.data : { error: error.msg };
  }
}
