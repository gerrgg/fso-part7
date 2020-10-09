import React, { useState } from "react";
import About from "./components/About";
import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import Anecdote from "./components/Anecdote";
import Footer from "./components/Footer";
import CreateNew from "./components/CreateNew";
import Notification from "./components/Notification";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    notify(`You added "${anecdote.content}" to the list`);
  };

  const notify = (message, timeout = 10000) => {
    // clear message after timeout
    setTimeout(() => {
      setNotification("");
    }, timeout);

    // set message
    setNotification(message);
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Router>
        <Menu />
        <Notification notification={notification} />
        <Switch>
          <Route path="/anecdotes/:id">
            <Anecdote anecdotes={anecdotes} />
          </Route>
          <Route
            path="/anecdote/new"
            render={() =>
              notification === "" ? (
                <CreateNew addNew={addNew} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
