import { useState } from 'react';

import Button from '../button/Button';

import cross from '../../resources/img/cross.svg';
import './settings.scss';

const Settings = ({settings, setSettings, setShowSettings, setUpdateWeather}) => {
    const [units, setUnits] = useState(settings.units);
    const [autoupdate, setAutoupdate] = useState(settings.autoupdate);
    const [language, setLanguage] = useState(settings.language);

    const onSaveSettings = () => {
        localStorage.setItem('settings', JSON.stringify({units, autoupdate,language}));
        setSettings({units, autoupdate,language});
        setUpdateWeather(true);
        setShowSettings(false);
    }

    return (
        <div className="settings">
            <div className="settings-inner">
                <div className="settings-header">
                    <h3 className='settings-title'>Settings:</h3>
                    <button className="settings-close-btn" onClick={() => setShowSettings(false)}>
                        <img src={cross} alt="close-icon" />
                    </button>
                </div>
                <div className="settings-body">
                    <div className="settings-units">
                        <label htmlFor="units">Units:</label>
                        <select 
                            name="units" 
                            id="units"
                            value={units}
                            onChange={e => setUnits(e.target.value)} >
                                <option value="metric">Metric (°C, km/h, mm)</option>
                                <option value="imperial">Imperial (°F, mph, in)</option>
                        </select>
                    </div>
                    <div className="settings-autoupdate">
                        <label htmlFor="autoupdate">Autoupdate:</label>
                        <select 
                            name="autoupdate" 
                            id="autoupdate"
                            value={autoupdate}
                            onChange={e => setAutoupdate(e.target.value)} >
                                <option value={0}>off</option>
                                <option value={1 * 3600000}>1 hour</option>
                                <option value={3 * 3600000}>3 hours</option>
                                <option value={6 * 3600000}>6 hours</option>
                                <option value={12 * 3600000}>12 hours</option>
                                <option value={24 * 3600000}>24 hours</option>
                        </select>
                    </div>
                    <div className="settings-language">
                        <label htmlFor="language">Language:</label>
                        <select 
                            name="language" 
                            id="language"
                            value={language}
                            onChange={e => setLanguage(e.target.value)} >
                                <option value={'english'}>English</option>
                                <option value={'ukrainian'}>Ukrainian</option>
                        </select>
                    </div>
                </div>
                <div className="settings-footer">
                    <Button action={onSaveSettings} classes='btn-green'>Save</Button>
                    <Button action={() => setShowSettings(false)} classes='btn-red'>Cancel</Button>
                </div>
            </div>
        </div>
    )
}

export default Settings;