import React, {useEffect, useState} from 'react';
import './App.css';
import CollabList from './components/CollabList';
import NewCollabForm from './components/NewCollabForm';


export default function App() {
  let [collabs, setCollabs] = useState([]);

  useEffect(() => {
    getCollabs();
  }, []);


  async function getCollabs() {
    try {
        let response = await fetch('/collabs');
        if (response.ok) {
            let collabs = await response.json();
            setCollabs(collabs);
        } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
        }
    } catch (err) {
        console.log(`Server error: ${err.message}`);
    }
}


    async function addCollab(collab) {

        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(collab)
        };

        try {
            let response = await fetch('/collabs', options);
            if (response.ok) {
                let collabs = await response.json();
                setCollabs(collabs);
            } else {
                console.log(`Server error: ${response.status} ${response.statusText}`);
            }
        } catch (err) {
            console.log(`Server error: ${err.message}`);
        }
    }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Influencer Collaborations</h1>
        <nav>

        </nav>
      </header>
      <CollabList 
        collabs = {collabs}
      />
      <NewCollabForm 
        addCollabCb={addCollab}/>
    </div>
  );
}

