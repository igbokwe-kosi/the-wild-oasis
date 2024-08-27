import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);

  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  //1. Load authenticated user
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  //3. If user is not authenticated redirect to login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [isAuthenticated, isLoading, navigate]
  );

  //2. When loading show loading spinner
  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  //4. If user is authenticated show children
  if (isAuthenticated) return <>{children}</>;
}

export default ProtectedRoute;
