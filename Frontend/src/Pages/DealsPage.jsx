import axios from "axios"
import React, { useEffect, useState } from "react"
import { Api_Link, cssStyles } from "../Components/Reusable"
import { Box, Flex, Select, SimpleGrid, Text } from "@chakra-ui/react"
import DealCard from "../Components/DealCard"
import ButtonMain from "../Components/ButtonMain"
import Loader from "../Components/Loader"

const DealsPage = () => {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState("")
  const [order, setOrder] = useState("")
  const [loading, setLoading] = useState("")

  const getData = async () => {
    try {
      setLoading(true)
      let { data } = await axios.get(
        `${Api_Link}/inventory?filter=${filter}&order=${order}`
      )
      setData(data.deals)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [filter, order])
  return (
    <>
      <SimpleGrid
        gap={5}
        fontSize={"15px"}
        fontWeight={500}
        color="white"
        width={"95%"}
        m="auto"
        columns={[1, 1, 2, 3]}
      >
        <Box borderRadius={5} p={2} boxShadow={cssStyles.boxShadow1}>
          <Text width={"170px"} borderRadius={5} bg="royalblue" m="auto" mb={2}>
            Sort Prices
          </Text>
          <Flex justifyContent={"space-around"}>
            <ButtonMain
              onClick={() => [setFilter("price"), setOrder("desc")]}
              title="High To Low"
            />
            <ButtonMain
              onClick={() => [setFilter("price"), setOrder("asc")]}
              title="Low To High"
            />
          </Flex>
        </Box>

        <Box borderRadius={5} p={2} boxShadow={cssStyles.boxShadow1}>
          <Text width={"170px"} borderRadius={5} bg="royalblue" m="auto" mb={2}>
            Sort Mileage
          </Text>

          <Flex justifyContent={"space-around"}>
            <ButtonMain
              onClick={() => [setFilter("mileage"), setOrder("desc")]}
              title="High To Low"
            />
            <ButtonMain
              onClick={() => [setFilter("mileage"), setOrder("asc")]}
              title="Low To High"
            />
          </Flex>
        </Box>

        <Box borderRadius={5} p={2} boxShadow={cssStyles.boxShadow1}>
          <Text width={"170px"} borderRadius={5} bg="royalblue" m="auto" mb={2}>
            Select Colors
          </Text>
          <Select
            color={"royalblue"}
            placeholder="Select Colors"
            onChange={(e) => [setFilter("colors"), setOrder(e.target.value)]}
          >
            <option value="Red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="olive">Olive</option>
            <option value="tan">Tan</option>
          </Select>
        </Box>
      </SimpleGrid>
      <SimpleGrid
        width={"90%"}
        margin={"auto"}
        fontSize="12px"
        fontWeight={400}
        mt={4}
        gap={3}
        columns={[1, 1, 3, 4]}
      >
        {data.length === 0 || loading ? (
          <>
            <Loader cardShow={true} />
            <Loader cardShow={true} />
            <Loader cardShow={true} />
            <Loader cardShow={true} />
          </>
        ) : (
          data &&
          data.map((el) => (
            <DealCard
              calldata={() => getData()}
              currentFilter={filter}
              key={el._id}
              {...el}
            />
          ))
        )}
      </SimpleGrid>
    </>
  )
}

export default DealsPage
