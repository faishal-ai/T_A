import React, { useRef } from "react";
import { Box, Text, Image, Flex, Button } from "@chakra-ui/react";
import { BiBed } from "react-icons/bi";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { motion } from "framer-motion";
import { formatMoney } from "@/lib/formatMoney";
import Badge from "@/components/landing-page/property/Badge";

export default function Card({
  image,
  harga,
  no_kamar,
  tipe_kamar,
  status,
  onOpen,
  setNoKamar,
}) {
  const scrollRef = useRef(null);

  return (
    <Box
      maxW={"100%"}
      px={3}
      py={3}
      rounded={"xl"}
      bg={"white"}
      color={"gray.800"}
      _hover={{ boxShadow: "xl" }}
      overflow={"clip"}
      mx={"auto"}
      as={motion.h1}
      initial={{ y: 50 }}
      whileInView={{ y: 0 }}
      whileHover={{ y: -20 }}
      viewport={{ root: scrollRef }}
      transition={{ duration: "5" }}
      cursor={"pointer"}
    >
      <Box position={"relative"}>
        <Image src={image} w={"full"} color={"blue.200"} rounded={"xl"} />
      </Box>
      <Flex flexDir={"column"} my={3} gap={1}>
        <Text>No Kamar: {no_kamar || "-"}</Text>
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight={"semibold"}>
          Rp{formatMoney(harga || "") || 0}
        </Text>
        <Flex mt={1} justifyContent={"start"} gap={4} flexWrap={"wrap"}>
          <Badge
            icon={BiBed}
            title={`Tipe: ${tipe_kamar || "-"}`}
            colorSchema={"blue"}
          />
          <Badge
            icon={status == "Tersedia" ? MdCheckCircle : MdCancel}
            title={`Status: ${status || "-"}`}
            colorSchema={status == "Tersedia" ? "green" : "red"}
          />
        </Flex>
        <Box
          as="button"
          mt={4}
          py={2}
          bgColor={"blue.500"}
          color={"white"}
          borderRadius={20}
          disabled={status == "Tidak Tersedia"}
          _disabled={{ opacity: 0.5, cursor: "not-allowed" }}
          onClick={() => {
            if (status == "Tidak Tersedia") return;
            onOpen();
            setNoKamar(no_kamar);
          }}
        >
          Ajukan Sewa
        </Box>
      </Flex>
    </Box>
  );
}
