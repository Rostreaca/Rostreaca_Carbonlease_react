import styled from "styled-components";

export const PageTitleWrap = styled.div`
    /* Page Title */
    .page-title {
        color: var(--default-color);
        background-color: var(--background-color);
        padding: 80px 0 60px 0;
        position: relative;
        margin-top: 80px;
    }

    .page-title h1 {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 0;
    }

    .page-title .breadcrumbs ol {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 15px;
    }

    .page-title .breadcrumbs ol li + li {
        padding-left: 10px;
    }

    .page-title .breadcrumbs ol li + li::before {
        content: "/";
        display: inline-block;
        padding-right: 10px;
        color: color-mix(in srgb, var(--default-color), transparent 70%);
    }

    /* Tablet */
    @media (max-width: 992px) {
        .page-title {
            padding: 60px 0 40px 0;
            margin-top: 70px;
        }

        .page-title h1 {
            font-size: 28px;
        }

        .page-title .breadcrumbs ol {
            font-size: 14px;
        }
    }

    /* Mobile */
    @media (max-width: 768px) {
        .page-title {
            padding: 40px 0 30px 0;
            margin-top: 60px;
        }

        .page-title h1 {
            font-size: 24px;
            margin-bottom: 10px;
        }

        .page-title .breadcrumbs ol {
            font-size: 13px;
        }
    }

    /* Small Mobile */
    @media (max-width: 576px) {
        .page-title {
            padding: 30px 0 20px 0;
        }

        .page-title h1 {
            font-size: 20px;
        }

        .page-title .breadcrumbs ol {
            font-size: 12px;
        }
    }
`;

export default PageTitleWrap;
