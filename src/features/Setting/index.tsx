import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ServicePackPage from './pages/Service-pack/ServicePackPage';

function ServicePackFeature() {
    return (
        <Routes>
            <Route path="/service-pack" element={<ServicePackPage />} />
        </Routes>
    );
}

export default ServicePackFeature;