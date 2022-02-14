import './App.css';
import PlayBoard from './pages/play_board';

function App() {
  return (
    <div className="App">
      <div className="App-Background">
        <div className="App-Background-Overlay">
          <PlayBoard />
        </div>
      </div>
    </div >
  );
}

export default App;
