import React from 'react';
import { Layout, Row, Col, Card, Modal, Button, Popconfirm, Table, Input, notification, Select, DatePicker } from 'antd';
import {
    DeleteOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined,
    CloseCircleOutlined,
    PrinterOutlined,
    DollarCircleOutlined,
    EditOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { createupdate, getall, remove, getbyid } from '../../api/api';
import { Typography } from 'antd';
import { Link, browserHistory } from 'react-router';
//import { isLogin } from '../reducer/LocalStoradge';
import ReactToPrint from 'react-to-print';
import styled from 'styled-components';
import renderHTML from 'react-render-html';
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id')

export class ComponentToPrint extends React.Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            listSt: [],
            penandatangan: [],
            kabkota: [],
            provinsi: [],
            instansi: [],
            pelaksana: [],
            lamahari: 0,
        };
    }

    componentDidMount() {
        this.getSppdByIdForPrint(this.props.dataToPrint)
    }
    // const [listPegawai, setListPegawai] = useState([])
    // const [listSt, setlistSt] = useState([])
    // const [penandatangan, setPenandatangan] = useState([])
    // const [kabkota, setKabKota] = useState([])
    // const [provinsi, setProvinsi] = useState([])
    // const [instansi, setInstansi] = useState([])
    // const [pengikut, setPengikut] = useState([])

    // useEffect(() => {
    //     console.log(props.dataToPrint)
    // }, [])

    async getSppdByIdForPrint(id) {
        const url = 'getsurattugasbyidforprint'
        let sppdbyid = await getbyid(id, url)

        this.setState({

            listSt: sppdbyid.surattugas[0],
            penandatangan: sppdbyid.penandatangan[0],
            kabkota: sppdbyid.kab_kota[0],
            provinsi: sppdbyid.provinsi[0],
            instansi: sppdbyid.instansi[0],
            pelaksana: sppdbyid.pelaksana,
        })
        console.log(sppdbyid)
        await this.getLama()
        // setListPegawai(sppdbyid.pegawai[0])
        // setlistSt(sppdbyid.sppd[0])
        // setPenandatangan(sppdbyid.penandatangan[0])
        // setKabKota(sppdbyid.kab_kota[0])
        // setProvinsi(sppdbyid.provinsi[0])
        // setInstansi(sppdbyid.instansi[0])
        // setPengikut(sppdbyid.pengikut)
    }

    async getLama() {
        const { listSt } = this.state
        if (moment(listSt.tanggal_pulang).diff(moment(listSt.tanggal_berangkat), 'days') === 0) {
            this.setState({
                lamahari: 1,
            })
        } else {
            this.setState({
                lamahari: moment(listSt.tanggal_pulang).diff(moment(listSt.tanggal_berangkat), 'days')
            })
        }
    }


render() {
    const { listSt, penandatangan, kabkota, provinsi, instansi, pelaksana, lamahari } = this.state
    return (
        <table style={{ width: '100%', fontSize: 12, color: 'black' }}>
            <table style={{ width: '100%', marginBottom: 10 }}>
                <tbody>
                    <tr >
                        <td style={{ width: '10%', padding: 8, color: 'black ', textAlign: 'center' }}><img src={instansi.logo_url} style={{ width: 120 }} /></td>
                        <td style={{ width: '57%', padding: 8, color: 'black ', textAlign: 'center' }}>
                            <span style={{ fontFamily: 'Bookman Old Style', fontSize: 22, color: 'black ', fontWeight: 'bold' }}>KEMENTRIAN AGRARIA DAN TATA RUANG/</span><br />
                            <span style={{ fontFamily: 'Bookman Old Style', fontSize: 22, color: 'black ', fontWeight: 'bold' }}>BADAN PERTANAHAN NASIONAL</span><br />
                            <span style={{ fontFamily: 'Bookman Old Style', fontSize: 20, color: 'black ', }}>KANTOR PERTANAHAN KABUPATEN BENGKAYANG</span><br />
                            <span style={{ fontFamily: 'Bookman Old Style', fontSize: 20, color: 'black ', }}>PROVINSI KALIMANTAN BARAT</span><br />
                            <span style={{ fontSize: 12, }}>{instansi.alamat} Telp. {instansi.alamat} Email {instansi.email}</span><br />
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr style={{ borderWidth: 2, borderColor: 'black', marginBottom: 10 }} />
            <table style={{ width: '100%', marginBottom: 20 }}>
                <tbody>
                    <tr style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                        <td></td>
                        <td style={{ fontSize: 14, color: 'black ', fontWeight: 'bold' }}>SURAT TUGAS</td>
                    </tr>
                    <tr style={{ display: 'flex', alignContent: 'center', justifyContent: 'center', marginBottom: 10 }}>
                        <td></td>
                        <td style={{ fontSize: 14, color: 'black ', fontWeight: 'bold' }}>Nomor : {listSt.nomor_surat}/{listSt.format_nomor}</td>
                    </tr>
                </tbody>
            </table>

            <table style={{ width: '100%', fontSize: 14, padding: 20, color: 'black ' }}>
                <tbody style={{ width: '100%' }}>

                    <tr >
                        <td style={{ width: 120, display: 'flex', color: 'black ', justifyContent: 'flex-start', alignItems: 'flex-start' }}>Menimbang</td>
                        <td >{renderHTML(listSt.menimbang || '')}</td>
                    </tr>
                    <tr>
                        <td style={{ width: 20, display: 'flex', color: 'black ', justifyContent: 'flex-start', alignItems: 'flex-start' }}>Dasar</td>
                        <td >{renderHTML(listSt.dasar || '')}</td>
                    </tr>
                    <tr>
                        <td colSpan={10} style={{ textAlign: 'center', padding: 20 }}>MEMBERI TUGAS</td>
                    </tr>
                    <tr >
                        <td style={{ width: 20, display: 'flex', color: 'black ', justifyContent: 'flex-start', alignItems: 'flex-start' }}>Kepada</td>
                        <td>
                            {pelaksana.map((item, index) =>
                                <table style={{ fontSize: 14, color: 'black', marginBottom: 20 }}>
                                    <tr>
                                        <td style={{ width: 28 }}></td>
                                        <td style={{ width: 15, display: 'flex', color: 'black ', justifyContent: 'flex-start', alignItems: 'flex-start' }}>{index + 1}.</td>
                                        <td >
                                            Nama <br />
                                            NIP <br />
                                            Pangkat/Golongan <br />
                                            Jabatan <br />
                                        </td>
                                        <td>
                                            : <br />
                                            : <br />
                                            : <br />
                                            : <br />
                                        </td>
                                        <td>
                                            {item.nama_pegawai} <br />
                                            {item.nip} <br />
                                            {item.pangkat_gol} <br />
                                            {item.jabatan} <br />
                                        </td>
                                    </tr>
                                </table>
                            )}
                        </td>
                    </tr>
                    <tr >
                        <td style={{ width: 20, display: 'flex', color: 'black ', justifyContent: 'flex-start', alignItems: 'flex-start' }}>Tempat</td>
                        <td style={{ paddingLeft: 28 }}>{listSt.tempat}</td>
                    </tr>
                    <tr  >
                        <td style={{ width: 20, display: 'flex', color: 'black ', justifyContent: 'flex-start', alignItems: 'flex-start' }}>Selama</td>
                        <td style={{ paddingLeft: 28 }}>{lamahari} hari</td>
                    </tr>
                    <tr  >
                        <td style={{ width: 20, display: 'flex', color: 'black ', justifyContent: 'flex-start', alignItems: 'flex-start' }}>Tanggal</td>
                        <td style={{ paddingLeft: 28 }}>  {moment(listSt.tanggal_berangkat).format('LL')} s/d {moment(listSt.tanggal_pulang).format('LL')}</td>
                    </tr>
                    <tr >
                        <td style={{ width: 20, display: 'flex', color: 'black ', justifyContent: 'flex-start', alignItems: 'flex-start' }}>Untuk</td>
                        <td >{renderHTML(listSt.maksud || '')}</td>
                    </tr>
                    {/* <tr style={{ border: '4px solid black', borderWidth: 1, borderColor: 'black', marginTop: 1 }} >
                            <td style={{ width: '3%', border: '1px solid black', borderWidth: 1, borderColor: 'black', textAlign: 'center' }}>8</td>
                            <td style={{ width: '40%', padding: 8, border: '1px solid black', borderWidth: 1, borderColor: 'black' }}>Pengikut</td>
                            <td style={{ width: '57%', padding: 8, border: '1px solid black', borderWidth: 1, borderColor: 'black' }}>
                                {pengikut.map((nama, index) =>
                                    <>{index + 1}. {nama.pengikut} <br /></>
                                )}
                            </td>
                        </tr> */}
                </tbody>
            </table>
            <table style={{ width: '100%', fontSize: 14, padding: 20, color: 'black ' }}>
                <tr >
                    <td style={{ width: '50%', padding: 20 }}></td>
                    <td style={{ width: '50%', padding: 20 }}>
                        {instansi.kota}, {moment(listSt.tanggaldikeluarkan).format('LL')}<br />
                        {() => {
                            if (penandatangan === null || undefined) {
                                return <></>
                            } else {
                                return (<>
                                    {penandatangan.jabatan}<br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    {penandatangan.nama_pegawai}<br />
                                                NIP. {penandatangan.nip} <br />
                                </>
                                )
                            }
                        }}
                    </td>
                </tr>
            </table>
        </table>
    );
}

}