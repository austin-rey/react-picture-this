import axios from "axios";

// export default axios.create({
//   baseURL: `http://localhost:5000/api/v1/`,
//   timeout: 600000,
// });

export default axios.create({
  baseURL: `/api/v1/`,
  timeout: 600000,
});