import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";

function Badge({ icon, title, colorSchema }) {
  return (
    // <Flex alignItems={"center"}>
    //   <Icon
    //     as={icon}
    //     w={6}
    //     h={6}
    //     color={"blue.400"}
    //     bgColor={"blue.100"}
    //     p={1}
    //     mr={1}
    //     rounded={"full"}
    //   />
    //   <Text fontSize={"sm"}>{title}</Text>
    // </Flex>
    <Flex
      alignItems={"center"}
      bgColor={`${colorSchema}.50`}
      borderRadius={"20"}
      borderColor={`${colorSchema}.400`}
      borderWidth={1}
      p={2}
    >
      <Icon
        as={icon}
        w={6}
        h={6}
        color={`${colorSchema}.400`}
        bgColor={`${colorSchema}.100`}
        p={1}
        mr={1}
        rounded={"full"}
      />
      <Text fontSize={"sm"}>{title}</Text>
    </Flex>
  );
}

export default Badge;
