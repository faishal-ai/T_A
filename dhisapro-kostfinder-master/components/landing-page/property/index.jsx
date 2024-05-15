"use client";
import React, { useRef, useState } from "react";
import { Flex, Text, Grid, useDisclosure } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Card from "@/components/landing-page/property/Card";
import ModalProperty from "@/components/landing-page/property/ModalProperty";

export default function Hero({ staff, kamar }) {
  const scrollRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [noKamar, setNoKamar] = useState(null);
  return (
    <>
      <Flex
        px={{ base: 10, md: 20, lg: 32 }}
        py={{ base: 5, md: 10 }}
        h="full"
        direction={{ base: "column" }}
        bg={"#F7F9FF"}
        color={"gray.700"}
        id="property"
      >
        <Text
          color={"blue.200"}
          mt={10}
          as={motion.h1}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ root: scrollRef }}
          transition={{ duration: "5" }}
        >
          KAMAR
        </Text>
        <Flex
          justifyContent={"space-between"}
          flexDir={{ base: "column", md: "row" }}
          gap={{ md: 10, lg: 10 }}
        >
          <Text
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight={"medium"}
            maxW={{ base: "full", md: "80%", lg: "60%" }}
            lineHeight={"short"}
            as={motion.h1}
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            viewport={{ root: scrollRef }}
            transition={{ duration: "5" }}
          >
            Kamar yang kami sediakan
          </Text>
        </Flex>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={{ base: 4, sm: 5, md: 10 }}
          mt={"5%"}
        >
          {kamar.map((item) => (
            <Card
              key={item.no_kamar}
              harga={item.harga}
              no_kamar={item.no_kamar}
              image={item.image}
              tipe_kamar={item.tipe_kamar}
              status={item.status}
              onOpen={onOpen}
              setNoKamar={setNoKamar}
            />
          ))}
        </Grid>
      </Flex>
      <ModalProperty
        isOpen={isOpen}
        onClose={onClose}
        staff={staff}
        no_kamar={noKamar}
      />
    </>
  );
}
