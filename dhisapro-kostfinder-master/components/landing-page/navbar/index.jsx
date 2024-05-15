"use client";
import React from "react";
import {
  Box,
  Heading,
  Flex,
  Icon,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import NavItem from "@/components/landing-page/navbar/NavItem";
import { X, AlignRight } from "react-feather";

export default function index() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-around"}
        alignItems={"center"}
        py={4}
        px={{ base: 10, md: 10, lg: 16 }}
      >
        <Flex
          justifyContent={{ base: "space-between" }}
          w={"full"}
          my="auto"
          alignItems={"center"}
        >
          <Heading
            textTransform={"capitalize"}
            fontWeight={"bold"}
            fontSize={{ base: "2xl", md: "3xl" }}
          >
            Kost Putra Darma 5
          </Heading>
          <Icon
            as={isOpen ? X : AlignRight}
            onClick={isOpen ? onClose : onOpen}
            display={{ md: "none" }}
            w={6}
            h={6}
          />
        </Flex>
        <Flex
          gap={{ md: 5, lg: 8 }}
          display={{ base: "none", md: "flex" }}
          minW={"fit-content"}
        >
          <NavItem title={"Beranda"} id={"home"} />
          <NavItem title={"Tentang Kami"} id={"about"} />
          <NavItem title={"Kamar"} id={"property"} />
        </Flex>
      </Box>
      {isOpen ? (
        <Box
          py={4}
          display={{ md: "none" }}
          textAlign={"center"}
          position={"absolute"}
          w={"full"}
          className={"glassmorphism"}
          bg={"black"}
          color={"white"}
        >
          <Stack as={"nav"} spacing={[4]}>
            <NavItem title="Beranda" id="home" />
            <NavItem title={"Tentang Kami"} id={"about"} />
            <NavItem title={"Kamar"} id={"property"} />
          </Stack>
        </Box>
      ) : null}
    </>
  );
}
