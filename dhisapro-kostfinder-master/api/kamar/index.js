import axios from "axios";

export async function getKamar() {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/kamar`,
      responseType: "json",
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getKamarById(id) {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/kamar/${id}`,
      responseType: "json",
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function postKamar(data) {
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/kamar`,
      data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateKamar(id, data) {
  try {
    const res = await axios({
      method: "patch",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/kamar/${id}`,
      data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteKamar(id) {
  try {
    const res = await axios({
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/kamar/${id}`,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
