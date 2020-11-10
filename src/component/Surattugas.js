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
import { ComponentToPrint } from './print/Printst'
import { ComponentToPrintKwitansi } from './print/Printkwintansi';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import renderHTML from 'react-render-html';
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



function Sppd() {
    moment.locale('id')
    const [form] = Form.useForm();
    const [modal, setModal] = useState(false)
    const [modalPrintSt, setModalPrintSt] = useState(false)
    const [modalPrintKwitansi, setModalPrintKwitansi] = useState(false)
    const [modalPelaksana, setModalPelaksana] = useState(false)
    const [listSuratTugas, setListSuratTugas] = useState([])
    const [listPegawai, setListPegawai] = useState([])
    const [id, setId] = useState('')
    const [isUpdate, setIsUpdate] = useState('')

    const [nomor_surat, setNomorSurat] = useState('')
    const [format_nomor, setFormatNomor] = useState('')
    const [tanggal_berangkat, setTanggalBerangkat] = useState(moment().format("YYYY-MM-DD"))
    const [tanggal_pulang, setTanggalPulang] = useState(moment().format("YYYY-MM-DD"))
    const [kode_anggaran, setKodeAnggaran] = useState('')
    const [maksud, setMaksud] = useState('')
    const [dasar, setDasar] = useState('')
    const [menimbang, setMenimbang] = useState('')
    const [tempat, setTempat] = useState('')
    const [penanda_tangan, setPenandaTangan] = useState('')
    const [provinsi, setProvinsi] = useState('')
    const [kab_kota, setKabKota] = useState('')
    const [tanggaldikeluarkan, setTanggalDikeluarkan] = useState(moment().format("YYYY-MM-DD"))

    const [theme, setTheme] = useState('snow')
    const [listProvinsi, setListProvinsi] = useState([])
    const [listKabKota, setListKabKota] = useState([])
    const [listPelaksana, setListPelaksana] = useState([])
    const [listFormatSurat, setListFormatSurat] = useState([])
    const [generatesppd, setGenerateSppd] = useState(false)

    const [tanggalCari1, setTanggalCari1] = useState('')
    const [tanggalCari2, setTanggalCari2] = useState('')


    const [Pelaksana, setPelaksana] = useState('')

    const componentRef = useRef();


    useEffect(() => {
        getsurattugas()
        getprovinsi()
        getpegawai()
        attr()
    }, []);


    const attr = async () => {
        const url = 'getattrbyjenis'
        const jenis = 'Format'
        let attrformat = await getbyid(jenis, url)
        setListFormatSurat(attrformat)
    }


    const modalTrigger = () => {
        setModal(!modal)
    }

    const modalTriggerPelaksana = (id) => {
        setId(id)
        getPelaksanaById(id)
        setModalPelaksana(!modalPelaksana)
    }

    const getpegawai = async () => {
        const data = []
        const url = 'getpegawai'
        let pegawai = await getall(url)
        setListPegawai(pegawai)
    }

    const getSuratTugasById = async (id) => {
        const url = 'getsurattugasbyid'
        let surattugasbyid = await getbyid(id, url)

        setId(id)
        setNomorSurat(surattugasbyid[0].nomor_surat)
        setFormatNomor(surattugasbyid[0].format_nomor)
        setProvinsi(surattugasbyid[0].provinsi)
        setKabKota(surattugasbyid[0].kab_kota)
        setMaksud(surattugasbyid[0].maksud)
        setDasar(surattugasbyid[0].dasar)
        setMenimbang(surattugasbyid[0].waktu)
        setTempat(surattugasbyid[0].tempat)
        setPenandaTangan(surattugasbyid[0].penanda_tangan)
        setTanggalDikeluarkan(surattugasbyid[0].tanggaldikeluarkan)
        setTanggalBerangkat(surattugasbyid[0].tanggal_berangkat)
        setTanggalPulang(surattugasbyid[0].tanggal_pulang)
        setIsUpdate(true)
        modalTrigger()
        console.log(surattugasbyid)
    }

    const getPelaksanaById = async (id) => {
        let data = []
        const url = 'getpelaksanaid'
        let pelaksanabyid = await getbyid(id, url)
        let data_length = pelaksanabyid.length
        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: pelaksanabyid[i].id,
                nama: pelaksanabyid[i].nama_pegawai,
            })
        }
        setListPelaksana(data)
        //modalTriggerPelaksana()
    }

    const modalTriggerPrintSt = async (id) => {
        await setId(id)
        setModalPrintSt(!modalPrintSt)
    }

    const getsurattugas = async () => {
        const data = []
        const url = 'getsurattugas'
        let surattugas = await getall(url)
        let data_length = surattugas.length

        console.log(surattugas)

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: surattugas[i].id,
                maksud: surattugas[i].maksud,
                format_nomor: surattugas[i].format_nomor,
                nomor_surat: surattugas[i].nomor_surat,
                tgl_berangkat: surattugas[i].tanggal_berangkat,
                tgl_pulang: surattugas[i].tanggal_pulang,
            })
        }
        setListSuratTugas(data)
    }

    const getprovinsi = async () => {
        const data = []
        const url = 'getprovinsi'
        let provinsi = await getall(url)
        setListProvinsi(provinsi)

    }

    const getkabupatenkota = async (id) => {
        const url = 'getkabkota'
        let kabkota = await getbyid(id, url)
        setListKabKota(kabkota)
    }

    const removesurattugas = async (idx) => {
        console.log(idx)
        const url = 'deletesurattugas'
        const hapus = await remove(idx, url)
        console.log(hapus)
        if (hapus === 1) {
            notification.open({
                message: 'Data Berhasil dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getsurattugas()
        }
    }

    const generateSppd = async (id) => {
        const url = 'generatesppd'
        const hapus = await remove(id, url)
        console.log(hapus)
        if (hapus === 1) {
            notification.open({
                message: 'SPPD Berhasil digenerate',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getsurattugas()
        }
    }

    const cariberdasarkantanngal = async () => {

    }

    const create = async (req, res) => {
        if (nomor_surat === '') {
            notification.open({
                message: 'Gagal Menyimnpan',
                description:
                    'Form tidak boleh kosong',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        } else {
            let datas = {
                generatesppd,
                payload: {
                    nomor_surat,
                    format_nomor,
                    menimbang,
                    dasar,
                    tempat,
                    tanggal_berangkat,
                    tanggal_pulang,
                    provinsi,
                    kab_kota,
                    maksud,
                    penanda_tangan,
                    tanggaldikeluarkan,
                }
            }
            const apiurl = 'createsurattugas'
            console.log(apiurl)
            let createsurattugas = await createupdate(datas, apiurl)
            if (createsurattugas === 1) {
                notification.open({
                    message: 'Data Berhasil disimpan',
                    description:
                        '',
                    icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
                });
                getsurattugas()
                modalTrigger()
                //resetForm()
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

    const update = async (req, res) => {
        if (nomor_surat === '') {
            notification.open({
                message: 'Gagal Menyimnpan',
                description:
                    'Form tidak boleh kosong',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        } else {
            let datas = {
                generatesppd,
                id,
                payload: {
                    nomor_surat,
                    format_nomor,
                    menimbang,
                    dasar,
                    tempat,
                    tanggal_berangkat,
                    tanggal_pulang,
                    provinsi,
                    kab_kota,
                    maksud,
                    penanda_tangan,
                    tanggaldikeluarkan,
                }
            }
            const apiurl = 'updatesurattugas'
            console.log(apiurl)
            let createsurattugas = await createupdate(datas, apiurl)
            if (createsurattugas === 1) {
                notification.open({
                    message: 'Data Berhasil disimpan',
                    description:
                        '',
                    icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
                });
                getsurattugas()
                modalTrigger()
                //resetForm()
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

    const createPelaksana = async (id) => {
        const id_surat_tugas = id
        const id_pegawai = Pelaksana
        let datas = {
            id_surat_tugas,
            id_pegawai,
        }
        const apiurl = 'createpelaksana'
        console.log(apiurl)
        let createpegawai = await createupdate(datas, apiurl)
        if (createpegawai === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getPelaksanaById(id)
            setPelaksana('')
        } else {
            notification.open({
                message: 'Gagal Menyimpan Data',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        }
    }

    const removePelaksana = async (idx) => {
        const url = 'deletepelaksana'
        const hapus = await remove(idx, url)
        console.log(hapus)
        if (hapus === 1) {
            notification.open({
                message: 'Data Berhasil dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getPelaksanaById(id)
        }
    }

    const createorupdate = () => {
        isUpdate ? update() : create()
    }

    const createnew = async () => {
        modalTrigger()
        setIsUpdate(false)
        resetForm()
    }

    const resetForm = () => {
        // setNamaPegawai('')
        // setNomorSurat('')
        // setTanggalBerangkat(Date.now())
        // setTanggalPulang(Date.now())
        // setPeraturanPerjalanan('')
        // setProvinsi('')
        // setKabKota('')
        // setKodeAnggaran('')
        // setMaksud('')
        // setDasar('')
        // setWaktu('')
        // setTempatPertama('')
        // setTempatKedua('')
        // setTempatKetiga('')
        // setPenandaTangan('')
        // setPenandaTanganKeuangan('')
        // setKeterangan('')
        // setTanggalDikeluarkan(Date.now())
    }

    const caribyTanggal = async () => {
        const data = []
        const date1 = tanggalCari1;
        const date2 = tanggalCari2;
        let datas = {
            date1,
            date2
        }
        const apiurl = 'surattugasbydate'
        console.log(apiurl)
        let surattugas = await getallpost(datas, apiurl)
        let data_length = surattugas.length

        console.log(surattugas)

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: surattugas[i].id,
                maksud: surattugas[i].maksud,
                format_nomor: surattugas[i].format_nomor,
                nomor_surat: surattugas[i].nomor_surat,
                tgl_berangkat: surattugas[i].tanggal_berangkat,
                tgl_pulang: surattugas[i].tanggal_pulang,
            })
        }
        setListSuratTugas(data)
    }

    const caribySurat = async () => {
        const data = []
        let datas = {
            nomor_surat,
            format_nomor
        }
        const apiurl = 'surattugasbynomor'
        console.log(apiurl)
        let surattugas = await getallpost(datas, apiurl)
        let data_length = surattugas.length

        console.log(surattugas)

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: surattugas[i].id,
                maksud: surattugas[i].maksud,
                format_nomor: surattugas[i].format_nomor,
                nomor_surat: surattugas[i].nomor_surat,
                tgl_berangkat: surattugas[i].tanggal_berangkat,
                tgl_pulang: surattugas[i].tanggal_pulang,
            })
        }
        setListSuratTugas(data)
    }

    const columnsPelaksana = [
        {
            title: 'No',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Nama Pegawai',
            key: 'nama',
            dataIndex: 'nama'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => removePelaksana(record.id)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button key="hapus" style={{ marginLeft: 10 }} type="danger" icon={<DeleteOutlined />} ></Button>
                    </Popconfirm>
                </span>
            ),
        },
    ]

    const columns = [
        {
            title: 'No',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Nomor Surat',
            key: 'action',
            render: (text, record) => (
                <span>
                    {record.nomor_surat}/{record.format_nomor}
                </span>
            ),
        },
        {
            title: 'Tanggal',
            key: 'action',
            render: (text, record) => (
                <span>
                    {moment(record.tgl_berangkat).format('LL')} -  {moment(record.tgl_pulang).format('LL')}
                </span>
            ),
        },
        {
            title: 'Maksud',
            key: 'action',
            render: (text, record) => (
                <span>
                    {renderHTML(record.maksud)}
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button key="edit" onClick={() => getSuratTugasById(record.id)} style={{ marginLeft: 10 }} type="primary" icon={<EditOutlined />} ></Button>
                    <Button key="edit" onClick={() => modalTriggerPelaksana(record.id)} style={{ marginLeft: 10 }} type="primary" icon={<UserAddOutlined />} ></Button>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => removesurattugas(record.id)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button key="hapus" style={{ marginLeft: 10 }} type="danger" icon={<DeleteOutlined />} ></Button>
                    </Popconfirm>
                </span>
            ),
        },
        {
            title: 'Print',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button key="edit" onClick={() => generateSppd(record.id)} style={{ marginLeft: 10 }} type="primary" icon={<PrinterOutlined />} >Generate SPPD</Button>
                    <Button key="edit" onClick={() => modalTriggerPrintSt(record.id)} style={{ marginLeft: 10 }} type="primary" icon={<PrinterOutlined />} >Surat Tugas</Button>
                </span>
            ),
        },
    ];


    const onChangeProvinsi = value => {
        setProvinsi(value)
        getkabupatenkota(value)
        console.log(value)
    }

    const onChangeKabKota = value => {
        setKabKota(value)
    }

    const onChangeDate = (value, string) => {
        console.log(string)
        setTanggalBerangkat(string[0])
        setTanggalPulang(string[1])
    }

    const onChangeDateCari = (value, string) => {
        console.log(string)
        setTanggalCari1(string[0])
        setTanggalCari2(string[1])
    }

    const onChangeTanggalDikeluarkan = (value, string) => {
        console.log(string)
        setTanggalDikeluarkan(string)
    }

    const onChangeMenimbang = value => {
        setMenimbang(value)
    }

    const onChangeDasar = value => {
        setDasar(value)
    }

    const onChangeMaksud = value => {
        setMaksud(value)
    }

    const onChangePenandatangan = value => {
        setPenandaTangan(value)
    }

    const onChangeFormatSurat = value => {
        setFormatNomor(value)
    }

    // const onChangePenandatanganKeuangan = value => {
    //     setPenandaTanganKeuangan(value)
    // }

    const onChangePelaksana = value => {
        setPelaksana(value)
    }

    const dateFormat = 'YYYY-MM-DD';
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
                title="Surat Tugas"
                //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                extra={<Button type="dashed" onClick={createnew}>Buat Surat Tugas </Button>}
                style={{ width: '100%', marginBottom: 20 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
            >
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: 10 }}>
                        <div style={{ borderWidth: 1, borderColor: '#535c68', border: '1px solid #b2bec3', padding: 10, borderRadius: 5 }}>
                            <Label>Cari berdasarkan tanggal</Label>
                            <RangePicker
                                style={{ width: '100%', borderWidth: 0, marginBottom: 20 }}
                                onChange={onChangeDateCari}
                            />
                            <Button block primary onClick={caribyTanggal}>Cari</Button>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ padding: 10 }}>
                        <div style={{ borderWidth: 1, borderColor: '#535c68', border: '1px solid #b2bec3', padding: 10, borderRadius: 5, width: '100%' }}>
                            <Row style={{ width: "100%", marginBottom: 20 }}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <Label>Nomor Surat</Label>
                                    <Inputx placeholder="Nomor Surat" value={nomor_surat} onChange={e => setNomorSurat(e.target.value)} />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <Label>Penomoran</Label>
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Pilih Provinsi"
                                        optionFilterProp="children"
                                        onChange={onChangeFormatSurat}
                                        value={format_nomor}
                                    >
                                        {listFormatSurat.map((data, index) =>
                                            <Option value={data.nama_attr}>{data.nama_attr}</Option>
                                        )}
                                    </Select>
                                </Col>
                            </Row>
                            <Button block primary onClick={caribySurat}>Cari</Button>
                        </div>
                    </Col>
                    {/* <Col xs={12} sm={12} md={12} lg={8} xl={8} style={{ padding: 10 }}>
                        <div style={{ borderWidth: 1, borderColor: '#535c68', border: '1px solid #b2bec3', padding: 10, borderRadius: 5 }}>
                            <Label>Rekap Laporan</Label>

                            <Button block primary >Rekap Tahunan xls</Button>
                        </div>
                    </Col> */}
                </Row>

            </Card>

            <Table columns={columns} dataSource={listSuratTugas} />

            <Modal
                title="Buat Surat Tugas"
                centered
                visible={modal}
                onOk={createorupdate}
                onCancel={modalTrigger}
                width={1000}
            >
                <InputBoxAbove style={{ backgroundColor: '#f7d794' }}>
                    <Label>Data Administrasi</Label>
                </InputBoxAbove>
                <InputBoxCenter>
                    <Row style={{ width: "100%" }}>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <Label>Nomor Surat</Label>
                            <Inputx placeholder="Nomor Surat" value={nomor_surat} onChange={e => setNomorSurat(e.target.value)} />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <Label>Penomoran</Label>
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Pilih Provinsi"
                                optionFilterProp="children"
                                onChange={onChangeFormatSurat}
                                value={format_nomor}
                            >
                                {listFormatSurat.map((data, index) =>
                                    <Option value={data.nama_attr}>{data.nama_attr}</Option>
                                )}
                            </Select>
                        </Col>
                    </Row>
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Menimbang</Label>
                    <ReactQuill
                        theme={theme}
                        onChange={onChangeMenimbang}
                        value={menimbang || ''}
                        modules={Sppd.modules}
                        formats={Sppd.formats}
                        bounds={'.app'}
                        placeholder="Menimbang"
                    />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Dasar</Label>
                    <ReactQuill
                        theme={theme}
                        onChange={onChangeDasar}
                        value={dasar || ''}
                        modules={Sppd.modules}
                        formats={Sppd.formats}
                        bounds={'.app'}
                        placeholder="Dasar"
                    />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Maksud</Label>
                    <ReactQuill
                        theme={theme}
                        onChange={onChangeMaksud}
                        value={maksud || ''}
                        modules={Sppd.modules}
                        formats={Sppd.formats}
                        bounds={'.app'}
                        placeholder="Maksud"
                    />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Tanggal Berangkat - Tanggal Pulang</Label>
                    <RangePicker
                        //defaultValue={[tanggal_berangkat, tanggal_pulang]}
                        defaultValue={[moment(tanggal_berangkat, dateFormat), moment(tanggal_pulang, dateFormat)]}
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangeDate}
                    />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Tempat</Label>
                    <TextArea rows={3} value={tempat} onChange={e => setTempat(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Provinsi Tujuan</Label>
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Pilih Provinsi"
                        optionFilterProp="children"
                        onChange={onChangeProvinsi}
                        value={provinsi}
                    >
                        {listProvinsi.map((data, index) =>
                            <Option value={data.id}>{data.nama}</Option>
                        )}
                    </Select>
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Kota Tujuan</Label>
                    <Select
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Pilih Kabupaten Kota"
                        optionFilterProp="children"
                        onChange={onChangeKabKota}
                        value={kab_kota}
                    >
                        {listKabKota.map((data, index) =>
                            <Option value={data.id}>{data.nama}</Option>
                        )}
                    </Select>
                </InputBoxCenter>
                <InputBoxCenter style={{ backgroundColor: '#f7d794' }}>
                    <Label>Pengesahan</Label>
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Dikeluarkan pada tanggal</Label>
                    <DatePicker
                        defaultValue={moment(tanggaldikeluarkan, dateFormat)}
                        onChange={onChangeTanggalDikeluarkan}
                        style={{ width: '100%', borderWidth: 0 }}
                    />
                </InputBoxCenter>
                <InputBoxBottom>
                    <Label>Penandatangan</Label>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangePenandatangan}
                        value={penanda_tangan}
                    >
                        <Option value="">Pilih Penandatangan</Option>
                        {listPegawai.map((data, index) =>
                            <Option value={data.id}>{data.nip} - {data.nama_pegawai}</Option>
                        )}
                    </Select>
                </InputBoxBottom>
            </Modal>

            {/* Modal Print SPPD */}

            <Modal
                title="Print Surat Tugas"
                centered
                visible={modalPrintSt}
                //onOk={createorupdate}
                onCancel={modalTriggerPrintSt}
                footer={null}
                width={1000}
            >
                <ComponentToPrint
                    key={id}
                    ref={componentRef}
                    dataToPrint={id}
                />
                <ReactToPrint
                    trigger={() => <Button block type="primary" icon={<PrinterOutlined />}>Print</Button>}
                    content={() => componentRef.current}
                />

            </Modal>

            {/* Modal Pelaksana */}

            <Modal
                title="Tambah Pelaksana"
                centered
                visible={modalPelaksana}
                onOk={() => createPelaksana(id)}
                onCancel={modalTriggerPelaksana}
                width={1000}
                footer={null}
            >
                <Form form={form} name="horizontal_login" layout="inline" onFinish={() => createPelaksana(id)} style={{ backgroundColor: '#0984e3', padding: 20, marginBottom: 20 }}>
                    <Row style={{ width: '100%', marginBottom: 5, backgroundColor: '#0984e3' }} >
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                name="satuan"
                                rules={[{ required: true, message: 'kosong' }]}
                            >
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    style={{ width: '100%', borderWidth: 0 }}
                                    onChange={onChangePelaksana}
                                    value={Pelaksana}
                                >
                                    {listPegawai.map((data, index) =>
                                        <Option value={data.id}>{data.nip} - {data.nama_pegawai}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Table columns={columnsPelaksana} dataSource={listPelaksana} />
            </Modal>

        </Content>
    )
}

Sppd.modules = {
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
Sppd.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]


export default Sppd;



