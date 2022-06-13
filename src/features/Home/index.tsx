import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StatisticalPage from './pages/Statistical/StatisticalPage';

function StatisticalFeature() {
    return (
        <Routes>
            <Route path="/" element={<StatisticalPage />} />
        </Routes>
    );
}

export default StatisticalFeature;