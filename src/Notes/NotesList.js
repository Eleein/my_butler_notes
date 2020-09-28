import React, { useState, useEffect } from "react";
import { notes } from "../api/api";

export function NotesList() {
  const [noteText, setNoteText] = useState("");
  const [notesList, setNotesList] = useState([]);

  async function postNote(event) {
    event.preventDefault();
    await notes({
      method: "post",
      data: {
        context: {
          message_id: "",
          gmail_message_id: "",
          gmail_draft_id: "",
          mailbutler_message_id: "",
          contact_id: "",
        },
        text: noteText,
        team_id: "",
      },
    });
    /*get all the notes*/
  }
  useEffect(() => {
    async function getNotes() {
      const response = await notes({
        method: "get",
      });
      setNotesList(response);
    }
    getNotes();
  }, []);

  return (
    <div>
      <form onSubmit={postNote}>
        <textarea
          placeholder="write your note here"
          value={noteText}
          onChange={({ target: { value } }) => setNoteText(value)}
        />
        <button>Add Note</button>
      </form>
      <ul>
        {notesList.map((note) => (
          <li>{note.text}</li>
        ))}
      </ul>
    </div>
  );
}
