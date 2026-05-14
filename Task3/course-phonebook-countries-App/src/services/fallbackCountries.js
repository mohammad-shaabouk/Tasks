const flagSvg = (label, color) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
      <rect width="320" height="200" rx="18" fill="${color}"/>
      <circle cx="160" cy="100" r="58" fill="rgba(255,255,255,.22)"/>
      <text x="160" y="114" text-anchor="middle" fill="white" font-family="Arial" font-size="44" font-weight="700">${label}</text>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export const fallbackCountries = [
  {
    area: 338424,
    borders: ['NOR', 'SWE', 'RUS'],
    capital: ['Helsinki'],
    cca3: 'FIN',
    currencies: { EUR: { name: 'Euro' } },
    flags: { alt: 'Finland fallback flag', png: flagSvg('FI', '#2563eb'), svg: flagSvg('FI', '#2563eb') },
    languages: { fin: 'Finnish', swe: 'Swedish' },
    name: { common: 'Finland' },
    population: 5530719,
    region: 'Europe',
  },
  {
    area: 377975,
    borders: [],
    capital: ['Tokyo'],
    cca3: 'JPN',
    currencies: { JPY: { name: 'Japanese yen' } },
    flags: { alt: 'Japan fallback flag', png: flagSvg('JP', '#dc2626'), svg: flagSvg('JP', '#dc2626') },
    languages: { jpn: 'Japanese' },
    name: { common: 'Japan' },
    population: 125836021,
    region: 'Asia',
  },
  {
    area: 8515767,
    borders: ['ARG', 'BOL', 'COL', 'GUF', 'GUY', 'PRY', 'PER', 'SUR', 'URY', 'VEN'],
    capital: ['Brasilia'],
    cca3: 'BRA',
    currencies: { BRL: { name: 'Brazilian real' } },
    flags: { alt: 'Brazil fallback flag', png: flagSvg('BR', '#16a34a'), svg: flagSvg('BR', '#16a34a') },
    languages: { por: 'Portuguese' },
    name: { common: 'Brazil' },
    population: 212559409,
    region: 'Americas',
  },
  {
    area: 9984670,
    borders: ['USA'],
    capital: ['Ottawa'],
    cca3: 'CAN',
    currencies: { CAD: { name: 'Canadian dollar' } },
    flags: { alt: 'Canada fallback flag', png: flagSvg('CA', '#ef4444'), svg: flagSvg('CA', '#ef4444') },
    languages: { eng: 'English', fra: 'French' },
    name: { common: 'Canada' },
    population: 38005238,
    region: 'Americas',
  },
  {
    area: 1002450,
    borders: ['ISR', 'LBY', 'SDN'],
    capital: ['Cairo'],
    cca3: 'EGY',
    currencies: { EGP: { name: 'Egyptian pound' } },
    flags: { alt: 'Egypt fallback flag', png: flagSvg('EG', '#b91c1c'), svg: flagSvg('EG', '#b91c1c') },
    languages: { ara: 'Arabic' },
    name: { common: 'Egypt' },
    population: 102334403,
    region: 'Africa',
  },
  {
    area: 7692024,
    borders: [],
    capital: ['Canberra'],
    cca3: 'AUS',
    currencies: { AUD: { name: 'Australian dollar' } },
    flags: { alt: 'Australia fallback flag', png: flagSvg('AU', '#0f766e'), svg: flagSvg('AU', '#0f766e') },
    languages: { eng: 'English' },
    name: { common: 'Australia' },
    population: 25687041,
    region: 'Oceania',
  },
]
