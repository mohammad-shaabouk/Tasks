import React from 'react';
import './TopAnecdoteCard.css';

const TopAnecdoteCard = ({ anecdote, votes }) => {
  return (
    <div className="top-card">
      <div className="top-card-glow"></div>
      <h2 className="top-title">
        <span className="crown-icon">👑</span>
        الحكمة الأكثر شعبية
      </h2>
      {votes > 0 ? (
        <div className="top-content">
          <p className="top-anecdote">"{anecdote}"</p>
          <div className="top-votes">
            <span className="vote-count">{votes}</span>
            <span className="vote-suffix">صوت</span>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <p className="empty-message">لم يتم التصويت بعد</p>
          <span className="empty-icon">🌟</span>
        </div>
      )}
    </div>
  );
};

export default TopAnecdoteCard;