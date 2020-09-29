import styles from "./NotesList.module.scss";
import React from "react";

export function Note({
  note,
  saveNote,
  cancelEdit,
  editNote,
  deleteNote,
  toggleEditMode,
}) {
  return (
    <li className={styles.noteItem}>
      {note.isEditMode ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            saveNote(note);
          }}
        >
          <textarea
            className={styles.noteArea}
            rows="7"
            value={note.text}
            onChange={(event) => editNote(note.id, event.target.value)}
          />
          <button
            className={styles.noteItemBtn}
            type="button"
            onClick={cancelEdit}
          >
            cancel
          </button>
          <button className={styles.noteItemBtn}>save</button>
        </form>
      ) : (
        note.text
      )}
      {!note.isEditMode && (
        <div className={styles.btnLayout}>
          <button
            className={styles.noteItemBtn}
            type="button"
            onClick={() => toggleEditMode(note)}
          >
            edit
          </button>
          <button
            className={styles.noteItemBtn}
            type="button"
            onClick={() => deleteNote(note)}
          >
            delete
          </button>
        </div>
      )}
    </li>
  );
}
