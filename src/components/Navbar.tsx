import { LogoutOutlined } from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import { FormEvent, useState } from "react";
import { Company } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCompany } from "../api/company";
import { Link } from "react-router-dom";
import useLoggedIn from "../hooks/useLoggedIn";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const setLoggedIn = useLoggedIn((state) => state.setLoggedIn);
  const queryClient = useQueryClient();
  const {
    mutate: mutateCompany,
    isError,
    error,
  } = useMutation({
    mutationFn: (data: Company) => addCompany(data),
    onSuccess: () => {
      setIsModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
    onError: (err) => {
      console.error("Error deleting company:", err);
    },
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddCompany = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as unknown as Company;
    mutateCompany(data);
  };

  return (
    <nav className="w-full p-4 bg-lightBlack text-white flex items-center justify-between">
      <Link to={"/"} className="text-sm font-semibold">
        Компании
      </Link>
      <div className="flex items-center gap-5">
        <LogoutOutlined
          onClick={() => setLoggedIn(false)}
          className="text-2xl cursor-pointer rotate-180"
        />
        <Button onClick={showModal} variant="solid" color="cyan">
          Добавить компания
        </Button>
      </div>
      <Modal
        title="Добавить компания"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {isError && <div>Error: {(error as Error).message}</div>}
        <form onSubmit={handleAddCompany} className="flex flex-col gap-5">
          <div className="w-full h-[1px] bg-gray-100"></div>
          <div className="w-full flex items-center justify-between gap-10">
            <label>Названия компании</label>
            <Input
              name="name"
              className="w-1/2"
              placeholder="Введите названия"
            />
          </div>
          <div className="w-full flex items-center justify-between gap-10">
            <label>Количество сотрудников</label>
            <Input
              name="count"
              className="w-1/2"
              placeholder="Введите количество"
            />
          </div>
          <div className="w-full h-[1px] bg-gray-100"></div>
          <Button className="self-center" htmlType="submit" type="primary">
            Добавить компания
          </Button>
        </form>
      </Modal>
    </nav>
  );
};

export default Navbar;
