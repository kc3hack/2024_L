import React, { InputHTMLAttributes, Ref } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FieldWrapper, FieldWrapperPassThroughProps } from "./FormWrapper";
type BaseProps = {
    className: string;
}

type BasePropsMap = {
    [key: string]: BaseProps;
};

const basePropsMap: BasePropsMap = {
    'submit': {
        className: 'bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 w-[100%]'
    },
    'default': {
        className: 'p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-600 w-[100%]'
    },
};

const getBaseProps = (type?: string): BaseProps => {
    const basePropsKey = type !== undefined && type in basePropsMap ? type : 'default';
    return basePropsMap[basePropsKey];
}

type InputProps = InputHTMLAttributes<HTMLInputElement> &
    FieldWrapperPassThroughProps & {
        registration?: Partial<UseFormRegisterReturn>
    };

export const Input = React.forwardRef((
    { className, type, registration, label, error, ...props }: InputProps,
    ref: Ref<HTMLInputElement>
) => {
    const baseProps = getBaseProps(type);

    return (
        <FieldWrapper label={label} error={error} className={className}>
            <input
                ref={ref}
                type={type}
                className={`${baseProps.className}`}
                {...registration}
                {...props}
            />
        </FieldWrapper>
    );
})

Input.displayName = "Input";