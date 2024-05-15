"use client";
import { useEffect, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

import Navbar from "@/components/landing-page/navbar";
import Hero from "@/components/landing-page/hero";
import About from "@/components/landing-page/about";
import Property from "@/components/landing-page/property";
import Contact from "@/components/landing-page/contact";
import { getStaff } from "@/api/staff";
import { getKamar } from "@/api/kamar";

export default function Home() {
  const [staff, setStaff] = useState([]);
  const [kamar, setKamar] = useState([]);

  useEffect(() => {
    async function getData() {
      const resStaff = await getStaff();
      const resKamar = await getKamar();
      setStaff(resStaff);
      setKamar(resKamar);
    }
    getData();
  }, []);
  return (
    <main>
      <Box w={"full"} minH={"100vh"}>
        <Navbar />
        <Hero jumlahKamar={kamar?.length} />
        <About />
        <Property kamar={kamar} staff={staff} />
        <Contact jumlahKamar={kamar?.length} />
        <Flex justifyContent={"center"}>
          <Text fontSize={"md"} color={"black"} py={5}>
            © 2024. All rights reserved Kost Putra Darma 5
          </Text>
        </Flex>
      </Box>
    </main>
  );
}
