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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { postPenyewa, updatePenyewa } from "@/api/penyewa";

function ModalPenyewa({ isOpen, onClose, type, getData, selectedPenyewa }) {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const dataPenyewa = {
        nik: parseInt(data?.nik),
        nama: data.nama,
        alamat: data.alamat,
        no_telp: data.no_telp,
      };
      if (type == "new") {
        await postPenyewa(dataPenyewa);
      } else {
        await updatePenyewa(selectedPenyewa?.nik, dataPenyewa);
      }
      await getData();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (type == "new") {
      setValue("nik", "");
      setValue("nama", "");
      setValue("alamat", "");
      setValue("no_telp", "");
    } else {
      setValue("nik", selectedPenyewa?.nik);
      setValue("nama", selectedPenyewa?.nama);
      setValue("alamat", selectedPenyewa?.alamat);
      setValue("no_telp", selectedPenyewa?.no_telp);
    }
  }, [isOpen]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{type == "new" ? "Tambah" : "Edit"} Penyewa</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Flex gap={3} mt={3} flexDir={"column"}>
              <Flex flexDir={"column"}>
                <Input
                  placeholder="Masukkan NIK"
                  name="nik"
                  id="nik"
                  {...register("nik", {
                    required: true,
                    maxLength: 6,
                  })}
                />
                {errors.nik?.type === "required" && (
                  <FormHelperText textColor="red" mb={4}>
                    NIK harus diisi
                  </FormHelperText>
                )}
                {errors.nik?.type === "maxLength" && (
                  <FormHelperText textColor="red" mb={4}>
                    NIK harus 6 angka
                  </FormHelperText>
                )}
              </Flex>
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
                  placeholder="Masukkan alamat"
                  name="alamat"
                  id="alamat"
                  {...register("alamat", {
                    required: true,
                  })}
                />
                {errors.alamat?.type === "required" && (
                  <FormHelperText textColor="red" mb={4}>
                    Alamat harus diisi
                  </FormHelperText>
                )}
              </Flex>
              <Flex flexDir={"column"}>
                <Input
                  placeholder="Masukkan no telephone"
                  name="no_telp"
                  id="no_telp"
                  {...register("no_telp", {
                    required: true,
                  })}
                />
                {errors.no_telp?.type === "required" && (
                  <FormHelperText textColor="red" mb={4}>
                    No telephone harus diisi
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

export default ModalPenyewa;
