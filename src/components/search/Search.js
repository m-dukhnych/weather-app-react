import { useState, useEffect, useRef } from 'react';

import { API_KEY } from '../../services/requests';
import { getCities } from '../../services/requests';

import Button from '../button/Button';
import Spinner from '../spinner/Spiner';
import './search.scss';

const Search = ({cities, setCities}) => {
    const [cityName, setCityName] = useState('');
    const [citiesList, setCitiesList] = useState([]);
    const [showSpinner, setShowSpinner] = useState(false);
    const [showSearchList, setShowSearchList] = useState(false);

    const selected = useRef(false);

    const spinnerStyle = {
        position: "absolute", 
        top: "5px", 
        right: '5px', 
        margin: '0 auto', 
        background: 'none',
        width: '30px', 
        height: '30px'
    }

    useEffect(() => {
        let timeout;
        if (cityName.length === 0) {
            setCitiesList([]);
            setShowSpinner(false)
            return;
        }

        if (!selected.current) {
            setShowSpinner(true);
            timeout = setTimeout(() => {
                getCities(cityName)
                    .then(response => {
                        setCitiesList(response);
                        setShowSpinner(false);
                        setShowSearchList(true);
                    });
            }, 2000);
        } else {
            selected.current = false;
        }

        return () => clearTimeout(timeout);
    }, [cityName]);

    const onCityNameChange = e => {
        setShowSearchList(false);
        setCityName(e.target.value);      
    }

    const onCitySelected = (city) => {
        selected.current = true;
        setShowSearchList(false);
        setCitiesList([city]);
        setCityName(city.display_name);
    }

    const onAddCity = async e => {
        e.preventDefault();

        await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${citiesList[0].lat}&lon=${citiesList[0].lon}&APPID=${API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const newCity = {
                    ...citiesList[0],
                    name: data.name,
                    country: data.sys.country
                }
                localStorage.setItem('cities', JSON.stringify([...cities, newCity]));
                setCities(items => [...items, newCity]);
            })
            .catch(err => {
                console.error(err);
                localStorage.setItem('cities', JSON.stringify([...cities, citiesList[0]]));
                setCities(items => [...items, citiesList[0]]);
            })
            .finally(() => {
                setCityName('');
            });
    }

    return (
        <form onSubmit={onAddCity} className="search">
            <div className="search-field">
                <input className="search-input" 
                    placeholder='Search for a city...' 
                    type="text"
                    value={cityName}
                    onChange={onCityNameChange} />
                { showSpinner ? <Spinner style={spinnerStyle} /> : null }
                { showSearchList ? <SearchList cities={citiesList} action={onCitySelected} /> : null }
            </div>
            <Button classes='btn-red ml-25' >Submit</Button>
        </form>
    )
}

const SearchList = ({cities, action}) => {
    return (
        <ul className="search-list">
            {
                cities.map((item, i) => {
                    return <li onClick={() => action(item)} key={i}>{item.display_name}</li>
                })
            }
        </ul>
    )
}

export default Search;