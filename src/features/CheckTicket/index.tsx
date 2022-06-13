import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TicketCheckPage from './pages/Ticket-list/TicketCheckPage';

function TicketCheckFeature() {
    return (
        <Routes>
            <Route path="/ticket-check" element={<TicketCheckPage />} />
        </Routes>
    );
}

export default TicketCheckFeature;