import React from "react";
import { Icon, Flex, Box, Text } from "@chakra-ui/react";

export default function Navigation({ icon, heading, title }) {
  return (
    <Flex alignItems={"center"} w={"fit-content"} overflow={"clip"}>
      <Icon
        as={icon}
        w={{ base: 6, md: 10 }}
        h={{ base: 6, md: 10 }}
        bgColor={"blue.100"}
        color={"blue.500"}
        p={{ base: 1, md: 2 }}
        rounded={"full"}
      />
      <Box ml={{ base: 1, md: 3 }} color={"gray.800"}>
        <Text fontWeight={"normal"} fontSize={{ base: "sm" }}>
          {heading}
        </Text>
        <Text fontSize={{ base: "xs", md: "sm" }}>{title}</Text>
      </Box>
    </Flex>
  );
}
