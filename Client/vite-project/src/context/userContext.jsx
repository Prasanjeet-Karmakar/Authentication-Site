import { createContext } from "react";

const UserContext = createContext({
  currentUser: "",
  setCurrentUser: () => {},
});
export default UserContext;
