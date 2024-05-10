import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from '../Pages/Home'
import Success from '../Pages/Success'
import Failure from '../Pages/Failure'
import Reason from "../Pages/Reason"
import Payment from '../Pages/Payment'

const AllRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/payment" element={<Payment />} />
                <Route path='/success' element={<Success />} />
                <Route path='/failure' element={<Failure />} />
                <Route path='/reason:reasonid' element={<Reason />} />
            </Routes>
        </>
    )
}

export default AllRoutes