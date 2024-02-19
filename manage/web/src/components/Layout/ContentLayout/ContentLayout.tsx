import * as React from 'react';
import { Head } from '@/components/Head';

type ContentLayoutProps = {
    children: React.ReactNode;
    title: string;
    description: string;
};

export const ContentLayout = ({ children, title, description}: ContentLayoutProps) => {
    return (
        <div className="h-[100%]">
            <Head title={title} description={description} />
            <div className="flex flex-col items-center">
                <main className="w-[90%] max-w-[1000px]">
                    {children}
                </main>
            </div>
        </div>
    );
};