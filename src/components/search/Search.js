import Button from '../button/Button';
import Spinner from '../spinner/Spiner';

import './search.scss';

const Search = () => {

    const spinnerStyle = {
        position: "absolute", 
        top: "5px", 
        right: '5px', 
        margin: '0 auto', 
        background: 'none',
        width: '30px', 
        height: '30px'
    }

    return (
        <form className="search">
            <div className="search-field">
                <input className="search-input" 
                    placeholder='Search for a city...' 
                    type="text" />
                <Spinner style={spinnerStyle} />
                <SearchList />
            </div>
            <Button classes='btn-red ml-25'>Submit</Button>
        </form>
    )
}

const SearchList = () => {
    return (
        <ul className="search-list">
            <li >Lviv</li>
            <li >Kherson</li>
            <li >Kyiv</li>
        </ul>
    )
}

export default Search;