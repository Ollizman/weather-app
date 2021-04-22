import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'

class Forecast extends React.Component {

    render() {
        const { forecast } = this.props
        if (forecast) {
            let rain = "0"
            if (forecast.rain) {
                rain = forecast.rain["3h"]
            } else if (forecast.snow) {
                rain = forecast.snow["3h"]
            }
            return (
                <div>
                    <Jumbotron className="singleForecast forecastHeader">
                        {(forecast.dt_txt.split(' '))[1].split(':').splice(0, 1)}:00<br />
                        <img src={"http://openweathermap.org/img/wn/" + forecast.weather[0].icon + ".png"} alt={forecast.weather[0].icon} /><br />
                        <span className="forecastTemp">{Math.round(forecast.main.temp)}°C<br /></span>
                    </Jumbotron>
                    <Jumbotron className="singleForecast forecastFooter">
                        {forecast.wind.speed} m/s<br />
                        {Math.ceil(forecast.main.humidity / 5) * 5} %<br />
                        {Math.round(rain)} mm
                    </Jumbotron>
                </div>
            )
        }
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
}

export default Forecast