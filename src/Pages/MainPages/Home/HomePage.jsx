import React, { useEffect, useState } from "react";
import NoteModel from "../../../assets/Components/NoteToolbar";
import NotesCard from "../../../assets/Components/NotesCard";
import { getUserNotes } from "../../../Services/notesServices";

export default function HomePage() {
  const [notes, setNotes] = useState();

  async function getNotes() {
    try {
      const response = await getUserNotes();
      console.log(response);
      if (response?.msg === "done") {
        setNotes(response.notes);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <NoteModel />
      <NotesCard notes={notes} getNotes={getNotes} />
    </div>
  );
}
