function History({ history }) {
  return (
    <section className="card history-card">
      <div className="section-heading">
        <p className="eyebrow">Activity</p>
        <h2>Recent actions</h2>
      </div>
      <div className="history-list">
        {history.length === 0 ? (
          <div className="empty-state">
            No actions yet
          </div>
        ) : (
          history.map((action, index) => (
            <div key={index} className="history-item">
              <span>{action}</span>
              <time>
                {new Date().toLocaleTimeString()}
              </time>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default History;
