import { Link } from 'react-router-dom'

const apps = [
  {
    accent: 'course',
    description: 'Plan courses, add parts, and keep exercise totals visible.',
    metric: '2 seed courses',
    title: 'Web Curriculum Manager',
    to: '/courses',
  },
  {
    accent: 'phone',
    description: 'Search, group, edit, favorite, and manage contacts.',
    metric: 'json-server ready',
    title: 'Smart Contacts Hub',
    to: '/phonebook',
  },
  {
    accent: 'world',
    description: 'Explore countries with filters, cards, and detailed facts.',
    metric: 'REST Countries API',
    title: 'World Explorer',
    to: '/countries',
  },
]

const HomePage = () => (
  <section className="home-page">
    <div className="home-hero">
      <p className="eyebrow">Unified React showcase</p>
      <h1>course-phonebook-countries-App</h1>
      <p>
        Three course exercises now live as one polished, routed portfolio app
        with shared structure and distinct product identities.
      </p>
    </div>

    <div className="home-grid">
      {apps.map((app) => (
        <Link className={`home-card home-card--${app.accent}`} key={app.to} to={app.to}>
          <span className="home-card__metric">{app.metric}</span>
          <h2>{app.title}</h2>
          <p>{app.description}</p>
        </Link>
      ))}
    </div>
  </section>
)

export default HomePage
