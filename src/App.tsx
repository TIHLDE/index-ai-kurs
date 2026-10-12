import { Route, Routes } from "react-router";

import { AppLayout } from "#/components/app-layout";
import { EventDetailPage } from "#/pages/EventDetailPage";
import { EventsPage } from "#/pages/EventsPage";
import { GroupsPage } from "#/pages/GroupsPage";
import { HomePage } from "#/pages/HomePage";
import { NotFoundPage } from "#/pages/NotFoundPage";

export function App() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="arrangementer" element={<EventsPage />} />
                <Route path="arrangementer/:eventId" element={<EventDetailPage />} />
                <Route path="grupper" element={<GroupsPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}
