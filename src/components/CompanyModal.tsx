import { Modal, Input, Button } from "antd";
import { FormEvent } from "react";
import { Company } from "../types";

interface CompanyModalProps {
  isVisible: boolean;
  selectedCompany: Company | null;
  onClose: () => void;
  onSubmit: (updatedCompany: Company) => void;
}

const CompanyModal: React.FC<CompanyModalProps> = ({
  isVisible,
  selectedCompany,
  onClose,
  onSubmit,
}) => {
  const handleUpdateCompany = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCompany) return;

    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());

    const updatedCompany: Company = {
      ...selectedCompany,
      ...updatedData,
      count: Number(updatedData.count),
    };

    onSubmit(updatedCompany);
  };

  return (
    <Modal
      title="Редактировать компанию"
      open={isVisible}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleUpdateCompany} className="flex flex-col gap-5">
        <div className="w-full h-[1px] bg-gray-100"></div>
        <div className="w-full flex items-center justify-between gap-10">
          <label>Названия компании</label>
          <Input
            name="name"
            className="w-1/2"
            placeholder="Введите названия"
            defaultValue={selectedCompany?.name}
          />
        </div>
        <div className="w-full flex items-center justify-between gap-10">
          <label>Количество сотрудников</label>
          <Input
            name="count"
            className="w-1/2"
            placeholder="Введите количество"
            defaultValue={selectedCompany?.count}
          />
        </div>
        <div className="w-full h-[1px] bg-gray-100"></div>
        <Button className="self-center" htmlType="submit" type="primary">
          Cохранять
        </Button>
      </form>
    </Modal>
  );
};

export default CompanyModal;
