import React from 'react';
import { Mix } from '@ant-design/plots';

export const DemoMix = () => {
    const data = {
        "pie1": [
            {
                "area": "Vé chưa sử dụng",
                "bill": 13568
            },
            {
                "area": "Vé đã sử dụng",
                "bill": 56024
            },
            
        ],
        "pie2": [
            {
                "time": "2016季1",
                "area": "Vé chưa sử dụng",
                "value": 28302
            },
            {
                "time": "2016季1",
                "area": "Vé đã sử dụng",
                "value": 30256
            }
        ]
    }
    if (!Object.keys(data).length) {
        return null;
    }
    const config = {
        tooltip: false,
        legend: {
            display: true,
            position: 'right'
        },
        plots: [
            {
                type: 'pie',
                region: {
                    start: {
                        x: 0,
                        y: 0,
                    },
                    end: {
                        x: 0.45,
                        y: 1,
                    },
                },
                options: {
                    data: data.pie1,
                    angleField: 'bill',
                    colorField: 'area',
                    innerRadius: 0.45,
                    color: ['#FF8A48', '#4F75FF'],
                    radius: 0.85,
                    tooltip: {
                        showMarkers: false,
                    },
                    label: {
                        type: 'inner',
                        offset: '-15%',
                    },
                    interactions: [
                        {
                            type: 'element-active',
                        },
                        {
                            type: 'association-tooltip',
                        },
                        {
                            type: 'association-highlight',
                        },
                    ],
                },
            },
            {
                type: 'pie',
                region: {
                    start: {
                        x: 0.55,
                        y: 0,
                    },
                    end: {
                        x: 1,
                        y: 1,
                    },
                },
                options: {
                    data: data.pie2,
                    radius: 0.85,
                    angleField: 'value',
                    colorField: 'area',
                    color: ['#FF8A48', '#4F75FF'],
                    innerRadius: 0.45,
                    label: {
                        type: 'inner',
                        offset: '-15%',
                        style: {
                            fontSize: 14,
                            
                        },
                    },
                    tooltip: {
                        showMarkers: false,
                    },
                    interactions: [
                        {
                            type: 'association-tooltip',
                        },
                        {
                            type: 'association-selected',
                        },
                    ],
                },
            },
        ],
    };

    return <Mix {...config} />;
};