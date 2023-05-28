import { Button } from "@chakra-ui/react"
import React from "react"
import { BeatLoader } from "react-spinners"
const ButtonMain = ({ title, onClick, width, loading, type }) => {
  return (
    <Button
      type={type}
      spinner={<BeatLoader size={"10px"} color="white" />}
      width={width}
      isLoading={loading}
      colorScheme="blue"
      onClick={onClick}
    >
      {title}
    </Button>
  )
}

export default ButtonMain
