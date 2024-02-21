import * as React from 'react';
import {FieldError} from 'react-hook-form';

type FieldWrapperProps = {
    label?: string,
    className?: string,
    children: React.ReactNode,
    error?: FieldError,
    description?: string,
    required?: boolean,
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'className' | 'children'>;

/**
 * input要素をラップするコンポーネント。ラベルとエラーメッセージを表示する。
 * @param label
 * @param className
 * @param required
 * @param error
 * @param children
 * @constructor
 */
export const FieldWrapper = ({label, className, required = false, error, children}: FieldWrapperProps) => {
    const requiredMark = required ? <span className="text-red-500">*</span> : null;

    return (
        <div className={className}>
            <label className="block text-sm font-semibold w-[100%]">
                {label}{requiredMark}
                <div className="w-[100%]">{children}</div>
            </label>
            {error?.message && (
                <div role="alert" aria-label={error.message} className="text-sm font-semibold text-red-500">
                    {error.message}
                </div>
            )}
        </div>
    );
};