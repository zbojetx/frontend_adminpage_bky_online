import React, { useEffect, useState } from 'react';
import { Layout, PageHeader, Row, Col, Card, Modal, Button, Popconfirm, Table, Input, notification } from 'antd';
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
    DeleteOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { getAdmin, addAdmin, delAdmin } from './../api/api';
import { Typography } from 'antd';


const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

function Administreor() {

    const [modal, setModal] = useState(false)
    const [listAdmin, setListAdmin] = useState([])
    const [nama, setNama] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        getListAdmin()
    }, [])

    const showModal = () => {
        setModal(!modal)
    }

    const getListAdmin = async () => {
        const data = []
        let data_length = (await getAdmin()).length
        let admin = await getAdmin()
        console.log(admin)
        for (let i = 0; i < admin.length; i++) {
            data.push({
                id:  admin[i].id,
                no: i + 1,
                nama: admin[i].nama,
                username: admin[i].username,
                email: admin[i].email,
            })
        }
        setListAdmin(data)
    }

    const createAdmin = async () => {
        const datas ={
            nama,
            username,
            email,
            password
        }

        console.log(datas)

        const create = await addAdmin(datas)
        console.log(create)
        if(create === 1){
            notification.open({
                message: 'Administrator berhasil ditambah',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />,
            });
            resetForm()
            getListAdmin()
            showModal()
        }else{
            notification.open({
                message: 'Administrator gagal ditambahkan',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />,
            });
        }
    }

    const deleteAdmin = async (id) => {
        const deleteid = await delAdmin(id)
        if(deleteid === 1){
            notification.open({
                message: 'Administrator berhasil dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />,
            });
            getListAdmin()
        }else{
            notification.open({
                message: 'Administrator gagal dihapus',
                description:
                    '',
                icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />,
            });
        }
     }

    const resetForm = () => {
        setNama('')
        setUsername('')
        setEmail('')
        setPassword('')
    }
    const columns = [
        {
            title: 'Nomor',
            key: 'no',
            dataIndex: 'no',
        },
        {
            title: 'Nama',
            key: 'nama',
            dataIndex: 'nama'
        },
        {
            title: 'Username',
            key: 'username',
            dataIndex: 'username'
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Popconfirm
                        title="Anda yakin menghapus Data ini?"
                        onConfirm={() => deleteAdmin(record.id)}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button key="hapus_kategori" type="danger" icon={<DeleteOutlined />} >Hapus</Button>
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

            <Card
                title="Administrator"
                extra={<Button type="dashed" onClick={showModal}>Tambah Administrator</Button>}
                style={{ width: '100%', borderWidth: 0 }}
                headStyle={{ color: 'white', backgroundColor: '#0984e3', fontWeight: 'bold', fontSize: 20 }}
            />

            <Table columns={columns} dataSource={listAdmin} />

            <Modal
                title="Tambah Administrator"
                visible={modal}
                onOk={createAdmin}
                onCancel={showModal}
                width={800}
            >
                <Title style={{ fontSize:14,  }}>Nama</Title>
                <Input placeholder="Nama" value={nama} onChange={e => setNama(e.target.value)} />
                <Title style={{ fontSize:14, marginTop:20 }}>Username</Title>
                <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                <Title style={{ fontSize:14, marginTop:20 }}>Email</Title>
                <Input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
                <Title style={{ fontSize:14, marginTop:20 }}>Password</Title>
                <Input placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Modal>
        </Content>
    )
}

export default Administreor;