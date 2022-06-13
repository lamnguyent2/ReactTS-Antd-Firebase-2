import React, { useEffect, useState } from 'react';
import { Layout, Space, Input, Table, Button, Tooltip, Modal, DatePicker, Radio, Checkbox, Row, Col } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import LeftMenu from '../../../../components/Left-menu';
import ProfileAndFilter from '../../../../components/Profile-And-Filter';
import './style.scss';
import { dbrealtime } from '../../../../config/config';
import { onValue, ref } from '@firebase/database';
import { CSVLink } from "react-csv";
import { FillSVG } from './icon/fillSVG';
import { FilterSVG } from './icon/filterSVG';
import { DotSVG } from './icon/dotSVG';
import { DateSVG } from './icon/dateSVG';

const { Content } = Layout;

const columns: any = [
    {
        title: 'STT',
        dataIndex: 'STT',
        className: `stt-one`,
    },
    {
        title: 'Booking code',
        dataIndex: 'bookingcode',
        className: 'stt-two',
    },
    {
        title: 'Số vé',
        dataIndex: 'ticketnumber',
        className: 'stt-three',
    },
    {
        title: 'Tình trạng sử dụng',
        dataIndex: 'status',
        className: 'stt-four',
        render: (text: any) => <div className={`${text.classstatus}`}> <DotSVG /> {text.name}</div>,

    },
    {
        title: 'Ngày sử dụng',
        dataIndex: 'useddate',
        className: 'stt-five',
    },
    {
        title: 'Ngày xuất vé',
        dataIndex: 'releasedate',
        className: 'stt-six',
    },
    {
        title: 'Cổng check - in',
        dataIndex: 'checkinport',
        className: 'stt-final',
    },
];

export interface ITicketListComponentProps { }

const TicketListComponent: React.FC<ITicketListComponentProps> = () => {
    const [dataTicket, setDataTicket] = useState<any[]>([]);
    const [dataTicket2, setDataTicket2] = useState<any>("");
    const [dataTicket3, setDataTicket3] = useState<any[]>([]);

    useEffect(() => {
        onValue(ref(dbrealtime), (snapshot: any) => {
            const data = snapshot.val().ticket.TicketLists;
            if (data !== null) {
                setDataTicket(data)
                if (dataTicket2 === "") {
                    setDataTicket(data)
                } else if (dataTicket2 === "chua-su-dung") {
                    setDataTicket([])
                    data.map((dd: any) => (
                        dd.status.name === "Chưa sử dụng" ? (
                            setDataTicket((ddaraay) => [...ddaraay, dd])
                        ) : ("")
                    ))
                } else if (dataTicket2 === "da-su-dung") {
                    setDataTicket([])
                    data.map((dd: any) => (
                        dd.status.name === "Đã sử dụng" ? (
                            setDataTicket((ddaraay) => [...ddaraay, dd])
                        ) : ("")
                    ))
                } else if (dataTicket2 === "het-han") {
                    setDataTicket([])
                    data.map((dd: any) => (
                        dd.status.name === "Hết hạn" ? (
                            setDataTicket((ddaraay) => [...ddaraay, dd])
                        ) : ("")
                    ))
                }
                else if (dataTicket2 === "tat-ca") {
                    setDataTicket(data)
                }
            }
        })
    }, [dataTicket2, dataTicket3])
    
    // xuất file
    const headerfile =[
        {label:  'STT', key:'STT'},
        {label:  'Booking code', key:'bookingcode'},
        {label:  'Số vé', key:'ticketnumber'},
        {label:  'Tình trạng sử dụng', key:'status.name'},
        {label:  'Ngày sử dụng', key:'useddate'},
        {label:  'Ngày xuất vé', key:'releasedate'},
        {label:  'Cổng check - in', key:'checkinport'},
    ]

    const csvDown = {
        filename: 'filesave.csv',
        headers: headerfile,
        data: dataTicket,
    }
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        setIsModalVisible(true);
    };

    // Lọc vé
    const [isModalVisible2, setIsModalVisible2] = useState(false);

    const handleOk2 = (e: any, y: any) => {
        setIsModalVisible2(false);
        setDataTicket3(y)
        if (e === "Chưa sử dụng") {
            setDataTicket2("chua-su-dung")
        } else if (e === "Đã sử dụng") {
            setDataTicket2("da-su-dung")
        } else if (e === "Hết hạn") {
            setDataTicket2("het-han")
        } else if (e === "Tất cả") {
            setDataTicket2("tat-ca")
        }
    };

    const handleCancel2 = () => {
        setIsModalVisible2(false);
    };

    const handleSubmit2 = (e: any) => {
        e.preventDefault();
        setIsModalVisible2(true);
    };

    // radio check
    const [value, setValue] = useState("Tất cả");

    const onChangeradio = (e: any) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    // check-in
    const [checkedList, setCheckedList] = useState<any[]>([]);

    const onChanges = (e: any) => {
        const toRemove = ['Cổng 1', 'Cổng 2', 'Cổng 3', 'Cổng 4', 'Cổng 5']
        setCheckedList(e);
        e.map((ee: any) => (
            ee === "Tất cả" ? (e.splice(toRemove), e = ['Tất cả'], setCheckedList(e)) : (setCheckedList(e))
        ))
        console.log('checked = ', e);
    };

    return (
        <div className='TicketList-Component'>
            <Layout>
                <LeftMenu KeysMenu="2" />
                <Layout>
                    <Content className='right-content'>
                        <ProfileAndFilter />
                        <div className="TicketList-content">
                            <h2>Danh sách vé</h2>
                            <div className='Ticket-filter'>
                                <div className="left-filter">
                                    <Space direction="vertical" size={12}>
                                        <Input type='text' placeholder="Search" suffix={<FilterSVG />} />
                                    </Space>
                                </div>
                                <div className="right-profile">
                                    <Tooltip title="Lọc vé">
                                        <Button className='fill-check' icon={<FillSVG />} onClick={handleSubmit2}>Lọc vé</Button>
                                    </Tooltip>
                                    <Tooltip title="Xuất file">
                                        <Button className='down-file' onClick={handleSubmit}>Xuất file (.csv)</Button>
                                        {/* <CSVLink {...csvDown} className='down-file'>Xuất file (.csv)</CSVLink> */}
                                    </Tooltip>
                                    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Lưu" cancelText="Hủy" className='modal-down'>
                                        <div className='download'>
                                            <CSVLink {...csvDown} className='down-file'>Xuất file (.csv)</CSVLink>
                                        </div>
                                    </Modal>
                                    <Modal title="Basic Modal" visible={isModalVisible2} onOk={() => handleOk2(value, checkedList)} onCancel={handleCancel2} okText="Lọc" cancelText="Hủy" className='modal-filter'>
                                        <div className='Pop-Up'>
                                            <h3>Lọc vé</h3>
                                            <div className="filter-date">
                                                <div className="left-filter-date">
                                                    <p>Từ ngày</p>
                                                    <DatePicker placeholder='14/04/2021' suffixIcon={<DateSVG />} />
                                                </div>
                                                <div className="right-filter-date">
                                                    <p>Đến ngày</p>
                                                    <DatePicker placeholder='14/04/2021' suffixIcon={<DateSVG />} />
                                                </div>
                                            </div>
                                            <div className="filter-status">
                                                <p>Tình trạng sử dụng</p>
                                                <Radio.Group onChange={onChangeradio} value={value}>
                                                    <Radio value="Tất cả">Tất cả</Radio>
                                                    <Radio value="Đã sử dụng">Đã sử dụng</Radio>
                                                    <Radio value="Chưa sử dụng">Chưa sử dụng</Radio>
                                                    <Radio value="Hết hạn" className='final'>Hết hạn</Radio>
                                                </Radio.Group>
                                            </div>
                                            <div className="filter-check-in">
                                                <p>Cổng Check - in</p>
                                                <Checkbox.Group style={{ width: '100%' }} onChange={onChanges} value={checkedList || []}>
                                                    <Row>
                                                        <Col span={8}>
                                                            <Checkbox value="Tất cả" >Tất cả</Checkbox>
                                                        </Col>
                                                        <Col span={8}>
                                                            <Checkbox value="Cổng 1">Cổng 1</Checkbox>
                                                        </Col>
                                                        <Col span={8}>
                                                            <Checkbox value="Cổng 2">Cổng 2</Checkbox>
                                                        </Col>
                                                        <Col span={8}>
                                                            <Checkbox value="Cổng 3">Cổng 3</Checkbox>
                                                        </Col>
                                                        <Col span={8}>
                                                            <Checkbox value="Cổng 4">Cổng 4</Checkbox>
                                                        </Col>
                                                        <Col span={8}>
                                                            <Checkbox value="Cổng 5">Cổng 5</Checkbox>
                                                        </Col>
                                                    </Row>
                                                </Checkbox.Group>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                            <div className="number-details">
                                <Table rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} columns={columns} dataSource={dataTicket} pagination={{ pageSize: 13, prevIcon: <CaretLeftOutlined />, nextIcon: <CaretRightOutlined /> }} />
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default TicketListComponent;