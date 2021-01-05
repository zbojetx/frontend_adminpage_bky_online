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
import ReactToPrint from 'react-to-print';
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



function Sosmed() {
    const [modal, setModal] = useState(false)
    const [akun, setAkun] = useState('')
    const [url, setUrl] = useState('')
    const [logo_url, setLogoUrl] = useState([])

    const [sosmedList, setSosmedList] = useState([])


    useEffect(() => {
        getsomedall()
    },[])

    const modalTrigger = () => {
        setModal(!modal)
    }

    

    const getsomedall = async () => {
        const data = []
        const url = 'getsosmed'
        let sosmed = await getall(url)

        let data_length = sosmed.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: sosmed[i].id,
                akun: sosmed[i].akun,
                logo_url: sosmed[i].logo_url,
                url: sosmed[i].url,
            })
        }
        // setImagePath(banner.host)
        setSosmedList(data)
    }

    const _createsosmed = async() => {
        const apiurl = 'createsosmed'
        const datas = {
         akun,
         url,
         logo_url
        }
        let createsosmed = await createupdate(datas, apiurl)
        if (createsosmed === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getsomedall()
            resetform()
            modalTrigger()
        } else {
            notification.open({
                message: 'Gagal Menyimpan Data',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        }
    }

    const hapus = async(id) => {
        const url = 'deletesosmed'
        const hapus = await remove(id, url)
        console.log(hapus)
        if (hapus === 1) {
            notification.open({
                message: 'Data Berhasil dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getsomedall()
        }
    }


    const resetform = () => {
        setAkun('')
        setUrl('')
        setLogoUrl('')
    }


    // const onChangeArtikel = value => {
    //     setArtikel(value)
    // }

    const columns = [
        {
            title: 'Nomor',
            key: 'no',
            dataIndex: 'no',
        },
        {

            title: 'Logo',
            key: 'akunurl',
            render: (text, record) => (
                <div>
                    <img src={record.logo_url} width={50} />
                </div>
            )
        },
        {
            title: 'Akun',
            key: 'akun',
            render: (text, record) => (
                <div>
                    <b>{record.akun}</b>
                </div>
            )
        }, 
        {

            title: 'Akun URL',
            key: 'akunurl',
            render: (text, record) => (
                <div>
                    <b>{record.url}</b>
                </div>
            )
        },
       
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => hapus(record.id)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button key="hapus" style={{ marginLeft: 10 }} type="danger" icon={<DeleteOutlined />} >Hapus</Button>
                    </Popconfirm>
                </span>
            ),
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
                title="Sosial Media"
                //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                extra={<Button type="dashed" onClick={modalTrigger}>Tambah Akun</Button>}
                style={{ width: '100%', marginBottom: 20 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
            />

            <Table columns={columns} dataSource={sosmedList} />

            <Modal
                title="Tambah Akun Sosial Media"
                centered
                visible={modal}
                onOk={_createsosmed}
                onCancel={modalTrigger}
                width={1000}
            >
                <InputBoxAbove>
                    <Label>Akun</Label>
                    <Inputx placeholder="Facebook" value={akun} onChange={e => setAkun(e.target.value)} />
                </InputBoxAbove>
                <InputBoxCenter>
                    <Label>URL</Label>
                    <Inputx placeholder="https://facebook.com/siunyil" value={url} onChange={e => setUrl(e.target.value)} />
                </InputBoxCenter>
                <InputBoxBottom>
                    <Label>Logo URL</Label>
                    <Inputx placeholder="https://facebook.com/siunyil" value={logo_url} onChange={e => setLogoUrl(e.target.value)} />
                </InputBoxBottom>
            </Modal>
        </Content>
    )
}




export default Sosmed