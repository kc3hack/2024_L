import * as React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter as Router} from 'react-router-dom';
import {QueryClientProvider} from "react-query";
import {queryClient} from "@/lib/react-query";

const ErrorFallback = () => {
    return (
        <div>
            <h1>Something went wrong.</h1>
        </div>
    );
}

type AppProviderProps = {
    children: React.ReactNode;
};

export const AppProvider = ({children}: AppProviderProps) => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <HelmetProvider>
                <QueryClientProvider client={queryClient}>
                    <Router>
                        {children}
                    </Router>
                </QueryClientProvider>
            </HelmetProvider>
        </ErrorBoundary>
    );
}
