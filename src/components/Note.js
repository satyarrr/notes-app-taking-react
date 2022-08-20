import React from "react";
import { BsPinFill } from "react-icons/bs";
import { BsPin } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";

const Note = ({ id, title, tag, body, onClick, pin, pinned, del }) => {
  return (
    <div onClick={onClick} className="note">
      <h4>{title}</h4>
      <span className="pin">
        {pinned && <BsPinFill size={20} onClick={(e) => pin(e, id)} />}
        {!pinned && <BsPin size={20} onClick={(e) => pin(e, id)} />}
      </span>

      <span>{tag}</span>

      <p>{body}</p>
      <span className="delete">
        <MdDeleteForever size={28} onClick={(e) => del(e, id)} />
      </span>
    </div>
  );
};

export default Note;
