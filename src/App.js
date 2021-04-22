import React from 'react'
import './App.css'

import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'

import { getCurrentWeather } from './weather-service'
import Forecasts from './components/forecasts'
import CurrentWeather from './components/current-weather'

const CITIES = {
  "658225": "Helsinki",
  "655195": "Jyväskylä",
  "650225": "Kuopio",
  "634964": "Tampere"
}

class App extends React.Component {

  state = {
    current: [],
    errorMsg: null
  }

  componentDidMount() {
    getCurrentWeather(Object.keys(CITIES)).then(
      res => this.setState({ current: res.data.list }),
      err => this.setState({ errorMsg: 'Could not load current weather' })
    );
  }

  render() {
    function changeCity(id) {
      const cityElements = document.getElementsByClassName("cities")
      const cityArray = Array.from(cityElements)
      if (id === "0") {
        cityArray.map(ce => ce.style.display = "inline")
      } else {
        const hideElements = cityArray.filter(ce => ce.id !== id)
        const showElements = cityArray.filter(ce => ce.id === id)
        hideElements.map(ce => ce.style.display = "none")
        showElements.map(ce => ce.style.display = "inline")
      }
    }

    return (
      <div className="App">
        <div className="header">Weather app</div>
        <Container>
          <div className="dropDown">
            <select className="custom-select" value={this.state.cityFilter} onChange={(e) => changeCity(e.target.value)}>
              <option value="0">All cities</option>
              {Object.entries(CITIES).map((city) => <option key={city[0]} value={city[0]}>{city[1]}</option>)}
            </select>
          </div>
          {Object.entries(CITIES).map((city, i) =>
            <div key={city[0]} id={city[0]} className="cities">
              <Jumbotron className="content">
                <CurrentWeather weather={this.state.current[i]} errorMsg={this.state.errorMsg} />
              </Jumbotron>
              <Forecasts id={city[0]} />
            </div>)}
        </Container>
      </div>
    );
  }
}

export default App
