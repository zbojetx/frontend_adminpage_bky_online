import React, { useEffect, useState } from 'react';
import { Layout, PageHeader, Row, Col, Button, Card, Modal, Popconfirm, Input, Table, notification } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  SkinOutlined,
  ShoppingCartOutlined,
  CarOutlined,
  UsergroupAddOutlined,
  CodeSandboxOutlined,
  TransactionOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { getSatuan, addSatuan, delSatuan } from '../api/api';
import { Typography } from 'antd';
import { Link, browserHistory } from 'react-router';
import { isLogin } from '../reducer/LocalStoradge';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import {
  createupdate,
} from '../api/api';


const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

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

function Updatepelayanan(props) {

  const [editorHtml, setEditorHtml] = useState('')
  const [theme, setTheme] = useState('snow')
  const [namapelayanan, setNamaPelayanan] = useState('')
  const [id, setId] = useState('')
  const [namainstansi, setNamaInstansi] = useState('');
  const [limitharian, setLimitharian] = useState('');
  const [logourl, setLogoUrl] = useState('');
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [kodeantrian, setKodeAntrian] = useState('')
  const [pelayanan, setPelayanan] = useState('')

  useEffect(() => {
    getUser()
    //getpelayanan()
  }, []);

  // const getpelayanan = async() => {
  //   let id = await props.location.state.id_pelayanan
  //   let data = await getpelayananid(id)
  //   setNamaPelayanan(data[0].nama_pelayanan)
  //   setEditorHtml(data[0].html)
  //   console.log(data)
  // }

  const getUser = async () => {
    let data = await isLogin()
    setId(data.data[0].id)
    setNamaInstansi(data.data[0].nama_instansi)
    setLimitharian(data.data[0].limit_harian)
    setLogoUrl(data.data[0].logo)
    setEmail(data.data[0].email)
    setUsername(data.data[0].username)
    setKodeAntrian(data.data[0].kode_antrian)
    console.log(data.data[0].nama_instansi)
  }

  const create = async(req, res) => {
    if(namainstansi === '' || id === ''){
        notification.open({
            message: 'Gagal Menyimnpan',
            description:
                'Form tidak boleh kosong',
            icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
        });
    }else{
        let id = await props.location.state.id_pelayanan
        let datas = {
            id: id,
            nama_pelayanan: namapelayanan,
            html: editorHtml
        }

        let regis = await createupdate(datas, 'updatepegawai')
        if(regis === 1){
            notification.open({
                message: 'Data Berhasil disimpan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#00b894' }} />,
            });
        }else{
            notification.open({
                message: 'Gagal Menyimpan Data',
                description:
                    '',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        }
    }
}

  const handleChange = (html) => {
    setEditorHtml(html)
  }

  return (
    <Content
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
      }}
    >

      <Card
        title="Pelayanan"
        extra={<Button type="dashed" onClick={() => browserHistory.push('/pelayanan')}>Kembali </Button>}
        style={{ width: '100%', borderWidth: 0 }}
        headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
      />
      <InputBoxAbove>
        <Label>Nama Pelayanan</Label>
        <Judul placeholder="Nama Pelayanan" value={namapelayanan} onChange={e => setNamaPelayanan(e.target.value)} />
      </InputBoxAbove>
      <InputBoxBottom>
        <ReactQuill
          theme={theme}
          onChange={handleChange}
          value={editorHtml}
          modules={Updatepelayanan.modules}
          formats={Updatepelayanan.formats}
          bounds={'.app'}
          placeholder="Detail Pelayanan"
        />
      </InputBoxBottom>
      <Buttonx onClick={create} >Simpan </Buttonx>
    </Content>
  )
}

Updatepelayanan.modules = {
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
Updatepelayanan.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

/*
 * PropType validation
 */



export default Updatepelayanan;