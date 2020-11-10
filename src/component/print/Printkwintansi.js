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
import NumberFormat from 'react-number-format'
import moment from 'moment';
import 'moment/locale/id';
moment.locale('id')

const terbilang = require('angka-menjadi-terbilang')

export class ComponentToPrintKwitansi extends React.Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            listPegawai: [],
            listSppd: [],
            penandatangan: [],
            penandatangankeuangan: [],
            kabkota: [],
            provinsi: [],
            instansi: [],
            pengikut: [],
            anggaran: [],
            total: 0
        };
    }

    componentDidMount() {
        this.getSppdByIdForPrint(this.props.dataToPrint)
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
            penandatangankeuangan: sppdbyid.penandatangankeuangan[0],
            kabkota: sppdbyid.kab_kota[0],
            provinsi: sppdbyid.provinsi[0],
            instansi: sppdbyid.instansi[0],
            pengikut: sppdbyid.pengikut,
            anggaran: sppdbyid.anggaran
        })
        const { anggaran, total } = this.state
        console.log(anggaran.length)
        let tootal = 0
        for (let i = 0; i < anggaran.length; i++) {
            tootal += parseInt(anggaran[i].jumlah)
            console.log(tootal)
            //setTotal(parseInt(total) + parseInt(rincian[i].jumlah))
            this.setState({
                total: tootal
            })
        }
        console.log(sppdbyid)
    }

    render() {
        const { listPegawai, listSppd, penandatangan, kabkota, provinsi, instansi, pengikut, anggaran, total, penandatangankeuangan } = this.state
        return (
            <table style={{ fontSize: 12, width: '100%' }}>
                <table style={{ width: '100%', marginBottom: 10 }}>
                    <tbody>
                        <tr>
                            <td style={{ fontSize: 16, color: 'black' }}>Rincian biaya perjalanan dinas</td>
                        </tr>
                    </tbody>
                </table>
                <table style={{ marginBottom: 20 }}>
                    <tbody>
                        <tr>
                            <td>Nomor Surat</td>
                            <td>:</td>
                            <td>{listSppd.nomor_surat}/{listSppd.format_surat}</td>
                        </tr>
                        <tr>
                            <td>Tanggal</td>
                            <td>:</td>
                            <td>{moment(listSppd.tanggalkeluar).format('LL')}</td>
                        </tr>
                    </tbody>
                </table>

                <table style={{ width: '100%', border: '1px solid black' }}>
                    <thead style={{ width: '100%', border: '1px solid black', fontWeight: 'bold' }}>
                        <tr style={{ width: '100%', border: '1px solid black' }}>
                            <td style={{ border: '1px solid black', padding: 10 }}>PERINCIAN BIAYA</td>
                            <td style={{ border: '1px solid black', padding: 10 }}>VOLUME</td>
                            <td style={{ border: '1px solid black', padding: 10 }}>Harga Satuan (Rp)</td>
                            <td style={{ border: '1px solid black', padding: 10 }}>Jumlah (Rp)</td>
                        </tr>
                    </thead>
                    <tbody style={{ width: '100%' }}>
                        <tr style={{ width: '100%', border: '1px solid black' }}>
                            <td style={{ border: '1px solid black', padding: 10 }}>
                                {anggaran.map((item, index) =>
                                    <> {item.uraian}<br /> </>
                                )}
                            </td>
                            <td style={{ border: '1px solid black', padding: 10 }}>
                                {anggaran.map((item, index) =>
                                    <>  {item.volume} {item.satuan} <br /></>
                                )}
                            </td>
                            <td style={{ border: '1px solid black', textAlign: 'right', padding: 10 }}>
                                {anggaran.map((item, index) =>
                                    <> <NumberFormat thousandSeparator={true} displayType={'text'} value={item.harga_satuan} /><br /></>
                                )}
                            </td>
                            <td style={{ border: '1px solid black', textAlign: 'right', padding: 10 }}>
                                {anggaran.map((item, index) =>
                                    <> <NumberFormat thousandSeparator={true} displayType={'text'} value={item.jumlah} /><br /></>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan='3' style={{ border: '1px solid black', textAlign: 'center', padding: 10, fontStyle: 'italic', fontWeight: 'bold' }}>Total</td>
                            <td style={{ border: '1px solid black', textAlign: 'right', padding: 10, fontWeight: 'bold' }}> <NumberFormat thousandSeparator={true} displayType={'text'} value={total} /></td>
                        </tr>
                        <tr>
                            <td colSpan='5' style={{ border: '1px solid black', textAlign: 'center', padding: 10, fontStyle: 'italic', fontWeight: 'bold' }}>{terbilang(total)} rupiah</td>
                        </tr>
                    </tbody>
                </table>
                <table style={{ width: '100%' }}>
                    <tr >
                        <td style={{ width: '50%', padding: 20 }}>
                            <br />
                            Telah dibayar sejumlah <b>Rp <NumberFormat thousandSeparator={true} displayType={'text'} value={total} /></b><br />
                            {() => {
                                if (penandatangankeuangan === null || undefined) {
                                    return <></>
                                } else {
                                    return (<>
                                        {penandatangankeuangan.jabatan},
                            <br />
                                        <br />
                                        <br />
                                        <br />
                                        <b>{penandatangankeuangan.nama_pegawai}<br /></b>
                                        <b>NIP. {penandatangankeuangan.nip} <br /></b>
                                    </>
                                    )
                                }
                            }}
                        </td>
                        <td style={{ width: '50%', padding: 20 }}>
                            {instansi.kota}, <b>{moment().format('LL')}</b><br />
                            Telah menerima uang sejumlah  <b>Rp <NumberFormat thousandSeparator={true} displayType={'text'} value={total} /></b><br />
                            Yang Menerima,
                            <br />
                            <br />
                            <br />
                            <br />
                            <b>{listPegawai.nama_pegawai}</b><br />
                            <b>NIP. {listPegawai.nip}</b>
                        </td>
                    </tr>
                </table>
            </table>
        );
    }

}