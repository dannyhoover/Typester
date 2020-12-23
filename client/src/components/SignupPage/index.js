import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { UserContext } from "../../contexts";
import { Link, Route, Switch } from "react-router-dom";
import ReactDOM from "react-dom";

const LoginLogoutButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!showModal) {
      setEmail(() => "");
      setPassword(() => "");
    }
  }, [showModal]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/user/register/", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
      });
  };
  if (user == null)
    return (
      <>
        <Button
          variant="light"
          onClick={() => setShowModal(true)}
          className="button"
        >
          Signup
        </Button>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Signup</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              Password:
              <input
                type="text"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </form>
          <Modal.Footer>
            <Button variant="light" onClick={() => setShowModal(false)}>
              Signup
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  else
    return (
      <>
        <Button
          variant="light"
          onClick={() => setShowModal(true)}
          className="button"
        >
          Logout
        </Button>
      </>
    );
};

export default LoginLogoutButton;
