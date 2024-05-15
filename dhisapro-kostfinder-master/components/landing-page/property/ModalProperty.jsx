"use client";
import React from "react";
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
import { postReservasi } from "@/api/reservasi";
import { postPenyewa } from "@/api/penyewa";

function ModalProperty({ isOpen, onClose, staff, no_kamar }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const generateRandomId = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const id_reservasi = Math.floor(Math.random() * 100) + 1;
        resolve(id_reservasi);
      }, 0);
    });
  };

  const onSubmit = async (data) => {
    try {
      const id_reservasi = await generateRandomId();
      const dataPenyewa = {
        nik: parseInt(data.nik),
        nama: data.nama,
        alamat: data.alamat,
        no_telp: data.no_telp,
      };
      const dataReservasi = {
        id_reservasi: parseInt(id_reservasi),
        nik: parseInt(data.nik),
        no_kamar: parseInt(no_kamar),
        id_staff: parseInt(data.id_staff),
        tgl_check_in: new Date(data.tgl_check_in),
        tgl_check_out: new Date(data.tgl_check_out),
      };
      await postPenyewa(dataPenyewa);
      await postReservasi(dataReservasi);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ajukan Sewa</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Flex gap={3} mt={3} flexDir={"column"}>
              <Flex flexDir={"column"}>
                <Input
                  placeholder="Masukkan Nama Lengkap"
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
                  placeholder="Masukkan No Telephone"
                  name="no_telp"
                  id="no_telp"
                  {...register("no_telp", {
                    required: true,
                    minLength: 9,
                    maxLength: 12,
                  })}
                />
                {errors.no_telp?.type === "required" && (
                  <FormHelperText textColor="red" mb={4}>
                    No Telephone harus diisi
                  </FormHelperText>
                )}
                {errors.no_telp?.type === "maxLength" && (
                  <FormHelperText textColor="red" mb={4}>
                    No Telephone maksimal 12 angka
                  </FormHelperText>
                )}
                {errors.no_telp?.type === "minLength" && (
                  <FormHelperText textColor="red" mb={4}>
                    No Telephone minimal 9 angka
                  </FormHelperText>
                )}
              </Flex>
              <Flex flexDir={"column"}>
                <Input
                  placeholder="Masukkan Alamat"
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
                  name="tgl_check_in"
                  type="date"
                  id="tgl_check_in"
                  {...register("tgl_check_in", {
                    required: true,
                  })}
                />
                {errors.tgl_check_in?.type === "required" && (
                  <FormHelperText textColor="red" mb={4}>
                    Tgl Check In harus diisi
                  </FormHelperText>
                )}
              </Flex>
              <Flex flexDir={"column"}>
                <Input
                  name="tgl_check_out"
                  type="date"
                  id="tgl_check_out"
                  {...register("tgl_check_out", {
                    required: true,
                  })}
                />
                {errors.tgl_check_out?.type === "required" && (
                  <FormHelperText textColor="red" mb={4}>
                    Tgl Check Out harus diisi
                  </FormHelperText>
                )}
              </Flex>
              <Flex flexDir={"column"}>
                <Select
                  placeholder="Pilih Staff"
                  {...register("id_staff", {
                    required: true,
                  })}
                >
                  {staff.map((item) => (
                    <option value={item.id_staff} key={item.id_staff}>
                      {item.nama}
                    </option>
                  ))}
                </Select>
                {errors.id_staff?.type === "required" && (
                  <FormHelperText textColor="red" mb={4}>
                    Staff harus diisi
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
            Ajukan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalProperty;
