import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { getForecast } from '../weather-service'
import Forecast from './forecast'

class Forecasts extends React.Component {
    state = {
        forecasts: []
    }

    componentDidMount() {
        const { id } = this.props
        getForecast(id).then(
            res => this.setState({ forecasts: res.data.list })
        )
    }

    render() {
        const fore = this.state.forecasts.slice(1, 6).map(i => {
            return <Col key={i.dt} className="fiveMarginLR"><Forecast key={i.dt} forecast={i} /></Col>
        })

        return (
            <Row className="noOverflow bottom-margin-fifty">
                {fore}
            </Row>
        )
    }
}

export default Forecasts