// eslint-disable-next-line
export const API_KEY = '1061c2481bdb6174a0bd57c5669ae76d';

export const getCities = async (cityName) => {
    const res = await getData(`https://nominatim.openstreetmap.org/search?city=${cityName}&format=json`);
    return res.map(_transformCityData);
}

const getData = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch, status: ${res.status}`);
    }
    return res.json();
}

const _transformCityData = city => {
    return {
        boundingbox: city.boundingbox,
        display_name: city.display_name,
        lat: city.lat,
        lon: city.lon
    }
}