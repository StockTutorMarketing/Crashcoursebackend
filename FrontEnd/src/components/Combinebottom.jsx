import { Box, Heading, SimpleGrid, Stack, Text, Image } from '@chakra-ui/react';
import {  } from 'antd';
import React from 'react';
import sachin from "../Data/sachin.png";
import ayushi from "../Data/ayushi.png";
import udit from "../Data/udit.png";

const Combinebottom = () => {
  return (
    <>
        <Box bgGradient="linear(to-r, #131543, #525368, #131543)" pb={20}>
        <Box margin={'auto'} py={5} textAlign={{base:'center', sm:'left', md:'left', lg:'left'}} width={'90%'}>
          <Heading fontFamily={'roboto'} color={"whitesmoke"} fontSize={36} fontWeight={500}>Our Tutors</Heading>
        </Box>

        <Box>
          <SimpleGrid
          
            width={{base:'90%', sm:'70%', md:'100%', lg:'100%'}}
            margin={'auto'}
            color={"whitesmoke"}
            columns={{ base: 1, sm: 1, md: 1, lg: 3 }}
            gap={{ base: 16, sm: 16, md: 0, lg: 0 }}
          >
            <Stack width={"65%"} margin={"auto"}>
              <Box>
                <Image src={sachin} />
              </Box>
              <Stack>
                <Box>
                  <Text fontWeight={600} fontSize={26}>
                    Sachin Birla
                  </Text>
                  <Text fontSize={13}>MBA Finance, NISM</Text>
                </Box>
                <Text fontWeight={500} fontSize={19}>
                  Basics of Stock Market & Derivatives
                </Text>
                <Text fontSize={17}>
                  20+ years of experience and made thousands of people financially
                  stable.
                </Text>
              </Stack>
            </Stack>

            <Stack width={"65%"} margin={"auto"}>
              <Box>
                <Image src={ayushi} />
              </Box>
              <Stack>
                <Box>
                  <Text fontWeight={600} fontSize={26}>
                    Ayushi Verma
                  </Text>
                  <Text fontSize={13}>MBA Finance, NISM</Text>
                </Box>
                <Text fontWeight={500} fontSize={19}>
                Technical Analysis
                </Text>
                <Text fontSize={17}>
                17+ years of experience and made thousands of students technically strong.
                </Text>
              </Stack>
            </Stack>

            <Stack width={"65%"} margin={"auto"}>
              <Box>
                <Image src={udit} />
              </Box>
              <Stack>
                <Box>
                  <Text fontWeight={600} fontSize={26}>
                    Udit Dua
                  </Text>
                  <Text fontSize={13}>CA, Corporate Law Advisor</Text>
                </Box>
                <Text fontWeight={500} fontSize={19}>
                Fundamental Analysis
                </Text>
                <Text fontSize={17}>
                15+ years of experience and explains P&L in the simplest way possible.
                </Text>
              </Stack>
            </Stack>

          </SimpleGrid>
        </Box>
        </Box>
    </>
  )
}

export default Combinebottom