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
import { getKamar } from "@/api/kamar";
import { getFasilitas } from "@/api/fasilitas";
import ModalKamar from "@/components/kamar/ModalKamar";
import ModalDeleteKamar from "@/components/kamar/ModalDeleteKamar";
import { formatMoney } from "@/lib/formatMoney";

function page() {
  const [fasilitas, setFasilitas] = useState([]);
  const [kamar, setKamar] = useState([]);
  const [selectedKamar, setSelectedKamar] = useState({});
  const [type, setType] = useState("new");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  async function getData() {
    const res = await getFasilitas();
    const resKamar = await getKamar();
    setFasilitas(res);
    setKamar(resKamar);
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
          <TableCaption>Table List Kamar</TableCaption>
          <Thead>
            <Tr>
              <Th>No Kamar</Th>
              <Th>Id Fasilitas</Th>
              <Th>Tipe Kamar</Th>
              <Th>Status</Th>
              <Th>Harga</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {kamar?.map((item) => (
              <Tr key={item?.no_kamar}>
                <Td>{item?.no_kamar}</Td>
                <Td>{item?.id_fasilitas}</Td>
                <Td>{item?.tipe_kamar}</Td>
                <Td>{item?.status}</Td>
                <Td>Rp{formatMoney(item?.harga)}</Td>
                <Td>
                  <Flex gap={2}>
                    <IconButton
                      icon={<FaPencilAlt />}
                      colorScheme={"yellow"}
                      onClick={() => {
                        onOpen();
                        setType("edit");
                        setSelectedKamar(item);
                      }}
                    />
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme={"red"}
                      onClick={() => {
                        onOpenDelete();
                        setSelectedKamar(item);
                      }}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ModalKamar
        type={type}
        fasilitas={fasilitas}
        isOpen={isOpen}
        onClose={onClose}
        getData={getData}
        selectedKamar={selectedKamar}
      />
      <ModalDeleteKamar
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        getData={getData}
        selectedKamar={selectedKamar}
      />
    </Box>
  );
}

export default page;
