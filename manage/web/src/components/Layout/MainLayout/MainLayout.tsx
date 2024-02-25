import React from "react";
import { Navbar } from "./Navbar";

type MainLayoutProps = {
    children: React.ReactNode;
}
export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main>
                {children}
            </main>
        </div>
    );

};