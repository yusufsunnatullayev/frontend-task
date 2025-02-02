import { LoadingOutlined } from "@ant-design/icons";

const Loader = () => {
  return (
    <div className="text-blue-500 w-full h-[90vh] flex items-center justify-center">
      <LoadingOutlined className="text-3xl" />
    </div>
  );
};

export default Loader;
