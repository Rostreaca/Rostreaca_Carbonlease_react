// src/store/Providers.jsx
import { AuthProvider } from '../component/Context/AuthContext';
import { LikeProvider } from './likeStore.jsx';

export default function Providers({ children }) {
    return (
        <AuthProvider>
            <LikeProvider>
                {children}
            </LikeProvider>
        </AuthProvider>
    );
}