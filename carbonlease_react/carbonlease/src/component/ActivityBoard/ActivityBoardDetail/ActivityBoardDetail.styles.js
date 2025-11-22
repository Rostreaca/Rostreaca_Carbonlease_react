import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 60px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: 20px 0 15px 0;
  color: #222;
`;

export const ActivityInfo = styled.div`
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  margin-bottom: 25px;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  color: #666;
  font-size: 15px;
`;

export const InfoItem = styled.div`
  display: flex;
  gap: 6px;

  span:first-child {
    font-weight: 600;
  }
`;

export const InfoBox = styled.div`
  margin-top: 5px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
`;


export const WriterIcon = styled.span`
  margin-right: 5px;
  color: #ff9900;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  margin: 25px 0;
  display: flex;
  justify-content: center;
`;

export const ImageBox = styled.div`
  width: 100%;
  max-width: 830px;
  height: 500px;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ContentBox = styled.div`
  width: 100%;
  max-width: 830px;
  margin: 30px auto;
  padding: 25px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #d4d4d4;
  font-size: 17px;
  line-height: 1.7;
  color: #333;
  white-space: pre-line;

  min-height: 200px;
`;

export const MapArea = styled.div`
  width: 100%;
  max-width: 830px;
  margin: 20px auto;
  height: 360px;
  border-radius: 12px;
  borderRadius: 10px;
  box-shadow: 0 0 1.2px; 
`

/* ====== 프로필 + 좋아요 ====== */
export const ProfilAndLike = styled.div`
  max-width: 830px;
  margin: 20px auto;
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
`;

export const ProfilCardWrapper = styled.div`
  padding: 18px 22px;
  border: 1px solid #eee;
  border-radius: 12px;
  background: #fff;
  display: flex;
  align-items: center;
  gap: 16px;
  width: 250px;
`;

export const ProfilText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  strong {
    font-size: 17px;
    color: #333;
  }

  div {
    font-size: 14px;
    color: #666;
  }
`;

/* ====== 탄소 게이지 ====== */
export const GaugeWrapper = styled.div`
  width: 42px;
  height: 110px;
  background: #eee;
  border-radius: 25px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const GaugeFill = styled.div`
  width: 100%;
  background: #ffb74d;
  transition: height 0.3s ease;
`;

/* ====== 좋아요 버튼 ====== */
export const LikeButton = styled.button`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 32px;
    background: ${props => props.$liked ? '#00a34a' : 'white'};
    color: ${props => props.$liked ? 'white' : '#333'};
    border: 2px solid ${props => props.$liked ? '#00a34a' : '#ddd'};
    border-radius: 30px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    i {
        font-size: 20px;
    }

    &:active {
        transform: translateY(0);
        border: 2px solid ${props => props.$liked ? '##00a34a' : '#ddd'};
    }
`;

/* ====== 수정/삭제 버튼 ====== */
export const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin: 25px 0;

  .update-btn {
    background: #27ae60;
    color: #fff;
    padding: 10px 22px;
    border-radius: 8px;
    border: none;
    font-size: 15px;
    cursor: pointer;
  }

  .delete-btn {
    background: #e74c3c;
    color: #fff;
    padding: 10px 22px;
    border-radius: 8px;
    border: none;
    font-size: 15px;
    cursor: pointer;
  }
`;

/* ====== 댓글 ====== */
export const CommentSection = styled.div`
  margin-top: 40px;
  padding-top: 16px;
  border-top: 1px solid #eee;
`;

export const Reply = styled.div`
  padding: 14px 0;
  border-bottom: 1px solid #f0f0f0;

  display: flex;
  flex-direction: column;
  gap: 5px;

  b {
    font-size: 15px;
    color: #333;
  }
`;

export const ReplyContent = styled.div`
  font-size: 15px;
  color: #444;
  margin-left: 2px;
`;
