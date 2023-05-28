import React from "react"
import { Route, Routes } from "react-router-dom"
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"
import AddDeal from "../Pages/AddDeal"
import DealsPage from "../Pages/DealsPage"
import PrivateRoute from "../Private/PrivateRoute"
import { Heading } from "@chakra-ui/react"

const AllRoutes = () => {
  return (
    <Routes>
      <Route element={<Login />} path="/login" />
      <Route element={<Signup />} path="/signup" />
      <Route
        element={
          <PrivateRoute>
            <AddDeal />
          </PrivateRoute>
        }
        path="/addnewdeal"
      />
      <Route element={<DealsPage />} path="/" />
      <Route element={<DealsPage />} path="/deals" />
      <Route
        element={<Heading textAlign={"center"}>404 Not Found</Heading>}
        path="*"
      />
    </Routes>
  )
}

export default AllRoutes
