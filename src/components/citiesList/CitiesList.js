import { useState } from 'react';

import CityCard from '../cityCard/CityCard';

import './citiesList.scss';

const CitiesList = ({cities, setCities, settings, updateWeather, setUpdateWeather}) => {
    const [cardId, setCardId] = useState(null);

    const cards = cities.map((item, i) => {
        return <CityCard 
                    id={i} 
                    city={item} 
                    units={settings.units}
                    autoupdate={settings.autoupdate}
                    setCardId={setCardId}
                    setCities={setCities}
                    key={i} 
                    display={cardId === null ? null : 'none'}
                    updateWeather={updateWeather}
                    setUpdateWeather={setUpdateWeather} />
    });    

    return (
        <div className="cities-list" style={cities.length === 0 ? {justifyContent: 'center', alignItems: 'center'} : null}>
            {
                cities.length > 0 ? cards : <h2 style={{fontSize: '70px', opacity: '.3'}}>Please add a city...</h2>
            }
        </div>
    )
}

export default CitiesList;