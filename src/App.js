//Juho Ahonen
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const URL = "http://numbersapi.com/random/trivia?json";

function App() {
  const [type, setType] = useState("trivia")
  const [fact, setFact] = useState("")
  const [number, setNumber] = useState(0)

  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setNumber(response.data.number)
        setFact(response.data.text)
      }).catch (error => {
        alert(error);
      })
  }, [])

  function newFact(e){
    e.preventDefault();
      const chosenNumberURL = "http://numbersapi.com/" + number + "/" + type + "?json"
      axios.get(chosenNumberURL)
        .then((response) => {
          setNumber(response.data.number)
          setFact(response.data.text)
        }).catch (error => {
          alert(error);
    }, [])
  }

  return (
    <form onSubmit={newFact}>
        <h1>Random number fact</h1>
        <p>Given number <span id="givenNumber">{number}</span></p>
        <p id='fact'>{fact}</p>
        <h2>Choose a new number</h2>
        <input type="number" onChange={(e) => setNumber(e.target.value)} />
        <h2>Fact category</h2>
        <ul>
          <li>
            <label for="trivia">Trivia</label>
            <input type="radio" id="trivia" defaultChecked name="category" value="trivia" onChange={(e) => setType(e.target.value)} />
            </li>
          <li>
            <label for="math">Math</label>
            <input type="radio" id="math" name="category" value="math" onChange={(e) => setType(e.target.value)} />
            </li>
          <li>
            <label for="year">Year</label>
            <input type="radio" id="year" name="category" value="year" onChange={(e) => setType(e.target.value)} />
            </li>
        </ul>
        <button>New fact</button>
    </form>
  );
}


export default App;
