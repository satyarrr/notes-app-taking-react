import React, { useEffect, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const AddNote = ({ notes, setNotes, showNoteId, close, edit, del }) => {
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [body, setBody] = useState("");

  const notesRef = collection(db, "notes");

  const error = () => toast.error("Please enter a title.");

  const save = async (e) => {
    e.preventDefault();
    if (title !== "") {
      if (showNoteId) {
        const filteredNotes = notes.filter((x) => x.id !== showNoteId);
        const note = notes.filter((x) => x.id === showNoteId)[0];
        setNotes([
          ...filteredNotes,
          { title, tag, body, pinned: note.pinned, id: showNoteId },
        ]);
        const noteDoc = doc(db, "notes", `${showNoteId}`);
        await updateDoc(noteDoc, { title, tag, body, id: showNoteId });
        close();
      } else {
        setNotes([
          ...notes,
          { title, tag, body, pinned: false, id: Math.random() },
        ]);
        await addDoc(notesRef, { title, tag, body, pinned: false });
      }
    } else {
      error();
    }

    setTitle("");
    setTag("");
    setBody("");
  };

  useEffect(() => {
    if (showNoteId) {
      const note = notes.filter((x) => x.id === showNoteId)[0];
      console.log("note: ", note);
      setTitle(note.title);
      setTag(note.tag);
      setBody(note.body);
    }
  }, [showNoteId]);

  return (
    <section className={`${edit ? "add-note edit" : "add-note"}`}>
      <Toaster />
      <form onSubmit={save}>
        <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
          <Form.Control
            type="text"
            placeholder="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Tag" className="mb-3">
          <Form.Control
            type="text"
            placeholder="tag"
            name="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingInput" label="Body" className="mb-3">
          <Form.Control
            type="text"
            placeholder="body"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </FloatingLabel>

        <div className="btn-container">
          <button
            className={`btn btn-primary ${edit ? "" : "save"}`}
            type="submit"
          >
            Save
          </button>
          {edit && (
            <button
              className="btn btn-danger"
              type="button"
              onClick={(e) => {
                close();
                del(e, showNoteId);
              }}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default AddNote;
