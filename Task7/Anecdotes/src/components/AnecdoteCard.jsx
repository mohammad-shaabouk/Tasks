import React from 'react';
import './AnecdoteCard.css';

const AnecdoteCard = ({ anecdote, isTransitioning }) => {
  return (
    <div className={`anecdote-card ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
      <div className="card-glow"></div>
      <div className="quote-marks opening-mark">"</div>
      <p className="anecdote-text">{anecdote}</p>
      <div className="quote-marks closing-mark">"</div>
    </div>
  );
};

export default AnecdoteCard;