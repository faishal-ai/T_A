"use client";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { deletePenyewa } from "@/api/penyewa";
import { CgDanger } from "react-icons/cg";

function ModalDeletePenyewa({ isOpen, onClose, selectedPenyewa, getData }) {
  const onSubmit = async () => {
    try {
      await deletePenyewa(selectedPenyewa.nik);
      await getData();
      await onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Hapus Penyewa</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CgDanger
            color="red"
            style={{ width: 70, height: 70, margin: "auto", marginBottom: 10 }}
          />
          <Text align={"center"} mb={4}>
            Apakah anda yakin ingin menghapus data ini?
          </Text>
        </ModalBody>
        <Flex justifyContent={"center"} justifySelf={"center"} mb={4}>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Batal
          </Button>
          <Button
            colorScheme="red"
            onClick={() => {
              onSubmit();
            }}
          >
            Hapus
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  );
}

export default ModalDeletePenyewa;
