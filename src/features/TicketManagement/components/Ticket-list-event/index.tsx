import React, { useEffect, useState } from 'react';
import { Layout, Space, Input, Table, Button, Tooltip, Modal, DatePicker, Radio, Checkbox, Row, Col } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import LeftMenu from '../../../../components/Left-menu';
import ProfileAndFilter from '../../../../components/Profile-And-Filter';
import './style.scss';
import { dbrealtime } from '../../../../config/config';
import { onValue, ref, update } from '@firebase/database';
import { CSVLink } from "react-csv";
import moment from "moment";
import { FillSVG } from './icon/fillSVG';
import { FilterSVG } from './icon/filterSVG';
import { DotSVG } from './icon/dotSVG';
import { DateSVG } from './icon/dateSVG';

const { Content } = Layout;

export interface ITicketListEventComponentProps { }

const TicketListEventComponent: React.FC<ITicketListEventComponentProps> = () => {
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
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
            title: 'Tên sự kiện',
            dataIndex: 'ticketnumber',
            className: 'stt-seven',
            render: (text: any) => <div>Hội chợ triển lãm tiêu dùng 2021</div>,
        },
        {
            title: 'Tình trạng sử dụng',
            dataIndex: 'status',
            className: 'stt-four',
            render: (text: any) => <div className={`${text.classstatus}`}> <DotSVG /> {text.name}</div>,

        },
        {
            title: 'Ngày sử dụng',
            dataIndex: ['useddate', 'STT'],
            className: 'stt-five',
            render: (text: any, record: any) => <div onClick={() => handleSubmit3(record["STT"])} >{record["useddate"]}</div>,
        },
        {
            title: 'Hạn sử dụng',
            dataIndex: 'releasedate',
            className: 'stt-six',
        },
        {
            title: 'Cổng check - in',
            dataIndex: 'checkinport',
            className: 'stt-final',
        },
    ];

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
    const headerfile = [
        { label: 'STT', key: 'STT' },
        { label: 'Booking code', key: 'bookingcode' },
        { label: 'Số vé', key: 'ticketnumber' },
        { label: 'Tình trạng sử dụng', key: 'status.name' },
        { label: 'Ngày sử dụng', key: 'useddate' },
        { label: 'Ngày xuất vé', key: 'releasedate' },
        { label: 'Cổng check - in', key: 'checkinport' },
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

    // Đổi ngày sử dụng vé
    const [isModalVisible3, setIsModalVisible3] = useState(false);
    const [ValidateCheck2, setValidateCheck2] = useState("");
    const [ValidateInfo2, setValidateInfo2] = useState("");
    const [ids, setIds] = useState<any>();

    const [dataTicketedit, setDataTicketedit] = useState({
        STT: ids,
        bookingcode: "",
        ticketnumber: 0,
        status: { name: "", classstatus: "" },
        useddate: "",
        releasedate: "",
        checkinport: "",
    });

    const handleSubmit3 = (e: any) => {
        setIds(e);
        dataTicket.map((dd: any) => (
            dd.STT === e ? (
                setDataTicketedit(dd)
            ) : ("")
        ))
        if (dataTicketedit.STT) {
            setIsModalVisible3(true)
        }
    };

    // Ngày áp dụng
    const ondate1edit = (date: any, dateString: any) => {
        dataTicketedit.useddate = dateString
    };

    const handleOk3 = () => {
        if (dataTicketedit.status.name === "Đang áp dụng") {
            dataTicketedit.status.classstatus = "dang-ap-dung"
        } else if (dataTicketedit.status.name === "Tắt") {
            dataTicketedit.status.classstatus = "tat"
        }
        if (dataTicketedit.bookingcode === "") {
            setValidateCheck2("check")
            setValidateInfo2("Mã gói vé")
        } else {
            update(ref(dbrealtime, `ticket/TicketLists/${ids}`), {
                STT: ids,
                bookingcode: dataTicketedit.bookingcode,
                ticketnumber: dataTicketedit.ticketnumber,
                status: { name: dataTicketedit.status.name, classstatus: dataTicketedit.status.classstatus },
                useddate: dataTicketedit.useddate,
                releasedate: dataTicketedit.releasedate,
                checkinport: dataTicketedit.checkinport,
            }).then(() => {
                console.log("ok");
            })
                .catch((error: any) => {
                    alert(error);
                });
            setIsModalVisible3(false);
        }
    };

    const handleCancel3 = () => {
        setIsModalVisible3(false);
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
        <div className='TicketListEvent-Component'>
            <Layout>
                <LeftMenu KeysMenu="5" />
                <Layout>
                    <Content className='right-content'>
                        <ProfileAndFilter />
                        <div className="TicketListEvent-content">
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
                                    </Tooltip>
                                    <Modal title="Basic Modal" visible={isModalVisible3} onOk={handleOk3} onCancel={handleCancel3} okText="Lưu" cancelText="Hủy">
                                        <div className='Pop-Up'>
                                            <h3>Đổi ngày sử dụng vé</h3>
                                            <div className="infos">
                                                <div className="left-infos">
                                                    <p>Số vé</p>
                                                    <p>Số vé</p>
                                                    <p>Tên sự kiện</p>
                                                    <p>Hạn sử dụng</p>
                                                </div>
                                                <div className="right-infos">
                                                    <p>PKG20210502</p>
                                                    <p>Vé cổng - Gói sự kiện</p>
                                                    <p className='final'>Hội trợ triển lãm hàng tiêu dùng 2021</p>
                                                    <DatePicker placeholder='01/04/2021' defaultValue={moment(`${dataTicketedit.useddate}`, dateFormatList[0])} suffixIcon={<DateSVG />} className='datePicker' format={dateFormatList} onChange={ondate1edit} />
                                                </div>
                                            </div>
                                            {
                                                (ValidateCheck2) === "check" ? (
                                                    <Tooltip title={ValidateInfo2}>
                                                        <span style={{ color: "red" }}>Vùi lòng điều đủ thông tin.</span>
                                                    </Tooltip>
                                                ) : ("")
                                            }
                                        </div>
                                    </Modal>
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

export default TicketListEventComponent;