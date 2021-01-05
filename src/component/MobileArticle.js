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



function MobileArticle() {
    const [theme, setTheme] = useState('snow')
    const [modal, setModal] = useState(false)
    const [judul, setJudul] = useState('')
    const [artikel, setArtikel] = useState('')
    const [selectedfile, setSelectedFiles] = useState([])
    const [filetoupload, setFileToUpload] = useState([])

    const [artikelist, setArtikelList] = useState([])
    const [artikelpath, setArtikelPath] = useState('')


    useEffect(() => {
        getartikelall()
    },[])

    const modalTrigger = () => {
        setModal(!modal)
    }

    const upload = async () => {
        const formData = new FormData();
        formData.append('image', filetoupload)
        formData.append('judul', judul)
        formData.append('artikel', artikel)
        let url = 'create_artikel'
        const uploadfile = await uploadsinglefile(formData, url)
        if (uploadfile === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            //getbanner()
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

    const getartikelall = async () => {
        const data = []
        const url = 'getartikelall'
        let artikel = await getall(url)

        console.log(artikel)

        let data_length = artikel.artikel.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id_artikel: artikel.artikel[i].id_artikel,
                judul: artikel.artikel[i].judul,
                dibuat: artikel.artikel[i].created_at,
            })
        }
        // setImagePath(banner.host)
        setArtikelList(data)
    }


    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
        setFileToUpload(event.target.files[0])
        console.log(event.target.files)
    };

    const resetform = () => {
        setJudul('')
        setFileToUpload('')
        setSelectedFiles([])
    }


    const onChangeArtikel = value => {
        setArtikel(value)
    }

    const columns = [
        {
            title: 'Nomor',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Judul',
            key: 'judul',
            render: (text, record) => (
                <div>
                    <b>{record.judul}</b>
                </div>
            )
        }, {

            title: 'Tanggal',
            key: 'tanggal',
            render: (text, record) => (
                <div>
                    <b>{moment(record.dibuat).format('LL')}</b>
                </div>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button type="primary" > Edit </Button>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        //onConfirm={() => hapus(record.id_banner)}
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
                title="Berita / Artikel"
                //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                extra={<Button type="dashed" onClick={modalTrigger}>Tambah Berita / Artikel</Button>}
                style={{ width: '100%', marginBottom: 20 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
            />

            <Table columns={columns} dataSource={artikelist} />

            <Modal
                title="Tambah Berita / Artikel"
                centered
                visible={modal}
                onOk={upload}
                onCancel={modalTrigger}
                width={1000}
            >
                <InputBoxAbove>
                    <Label>Judul</Label>
                    <Inputx placeholder="cth. Kunjungan sosialisasi " value={judul} onChange={e => setJudul(e.target.value)} />
                </InputBoxAbove>
                <InputBoxCenter>
                    <Label>Isi Artikel</Label>
                    <ReactQuill
                        theme={theme}
                        onChange={onChangeArtikel}
                        value={artikel || ''}
                        modules={MobileArticle.modules}
                        formats={MobileArticle.formats}
                        bounds={'.app'}
                        placeholder="Syarat Permohonan"
                    />
                </InputBoxCenter>
                <InputBoxBottom>
                    <Label>Cover Image</Label>
                    <Inputx type="file" onChange={selectFile} />
                </InputBoxBottom>
            </Modal>
        </Content>
    )
}

MobileArticle.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
MobileArticle.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]


export default MobileArticle