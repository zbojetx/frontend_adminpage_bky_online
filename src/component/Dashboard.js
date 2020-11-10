import React, { useState, useEffect } from 'react';
import { Layout, PageHeader, Row, Col, Card, Typography } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    SkinOutlined,
    ShoppingCartOutlined,
    CarOutlined,
    UsergroupAddOutlined,
    CodeSandboxOutlined,
    TransactionOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css';
import { createupdate, getall, remove, getbyid, getallpost } from '../api/api';
import { Link, browserHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import NumberFormat from 'react-number-format'

const { Title } = Typography;

const CardBox = styled.div`
    border: 1px solid #a5b1c2;
    margin-top: 20px;
    padding: 10px;
    border : 5px;
`;
const Label = styled.p`
    margin-bottom: 2px;
    font-weight: bold;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
`;
const { Header, Sider, Content } = Layout;

function Dashboard() {
    const counter = useSelector(state => state.counter)
    const dispatch = useDispatch();
    const [dashboard, setDashboard] = useState([])
    const [pegawai, setPegawai] = useState('')
    const [st, setSt] = useState('')
    const [sppd, setSppd] = useState('')
    const [anggaran, setAnggaran] = useState('')

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const data = []
        const url = 'dashboard'
        let dashboardData = await getall(url)
        setPegawai(dashboardData.jumlahpegawai[0].total)
        setSt(dashboardData.jumlahsurattugas[0].total)
        setSppd(dashboardData.jumlahsppd[0].total)
        setAnggaran(dashboardData.totalanggaran[0].total)
    }

    const logout = async () => {
        await localStorage.clear()
        browserHistory.push('/')
    }

    return (
        <Content
            //className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}
        >

            <Row style={{ width: "100%" }}>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} style={{ padding: 10 }}>
                    <Card
                        style={{ width: '100%', borderWidth: 1 }}
                    >
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <img src="https://www.flaticon.com/svg/static/icons/svg/3616/3616975.svg" style={{ width: 80 }} />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Title style={{ fontSize: 35}}>{pegawai}</Title>
                                <Title style={{ fontSize: 16, marginTop: -20 }}>Pegawai</Title>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} style={{ padding: 10 }}>
                    <Card
                        style={{ width: '100%', borderWidth: 1 }}
                    >
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <img src="https://www.flaticon.com/svg/static/icons/svg/3617/3617143.svg" style={{ width: 80 }} />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Title>{st}</Title>
                                <Title style={{ fontSize: 16, marginTop: -20 }}>Surat Tugas</Title>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} style={{ padding: 10 }}>
                    <Card
                        style={{ width: '100%', borderWidth: 1 }}
                    >
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <img src="https://www.flaticon.com/svg/static/icons/svg/3617/3617174.svg" style={{ width: 80 }} />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Title>{sppd}</Title>
                                <Title style={{ fontSize: 16, marginTop: -20 }}>SPD</Title>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6} style={{ padding: 10 }}>
                    <Card
                        style={{ width: '100%', borderWidth: 1 }}
                    >
                        <Row>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <img src="https://www.flaticon.com/svg/static/icons/svg/3616/3616866.svg" style={{ width: 80 }} />
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} >
                                <Title style={{ fontSize: 24 }}>Rp <NumberFormat thousandSeparator={true} displayType={'text'} value={anggaran} /></Title>
                                <Title style={{ fontSize: 16, marginTop: -10 }}>Anggaran</Title>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Content>
    )
}

export default Dashboard;