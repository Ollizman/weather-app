import axios from 'axios'
import apikey from './api-key.json'

const urlCurrent = "http://api.openweathermap.org/data/2.5/group?id="
const urlForecast = "http://api.openweathermap.org/data/2.5/forecast?id="

const urlEnd = `&units=metric&appid=${apikey.key}&lang=en`

export const getCurrentWeather = async (cityIds) => {
    const url = urlCurrent + cityIds.map(id => id) + urlEnd
    return await axios.get(url)
}

export const getForecast = async (city) => {
    return await axios.get(urlForecast + city + urlEnd)
}