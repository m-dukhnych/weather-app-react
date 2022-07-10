const API_KEY = '1061c2481bdb6174a0bd57c5669ae76d';

export const getCities = async (cityName) => {
    const res = await getData(`https://nominatim.openstreetmap.org/search?city=${cityName}&format=json`);
    return res.map(_transformCityData);
}

export const getCurrentWeather = async (lat, lon, units) => {
    const res = await getData(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&APPID=${API_KEY}`);
    return res;
}

export const get5D3HForecastData = async (lat, lon, units) => {
    const res = await getData(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&APPID=${API_KEY}`);
    return res;
}

export const getWeatherForecastData = async (lat, lon, units) => {
    const res = await getData(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely&appid=${API_KEY}`);
    return res;
}

const getData = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch, status: ${res.status}`);
    }
    return res.json();
}

export const getCityData = async (coordinates, units) => {
    return await Promise.all([
        getCurrentWeather(coordinates.lat, coordinates.lon, units),
        getWeatherForecastData(coordinates.lat, coordinates.lon, units)
    ])
    .then(response => {
        delete response[1].lat;
        delete response[1].lon;
        return {
            ...coordinates,
            name: response[0].name,
            country: response[0].sys.country,
            weather: response[1]
        }
    })
}

const _transformCityData = city => {
    return {
        boundingbox: city.boundingbox,
        display_name: city.display_name,
        lat: city.lat,
        lon: city.lon
    }
}