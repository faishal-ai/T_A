"use client";
import React, { useRef } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { IoHomeOutline, IoWalletOutline } from "react-icons/io5";
import { MdOutlineHomeWork } from "react-icons/md";
import Card from "@/components/landing-page/about/Card";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollRef = useRef(null);
  return (
    <Flex
      px={{ base: 10, md: 20, lg: 32 }}
      py={{ base: 5, md: 10 }}
      h="full"
      direction={"column"}
      id="about"
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
        KENAPA MEMILIH KOST PUTRA DARMA 5?
      </Text>
      <Flex
        justifyContent={"space-between"}
        flexDir={{ base: "column", md: "row" }}
        gap={{ md: 10, lg: 10 }}
      >
        <Text
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight={"medium"}
          maxW={{ base: "full", md: "50%", lg: "60%" }}
          lineHeight={"short"}
          as={motion.h1}
          initial={{ y: -50 }}
          whileInView={{ y: 0 }}
          viewport={{ root: scrollRef }}
          transition={{ duration: "5" }}
        >
          Kost dengan kualitas terbaik dan terdigitalisasi
        </Text>
        <Text
          fontWeight={"thin"}
          fontSize={{ base: "sm", md: "xl" }}
          maxW={{ base: "full", md: "50%", lg: "50%" }}
          as={motion.h1}
          initial={{ y: -50 }}
          whileInView={{ y: 0 }}
          viewport={{ root: scrollRef }}
          transition={{ duration: "5" }}
        >
          KOST PUTRA DARMA 5 merupakan sebuah kost khusus putra yang menyediakan
          sistem manajemen yang mencakup data penyewa, kamar, reservasi,
          fasilitas, dan staff.
        </Text>
      </Flex>
      <Flex
        justifyContent={"space-between"}
        mt={"5%"}
        flexDir={{ base: "column", md: "row" }}
        as={motion.div}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ root: scrollRef }}
      >
        <Card
          icon={IoHomeOutline}
          title={"Fasilitas Lengkap dan Terkelola dengan Baik"}
          description={
            "Kost Putra Darma 5 menawarkan fasilitas lengkap seperti kamar mandi, dapur, internet, dan coffee shop yang terkelola dengan baik, menjadikan pengalaman hunian Anda lebih nyaman dan memuaskan."
          }
        />
        <Card
          icon={MdOutlineHomeWork}
          title={"Digitalisasi Kost"}
          description={
            "Kamar kos yang terdigitalisasi menghadirkan inovasi modern bagi para penghuninya. Teknologi digital memungkinkan penghuni untuk mengakses informasi dan layanan kos secara online."
          }
        />
        <Card
          icon={IoWalletOutline}
          title={"Harga Terjangkau"}
          description={
            "Kami menawarkan kamar terbaik dengan harga terjangkau dengan fasilitas lengkap dan layanan yang sangat baik."
          }
        />
      </Flex>
    </Flex>
  );
}
