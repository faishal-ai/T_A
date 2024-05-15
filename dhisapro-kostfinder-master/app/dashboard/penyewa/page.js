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
import { getPenyewa } from "@/api/penyewa";
import ModalPenyewa from "@/components/penyewa/ModalPenyewa";
import ModalDeletePenyewa from "@/components/penyewa/ModalDeletePenyewa";

function page() {
  const [penyewa, setPenyewa] = useState([]);
  const [selectedPenyewa, setSelectedPenyewa] = useState({});
  const [type, setType] = useState("new");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  async function getData() {
    const res = await getPenyewa();
    setPenyewa(res);
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
          <TableCaption>Table List Penyewa</TableCaption>
          <Thead>
            <Tr>
              <Th>NIK</Th>
              <Th>Nama</Th>
              <Th>Alamat</Th>
              <Th>No Telp</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {penyewa?.map((item) => (
              <Tr key={item?.nik}>
                <Td>{item?.nik}</Td>
                <Td>{item?.nama}</Td>
                <Td>{item?.alamat}</Td>
                <Td>{item?.no_telp}</Td>
                <Td>
                  <Flex gap={2}>
                    <IconButton
                      icon={<FaPencilAlt />}
                      colorScheme={"yellow"}
                      onClick={() => {
                        onOpen();
                        setType("edit");
                        setSelectedPenyewa(item);
                      }}
                    />
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme={"red"}
                      onClick={() => {
                        onOpenDelete();
                        setSelectedPenyewa(item);
                      }}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ModalPenyewa
        type={type}
        isOpen={isOpen}
        onClose={onClose}
        getData={getData}
        selectedPenyewa={selectedPenyewa}
      />
      <ModalDeletePenyewa
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        getData={getData}
        selectedPenyewa={selectedPenyewa}
      />
    </Box>
  );
}

export default page;
