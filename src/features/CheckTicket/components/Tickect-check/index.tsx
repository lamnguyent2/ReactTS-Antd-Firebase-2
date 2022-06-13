import React, { useEffect, useState } from 'react';
import { Layout, Space, Input, Table, Button, Tooltip, Radio, DatePicker } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import LeftMenu from '../../../../components/Left-menu';
import ProfileAndFilter from '../../../../components/Profile-And-Filter';
import './style.scss';
import { dbrealtime } from '../../../../config/config';
import { onValue, ref } from '@firebase/database';
import { FilterSVG } from './icon/filterSVG';
import { DateSVG } from './icon/dateSVG';

const { Content } = Layout;

const columns: any = [
    {
        title: 'STT',
        dataIndex: 'STT',
        className: `stt-one`,
    },
    {
        title: 'Số vé',
        dataIndex: 'number',
        className: 'stt-two',
    },
    {
        title: 'Ngày sử dụng',
        dataIndex: 'useddate',
        className: 'stt-three',
    },
    {
        title: 'Tên loại vé',
        dataIndex: 'type',
        className: 'stt-four'

    },
    {
        title: 'Cổng check - in',
        dataIndex: 'checkinport',
        className: 'stt-five',
    },
    {
        title: '',
        dataIndex: 'status',
        className: 'stt-final',
        render: (text: any) => <div className={`${text.classstatus}`}> {text.name}</div>,
    },
];

export interface ITicketCheckComponentProps { }

const TicketCheckComponent: React.FC<ITicketCheckComponentProps> = () => {
    const [dataTicket, setDataTicket] = useState<any[]>([]);
    const [dataTicket2, setDataTicket2] = useState<any>("");

    useEffect(() => {
        onValue(ref(dbrealtime), (snapshot: any) => {
            const data = snapshot.val().ticket.TicketChecks;
            if (data !== null) {
                if(dataTicket2===""){
                    setDataTicket(data)
                }else if(dataTicket2==="chua-doi-soat"){
                    setDataTicket([])
                    data.map((dd: any) => (
                        dd.status.name === "Chưa đối soát" ? (  
                            setDataTicket((ddaraay) => [...ddaraay, dd])                                                  
                        ) : ("")
                    ))
                }else if(dataTicket2==="da-doi-soat"){
                    setDataTicket([])
                    data.map((dd: any) => (
                        dd.status.name === "Đã đối soát" ? (  
                            setDataTicket((ddaraay) => [...ddaraay, dd])                                                  
                        ) : ("")
                    ))
                }else if(dataTicket2==="tat-ca"){
                    setDataTicket(data)
                }
            }
        })
    }, [dataTicket2])

    const [radiovalue, setradiovalue] = useState<any>("Tất cả");

    const radiovalues = (e: any) => {
        setradiovalue(e.target.value);
    }

    const submitvalues = (e: any) => {
        if (e === "Chưa đối soát") {
            setDataTicket2("chua-doi-soat")
        }else if(e==="Đã đối soát"){
            setDataTicket2("da-doi-soat")
        }else if(e==="Tất cả"){
            setDataTicket2("tat-ca")
        }
    }

    return (
        <div className='TicketCheck-Component'>
            <Layout>
                <LeftMenu KeysMenu="3" />
                <Layout>
                    <Content className='right-content'>
                        <ProfileAndFilter />
                        <div className="flex-s">
                            <div className="TicketCheck-content">
                                <h2>Danh sách vé</h2>
                                <div className='Ticket-filter'>
                                    <div className="left-filter">
                                        <Space direction="vertical" size={12}>
                                            <Input type='text' placeholder="Search" suffix={<FilterSVG />} />
                                        </Space>
                                    </div>
                                    <div className="right-profile">
                                        <Tooltip title="Chốt đối soát">
                                            <Button className='check-file'>Chốt đối soát</Button>
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className="number-details">
                                    <Table rowClassName={(record, index) => index % 2 !== 0 ? 'table-row-light' : 'table-row-dark'} columns={columns} dataSource={dataTicket} pagination={{ pageSize: 12, prevIcon: <CaretLeftOutlined />, nextIcon: <CaretRightOutlined /> }} />
                                </div>
                            </div>
                            <div className="filter-tickets">
                                <h2>Lọc vé</h2>
                                <div className="status-content">
                                    <div className="left-contents">Tình trạng đối soát</div>
                                    <div className="right-contents">
                                        <Radio.Group onChange={radiovalues} defaultValue={radiovalue}>
                                            <Space direction="vertical">
                                                <Radio value="Tất cả">Tất cả</Radio>
                                                <Radio value="Đã đối soát">Đã đối soát</Radio>
                                                <Radio value="Chưa đối soát">Chưa đối soát</Radio>
                                            </Space>
                                        </Radio.Group>
                                    </div>
                                </div>
                                <div className="type-content">
                                    <div className="left-contents">Loại vé</div>
                                    <div className="right-contents">Vé cổng</div>
                                </div>
                                <div className="since-content">
                                    <div className="left-contents">Từ ngày</div>
                                    <div className="right-contents">
                                        <DatePicker placeholder='01/05/2021' suffixIcon={<DateSVG />} disabled />
                                    </div>
                                </div>
                                <div className="todate-content">
                                    <div className="left-contents">Đến ngày</div>
                                    <div className="right-contents">
                                        <DatePicker placeholder='dd/mm/yy' suffixIcon={<DateSVG />} />
                                    </div>
                                </div>
                                <div className="submit-content">
                                    <Button onClick={() => submitvalues(radiovalue)}>Lọc</Button>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default TicketCheckComponent;