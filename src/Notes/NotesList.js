import React, { useState, useEffect } from "react";
import { notes } from "../api/api";
import styles from "./NotesList.module.scss";

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
    try {
      await notes({
        method: "post",
        data: createNote(state.noteText),
      });
      updateState({ noteText: "", updateNoteList: ++state.updateNoteList });
    } catch (e) {
      alert(e);
    }
  }

  useEffect(() => {
    async function getNotes() {
      try {
        const response = await notes({
          method: "get",
        });
        updateState({ notesList: response });
      } catch (e) {
        alert(e);
      }
    }
    getNotes();
  }, [state.updateNoteList]);

  async function deleteNote({ id }) {
    try {
      await notes({ method: "delete", id });
      const updatedList = state.notesList.filter((note) => note.id !== id);
      updateState({ notesList: updatedList });
    } catch (e) {
      alert(e);
    }
  }

  function toggleEditMode({ id, isEditMode }) {
    const newNotesList = state.notesList.map((note) => {
      return note.id === id ? { ...note, isEditMode: !isEditMode } : note;
    });
    updateState({ notesList: newNotesList });
  }

  function editNote(id, text) {
    const newNotesList = state.notesList.map((note) => {
      return note.id === id ? { ...note, text } : note;
    });
    updateState({ notesList: newNotesList });
  }

  async function saveNote(note) {
    try {
      await notes({ method: "put", data: note, id: note.id });
      toggleEditMode(note);
    } catch (e) {
      alert(e);
    }
  }

  function cancelEdit() {
    updateState({ updateNoteList: ++state.updateNoteList });
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
      {/*HERE BEGINS THE LIST OF NOTES*/}
      <ul className={styles.notesList}>
        {state.notesList.map((note) => (
          <li className={styles.noteItem}>
            {note.isEditMode ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  saveNote(note);
                }}
              >
                <input
                  value={note.text}
                  onChange={(event) => editNote(note.id, event.target.value)}
                />
                <button type="button" onClick={cancelEdit}>
                  cancel
                </button>
                <button>save</button>
              </form>
            ) : (
              note.text
            )}
            {!note.isEditMode && (
              <>
                <button type="button" onClick={() => toggleEditMode(note)}>
                  edit
                </button>
                <button type="button" onClick={() => deleteNote(note)}>
                  delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function createNote(text) {
  return {
    context: {
      message_id: "",
      gmail_message_id: "",
      gmail_draft_id: "",
      mailbutler_message_id: "",
      contact_id: "",
    },
    text,
    team_id: "",
  };
}
