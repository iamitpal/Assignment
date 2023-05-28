import React, { useState } from "react"
import {
  Box,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Text,
} from "@chakra-ui/react"
import { Api_Link, cssStyles, succesAlert } from "../Components/Reusable"
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"
import ButtonMain from "../Components/ButtonMain"
import axios from "axios"
import { setUser } from "../Redux/authSlice"
import jwtDecode from "jwt-decode"
import { useDispatch } from "react-redux"

import { useNavigate } from "react-router-dom"

const Login = () => {
  const nav = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const initial = { email: "", password: "" }
  const [userData, setUserData] = useState(initial)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const getUserData = async (token) => {
    const decoded = jwtDecode(token)
    let { data } = await axios.get(`${Api_Link}/user/${decoded.id}`)
    dispatch(setUser(data.user))
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      let { data } = await axios.post(`${Api_Link}/login`, userData)

      succesAlert(data.msg)
      if (data.token) {
        localStorage.setItem("userTokenBuyCars", data.token)
        getUserData(data.token)
        setUserData(initial)
        nav("/deals")
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <Box
      width={["330px", "400px"]}
      m="auto"
      p={5}
      borderRadius={5}
      boxShadow={cssStyles.boxShadow1}
    >
      <center>
        <Image src="https://attryb.com/assets/attrybNavLog.svg" />
      </center>
      <form onSubmit={handleLogin} action="">
        <SimpleGrid gap={8} m="auto" marginTop={4}>
          <Input
            required
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            type="email"
            placeholder="Enter Email"
          />
          <InputGroup>
            <Input
              required
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
            />
            <InputRightElement onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </InputRightElement>
          </InputGroup>
          <Text
            cursor={"pointer"}
            required
            color="blue"
            fontWeight={500}
            textDecoration={"underline"}
            onClick={() => nav("/signup")}
          >
            Dont Have an account ? Create Now
          </Text>

          <ButtonMain
            loading={loading}
            type={"submit"}
            width={"full"}
            title={"Login Now"}
          />
        </SimpleGrid>
      </form>
    </Box>
  )
}

export default Login
