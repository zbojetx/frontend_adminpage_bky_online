import React, { useState, useEffect } from 'react';
import {
    Layout,
    PageHeader,
    Row,
    Col,
    Modal,
    Form,
    Input,
    Button,
    Space,
    Divider,
    notification,
    Select,
    Table,
    Popconfirm
} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    SkinOutlined,
    ShoppingCartOutlined,
    CarOutlined,
    UsergroupAddOutlined,
    CodeSandboxOutlined,
    DeleteOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { useSelector, useDispatch } from 'react-redux';
import {
    get_akun,
    get_other,
    get_jenis,
    create_anggaran_murni,
    get_rekening
} from './../api/api';
import { Link, browserHistory } from 'react-router';

const { Header, Sider, Content } = Layout;
const { Option } = Select;

function InputAnggaran() {
    const [showModalMain, setShowModalMain] = useState(false)
    const [akunList, setAkunList] = useState([])
    const [akun, setAkun] = useState(null)
    const [kelompokList, setKelompokList] = useState([])
    const [kelompok, setKelompok] = useState(null)
    const [jenisList, setJenisList] = useState([])
    const [jenis, setJenis] = useState(null)
    const [objekList, setObjekList] = useState([])
    const [objek, setObjek] = useState(null)
    const [rincianObjekList, setRincianObjekList] = useState([])
    const [rincianObjek, setRincianObjek] = useState(null)
    const [subRincianObjekList, setSubRincianObjekList] = useState([])
    const [subRincianObjek, setSubRincianObjek] = useState(null)

    const [puskesmass, setPuskesmas] = useState('')
    const [sumberdana, setSumberDana] = useState('')
    const [nilarekening, setNilaiRekening] = useState('')
    const [listRekening, setListRekening] = useState([])
    const counter = useSelector(state => state.counter)

    const params = {
        "akun": null,
        "kelompok": null,
        "jenis": null,
        "objek": null,
        "rincian_objek": null,
        "sub_rincian_objek": null
    }

    const puskesmas = [
        {
            "nama_puskesmas": "Puskesmas Selakau",
            "nama_kepala_puskesmas": "dr. Ahmad Dhani"
        },
        {
            "nama_puskesmas": "Puskesmas Sambas",
            "nama_kepala_puskesmas": "dr. Boyke"
        },
        {
            "nama_puskesmas": "Puskesmas Tebas",
            "nama_kepala_puskesmas": "dr. Suratman"
        },
        {
            "nama_puskesmas": "Puskesmas Pemangkat",
            "nama_kepala_puskesmas": "dr. Saiful"
        },
        {
            "nama_puskesmas": "Puskesmas Temajuk",
            "nama_kepala_puskesmas": "dr. Rustam"
        },
    ]

    const sumber_dana = [
        {
            "sumber_dana": "BLUD"
        },
        {
            "sumber_dana": "PAD"
        },
    ]

    useEffect(() => {
        getAkunList()
        getrekening()
    }, [])

    //================================== GET LIST FUNCTION

    const getAkunList = async () => {
        const datas = await get_akun()
        setAkunList(datas)
    }

    const getKelompokList = async () => {
        console.log(params)
        const par = "kelompok"
        const datas = await get_other(params, par)
        setKelompokList(datas)
    }

    const getJenisList = async () => {
        console.log(params)
        const par = "jenis"
        const datas = await get_other(params, par)
        setJenisList(datas)
        console.log(datas)
    }

    const getObjekList = async () => {
        console.log(params)
        const par = "objek"
        const datas = await get_other(params, par)
        setObjekList(datas)
        console.log(datas)
    }

    const getRincianObjekList = async () => {
        console.log(params)
        const par = "rincian_objek"
        const datas = await get_other(params, par)
        setRincianObjekList(datas)
        console.log(datas)
    }

    const getSubRincianObjekList = async () => {
        console.log(params)
        const par = "sub_rincian_objek"
        const datas = await get_other(params, par)
        setSubRincianObjekList(datas)
        console.log(datas)
    }

    //=============================== MODAL TRIGGER

    const showModalMainTrig = () => {
        setShowModalMain(!showModalMain)
    }


    //================================= ONCHANGE FUNCTION

    const onChangeAkun = async (values) => {
        await setAkun(values)
        params.akun = values
        getKelompokList()
    }

    const onChangeKelompok = async (values) => {
        await setKelompok(values)
        params.akun = akun
        params.kelompok = values
        getJenisList()
    }

    const onChangeJenis = async (values) => {
        await setJenis(values)
        params.akun = akun
        params.kelompok = kelompok
        params.jenis = values
        getObjekList()
    }

    const onChangeObjek = async (values) => {
        await setObjek(values)
        params.akun = akun
        params.kelompok = kelompok
        params.jenis = jenis
        params.objek = values
        getRincianObjekList()
    }

    const onChangeRincianObjek = async (values) => {
        await setRincianObjek(values)
        params.akun = akun
        params.kelompok = kelompok
        params.jenis = jenis
        params.objek = objek
        params.rincian_objek = values
        getSubRincianObjekList()
    }

    const onChangeSubRincianObjek = async (values) => {
        await setSubRincianObjek(values)
        params.akun = akun
        params.kelompok = kelompok
        params.jenis = jenis
        params.objek = objek
        params.rincian_objek = rincianObjek
        params.sub_rincian_objek = values
        //getSubRincianObjekList()
    }

    const onChnageFaskes = async (values) => {
        await setPuskesmas(values)
    }

    const onChangeSumberDana = async (values) => {
        await setSumberDana(values)
    }

    //====================================== Buat Rekening
    const createRekening = async () => {
        const kode_rekening = `${akun}.${kelompok}.${jenis}.${objek}.${rincianObjek}.${subRincianObjek}`
        const create_param = {
            "kode": kode_rekening,
            "nama_puskesmas": puskesmass,
            "sumber_dana": sumberdana,
            "nilai_rekening": nilarekening
        }

        const create = await create_anggaran_murni(create_param)
        console.log(create)
        if (create === 1) {
            setShowModalMain(false)
            resetform()
            notification.open({
                message: 'Tambah Rekening Sukses',
                description:
                    'Berhasil menambah rekening',
                icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />,
            });
            getrekening()
        }
    }

    //============================================= RESET FORM

    const resetform = () => {
        setAkun('')
        setKelompok('')
        setJenis('')
        setObjek('')
        setRincianObjek('')
        setSubRincianObjek('')
        setPuskesmas('')
        setSumberDana('')
        setNilaiRekening('')
    }

    //============================================= GET REKENING
    async function getrekening() {
        const data = []
        let data_length = (await get_rekening()).length
        let rekening = await get_rekening()
        for (let i = 0; i < data_length; i++) {
            data.push({
                no: i + 1,
                no_rekening: rekening[i].nomor_rekening,
                nama_puskesmas: rekening[i].nama_puskesmas,
                sumber_dana: rekening[i].sumber,
                nilai_rekening: rekening[i].nilai_rekening,
            })
        }
        setListRekening(data)
    }


    //================================================ TABLE COLUMNS

    const columns = [
        {
            title: 'Nomor',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Nomor Rekening',
            key: 'nomor_rekening',
            dataIndex: 'no_rekening'
        },
        {
            title: 'Nama Puskesmas',
            key: 'nama_puskesmas',
            dataIndex: 'nama_puskesmas'
        },
        {
            title: 'Sumber Dana',
            key: 'sumber_dana',
            dataIndex: 'sumber_dana'
        },
        {
            title: 'Nilai Rekening',
            key: 'nilai_rekening',
            dataIndex: 'nilai_rekening'
        },
        {
            title: 'Rincian',
            key: 'action',
            render: (text, record) => (
                <Button key="add_rincian" type="primary" onClick={() => browserHistory.push({ pathname: '/kurir', state: { nomor_rekening: text.no_rekening } })} icon={<ShoppingCartOutlined />} >Input / Edit Rincian</Button>
            ),
        },
        {
            title: '#',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        //onConfirm={() => hapus(record.id)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button key="hapus_kategori" type="danger" icon={<DeleteOutlined />} >Hapus Rekening</Button>
                    </Popconfirm>
                </span>
            ),
        },
    ];


    return (
        <Content
            className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}
        >
            <PageHeader
                className="site-page-header"
                title="Input Anggaran Murni"
                //breadcrumb={{ routes }}
                subTitle="Konsumen Page Content Here"
                extra={[
                    <Button key="1" onClick={showModalMainTrig}>
                        Tambah Rekening
                    </Button>,
                ]}
            />
            <Divider />

            <Table columns={columns} dataSource={listRekening} />

            <Modal
                title="Input Anggaran"
                visible={showModalMain}
                onOk={createRekening}
                onCancel={showModalMainTrig}
                width={800}
            >

                <div style={{ marginBottom: 20 }}>
                    <p style={{ fontWeight: 'bold' }}>Kode Rekening</p>
                    {/* akun */}
                    <Select
                        style={{ width: '100%', marginBottom: 10 }}
                        placeholder="Pilih Kode Akun"
                        value={akun}
                        onChange={onChangeAkun}
                    >
                        {akunList.map((akun, index) =>
                            <Option value={akun.akun}>{akun.akun} . {akun.judul} </Option>
                        )}
                    </Select>
                    {/* kelompok */}
                    <Select
                        style={{ width: '100%', marginBottom: 10 }}
                        placeholder="Pilih Kode Kelompok"
                        value={kelompok}
                        onChange={onChangeKelompok}
                    >
                        {kelompokList.map((data, index) =>
                            <Option value={data.kelompok}>{data.kelompok} . {data.judul} </Option>
                        )}
                    </Select>
                    {/* jenis */}
                    <Select
                        style={{ width: '100%', marginBottom: 10 }}
                        placeholder="Pilih Kode Jenis"
                        value={jenis}
                        onChange={onChangeJenis}
                    >
                        {jenisList.map((data, index) =>
                            <Option value={data.jenis}>{data.jenis} . {data.judul} </Option>
                        )}
                    </Select>
                    {/* objek */}
                    <Select
                        style={{ width: '100%', marginBottom: 10 }}
                        placeholder="Pilih Kode Objek"
                        value={objek}
                        onChange={onChangeObjek}
                    >
                        {objekList.map((data, index) =>
                            <Option value={data.objek}>{data.objek} . {data.judul} </Option>
                        )}
                    </Select>
                    {/* rincian objek */}
                    <Select
                        style={{ width: '100%', marginBottom: 10 }}
                        placeholder="Pilih Kode Objek"
                        value={rincianObjek}
                        onChange={onChangeRincianObjek}
                    >
                        {rincianObjekList.map((data, index) =>
                            <Option value={data.rincian_objek}>{data.rincian_objek} . {data.judul} </Option>
                        )}
                    </Select>
                    {/* sub rincian objekobjek */}
                    <Select
                        style={{ width: '100%', marginBottom: 10 }}
                        placeholder="Pilih Kode Objek"
                        value={subRincianObjek}
                        onChange={onChangeSubRincianObjek}
                    >
                        {subRincianObjekList.map((data, index) =>
                            <Option value={data.sub_rincian_objek}>{data.sub_rincian_objek} . {data.judul} </Option>
                        )}
                    </Select>

                </div>
                <Divider />
                <p style={{ fontWeight: 'bold' }}>Fasilitas Kesehatan</p>
                <Select
                    style={{ width: '100%', marginBottom: 10 }}
                    placeholder="Pilih Puskesmas"
                    value={puskesmass}
                    onChange={onChnageFaskes}
                >
                    {puskesmas.map((pusk, index) =>
                        <Option value={pusk.nama_puskesmas}>{pusk.nama_puskesmas} - {pusk.nama_kepala_puskesmas} </Option>
                    )}
                </Select>
                <Divider />
                <p style={{ fontWeight: 'bold' }}>Sumber Dana</p>
                <Select
                    style={{ width: '100%', marginBottom: 10 }}
                    placeholder="Pilih Sumber Dana"
                    value={sumberdana}
                    onChange={onChangeSumberDana}
                >
                    {sumber_dana.map((sumber, index) =>
                        <Option value={sumber.sumber_dana}>{sumber.sumber_dana}  </Option>
                    )}
                </Select>
                <Divider />
                <p style={{ fontWeight: 'bold' }}>Nilai Rekening</p>
                <Input
                    placeholder="Nilai Rekening"
                    value={nilarekening}
                    onChange={(e) => setNilaiRekening(e.target.value)}
                />

            </Modal>
        </Content>
    )
}

export default InputAnggaran;