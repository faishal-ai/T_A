"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  IconButton,
  Flex,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPencilAlt, FaTrash, FaPlus } from "react-icons/fa";
import { getStaff } from "@/api/staff";
import ModalStaff from "@/components/staff/ModalStaff";
import ModalDeleteStaff from "@/components/staff/ModalDeleteStaff";

function page() {
  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState({});
  const [type, setType] = useState("new");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  async function getData() {
    const resStaff = await getStaff();
    setStaff(resStaff);
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <Box w={"80vw"} my={20} textColor={"black"}>
      <Button
        colorScheme={"green"}
        mb={6}
        onClick={() => {
          onOpen();
          setType("new");
        }}
      >
        Tambah <FaPlus style={{ marginLeft: 6 }} />
      </Button>
      <TableContainer>
        <Table variant="striped" colorScheme={"teal"}>
          <TableCaption>Table List Staff</TableCaption>
          <Thead>
            <Tr>
              <Th>Id Staff</Th>
              <Th>Nama</Th>
              <Th>Posisi</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {staff?.map((item) => (
              <Tr key={item?.id_staff}>
                <Td>{item?.id_staff}</Td>
                <Td>{item?.nama}</Td>
                <Td>{item?.posisi}</Td>
                <Td>
                  <Flex gap={2}>
                    <IconButton
                      icon={<FaPencilAlt />}
                      colorScheme={"yellow"}
                      onClick={() => {
                        onOpen();
                        setType("edit");
                        setSelectedStaff(item);
                      }}
                    />
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme={"red"}
                      onClick={() => {
                        onOpenDelete();
                        setSelectedStaff(item);
                      }}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ModalStaff
        type={type}
        isOpen={isOpen}
        onClose={onClose}
        getData={getData}
        selectedStaff={selectedStaff}
      />
      <ModalDeleteStaff
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        getData={getData}
        selectedStaff={selectedStaff}
      />
    </Box>
  );
}

export default page;
