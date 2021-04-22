import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class CurrentWeather extends React.Component {

    render() {
        const { weather, errorMsg } = this.props

        function getEndingForDate(day) {
            let endings = ["th", "st", "nd", "rd"]
            let x = day % 100
            return day + (endings[(x - 20) % 10] || endings[x] || endings[0])
        }

        const theDay = getEndingForDate(new Date().toLocaleDateString('en-US', { day: 'numeric' }))

        if (weather) {
            let rain = "0"
            if (weather.rain) {
                rain = weather.rain["3h"]
            } else if (weather.snow) {
                rain = weather.snow["3h"]
            }
            return (
                <div>
                    <Row className="paddingBottom">
                        <Col>
                            <Row>
                                <Col className="col-4">
                                    <span className="currentLocation">{weather.name}</span><br />
                                    <span className="currentWeather">{weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}</span>
                                </Col>
                                <Col className="col-8 currentTemp">
                                    <img src={"http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"} alt={weather.weather[0].icon} />
                                    {Math.round(weather.main.temp)}°C
                                 </Col>
                            </Row> <br />
                            <Row>
                                <Col className="col-3 currentDatetime">
                                    <span className="currentDay">{new Date().toLocaleDateString('en-US', { month: 'short' })} {theDay}</span><br />
                                    <span className="currentTime">{new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric" })}</span>
                                </Col>
                                <Col className="col-9 currentInfo">
                                    Wind: {Math.round(weather.wind.speed * 10) / 10} m/s<br />
                                    Humidity: {weather.main.humidity} %<br />
                                    Precipitation (3 h): {rain} mm
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            )
        } else if (errorMsg) {
            return (
                <div className="currentContent">
                    <Row>
                        <Col>{errorMsg}</Col>
                    </Row>
                </div>
            )
        } else {
            return (
                <div className="currentContent">
                    <Row>
                        <Col>Loading...</Col>
                    </Row>
                </div>
            )
        }
    }
}

export default CurrentWeather