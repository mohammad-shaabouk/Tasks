function StatCard({ label, value, detail, tone = 'default' }) {
  return (
    <section className={`stat-card ${tone}`}>
      <p>{label}</p>
      <strong>{value}</strong>
      {detail ? <span>{detail}</span> : null}
    </section>
  )
}

export default StatCard
