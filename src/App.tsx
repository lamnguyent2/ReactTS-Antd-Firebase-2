import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import TicketCheckFeature from './features/CheckTicket';
import StatisticalFeature from './features/Home';
import ServicePackFeature from './features/Setting';
import TicketListFeature from './features/TicketManagement';

export interface IApplicationProps {}

const App: React.FC<IApplicationProps> = (props) => {
    return (
        <BrowserRouter>
            <TicketCheckFeature />
            <StatisticalFeature />
            <ServicePackFeature />
            <TicketListFeature />
        </BrowserRouter>
    );
};

export default App;