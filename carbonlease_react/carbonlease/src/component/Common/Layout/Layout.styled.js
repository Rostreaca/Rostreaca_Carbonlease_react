import styled from "styled-components";

export const LayoutWrap = styled.div`
  width: 100%;
`;

/* 본문 + 사이드바 전체 래퍼 */
export const PageWrapper = styled.div`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  gap: 40px;
  padding: 40px 0;
  min-height: 800px; /* 사이드바가 푸터까지 안 내려가도록 충분히 공간 확보 */
`;

/* 본문 */
export const MainContent = styled.div`
  flex: 1;
  max-width: 1200px;
`;
