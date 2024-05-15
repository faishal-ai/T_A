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
import { getFasilitas } from "@/api/fasilitas";
import { getStaff } from "@/api/staff";
import ModalFasilitas from "@/components/fasilitas/ModalFasilitas";
import ModalDeleteFasilitas from "@/components/fasilitas/ModalDeleteFasilitas";

function page() {
  const [fasilitas, setFasilitas] = useState([]);
  const [staff, setStaff] = useState([]);
  const [selectedFasilitas, setSelectedFasilitas] = useState({});
  const [type, setType] = useState("new");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  async function getData() {
    const res = await getFasilitas();
    const resStaff = await getStaff();
    setFasilitas(res);
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
          <TableCaption>Table List Fasilitas</TableCaption>
          <Thead>
            <Tr>
              <Th>Id Fasilitas</Th>
              <Th>Id Staff</Th>
              <Th>Nama Fasilitas</Th>
              <Th>Jam Operasional</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          <Tbody>
            {fasilitas?.map((item) => (
              <Tr key={item?.id_fasilitas}>
                <Td>{item?.id_fasilitas}</Td>
                <Td>{item?.id_staff}</Td>
                <Td>{item?.nama_fasilitas}</Td>
                <Td>{item?.jam_operasional?.slice(11, 19)}</Td>
                <Td>
                  <Flex gap={2}>
                    <IconButton
                      icon={<FaPencilAlt />}
                      colorScheme={"yellow"}
                      onClick={() => {
                        onOpen();
                        setType("edit");
                        setSelectedFasilitas(item);
                      }}
                    />
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme={"red"}
                      onClick={() => {
                        onOpenDelete();
                        setSelectedFasilitas(item);
                      }}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ModalFasilitas
        type={type}
        staff={staff}
        isOpen={isOpen}
        onClose={onClose}
        getData={getData}
        selectedFasilitas={selectedFasilitas}
      />
      <ModalDeleteFasilitas
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        getData={getData}
        selectedFasilitas={selectedFasilitas}
      />
    </Box>
  );
}

export default page;
