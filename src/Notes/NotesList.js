import { Note } from "./Note";
import { toast } from "react-toastify";
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
      toast.success("Note Added!");
    } catch (e) {
      toast.error(e.message);
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
        toast.error(e.message);
      }
    }
    getNotes();
  }, [state.updateNoteList]);

  async function deleteNote({ id }) {
    try {
      await notes({ method: "delete", id });
      const updatedList = state.notesList.filter((note) => note.id !== id);
      updateState({ notesList: updatedList });
      toast.success("Note Deleted!");
    } catch (e) {
      toast.error(e.message);
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
      toast.success("Note Saved!");
    } catch (e) {
      toast.error(e.message);
    }
  }

  function cancelEdit() {
    updateState({ updateNoteList: ++state.updateNoteList });
  }

  return (
    <div>
      {/*Here goes the note to be added*/}
      <form className={styles.noteForm} onSubmit={postNote}>
        <textarea
          className={styles.noteArea}
          placeholder="write your note here"
          value={state.noteText}
          onChange={({ target: { value } }) => updateState({ noteText: value })}
        />
        <button className={styles.addNotes}>Add Note</button>
      </form>
      {/*HERE BEGINS THE LIST OF NOTES*/}
      <ul className={styles.notesList}>
        {state.notesList.map((note) => (
          <Note
            cancelEdit={cancelEdit}
            deleteNote={deleteNote}
            editNote={editNote}
            note={note}
            saveNote={saveNote}
            toggleEditMode={toggleEditMode}
          />
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
