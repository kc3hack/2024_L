import { Outlet, useRoutes } from "react-router-dom";
import { MainLayout } from "@/components/Layout";
import { Home } from "@/features/home";
import { Markers, NewMarker, EditMarker } from "@/features/markers";

const App = () => {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
};

export const AppRoutes = () => {
    const commonRoutes = [
        {
            element: <App />,
            children: [
                { path: '/', element: <Home /> },
                { path: '/markers', element: <Markers /> },
                { path: '/marker/new', element: <NewMarker /> },
                { path: '/marker/:id/edit', element: <EditMarker /> },
                { path: '*', element: <div className="text-center underline text-xl mt-[50vh]">404 Not Found</div> }
            ]
        }
    ]

    return useRoutes(commonRoutes);
}
