import { PageButton, PaginationContainer } from './Pagination.styled';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        
        return pages;
    };

    return (
        <PaginationContainer>
            <PageButton 
                onClick={() => onPageChange(1)} 
                disabled={currentPage === 1}
            >
                <i className="bi bi-chevron-double-left"></i>
            </PageButton>
            
            <PageButton 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1}
            >
                <i className="bi bi-chevron-left"></i>
            </PageButton>
            
            {getPageNumbers().map(page => (
                <PageButton
                    key={page}
                    onClick={() => onPageChange(page)}
                    $active={currentPage === page}
                >
                    {page}
                </PageButton>
            ))}
            
            <PageButton 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
            >
                <i className="bi bi-chevron-right"></i>
            </PageButton>
            
            <PageButton 
                onClick={() => onPageChange(totalPages)} 
                disabled={currentPage === totalPages}
            >
                <i className="bi bi-chevron-double-right"></i>
            </PageButton>
        </PaginationContainer>
    );
};

export default Pagination;
