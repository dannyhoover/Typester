import {useEffect, useState} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
// import for Login
import Modal from "react-bootstrap/Modal";
import Chart from "./components/Chart"

import axios from "axios";
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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [data, setData] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3001/user/register/", {email: email, password: password}).then(response => {
            console.log(response.data);
        })

    }

    function setChart() {
      setData({
        chartData:{
          labels: ["point 1", "point 2", "point 3", "point 4", "point 5"],
          datasets: [
            {
              label: "Words per Minute", 
              data:[
                23,24,25,50,45
              ],
              backgroundColor: "rgba(255, 0, 0, 0.2)"
            }
          ]
        }
      })
    }

    useEffect(() => {
      setChart();
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
              Login or Signup
          </Button>

          <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                  <Modal.Title>Login</Modal.Title>
              </Modal.Header>
              <form onSubmit={handleSubmit}>
                  <label>
                      Email:
                      <input type="text" name="email" id="email"
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}/>
                  </label>
                  <label>
                      Password:
                      <input type="text" name="password"
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}/>
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
