import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';

const TopicsList = () => {
    const [topics, setTopics] = useState([]);

    const navigate = useNavigate();

    const handleCreateTopic = () => {
      navigate('/create-topic'); // Navigate to CreateTopic page
    };

    useEffect(() => {
      const fetchTopics = async () => {
        try {
          const result = await axios.get('http://localhost:3001/api/topics');
          const convertedTopics = result.data.map(topic => ({
            ...topic,
            creationDate: new Date(topic.creationDate),
          }));
          setTopics(convertedTopics);
        } catch (error) {
          console.error("Erreur lors de la récupération des données:", error);
        }
      };

      fetchTopics();
    }, []);

    return (
      <div>
        <button className="topic-create-btn" onClick={handleCreateTopic}>
          Créer un nouveau sujet
        </button>
        {topics.map((topic) => (
          <div key={topic.id} className="topic-item">
            <div className="topic-content">
              <h2><Link to={`/topic/${topic.id}`}>{topic.title}</Link></h2>
              <p>Commentaires: {topic.commentCount}</p>
            </div>
            <div className="topic-info">
              <p>Posté par: <b>{topic.user}</b></p>
              <p>Posté le: {formatDate(topic.creationDate)}</p>
            </div>
          </div>
        ))}
      </div>
    );
};

function formatDate(d) {
  const date = new Date(d);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is 0-indexed
  const year = date.getFullYear().toString().substr(-2);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
}

export default TopicsList;