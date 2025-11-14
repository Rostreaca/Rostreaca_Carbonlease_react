import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import PageTitleWrap from "./PageTitle.styled";
import AOS from "aos";

const PageTitle = ({ title, breadcrumbs }) => {
    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }, []);

    return (
        <PageTitleWrap>
            <div className="page-title" data-aos="fade">
                <div className="container d-lg-flex justify-content-between align-items-center">
                    <h1 className="mb-2 mb-lg-0">{title}</h1>
                    <nav className="breadcrumbs">
                        <ol>
                            {breadcrumbs && breadcrumbs.map((item, index) => (
                                <li key={index} className={item.current ? 'current' : ''}>
                                    {item.current ? (
                                        item.label
                                    ) : (
                                        <NavLink to={item.path}>{item.label}</NavLink>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                </div>
            </div>
        </PageTitleWrap>
    )
}

export default PageTitle;
