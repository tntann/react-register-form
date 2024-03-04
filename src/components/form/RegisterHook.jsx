import React from "react";
import { useForm } from "react-hook-form";
import InputHook from "../input/InputHook";
import RadioHook from "../radio/RadioHook";
import Checkbox from "../checkbox/Checkbox";
import Dropdown from "../dropdown/Dropdown";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    username: yup.string().required("Please enter your username"),
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email address"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(8, "Your password must be at least 8 character or greater")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Your password must have at least 1 uppercase, 1 lowercase, 1 special character",
        }
      ),
    gender: yup
      .string()
      .required("Please select your gender")
      .oneOf(["male", "female"], "You can only select male or female"),
    job: yup.string().required("Please select your job"),
    // .oneOf(["front-end intern", "back-end intern", "fullstack developer"]),
    term: yup.boolean().required("Please accept the term and conditions"),
  })
  .required();

// const dropdownData = [
//   {
//     id: 1,
//     value: "front-end intern",
//     text: "Front-end Intern",
//   },
//   {
//     id: 2,
//     value: "back-end intern",
//     text: "Back-end Intern",
//   },
//   {
//     id: 3,
//     value: "fullstack developer",
//     text: "Fullstack Developer",
//   },
// ];

const RegisterHook = () => {
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      gender: "male",
    },
  });
  console.log("🚀 ~ RegisterHook ~ errors:", errors);

  const onSubmitHandler = (values) => {
    if (!isValid) return;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        console.log(values);
        reset({
          username: "",
          password: "",
          email: "",
          gender: "male",
          job: "",
          term: false,
        });
      }, 3000);
    });
  };
  const watchGender = watch("gender");
  console.log("🚀 ~ RegisterHook ~ watchGender:", watchGender);
  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="mx-auto max-w-[300px] my-10"
      autoComplete="off"
    >
      <div className="font-semibold mb-3">
        <h1 className="flex items-center justify-center text-2xl">
          REGISTER FORM
        </h1>
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="username" className="cursor-pointer">
          Username
        </label>
        <InputHook
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username"
          control={control}
        ></InputHook>
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="password" className="cursor-pointer">
          Password
        </label>
        <InputHook
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          control={control}
        ></InputHook>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label htmlFor="email" className="cursor-pointer">
          Email address
        </label>
        <InputHook
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email address"
          control={control}
        ></InputHook>
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label className="cursor-pointer">Gender</label>
        <div className="flex items-center gap-5 pl-1">
          <div className="flex items-center gap-x-3">
            <RadioHook
              name="gender"
              control={control}
              value="male"
              checked={watchGender === "male"}
            ></RadioHook>
            <span>Male</span>
          </div>
          <div className="flex items-center gap-x-3">
            <RadioHook
              name="gender"
              control={control}
              value="female"
              checked={watchGender === "female"}
            ></RadioHook>
            <span>Female</span>
          </div>
        </div>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-3 mb-5">
        <label className="cursor-pointer">Are you</label>
        <Dropdown
          control={control}
          setValue={setValue}
          name="job"
          dropdownLabel="Select your job"
          // dataJob={dropdownData}
        ></Dropdown>
        {errors.job && (
          <p className="text-red-500 text-sm">{errors.job.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <Checkbox
          control={control}
          text="I accept the terms and conditions"
          name="term"
        ></Checkbox>
        {errors.term && (
          <p className="text-red-500 text-sm">{errors.term.message}</p>
        )}
      </div>
      <button
        className={`w-full bg-blue-500 text-white p-5 mt-5 rounded-lg font-semibold hover:bg-blue-600 ${
          isSubmitting ? "opacity-50" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 mx-auto rounded-full border-2 border-t-2 border-white border-t-transparent animate-spin"></div>
        ) : (
          "Sunmit"
        )}
      </button>
    </form>
  );
};

export default RegisterHook;
