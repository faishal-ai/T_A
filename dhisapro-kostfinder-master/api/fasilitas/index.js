import axios from "axios";

export async function getFasilitas() {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/fasilitas`,
      responseType: "json",
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getFasilitasById(id) {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/fasilitas/${id}`,
      responseType: "json",
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function postFasilitas(data) {
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/fasilitas`,
      data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateFasilitas(id, data) {
  try {
    const res = await axios({
      method: "patch",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/fasilitas/${id}`,
      data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFasilitas(id) {
  try {
    const res = await axios({
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/fasilitas/${id}`,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
