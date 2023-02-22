import logo from './logo.svg';
import './App.css';
import CollabList from './components/CollabList';
import NewCollabForm from './components/NewCollabForm';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Influencer Collaborations</h1>
        <nav>

        </nav>
      </header>
      <CollabList />
      <NewCollabForm />
    </div>
  );
}

export default App;
