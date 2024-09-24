import { useAppSelector } from "./hooks";

/**
 * This hook returns authentication info
 * @returns
 */
const useAuth = () => {
  const isAuthenticated = useAppSelector((state) => state.isAuthenticated);
  const user = useAppSelector((state) => state.user);

  return { isAuthenticated, user };
};

export default useAuth;
