import React from "react";
import { Text } from "@chakra-ui/react";
// import { Link } from "react-scroll";

export default function NavItem({ title, id }) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Text
      fontSize={{ base: "lg", md: "sm", lg: "md" }}
      fontWeight={"light"}
      cursor={"pointer"}
      onClick={() => scrollToSection(id)}
    >
      {title}
    </Text>
  );
}
