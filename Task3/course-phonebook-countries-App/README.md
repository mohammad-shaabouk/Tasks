# course-phonebook-countries-App

> A unified modern React application featuring three professional mini-apps,
> built with React, React Router, Axios, json-server, and a custom design system.

## Apps Included

- Web Curriculum Manager
- Smart Contacts Hub
- World Explorer

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React |
| Build tool | Vite |
| Routing | React Router DOM v6 |
| State | `useState`, `useEffect`, `useMemo`, `useCallback` |
| HTTP | Axios |
| Backend | json-server with `db.json` |
| Styling | CSS variables and pure CSS |
| Font | IBM Plex Sans Arabic |

## Getting Started

### Prerequisites

- Node.js 20.19 or newer
- A package manager compatible with `package-lock.json`

### Installation

```bash
npm install
```

### Running the Dev Server

```bash
npm run dev
```

Vite will print the local URL, usually `http://localhost:5173`.

### Running json-server

```bash
npm run server
```

The phonebook service expects `http://localhost:3001/persons`.

## Screenshots

| App | Preview |
| --- | --- |
| Courses | ![courses](#) |
| Phonebook | ![phonebook](#) |
| Countries | ![countries](#) |

## Project Structure

```text
root/
├── db.json
├── public/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── components/
    │   ├── shared/
    │   ├── course/
    │   ├── phonebook/
    │   └── countries/
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── CoursePage.jsx
    │   ├── PhonebookPage.jsx
    │   └── CountriesPage.jsx
    ├── services/
    │   ├── phonebookService.js
    │   └── countriesService.js
    └── styles/
        ├── global.css
        ├── variables.css
        ├── course.css
        ├── phonebook.css
        └── countries.css
```

## Features

- Persistent animated navigation with React Router routes for all apps
- Course cards with live course, part, and exercise statistics
- Add-course and per-course add-part workflows
- Phonebook CRUD service layer with search, categories, favorites, edit modal, and delete confirmation
- Countries explorer with debounced search, region tabs, loading skeletons, featured countries, and detail modal
- Responsive CSS Grid and Flexbox layouts for mobile and desktop
- Shared buttons, modal, loader, empty state, typography, spacing, and glass surfaces

## License

This project is provided for coursework and portfolio use.
