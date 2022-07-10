import Spinner from '../spinner/Spiner';
import reloadBtn from '../../resources/img/reload.svg';
import deleteBtn from '../../resources/img/delete.svg';
import celcius from '../../resources/img/celcius.svg';
import fahrenheit from '../../resources/img/fahrenheit.svg';
import backBtn from '../../resources/img/back.svg';

import './cityCard.scss';


const CityCard = () => {
    return (
        <div className="city-card">
            <div className="city-card-btns">
                <button 
                    className="city-card-back" >
                        <img src={backBtn} alt="" />
                </button>
                <div style={{display: 'flex'}}>
                    <button className='city-card-btn'>
                        <img src={reloadBtn} alt="" />
                    </button>
                    <button 
                        className='city-card-btn' >
                            <img src={deleteBtn} alt="" />
                    </button>
                </div>                
            </div>  
            <SmallCardView />
        </div>
    )
}

const SmallCardView = () => {
    return (
        <>
            <div className="city-card-location">                
                <span className='city-card-name'>
                    Lviv<span className="city-card-country">ua</span>
                </span>
            </div>

            <div className="city-card-temperature">
                <span>25</span><img src={celcius} alt="" />
            </div>

            <div className="city-card-weather">
                <img src={`http://openweathermap.org/img/wn/02d.png`} alt="" />few clouds   
            </div>
        </>
    )
}

const BigCardView = () => {
    return (
        <>
            <div className="city-card-location">                
                <span className='city-card-name'>
                    LVIV
                </span>
            </div>

        </>
    )
}

export default CityCard;