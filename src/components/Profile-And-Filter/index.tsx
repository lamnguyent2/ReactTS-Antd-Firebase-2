import React from 'react';
import { Space, Input, Avatar, Image } from 'antd';
import './style.scss';
import { FilterSVG } from './icon/filterSVG';
import { BellSVG } from './icon/bellSVG';
import { MailSVG } from './icon/mailSVG';

export interface IProfileAndFilterProps { }

const ProfileAndFilter: React.FC<IProfileAndFilterProps> = () => {

    return (
        <div className='Profile-filter'>
            <div className="left-filter">
                <Space direction="vertical" size={12}>
                    <Input type='text' placeholder="Search" suffix={<FilterSVG />} />
                </Space>
            </div>
            <div className="right-profile">
                <BellSVG />
                <MailSVG />
                <Avatar src={<Image src="../images/General/mini-profile.png" />} />
            </div>
        </div>
    );
};

export default ProfileAndFilter;