import React, { useState } from 'react';

function SettingsModal({ isOpen, onClose, settings, setSettings }) {
  const [localSettings, setLocalSettings] = useState(settings);
  const [apiKeyType, setApiKeyType] = useState('password');

  const handleSave = () => {
    setSettings(localSettings);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalSettings(prev => ({ ...prev, [name]: value }));
  };
  
  const toggleApiKeyVisibility = () => {
    setApiKeyType(prev => prev === 'password' ? 'text' : 'password');
  };

  if (!isOpen) return null;

  return (
    <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Settings</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="settings-container">
              <div className="settings-title">
                <i className="bi bi-key"></i> API Configuration
              </div>
              
              <div className="mb-3">
                <label htmlFor="apiKey" className="form-label">OpenAI API Key</label>
                <div className="api-key-container">
                  <input
                    type={apiKeyType}
                    className="form-control"
                    id="apiKey"
                    name="apiKey"
                    value={localSettings.apiKey}
                    onChange={handleChange}
                    placeholder="sk-..."
                  />
                  <button className="toggle-visibility" onClick={toggleApiKeyVisibility}>
                    <i className={`bi bi-eye${apiKeyType === 'password' ? '' : '-slash'}`}></i>
                  </button>
                </div>
                <div className="form-text">Your API key is stored locally and never sent to our servers.</div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="model" className="form-label">Model</label>
                <select className="form-select" id="model" name="model" value={localSettings.model} onChange={handleChange}>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                  <option value="gpt-4">GPT-4</option>
                  <option value="gpt-4-turbo">GPT-4 Turbo</option>
                </select>
              </div>
              
              <div className="mb-3">
                <label htmlFor="temperature" className="form-label">Temperature: {localSettings.temperature}</label>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="1"
                  step="0.1"
                  id="temperature"
                  name="temperature"
                  value={localSettings.temperature}
                  onChange={handleChange}
                />
                <div className="form-text">Controls randomness: Lower values are more focused, higher values more creative.</div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="maxTokens" className="form-label">Max Tokens</label>
                <input
                  type="number"
                  className="form-control"
                  id="maxTokens"
                  name="maxTokens"
                  value={localSettings.maxTokens}
                  onChange={handleChange}
                  min="100"
                  max="4000"
                />
                <div className="form-text">Maximum length of the response.</div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;