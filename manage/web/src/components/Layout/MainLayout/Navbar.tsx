import {NavLink} from "react-router-dom";
export const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto px-16 flex justify-between max-w-[1200px]">
                <NavLink to="/" className="text-white text-2xl">管理画面</NavLink>
            </div>
        </nav>
    );
}