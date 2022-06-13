import React from 'react';
import { Layout, Menu } from 'antd';
import './style.scss';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useNavigate } from 'react-router-dom';
import { HomeSVG } from './icon/homeSVG';
import { SettingSVG } from './icon/settingSVG';
import { TicketcheckSVG } from './icon/ticketcheckSVG';
import { TicketlistSVG } from './icon/ticketlistSVG';
import { ListeventSVG } from './icon/listeventSVG';

const { Sider } = Layout;

export interface ILeftMenuProps { KeysMenu:string }

const LeftMenu: React.FC<ILeftMenuProps> = ({KeysMenu}: ILeftMenuProps) => {
    const navigate = useNavigate()
    
    const LinkProfile = () =>{
        navigate('/profile/1')
    }

    const LinkHome = () =>{
        navigate('/')
    }

    const LinkTicketList = () =>{
        navigate('/ticket-list')
    }

    const LinkTicketCheck = () =>{
        navigate('/ticket-check')
    }

    const LinkTicketListEvent = () =>{
        navigate('/ticket-list-event')
    }

    const LinkServicePark = () =>{
        navigate('/service-pack')
    }

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div className="logo" onClick={LinkProfile}/>
            <Menu theme="light" mode="vertical" defaultSelectedKeys={[KeysMenu]} defaultOpenKeys={[KeysMenu]}>
                <SubMenu key="1" icon={<HomeSVG />} title='Trang chủ' onTitleClick={LinkHome}>
                </SubMenu>
                <SubMenu key="2" icon={<TicketlistSVG />} title='Quản lý vé' onTitleClick={LinkTicketList}>
                </SubMenu>
                <SubMenu key="3" icon={<TicketcheckSVG />} title='Đối soát vé' onTitleClick={LinkTicketCheck}>  
                </SubMenu>
                <SubMenu key="5" icon={<ListeventSVG />} title='Danh sách sự kiện' onTitleClick={LinkTicketListEvent}>  
                </SubMenu>
                <SubMenu icon={<SettingSVG />} title="Cài đặt" className='Setting'>
                    <Menu.Item key="7" className='setting-item-one' onClick={LinkServicePark}>Gói dịch vụ</Menu.Item>
                </SubMenu>
                <SubMenu key="4" title='Gói dịch vụ' onTitleClick={LinkServicePark} className="service-park">  
                </SubMenu>
            </Menu>
            <p className='copy-right'>Copyright &copy; 2020 Alta Software</p>
        </Sider>
    );
};

export default LeftMenu;