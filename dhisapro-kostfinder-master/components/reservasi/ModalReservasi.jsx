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
import { postReservasi, updateReservasi } from "@/api/reservasi";

function ModalReservasi({
  isOpen,
  onClose,
  staff,
  kamar,
  type,
  getData,
  selectedReservasi,
}) {
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
      const dataReservasi = {
        id_reservasi: parseInt(id),
        nik: parseInt(data?.nik),
        no_kamar: parseInt(data?.no_kamar),
        id_staff: parseInt(data?.id_staff),
        tgl_check_in: new Date(data?.tgl_check_in),
        tgl_check_out: new Date(data?.tgl_check_out),
      };
      if (type == "new") {
        await postReservasi(dataReservasi);
      } else {
        await updateReservasi(selectedReservasi?.id_reservasi, dataReservasi);
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
      setValue("no_kamar", "");
      setValue("id_staff", "");
      setValue("tgl_check_in", "");
      setValue("tgl_check_out", "");
    } else {
      setValue("nik", selectedReservasi?.nik);
      setValue("no_kamar", selectedReservasi?.no_kamar);
      setValue("id_staff", selectedReservasi?.id_staff);
      setValue("tgl_check_in", selectedReservasi?.tgl_check_in?.slice(0, 10));
      setValue("tgl_check_out", selectedReservasi?.tgl_check_out?.slice(0, 10));
    }
  }, [isOpen]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{type == "new" ? "Tambah" : "Edit"} Reservasi</ModalHeader>
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
                    <option value={item?.id_staff} key={item?.id_staff}>
                      {item?.nama}
                    </option>
                  ))}
                </Select>
                {errors.id_staff?.type === "required" && (
                  <FormHelperText textColor="red" mb={4}>
                    Staff harus diisi
                  </FormHelperText>
                )}
              </Flex>
              <Flex flexDir={"column"}>
                <Select
                  placeholder="Pilih Kamar"
                  {...register("no_kamar", {
                    required: true,
                  })}
                >
                  {kamar.map((item) => (
                    <option value={item?.no_kamar} key={item?.no_kamar}>
                      {item?.no_kamar}
                    </option>
                  ))}
                </Select>
                {errors.id_staff?.type === "required" && (
                  <FormHelperText textColor="red" mb={4}>
                    No kamar harus diisi
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

export default ModalReservasi;
