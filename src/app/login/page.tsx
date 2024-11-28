
"use client";
import Form from "@/components/form/Form";
import FormInput from "@/components/form/FormInput";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import {useState } from "react";
import { useForm } from "react-hook-form";

import { toast } from "sonner";

const LoginForm = () => {
  // const [showPassword, setShowPassword] = useState(false);
  const router =useRouter();
  const [isDisabled, setIsDisabled] = useState(false); 

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: `testuser@gmail.com`,
      password: `testuser@gmail.com`,
    },
  });

  const dispatch =useAppDispatch()

  const [login] = useLoginMutation();

  const onFormSubmit = async(data:any) => {
    const toastId = toast.loading("Logging in...", { position: "top-center" });
    setIsDisabled(true);
    const userInfo = {
      email: data.email,
      password: data.password,
    };

     const res =  await login(userInfo).unwrap();
    //  console.log(res);
    //  const user = decodeToken(res.data.token)
    //  console.log(user)

    if(res.data.token){
      router.push('/home')
    }


    dispatch(setUser({
      user:res?.data?.user,
      token:res?.data?.token
    }));
    toast.success("User logged in successfully", {
      richColors: true,
      id: toastId,
      position: "top-center",
      duration: 1500,
    });
  };

  return (
    
    <Form onSubmit={handleSubmit(onFormSubmit)}>
    <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
    <FormInput
      label="Email"
      type="email"
      name="email"
      register={register}
      required
    />
    <FormInput
      label="Password"
      type="password"
      name="password"
      register={register}
      showToggle
      required
    />
    <button
      type="submit"
      disabled={isDisabled}
      // className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      className={`w-full py-2 rounded ${
        isDisabled
          ? "bg-gray-300 text-gray-600 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
    >
      Login
    </button>
  </Form>
  );
};

export default LoginForm;
