import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ topicId, onCommentPosted }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const response = await axios.post(`http://localhost:3001/api/topics/${topicId}/comments`, { text: commentText });
      onCommentPosted(response.data);
      setCommentText('');
    } catch (error) {
      console.error("Un erreur s'est produite:", error);
    }
  };

  return (
    <div className="comment-form">
      <form onSubmit={handleSubmit}>
        <textarea 
          value={commentText} 
          onChange={e => setCommentText(e.target.value)}
          placeholder="Écris un commentaire"
        />
        <button type="submit" disabled={!commentText.trim()}>Commenter</button>
      </form>
    </div>
  );
};

export default CommentForm;