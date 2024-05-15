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
import { postKamar, updateKamar } from "@/api/kamar";

function ModalKamar({
  isOpen,
  onClose,
  fasilitas,
  type,
  getData,
  selectedKamar,
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
      const dataKamar = {
        ...data,
        no_kamar: id,
        id_fasilitas: parseInt(data?.id_fasilitas),
        harga: parseInt(data?.harga),
      };
      if (type == "new") {
        await postKamar(dataKamar);
      } else {
        await updateKamar(selectedKamar.no_kamar, dataKamar);
      }
      await getData();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (type == "new") {
      setValue("id_fasilitas", "");
      setValue("tipe_kamar", "");
      setValue("status", "");
      setValue("harga", "");
    } else {
      setValue("id_fasilitas", selectedKamar.id_fasilitas);
      setValue("tipe_kamar", selectedKamar.tipe_kamar);
      setValue("status", selectedKamar.status);
      setValue("harga", selectedKamar.harga);
    }
  }, [isOpen]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{type == "new" ? "Tambah" : "Edit"} Kamar</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Flex gap={3} mt={3} flexDir={"column"}>
              <Flex flexDir={"column"}>
                <Input
                  placeholder="Masukkan tipe kamar"
                  name="tipe_kamar"
                  id="tipe_kamar"
                  {...register("tipe_kamar", {
                    required: true,
                  })}
                />
                {errors.tipe_kamar?.type === "required" && (
                  <FormHelperText textColor="red" mb={4}>
                    Tipe kamar harus diisi
                  </FormHelperText>
                )}
              </Flex>
              <Flex flexDir={"column"}>
                <Input
                  placeholder="Harga"
                  type="number"
                  name="harga"
                  id="harga"
                  {...register("harga", {
                    required: true,
                  })}
                />
                {errors.harga?.type === "required" && (
                  <FormHelperText textColor="red" mb={4}>
                    Harga harus diisi
                  </FormHelperText>
                )}
              </Flex>
              <Flex flexDir={"column"}>
                <Select
                  placeholder="Pilih fasilitas"
                  {...register("id_fasilitas", {
                    required: true,
                  })}
                >
                  {fasilitas?.map((item) => (
                    <option value={item.id_fasilitas} key={item.id_fasilitas}>
                      {item.nama_fasilitas}
                    </option>
                  ))}
                </Select>
                {errors.id_fasilitas?.type === "required" && (
                  <FormHelperText textColor="red" mb={4}>
                    Fasilitas harus diisi
                  </FormHelperText>
                )}
              </Flex>
              <Flex flexDir={"column"}>
                <Select
                  placeholder="Pilih status"
                  {...register("status", {
                    required: true,
                  })}
                >
                  <option value={"Tersedia"}>Tersedia</option>
                  <option value={"Tidak_Tersedia"}>Tidak Tersedia</option>
                </Select>
                {errors.status?.type === "required" && (
                  <FormHelperText textColor="red" mb={4}>
                    Status harus diisi
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

export default ModalKamar;
