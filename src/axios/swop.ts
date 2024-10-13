import axios from "axios";

const swop = axios.create({
  baseURL: "https://swop.cx/graphql",
  headers: { Authorization: `ApiKey ${import.meta.env.VITE_SWOP_API_KEY}` },
});

export default swop;
