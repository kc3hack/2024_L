import { Link as RouterLink, LinkProps  } from 'react-router-dom';

export const Link = ({ className, children, ...props}: LinkProps) => {
    return (
        <RouterLink className={`text-blue-500 ${className}`} {...props}>
            {children}
        </RouterLink>
    );
}