import Button from '../button/button';

import cross from '../../resources/img/cross.svg';
import './settings.scss';

const Settings = () => {
    return (
        <div className="settings">
            <div className="settings-inner">
                <div className="settings-header">
                    <h3 className='settings-title'>Settings:</h3>
                    <button className="settings-close-btn">
                        <img src={cross} alt="close-icon" />
                    </button>
                </div>
                <div className="settings-body">
                    <div className="settings-units">
                        <label htmlFor="units">Units:</label>
                        <select name="units" id="units">
                            <option value="metric">Metric (°C, km/h, mm)</option>
                            <option value="imperial">Imperial (°F, mph, in)</option>
                        </select>
                    </div>
                    <div className="settings-autoupdate">
                        <label htmlFor="autoupdate">Autoupdate:</label>
                        <select name="autoupdate" id="autoupdate">
                            <option value={0}>off</option>
                            <option value={1}>1 hour</option>
                            <option value={3}>3 hours</option>
                            <option value={6}>6 hours</option>
                            <option value={12}>12 hours</option>
                            <option value={24}>24 hours</option>
                        </select>
                    </div>
                    <div className="settings-language">
                        <label htmlFor="language">Language:</label>
                        <select name="language" id="language">
                            <option value={'english'}>English</option>
                            <option value={'ukrainian'}>Ukrainian</option>
                        </select>
                    </div>
                </div>
                <div className="settings-footer">
                    <Button action={() => console.log('save')} classes='btn-green'>Save</Button>
                    <Button action={() => console.log('cancel')} classes='btn-red'>Cancel</Button>
                </div>
            </div>
        </div>
    )
}

export default Settings;