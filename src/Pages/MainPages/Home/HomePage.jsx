import React, { useEffect, useState } from "react";
import NoteModel from "../../../assets/Components/NoteToolbar";
import NotesCard from "../../../assets/Components/NotesCard";
import { getUserNotes } from "../../../Services/notesServices";
import Navbar from "../../../assets/Components/Navbar";
import MainSection from "../../../assets/Components/MainSection";

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
      <Navbar />
      <MainSection />
      <NoteModel getNotes={getNotes} />
      <NotesCard notes={notes} getNotes={getNotes} />
    </div>
  );
}
