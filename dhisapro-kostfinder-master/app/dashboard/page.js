import { Box, Text } from "@chakra-ui/react";

function page() {
  return (
    <Box w={"full"} minH={"100vh"} display={"flex"}>
      <Text as="h1" fontWeight={"semibold"} fontSize={"3xl"} m={"auto"}>
        Selamat Datang di Halaman Dashboard Admin
      </Text>
    </Box>
  );
}

export default page;
