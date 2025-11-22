import { Reply, ReplyContent } from "../ActivityBoardDetail.styles";

const Comments = ({ comments = [] }) => {
  return (
    <div>
      {comments.length === 0 && <div>댓글이 없습니다.</div>}

      {comments.map((reply) => (
        <Reply key={reply.replyNo}>
          <div><b>{reply.writer}</b> · {reply.enrollDate}</div>
          <ReplyContent>{reply.replyContent}</ReplyContent>

          <button>수정</button>
          <button>삭제</button>
        </Reply>
      ))}
    </div>
  )
}

export default Comments;