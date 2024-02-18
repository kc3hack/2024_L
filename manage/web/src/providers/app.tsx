import * as React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {HelmetProvider} from 'react-helmet-async';
import {BrowserRouter as Router} from 'react-router-dom';
import {QueryClientProvider} from "react-query";
import {queryClient} from "@/lib/react-query";

import {NavLink} from "react-router-dom";
export const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto px-16 flex justify-between max-w-[1200px]">
                <NavLink to="/" className="text-white text-2xl">掲示板</NavLink>
                <NavLink to="/thread/new" className="text-white ml-4 flex items-center">スレッド作成</NavLink>
            </div>
        </nav>
    );
}
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
