import './App.css';
import Form from "./Components/Form/Form";
import logo from './foodstuffs.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Form />
      </header>
    </div>
  );
}

export default App;
