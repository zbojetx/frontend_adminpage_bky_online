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
            listPegawai: [],
            listSppd: [],
            penandatangan: [],
            kabkota: [],
            provinsi: [],
            instansi: [],
            pengikut: [],
            lamahari: 0,
        };
    }

    componentDidMount() {
        this.getSppdByIdForPrint(this.props.dataToPrint)
        console.log("II")
        console.log(this.props.dataToPrint)
    }

    // const [listPegawai, setListPegawai] = useState([])
    // const [listSppd, setListSppd] = useState([])
    // const [penandatangan, setPenandatangan] = useState([])
    // const [kabkota, setKabKota] = useState([])
    // const [provinsi, setProvinsi] = useState([])
    // const [instansi, setInstansi] = useState([])
    // const [pengikut, setPengikut] = useState([])

    // useEffect(() => {
    //     console.log(props.dataToPrint)
    // }, [])

    async getSppdByIdForPrint(id) {
        const url = 'getsppdbyidforprint'
        let sppdbyid = await getbyid(id, url)

        this.setState({
            listPegawai: sppdbyid.pegawai[0],
            listSppd: sppdbyid.sppd[0],
            penandatangan: sppdbyid.penandatangan[0],
            kabkota: sppdbyid.kab_kota[0],
            provinsi: sppdbyid.provinsi[0],
            instansi: sppdbyid.instansi[0],
            pengikut: sppdbyid.pengikut,
        })
        console.log(sppdbyid)
        this.getLama()
        // setListPegawai(sppdbyid.pegawai[0])
        // setListSppd(sppdbyid.sppd[0])
        // setPenandatangan(sppdbyid.penandatangan[0])
        // setKabKota(sppdbyid.kab_kota[0])
        // setProvinsi(sppdbyid.provinsi[0])
        // setInstansi(sppdbyid.instansi[0])
        // setPengikut(sppdbyid.pengikut)
    }

    async getLama() {
        const { listSppd } = this.state
        if (moment(listSppd.tanggal_pulang).diff(moment(listSppd.tanggal_berangkat), 'days') === 0) {
            this.setState({
                lamahari: 1,
            })
        } else {
            let lama = moment(listSppd.tanggal_pulang).diff(moment(listSppd.tanggal_berangkat), 'days')
            this.setState({
                lamahari: parseInt(lama)+1
            })
        }
    }


    render() {
        const { listPegawai, listSppd, penandatangan, kabkota, provinsi, instansi, pengikut, lamahari } = this.state
        return (
            // <table style={{ fontSize: 12, width: '100%', }}>
            <div className="container" style={{ margin: "0", padding: "0", fontSize: 12, color: 'black' }}>
                <div style={{ height: "100vh", padding: "5vh" }}>
                    <table style={{ width: '100%', fontSize: 12, color: 'black' }}>
                        <table style={{ width: '100%', marginBottom: 10, color: 'black' }}>
                            <tbody>
                                <tr >
                                    <td style={{ display: 'flex', alignContent: 'flex-start', justifyContent: 'flex-start' }}>Kementerian Agraria dan Tata Ruang/<br /> Badan Pertanahan Nasional</td>
                                    <td>
                                        <table style={{ width: '100%', marginBottom: 10, fontSize: 12, }}>
                                            <tr>
                                                <td>Lembar ke</td>
                                                <td>:</td>
                                                <td>1 (Pertama)</td>
                                            </tr>
                                            <tr>
                                                <td>Kode</td>
                                                <td>:</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>Nomor</td>
                                                <td>:</td>
                                                <td>{listSppd.nomor_surat}{listSppd.format_surat}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table style={{ width: '100%', marginBottom: 20 }}>
                            <tbody>
                                <tr style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                                    <td></td>
                                    <td style={{ fontSize: 14, color: 'black', fontWeight: 'bold' }}>SURAT PERJALANAN DINAS (SPD)</td>
                                </tr>
                            </tbody>
                        </table>

                        <table style={{ width: '100%', fontSize: 12 }}>
                            <tbody style={{ width: '100%' }}>
                                <tr style={{ width: '100%', border: '4px solid black', borderWidth: 1, borderColor: 'black', marginTop: 1 }}>
                                    <td style={{ width: '3%', border: '1px solid black', borderWidth: 1, borderColor: 'black', textAlign: 'center', color: 'black' }}>1</td>
                                    <td style={{ width: '40%', padding: 8, border: '1px solid black', borderWidth: 1, borderColor: 'black', color: 'black' }}>Pejabat Pembuat Komitmen</td>
                                    <td style={{ width: '57%', padding: 8, border: '1px solid black', borderWidth: 1, borderColor: 'black', color: 'black' }}>{penandatangan ? penandatangan.nama_pegawai : <></>}</td>
                                </tr>
                                <tr style={{ border: '4px solid black', borderWidth: 1, borderColor: 'black', marginTop: 1 }} >
                                    <td style={{ width: '3%', border: '1px solid black', borderWidth: 1, borderColor: 'black', textAlign: 'center', color: 'black' }}>2</td>
                                    <td style={{ width: '40%', padding: 8, border: '1px solid black', borderWidth: 1, borderColor: 'black', color: 'black' }}>Nama Pegawai yang diperintah mengadakan perjalanan</td>
                                    <td style={{ width: '57%', padding: 8, border: '1px solid black', borderWidth: 1, borderColor: 'black', color: 'black' }}>{listPegawai.nama_pegawai}</td>
                                </tr>
                                <tr style={{ border: '4px solid black', borderWidth: 1, borderColor: 'black', marginTop: 1 }} >
                                    <td style={{ width: '3%', border: '1px solid black', borderWidth: 1, borderColor: 'black', textAlign: 'center', color: 'black' }}>3</td>
                                    <td style={{ width: '40%', padding: 8, border: '1px solid black', borderWidth: 1, borderColor: 'black', color: 'black' }}>
                                        a. Pangkat dan Golongan<br />
                                    b. Jabatan<br />
                                    c. Tingkat menurut peraturan perjalanan
                                </td>
                                    <td style={{ width: '57%', padding: 8, border: '1px solid black', borderWidth: 1, borderColor: 'black', color: 'black' }}>
                                        {listPegawai.pangkat_gol}<br />
                                        {listPegawai.jabatan}<br />
                                        {listSppd.peraturan_perjalanan}
                                    </td>
                                </tr>
                                <tr style={{ border: '4px solid black', borderWidth: 1, borderColor: 'black', marginTop: 1, color: 'black' }} >
                                    <td style={{ width: '3%', border: '1px solid black', borderWidth: 1, borderColor: 'black', textAlign: 'center' }}>4</td>
                                    <td style={{ width: '40%', padding: 8, border: '1px solid black', borderWidth: 1, borderColor: 'black' }}>Maksud Perjalanan Dinas</td>
                                    <td style={{ width: '57%', padding: 8, border: '1px solid black', borderWidth: 1, borderColor: 'black' }}>{renderHTML(listSppd.maksud || '')}</td>
                                </tr>
                                <tr style={{ border: '4px solid black', borderWidth: 1, borderColor: 'black', marginTop: 1, color: 'black' }} >
                                    <td style={{ width: '3%', border: '1px solid black', borderWidth: 1, borderColor: 'black', textAlign: 'center' }}>5</td>
                                    <td style={{ width: '40%', padding: 8, border: '1px solid black', borderWidth: 1, borderColor: 'black' }}>Dasar Perjalanan Dinas</td>
                                    <td style={{ width: '57%', padding: 8, border: '1px solid black', borderWidth: 1, borderColor: 'black' }}>{renderHTML(listSppd.dasar || '')}</td>
                                </tr>
                                <tr style={{ border: '4px solid black', borderWidth: 1, borderColor: 'black', marginTop: 1 , color: 'black'}} >
                                    <td style={{ width: '3%', border: '1px solid black', borderWidth: 1, borderColor: 'black', textAlign: 'center' }}>6</td>
                                    <td style={{ width: '40%', padding: 8, border: '1px solid black', borderWidth: 1, borderColor: 'black' }}>
                                        a. Tempat berangkat<br />
                                    b. Tempat tujuan
                                </td>
                                    <td style={{ width: '57%', padding: 8, border: '1px solid black', borderWidth: 1, borderColor: 'black', color: 'black' }}>
                                        {instansi.kota}<br />
                                        {kabkota.nama}, {provinsi.nama}
                                    </td>
                                </tr>
                                <tr style={{ border: '4px solid black', borderWidth: 1, borderColor: 'black', marginTop: 1 , color: 'black'}} >
                                    <td style={{ width: '3%', border: '1px solid black', borderWidth: 1, borderColor: 'black', textAlign: 'center' }}>7</td>
                                    <td style={{ width: '40%', padding: 8, border: '1px solid black', borderWidth: 1, borderColor: 'black' }}>
                                        a. Lamanya Perjalanan<br />
                                    b. Tanggal Berangkat<br />
                                    c. Tanggal harus kembali
                                </td>
                                    <td style={{ width: '57%', padding: 8, border: '1px solid black', borderWidth: 1, borderColor: 'black', color: 'black' }}>
                                        {lamahari} hari <br />
                                        {moment(listSppd.tanggal_berangkat).format('LL')} <br />
                                        {moment(listSppd.tanggal_pulang).format('LL')}
                                    </td>
                                </tr>
                                <tr style={{ border: '4px solid black', borderWidth: 1, borderColor: 'black', marginTop: 1 , color: 'black'}} >
                                    <td style={{ width: '3%', border: '1px solid black', borderWidth: 1, borderColor: 'black', textAlign: 'center' }}>8</td>
                                    <td style={{ width: '40%', padding: 8, border: '1px solid black', borderWidth: 1, borderColor: 'black' }}>Pengikut</td>
                                    <td style={{ width: '57%', padding: 8, border: '1px solid black', borderWidth: 1, borderColor: 'black' }}>
                                        {pengikut.map((nama, index) =>
                                            <>{index + 1}. {nama.pengikut} <br /></>
                                        )}
                                    </td>
                                </tr>
                                <tr style={{ border: '4px solid black', borderWidth: 1, borderColor: 'black', marginTop: 1 , color: 'black'}} >
                                    <td style={{ width: '3%', border: '1px solid black', borderWidth: 1, borderColor: 'black', textAlign: 'center' }}>9</td>
                                    <td style={{ width: '40%', padding: 8, border: '1px solid black', borderWidth: 1, borderColor: 'black' }}>Keterangan lainnya</td>
                                    <td style={{ width: '57%', padding: 8, border: '1px solid black', borderWidth: 1, borderColor: 'black' }}>{listSppd.keterangan}</td>
                                </tr>

                            </tbody>
                        </table>
                        <table style={{ fontSize: 12, color: 'black' }}>
                            <tr >
                                <td style={{ width: '55%', padding: 20 }}></td>
                                <td style={{ width: '40%', padding: 20 }}>
                                    Dikeluarkan di {instansi.kota}<br />
                                    Pada tanggal {moment(listSppd.tanggaldikeluarkan).format('LL')}<br />
                                    {(() => {
                                        if (penandatangan === undefined || null || "") {
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
                                    })()}
                                </td>
                            </tr>
                        </table>
                    </table>
                </div>
                <div style={{ height: "100%", padding: "5vh" }}>
                    <table style={{ width: '100%', fontSize: 12, color: 'black' }}>
                        <table style={{ border: '1px solid black', width: '100%', color: 'black' }}>
                            <tr>
                                <td style={{ border: '1px solid black', width: '50%' }}></td>
                                <td style={{ border: '1px solid black', width: '50%', padding: 10 }}>
                                    <table style={{color: 'black'}}>
                                        <tr>
                                            <td>I. </td>
                                            <td>Berangkat dari</td>
                                            <td>:</td>
                                            <td>{instansi.kota}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>(Tempat kedudukan)</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>Ke</td>
                                            <td>:</td>
                                            <td>{kabkota.nama}, {provinsi.nama}</td>
                                        </tr>
                                        <tr>
                                            <td> </td>
                                            <td>Pada tanggal</td>
                                            <td>:</td>
                                        </tr>
                                    </table>
                                    <div style={{ width: '100%', padding: 20, textAlign: 'center' , color: 'black' }}>
                                        {(() => {
                                            if (penandatangan === undefined || null || "") {
                                                return <></>
                                            } else if (penandatangan.jabatan !== 'Kepala Kantor Pertanahan Kabupaten Bengkayang') {
                                                return (<>
                                                    An .Kepala Kantor Pertanahan<br />
                                 Kabupaten Bengkayang<br />
                                                    {penandatangan.jabatan}<br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <u>{penandatangan.nama_pegawai}</u><br />
                                             NIP. {penandatangan.nip} <br />
                                                </>
                                                )

                                            } else {
                                                return (<>
                                                    Kepala Kantor Pertanahan<br />
                                 Kabupaten Bengkayang<br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <u>{penandatangan.nama_pegawai}</u><br />
                                             NIP. {penandatangan.nip} <br />
                                                </>
                                                )
                                            }
                                        })()}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', width: '50%', padding: 10, color: 'black' }}>
                                    <table style={{}}>
                                        <tr>
                                            <td>II. </td>
                                            <td>Tiba di</td>
                                            <td>:</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td> </td>
                                            <td>Pada tanggal</td>
                                            <td>:</td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>

                                    </table>
                                </td>
                                <td style={{ border: '1px solid black', width: '50%', padding: 10 }}>
                                    <table style={{color: 'black'}}>
                                        <tr>
                                            <td></td>
                                            <td>Berangkat dari</td>
                                            <td>:</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>Ke</td>
                                            <td>:</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td> </td>
                                            <td>Pada tanggal</td>
                                            <td>:</td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>

                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', width: '50%', padding: 10, color: 'black' }}>
                                    <table style={{ color: 'black'}}>
                                        <tr>
                                            <td>III. </td>
                                            <td>Tiba di</td>
                                            <td>:</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td> </td>
                                            <td>Pada tanggal</td>
                                            <td>:</td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>

                                    </table>
                                </td>
                                <td style={{ border: '1px solid black', width: '50%', padding: 10 , color: 'black'}}>
                                    <table style={{color: 'black'}}>
                                        <tr>
                                            <td></td>
                                            <td>Berangkat dari</td>
                                            <td>:</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>Ke</td>
                                            <td>:</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td> </td>
                                            <td>Pada tanggal</td>
                                            <td>:</td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                        </tr>

                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style={{ border: '1px solid black', width: '50%', padding: 10 }}>
                                    <table style={{color: 'black'}}>
                                        <tr>
                                            <td>IV. </td>
                                            <td>Tiba di</td>
                                            <td>:</td>
                                            <td>{instansi.kota}</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>(Tempat kedudukan)</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td> </td>
                                            <td>Pada tanggal</td>
                                            <td>:</td>
                                        </tr>
                                    </table>
                                    <div style={{ width: '100%', padding: 20, textAlign: 'center', color: 'black' }}>
                                        {(() => {
                                            if (penandatangan === undefined || null || "") {
                                                return <></>
                                            } else {
                                                return (<>
                                                    Pejabat Pembuat Komitmen<br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <u>{penandatangan.nama_pegawai}</u><br />
                                            NIP. {penandatangan.nip} <br />
                                                </>
                                                )
                                            }
                                        })()}
                                    </div>
                                </td>
                                <td style={{ border: '1px solid black', width: '50%', padding: 10 }}>
                                    <table style={{color: 'black'}}>
                                        <tr>
                                            <td></td>
                                            <td>Telah diperiksa dengan keterangan bahwa perjalanan tersebut atas perintahnya dan semata-mata untuk kepentingan jabatan dalam waktu yang sesingkat-singkatnya</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td><br /></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </table>
                                    <div style={{ width: '100%', padding: 20, textAlign: 'center' }}>
                                        {(() => {
                                            if (penandatangan === undefined || null || "") {
                                                return <></>
                                            } else {
                                                return (<>
                                                    Pejabat Pembuat Komitmen<br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <br />
                                                    <u>{penandatangan.nama_pegawai}</u><br />
                                            NIP. {penandatangan.nip} <br />
                                                </>
                                                )
                                            }
                                        })()}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} style={{ border: '1px solid black', width: '100%', padding: 10 }}>
                                    <table style={{color: 'black'}}>
                                        <tr>
                                            <td>V. </td>
                                            <td>Telah diperiksa dengan keterangan bahwa perjalanan tersebut atas perintahnya dan semata-mata untuk kepentingan jabatan dalam waktu yang sesingkat-singkatnya</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2} style={{ border: '1px solid black', width: '100%', padding: 10 }}>
                                    <table style={{color: 'black'}}>
                                        <tr>
                                            <td>VI. </td>
                                            <td>PERHATIAN: </td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td>PPK yang menerbitkan SPD, pegawai yang melakukan perjalanan dinas, para pejabat yangmengesahkan tanggal berangkat / tiba, serta bendahara pengeluaran bertanggung jawab berdasarkan peraturan-peraturan Keuangan Negara apabila negara menderita rugi akibat kesalahan, kelalaian dan kealpaannya.</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </table>
                </div>
            </div>
        );
    }

}