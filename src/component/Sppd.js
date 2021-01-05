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
import { ComponentToPrint } from './print/Printsppd'
import { ComponentToPrintKwitansi } from './print/Printkwintansi'
import ReactQuill, { Quill } from 'react-quill';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
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
    const [modalExport, setModalExport] = useState(false)
    const [modalPrintSppd, setModalPrintSppd] = useState(false)
    const [modalPrintKwitansi, setModalPrintKwitansi] = useState(false)
    const [modalPengikut, setModalPengikut] = useState(false)
    const [listSppd, setListSppd] = useState([])
    const [listPegawai, setListPegawai] = useState([])
    const [id, setId] = useState('')
    const [isUpdate, setIsUpdate] = useState('')

    const [nama_pegawai, setNamaPegawai] = useState('')
    const [tanggal_berangkat, setTanggalBerangkat] = useState(moment().format("YYYY-MM-DD"))
    const [tanggal_pulang, setTanggalPulang] = useState(moment().format("YYYY-MM-DD"))
    const [peraturan_perjalanan, setPeraturanPerjalanan] = useState('')
    const [nomor_surat, setNomorSurat] = useState('')
    const [format_surat, setFormatSurat] = useState('')
    const [provinsi, setProvinsi] = useState('')
    const [kab_kota, setKabKota] = useState('')
    const [kode_anggaran, setKodeAnggaran] = useState('')
    const [maksud, setMaksud] = useState('')
    const [dasar, setDasar] = useState('')
    const [waktu, setWaktu] = useState('')
    const [tempat_pertama, setTempatPertama] = useState('')
    const [tempat_kedua, setTempatKedua] = useState('')
    const [tempat_ketiga, setTempatKetiga] = useState('')
    const [penanda_tangan, setPenandaTangan] = useState('')
    const [penanda_tangan_keuangan, setPenandaTanganKeuangan] = useState('')
    const [keterangan, setKeterangan] = useState('')
    const [datee, setDate] = useState([])
    const [pengikut, setPengikut] = useState('')
    const [tanggaldikeluarkan, setTanggalDikeluarkan] = useState(moment().format("YYYY-MM-DD"))

    const [listProvinsi, setListProvinsi] = useState([])
    const [listKabKota, setListKabKota] = useState([])
    const [listPengikut, setListPengikut] = useState([])
    const [listFormatSurat, setListFormatSurat] = useState([])

    const [tanggalCari1, setTanggalCari1] = useState('')
    const [tanggalCari2, setTanggalCari2] = useState('')

    const [nomor_surat_tugas, setNomorSuratTugas] = useState('')
    const [format_surat_tugas, setFormatSuratTugas] = useState('')

    const [theme, setTheme] = useState('snow')

    const componentRef = useRef();


    useEffect(() => {
        getsppd()
        getprovinsi()
        getpegawai()
        attr()
    }, []);



    const modalTrigger = () => {
        setModal(!modal)
    }

    const modalExportTrigger = () => {
        setModalExport(!modalExport)
    }


    const modalTriggerPengikut = (id) => {
        setId(id)
        getPengikutById(id)
        setModalPengikut(!modalPengikut)
    }

    const attr = async () => {
        const url = 'getattrbyjenis'
        const jenis = 'Format'
        let attrformat = await getbyid(jenis, url)
        setListFormatSurat(attrformat)
    }

    const getpegawai = async () => {
        const data = []
        const url = 'getpegawai'
        let pegawai = await getall(url)
        setListPegawai(pegawai)
    }

    const getSppdById = async (id) => {
        const url = 'getsppdbyid'
        let sppdbyid = await getbyid(id, url)
        console.log(sppdbyid)
        setId(id)
        setNamaPegawai(sppdbyid[0].nama_pegawai)
        setNomorSurat(sppdbyid[0].nomor_surat)
        setTanggalBerangkat(sppdbyid[0].tanggal_berangkat)
        setTanggalPulang(sppdbyid[0], tanggal_pulang)
        setPeraturanPerjalanan(sppdbyid[0].peraturan_perjalanan)
        setProvinsi(sppdbyid[0].provinsi)
        setKabKota(sppdbyid[0].kab_kota)
        setKodeAnggaran(sppdbyid[0].kode_anggaran)
        setMaksud(sppdbyid[0].maksud)
        setDasar(sppdbyid[0].dasar)
        setWaktu(sppdbyid[0].waktu)
        setTempatPertama(sppdbyid[0].tempat_pertama)
        setTempatKedua(sppdbyid[0].tempat_kedua)
        setTempatKetiga(sppdbyid[0].tempat_ketiga)
        setPenandaTangan(sppdbyid[0].penanda_tangan)
        setPenandaTanganKeuangan(sppdbyid[0].penanda_tangan_keuangan)
        setKeterangan(sppdbyid[0].keterangan)
        //setTanggalDikeluarkan(sppdbyid[0].tanggaldikeluarkan)
        setIsUpdate(true)
        setTanggalBerangkat(sppdbyid[0].tanggal_berangkat)
        setTanggalPulang(sppdbyid[0].tanggal_pulang)
        modalTrigger()
        console.log(datee)
    }

    const getPengikutById = async (id) => {
        let data = []
        const url = 'getpengikutid'
        let pengikutbyid = await getbyid(id, url)
        let data_length = pengikutbyid.length
        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: pengikutbyid[i].id,
                nama_pegawai: pengikutbyid[i].pengikut,
            })
        }
        setListPengikut(data)
        //modalTriggerPengikut()
    }

    const modalTriggerPrintSppd = async (id) => {
        await setId(id)
        console.log(id)
        setModalPrintSppd(!modalPrintSppd)
    }

    const modalTriggerPrintKwitansi = async (id) => {
        await setId(id)
        setModalPrintKwitansi(!modalPrintKwitansi)
    }

    const getsppd = async () => {
        const data = []
        const url = 'getsppd'
        let sppd = await getall(url)
        let data_length = sppd.length

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: sppd[i].id,
                nama_pegawai: sppd[i].nama_pegawai,
                prov: sppd[i].provinsi,
                kabkota: sppd[i].kab_kota,
                dasar: sppd[i].dasar,
                maksud: sppd[i].maksud,
                nomor_surat_tugas: sppd[i].nomor_surat_tugas,
                format_surat_tugas: sppd[i].format_surat_tugas,
                nomor_surat: sppd[i].nomor_surat,
                format_surat: sppd[i].format_surat,
                peraturan: sppd[i].peraturan_perjalanan,
                tgl_berangkat: sppd[i].tanggal_berangkat,
                tgl_pulang: sppd[i].tanggal_pulang,
            })
        }
        setListSppd(data)

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

    const removesppd = async (id) => {
        const url = 'deletesppd'
        const hapus = await remove(id, url)
        console.log(hapus)
        if (hapus === 1) {
            notification.open({
                message: 'Data Berhasil dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getsppd()
        }
    }

    const create = async (req, res) => {
        if (nomor_surat === '' || nama_pegawai === '') {
            notification.open({
                message: 'Gagal Menyimnpan',
                description:
                    'Form tidak boleh kosong',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        } else {
            let datas = {
                nama_pegawai,
                tanggal_berangkat,
                tanggal_pulang,
                peraturan_perjalanan,
                nomor_surat,
                format_surat,
                provinsi,
                kab_kota,
                kode_anggaran,
                maksud,
                dasar,
                waktu,
                tempat_pertama,
                tempat_kedua,
                tempat_ketiga,
                penanda_tangan,
                penanda_tangan_keuangan,
                keterangan,
                tanggaldikeluarkan,
            }
            const apiurl = 'createsppd'
            console.log(apiurl)
            let createpegawai = await createupdate(datas, apiurl)
            if (createpegawai === 1) {
                notification.open({
                    message: 'Data Berhasil disimpan',
                    description:
                        '',
                    icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
                });
                getsppd()
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
        if (nomor_surat === '' || nama_pegawai === '') {
            notification.open({
                message: 'Gagal Menyimnpan',
                description:
                    'Form tidak boleh kosong',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        } else {
            let datas = {
                id,
                nama_pegawai,
                tanggal_berangkat,
                tanggal_pulang,
                peraturan_perjalanan,
                nomor_surat,
                format_surat,
                provinsi,
                kab_kota,
                kode_anggaran,
                maksud,
                dasar,
                waktu,
                tempat_pertama,
                tempat_kedua,
                tempat_ketiga,
                penanda_tangan,
                penanda_tangan_keuangan,
                keterangan,
                tanggaldikeluarkan
            }
            const apiurl = 'updatesppd'
            console.log(apiurl)
            let createpegawai = await createupdate(datas, apiurl)
            if (createpegawai === 1) {
                notification.open({
                    message: 'Data Berhasil disimpan',
                    description:
                        '',
                    icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
                });
                getsppd()
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

    const createPengikut = async (id) => {
        let id_sppd = id
        let datas = {
            id_sppd,
            pengikut,
        }
        const apiurl = 'createpengikut'
        console.log(apiurl)
        let createpegawai = await createupdate(datas, apiurl)
        if (createpegawai === 1) {
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getPengikutById(id)
            setPengikut('')
        } else {
            notification.open({
                message: 'Gagal Menyimpan Data',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        }
    }

    const removepengikut = async (idx) => {
        const url = 'deletepengikut'
        const hapus = await remove(idx, url)
        console.log(hapus)
        if (hapus === 1) {
            notification.open({
                message: 'Data Berhasil dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
            getPengikutById(id)
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
        setNamaPegawai('')
        setNomorSurat('')
        setTanggalBerangkat(Date.now())
        setTanggalPulang(Date.now())
        setPeraturanPerjalanan('')
        setProvinsi('')
        setKabKota('')
        setKodeAnggaran('')
        setMaksud('')
        setDasar('')
        setWaktu('')
        setTempatPertama('')
        setTempatKedua('')
        setTempatKetiga('')
        setPenandaTangan('')
        setPenandaTanganKeuangan('')
        setKeterangan('')
        setTanggalDikeluarkan(Date.now())
    }

    const caribyTanggal = async () => {
        const data = []
        const date1 = tanggalCari1;
        const date2 = tanggalCari2;
        let datas = {
            date1,
            date2
        }
        const apiurl = 'sppdbydate'
        console.log(apiurl)
        let sppd = await getallpost(datas, apiurl)
        let data_length = sppd.length

        console.log(sppd)

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: sppd[i].id,
                nama_pegawai: sppd[i].nama_pegawai,
                prov: sppd[i].provinsi,
                kabkota: sppd[i].kab_kota,
                nomor_surat_tugas: sppd[i].nomor_surat_tugas,
                format_surat_tugas: sppd[i].format_surat_tugas,
                nomor_surat: sppd[i].nomor_surat,
                format_surat: sppd[i].format_surat,
                dasar: sppd[i].dasar,
                maksud: sppd[i].maksud,
                peraturan: sppd[i].peraturan_perjalanan,
                tgl_berangkat: sppd[i].tanggal_berangkat,
                tgl_pulang: sppd[i].tanggal_pulang,
            })
        }
        setListSppd(data)

    }

    const caribySurat = async () => {
        const data = []
        let datas = {
            nomor_surat,
            format_surat
        }
        const apiurl = 'sppdbynomor'
        console.log(apiurl)
        let sppd = await getallpost(datas, apiurl)
        let data_length = sppd.length

        console.log(sppd)

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: sppd[i].id,
                nama_pegawai: sppd[i].nama_pegawai,
                prov: sppd[i].provinsi,
                kabkota: sppd[i].kab_kota,
                nomor_surat_tugas: sppd[i].nomor_surat_tugas,
                format_surat_tugas: sppd[i].format_surat_tugas,
                nomor_surat: sppd[i].nomor_surat,
                format_surat: sppd[i].format_surat,
                dasar: sppd[i].dasar,
                maksud: sppd[i].maksud,
                peraturan: sppd[i].peraturan_perjalanan,
                tgl_berangkat: sppd[i].tanggal_berangkat,
                tgl_pulang: sppd[i].tanggal_pulang,
            })
        }
        setListSppd(data)
        //setListSuratTugas(data)
    }

    const caribySuratTugas = async () => {
        const data = []
        let datas = {
            nomor_surat_tugas,
            format_surat_tugas
        }
        const apiurl = 'sppdbynomor'
        console.log(apiurl)
        let sppd = await getallpost(datas, apiurl)
        let data_length = sppd.length

        console.log(sppd)

        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                id: sppd[i].id,
                nama_pegawai: sppd[i].nama_pegawai,
                prov: sppd[i].provinsi,
                kabkota: sppd[i].kab_kota,
                nomor_surat_tugas: sppd[i].nomor_surat_tugas,
                format_surat_tugas: sppd[i].format_surat_tugas,
                nomor_surat: sppd[i].nomor_surat,
                format_surat: sppd[i].format_surat,
                dasar: sppd[i].dasar,
                maksud: sppd[i].maksud,
                peraturan: sppd[i].peraturan_perjalanan,
                tgl_berangkat: sppd[i].tanggal_berangkat,
                tgl_pulang: sppd[i].tanggal_pulang,
            })
        }
        setListSppd(data)
        //setListSuratTugas(data)
    }

    const columnsPengikut = [
        {
            title: 'No',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Nama Pegawai',
            key: 'nama_pegawai',
            dataIndex: 'nama_pegawai'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => removepengikut(record.id)}
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
            title: 'Tanggal',
            key: 'action',
            render: (text, record) => (
                <span>
                    {moment(record.tgl_berangkat).format('LL')} -  {moment(record.tgl_pulang).format('LL')}
                </span>
            ),
        },
        {
            title: 'Nama Pegawai',
            key: 'nama_pegawai',
            dataIndex: 'nama_pegawai'
        },
        {
            title: 'Nomor Surat Tugas',
            key: 'action',
            render: (text, record) => (
                <span>
                    {record.nomor_surat_tugas}{record.format_surat_tugas}
                </span>
            ),
        },
        {
            title: 'Nomor SPD',
            key: 'action',
            render: (text, record) => (
                <span>
                    {record.nomor_surat}{record.format_surat}
                </span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button key="edit" onClick={() => getSppdById(record.id)} style={{ marginLeft: 10 }} type="primary" icon={<EditOutlined />} ></Button>
                    <Button key="edit" onClick={() => modalTriggerPengikut(record.id)} style={{ marginLeft: 10 }} type="primary" icon={<UserAddOutlined />} ></Button>
                    <Button key="input" onClick={() => browserHistory.push({ pathname: '/rincian', state: { id: record.id, no_surat: text.nomor_surat } })} style={{ marginLeft: 10 }} type="primary" icon={<DollarCircleOutlined />} ></Button>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => removesppd(record.id)}
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
                    <Button key="edit" onClick={() => modalTriggerPrintSppd(record.id)} style={{ marginLeft: 10 }} type="primary" icon={<PrinterOutlined />} >SPPD</Button>
                    <Button key="input" onClick={() => modalTriggerPrintKwitansi(record.id)} style={{ marginLeft: 10 }} type="primary" icon={<PrinterOutlined />} >Kwitansi</Button>
                </span>
            ),
        },
    ];

    const onChangeTingkat = value => {
        setPeraturanPerjalanan(value)
        console.log(value)
    }

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

    const onChangeTanggalDikeluarkan = (value, string) => {
        console.log(string)
        setTanggalDikeluarkan(string)
        // setTanggalBerangkat(string[0])
        // setTanggalPulang(string[1])
    }

    const onChangePegawai = value => {
        setNamaPegawai(value)
    }

    const onChangePenandatangan = value => {
        setPenandaTangan(value)
    }

    const onChangePenandatanganKeuangan = value => {
        setPenandaTanganKeuangan(value)
    }

    const onChangePengikut = value => {
        setPengikut(value)
    }

    const onChangeFormatSurat = value => {
        setFormatSurat(value)
    }

    const onChangeDateCari = (value, string) => {
        console.log(string)
        setTanggalCari1(string[0])
        setTanggalCari2(string[1])
    }

    const onChangeFormatSuratTugas = value => {
        setFormatSuratTugas(value)
    }

    const onChangeDasar = value => {
        setDasar(value)
    }

    const onChangeMaksud = value => {
        setMaksud(value)
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
                title="Surat Perintah Perjalanan Dinas (SPPD)"
                //extra={<Button type="dashed" onClick={() => browserHistory.push('/addpegawai')}>Tambah Pegawai </Button>}
                extra={<Row><Col style={{ paddingRight: 10 }}><Button type="dashed" onClick={createnew}>Buat SPPD </Button></Col><Col> <Button type="dashed" onClick={modalExportTrigger}>Export to excel</Button></Col></Row>}
                style={{ width: '100%', marginBottom: 20  }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
            >
                <Row>
                    <Col xs={12} sm={12} md={12} lg={8} xl={8} style={{ padding: 10 }}>
                        <div style={{ borderWidth: 1, borderColor: '#535c68', border: '1px solid #b2bec3', padding: 10, borderRadius: 5 }}>
                            <Label>Cari berdasarkan tanggal</Label>
                            <RangePicker
                                style={{ width: '100%', borderWidth: 0, marginBottom: 20 }}
                                onChange={onChangeDateCari}
                            />
                            <Button block primary onClick={caribyTanggal}>Cari</Button>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={8} xl={8} style={{ padding: 10 }}>
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
                                        placeholder="Pilih Format Surat"
                                        optionFilterProp="children"
                                        onChange={onChangeFormatSurat}
                                        //value={format_surat}
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
                    <Col xs={12} sm={12} md={12} lg={8} xl={8} style={{ padding: 10 }}>
                        <div style={{ borderWidth: 1, borderColor: '#535c68', border: '1px solid #b2bec3', padding: 10, borderRadius: 5, width: '100%' }}>
                            <Row style={{ width: "100%", marginBottom: 20 }}>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <Label>Nomor Surat Tugas</Label>
                                    <Inputx placeholder="Nomor Surat" value={nomor_surat_tugas} onChange={e => setNomorSuratTugas(e.target.value)} />
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                    <Label>Penomoran Surat Tugas</Label>
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Pilih Format Surat"
                                        optionFilterProp="children"
                                        onChange={onChangeFormatSuratTugas}
                                        //value={format_surat}
                                    >
                                        {listFormatSurat.map((data, index) =>
                                            <Option value={data.nama_attr}>{data.nama_attr}</Option>
                                        )}
                                    </Select>
                                </Col>
                            </Row>
                            <Button block primary onClick={caribySuratTugas}>Cari</Button>
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
            <Table columns={columns} dataSource={listSppd} />

            <Modal
                title="Buat SPPD"
                centered
                visible={modal}
                onOk={createorupdate}
                onCancel={modalTrigger}
                width={1000}
            >
                <InputBoxAbove style={{ backgroundColor: '#f7d794' }}>
                    <Label>Data Pegawai</Label>
                </InputBoxAbove>
                <InputBoxCenter>
                    <Label>Nama Pegawai</Label>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangePegawai}
                        value={nama_pegawai}
                    >
                        {listPegawai.map((data, index) =>
                            <Option value={data.nama_pegawai}>{data.nip} - {data.nama_pegawai}</Option>
                        )}
                    </Select>
                </InputBoxCenter>
                <InputBoxCenter style={{ backgroundColor: '#f7d794' }}>
                    <Label>Data Administrasi</Label>
                </InputBoxCenter>
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
                                value={format_surat}
                            >
                                {listFormatSurat.map((data, index) =>
                                    <Option value={data.nama_attr}>{data.nama_attr}</Option>
                                )}
                            </Select>
                        </Col>
                    </Row>
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
                    <Label>Tingkat menurut peraturan perjalanan</Label>
                    <Select
                        showSearch
                        placeholder="Tingkat menurut peraturan perjalanan"
                        optionFilterProp="children"
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangeTingkat}
                        value={peraturan_perjalanan}
                    >
                        <Option value="Perjalanan Dinas Dalam Daerah">Perjalanan Dinas Dalam Daerah</Option>
                        <Option value="Perjalanan Dinas Luar Daerah">Perjalanan Dinas Luar Daerah</Option>
                        <Option value="Perjalanan Dinas Luar Negeri">Perjalanan Dinas Luar Negeri</Option>
                    </Select>
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
                <InputBoxCenter>
                    <Label>Kode Anggaran</Label>
                    <Inputx placeholder="Kode Anggaran" value={kode_anggaran} onChange={e => setKodeAnggaran(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Dasar Perjalanan Dinas</Label>
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
                    <Label>Maksud Perjalanan Dinas</Label>
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
                    <Label>Waktu</Label>
                    <Inputx placeholder="Waktu" value={waktu} onChange={e => setWaktu(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Tempat Pertama</Label>
                    <TextArea rows={3} value={tempat_pertama} onChange={e => setTempatPertama(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Tempat Kedua</Label>
                    <TextArea rows={3} value={tempat_kedua} onChange={e => setTempatKedua(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Tempat Ketiga</Label>
                    <TextArea rows={3} value={tempat_ketiga} onChange={e => setTempatKetiga(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Keterangan lainnya</Label>
                    <TextArea rows={3} value={keterangan} onChange={e => setKeterangan(e.target.value)} />
                </InputBoxCenter>
                <InputBoxCenter style={{ backgroundColor: '#f7d794' }}>
                    <Label>Pengesahan</Label>
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Dikeluarkan pada tanggal</Label>
                    <DatePicker
                        //defaultValue={[moment(tanggaldikeluarkan, dateFormat)]}
                        onChange={onChangeTanggalDikeluarkan}
                        style={{ width: '100%', borderWidth: 0 }}
                    />
                </InputBoxCenter>
                <InputBoxCenter>
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
                        {listPegawai.map((data, index) =>
                            <Option value={data.id}>{data.nip} - {data.nama_pegawai}</Option>
                        )}
                    </Select>
                </InputBoxCenter>
                <InputBoxCenter style={{ backgroundColor: '#f7d794' }}>
                    <Label>Pengesahan Perbendaharaan</Label>
                </InputBoxCenter>
                <InputBoxCenter>
                    <Label>Penandatangan Keuanagn</Label>
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Select a person"
                        optionFilterProp="children"
                        style={{ width: '100%', borderWidth: 0 }}
                        onChange={onChangePenandatanganKeuangan}
                        value={penanda_tangan_keuangan}
                    >
                        {listPegawai.map((data, index) =>
                            <Option value={data.id}>{data.nip} - {data.nama_pegawai}</Option>
                        )}
                    </Select>
                </InputBoxCenter>
            </Modal>

            {/* Modal Print SPPD */}

            <Modal
                title="Print SPPD"
                centered
                visible={modalPrintSppd}
                //onOk={createorupdate}
                onCancel={modalTriggerPrintSppd}
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

            <Modal
                title="Print Kwitansi"
                centered
                visible={modalPrintKwitansi}
                //onOk={createorupdate}
                onCancel={modalTriggerPrintKwitansi}
                footer={null}
                width={1000}
            >
                <ComponentToPrintKwitansi
                    key={id}
                    ref={componentRef}
                    dataToPrint={id}
                />
                <ReactToPrint
                    trigger={() => <Button block type="primary" icon={<PrinterOutlined />}>Print</Button>}
                    content={() => componentRef.current}
                />

            </Modal>

            {/* Modal Pengikut */}

            <Modal
                title="Tambah Pengikut"
                centered
                visible={modalPengikut}
                onOk={() => createPengikut(id)}
                onCancel={modalTriggerPengikut}
                width={1000}
                footer={null}
            >
                <Form form={form} name="horizontal_login" layout="inline" onFinish={() => createPengikut(id)} style={{ backgroundColor: '#0984e3', padding: 20, }}>
                    <Row style={{ width: '100%', marginBottom: 5, backgroundColor: '#0984e3' }} >
                        <Col xs={2} sm={4} md={6} lg={4} xl={4}>
                            <Form.Item
                                name="satuan"
                                rules={[{ required: true, message: 'kosong' }]}
                            >
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    style={{ width: '100%', borderWidth: 0 }}
                                    onChange={onChangePengikut}
                                    value={pengikut}
                                >
                                    {listPegawai.map((data, index) =>
                                        <Option value={data.nama_pegawai}>{data.nip} - {data.nama_pegawai}</Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <Table columns={columnsPengikut} dataSource={listPengikut} />
            </Modal>

            <Modal
                title="Export Excel"
                centered
                visible={modalExport}
                //onOk={createorupdate}
                onCancel={modalExportTrigger}
                width={1000}
                footer={null}
            >
                <table style={{ width: '100%', marginBottom: 20 }} border={1} id="table-to-xls">
                    <tr>
                        <th>No</th>
                        <th>Nama Pegawai</th>
                        <th>Tanggal</th>
                        <th>Nomor SPD</th>
                        <th>Nomor Surat Tugas</th>
                        <th>Peraturan Perjalanan</th>
                    </tr>
                    {listSppd.map((data, index) =>
                        <tr>
                            <td>{data.no}</td>
                            <td>{data.nama_pegawai}</td>
                            <td>{moment(data.tgl_berangkat).format('LL')} -  {moment(data.tgl_pulang).format('LL')}</td>
                            <td>{data.nomor_surat}/{data.format_surat}</td>
                            <td>{data.nomor_surat_tugas}/{data.format_surat_tugas}</td>
                            <td>{data.peraturan}</td>
                        </tr>
                    )}
                </table>

                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"
                />
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



