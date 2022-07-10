import Search from '../search/Search';
import CitiesList from '../citiesList/CitiesList';

import settingsIcon from '../../resources/img/settings.svg';
import updateIcon from '../../resources/img/reload.svg';
import './app.scss';

const App = () => {
    return (
        <div className="app">
            <h1 className='main-title'>Weather App</h1>
            <div className="app-header">
                <Search />
                <div className='app-header-btns'>
                    <button className='updateall-btn'>
                        <img src={updateIcon} alt="updateAll" />
                    </button>
                    <button className='settings-btn'>
                        <img src={settingsIcon} alt="settings" />
                    </button>
                </div>                
            </div>            
            <CitiesList />
        </div>
    )
}

export default App;