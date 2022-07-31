import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { AuthContextProvider } from "./AuthContext";

interface ProvidersProps {
    children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
    const queryClient = new QueryClient()

    return (
        <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </QueryClientProvider>
        </AuthContextProvider>
    );
}