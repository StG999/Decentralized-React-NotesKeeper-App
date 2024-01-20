import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { NoteKeeper_backend } from '../../../declarations/NoteKeeper_backend'

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      NoteKeeper_backend.createNote(newNote.title, newNote.content);
      return [newNote, ...prevNotes];
    });
  }

  useEffect(() => {
    console.log('useEffect()');
    getNotes();
  }, [])

  async function getNotes() {
    const notesArray = await NoteKeeper_backend.readNotes();
    setNotes(notesArray);
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
    NoteKeeper_backend.removeNote(id);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
