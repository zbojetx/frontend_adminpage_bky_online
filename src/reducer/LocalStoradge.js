import React from 'react'

export const isLogin = () => {
    const savedDatas = JSON.parse(localStorage.getItem('isLogin'))
    console.log(savedDatas)
    if (savedDatas !== null && savedDatas.accessToken !== null) {
       return savedDatas
    } else {
       return null
    }
}