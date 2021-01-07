import React, { useEffect, useState, useRef } from 'react';
import { Form, Layout, Row, Col, Card, Modal, Button, Popconfirm, Table, Input, notification, Select, DatePicker } from 'antd';
import {
    DeleteOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined,
    CloseCircleOutlined,
    PrinterOutlined,
    DollarCircleOutlined,
    EditOutlined,
    UserAddOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { createupdate, getall, remove, getbyid, getallpost, uploadsinglefile } from '../api/api';
import { Typography } from 'antd';
import { Link, browserHistory } from 'react-router';
import { isLogin } from '../reducer/LocalStoradge';
import renderHTML from 'react-render-html';
import styled from 'styled-components';
import moment from 'moment';
import axios from 'axios';
import ReactQuill, { Quill } from 'react-quill';
moment.locale('id')

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const InputBoxAbove = styled.div`
    border: 1px solid #a5b1c2;
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px 5px 0px 0px ;
`;
const InputBoxCenter = styled.div`
    border-left: 1px solid #a5b1c2;
    border-right: 1px solid #a5b1c2;
    border-bottom: 1px solid #a5b1c2;
    padding: 10px;
`;

const InputBoxBottom = styled.div`
    border-bottom: 1px solid #a5b1c2;
    border-left: 1px solid #a5b1c2;
    border-right: 1px solid #a5b1c2;
    padding: 10px;
    border-radius: 0px 0px 5px 5px;
`;

const Judul = styled.input`
    width: 100%;
    border: 0px;
    font-family: 'Montserrat', sans-serif;
    margin-top: 20px;
    &:focus{
        outline: none;
    }
`;

const Label = styled.p`
    margin-bottom: 2px;
    font-weight: bold;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
`;

const Buttonx = styled.button`
    margin-top: 20px;
    background-color:#4b7bec;
    border: 1px solid #4b7bec;
    border-radius: 5px;
    color: white;
    padding: 7px;
    float: right;
    cursor: pointer;
    font-weight: bold;
    width: 100%;
    &:hover{
        color: #3498db;
        border: 1px solid #3498db;
        font-weight: bold;
    }
`;

const Inputx = styled.input`
    width: 100%;
    border: 0px;
    font-family: 'Montserrat', sans-serif;
    &:focus{
        outline: none;
    }
`;



function Pemohon() {
    const [theme, setTheme] = useState('snow')
    const [modal, setModal] = useState(false)
    const [pemohonlist, setPemohonList] = useState([])


    useEffect(() => {
        getpemohonall()
    },[])

    const modalTrigger = () => {
        setModal(!modal)
    }


    const getpemohonall = async () => {
        const data = []
        const url = 'getpemohon'
        let pemohon = await getall(url)

        let data_length = pemohon.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: pemohon[i].id,
                nik: pemohon[i].nik,
                nama_lengkap: pemohon[i].nama_lengkap,
                email: pemohon[i].email,
                no_hp: pemohon[i].no_hp,
            })
        }
        // setImagePath(banner.host)
        setPemohonList(data)
    }

 
    const columns = [
        {
            title: 'Nomor',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'NIK',
            key: 'nik',
            render: (text, record) => (
                <div>
                    <b>{record.nik}</b>
                </div>
            )
        },
        {
            title: 'Nama',
            key: 'nama',
            render: (text, record) => (
                <div>
                    <b>{record.nama_lengkap}</b>
                </div>
            )
        },
        {
            title: 'Email',
            key: 'email',
            render: (text, record) => (
                <div>
                    <b>{record.email}</b>
                </div>
            )
        },
        {
            title: 'No HP',
            key: 'nohp',
            render: (text, record) => (
                <div>
                    <b>{record.no_hp}</b>
                </div>
            )
        },
      
    ];

    return (
        <Content
            //className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: '100%',
            }}
        >

            <Card
                title="Daftar Pemohon / User"
                style={{ width: '100%', marginBottom: 20 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
            />

            <Table columns={columns} dataSource={pemohonlist} />

        </Content>
    )
}



export default Pemohon