import { useMutation } from "@tanstack/react-query";
import { Button, Input } from "antd";
import { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authLogin } from "../api/auth";
import { User } from "../types";
import useLoggedIn from "../hooks/useLoggedIn";
import Loader from "../components/Loader";

const Login = () => {
  const setLoggedIn = useLoggedIn((state) => state.setLoggedIn);
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: authLogin,
    onSuccess: () => {
      setLoggedIn(true);
      navigate("/");
    },
  });

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries()) as unknown as User;
    login(userData);
  };

  if (isError) return <div>Error: {(error as Error).message}</div>;
  if (isPending) return <Loader />;

  return (
    <section className="bg-hero-pattern  bg-cover bg-center bg-no-repeat w-full h-screen ">
      <div className="w-full h-full bg-black/60 flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-white p-5 rounded-md flex flex-col items-start gap-3 shadow w-3/4 lg:w-1/3"
        >
          <h1 className="text-4xl mb-3 font-bold">Вход</h1>
          <div className="w-full mb-2 flex flex-col gap-1">
            <label className="text-sm font-normal">Логин</label>
            <Input name="login" placeholder="Введите логин" />
          </div>
          <div className="w-full mb-2 flex flex-col gap-1">
            <label className="text-sm font-normal">Пароль</label>
            <Input
              type="password"
              name="password"
              placeholder="Введите пароль"
            />
          </div>
          <Link
            className="text-blue-600 font-normal hover:underline duration-150 text-sm"
            to={"/register"}
          >
            Регистрация
          </Link>
          <div className="w-full h-[1px] bg-gray-100"></div>
          <Button
            htmlType="submit"
            color="green"
            variant="solid"
            className="self-center"
            type="primary"
          >
            Вход
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
