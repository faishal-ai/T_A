import { Box, Flex } from "@chakra-ui/react";
import NavbarDashboard from "@/components/landing-page/navbar/NavbarDashboard";

function page({ children }) {
  return (
    <Box w={"full"} minH={"100vh"}>
      <NavbarDashboard />
      <Flex
        justifyContent={"center"}
        justifyItems={"center"}
        minH={"100vh"}
        bg={"blue.300"}
        textColor={"white"}
      >
        {children}
      </Flex>
    </Box>
  );
}

export default page;
