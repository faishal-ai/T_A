"use client";
import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Input,
  FormControl,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { postStaff, updateStaff } from "@/api/staff";

function ModalStaff({ isOpen, onClose, type, getData, selectedStaff }) {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  const generateRandomId = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const id = Math.floor(Math.random() * 100) + 1;
        resolve(id);
      }, 0);
    });
  };

  const onSubmit = async (data) => {
    try {
      const id = await generateRandomId();
      const dataStaff = {
        ...data,
        id_staff: id,
      };
      if (type == "new") {
        await postStaff(dataStaff);
      } else {
        await updateStaff(selectedStaff.id_staff, dataStaff);
      }
      await getData();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (type == "new") {
      setValue("nama", "");
      setValue("posisi", "");
    } else {
      setValue("nama", selectedStaff.nama);
      setValue("posisi", selectedStaff.posisi);
    }
  }, [isOpen]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{type == "new" ? "Tambah" : "Edit"} Staff</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Flex gap={3} mt={3} flexDir={"column"}>
              <Flex flexDir={"column"}>
                <Input
                  placeholder="Masukkan nama"
                  name="nama"
                  id="nama"
                  {...register("nama", {
                    required: true,
                  })}
                />
                {errors.nama?.type === "required" && (
                  <FormHelperText textColor="red" mb={4}>
                    Nama harus diisi
                  </FormHelperText>
                )}
              </Flex>
              <Flex flexDir={"column"}>
                <Input
                  placeholder="Masukkan posisi"
                  name="posisi"
                  id="posisi"
                  {...register("posisi", {
                    required: true,
                  })}
                />
                {errors.posisi?.type === "required" && (
                  <FormHelperText textColor="red" mb={4}>
                    Posisi harus diisi
                  </FormHelperText>
                )}
              </Flex>
            </Flex>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Batal
          </Button>
          <Button
            colorScheme="blue"
            disabled={errors}
            onClick={() => {
              handleSubmit((values) => onSubmit(values))();
            }}
          >
            Simpan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalStaff;
