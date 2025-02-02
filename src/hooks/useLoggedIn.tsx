import { create } from "zustand";

type LoggedInStore = {
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
};

const useLoggedIn = create<LoggedInStore>((set) => ({
  loggedIn: JSON.parse(localStorage.getItem("loggedIn") || "false") as boolean,
  setLoggedIn: (loggedIn: boolean) => {
    set(() => ({ loggedIn }));
    localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  },
}));

export default useLoggedIn;
