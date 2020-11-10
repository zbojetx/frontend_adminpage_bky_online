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
            </Route>
        </Router>
    );
}

export default Routemain