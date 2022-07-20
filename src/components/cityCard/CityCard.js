import { useState, useEffect, useRef } from 'react';

import { getWeather } from '../../services/requests';

import Spinner from '../spinner/Spiner';
import reloadBtn from '../../resources/img/reload.svg';
import deleteBtn from '../../resources/img/delete.svg';
import backBtn from '../../resources/img/back.svg';

import './cityCard.scss';

const CityCard = ({id, city, units, setCardId, setCities, updateWeather, setUpdateWeather, display, autoupdate}) => {
    const [cardSize, setCardSize] = useState('small');
    const [weather, setWeather] = useState(false);

    const newCard = useRef(true);

    const onCardSizeChange = e => {
        if (cardSize === 'small' && e.target.tagName !== 'BUTTON' && e.target.parentElement.tagName !== 'BUTTON') {
            setCardSize('big');
            setCardId(+e.target.closest('.city-card').getAttribute('id'));
        }
    }

    const onBackBtnClick = () => {
        setCardSize('small'); 
        setCardId(null);
    }

    const onUpdateWeather = () => {
        setWeather(false);
        getWeather(city.lat, city.lon, units)
            .then(weather => setWeather(weather));
    }

    const onDeleteCard = () => {
        const cities = JSON.parse(localStorage.getItem('cities'));
        cities.splice(id, 1);
        localStorage.setItem('cities', JSON.stringify(cities));
        setCities(cities);
    }

    useEffect(() => {
        if (updateWeather || newCard.current) {
            onUpdateWeather();
            setUpdateWeather(false);
        }        
        newCard.current = false;
        // eslint-disable-next-line
    }, [updateWeather]);    

    useEffect(() => {
        let autoupdateInterval;

        if (autoupdate > 0) {
            autoupdateInterval = setInterval(onUpdateWeather, autoupdate)
        } 
        return () => clearInterval(autoupdateInterval);

        // eslint-disable-next-line
    }, [autoupdate]);

    return (
        <div className="city-card" id={id} onClick={onCardSizeChange} style={cardSize !== 'small' ? {flex: '1 1 auto', height: 'auto'} : {display: display}}>
            <div className="city-card-btns" style={cardSize === 'small' ? {justifyContent: 'flex-end'} : null}>
                <button 
                    className="city-card-back"
                    onClick={onBackBtnClick}
                    style={cardSize === 'small' ? {display: 'none'} : {display: ''}} >
                        <img src={backBtn} alt="" />
                </button>
                <div style={{display: 'flex'}}>
                    <button onClick={onUpdateWeather} className='city-card-btn'>
                        <img src={reloadBtn} alt="" />
                    </button>
                    <button 
                        style={cardSize === 'small' ? {display: ''} : {display: 'none'}}
                        className='city-card-btn'
                        onClick={onDeleteCard} >
                            <img src={deleteBtn} alt="" />
                    </button>
                </div>                
            </div>  
            {
                !weather ? <Spinner style={{maxHeight: '200px', margin: '0 auto', display: 'block'}} /> :
                    cardSize === 'small' ? 
                        <SmallCardView city={city} units={units} weather={weather} /> : 
                        <BigCardView city={city} units={units} weather={weather} /> 
            }
        </div>
    )
}

const SmallCardView = ({city, units, weather}) => {
    const {current} = weather;
    return (
        <>
            <div className="city-card-location">                
                <span className='city-card-name'>
                    {city.name}<span className="city-card-country">{city.country.toLowerCase()}</span>
                </span>
            </div>

            <div className="city-card-temperature">
                <span className='temp'>{Math.round(current.temp)}</span>
                <span className='metric'>{units === 'metric' ? `°C` : `°F`}</span>
            </div>

            <div className="city-card-weather">
                <img src={`http://openweathermap.org/img/wn/${current.weather[0].icon}.png`} alt="" />{current.weather[0].description}
            </div>
        </>
    )
}

const BigCardView = ({city, units, weather}) => {
    const {current, hourly, daily} = weather;



    return (
        <>
            <div className="city-card-location">                
                <span className='city-card-name'>
                    {city.display_name}
                </span>
            </div>

            <div className="city-card-content">

                <div className="current">
                    <div className="current-weather">
                        <h2 className='section-name'>Current Weather</h2>

                        <div className="current-update-time">
                            { Date(current.dt * 1000).slice(0, 24) }
                        </div>

                        <div className="current-temp">
                            <img className='current-weather-icon' src={`http://openweathermap.org/img/wn/${current.weather[0].icon}.png`} alt="" />
                            <span className='temp'>{Math.round(current.temp)}</span>
                            <span className='metric'>{units === 'metric' ? `°C` : `°F`}</span>
                        </div>
                        <div className="current-feelslike">
                            Feels like {Math.round(current.feels_like)}<span className='unit'>°{units === 'metric' ? 'C' : 'F'}</span>, {current.weather[0].description}.
                        </div>

                        <ul className="current-details">
                            <li>Wind: {(current.wind_speed * 3.6).toFixed(2)} {units === 'metric' ? 'km/h' : 'mph'} N/NE</li>
                            <li>Pressure: {current.pressure} hPa</li>
                            <li>Humidity: {current.humidity}%</li>
                            <li>UV: {Math.round(current.uvi)}</li>
                            <li>Dew point: {Math.round(current.dew_point)} °{units === 'metric' ? 'C' : 'F'}</li>
                            <li>Visibility: {(current.visibility / 1000).toFixed(1)} km</li>
                        </ul>

                        <div className="current-footer">
                            Sunrise: 05:33 Sunset: 21:03 
                        </div>
                    </div>
                </div>

                <div className="city-card-forecast">
                    <div className="city-card-forecast-hourly">
                        <h2 className='section-name'>Hourly Forecast</h2>

                        Hourly Forecast
                    </div>
                    <div className="city-card-forecast-daily">
                        <h2 className='section-name'>Daily Forecast</h2>

                        Daily Forecast
                    </div>
                </div>

            </div>

        </>
    )
}

export default CityCard;