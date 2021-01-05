import React, { useEffect, useState, useRef } from 'react';
import { Form, Layout, Row, Col, Card, Modal, Button, Popconfirm, Table, Input, notification, Select, DatePicker, Tag } from 'antd';
import {
    DeleteOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined,
    CloseCircleOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { uploadsinglefile, getall, createupdate, remove } from '../api/api';
import { Typography } from 'antd';
import { Link, browserHistory } from 'react-router';
import { isLogin } from '../reducer/LocalStoradge';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';
import moment from 'moment';
import axios from 'axios';
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


function Banner() {

    const [modal, setModal] = useState(false)
    const [deskripsi, setDeskripsi] = useState('')
    const [selectedfile, setSelectedFiles] = useState([])
    const [filetoupload, setFileToUpload] = useState([])

    const [bannerlist, setListBanner] = useState([])
    const [imagepath, setImagePath] = useState('')

    useEffect(() => {
        getbanner()
    }, [])

    const modalTrigger = () => {
        setModal(!modal)
    }

    const getbanner = async () => {
        const data = []
        const url = 'getbannerall'
        let banner = await getall(url)

        console.log(banner)

        let data_length = banner.banner.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id_banner: banner.banner[i].id_banner,
                img: banner.banner[i].file,
                aktif: banner.banner[i].aktif,
                deskripsi: banner.banner[i].deskripsi
            })
        }
        setImagePath(banner.host)
        setListBanner(data)
    }

    const upload = async () => {
        const formData = new FormData();
        formData.append('img', filetoupload)
        formData.append('deskripsi', deskripsi)
        let url = 'uploadbanner'
        const uploadfile = await uploadsinglefile(formData, url)
        if (uploadfile === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getbanner()
            modalTrigger()
            resetform()
        } else {
            notification.open({
                message: 'Gagal Menyimpan Data',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        }
    }

    const activated = async(id, status) => {
        let datas = {
            id_banner: id,
            payload : {
                aktif: status
            }
        }

        const url = 'activedbanner'

        let activatedx = await createupdate(datas, url)
        if (activatedx === 1) {
            notification.open({
                message: 'Update Status Banner Berhasil',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getbanner()
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
        const url = 'delete_banner'
        const hapus = await remove(id, url)
        console.log(hapus)
        if (hapus === 1) {
            notification.open({
                message: 'Data Berhasil dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getbanner()
        }
    }

    const columns = [
        {
            title: 'Nomor',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Banner',
            key: 'banner',
            render: (text, record) => (
                <div>
                    <img src={`${imagepath}/${record.img}`}  style={{ width: 200 }} />
                </div>
            )
        },
        {
            title: 'Status',
            key: 'aktif',
            render: (text, record) => {
                if(record.aktif === 1){
                    return ( 
                        <Tag color="#87d068">Aktif</Tag>
                    )
                }else{
                    return ( 
                        <Tag color="#f50">Non Aktif</Tag>
                    )
                }
            }
        },
        {
            title: 'Deskripsi',
            key: 'deskripsi',
            dataIndex: 'deskripsi'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button key="aktifkan" style={{ marginLeft: 10 }} onClick={ () => { record.aktif === 1 ?  activated(record.id_banner, 0 ) : activated(record.id_banner, 1 )  } } type={record.aktif === 1 ? 'danger' : 'primary' } icon={<InfoCircleOutlined />} > {record.aktif === 1 ? 'Non Aktifkan' : 'Aktifkan' } </Button>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => hapus(record.id_banner)}
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

    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
        setFileToUpload(event.target.files[0])
        console.log(event.target.files)
    };

    const resetform = () => {
        setDeskripsi('')
        setFileToUpload('')
        setSelectedFiles([])
    }

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
                title="Mobile Banner"
                //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                extra={<Button type="dashed" onClick={modalTrigger}>Tambah Banner </Button>}
                style={{ width: '100%', marginBottom: 20 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
            />
            <Table columns={columns} dataSource={bannerlist} />

            <Modal
                title="Tambah Banner"
                centered
                visible={modal}
                onOk={upload}
                onCancel={modalTrigger}
                width={1000}
            >
                <InputBoxAbove>
                    <Label>Deskripsi</Label>
                    <Inputx placeholder="cth. Banner ucapan lebaran" value={deskripsi} onChange={e => setDeskripsi(e.target.value)} />
                </InputBoxAbove>
                <InputBoxBottom>
                    <Label>Banner</Label>
                    <Inputx type="file" onChange={selectFile} />
                </InputBoxBottom>
            </Modal>
        </Content>
    )
}

export default Banner