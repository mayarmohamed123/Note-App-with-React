import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
} from "@heroui/react";
import { Leaf, Lock } from "lucide-react";
import authIcon from "../../../assets/Images/auth-icon-CP3s8BEw.jpg";
import { MailIcon } from "../../../assets/Icons/icons";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../lib/Schema/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginApi } from "../../../Services/authServices";
import { authContext } from "../../../Context/AuthContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { setIsLoggedIn } = useContext(authContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: zodResolver(loginSchema) });

  async function handleLogin(formData) {
    setIsLoading(true);
    const data = await loginApi(formData);
    setIsLoading(false);

    if (data.msg !== "done") {
      setErrorMsg(data.msg);
    } else {
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      const pathName = location.pathname;
      navigate(pathName === "/login" ? "/" : pathName);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-green-50 via-green-100 to-green-200">
      <Card className="w-full max-w-md rounded-2xl shadow-lg bg-gradient-to-br from-white via-green-50 to-green-100 border border-green-200 transition-all hover:shadow-xl p-10">
        {/* Header */}
        <CardHeader className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center overflow-hidden shadow-md">
            <img
              src={authIcon}
              alt="Notes"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-green-900 flex items-center gap-2">
            <Leaf className="w-6 h-6 text-green-600" />
            Welcome Back
          </h2>
          <p className="text-gray-500 text-center">
            Sign in to continue your peaceful note-taking
          </p>
        </CardHeader>

        {/* Body */}
        <CardBody className="mt-5">
          <form
            onSubmit={handleSubmit(handleLogin)}
            className="flex flex-col gap-4">
            {/* Email Input */}
            <Input
              {...register("email")}
              isInvalid={Boolean(errors.email?.message)}
              errorMessage={
                <span className="text-sm text-red-600 font-medium">
                  {errors.email?.message}
                </span>
              }
              label="Email"
              labelPlacement="outside"
              placeholder="you@example.com"
              type="email"
              required
              startContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
              }
            />

            {/* Password Input */}
            <Input
              {...register("password")}
              isInvalid={Boolean(errors.password?.message)}
              errorMessage={
                <span className="text-sm text-red-600 font-medium">
                  {errors.password?.message}
                </span>
              }
              label="Password"
              labelPlacement="outside"
              placeholder="Enter your password"
              type="password"
              required
              startContent={
                <Lock className="text-2xl text-default-400 pointer-events-none shrink-0" />
              }
            />

            <Button
              type="submit"
              className="w-full bg-green-600 text-white shadow-md hover:bg-green-700 hover:scale-105 transition-all rounded-2xl p-2 mb-4"
              isLoading={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            {errorMsg && (
              <p className="text-sm text-red-500 text-center mt-0">
                {errorMsg}
              </p>
            )}
          </form>
        </CardBody>

        {/* Footer */}
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-green-600 hover:underline transition">
              Create one
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
