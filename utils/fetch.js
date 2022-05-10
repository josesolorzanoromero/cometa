const baseUrl = `http://ec2-3-239-221-74.compute-1.amazonaws.com:8000/api/v1`;
const studentsInfoL = `students/3b35fb50-3d5e-41b3-96d6-c5566141fab0/`;
const studentsOrders = `students/3b35fb50-3d5e-41b3-96d6-c5566141fab0/orders/`;
export const getData = async (url, token) => {
  const res = await fetch(`${baseUrl}/${url}`, {
    method: "GET",
    headers: {
      hash: "OcJn4jYChW",
      credentials: "include",
    },
  });

  const data = await res.json();
  return data;
};
