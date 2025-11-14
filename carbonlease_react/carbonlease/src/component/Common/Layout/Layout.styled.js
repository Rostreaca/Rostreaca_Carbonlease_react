import styled from "styled-components";

export const LayoutWrap = styled.div`
    /* Main Content Layout */
    main {
        min-height: calc(100vh - 200px);
    }

    /* Page Layout */
    .page-content {
        padding: 40px 0;
    }

    @media (max-width: 768px) {
        .page-content {
            padding: 20px 0;
        }
    }
`;

export default LayoutWrap;
