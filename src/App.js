import { useState, useEffect } from "react";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";
// import for Login
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import Header from "./components/Header";
import BookCard from "./components/BookCard";

import API from "./util/API";

import "./App.css";
import { Button } from "react-bootstrap";

// function LoginModalState() {
//   const tempState;

//   const [modalstate, setModalState] = useState(false);
// }

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (!searchQuery) return;
    const handle = setTimeout(async () => {
      const res = await API.Book.search(searchQuery);
      setSearchResults(() =>
        res.data.items.map(
          ({
            volumeInfo: {
              title,
              description,
              authors,
              imageLinks: { thumbnail: image },
              infoLink: link,
            },
            id: bookId,
          }) => ({ title, description, authors, image, link, bookId })
        )
      );
    }, 500);
    return () => clearTimeout(handle);
  }, [searchQuery]);
  console.log(searchResults);
  return (
    <>
      <Header>
        <NavLink className="nav-link" to="/" exact>
          Search
        </NavLink>
        <Button variant="primary" onClick={handleShow}>
          Login
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Form></Form>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Header>
      <div className="container mt-5">
        <Switch>
          <Route path="/" exact>
            <div className="card mx-5">
              <div className="card-body">
                <input
                  type="text"
                  className="form-control"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            {searchResults.map(({ id, bookId, ...bookInfo }, i) => (
              <BookCard
                key={i}
                id={id ?? bookId}
                {...bookInfo}
                saved={Boolean(id)}
              />
            ))}
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
