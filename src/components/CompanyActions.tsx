import { Dropdown, Button, Modal } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Company } from "../types";

interface CompanyActionsProps {
  company: Company;
  onEdit: (company: Company) => void;
  onDelete: (id: string) => void;
}

const CompanyActions: React.FC<CompanyActionsProps> = ({
  company,
  onEdit,
  onDelete,
}) => {
  const { confirm } = Modal;
  const showConfirm = (id: string) => {
    confirm({
      title: "Вы хотите удалить?",
      icon: <ExclamationCircleOutlined />,
      okText: "Да",
      okType: "danger",
      cancelText: "Нет",
      onOk() {
        onDelete(id);
      },
      onCancel() {
        console.log("Cancelled");
      },
    });
  };

  const items = [
    {
      key: "1",
      label: (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onEdit(company);
          }}
          className="w-full flex items-center gap-4"
        >
          <EditOutlined />
          <span>Изменить</span>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          onClick={(e) => {
            e.stopPropagation();
            showConfirm(company.id!);
          }}
          className="w-full flex items-center gap-4"
        >
          <DeleteOutlined className="text-red-600" />
          <span className="text-red-600">Удалить</span>
        </div>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="topLeft">
      <Button className="border-none" onClick={(e) => e.stopPropagation()}>
        <MoreOutlined />
      </Button>
    </Dropdown>
  );
};

export default CompanyActions;
