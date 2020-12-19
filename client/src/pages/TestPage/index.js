import { text } from "body-parser";
import React, { useState, useRef } from "react";

const TestPage = () => {
  const [timer, setTimer] = useState(34);
  const [WPM, setWPM] = useState(0);
  const [errors, setErrors] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [mistakeCount, setMistakeCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const snippet1 = `"What else can I be," returned the uncle, "when I
live in such a world of fools as this? Merry Christmas!
Out upon merry Christmas! What's Christmas
time to you but a time for paying bills without
money; a time for finding yourself a year older, but
not an hour richer; a time for balancing your books
and having every item in 'em through a round dozen
of months presented dead against you?`;

  const snippet2 = `Scrooge asked the question, because he didn't know
whether a ghost so transparent might find himself in
a condition to take a chair; and felt that in the event
of its being impossible, it might involve the necessity
of an embarrassing explanation. But the ghost sat
down on the opposite side of the fireplace, as if he
were quite used to it.`;

  const snippet3 = `"It's I. Your uncle Scrooge. I have come to dinner.
Will you let me in, Fred?" Let him in! It is a mercy he didn't shake his arm off.
He was at home in five minutes. Nothing could be heartier.
His niece looked just the same. So did Topper when he
came. So did the plump sister when she came. So did
every one when they came. Wonderful party, wonderful
games, wonderful unanimity, won-der-ful happiness!`;

  const snippet4 = `He went to church, and walked about the streets, and watched the people hurrying to and fro, and patted children on the head, and questioned beggars, and looked down into the kitchens of houses, and up to the windows, and found that everything could yield him pleasure. He had never dreamed that any walk--that anything--could give him so much happiness. In the afternoon he turned his steps towards his nephew's house.`;

  const snippet5 = `The Ghost of Christmas Yet To Come conveyed him, as before--though at a different time, he thought: indeed, there seemed no order in these latter visions, save that they were in the Future--into the resorts of business men, but showed him not himself. Indeed, the Spirit did not stay for anything, but went straight on, as to the end just now desired, until besought by Scrooge to tarry for a moment.`;

  const [textSnippet, setTextSnippet] = useState("Snippet");
  var snipArray = [snippet1, snippet2, snippet3, snippet4, snippet5];
  var choice = snipArray[Math.floor(Math.random() * snipArray.length)];

  function onChangeHandler(event) {
    console.log(textSnippet);
    console.log(event.target.value);
    if (textSnippet.startsWith(event.target.value)) {
      setInputVal(event.target.value);
      setCharCount(charCount + 1);
    } else {
      setMistakeCount(mistakeCount + 1);
    }
    setWPM(inputVal.length / 2.5);
    console.log(mistakeCount);
  }

  function startClickHandler() {
    setIsGameStarted(true);
    console.log(choice);
    setTextSnippet(choice);
    var intervalID = window.setInterval(myCallback, 1000);

    function myCallback() {
      setTimer((state) => {
        if (state <= 1) {
          clearInterval(intervalID);
          setIsGameStarted(false);
          setTimer(34);
        }
        return state - 1;
      });
    }
  }
  return (
    <>
      <div className="container">
        <div className="head-gradient"></div>
        <div className="heading">Simple Speed Typing</div>
        <div className="header bordered">
          <div className="wpm display-data">
            <div className="header_text">WPM</div>
            <div className="curr_wpm">{WPM}</div>
          </div>
          <div className="errors display-data">
            <div className="header_text">Errors</div>
            <div className="curr_errors">{mistakeCount}</div>
          </div>
          <div className="accuracy display-data">
            <div className="header_text">% Accuracy</div>
            <div className="curr_accuracy">{accuracy}</div>
          </div>
        </div>
        <div className="quote">Click start to begin the test.</div>
        <button className="start-btn" onClick={startClickHandler}>
          Start
        </button>
        <div className="timer">
          <div className="header_text">Time</div>
          <div className="curr_time">{timer}s</div>
        </div>
        {isGameStarted ? (
          <p className="snippet" onChange={onChangeHandler}>
            {textSnippet}
          </p>
        ) : (
          ""
        )}
        {isGameStarted ? (
          <div className="bordered">
            <textarea
              className="input_area"
              placeholder="4 Seconds to get set, then type here"
              value={inputVal}
              onChange={onChangeHandler}
            ></textarea>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="foot-gradient"></div>
    </>
  );
};

export default TestPage;
