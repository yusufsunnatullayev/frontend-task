import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import { deleteCompanyById, getCompanies, updateCompany } from "../api/company";
import CompanyTable from "../components/CompanyTable";
import CompanyModal from "../components/CompanyModal";
import { Company } from "../types";
import Loader from "../components/Loader";
import { useState } from "react";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const queryClient = useQueryClient();

  const {
    data: companies,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

  const { mutate: deleteCompany } = useMutation({
    mutationFn: (id: string) => deleteCompanyById(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["companies"] }),
  });

  const { mutate: updateCompanyMutation } = useMutation({
    mutationFn: (updatedCompany: Company) => updateCompany(updatedCompany),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      setIsModalOpen(false);
      setSelectedCompany(null);
    },
  });

  const handleEditCompany = (company: Company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleDeleteCompany = (id: string) => {
    deleteCompany(id);
  };

  const handleUpdateCompany = (updatedCompany: Company) => {
    updateCompanyMutation(updatedCompany);
  };

  if (isError) return <div>Error: {(error as Error).message}</div>;
  if (isLoading) return <Loader />;

  return (
    <section>
      <Navbar />
      <div className="p-4">
        <CompanyTable
          companies={companies}
          onEdit={handleEditCompany}
          onDelete={handleDeleteCompany}
        />
      </div>
      <CompanyModal
        isVisible={isModalOpen}
        selectedCompany={selectedCompany}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdateCompany}
      />
    </section>
  );
};

export default Home;
