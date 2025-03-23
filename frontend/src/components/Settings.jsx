import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    preferences: {
      darkMode: false,
      language: 'en',
      timezone: 'UTC'
    }
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      navigate('/');
      return;
    }
    setUser(currentUser);
    setFormData(prev => ({
      ...prev,
      firstName: currentUser.firstName || '',
      lastName: currentUser.lastName || '',
      email: currentUser.email || ''
    }));
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords match if changing password
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    // Update user data in localStorage
    const updatedUser = {
      ...user,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email
    };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    setMessage({ type: 'success', text: 'Settings updated successfully' });
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="settings-container">
      <header className="settings-header">
        <h1>Account Settings</h1>
      </header>

      <div className="settings-content">
        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <section className="settings-section">
            <h2>Profile Information</h2>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </section>

          <section className="settings-section">
            <h2>Change Password</h2>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </section>

          <section className="settings-section">
            <h2>Notifications</h2>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="notifications.email"
                  checked={formData.notifications.email}
                  onChange={handleInputChange}
                />
                Email Notifications
              </label>
            </div>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="notifications.push"
                  checked={formData.notifications.push}
                  onChange={handleInputChange}
                />
                Push Notifications
              </label>
            </div>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="notifications.sms"
                  checked={formData.notifications.sms}
                  onChange={handleInputChange}
                />
                SMS Notifications
              </label>
            </div>
          </section>

          <section className="settings-section">
            <h2>Preferences</h2>
            <div className="form-group">
              <label htmlFor="language">Language</label>
              <select
                id="language"
                name="preferences.language"
                value={formData.preferences.language}
                onChange={handleInputChange}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="timezone">Timezone</label>
              <select
                id="timezone"
                name="preferences.timezone"
                value={formData.preferences.timezone}
                onChange={handleInputChange}
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="CST">Central Time</option>
                <option value="PST">Pacific Time</option>
              </select>
            </div>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="preferences.darkMode"
                  checked={formData.preferences.darkMode}
                  onChange={handleInputChange}
                />
                Dark Mode
              </label>
            </div>
          </section>

          <div className="button-group">
            <button type="submit" className="save-button">
              Save Changes
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate('/profile')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings; 