import React, { useEffect, useState } from 'react';
import { Layout, Space, Input, Table, Button, Tooltip, Modal, DatePicker, Form, TimePicker, Checkbox, Row, Col, Select } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import LeftMenu from '../../../../components/Left-menu';
import ProfileAndFilter from '../../../../components/Profile-And-Filter';
import './style.scss';
import { dbrealtime } from '../../../../config/config';
import { onValue, ref, set, update } from '@firebase/database';
import moment from "moment";
import { FilterSVG } from './icon/filterSVG';
import { DotSVG } from './icon/dotSVG';
import { DateSVG } from './icon/dateSVG';
import { UpdateSVG } from './icon/updateSVG';
import { TimeSVG } from './icon/timeSVG';
import { DownSVG } from './icon/downSVG';

const { Content } = Layout;

export interface IServicePackComponentProps { }

const ServicePackComponent: React.FC<IServicePackComponentProps> = () => {
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
    const columns: any = [
        {
            title: 'STT',
            dataIndex: 'STT',
            className: `stt-one`,
        },
        {
            title: 'Mã gói',
            dataIndex: 'code',
            className: 'stt-two',
        },
        {
            title: 'Tên gói vé',
            dataIndex: 'name',
            className: 'stt-three',
        },
        {
            title: 'Ngày áp dụng',
            dataIndex: 'submissiondate',
            className: 'stt-four',
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'expirationdate',
            className: 'stt-five',
        },
        {
            title: 'Giá vé (VNĐ/Vé)',
            dataIndex: 'price',
            className: 'stt-six',
        },
        {
            title: 'Giá Combo (VNĐ/Combo)',
            dataIndex: 'comboprice',
            className: 'stt-seven',
        },
        {
            title: 'Tình trạng',
            dataIndex: 'status',
            className: 'stt-eight',
            render: (text: any) => <div className={`${text.classstatus}`}> <DotSVG /> {text.name}</div>,
        },
        {
            title: '',
            dataIndex: 'STT',
            className: 'stt-final',
            render: (text: any) => <div onClick={() => handleSubmit3(text)} style={{ cursor: "pointer" }}><UpdateSVG /> Cập nhật</div>,
        },
    ];

    const [dataTicket, setDataTicket] = useState<any[]>([]);

    useEffect(() => {
        onValue(ref(dbrealtime), (snapshot: any) => {
            const data = snapshot.val().ticket.Packages;
            if (data !== null) {
                setDataTicket(data)
            }
        })
    }, [])

    // xuất file
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

    //.............//
    //  THÊM VÉ   //
    //...........//
    const ss = (Math.max.apply(Math, dataTicket.map(function (o: any) { return o.STT; })));

    const dd = ss + 1;
    const [details, setDetails] = useState({
        STT: dd,
        code: 'ALT20210501',
        name: "",
        submissiondate: "",
        submissiondatedate: "",
        submissiondatetime: "",
        expirationdate: "",
        expirationdatedate: "",
        expirationdatetime: "",
        price: "",
        comboprice: "",
        status: { name: "Đang áp dụng", classstatus: "dang-ap-dung" },
    });

    // Ngày áp dụng
    const [ondateone, setOndateone] = useState("");
    const [ontimeone, setOntimeone] = useState("");
    const ondate1 = (date: any, dateString: any) => {
        setOndateone(dateString);
    };
    const ontime1 = (time: any, timeString: any) => {
        setOntimeone(timeString);
    };

    // Ngày hết hạn
    const [ondatetwo, setOndatetwo] = useState("");
    const [ontimetwo, setOntimetwo] = useState("");
    const ondate2 = (date: any, dateString: any) => {
        setOndatetwo(dateString);
    };
    const ontime2 = (time: any, timeString: any) => {
        setOntimetwo(timeString);
    };

    // Giá vé áp dụng
    const [pricess, setpricess] = useState({ pricealone: '', pricecombo: '', numbers: '' });
    const onChanges = (e: any) => {
        console.log('checked = ', e);
    };

    // Status
    const StatusOptions = [{ value: 'Đang áp dụng' }, { value: 'Tắt' }];

    const [ValidateCheck, setValidateCheck] = useState("");
    const [ValidateInfo, setValidateInfo] = useState("");
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [valuepricealone, setvaluepricealone] = useState<any>("");
    const [valuepricecombo, setvaluepricecombo] = useState<any>("");
    const handleOk2 = () => {
        const submissiondates = `${ondateone} ${ontimeone}`;
        const expirationdatea = `${ondatetwo} ${ontimetwo}`;
        // const valuepricealone = `${pricess.pricealone} VNĐ`;
        // const valuepricecombo = `${pricess.pricecombo} VNĐ/${pricess.numbers} Vé`;
        if(pricess.pricealone === ""){
            setvaluepricealone("")
        }else{
            setvaluepricealone(`${pricess.pricealone} VNĐ`)
        }
        if(pricess.pricecombo === ""){
            setvaluepricecombo("")
        }else{
            setvaluepricecombo(`${pricess.pricecombo} VNĐ/${pricess.numbers} Vé`)
        }
        if (details.status.name === "Đang áp dụng") {
            details.status.classstatus = "dang-ap-dung"
        } else if (details.status.name === "Tắt") {
            details.status.classstatus = "tat"
        }
        if (details.name === "") {
            setValidateCheck("check")
            setValidateInfo("Tên gói vé")
        } else if (ondateone === "") {
            setValidateCheck("check")
            setValidateInfo("Ngày áp dụng (Ngày)")
        } else if (ontimeone === "") {
            setValidateCheck("check")
            setValidateInfo("Ngày áp dụng (Giờ)")
        } else if (ondatetwo === "") {
            setValidateCheck("check")
            setValidateInfo("Ngày hết hạn (Ngày)")
        } else if (ontimetwo === "") {
            setValidateCheck("check")
            setValidateInfo("Ngày hết hạn (Giờ)")
        } else {
            set(ref(dbrealtime, `ticket/Packages/${ss}`), {
                STT: dd,
                code: details.code,
                name: details.name,
                submissiondate: submissiondates,
                submissiondatedate: ondateone,
                submissiondatetime: ontimeone,
                expirationdate: expirationdatea,
                expirationdatedate: ondatetwo,
                expirationdatetime: ontimetwo,
                price: valuepricealone,
                comboprice: valuepricecombo,
                status: { name: details.status.name, classstatus: details.status.classstatus },
            }).then(() => {
                console.log("ok");
            })
                .catch((error: any) => {
                    alert(error);
                });
            setIsModalVisible2(false);
        }
    };
    const handleCancel2 = () => {
        setValidateCheck("")
            setValidateInfo("")
        setIsModalVisible2(false);
    };
    const handleSubmit2 = (e: any) => {
        e.preventDefault();
        setIsModalVisible2(true);
    };

    //.................//
    //   CẬP NHẬT VÉ   //
    //.................//
    const [ValidateCheck2, setValidateCheck2] = useState("");
    const [ValidateInfo2, setValidateInfo2] = useState("");
    const [isModalVisible3, setIsModalVisible3] = useState(false);
    const [ids, setIds] = useState<any>();
    const [dataTicketedit, setDataTicketedit] = useState({
        STT: ids,
        code: "",
        name: "",
        submissiondate: "",
        submissiondatedate: "",
        submissiondatetime: "",
        expirationdate: "",
        expirationdatedate: "",
        expirationdatetime: "",
        price: "",
        comboprice: "",
        status: { name: "", classstatus: "" },
    });
    const handleSubmit3 = (e: any) => {
        setIds(e);
        dataTicket.map((dd: any) => (
            dd.STT === e ? (
                setDataTicketedit(dd)
            ) : ("")
        ))
        if(dataTicketedit.STT){
            setIsModalVisible3(true)
        }
    };

    const linkID = ids-1;

    // Ngày áp dụng
    const ondate1edit = (date: any, dateString: any) => {
        dataTicketedit.submissiondatedate = dateString
    };
    const ontime1edit = (time: any, timeString: any) => {
        dataTicketedit.submissiondatetime = timeString
    };

    // Ngày hết hạn
    const ondate2edit = (date: any, dateString: any) => {
        dataTicketedit.expirationdatedate = dateString
    };
    const ontime2edit = (time: any, timeString: any) => {
        dataTicketedit.expirationdatetime = timeString
    };

    // Giá vé áp dụng
    const [pricessedit, setpricessedit] = useState({ pricealone: '', pricecombo: '', numbers: '' });
    const onChangesedit = (e: any) => {
        console.log('checked = ', e);
    };
    
    // Status
    const StatusOptionsedit = [{ value: 'Đang áp dụng' }, { value: 'tắt' }];

    const handleOk3 = () => {
        const submissiondates = `${dataTicketedit.submissiondatedate} ${dataTicketedit.submissiondatetime}`;
        const expirationdatea = `${dataTicketedit.expirationdatedate} ${dataTicketedit.expirationdatetime}`;

        if (dataTicketedit.status.name === "Đang áp dụng") {
            dataTicketedit.status.classstatus = "dang-ap-dung"
        } else if (dataTicketedit.status.name === "Tắt") {
            dataTicketedit.status.classstatus = "tat"
        }
        if (dataTicketedit.code==="") {
            setValidateCheck2("check")
            setValidateInfo2("Mã gói vé")
        }else if (dataTicketedit.name === "") {
            setValidateCheck2("check")
            setValidateInfo2("Tên gói vé")
        } else if (dataTicketedit.submissiondatedate === "") {
            setValidateCheck2("check")
            setValidateInfo2("Ngày áp dụng (Ngày)")
        } else if (dataTicketedit.submissiondatetime === "") {
            setValidateCheck2("check")
            setValidateInfo2("Ngày áp dụng (Giờ)")
        } else if (dataTicketedit.expirationdatedate === "") {
            setValidateCheck2("check")
            setValidateInfo2("Ngày hết hạn (Ngày)")
        } else if (dataTicketedit.expirationdatetime === "") {
            setValidateCheck2("check")
            setValidateInfo2("Ngày hết hạn (Giờ)")
        } else {
            update(ref(dbrealtime, `ticket/Packages/${linkID}`), {
                STT: ids,
                code: dataTicketedit.code,
                name: dataTicketedit.name,
                submissiondate: submissiondates,
                submissiondatedate: dataTicketedit.submissiondatedate,
                submissiondatetime: dataTicketedit.submissiondatetime,
                expirationdate: expirationdatea,
                expirationdatedate: dataTicketedit.expirationdatedate,
                expirationdatetime: dataTicketedit.expirationdatetime,
                status: { name: dataTicketedit.status.name, classstatus: dataTicketedit.status.classstatus },
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
        setValidateCheck2("")
            setValidateInfo2("")
        setIsModalVisible3(false);
    };

    return (
        <div className='ServicePack-Component'>
            <Layout>
                <LeftMenu KeysMenu="4" />
                <Layout>
                    <Content className='right-content'>
                        <ProfileAndFilter />
                        <div className="ServicePack-content">
                            <h2>Danh sách vé</h2>
                            <div className='Ticket-filter'>
                                <div className="left-filter">
                                    <Space direction="vertical" size={12}>
                                        <Input type='text' placeholder="Search" suffix={<FilterSVG />} />
                                    </Space>
                                </div>
                                <div className="right-profile">
                                    <Tooltip title="Xuất file">
                                        <Button className='down-file' onClick={handleSubmit}>Xuất file (.csv)</Button>
                                    </Tooltip>
                                    <Tooltip title="Lọc vé">
                                        <Button className='fill-check' onClick={handleSubmit2}>Thêm gói vé</Button>
                                    </Tooltip>
                                    <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Lưu" cancelText="Hủy">
                                        <div className='Pop-Up'>
                                            <h3>Ngày sử dụng vé</h3>
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
                                                    <DatePicker placeholder='15/04/2021' suffixIcon={<DateSVG />} />
                                                </div>
                                            </div>
                                        </div>
                                    </Modal>
                                    <Modal title="Basic Modal" visible={isModalVisible2} onOk={() => handleOk2()} onCancel={handleCancel2} okText="Lưu" cancelText="Hủy" className='modal-filters'>
                                        <div className='Pop-Up-create'>
                                            <h2>Thêm gói vé</h2>
                                            <div className="package">
                                                <Form>
                                                    <Form.Item name="role-code" className='role-code'>
                                                        <label htmlFor="role-code">Tên gói vé </label> <br />
                                                        <Input placeholder='Nhập tên gói vé' onChange={(e: any) => setDetails({ ...details, name: e.target.value })} value={details.name || ""} />
                                                    </Form.Item>
                                                    <div className="date-time">
                                                        <div className="applicable-date">
                                                            <div className="applicable-date-title">Ngày áp dụng</div>
                                                            <DatePicker placeholder='dd/mm/yy' suffixIcon={<DateSVG />} className='datePicker' format={dateFormatList} onChange={ondate1} />
                                                            <TimePicker placeholder='hh:mm:ss' suffixIcon={<TimeSVG />} onChange={ontime1} />
                                                        </div>
                                                        <div className="expiration-date">
                                                            <div className="expiration-date-title">Ngày hết hạn</div>
                                                            <DatePicker placeholder='dd/mm/yy' suffixIcon={<DateSVG />} className='datePicker' format={dateFormatList} onChange={ondate2} />
                                                            <TimePicker placeholder='hh:mm:ss' suffixIcon={<TimeSVG />} onChange={ontime2} />
                                                        </div>
                                                    </div>
                                                    <div className="applicable-fare">
                                                        <div className="applicable-fare-title">Giá vé áp dụng</div>
                                                        <div className="applicable-fare-details">
                                                            <Checkbox.Group style={{ width: '100%' }} onChange={onChanges} >
                                                                <Row>
                                                                    <Col span={20}>
                                                                        <Checkbox value={`${pricess.pricealone} VNĐ`}>
                                                                            Vé lẻ (vnđ/vé) với giá &nbsp; <Input placeholder='Giá vé' type="number" onChange={(e: any) => setpricess({ ...pricess, pricealone: e.target.value })} value={pricess.pricealone || ""} /> &nbsp; / vé
                                                                        </Checkbox>
                                                                    </Col>
                                                                    <Col span={20}>
                                                                        <Checkbox value={`${pricess.pricecombo} VNĐ/${pricess.numbers} Vé`}>
                                                                            Combo vé với giá &nbsp; <Input placeholder='Giá vé' type="number" onChange={(e: any) => setpricess({ ...pricess, pricecombo: e.target.value })} value={pricess.pricecombo || ""} /> &nbsp; / &nbsp; <Input placeholder='Giá vé' className='input-two' type="number" onChange={(e: any) => setpricess({ ...pricess, numbers: e.target.value })} value={pricess.numbers || ""} />&nbsp; vé
                                                                        </Checkbox>
                                                                    </Col>
                                                                </Row>
                                                            </Checkbox.Group>
                                                        </div>
                                                    </div>
                                                    <div className="status">
                                                        <div className="status-title">Tình trạng</div>
                                                        <div className="status-details">
                                                            <Select
                                                                suffixIcon={<DownSVG />}
                                                                style={{ width: '100%' }}
                                                                placeholder="Chọn dịch vụ"
                                                                options={StatusOptions}
                                                                className="service-item"
                                                                defaultValue={"Đang áp dụng"}
                                                                onChange={(e: any) => setDetails({ ...details, status: { name: e || 'Đang áp dụng', classstatus: '' } })}
                                                            />
                                                        </div>
                                                    </div>
                                                    {
                                                        (ValidateCheck) === "check" ? (
                                                            <Tooltip title={ValidateInfo}>
                                                                <span style={{ color: "red" }}>Vùi lòng điều đủ thông tin.</span>
                                                            </Tooltip>
                                                        ) : (<Form.Item label='Là trường thông tin bắt buộc' className='final-required' name="s" rules={[{ required: true }]}></Form.Item>)
                                                    }
                                                </Form>
                                            </div>
                                        </div>
                                    </Modal>
                                    <Modal title="Basic Modal" visible={isModalVisible3} onOk={handleOk3} onCancel={handleCancel3} okText="Lưu" cancelText="Hủy" className='modal-filters'>
                                        <div className='Pop-Up-create'>
                                            <h2>Cập nhật thông tin gói vé</h2>
                                            <div className="package">
                                                <Form>
                                                    <div className="event">
                                                        <Form.Item name="role-code" className='role-code event-code'>
                                                            <label htmlFor="role-code">Mã sự kiện </label> <br />
                                                            <Input onChange={(e: any) => setDataTicketedit({ ...dataTicketedit, code: e.target.value })} value={dataTicketedit?.code} />
                                                        </Form.Item>
                                                        <Form.Item name="role-code" className='role-code event-name'>
                                                            <label htmlFor="role-code">Tên sự kiện </label> <br />
                                                            <Input onChange={(e: any) => setDataTicketedit({ ...dataTicketedit, name: e.target.value })} value={dataTicketedit?.name} />
                                                        </Form.Item>
                                                    </div>
                                                    <div className="date-time">
                                                        <div className="applicable-date">
                                                            <div className="applicable-date-title">Ngày áp dụng</div>
                                                            <DatePicker placeholder='01/04/2021' defaultValue={moment(`${dataTicketedit.submissiondatedate}`, dateFormatList[0])} suffixIcon={<DateSVG />} className='datePicker' format={dateFormatList} onChange={ondate1edit}/>
                                                            <TimePicker placeholder='08:00:00' defaultValue={moment(`${dataTicketedit.submissiondatetime}`, 'HH:mm:ss')} suffixIcon={<TimeSVG />} onChange={ontime1edit}/>
                                                        </div>
                                                        <div className="expiration-date">
                                                            <div className="expiration-date-title">Ngày hết hạn</div>
                                                            <DatePicker placeholder='01/04/2021' defaultValue={moment(`${dataTicketedit.expirationdatedate}`, dateFormatList[0])} suffixIcon={<DateSVG />} className='datePicker'format={dateFormatList} onChange={ondate2edit} />
                                                            <TimePicker placeholder='08:00:00' defaultValue={moment(`${dataTicketedit.expirationdatetime}`, 'HH:mm:ss')} suffixIcon={<TimeSVG />} onChange={ontime2edit} />
                                                        </div>
                                                    </div>
                                                    <div className="applicable-fare">
                                                        <div className="applicable-fare-title">Giá vé áp dụng</div>
                                                        <div className="applicable-fare-details">
                                                            <Checkbox.Group style={{ width: '100%' }} onChange={onChangesedit} >
                                                                <Row>
                                                                    <Col span={20}>
                                                                        <Checkbox value={`${pricessedit.pricealone} VNĐ`}>
                                                                            Vé lẻ (vnđ/vé) với giá &nbsp; <Input placeholder='Giá vé' type="number" onChange={(e: any) => setpricessedit({ ...pricessedit, pricealone: e.target.value })} value={pricessedit.pricealone || ""} /> &nbsp; / vé
                                                                        </Checkbox>
                                                                    </Col>
                                                                    <Col span={20}>
                                                                        <Checkbox value={`${pricessedit.pricecombo} VNĐ/${pricessedit.numbers} Vé`}>
                                                                            Combo vé với giá &nbsp; <Input placeholder='Giá vé' type="number" onChange={(e: any) => setpricessedit({ ...pricessedit, pricecombo: e.target.value })} value={pricessedit.pricecombo || ""} /> &nbsp; / &nbsp; <Input placeholder='Giá vé' className='input-two' type="number" onChange={(e: any) => setpricessedit({ ...pricessedit, numbers: e.target.value })} value={pricessedit.numbers || ""} />&nbsp; vé
                                                                        </Checkbox>
                                                                    </Col>
                                                                </Row>
                                                            </Checkbox.Group>
                                                        </div>
                                                    </div>
                                                    <div className="status">
                                                        <div className="status-title">Tình trạng</div>
                                                        <div className="status-details">
                                                        <Select
                                                                suffixIcon={<DownSVG />}
                                                                style={{ width: '100%' }}
                                                                placeholder="Chọn dịch vụ"
                                                                options={StatusOptionsedit}
                                                                className="service-item"
                                                                value={dataTicketedit.status.name}
                                                                onChange={(e: any) => setDataTicketedit({ ...dataTicketedit, status: { name: e || "Đang áp dụng", classstatus: 'dang-ap-dung' } })}
                                                            />
                                                        </div>
                                                    </div>
                                                    {
                                                        (ValidateCheck2) === "check" ? (
                                                            <Tooltip title={ValidateInfo2}>
                                                                <span style={{ color: "red" }}>Vùi lòng điều đủ thông tin.</span>
                                                            </Tooltip>
                                                        ) : (<Form.Item label='Là trường thông tin bắt buộc' className='final-required' name="s" rules={[{ required: true }]}></Form.Item>)
                                                    }
                                                </Form>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                            <div className="number-details">
                                <Table rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'} columns={columns} dataSource={dataTicket} pagination={{ pageSize: 2, prevIcon: <CaretLeftOutlined />, nextIcon: <CaretRightOutlined /> }} />
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default ServicePackComponent;