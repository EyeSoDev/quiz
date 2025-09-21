import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header';
import { UserProvider } from './components/UserContext';
import UserForm from './components/UserForm';
import Question from './components/Question';
import Results from './components/Results';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState('');
  const [element, setElement] = useState('');
  const [artwork, setArtwork] = useState(null);
  const [loadingArtwork, setLoadingArtwork] = useState(false);
  const [error, setError] = useState(null);

  const questions = [
    {
      question: "What's your favorite color?",
      options: ['Red 🔴', 'Blue 🔵', 'Green 🟢', 'Yellow 🟡'],
    },
    {
      question: "Pick a hobby:",
      options: ["Sparking debates 🗣️", "Swimming/relaxing 🏊", "Gardening/DIY 🧑‍🌾", "Flying kites 🪁"],
    },
    {
      question: "Which vacation sounds best?",
      options: ["Volcano hike 🌋", "Beach resort 🏖️", "Cabin in the woods 🪵", "Hot air balloon 🎈"],
    },
  ];

  const keywords = {
    Fire: 'fire',
    Water: 'water',
    Earth: 'earth',
    Air: 'air',
  };

  const elements = {
    'Red 🔴': 'Fire',
    'Blue 🔵': 'Water',
    'Green 🟢': 'Earth',
    'Yellow 🟡': 'Air',
    "Sparking debates 🗣️": "Fire",
    "Swimming/relaxing 🏊": "Water",
    "Gardening/DIY 🧑‍🌾": "Earth",
    "Flying kites 🪁": "Air",
    "Volcano hike 🌋": "Fire",
    "Beach resort 🏖️": "Water",
    "Cabin in the woods 🪵": "Earth",
    "Hot air balloon 🎈": "Air",
  };

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  function handleUserFormSubmit(name) {
    setUserName(name);
  };

  function determineElement(answers) {
    const counts = {};
    answers.forEach(function (answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function (a, b) {
      return counts[a] > counts[b] ? a : b
    });
  };

  // Fetch artwork from the Met Museum API based on keyword
  async function fetchArtwork(keyword) {
    if (!keyword) return;
    setLoadingArtwork(true);
    setError(null);

    try {
      const searchRes = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&isHighlight=true&q=${encodeURIComponent(keyword)}`
      );
      const searchData = await searchRes.json();

      if (searchData.total > 0) {
        const ids = searchData.objectIDs.slice(0, 10);
        for (const id of ids) {
          const objRes = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
          );
          const obj = await objRes.json();
          if (obj && (obj.primaryImageSmall || obj.primaryImage)) {
            setArtwork(obj);
            setLoadingArtwork(false);
            return;
          }
        }
      }

      // fallback: no artwork found
      setArtwork(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch artwork.");
    } finally {
      setLoadingArtwork(false);
    }
  }

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchArtwork(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex]
  );

  return (
    <UserProvider value={{ name: userName, setName: setUserName }} >
      <Header />
      <Routes>
        <Route path='/' element={<UserForm onSubmit={handleUserFormSubmit} />} />
        <Route
          path='/quiz'
          element={
            currentQuestionIndex < questions.length ? (
              <Question question={questions[currentQuestionIndex].question} options={questions[currentQuestionIndex].options} onAnswer={handleAnswer} />
            ) : (
              loadingArtwork ? (
                <p>Loading artwork...</p>
              ) : error ? (
                <p>{error}</p>
              ) : (
                <Results element={element} artwork={artwork} />
              )
            )
          }
        />
      </Routes>
    </UserProvider>
  )
}

export default App
