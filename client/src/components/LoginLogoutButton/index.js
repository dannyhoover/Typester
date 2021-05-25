import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { UserContext } from "../../contexts";
import API from "../../util/API";

const LoginModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    API.User.login({ email: email, password: password }).then((response) => {
      console.log(response.data);
      setEmail("");
      setPassword("");
    });
  };
  if (user == null)
    return (
      <>
        <Button
          variant="light"
          onClick={() => setShowModal(true)}
          className="button btnbackground"
        >
          Login
        </Button>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
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
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <Button
              variant="light"
              type="submit"
              onClick={() => setShowModal(false)}
            >
              Login
            </Button>
          </form>
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

export default LoginModal;
