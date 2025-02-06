import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Navbar from "../components/Navbar";
import { deleteCompanyById, getCompanies, updateCompany } from "../api/company";
import CompanyTable from "../components/CompanyTable";
import CompanyModal from "../components/CompanyModal";
import { Company } from "../types";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const queryClient = useQueryClient();

  const { ref, inView } = useInView();

  const { data, error, isError, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["companies"],
      queryFn: ({ pageParam = 1 }) =>
        getCompanies({
          page: pageParam,
          limit: 12,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage, // Use the modified response's `nextPage`
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

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

  // Flatten paginated results
  const allCompanies = data?.pages.flatMap((page) => page.items) || [];

  return (
    <section>
      <Navbar />
      <div className="p-4">
        <CompanyTable
          companies={allCompanies}
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
      <div ref={ref}>{isFetchingNextPage && <Loader />}</div>
    </section>
  );
};

export default Home;
