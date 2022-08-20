import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Search from "./Search";
import { useState } from "react";
import Note from "./Note";

const Header = () => {
  const [searchText, setSearchText] = useState('');
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Notes App</Navbar.Brand>
          {/* <Search handleSearchNote={setSearchText} />
          <Note
					notes={Note.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
				/> */}
      </Container>
    </Navbar>
  );
};

export default Header;
