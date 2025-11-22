import { useState } from "react";

const CommentInsert = ({ boardNo, onSuccess }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!content.trim()) return alert("댓글을 입력하세요!");

    try {
      await fetch(`http://localhost/activityBoards/${boardNo}/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          replyContent: content
        })
      });

      setContent("");
      onSuccess();
    } catch (err) {
      console.error("댓글 등록 실패", err);
    }
  };

  return (
    <div>
      <textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", height: "80px" }}
      />
      <button onClick={handleSubmit}>댓글 등록</button>
    </div>
  );
};

export default CommentInsert;
