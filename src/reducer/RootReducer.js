const initialState = {
    counter : 0,
    isLogin : false,
    savedDatas : []
}

export default function RootRecucer(state = initialState, action){

    switch(action.type){
        case 'TAMBAH' :
            return {counter: 2}
        case 'DECREMENT' :
            return {counter: state.counter - 1}
        case 'ISLOGIN':
            return {isLogin: true}
        case 'SAVEDATAS' :
            return {savedDatas : JSON.parse(localStorage.getItem('isLogin'))}
        case 'REMOVEDATAS':
            return {savedDatas : []}
        default:
            return false;
    }

}