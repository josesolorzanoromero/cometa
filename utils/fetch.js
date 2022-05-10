const baseUrl = `http://ec2-3-239-221-74.compute-1.amazonaws.com:8000/api/v1`;
export const getData = async (url, token) => {
  const res = await fetch(`${baseUrl}/${url}`, {
    method: "GET",
    headers: {
      hash: "OcJn4jYChW",
    },
  });

  const data = await res.json();
  return data;
};
