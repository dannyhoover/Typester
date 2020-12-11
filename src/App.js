import {useEffect, useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
// import for Login
import Modal from "react-bootstrap/Modal";

import Header from "./components/Header";
import BookCard from "./components/BookCard";

import API from "./util/API";

import "./App.css";
import {Button} from "react-bootstrap";

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
                             imageLinks: {thumbnail: image},
                             infoLink: link,
                         },
                         id: bookId,
                     }) => ({title, description, authors, image, link, bookId})
                )
            );
        }, 500);
        return () => clearTimeout(handle);
    }, [searchQuery]);
    console.log(searchResults);
    return (
        <>
            <Header>
                <Button variant="light" onClick={handleShow} className="button">
                    Login/Signup
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <form>
                        <label>
                            Email:
                            <input type="text" name="name" id="email"/>
                        </label>
                        <label>
                            Password:
                            <input type="text" name="name"/>
                        </label>
                    </form>
                    <Modal.Footer>
                        <a href="#" id="signupLink">
                            Not a member yet? Click here to get started.
                        </a>
                        <Button variant="light" onClick={handleClose}>
                            Login
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
                        {searchResults.map(({id, bookId, ...bookInfo}, i) => (
                            <BookCard
                                key={i}
                                id={id ?? bookId}
                                {...bookInfo}
                                saved={Boolean(id)}
                            />
                        ))}
                    </Route>
                    <Route path="*">
                        <Redirect to="/"/>
                    </Route>
                </Switch>
            </div>
        </>
    );
}

export default App;
