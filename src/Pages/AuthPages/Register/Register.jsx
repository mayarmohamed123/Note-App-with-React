import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
} from "@heroui/react";
import { Leaf, Lock, Mail, User, Phone, Calendar } from "lucide-react";
import authIcon from "../../../assets/Images/auth-icon-CP3s8BEw.jpg";
import { MailIcon } from "../../../assets/Icons/icons";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "../../../lib/Schema/RegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerApi } from "../../../Services/authServices";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [sucessMsg, setSucessMsg] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: zodResolver(RegisterSchema) });

  async function handleRegister(formData) {
    setIsLoading(true);
    const data = await registerApi(formData);
    setIsLoading(false);

    if (data.msg == "done") {
      setSucessMsg(data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      setErrorMsg(data.msg);
    }
    console.log(data);
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-green-50 via-green-100 to-green-200">
      <Card className="w-full max-w-md rounded-2xl shadow-lg bg-gradient-to-br from-white via-green-50 to-green-100 border border-green-200 transition-all hover:shadow-xl p-10">
        {/* Header */}
        <CardHeader className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center overflow-hidden shadow-md">
            <img
              src={authIcon}
              alt="Register"
              className="w-12 h-12 rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-green-900 flex items-center gap-2">
            <Leaf className="w-6 h-6 text-green-600" />
            Create Account
          </h2>
          <p className="text-gray-500 text-center">
            Join Peaceful Notes today 🌿
          </p>
        </CardHeader>

        {/* Body */}
        <CardBody className="mt-5">
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="flex flex-col gap-4">
            {/* Name */}
            <Input
              isInvalid={Boolean(errors.name?.message)}
              errorMessage={
                <span className="text-sm text-red-600 font-medium">
                  {errors.name?.message}
                </span>
              }
              {...register("name")}
              label="Name"
              labelPlacement="outside"
              placeholder="Enter your name"
              required
              startContent={
                <User className="text-2xl text-default-400 pointer-events-none shrink-0" />
              }
            />

            {/* Email */}
            <Input
              isInvalid={Boolean(errors.email?.message)}
              errorMessage={
                <span className="text-sm text-red-600 font-medium">
                  {errors.email?.message}
                </span>
              }
              {...register("email")}
              label="Email"
              labelPlacement="outside"
              placeholder="you@example.com"
              type="email"
              required
              startContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none shrink-0" />
              }
            />

            {/* Password */}
            <Input
              isInvalid={Boolean(errors.password?.message)}
              errorMessage={
                <span className="text-sm text-red-600 font-medium">
                  {errors.password?.message}
                </span>
              }
              {...register("password")}
              label="Password"
              labelPlacement="outside"
              placeholder="Enter your password"
              type="password"
              required
              startContent={
                <Lock className="text-2xl text-default-400 pointer-events-none shrink-0" />
              }
            />

            {/* Age */}
            <Input
              isInvalid={Boolean(errors.age?.message)}
              errorMessage={
                <span className="text-sm text-red-600 font-medium">
                  {errors.age?.message}
                </span>
              }
              {...register("age", { valueAsNumber: true })}
              label="Age"
              labelPlacement="outside"
              placeholder="Enter your age"
              type="number"
              required
              startContent={
                <Calendar className="text-2xl text-default-400 pointer-events-none shrink-0" />
              }
            />

            {/* Phone */}
            <Input
              isInvalid={Boolean(errors.phone?.message)}
              errorMessage={
                <span className="text-sm text-red-600 font-medium">
                  {errors.phone?.message}
                </span>
              }
              {...register("phone")}
              label="Phone"
              labelPlacement="outside"
              placeholder="+20 123 456 7890"
              type="tel"
              startContent={
                <Phone className="text-2xl text-default-400 pointer-events-none shrink-0" />
              }
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-green-600 text-white shadow-md hover:bg-green-700 hover:scale-105 transition-all rounded-2xl p-2 mb-4"
              isLoading={isLoading}>
              {isLoading ? "Registering..." : "Sign Up"}
            </Button>
            {errorMsg && (
              <p className="text-sm text-red-500 text-center mt-0">
                {errorMsg}
              </p>
            )}
            {sucessMsg && (
              <p className="text-sm text-center text-green-500 mt-0">
                {sucessMsg}
              </p>
            )}
          </form>
        </CardBody>

        {/* Footer */}
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 hover:underline transition">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
