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
import styled from 'styled-components';
import ReactQuill, { Quill } from 'react-quill';
import moment from 'moment';
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

function InputJenisPermohonan() {
    const [theme, setTheme] = useState('snow')
    const [modal, setModal] = useState(false)
    const [modalFormulir, setModalFormulir] = useState(false)
    const [nama_permohonan, setNamaPermohonan] = useState('')
    const [syarat_permohonan, setSyaratPermohonan] = useState('')
    const [sop, setSop] = useState('')
    const [id_jenis_permohonan, setIdJenisPermohonan] = useState('')
    const [id_formulir, setIdFormulir] = useState('') 
    const [isUpdate, setIsUpdate] = useState(false)

    const [listjenispermohonan, setListJenisPermohonan] = useState([])
    const [listformulir, setFormulirList] = useState([])

    useEffect(() => {
        getjenispermohonan()
        getFormulirAll()
    }, [])

    const modalTrigger = () => {
        setModal(!modal)
    }


    const modalFormulirTrigger = () => {
        setModalFormulir(!modalFormulir)
    }

    const modalCreate = () => {
        resetForm()
        setIsUpdate(false)
        modalTrigger()
    }

    const getjenispermohonan = async () => {
        const data = []
        const url = 'getjenispermohonan'
        let jenispermohonan = await getall(url)

        let data_length = jenispermohonan.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: jenispermohonan[i].id_jenis_permohonan,
                nama_permohonan: jenispermohonan[i].nama_permohonan,
            })
        }
        setListJenisPermohonan(data)

    }

    const getFormulirAll = async () => {
        const data = []
        const url = 'getformulir'
        let formulir = await getall(url)

        setFormulirList(formulir)
    }

    const create = async () => {
        let datas = {
            nama_permohonan,
            syarat_permohonan,
            sop
        }
        let url = 'createjenispermohonan'
        let createjenis = await createupdate(datas, url)
        if (createjenis === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getjenispermohonan()
            resetForm()
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

    const update = async () => {
        if (id_jenis_permohonan === '' || nama_permohonan === '') {
            notification.open({
                message: 'Gagal Menyimnpan',
                description:
                    'Form tidak boleh kosong',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        } else {
            let datas = {
                id_jenis_permohonan,
                nama_permohonan,
                syarat_permohonan,
                sop,
            }
            console.log(isUpdate)
            const apiurl = 'updatejenispermohonan';
            console.log(apiurl)
            let updatejenispermohonan = await createupdate(datas, apiurl)
            if (updatejenispermohonan === 1) {
                notification.open({
                    message: 'Data Berhasil update',
                    description:
                        '',
                    icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
                });
                getjenispermohonan()
                modalTrigger()
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

    const delete_jenis_permohonan = async(id) => {
        const url = 'deletejenispermohonan'
        const hapus = await remove(id, url)
        if (hapus === 1) {
            notification.open({
                message: 'Data Berhasil dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getjenispermohonan()
        }
    }

    const createjenispermohonanjoinformulir = async () => {
        let datas = {
            id_jenis_permohonan,
            id_formulir
        }
        let url = 'createjenispermohonanjoinformulir'
        let createjenis = await createupdate(datas, url)
        if (createjenis === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
        } else {
            notification.open({
                message: 'Gagal Menyimpan Data',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        }
    }


    const getFormlirByPermohonan = async (id_permohonan) => {
        
        setIdJenisPermohonan(id_permohonan)
        modalFormulirTrigger()
    }

    const getFormulirPermohonanById = async(id) => {
        setIsUpdate(true)
        const url = 'getjenispermohonanbyid'
        let jenispermohonanbyid = await getbyid(id, url)
        console.log(jenispermohonanbyid)
        setIdJenisPermohonan(id)
        setNamaPermohonan(jenispermohonanbyid[0].nama_permohonan)
        setSyaratPermohonan(jenispermohonanbyid[0].syarat_permohonan)
        setSop(jenispermohonanbyid[0].sop)
        modalTrigger()
    }

    const resetForm = async() => {
        setIdJenisPermohonan('')
        setNamaPermohonan('')
        setSyaratPermohonan('')
        setSop('')
    }

    const columns = [
        {
            title: 'Nomor',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Nama Permohonan',
            key: 'nama_permohonan',
            dataIndex: 'nama_permohonan'
        },
        {
            title: 'Formulir',
            key: 'formulir',
            render: (text, record) => (
                <span>
                    <Button key="edit" onClick={() => getFormlirByPermohonan(record.id)} style={{ marginLeft: 10 }} type="primary" icon={<InfoCircleOutlined />} >Tambah Formulir</Button>
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button key="edit" style={{ marginLeft: 10 }} onClick = {() => getFormulirPermohonanById(record.id)} type="primary" icon={<InfoCircleOutlined />} >Edit</Button>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => delete_jenis_permohonan(record.id)}
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

    const onChangeSyarat = async (value) => {
        setSyaratPermohonan(value)
    }

    const onChangeFormulir = async (value) => {
        setIdFormulir(value)
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
                title="Permohonan"
                //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                extra={<Button type="dashed" onClick={modalCreate}>Tambah Jenis Permohonan </Button>}
                style={{ width: '100%', marginBottom: 20 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
            />

            <Table columns={columns} dataSource={listjenispermohonan} />

            <Modal
                title="Tambah Jenis Permohonan"
                centered
                visible={modal}
                onOk={update}
                onCancel={modalTrigger}
                width={1000}
                footer={null}
            >
                <InputBoxAbove>
                    <Label>Nama Permohonan</Label>
                    <Inputx placeholder="cth. Pemecahan Bidang" value={nama_permohonan} onChange={e => setNamaPermohonan(e.target.value)} />
                </InputBoxAbove>
                <InputBoxCenter>
                    <Label>Syarat Permohonan</Label>
                    <ReactQuill
                        theme={theme}
                        onChange={onChangeSyarat}
                        value={syarat_permohonan || ''}
                        modules={InputJenisPermohonan.modules}
                        formats={InputJenisPermohonan.formats}
                        bounds={'.app'}
                        placeholder="Syarat Permohonan"
                    />
                </InputBoxCenter>
                <InputBoxBottom>
                    <Label>SOP</Label>
                    <Inputx placeholder="cth. 2 hari" value={sop} onChange={e => setSop(e.target.value)} />
                </InputBoxBottom>
                <InputBoxBottom>
                    <Button type='primary' onClick={isUpdate ? update : create} block> {isUpdate ? "Update" : "Simpan"} </Button>
                </InputBoxBottom>
            </Modal>

            <Modal
                title="Tambah Formulir"
                centered
                visible={modalFormulir}
                //onOk={createjenispermohonanjoinformulir}
                onCancel={modalFormulirTrigger}
                width={1000}
            >
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Pilih Formulir"
                    optionFilterProp="children"
                    style={{ width: '100%', borderWidth: 0, marginBottom:10 }}
                    onChange={onChangeFormulir}
                    value={id_formulir}
                >
                    {listformulir.map((data, index) =>
                        <Option value={data.id}>{data.nama_formulir}</Option>
                    )}
                </Select>
                <Button type="primary" onClick={createjenispermohonanjoinformulir} block>Simpan</Button>
              
            </Modal>

        </Content>
    )

}

InputJenisPermohonan.modules = {
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
InputJenisPermohonan.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

export default InputJenisPermohonan;