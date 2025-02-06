import axios from "axios";
import { Company } from "../types";

const companyApi = axios.create({
  baseURL: "http://45.138.158.137:92/api/companies",
});

const getAuthToken = () => localStorage.getItem("token");

// ADD COMPANY 🚩
export const addCompany = async (companyData: Company) => {
  const access_token = getAuthToken();
  if (!access_token) throw new Error("No token found!");

  const res = await companyApi.post("/add", companyData, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (res.status !== 200) throw new Error("Failed to add company!");
};

// GET ALL COMPANIES 🚩
export const getCompanies = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const access_token = getAuthToken();
  if (!access_token) throw new Error("No token found!");

  const res = await companyApi.get(
    `/get-all?PageSize=${limit}&PageIndex=${page}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  if (res.status !== 200) throw new Error("Failed to get companies!");

  const companies = res.data;

  // Workaround: If the number of returned items < limit, it means no more pages
  const hasNextPage = companies.length === limit;

  return { items: companies, nextPage: hasNextPage ? page + 1 : null };
};

// GET COMPANY BY ID 🚩
export const getCompanyById = async (id: string): Promise<Company> => {
  const access_token = getAuthToken();
  if (!access_token) throw new Error("No token found!");

  const res = await companyApi.get(`/get/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (res.status !== 200) throw new Error("Failed to get company!");
  return res.data;
};

// DELETE COMPANY BY ID 🚩
export const deleteCompanyById = async (id: string) => {
  const access_token = getAuthToken();
  if (!access_token) throw new Error("No token found!");

  const res = await companyApi.delete(`/delete/by-id`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(id),
  });

  if (res.status !== 200) throw new Error("Failed to delete company!");
};

// UPDATE COMPANY BY ID 🚩
export const updateCompany = async (updatedCompany: Company) => {
  const access_token = getAuthToken();
  if (!access_token) throw new Error("No token found!");

  const res = await companyApi.put("/update", updatedCompany, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.status !== 200) throw new Error("Failed to update company!");
};
