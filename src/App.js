import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';

const colors = [
  '#4f57ff',
  '#00c4b6',
  '#1fad3b',
  '#0f3a5f',
  '#f08d00',
  '#e63332',
  '#8c3ba8',
  '#fd695f',
  '#5d4437',
  '#71a7a3',
];

const App = () => {
  const dispatch = useDispatch();
  const quote = useSelector((state) => state.quote);
  const author = useSelector((state) => state.author);
  const color = useSelector((state) => state.color);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchQuotes = async () => {
    setIsUpdating(true);
    const response = await fetch(
      'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
    );
    const data = await response.json();
    const randomQuote =
      data.quotes[Math.floor(Math.random() * data.quotes.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    dispatch({
      type: 'SET_QUOTE',
      payload: randomQuote,
    });
    dispatch({
      type: 'SET_COLOR',
      payload: randomColor,
    });
    setIsUpdating(false);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  useEffect(() => {
    if (color) {
      document.body.style.backgroundColor = color;
    }
  }, [color]);

  return (
    <div id="wrapper">
      <div id="quote-box">
        <div className="quote-text" style={{ color }}>
          <i className="fa fa-quote-left"> </i>
          <span id="text">{quote}</span>
        </div>
        <div className="quote-author" style={{ color }}>
          - <span id="author">{author}</span>
        </div>
        <div className="buttons">
          <a
            className="button"
            id="tweet-quote"
            title="Tweet this quote!"
            href="https://twitter.com/intent/tweet"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: color }}
          >
            <i className="fa fa-twitter"></i>
          </a>
          <button
            className="button"
            id="new-quote"
            onClick={fetchQuotes}
            disabled={isUpdating}
            style={{ backgroundColor: color }}
          >
            New quote
          </button>
        </div>
      </div>
      <footer className="footer">
        by{' '}
        <a
          href="https://github.com/ChAl76"
          target="_blank"
          rel="noopener noreferrer"
        >
          ChAl
        </a>
      </footer>
    </div>
  );
};

export default App;
