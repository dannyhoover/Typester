import { text } from "body-parser";
import React, { useState, useRef } from "react";

const TestPage = () => {
  const [timer, setTimer] = useState(30);
  const [WPM, setWPM] = useState(0);
  const [errors, setErrors] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [textSnippet, setTextSnippet] = useState("Snippet");

  console.log("render");

  function onChangeHandler(event) {
    console.log(event.target.value);
    setTextSnippet();
    if (event.target.value.includes("A")) {
      return;
    }
    setInputVal(event.target.value);
  }

  function startClickHandler() {
    setIsGameStarted(true);
    var intervalID = window.setInterval(myCallback, 1000);

    function myCallback() {
      setTimer((state) => {
        if (state <= 1) {
          clearInterval(intervalID);
        }
        return state - 1;
      });
    }
  }
  return (
    <>
      <div className="container">
        <div className="heading">Simple Speed Typing</div>
        <div className="header">
          <div className="wpm">
            <div className="header_text">WPM</div>
            <div className="curr_wpm">{WPM}</div>
          </div>
          <div className="errors">
            <div className="header_text">Errors</div>
            <div className="curr_errors">{errors}</div>
          </div>
          <div className="timer">
            <div className="header_text">Time</div>
            <div className="curr_time">{timer}s</div>
          </div>
          <div className="accuracy">
            <div className="header_text">% Accuracy</div>
            <div className="curr_accuracy">{accuracy}</div>
          </div>
        </div>
        <div className="quote">Click start to begin the test.</div>
        <button onClick={startClickHandler}>Start</button>
        {isGameStarted ? <p onChange={onChangeHandler}>{textSnippet}</p> : ""}
        {isGameStarted ? (
          <textarea
            className="input_area"
            placeholder="start typing here..."
            value={inputVal}
            onChange={onChangeHandler}
          ></textarea>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default TestPage;
