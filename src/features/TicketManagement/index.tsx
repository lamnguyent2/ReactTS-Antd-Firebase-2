import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TicketListEventPage from './pages/Ticket-list-event/TicketListEventPage';
import TicketListPage from './pages/Ticket-list/TicketListPage';

function TicketListFeature() {
    return (
        <Routes>
            <Route path="/ticket-list" element={<TicketListPage />} />
            <Route path="/ticket-list-event" element={<TicketListEventPage />} />
        </Routes>
    );
}

export default TicketListFeature;