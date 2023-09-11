import { useRouter } from "next/navigation";
import { JSX, useEffect } from "react";

const withAuth = (WrappedComponent: any) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("PoznajmySie") || "{}");
      const auth = user.token;
      if (auth===undefined) {
        router.replace("/login");
      }
    }, []);
    return <WrappedComponent {...props} />;
  };
  return AuthenticatedComponent;
};
export default withAuth;
