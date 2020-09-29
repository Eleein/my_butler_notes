import React, { useState, useEffect } from "react";
import { notes } from "../api/api";

export function NotesList() {
  const [state, setState] = useState({
    noteText: "",
    notesList: [],
    updateNoteList: 0,
  });

  const updateState = (newState) => {
    setState((state) => ({
      ...state,
      ...newState,
    }));
  };

  async function postNote(event) {
    event.preventDefault();

    // If the noteText is blank, then exit this function
    if (state.noteText.trim() === "") {
      return;
    }
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
        text: state.noteText,
        team_id: "",
      },
    });
    updateState({ noteText: "", updateNoteList: ++state.updateNoteList });
  }
  useEffect(() => {
    async function getNotes() {
      const response = await notes({
        method: "get",
      });
      updateState({ notesList: response });
    }
    getNotes();
  }, [state.updateNoteList]);

  async function deleteNote({ id }) {
    await notes({ method: "delete", id });
    const updatedList = state.notesList.filter((note) => note.id !== id);
    updateState({ notesList: updatedList });
  }
  async function toggleEditMode({ id, isEditMode }) {
    const newNotesList = state.notesList.map((note) => {
      return note.id === id ? { ...note, isEditMode: !isEditMode } : note;
    });
    updateState({ notesList: newNotesList });
  }

  return (
    <div>
      <form onSubmit={postNote}>
        <textarea
          placeholder="write your note here"
          value={state.noteText}
          onChange={({ target: { value } }) => updateState({ noteText: value })}
        />
        <button>Add Note</button>
      </form>
      <ul>
        {state.notesList.map((note) => (
          <li>
            {note.text}
            <button type="button" onClick={() => toggleEditMode(note)}>
              {note.isEditMode ? "cancel" : "edit"}
            </button>
            <button type="button" onClick={() => deleteNote(note)}>
              delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
