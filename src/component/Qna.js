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



function Qna() {
    const [theme, setTheme] = useState('snow')
    const [modal, setModal] = useState(false)
    const [id_qna, setIdQna] = useState('')
    const [jawaban, setJawaban] = useState('')

    const [qnalist, setQnaList] = useState([])


    useEffect(() => {
        getqnaall()
    },[])

    const modalTrigger = () => {
        setModal(!modal)
    }


    const getqnaall = async () => {
        const data = []
        const url = 'getqna'
        let qna = await getall(url)

        console.log(qna)

        let data_length = qna.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id_qna: qna[i].id_qna,
                nama_lengkap: qna[i].nama_lengkap,
                judul: qna[i].judul,
                pertanyaan: qna[i].pertanyaan,
                jawaban: qna[i].jawaban,
                dibuat:qna[i].created_at,
            })
        }
        // setImagePath(banner.host)
        setQnaList(data)
    }

    const jawab = (id) => {
        console.log(id)
        setIdQna(id)
        modalTrigger()
    }

    const saveJawaban = async() => {
        const apiurl = 'makeanswers'
        const datas = {
            id_qna,
            payload: {
                jawaban
            }
        }
        let makeanswers = await createupdate(datas, apiurl)
        if (makeanswers === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getqnaall()
            ResetForm()
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


    const onChangeArtikel = value => {
        setJawaban(value)
    }

    const ResetForm = () => {
        setIdQna('')
        setJawaban('')
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
        },
        {
            title: 'Pertanyaan',
            key: 'pertanyaan',
            render: (text, record) => (
                <div>
                    <b>{record.pertanyaan}</b>
                </div>
            )
        },
        {
            title: 'Jawaban',
            key: 'jawaban',
            render: (text, record) => (
                <div>
                    <b>{renderHTML(record.jawaban)}</b>
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
                    <Button type="primary"  onClick={() => jawab(record.id_qna)}> Jawab </Button>
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
                title="Questions and Answers"
                style={{ width: '100%', marginBottom: 20 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
            />

            <Table columns={columns} dataSource={qnalist} />

            <Modal
                title="Jawab Pertanyaan"
                centered
                visible={modal}
                onOk={saveJawaban}
                onCancel={modalTrigger}
                width={1000}
            >
                <InputBoxCenter>
                    <Label>Jawaban</Label>
                    <ReactQuill
                        theme={theme}
                        onChange={onChangeArtikel}
                        value={jawaban || ''}
                        modules={Qna.modules}
                        formats={Qna.formats}
                        bounds={'.app'}
                        placeholder="Syarat Permohonan"
                    />
                </InputBoxCenter>
            </Modal>
        </Content>
    )
}

Qna.modules = {
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
Qna.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]


export default Qna