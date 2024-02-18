import {ButtonHTMLAttributes} from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export const Button = ({className, children, ...props}:ButtonProps) => {
    return (
        <button className={`w-[600px] max-w-[80%] bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ${className}`} {...props}>
            {children}
        </button>
    );
}