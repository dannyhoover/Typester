import { useState, useEffect } from "react";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";

import Header from "./components/Header";

import API from "./util/API";

import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
        <NavLink className="nav-link" to="/saved" exact>
          Saved
        </NavLink>
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
            {/* {searchResults.map(({ id, bookId, ...bookInfo }, i) => (
              <BookCard
                key={i}
                id={id ?? bookId}
                {...bookInfo}
                saved={Boolean(id)}
              />
            ))} */}
          </Route>
          <Route path="/saved" exact>
            Saved
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
