/* eslint-disable react/prop-types */

import { createRef, useState } from "react";
import Note from "./note";
import { useNotes } from "../hooks/useNotes";

const INITIAL_NOTES = [
  {
    id: 1,
    text: "Pick up milk, eggs, and bread on the way home from work.",
  },
  {
    id: 2,
    text: "Reminder: Call Grandma to wish her a happy birthday",
  },
  {
    id: 3,
    text: "Don't forget to water the plants in the office lounge today!",
  },
];

const Notes = () => {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [note, setNote] = useState("");

  const { handleDragStart, noteRefs } = useNotes({ notes, setNotes });

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "5px",
          marginTop: "30px",
        }}
      >
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button
          style={{
            backgroundColor: "black",
            color: "whitesmoke",
            padding: "10px",
            borderRadius: "10%",
          }}
          onClick={() => {
            setNotes([...notes, { id: notes.length + 1, text: note }]);
            setNote("");
          }}
        >
          Add Note
        </button>
      </div>
      {notes.map((note) => {
        return (
          <Note
            key={note.id}
            ref={
              noteRefs.current[note.id]
                ? noteRefs.current[note.id]
                : (noteRefs.current[note.id] = createRef())
            }
            initialPos={note.position}
            content={note.text}
            onMouseDown={(e) => handleDragStart(note, e)}
          />
        );
      })}
    </div>
  );
};

export default Notes;
