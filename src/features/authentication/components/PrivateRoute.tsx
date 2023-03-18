import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useLoggedIn } from "@features/authentication/hooks/useLoggedIn";

interface PrivateRouteProps {
  redirectTo?: string;
  children: ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectTo = "/",
  children,
}) => {
  const { loggedIn } = useLoggedIn();

  return loggedIn ? <>{children}</> : <Navigate to={redirectTo} />;
};
