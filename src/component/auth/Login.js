import React, { useEffect, useState } from 'react'
import { Layout, Modal, Row, Col, notification } from 'antd'
import styled from 'styled-components'
import 'antd/dist/antd.css';
import { Link, browserHistory } from 'react-router';
import {
    login,
} from './../../api/api';
import {
    CloseCircleOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

const endpoint = process.env.REACT_APP_ENDPOINT_URL

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

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

const Input = styled.input`
    width: 100%;
    border: 0px;
    font-family: 'Montserrat', sans-serif;
    &:focus{
        outline: none;
    }
`;
const Title = styled.h1`
    font-family: 'Bree Serif', serif;
`;

const SubTitle = styled.h2`
    font-family: 'Bree Serif', serif;
`;

const Label = styled.p`
    margin-bottom: 2px;
    font-weight: bold;
    font-size: 14px;
    font-family: 'Montserrat', sans-serif;
`;

const Button = styled.button`
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

const Linkto = styled.button`
    background-color:#fff;
    border: 0px;
    margin-top: 20px;
    color: black;
    padding: 7px;
    float: right;
    cursor: pointer;
    font-weight: bold;
    width: 100%;
    &:hover{
        color: #3498db;
        font-weight: bold;
    }
`;

const App = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signup, setSignUp] = useState(false);
    const [namainstansi, setNamaInstansi] = useState('');
    const [email, setEmail] = useState('');
    const [messagebox, setMmessageBox] = useState(false)
    const [message, setMessage] = useState('')
    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();

    useEffect(() => {
        //localStorage.clear();
        const savedDatas = localStorage.getItem('isLogin')
        console.log(`endpoint ${endpoint}`)
        console.log(`save data ${savedDatas}`)
        if (savedDatas !== null && savedDatas.accessToken !== null) {
            dispatch({ type: "SAVEDATAS" })
            browserHistory.push('/instansi')
        } else {
            console.log('null')
        }
    }, [])

    const loginFunc = async () => {
        if (username === '' || password === '') {
            notification.open({
                message: 'Gagal Login',
                description:
                    'Form username atau password tidak boleh kosong',
                icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
            });
        } else {
            let datas = {
                username,
                password
            }
            const cek = await login(datas)
            if (cek === 1) {
                browserHistory.push('/instansi')
                const savedDatas = JSON.parse(localStorage.getItem('isLogin'))
                console.log(savedDatas)
            } else {
                notification.open({
                    message: 'username atau password tidak sesuai',
                    description:
                        '',
                    icon: <CloseCircleOutlined style={{ color: '#e84118' }} />,
                });
            }
        }
    }

    const toggleSignUp = async () => {
        setSignUp(!signup)
    }

    const togglemessagebox = async () => {
        setMmessageBox(!messagebox)
    }

    return (
        <Wrapper>
            <Row style={{ height: '100%' }}>
                <Col xs={24} sm={24} md={24} lg={6} xl={6} style={{ padding: 20, margin: 'auto', height: '100%' }}>
                    <Row style={{ justifyContent: 'center', marginTop: 130}}>
                        <Col style={{ padding: 10,  justifyContent: 'center' }}>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Logo_BPN-KemenATR_%282017%29.png/779px-Logo_BPN-KemenATR_%282017%29.png' style={{ width: 90 }} />
                        </Col>
                    </Row>
                    <Row style={{ justifyContent: 'center', fontSize: 25 }}>
                        <Col style={{ padding: 10 }}>
                            <Title>e-superdina</Title>
                        </Col>
                    </Row>
                    {/* <Row style={{ justifyContent: 'center', alignItems: 'center'}}>
                        <Col>
                            <Title>Badan Pertanahan Nasional Kabupaten Bengkayang </Title>

                        </Col>
                    </Row>
                    <Row style={{ marginTop: 50 }}>
                        <Col style={{ padding: 10 }}>
                            <SubTitle>Login </SubTitle>
                        </Col>
                    </Row> */}
                    {messagebox ?
                        (
                            <Row style={{ backgroundColor: '#00a8ff', border: '0.5px solid #0097e6', borderRadius: 10, padding: 5, color: 'white' }}>
                                <Col style={{ padding: 10 }}>
                                    <Label> {message} </Label>
                                </Col>
                            </Row>
                        ) : (
                            <></>
                        )}
                    {signup ?
                        (
                            <>
                                <InputBoxAbove>
                                    <Label>Nama Instansi</Label>
                                    <Input placeholder="Nama Instansi" onChange={e => setNamaInstansi(e.target.value)} />
                                </InputBoxAbove>
                                <InputBoxCenter>
                                    <Label>Email</Label>
                                    <Input placeholder="Masukan username anda disini" onChange={e => setEmail(e.target.value)} />
                                </InputBoxCenter>
                                <InputBoxBottom>
                                    <Label>Username</Label>
                                    <Input placeholder="dispmnaker" onChange={e => setUsername(e.target.value)} />
                                </InputBoxBottom>
                                {/* <Button onClick={registerFunc} >Register </Button> */}
                                <Linkto onClick={toggleSignUp}>Login</Linkto>
                            </>
                        ) : (
                            <>
                                <InputBoxAbove>
                                    <Label>Username</Label>
                                    <Input placeholder="Masukan username anda disini" onChange={e => setUsername(e.target.value)} />
                                </InputBoxAbove>
                                <InputBoxBottom>
                                    <Label>Password</Label>
                                    <Input type="password" placeholder="**********" onChange={e => setPassword(e.target.value)} />
                                </InputBoxBottom>
                                <Button onClick={loginFunc} >Masuk </Button>
                                {/* <Linkto onClick={toggleSignUp}>Registrasi</Linkto> */}
                            </>
                        )
                    }
                </Col >
                <Col xs={24} sm={24} md={24} lg={18} xl={18} style={{ backgroundColor: '#dff9fb' }}>
                    <img src={require('./../../assets/img/preview.jpg')} style={{ width: '100%', position: 'absolute' }} />
                </Col>
            </Row >
        </Wrapper >
    );

}

export default App