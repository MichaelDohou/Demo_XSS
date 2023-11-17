import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3001/api/comments'); // Full path with port number
      setComments(result.data);
    };
    fetchData();
  }, []);  

  return (
    <ul>
      {comments.map((comment, index) => (
        <li key={index}>{comment.text}</li>
      ))}
    </ul>
  );
};

export default CommentList;