// components/Reply.js
import React, { useState } from "react";

const Reply = ({ reply, onReact, onReply }) => {
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    onReply(reply.id, replyText);
    setReplyText("");
  };

  return (
    <div className="border border-gray-300 p-4 mb-4 ml-8">
      <p className="text-gray-800">{reply.text}</p>
      <div className="flex items-center mt-2">
        <button onClick={() => onReact(reply.id)}>
          React ({reply.reactions})
        </button>
        <button className="ml-4" onClick={() => onReply(reply.id)}>
          Reply
        </button>
      </div>
      {reply.replies && (
        <div className="ml-8">
          {reply.replies.map((nestedReply) => (
            <Reply
              key={nestedReply.id}
              reply={nestedReply}
              onReact={onReact}
              onReply={onReply}
            />
          ))}
        </div>
      )}
      {reply.replying && (
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

export default Reply;
