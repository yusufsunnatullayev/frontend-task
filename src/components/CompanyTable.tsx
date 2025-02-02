import { Table, Space } from "antd";
import type { ColumnsType } from "antd/es/table"; // Import the correct type
import { Company } from "../types";
import { useNavigate } from "react-router-dom";
import CompanyActions from "./CompanyActions";

interface CompanyTableProps {
  companies: Company[];
  onEdit: (company: Company) => void;
  onDelete: (id: string) => void;
}

const CompanyTable: React.FC<CompanyTableProps> = ({
  companies,
  onEdit,
  onDelete,
}) => {
  const navigate = useNavigate();

  const columns: ColumnsType<Company> = [
    {
      title: "Названия компании",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Количество сотрудников",
      dataIndex: "count",
      key: "count",
      render: (count: number) => `${count} человек`,
    },
    {
      title: "",
      key: "actions",
      align: "right",
      render: (_: unknown, record: Company) => (
        <Space>
          <CompanyActions
            company={record}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table<Company>
      columns={columns}
      dataSource={companies}
      rowKey="id"
      onRow={(record) => ({
        onClick: () => navigate(`/companies/${record.id}`),
      })}
    />
  );
};

export default CompanyTable;
