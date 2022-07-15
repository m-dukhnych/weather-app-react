import { useState, memo, useEffect } from 'react';

import { getWeather } from '../../services/requests';

import Spinner from '../spinner/Spiner';
import reloadBtn from '../../resources/img/reload.svg';
import deleteBtn from '../../resources/img/delete.svg';
import celcius from '../../resources/img/celcius.svg';
import fahrenheit from '../../resources/img/fahrenheit.svg';
import backBtn from '../../resources/img/back.svg';

import './cityCard.scss';


const CityCard = memo(({id, city, units, setCardId, setCities, display}) => {
    const [cardSize, setCardSize] = useState('small');
    const [weather, setWeather] = useState(false);

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

    useEffect(() => {
        onUpdateWeather();
        // eslint-disable-next-line
    }, []);

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
})

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
                <span>{Math.round(current.temp)}</span><img src={units === 'metric' ? celcius : fahrenheit} alt="" />
            </div>

            <div className="city-card-weather">
                <img src={`http://openweathermap.org/img/wn/${current.weather[0].icon}.png`} alt="" />{current.weather[0].description}
            </div>
        </>
    )
}

const BigCardView = ({city, units, weather}) => {
    return (
        <>
            <div className="city-card-location">                
                <span className='city-card-name'>
                    {city.display_name}
                </span>
            </div>

        </>
    )
}

export default CityCard;