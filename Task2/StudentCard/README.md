# Student Card App

A modern React + Vite application for managing digital student ID cards. It uses a burgundy and white glassmorphism interface, smooth interactions, editable student data, QR-style student IDs, search, multiple cards, theme switching, and localStorage persistence.

## How to run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

To create a production build:

```bash
npm run build
```

## Project structure

```text
src/
├── components/
│   ├── StudentCard.jsx
│   ├── StudentAvatar.jsx
│   ├── StudentInfo.jsx
│   ├── StudentID.jsx
│   ├── ActionButtons.jsx
│   ├── ThemeToggle.jsx
│   └── EditStudentForm.jsx
├── context/
│   └── AppContext.js
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
```

## Component responsibilities

- `App.jsx`: Main parent component. Holds student data, selected card, search text, edit mode, theme state, localStorage effects, and the Context provider.
- `StudentCard.jsx`: Main card container. Combines the avatar, student information, and student ID/QR section.
- `StudentAvatar.jsx`: Displays the profile image with initials fallback styling and an active badge.
- `StudentInfo.jsx`: Displays name, major, university, year, email, and enrollment details.
- `StudentID.jsx`: Shows the student ID and generates a deterministic QR-style code from that ID.
- `ActionButtons.jsx`: Handles show/hide details, edit mode, and delete actions.
- `ThemeToggle.jsx`: Switches between light and dark burgundy themes using global context.
- `EditStudentForm.jsx`: Controlled form for editing or creating student card data.
- `context/AppContext.js`: Shared context for theme and show/hide state.
- `styles/global.css`: All layout, responsive, glassmorphism, burgundy palette, shadows, transitions, and animation styles.

## Features

- Multiple student cards with list selection
- Search by name, ID, major, or university
- Edit, delete, and create student cards
- Student data saved to localStorage
- Show/hide student details
- Light and dark theme toggle
- QR-style code generated from each student ID
- Responsive glassmorphism UI with soft shadows and hover effects
