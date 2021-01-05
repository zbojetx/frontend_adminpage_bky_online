import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Master from './Master';
import Dashboard from './component/Dashboard';
import Pegawai from './component/Pegawai';
import Addpegawai from './component/Addpegawai';
import Instansi from './component/Instansi';
import Login from './component/auth/Login';
import Updatepegawai from './component/Updatepegawai';
import Sppd from './component/Sppd';
import Attr from './component/Attr';
import Rincian from './component/Rincian';
import Surattugas from './component/Surattugas';
import Administrator from './component/Administrator';
import Bidang from './component/Bidang';
import InputPermohonan from './component/InputPermohonan';
import InputFormulir from './component/InputFormulir';
import Banner from './component/MobileBanner';
import MobileArticle from './component/MobileArticle';
import Qna from './component/Qna';
import PetugasLoket from './component/PetugasLoket';
import Sosmed from './component/Sosmed';
import Saran from './component/Saran';

function Routemain(){
    return(
        <Router history={browserHistory}>
            <Route path='/' component={Login} />
            <Route component={Master}>
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/pegawai' component={Pegawai} />
                <Route path='/addpegawai' component={Addpegawai} />
                <Route path='/instansi' component={Instansi} />
                <Route path='/updatepegawai' component={Updatepegawai} />
                <Route path='/sppd' component={Sppd} />
                <Route path='/attr' component={Attr} />
                <Route path='/administrator' component={Administrator} />
                <Route path='/surattugas' component={Surattugas} />
                <Route path='/rincian' component={Rincian} />
                <Route path='/bidang' component={Bidang} />
                <Route path='/inputpermohonan' component={InputPermohonan} />
                <Route path='/inputformulir' component={InputFormulir} />
                <Route path='/banner' component={Banner} />
                <Route path='/article' component={MobileArticle} />
                <Route path='/qna' component={Qna} />
                <Route path='/petugasloket' component={PetugasLoket} />
                <Route path='/sosmed' component={Sosmed} />
                <Route path='/saran' component={Saran} />
            </Route>
        </Router>
    );
}

export default Routemain