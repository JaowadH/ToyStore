import React, { useState, useEffect } from 'react';
import './About.css';

const About = () => {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const features = [
    {
      title: 'Exclusive Collections',
      detail: 'Beautifully designed toys from various series spark joy and creativity.',
    },
    {
      title: 'The Thrill of Surprise',
      detail: 'Each blind box is a delightful mystery, adding a fun twist to collecting.',
    },
    {
      title: 'Beloved Characters',
      detail: 'Fans of Skullpanda, Hirono, Kubo, Dimoo, and Pucky will feel right at home.',
    },
    {
      title: 'Exceptional Quality',
      detail: 'Premium toys crafted with attention to detail and vibrant artistry.',
    },
  ];

  const testimonials = [
    { quote: 'JCCK made our family game nights extra special!', author: 'Emily R.' },
    { quote: 'High-quality toys with so much fun packed in every box!', author: 'Michael B.' },
    { quote: 'The surprise in every box never disappoints!', author: 'Sarah T.' },
    { quote: 'Beautifully crafted toys that my kids adore!', author: 'Chris P.' },
    { quote: 'An amazing experience for collectors of all ages!', author: 'Jamie L.' },
  ];

  const faqItems = [
    {
      question: 'What types of toys do you sell?',
      answer: 'We specialize in blind box collectible toys from beloved series.',
    },
    {
      question: 'Do you offer gift wrapping?',
      answer: 'Yes, we provide gift wrapping for special occasions!',
    },
    {
      question: 'Can I return or exchange a blind box?',
      answer:
        'Due to the nature of blind boxes, returns or exchanges are only available for damaged items.',
    },
    {
      question: 'Are your toys suitable for all ages?',
      answer: 'Most of our toys are suitable for ages 3 and up. Check individual listings for details.',
    },
  ];

  const teamMembers = [
    {
      name: 'Alice Johnson',
      role: 'Creative Director',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Bob Smith',
      role: 'Marketing Lead',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Charlie Brown',
      role: 'Product Designer',
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Dana White',
      role: 'Customer Relations',
      image: 'https://via.placeholder.com/150',
    },
  ];

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setCurrentFeatureIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 5000);

    const storyInterval = setInterval(() => {
      setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearInterval(featureInterval);
      clearInterval(storyInterval);
    };
  }, [features.length, testimonials.length]);

  const goToNextFeature = () => {
    setCurrentFeatureIndex((prevIndex) => (prevIndex + 1) % features.length);
  };

  const goToPrevFeature = () => {
    setCurrentFeatureIndex((prevIndex) => (prevIndex - 1 + features.length) % features.length);
  };

  const goToNextStory = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrevStory = () => {
    setCurrentStoryIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About Us</h1>
        <p className="about-intro">
          Welcome to <span className="highlight">JCCK</span> - Your Blind Box Toy Wonderland! Step into the enchanting world of JCCK, where surprise and excitement await in every blind box. Specializing in collectible toys, each box reveals a unique character from beloved series featuring Skullpanda, Hirono, Kubo, Dimoo, Pucky, and more.
        </p>
      </header>

      <section className="special-features">
        <h2>What Makes JCCK Special?</h2>
        <div className="feature-container">
          <button className="prev-arrow" onClick={goToPrevFeature}>&#8592;</button>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${index === currentFeatureIndex ? 'visible' : 'hidden'}`}
            >
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.detail}</p>
              </div>
            </div>
          ))}
          <button className="next-arrow" onClick={goToNextFeature}>&#8594;</button>
        </div>
      </section>

      <section className="testimonials">
        <h2>Customer Stories</h2>
        <div className="testimonial-container">
          <button className="prev-arrow" onClick={goToPrevStory}>&#8592;</button>
          <div className="testimonial-row">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-card ${index === currentStoryIndex ? 'visible' : 'hidden'}`}
              >
                <p className="quote">{testimonial.quote}</p>
                <span className="author">- {testimonial.author}</span>
              </div>
            ))}
          </div>
          <button className="next-arrow" onClick={goToNextStory}>&#8594;</button>
        </div>
      </section>

      <section className="faq">
        <h2>FAQs</h2>
        <div className="faq-container">
          {faqItems.map((item, index) => (
            <details key={index} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="team">
        <h2>Meet the Team</h2>
        <div className="team-container">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <img src={member.image} alt={`${member.name}`} className="team-photo" />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
