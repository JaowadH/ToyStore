import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState('');

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.name.trim()) formErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      formErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid.';
    }
    if (!formData.message.trim()) formErrors.message = 'Message is required.';
    return formErrors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

  const handleSubscriptionSubmit = (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(subscriberEmail)) {
      setSubscribed(false);
      alert('Please enter a valid email.');
    } else {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setSubscriberEmail('');
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p className="contact-description">
        Have any questions or feedback? Fill out the form below, and we'll get back to you as soon as possible!
      </p>

      <form className="contact-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleFormChange}
            className={errors.message ? 'input-error' : ''}
          ></textarea>
          {errors.message && <p className="error-message">{errors.message}</p>}
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>

      {submitted && (
        <div className="confirmation-message">
          <p>Thank you for contacting us! We'll respond shortly.</p>
        </div>
      )}

      <section className="google-map">
        <h2>Our Location</h2>
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d179061.33558010307!2d-52.82866125314295!3d47.56054106690379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b0ca2f248bfae9d%3A0x7c6dd0b71cf23e44!2sSt.%20John&#39;s%2C%20NL%2C%20Canada!5e0!3m2!1sen!2s!4v1701938418397!5m2!1sen!2s"
          width="100%"
          height="400"
          style={{ border: '0' }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>

      <section className="subscribe-section">
        <h2>Subscribe to Our Newsletter</h2>
        <form className="subscribe-form" onSubmit={handleSubscriptionSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={subscriberEmail}
            onChange={(e) => setSubscriberEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
        {subscribed && (
          <div className="subscription-confirmation">
            <p>Thank you for subscribing!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Contact;
