import React, {useEffect, useState} from 'react';
import './App.css';
import CollabList from './components/CollabList';
import NewCollabForm from './components/NewCollabForm';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  let [collabs, setCollabs] = useState([]);

  useEffect(() => {
    getCollabs();
  }, []);


  async function getCollabs() {
    try {
        let response = await fetch('/collabs');
        if (response.ok) {
          let data = await response.json();
          const updatedData = data.map(item => {
            const { date, ...rest } = item;
            const newDate = new Date(date).toISOString().substring(0, 10);
            return { ...rest, date: newDate};
          });
        setCollabs(updatedData);

        } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
        }

    } catch (err) {
        console.log(`Server error: ${err.message}`);
    }
  }


    async function addCollab(collab) {

      if (collab.collab_id) {

          let options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(collab)
        };
    
        try {
            let response = await fetch(`/collabs/${collab.collab_id}`, options);
            if (response.ok) {
                let data = await response.json();
                const updatedData = data.map(item => {
                  const { date, ...rest } = item;
                  const newDate = new Date(date).toISOString().substring(0, 10);
                  return { ...rest, date: newDate};
                });
                setCollabs(updatedData);
            } else {
                console.log(`Server error: ${response.status} ${response.statusText}`);
            }
        } catch (err) {
            console.log(`Server error: ${err.message}`);
        }

      } else {

        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(collab)
        };

        try {
            let response = await fetch('/collabs', options);
            if (response.ok) {
                let data = await response.json();
                const updatedData = data.map(item => {
                  const { date, ...rest } = item;
                  const newDate = new Date(date).toISOString().substring(0, 10);
                  return { ...rest, date: newDate};
                });
                setCollabs(updatedData);
            } else {
                console.log(`Server error: ${response.status} ${response.statusText}`);
            }
        } catch (err) {
            console.log(`Server error: ${err.message}`);
        }
      }
    }

    async function editCollab(id, collab) {
      let options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(collab)
    };

    try {
        let response = await fetch(`/collabs/${id}`, options);
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

    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossorigin="anonymous"
    />
      <header className="App-header">
        <h1>Influencer Collaborations</h1>
        <nav>

        </nav>
      </header>
      <CollabList 
        editCb = {editCollab}
        collabs = {collabs}
        addCollabCb={addCollab}
      />
      <NewCollabForm 
        addCollabCb={addCollab}/>
    </div>
  );
}

