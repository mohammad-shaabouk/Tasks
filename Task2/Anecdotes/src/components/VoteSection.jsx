import React from 'react';
import './VoteSection.css';
import VoteCounter from './VoteCounter';
import GlowButton from './GlowButton';

const VoteSection = ({ votes, onVote, onNext }) => {
  return (
    <div className="vote-section">
      <VoteCounter votes={votes} />
      <div className="button-group">
        <GlowButton onClick={onVote} variant="primary">
          ✨ تصويت
        </GlowButton>
        <GlowButton onClick={onNext} variant="secondary">
          🎲 حكمة أخرى
        </GlowButton>
      </div>
    </div>
  );
};

export default VoteSection;