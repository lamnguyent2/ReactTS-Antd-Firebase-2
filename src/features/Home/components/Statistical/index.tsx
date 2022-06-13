import React from 'react';
import { Layout, DatePicker } from 'antd';
import LeftMenu from '../../../../components/Left-menu';
import ProfileAndFilter from '../../../../components/Profile-And-Filter';
import './style.scss';
import { Area } from '@ant-design/plots';
import { data } from './data';
import { DemoMix } from './charts/ChartPie';
import { DateSVG } from './icon/dateSVG';

const { Content } = Layout;

export interface IStatisticalComponentProps { }

const StatisticalComponent: React.FC<IStatisticalComponentProps> = () => {

    const ChartArea = {
        data,
        xField: 'Date',
        yField: 'scales',
        xAxis: {
            range: [0, 1],
            tickCount: 7,
        },
        areaStyle: () => {
            return {
                fill: 'l(270) 0:#ffffff 0.5:#FEF4ED 1:#FEE7D7',
            };
        },
        color: '#FF9F48'
    };

    return (
        <div className='home-Component'>
            <Layout>
                <LeftMenu KeysMenu="1" />
                <Layout>
                    <Content className='right-content'>
                        <ProfileAndFilter />
                        <div className="Statistical-content">
                            <h2>Thống kê</h2>
                            <div className="title-date">
                                <h3>Doanh thu</h3>
                                <DatePicker placeholder='Tháng 4, 2021' suffixIcon={<DateSVG />} />
                            </div>
                            <Area {...ChartArea} style={{ maxHeight: "280px", minHeight: "278px" }} />
                            <div className="total-revenue-by-week">
                                Tổng doanh thu theo tuần
                            </div>
                            <div className="total-money">525.145.000 <span>đồng</span></div>
                            <div className="chart-pie">
                                <div className="left-date"><DatePicker placeholder='Tháng 4, 2021' suffixIcon={<DateSVG />} /></div>
                                <div className="right-chart">
                                    <div className="title-chart">
                                        <div className="chart-one">
                                            <h3>Gói gia đình</h3>
                                        </div>
                                        <div className="chart-two">
                                            <h3>Gói sự kiện</h3>
                                        </div>
                                    </div>
                                    <div className="charts">
                                        <DemoMix />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export { StatisticalComponent };