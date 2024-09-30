import './App.css';
import WeatherComponent from './components/WeatherComponent';
import StocksComponent from './components/StocksComponent';
import NewsComponent from './components/NewsComponent';

function App() {
  return (
    <div className="App">
      <WeatherComponent />
      <StocksComponent />
      <NewsComponent />
    </div>
  );
}

export default App;

