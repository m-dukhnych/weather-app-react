import CityCard from '../cityCard/CityCard';

import './citiesList.scss';

const CitiesList = () => {
    return (
        <div className="cities-list">
            <CityCard />
            <CityCard />
            <CityCard />
        </div>
    )
}

export default CitiesList;