import React from "react";
import { Text } from "@chakra-ui/react";
import Link from "next/link";

export default function NavItemDashboard({ title, id }) {
  return (
    <Link href={`/dashboard/${id}`}>
      <Text
        fontSize={{ base: "lg", md: "sm", lg: "md" }}
        fontWeight={"light"}
        cursor={"pointer"}
      >
        {title}
      </Text>
    </Link>
  );
}
