import axios from 'axios'
import apikey from './api-key.json'

const currentStart = "http://api.openweathermap.org/data/2.5/group?id="
const foreStart = "http://api.openweathermap.org/data/2.5/forecast?id="

const urlEnd = `&units=metric&appid=${apikey.key}&lang=en`

export const getCurrentWeather = async (cities) => {
    const url = currentStart + cities.map(city => city) + urlEnd
    return await axios.get(url)
}

export const getForecast = async (city) => {
    return await axios.get(foreStart + city + urlEnd)
}