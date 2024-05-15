import axios from "axios";

export async function getStaff() {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/staff`,
      responseType: "json",
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getStaffById(id) {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/staff/${id}`,
      responseType: "json",
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function postStaff(data) {
  try {
    const res = await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/staff`,
      data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateStaff(id, data) {
  try {
    const res = await axios({
      method: "patch",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/staff/${id}`,
      data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteStaff(id) {
  try {
    const res = await axios({
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_BASE_API}/staff/${id}`,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
