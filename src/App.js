import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = [
          'http://20.244.56.144/numbers/primes',
          'http://20.244.56.144/numbers/fibo',
          'http://20.244.56.144/numbers/odd',
        ];

        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));
        const numbersData = data.map(item => item.number).flat();

        setNumbers(numbersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Fetched numbers:', numbers);
  }, [numbers]);

  return (
    <div className="App">
      <h1>Numbers:</h1>
      {numbers.length > 0 ? (
        <ul>
          {numbers.map((number, index) => (
            <li key={index}>{number}</li>
          ))}
        </ul>
      ) : (
        <p>No numbers found.</p>
      )}
    </div>
  );
};

export default App;
