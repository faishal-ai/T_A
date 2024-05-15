import axios from "axios";

export async function getReservasi() {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/reservasi`,
      responseType: "json",
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getReservasiById(id) {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/reservasi/${id}`,
      responseType: "json",
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function postReservasi(data) {
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/reservasi`,
      data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateReservasi(id, data) {
  try {
    const res = await axios({
      method: "patch",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/reservasi/${id}`,
      data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteReservasi(id) {
  try {
    const res = await axios({
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/reservasi/${id}`,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
