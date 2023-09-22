import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { logout } from "./authSlice";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      "/api/users/refresh",
      api,
      extraOptions
    );
    if (refreshResult?.meta?.response?.ok) {
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product", "Order", "User"],
  endpoints: (builder) => ({}),
});
