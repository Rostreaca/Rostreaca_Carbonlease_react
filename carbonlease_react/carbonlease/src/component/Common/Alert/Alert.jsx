import { Modal } from 'react-bootstrap';
import {
    AlertBody,
    AlertButton,
    AlertFooter,
    AlertHeader,
    AlertIcon,
    StyledModal
} from './Alert.styled';

const Alert = ({ show, onClose, title, message, variant = 'info' }) => {
    const getIcon = () => {
        switch (variant) {
            case 'success':
                return 'bi-check-circle-fill';
            case 'error':
                return 'bi-x-circle-fill';
            case 'warning':
                return 'bi-exclamation-triangle-fill';
            case 'info':
                return 'bi-info-circle-fill';
            default:
                return 'bi-info-circle-fill';
        }
    };

    return (
        <StyledModal show={show} onHide={onClose} centered $variant={variant}>
            <AlertHeader>
                <AlertIcon className={`bi ${getIcon()}`} $variant={variant} />
                <Modal.Title>{title}</Modal.Title>
            </AlertHeader>
            <AlertBody>
                {message}
            </AlertBody>
            <AlertFooter>
                <AlertButton onClick={onClose} $variant={variant}>
                    확인
                </AlertButton>
            </AlertFooter>
        </StyledModal>
    );
};

export default Alert;
