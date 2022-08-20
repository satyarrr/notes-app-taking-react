import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import AddNote from "./AddNote";
import Note from "./Note";
import Modal from "react-bootstrap/Modal";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";

const Main = () => {
  const [notes, setNotes] = useState([]);
  const notesRef = collection(db, "notes");

  const [page, setPage] = useState(1);
  const [notesPerPage, setNotesPerPage] = useState(6);
  const [show, setShow] = useState(false);
  const [showNoteId, setShowNoteId] = useState(null);

  const indexOfLastNote = notesPerPage * page;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;

  const nPages = Math.ceil(notes.length / notesPerPage);

  const currentNotes = notes
    .filter((x) => !x.pinned)
    .slice(indexOfFirstNote, indexOfLastNote);
  const pinnedNotes = notes.filter((x) => x.pinned);

  useEffect(() => {
    const getNotes = async () => {
      const data = await getDocs(notesRef);
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getNotes();
  }, []);

  const handleShow = (id) => {
    setShowNoteId(id);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handlePin = async (e, id) => {
    e.stopPropagation();
    const filteredNotes = notes.filter((x) => x.id !== id);
    const note = notes.filter((x) => x.id === id)[0];

    note.pinned = !note.pinned;
    setNotes([
      ...filteredNotes,
      {
        title: note.title,
        tag: note.tag,
        body: note.body,
        pinned: note.pinned,
        id,
      },
    ]);

    const noteDoc = doc(db, "notes", id);
    await updateDoc(noteDoc, { ...note, pinned: note.pinned });
  };

  const deleteNote = async (e, id) => {
    e.stopPropagation();

    setNotes(notes.filter((x) => x.id !== id));

    const noteDoc = doc(db, "notes", `${id}`);
    await deleteDoc(noteDoc);
  };

  return (
    <>
      <div className="main">
        <div className="add">
          <h3>Add a note: </h3>
          <AddNote notes={notes} setNotes={setNotes} />
        </div>

        <section className="notes">
          <h6>Pinned: </h6>
          {pinnedNotes &&
            pinnedNotes.map((x) => (
              <Note
                onClick={() => handleShow(x.id)}
                key={x.id}
                {...x}
                pin={(e) => handlePin(e, x.id)}
                pinned={x.pinned}
                del={(e) => deleteNote(e, x.id)}
              />
            ))}
          <h6>Other: </h6>
          {currentNotes &&
            currentNotes.map((x) => (
              <Note
                onClick={() => handleShow(x.id)}
                key={x.id}
                {...x}
                pin={(e) => handlePin(e, x.id)}
                pinned={x.pinned}
                del={(e) => deleteNote(e, x.id)}
              />
            ))}
          <Pagination nPages={nPages} page={page} setPage={setPage} />
        </section>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddNote
            notes={notes}
            setNotes={setNotes}
            showNoteId={showNoteId}
            // pinned={pinned}
            close={handleClose}
            edit={true}
            del={(e) => deleteNote(e, showNoteId)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Main;
