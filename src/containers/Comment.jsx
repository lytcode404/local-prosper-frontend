// components/Comment.js
import Reply from "@/components/Reply";
import React, { useState } from "react";

const Comment = ({ comment, onReact, onReply }) => {
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    onReply(comment.id, replyText);
    setReplyText("");
  };

  return (
    <div className="border border-gray-300 p-4 mb-4">
      <p className="text-gray-800">{comment.text}</p>
      <div className="flex items-center mt-2">
        <button onClick={() => onReact(comment.id)}>
          React ({comment.reactions})
        </button>
        <button className="ml-4" onClick={() => onReply(comment.id)}>
          Reply
        </button>
      </div>
      {comment.replies && (
        <div className="ml-8">
          {comment.replies.map((reply) => (
            <Reply
              key={reply.id}
              reply={reply}
              onReact={onReact}
              onReply={onReply}
            />
          ))}
        </div>
      )}
      {comment.replying && (
        <div className="mt-4">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your reply..."
            className="w-full p-2 border border-gray-300"
          />
          <button
            onClick={handleReply}
            className="mt-2 bg-blue-500 text-white px-4 py-2"
          >
            Reply
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
