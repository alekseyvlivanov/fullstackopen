import axios from "axios";

const baseUrl = "/api/persons";

const getPersons = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const updatePerson = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson);
  return request.then((response) => response.data);
};

const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`);

export default { getPersons, createPerson, updatePerson, deletePerson };
