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
import { getReservasi } from "@/api/reservasi";
import { getStaff } from "@/api/staff";
import { getKamar } from "@/api/kamar";
import ModalReservasi from "@/components/reservasi/ModalReservasi";
import ModalDeleteReservasi from "@/components/reservasi/ModalDeleteReservasi";

function page() {
  const [reservasi, setReservasi] = useState([]);
  const [staff, setStaff] = useState([]);
  const [kamar, setKamar] = useState([]);
  const [selectedReservasi, setSelectedReservasi] = useState({});
  const [type, setType] = useState("new");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  async function getData() {
    const res = await getReservasi();
    const resStaff = await getStaff();
    const resKamar = await getKamar();
    setReservasi(res);
    setStaff(resStaff);
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
          <TableCaption>Table List Reservasi</TableCaption>
          <Thead>
            <Tr>
              <Th>Id Reservasi</Th>
              <Th>NIK</Th>
              <Th>No Kamar</Th>
              <Th>Id Staff</Th>
              <Th>Tanggal Check In</Th>
              <Th>Tanggal Check Out</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reservasi?.map((item) => (
              <Tr key={item?.id_reservasi}>
                <Td>{item?.id_reservasi}</Td>
                <Td>{item?.nik}</Td>
                <Td>{item?.no_kamar}</Td>
                <Td>{item?.id_staff}</Td>
                <Td>{item?.tgl_check_in?.slice(0, 10)}</Td>
                <Td>{item?.tgl_check_out?.slice(0, 10)}</Td>
                <Td>
                  <Flex gap={2}>
                    <IconButton
                      icon={<FaPencilAlt />}
                      colorScheme={"yellow"}
                      onClick={() => {
                        onOpen();
                        setType("edit");
                        setSelectedReservasi(item);
                      }}
                    />
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme={"red"}
                      onClick={() => {
                        onOpenDelete();
                        setSelectedReservasi(item);
                      }}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ModalReservasi
        type={type}
        staff={staff}
        kamar={kamar}
        isOpen={isOpen}
        onClose={onClose}
        getData={getData}
        selectedReservasi={selectedReservasi}
      />
      <ModalDeleteReservasi
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        getData={getData}
        selectedReservasi={selectedReservasi}
      />
    </Box>
  );
}

export default page;
