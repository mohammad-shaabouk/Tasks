import React, { useState } from 'react';
import './App.css';
import AnecdoteCard from './components/AnecdoteCard';
import VoteSection from './components/VoteSection';
import TopAnecdoteCard from './components/TopAnecdoteCard';

const App = () => {
  const anecdotes = [
    'إذا كان تنقيح الأخطاء هو عملية إزالة الأخطاء، فإن البرمجة هي عملية وضعها.',
    'أفضل طريقة للبدء هي أن تتوقف عن الكلام وتبدأ بالعمل.',
    'أي أحمق يمكنه كتابة كود يفهمه الكمبيوتر. المبرمجون الجيدون يكتبون كوداً يفهمه البشر.',
    'التحسين المبكر هو أصل كل شر.',
    'قبل أن تعمل البرمجيات بشكل جيد، يجب أن تعمل أولاً.',
    'البساطة هي أقصى درجات التطور.',
    'أفضل رسالة خطأ هي تلك التي لا تظهر أبداً.',
    'أصعب جزء في البرمجة هو تسمية الأشياء.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNextAnecdote = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * anecdotes.length);
      setSelected(randomIndex);
      setIsTransitioning(false);
    }, 300);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  // إيجاد الحكمة الأكثر تصويتاً
  const maxVotes = Math.max(...votes);
  const mostVoted = votes.indexOf(maxVotes);

  return (
    <div className="app">
      <div className="background-animation">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              '--delay': `${Math.random() * 5}s`,
              '--size': `${Math.random() * 4 + 2}px`,
              '--x': `${Math.random() * 100}%`,
              '--y': `${Math.random() * 100}%`,
              '--duration': `${Math.random() * 10 + 10}s`
            }}></div>
          ))}
        </div>
      </div>

      <div className="main-container">
        <h1 className="app-title">
          <span className="title-gradient">✨ Anecdote Vibes</span>
        </h1>

        <AnecdoteCard
          anecdote={anecdotes[selected]}
          isTransitioning={isTransitioning}
        />

        <VoteSection
          votes={votes[selected]}
          onVote={handleVote}
          onNext={handleNextAnecdote}
        />

        <TopAnecdoteCard
          anecdote={anecdotes[mostVoted]}
          votes={maxVotes}
        />
      </div>
    </div>
  );
};

export default App;