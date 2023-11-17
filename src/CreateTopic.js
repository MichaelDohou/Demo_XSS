import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTopic = ({ onTopicCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, user: 'Michael' }),
      });
      if (response.ok) {
        navigate('/');
      } else {
        console.log("NOK");
      }
    } catch (error) {
      console.error('Error posting new topic:', error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="create-topic-container">
      <h2 className="create-topic-title">Créer un sujet</h2>
      <form onSubmit={handleSubmit}>
        <input 
          className="create-topic-input"
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Titre"
        />
        <div 
          className="create-topic-textarea"
          contentEditable={true} 
          onInput={(e) => setDescription(e.currentTarget.textContent)}
        />
        <div className="create-topic-actions">
          <button type="button" className="create-topic-button" onClick={handleCancel}>Annuler</button>
          <button type="submit" className="create-topic-button">Poster</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTopic;
