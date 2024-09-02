import logo from './logo.svg';
import './App.css';
import CounterApp from './pages/CounterApp';

//This app is a counter application
// in HTML, we use "class", but in JSX, we use "className"

function App() { // App component - This is ultimate parent component of my website! App component has no parent component, it only has children
  return (
    <div className="App">
      <CounterApp />


       {/* This is a single-line comment in JSX <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Celzene Tutorials for React JS!</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>*/}
    </div>
  );
}

export default App;
