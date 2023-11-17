import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';

const TopicDetail = () => {
  const [topic, setTopic] = useState(null);
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  const addNewCommentToList = (newComment) => {
    setComments(prevComments => [...prevComments, {...newComment, date: new Date(newComment.date)}]);
  };

  useEffect(() => {
    const fetchTopicAndComments = async () => {
      try {
        // Fetch topic details
        const topicResponse = await axios.get(`http://localhost:3001/api/topics/${id}`);
        if (topicResponse.data) {
          setTopic({
            ...topicResponse.data,
            creationDate: new Date(topicResponse.data.creationDate),
          });
        }
  
        // Fetch comments for the topic
        const commentsResponse = await axios.get(`http://localhost:3001/api/topics/${id}/comments`);
        if (commentsResponse.data) {
          setComments(commentsResponse.data.map(comment => ({
            ...comment,
            date: new Date(comment.date),
          })));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };
  
    fetchTopicAndComments();
  }, [id]);

  if (!topic) {
    return <div>Loading...</div>;
  }

  return (
    <div className="topic topic-details">
      <h1>{topic.title}</h1>
      <div className="topic-description" dangerouslySetInnerHTML={{ __html: topic.description }}></div>
      <div className="topic-info">
        <p>Posté par: <b>{topic.user}</b></p>
        <p>Posté le: {formatDate(topic.creationDate)}</p>
      </div>
      <hr/>
      <h3>Commentaires:</h3>
      <div>
        {comments.map((comment, index) => (
          <div key={index} className="comment-box">
            <div className="comment-author">{comment.user}</div>
            <p>{comment.text}</p>
            <div className="comment-date">{formatDate(comment.date)}</div>
          </div>
        ))}
        <CommentForm topicId={id} onCommentPosted={addNewCommentToList} />
      </div>
    </div>
  );
};

function formatDate(d) {
  const date = new Date(d);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().substr(-2);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
}

export default TopicDetail;