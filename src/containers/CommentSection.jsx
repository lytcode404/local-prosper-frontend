import React, { useState } from "react";

const Comment = ({ comment, onReact, onReply, isReply }) => {
  const [reacts, setReacts] = useState(comment.reacts);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [newReply, setNewReply] = useState("");

  const handleReact = () => {
    onReact(comment.id, reacts + 1);
    setReacts(reacts + 1);
  };

  const handleUndoReact = () => {
    onReact(comment.id, reacts - 1);
    setReacts(reacts - 1);
  };

  const handleReply = () => {
    setShowReplyInput(true);
  };

  const handleReplySubmit = () => {
    if (newReply.trim() !== "") {
      onReply(comment.id, newReply);
      setShowReplyInput(false);
      setNewReply("");
    }
  };

  return (
    <div className="border p-4 mb-4">
      <p>{comment.text}</p>
      <div className="flex items-center space-x-2 mt-2">
        <button onClick={handleReact} className="text-blue-500">
          React (+)
        </button>
        <button onClick={handleUndoReact} className="text-red-500">
          Undo React (-)
        </button>
        {isReply && (
          <button onClick={handleReply} className="text-green-500 ml-auto">
            Reply
          </button>
        )}
        <span className="ml-2">{reacts} Reacts</span>
      </div>
      {showReplyInput && (
        <div className="mt-2">
          <textarea
            rows="2"
            className="w-full p-2 border"
            placeholder="Add a reply..."
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
          ></textarea>
          <button
            onClick={handleReplySubmit}
            className="mt-2 bg-green-500 text-white p-2"
          >
            Add Reply
          </button>
        </div>
      )}
    </div>
  );
};

const CommentInput = ({ onSubmit }) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (newComment.trim() !== "") {
      onSubmit(newComment);
      setNewComment("");
    }
  };

  return (
    <div className="mt-4">
      <textarea
        rows="3"
        className="w-full p-2 border"
        placeholder="Add a new comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      ></textarea>
      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-500 text-white p-2"
      >
        Add Comment
      </button>
    </div>
  );
};

const CommentSection = () => {
  const [showReplies, setShowReplies] = useState([]);
  const [comments, setComments] = useState([
    {
      id: 1,
      text: "This is the first comment!",
      reacts: 0,
      replies: [
        { id: 2, text: "Reply 1 to the first comment", reacts: 0, replies: [] },
        { id: 3, text: "Reply 2 to the first comment", reacts: 0, replies: [] },
        { id: 4, text: "Reply 3 to the first comment", reacts: 0, replies: [] },
      ],
    },
    {
      id: 5,
      text: "This is the second comment!",
      reacts: 0,
      replies: [],
    },
  ]);

  const onReact = (commentId, newReactCount) => {
    // Implement logic to update the react count in your data store
    console.log(`Comment ${commentId} reacted! New count: ${newReactCount}`);
  };

  const toggleReplies = (commentId) => {
    setShowReplies((prev) => {
      if (prev.includes(commentId)) {
        return prev.filter((id) => id !== commentId);
      } else {
        return [...prev, commentId];
      }
    });
  };

  const addComment = (newComment) => {
    // Implement logic to add a new comment to your data store
    const commentId = comments.length + 1;
    const newCommentObj = {
      id: commentId,
      text: newComment,
      reacts: 0,
      replies: [],
    };
    setComments((prevComments) => [newCommentObj, ...prevComments]);
  };

  const addReply = (commentId, newReply) => {
    // Implement logic to add a new reply to your data store
    const replyId = comments.reduce(
      (maxId, comment) => (comment.id > maxId ? comment.id : maxId),
      0
    );
    const newReplyObj = {
      id: replyId + 1,
      text: newReply,
      reacts: 0,
      replies: [],
    };

    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, replies: [newReplyObj, ...comment.replies] }
          : comment
      )
    );
  };

  return (
    <div>
      <CommentInput onSubmit={addComment} />
      {comments.map((comment) => (
        <div key={comment.id}>
          <Comment
            comment={comment}
            onReact={onReact}
            onReply={addReply}
            isReply={true}
          />
          {comment.replies.length > 0 && (
            <button
              onClick={() => toggleReplies(comment.id)}
              className="text-blue-500"
            >
              {showReplies.includes(comment.id) ? "Hide" : "Show"} Replies
            </button>
          )}
          {showReplies.includes(comment.id) &&
            comment.replies.map((reply) => (
              <div key={reply.id} className="ml-4">
                <Comment comment={reply} onReact={onReact} isReply={false} />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
