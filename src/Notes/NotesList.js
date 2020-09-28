import React, { useState } from "react";
import { notes } from "../api/api";

export function NotesList() {
  const [noteText, setNoteText] = useState("");

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
    </div>
  );
}
