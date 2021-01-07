import React, { useEffect, useState } from 'react';
import { Layout, Select, Row, Col, Card, Modal, Button, Popconfirm, Table, Input, notification, Form, Radio } from 'antd';
import {
    DeleteOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { createupdate, getall, remove, getbyid } from '../api/api';
import { Typography } from 'antd';
import { Link, browserHistory } from 'react-router';
import { isLogin } from '../reducer/LocalStoradge'
import styled from 'styled-components';


const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

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

function Bidang() {

    const [modal, setModal] = useState(false)

    const [listBidang, setListBidang] = useState([])
    const [id, setId] = useState('')
    const [nama_bidang, setNamaBidang] = useState('')
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isUpdate, setIsUpdate] = useState('')


    useEffect(() => {
        getbidang()
    }, []);



    const modelTrigger = () => {
        setModal(!modal)
    }

    const getBidangById = async (id) => {
        const url = 'getbidangbyid'
        let bidangbyid = await getbyid(id, url)
        console.log(bidangbyid)
        setId(id)
        setIsUpdate(true)
        setNamaBidang( bidangbyid[0].nama_bidang)
        setUserName( bidangbyid[0].username)
        setPassword(bidangbyid[0].password)
        modelTrigger()
    }

   
    const getbidang= async () => {
        const data = []
        const url = 'getbidang'
        let bidang = await getall(url)

        let data_length = bidang.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id_bidang: bidang[i].id_bidang,
                nama_bidang: bidang[i].nama_bidang,
                username: bidang[i].username,
            })
        }
        setListBidang(data)

    }

    const removebidang = async (id) => {
        const url = 'deletebidang'
        const hapus = await remove(id, 'deletebidang')
        console.log(hapus)
        if (hapus === 1) {
            notification.open({
                message: 'Data Berhasil dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getbidang()
        }
    }

    const create = async () => {
        if (username === '' || nama_bidang === '' || password === '') {
            notification.open({
                message: 'Gagal Menyimnpan',
                description:
                    'Form tidak boleh kosong',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        } else {
            let datas = {
                nama_bidang,
                username,
                password,
            }
            console.log(isUpdate)
            const apiurl = 'createbidang';
            console.log(apiurl)
            let createbidang = await createupdate(datas, apiurl)
            if (createbidang === 1) {
                notification.open({
                    message: 'Data Berhasil disimpan',
                    description:
                        '',
                    icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
                });
                getbidang()
                modelTrigger()
                resetForm()
            } else {
                notification.open({
                    message: 'Gagal Menyimpan Data',
                    description:
                        '',
                    icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
                });
            }
        }
    }

    const update = async () => {
        if (username === '' || nama_bidang === '') {
            notification.open({
                message: 'Gagal Menyimnpan',
                description:
                    'Form tidak boleh kosong',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        } else {
            let datas = {
                id,
                nama_bidang,
                username,
                password,
            }
            console.log(isUpdate)
            const apiurl = 'updatebidang';
            console.log(apiurl)
            let updatebidang = await createupdate(datas, apiurl)
            if (updatebidang === 1) {
                notification.open({
                    message: 'Data Berhasil disimpan',
                    description:
                        '',
                    icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
                });
                getbidang()
                modelTrigger()
                resetForm()
            } else {
                notification.open({
                    message: 'Gagal Menyimpan Data',
                    description:
                        '',
                    icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
                });
            }
        }
    }

    const createorupdate = () => {
        isUpdate ? update() : create()
    }

    const createnew = async () => {
        modelTrigger()
        setIsUpdate(false)
        resetForm()
    }

    const resetForm = () => {
        setNamaBidang('')
        setUserName('')
        setPassword('')
        setId('')
    }

    const columns = [
        {
            title: 'Nomor',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Nama Seksi/Bidang',
            key: 'nama_bidang',
            dataIndex: 'nama_bidang'
        },
        {
            title: 'Username',
            key: 'username',
            dataIndex: 'username'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button key="edit" onClick={() => getBidangById(record.id_bidang)} style={{ marginLeft: 10 }} type="primary" icon={<InfoCircleOutlined />} >Edit</Button>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => removebidang(record.id_bidang)}
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
            // className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: '100%',
                
            }}
        >

            <Card
                title="Seksi / Bidang"
                //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                extra={<Button type="dashed" onClick={createnew}>Tambah Seksi / Bidang </Button>}
                style={{ width: '100%', borderWidth: 0, marginBottom: 20 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20,  }}
            />

            <Table columns={columns} dataSource={listBidang} />

            <Modal
                title="Tambah Seksi / Bidang"
                centered
                visible={modal}
                onOk={createorupdate}
                onCancel={modelTrigger}
                width={1000}
            >
                <InputBoxAbove style={{ backgroundColor: '#f7d794' }}>
                    <Label>Data Administrator Seksi/Bidang</Label>
                </InputBoxAbove>
                <InputBoxCenter>
                    <Label>Nama Bidang</Label>
                    <Inputx placeholder="Nama Seksi / Bidang" value={nama_bidang} onChange={e => setNamaBidang(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Username</Label>
                    <Inputx placeholder="Username" value={username} onChange={e => setUserName(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Password</Label>
                    <Inputx placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                </InputBoxCenter>
              
            </Modal>

        </Content>
    )
}

export default Bidang;



