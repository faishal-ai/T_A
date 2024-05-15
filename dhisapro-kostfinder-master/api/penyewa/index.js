import axios from "axios";

export async function getPenyewa() {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/penyewa`,
      responseType: "json",
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPenyewaById(id) {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/penyewa/${id}`,
      responseType: "json",
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function postPenyewa(data) {
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/penyewa`,
      data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePenyewa(id, data) {
  try {
    const res = await axios({
      method: "patch",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/penyewa/${id}`,
      data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePenyewa(id) {
  try {
    const res = await axios({
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/penyewa/${id}`,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
