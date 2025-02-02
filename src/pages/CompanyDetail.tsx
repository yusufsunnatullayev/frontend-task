import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCompanyById } from "../api/company";
import { Company } from "../types";
import Loader from "../components/Loader";

const CompanyDetail = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery<Company>({
    queryKey: ["companies", id],
    queryFn: () => getCompanyById(id!),
  });

  if (isLoading) return <Loader />;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">
        Company Name:{" "}
        <span className="text-lg font-semibold text-lightBlack">
          {data?.name}
        </span>
      </h1>
      <h1 className="text-xl font-bold">
        Employees:{" "}
        <span className="text-lg font-semibold text-lightBlack">
          {data?.count} people
        </span>
      </h1>
    </div>
  );
};

export default CompanyDetail;
