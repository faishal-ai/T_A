"use client";
import React from "react";
import { Flex, Text, Button, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

export default function index({ jumlahKamar }) {
  const scrollRef = React.useRef(null);
  return (
    <Flex
      px={{ base: 10, md: 20, lg: 32 }}
      py={{ base: 20, md: 10 }}
      h="full"
      flexDir={"column"}
      backgroundPosition={{ base: "right bottom" }}
      backgroundRepeat="no-repeat"
      backgroundSize={"inherit"}
      bgColor={"#CAE7F4"}
      className="contact"
    >
      <Box
        as={motion.div}
        initial={{ y: -50 }}
        whileInView={{ y: 0 }}
        viewport={{ root: scrollRef }}
        transition={{ duration: "5" }}
        color={"gray.800"}
      >
        <Text fontSize={{ base: "md", md: "xl" }}>
          Dapatkan Kamar di Kost Putra Darma 5
        </Text>
        <Text
          fontSize={{ base: "3xl", lg: "5xl" }}
          fontWeight={"semibold"}
          maxW={{ md: "50%" }}
          my={5}
        >
          Temukan lebih dari {jumlahKamar}+ kamar di Kost Putra Darma 5
        </Text>
      </Box>
    </Flex>
  );
}
