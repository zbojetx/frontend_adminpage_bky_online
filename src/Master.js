import React, { useState, useEffect } from 'react';
import { Link, browserHistory, Redirect } from 'react-router';
import { Layout, Menu, Divider, Typography, Button } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    MobileTwoTone,
    SkinOutlined,
    SmileTwoTone ,
    SoundTwoTone ,
    FolderOpenTwoTone ,
    ProfileTwoTone,
    ShopTwoTone,
    AppstoreTwoTone,
    SnippetsTwoTone,
    DatabaseTwoTone,
    CrownTwoTone,
    DashboardTwoTone,
    LogoutOutlined,
    UserAddOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './Master.css';
import { useSelector, useDispatch } from 'react-redux';
import { isLogin } from './reducer/LocalStoradge'
import { createBrowserHistory } from "history"

//const history = createBrowserHistory()

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu
const { Title } = Typography;

export default function Master(props) {
    const [collapsed, setCollapsed] = useState(false);
    const datasFromReducer = useSelector(state => state.savedDatas)
    const [datas, setDatas] = useState([])
    const [dataUsers, setDataUsers] = useState([])
    const dispatch = useDispatch();
    const [login, setLogin] = useState(true)

    useEffect(async () => {
        await isLoginFunc()
        // if(login === false){
        //    return  <Redirect to={'/'} />
        // }
    }, [])

    const isLoginFunc = async () => {
        const loginDatas = await isLogin()
        console.log(loginDatas)
        if (loginDatas !== null) {
            setLogin(true)
            setDatas(loginDatas)
            setDataUsers(loginDatas.data[0])
        } else {
            setLogin(false)
        }
        console.log(loginDatas)
    }

    const logout = async () => {
        localStorage.clear()
        setLogin(false)
        window.location.href = '/';
    }

    const toggle = () => {
        setCollapsed(!collapsed)
        console.log(dataUsers)
    }

    const toLogin = () => {
        window.location.href = '/';
    }

    if (login) {
        return (

            <Layout style={{ height: '100%' }}>
                <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: 'white', overflow: 'auto' }}>
                    <div className="logo" style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>e-superdina</div>
                    {dataUsers.akses === 'admin' && (
                        <Menu mode="inline" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1" onClick={() => browserHistory.push('/dashboard')} >
                                <DashboardTwoTone twoToneColor="#eb2f96" />
                                <span>Dashboard</span>
                            </Menu.Item>
                            <Menu.Item key="2" onClick={() => browserHistory.push('/instansi')}>
                                <ShopTwoTone twoToneColor="#05c46b" />
                                <span>Profil Instansi</span>
                            </Menu.Item>
                            <Menu.Item key="seksibidang" onClick={() => browserHistory.push('/bidang')}>
                                <AppstoreTwoTone twoToneColor="#c23616" />
                                <span>Seksi / Bidang</span>
                            </Menu.Item>
                            <Menu.Item key="pegawai" onClick={() => browserHistory.push('/pegawai')}>
                                <CrownTwoTone twoToneColor="#546de5" />
                                <span>Pegawai</span>
                            </Menu.Item>
                            <SubMenu key="stppd"
                                title={
                                    <span>
                                        <SnippetsTwoTone twoToneColor="#f0932b" />
                                        <span>Surat Tugas & SPPD</span>
                                    </span>
                                }>
                                <Menu.Item key="7" onClick={() => browserHistory.push('/surattugas')}>
                                    <span>Surat Tugas</span>
                                </Menu.Item>
                                <Menu.Item key="8" onClick={() => browserHistory.push('/sppd')}>
                                    <span>SPPD</span>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="permohonan"
                                title={
                                    <span>
                                        <FolderOpenTwoTone twoToneColor="#2c3e50" />
                                        <span>Master Permohonan</span>
                                    </span>
                                }>
                                <Menu.Item key="sub_permohonan" onClick={() => browserHistory.push('/inputpermohonan')}>
                                    <span>Input Permohonan</span>
                                </Menu.Item>
                                <Menu.Item key="sub_formulir" onClick={() => browserHistory.push('/inputformulir')}>
                                    <span>Formulir</span>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="mobile_app"
                                title={
                                    <span>
                                        <MobileTwoTone twoToneColor="#16a085" />
                                        <span>Mobile Apps</span>
                                    </span>
                                }>
                                <Menu.Item key="sub_banner" onClick={() => browserHistory.push('/banner')}>
                                    <span>Banner</span>
                                </Menu.Item>
                                <Menu.Item key="sub_artikel" onClick={() => browserHistory.push('/article')}>
                                    <span>Berita / Artikel</span>
                                </Menu.Item>
                                <Menu.Item key="sub_qna" onClick={() => browserHistory.push('/qna')}>
                                    <span>Q & A</span>
                                </Menu.Item>
                                <Menu.Item key="sub_kritiksaran" onClick={() => browserHistory.push('/saran')}>
                                    <span>Kritik & Saran</span>
                                </Menu.Item>
                                <Menu.Item key="sub_pengaduan" onClick={() => browserHistory.push('/article')}>
                                    <span>Pengaduan</span>
                                </Menu.Item>
                                <Menu.Item key="sub_sosmed" onClick={() => browserHistory.push('/sosmed')}>
                                    <span>Sosial Media</span>
                                </Menu.Item>
                            </SubMenu>
                            
                            <SubMenu key="appd"
                                title={
                                    <span>
                                        <DatabaseTwoTone twoToneColor="#574b90" />
                                        <span>Master Data</span>
                                    </span>
                                }>
                                <Menu.Item key="9" onClick={() => browserHistory.push('/attr')}>
                                    <span>Data Pendukung</span>
                                </Menu.Item>
                            </SubMenu>
                            {/* <SubMenu icon={<AppstoreOutlined />} title="Master Data" >
                                <Menu.Item> <HeartOutlined /> Puskesmas</Menu.Item>
                                <Menu.Item> <UserAddOutlined /> Administrator</Menu.Item>
                            </SubMenu> */}
                            <SubMenu key="user"
                                title={
                                    <span>
                                        <SmileTwoTone twoToneColor="#2e86de" />
                                        <span>User</span>
                                    </span>
                                }>
                                <Menu.Item key="sub_petugas_loket" onClick={() => browserHistory.push('/petugasloket')}>
                                    <span>Petugas Loket</span>
                                </Menu.Item>
                                <Menu.Item key="sub_pemohon" onClick={() => browserHistory.push('/pemohon')}>
                                    <span>Pemohon</span>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key="administrator" onClick={() => browserHistory.push('/administrator')} >
                                <UserAddOutlined />
                                <span>Administrator</span>
                            </Menu.Item>
                        </Menu>
                    )
                    }



                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}
                        <div style={{ paddingRight: 20, float: 'right' }}>
                            <span style={{ fontWeight: 'bold', marginRight: 20 }}>{dataUsers.nama}</span><Button type="danger" onClick={logout} icon={<LogoutOutlined />}></Button>
                        </div>
                    </Header>
                    {props.children}
                </Layout>
            </Layout>
        )
    } else {
        return toLogin()
    }
}


