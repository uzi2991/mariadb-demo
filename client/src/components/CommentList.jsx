import React from 'react';
import moment from 'moment';
import DOMPurify
 from 'dompurify';
const CommentList = ({ comments }) => {
  return (
    <div className='comments'>
      <h2>Comments</h2>

      <div className="comments-container">
        {comments.map((comment) => (
          <div key={comment.id} className="single-comment">
            <div className='upper'>
              <strong>{comment.username}</strong>
              <span>Posted {moment(comment.date).fromNow()}</span>
            </div>

            <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(comment.content),
            }}
          ></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
