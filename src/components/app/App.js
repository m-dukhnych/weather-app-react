import { useState } from 'react';

import Search from '../search/Search';
import CitiesList from '../citiesList/CitiesList';
import Settings from '../settings/Settings';

import settingsIcon from '../../resources/img/settings.svg';
import updateIcon from '../../resources/img/reload.svg';
import './app.scss';

const App = () => {
    if (!localStorage.getItem('cities')) {
        localStorage.setItem('cities', JSON.stringify([]));
    }
    if (!localStorage.getItem('settings')) {
        localStorage.setItem('settings', JSON.stringify({units: 'metric', autoupdate: 0, language: 'english'}));
    }   

    // eslint-disable-next-line
    const [cities, setCities] = useState(JSON.parse(localStorage.getItem('cities')));
    const [settings, setSettings] = useState(JSON.parse(localStorage.getItem('settings')));
    const [showSettings, setShowSettings] = useState(false);

    return (
        <div className="app">
            <h1 className='main-title'>Weather App</h1>
            <div className="app-header">
                <Search />
                <div className='app-header-btns'>
                    <button className='updateall-btn'>
                        <img src={updateIcon} alt="updateAll" />
                    </button>
                    <button className='settings-btn' onClick={() => setShowSettings(true)}>
                        <img src={settingsIcon} alt="settings" />
                    </button>
                </div>                
            </div>            
            <CitiesList />
            { showSettings ? <Settings 
                                settings={settings}
                                setSettings={setSettings}
                                setShowSettings={setShowSettings} /> : null }
        </div>
    )
}

export default App;