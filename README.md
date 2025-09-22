## Personality Quiz App

A small React app that lets users take a fun personality quiz, then shows their element (🔥 Fire, 💧 Water, 🌱 Earth, 🌬 Air) with artwork and a random mascot fetched from external APIs.
Built as a demo project using **React + React Router + Context + Fetch API**.

---

## Features

* 👤 User enters their name before starting the quiz
* ❓ Multiple-choice quiz with simple flow
* 🧩 Results page showing:

  * Your element (based on answers)
  * Random artwork from [Met Museum API](https://metmuseum.github.io/)
* 🎨 Minimal styling with plain CSS

---

## Tech Stack

* React (Vite)
* React Router
* Context API for global state
* Fetch API for external data

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/EyeSoDev/quiz.git
cd quiz
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the dev server

```bash
npm run dev
```

### 4. Open in browser

Go to [http://localhost:5173](http://localhost:5173)

---

## Project Structure

```
quiz/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Question.jsx
│   │   ├── Results.jsx
│   │   ├── UserContext.jsx
│   │   ├── UserForm.jsx
│   ├── App.css
|   |── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
```

---

## APIs Used

* 🖼 Met Museum Collection API — fetch artwork to display with results

---

## License

MIT

---
