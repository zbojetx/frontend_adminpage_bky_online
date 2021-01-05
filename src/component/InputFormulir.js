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
import { createupdate, getall, remove, getbyid, getallpost } from '../api/api';
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


function InputFormulir() {

    const [modal, setModal] = useState(false)
    const [nama_formulir, setNamaFormulir] = useState('')
    const [selectedfile, setSelectedFiles] = useState([])
    const [filetoupload, setFileToUpload] = useState([])

    const [formulirlist, setFormulirList] = useState([])
    
   

    useEffect(() => {
        getFormulirAll()
    },[])

    const modalTrigger = () => {
        setModal(!modal)
    }

    const getFormulirAll = async () => {
        const data = []
        const url = 'getformulir'
        let formulir = await getall(url)

        let data_length = formulir.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: formulir[i].id,
                nama_formulir: formulir[i].nama_formulir,
                file: formulir[i].file,
            })
        }
        // setImagePath(banner.host)
        setFormulirList(data)
    }

    const upload = async() => {
        const formData = new FormData();
        formData.append('pdf', filetoupload)
        formData.append('nama_formulir', nama_formulir)
        await axios.post('http://localhost:6789/uploadfile',formData)
        .then(res => {
            if(res.status === 200){
                modalTrigger()
                resetform()
            }
        })
    }

    const columns = [
        {
            title: 'Nomor',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Nama Formulir',
            key: 'nama',
            render: (text, record) => (
                <div>
                    <b>{record.nama_formulir}</b>
                </div>
            )
        },
        {
            title: 'File',
            key: 'file',
            render: (text, record) => (
                <div>
                    <b>{record.file}</b>
                </div>
            )
        },
      
    ];

    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
        setFileToUpload(event.target.files[0])
        console.log(event.target.files)
      };

    const resetform = () => {
        setNamaFormulir('')
        setFileToUpload('')
        setSelectedFiles([])
    }

    return(
        <Content
        //className="site-layout-background"
        style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: '100%',
        }}
    >

        <Card
            title="Formulir"
            //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
            extra={<Button type="dashed" onClick={modalTrigger}>Tambah Formulir </Button>}
            style={{ width: '100%', marginBottom: 20 }}
            headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
        />

        <Table columns={columns} dataSource={formulirlist} />

        <Modal
            title="Tambah Formulir"
            centered
            visible={modal}
            onOk={upload}
            onCancel={modalTrigger}
            width={1000}
        >
            <InputBoxAbove>
                <Label>Nama Formulir</Label>
                <Inputx placeholder="cth. Lampiran 13" value={nama_formulir} onChange={e => setNamaFormulir(e.target.value)} />
            </InputBoxAbove>
            <InputBoxBottom>
                <Label>Formulir Permohonan</Label>
                <Inputx type="file" onChange={selectFile}/>
            </InputBoxBottom>
        </Modal>
    </Content>
    )
}

export default InputFormulir