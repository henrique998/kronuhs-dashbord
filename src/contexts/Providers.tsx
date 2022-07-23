import { ReactNode } from "react";
import { AuthContextProvider } from "./AuthContext";

interface ProvidersProps {
    children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    );
}