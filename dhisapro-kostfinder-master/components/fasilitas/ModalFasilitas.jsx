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
import { postFasilitas, updateFasilitas } from "@/api/fasilitas";

function ModalFasilitas({
  isOpen,
  onClose,
  staff,
  type,
  getData,
  selectedFasilitas,
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
      const [jam, menit] = data.jam_operasional.split(":");
      const isoTime = `1970-01-01T${jam}:${menit}:00.000Z`;
      const dataFasilitas = {
        ...data,
        jam_operasional: isoTime,
        id_fasilitas: id,
        id_staff: parseInt(data.id_staff),
      };
      if (type == "new") {
        await postFasilitas(dataFasilitas);
      } else {
        await updateFasilitas(selectedFasilitas.id_fasilitas, dataFasilitas);
      }
      await getData();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(selectedFasilitas);
    if (type == "new") {
      setValue("nama_fasilitas", "");
      setValue("jam_operasional", "");
      setValue("id_staff", "");
    } else {
      setValue("nama_fasilitas", selectedFasilitas.nama_fasilitas);
      setValue(
        "jam_operasional",
        selectedFasilitas.jam_operasional?.slice(11, 19)
      );
      setValue("id_staff", selectedFasilitas.id_staff);
    }
  }, [isOpen]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{type == "new" ? "Tambah" : "Edit"} Fasilitas</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Flex gap={3} mt={3} flexDir={"column"}>
              <Flex flexDir={"column"}>
                <Input
                  placeholder="Masukkan nama fasilitas"
                  name="nama_fasilitas"
                  id="nama_fasilitas"
                  {...register("nama_fasilitas", {
                    required: true,
                  })}
                />
                {errors.nama_fasilitas?.type === "required" && (
                  <FormHelperText textColor="red" mb={4}>
                    Nama fasilitas harus diisi
                  </FormHelperText>
                )}
              </Flex>
              <Flex flexDir={"column"}>
                <Input
                  name="jam_operasional"
                  type="time"
                  id="jam_operasional"
                  {...register("jam_operasional", {
                    required: true,
                  })}
                />
                {errors.jam_operasional?.type === "required" && (
                  <FormHelperText textColor="red" mb={4}>
                    Jam operasional harus diisi
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
                  {staff?.map((item) => (
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

export default ModalFasilitas;
