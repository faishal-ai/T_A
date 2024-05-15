"use client";
import React, { useRef } from "react";
import { Text, Flex, Grid } from "@chakra-ui/react";
import ImageHero from "@/public/images/images-hero.png";
import { GoLocation } from "react-icons/go";
import { BiDollar } from "react-icons/bi";
import { MdHomeWork } from "react-icons/md";
import { motion } from "framer-motion";
import Navigation from "@/components/landing-page/hero/Navigation";
import Title from "@/components/landing-page/hero/Title";

export default function Hero({ jumlahKamar }) {
  const scrollRef = useRef(null);

  return (
    <Flex
      justifyContent={{ base: "flex-end", md: "space-between" }}
      alignItems={{ md: "center" }}
      px={{ base: 10, md: 20, lg: 32 }}
      py={{ base: 5, md: 10 }}
      minH={"98vh"}
      h="full"
      direction={{ base: "column-reverse", md: "row" }}
      bgImage={ImageHero}
      backgroundPosition={{ base: "right bottom" }}
      backgroundRepeat="no-repeat"
      backgroundSize={"contain"}
      bgColor={"#CAE7F4"}
      id={"home"}
      className="home"
    >
      <Flex flexDir={"column"} gap={{ base: 7, md: 10 }} color={"gray.800"}>
        <Text
          fontSize={{ base: "2xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          fontWeight={"medium"}
          maxW={"xl"}
          as={motion.h1}
          initial={{ x: -50 }}
          whileInView={{ x: 0 }}
          viewport={{ root: scrollRef }}
          transition={{ duration: "5" }}
        >
          Cari kamar idamanmu dengan sekali klik
        </Text>
        <Text
          fontSize={{ base: "sm", md: "lg" }}
          fontWeight={"light"}
          maxW={{ base: "100%", lg: "70%" }}
          as={motion.h1}
          initial={{ x: -50 }}
          whileInView={{ x: 0 }}
          viewport={{ root: scrollRef }}
          transition={{ duration: "5" }}
        >
          Temukan lebih dari {jumlahKamar}+ tipe kamar yang cocok untuk anda
        </Text>
        <Grid
          maxW={{ base: "full", md: "fit-content" }}
          py={{ base: 2, md: 3 }}
          pl={{ base: 2.5, md: 3, lg: 10 }}
          gap={{ base: 4, md: 6, lg: 10 }}
          rounded={"xl"}
          justifyContent={{ base: "center", md: "flex-start" }}
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          overflow={"clip"}
          bg={"white"}
          color={"gray.800"}
        >
          <Navigation
            icon={GoLocation}
            heading={"Lokasi"}
            title={"Surabaya, Indonesia"}
          />
          <Navigation
            icon={BiDollar}
            heading={"Harga"}
            title={"Rp500.000 - Rp1.000.000"}
          />
          <Navigation
            icon={MdHomeWork}
            heading={"Jumlah Kamar"}
            title={`${jumlahKamar}+ Jumlah Kamar`}
          />
        </Grid>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          }}
        >
          <Title heading={jumlahKamar} title={"Kamar Yang Tersedia"} />
        </Grid>
      </Flex>
    </Flex>
  );
}
