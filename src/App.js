
import React, {useState} from 'react';
import './App.css';
import styles from "./App.css";


function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse]=useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001',{
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
      },
      body:JSON.stringify({message}),
    })
    .then((res) => res.json())
    .then((data) => setResponse(data.message));
  };



  // Function to split response before the number and add <br /> elements
  const formatResponse = (text) => {
    // const sentences = text.split(/(?=\d+\.)/) || text.split(/Part/) || text.split('\n') ; // Split based on a number followed by a period
    const sentences =  text.split('\n') ; 

    // Map the sentences and add <br /> elements between them
    const formattedResponse = sentences.map((sentence, index) => (
      <span key={index}>
        {sentence.trim()}<br />
      </span>
    ));

    return formattedResponse;
  };

return (
  <div>
    <div>
      <title>ML Strategies</title>
      <link rel="icon" href="/chatbot.png" />
    </div>

    <main className={styles.main}>
      <img src="/chatbot.png" className={styles.icon} />
      <h3>What ways can ML help your business?</h3>
                          <form onSubmit={handleSubmit}>
                            <textarea
                              rows="4"
                              cols="50"
                              type="text"
                              name="user"
                              placeholder="Describe your challenges"
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                            />
                            <br></br>
                            <input type="submit" value="Submit" />
                          </form>
                          </main>
      <div>
        <br></br>
      {response && <div className="display-linebreak"> 
      <b> Action Plan: </b> {formatResponse(response)}</div>}
      </div>
    
  
  </div>
);
}








export default App;
