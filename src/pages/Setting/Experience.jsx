import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import { useForm, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Config } from "../../config";
import { Context } from "../../index";
import secureLocalStorage from "react-secure-storage";

const Experience = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const ref = useRef(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [experience, setExperience] = useState([]);
  const [expID, setExpID] = useState();
  const parseToDate = (dateString) => {
    const [monthString, yearString] = dateString.split("/");
    // Create a Date object with the year and month (subtract 1 because months are zero-indexed)
    return new Date(parseInt(yearString), parseInt(monthString) - 1);
  };
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

  const handleAddExperience = () => {
    setIsOpen(!isOpen);
  };

  const handleUpdateExperience = (id, index) => {
    setUpdate(true);
    setExpID(id);
    setIsOpen(!isOpen);

    setValue("club", experience[index]?.club);
    setValue("niveau", experience[index]?.niveau);
    setValue("startDate", parseToDate(experience[index]?.startDate));
    setValue("endDate", parseToDate(experience[index]?.endDate));
    setStartDate(parseToDate(experience[index]?.startDate));
    setEndDate(parseToDate(experience[index]?.endDate));
  };
  const handleDeleteExperience = async (id) => {
    const storedUserData = JSON.parse(localStorage.getItem("Secret"));
    const tokenn = storedUserData?.token;
    const response = await fetch(
      `${Config.LOCAL_URL}/api/experience/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
           Authorization: `Bearer ${tokenn}`,
        },
      }
    );
    if (response.status === 200) {
      fetchExperience();
      setValue("club");
      setValue("niveau");
      setValue("startDate");
      setValue("endDate");
      toast.success("Experience ete supprimé", {
        position: "top-right",
        autoClose: 5000,
        type: "warning",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.success("Un erreur", {
        position: "top-right",
        autoClose: 5000,
        type: "warning",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setValue("club");
      setValue("niveau");
      setValue("startDate");
      setValue("endDate");
      setIsOpen(false);
      setUpdate(false);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
    setValue("club");
    setValue("niveau");
    setValue("startDate");
    setValue("endDate");
  };
  const schema = yup
    .object({
      club: yup
        .string()
        .required("Ce champ est obligatoire")
        .max(50, ({ max }) => `Maximum de (${max} characters autorisé)`),
      niveau: yup
        .string()
        .max(255, ({ max }) => `Maximum de (${max} characters autorisé)`),
      startDate: yup.date().required("Ce champ est obligatoire"),
      endDate: yup
        .date()
        .required("Ce champ est obligatoire")
        .min(
          yup.ref("startDate"),
          "La date du fin doit etre apres la date du debut"
        ),
    })
    .required();

  const {
    trigger,
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {},
  });
  function formatDate(inputDate) {
    // Parse the inputDate string into a Date object
    const date = new Date(inputDate);

    // Extract month and year
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    // Format the date string
    const formattedDate = `${month}/${year}`;

    return formattedDate;
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    fetchExperience();
  }, []);
  const storedUserDatad = JSON.parse(
    secureLocalStorage.getItem("cryptedUser")
  );
  const fetchExperience = async () => {
    try {
      const storedUserDatad = JSON.parse(
        secureLocalStorage.getItem("cryptedUser")
      );
      const id = storedUserDatad ? storedUserDatad?.id : null;
      const storedUserData = JSON.parse(localStorage.getItem("Secret"));
      const tokenn = storedUserData?.token;
      const response = await fetch(
        `${Config.LOCAL_URL}/api/experience/fetch/${storedUserDatad.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
            Authorization: `Bearer ${tokenn}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setExperience(data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors as needed
    }
  };

  const onSubmit = async (data) => {
    if (update) {
      const storedUserData = JSON.parse(localStorage.getItem("Secret"));
      const tokenn = storedUserData?.token;
      const response = await fetch(
        `${Config.LOCAL_URL}/api/experience/update/${expID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
            Authorization: `Bearer ${tokenn}`,

            
          },
          body: JSON.stringify({
            club: data.club,
            niveau: data.niveau,
            startDate: formatDate(data.startDate),
            endDate: formatDate(data.endDate),
            iduser: storedUserDatad.id,
          }),
        }
      );
      if (response.status === 200) {
        fetchExperience();
        setIsOpen(!isOpen);
        setValue("club");
        setValue("niveau");
        setValue("startDate");
        setValue("endDate");
        toast.success("Vos modifications ont été enregistrées !", {
          position: "top-right",
          autoClose: 5000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success("Un erreur", {
          position: "top-right",
          autoClose: 5000,
          type: "warning",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      const storedUserData = JSON.parse(localStorage.getItem("Secret"));
      const tokenn = storedUserData?.token;
      const response = await fetch(
        `${Config.LOCAL_URL}/api/experience/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
            Authorization: `Bearer ${tokenn}`,
          },
          body: JSON.stringify({
            club: data.club,
            niveau: data.niveau,
            startDate: formatDate(data.startDate),
            endDate: formatDate(data.endDate),
            iduser: storedUserDatad.id,
          }),
        }
      );
      if (response.status === 200) {
        fetchExperience();
        setIsOpen(!isOpen);
        setValue("club");
        setValue("niveau");
        setValue("startDate");
        setValue("endDate");
        toast.success("Votre Experience a ete ajouter", {
          position: "top-right",
          autoClose: 5000,
          type: "success",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.success("Un erreur", {
          position: "top-right",
          autoClose: 5000,
          type: "warning",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };
  return (
    <>
      {experience.length <= 0 && (
        <div className=" py-4">
          <div>
            <ToastContainer />
          </div>
          <div className="flex gap-5 justify-between pr-2 text-3xl md:text-4xl font-bold whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
            <div className="flex-auto">
              {" "}
              {getTranslation(
                `Expériences`, // -----> Englais
                `Experience` //  -----> Francais
                //   ``,  //  -----> Turkey
                //   `` ,  //  -----> Allemagne
              )}
            </div>
            <button onClick={handleAddExperience}>
              <svg
                width="30"
                height="30"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36.125 21.625H24.875V10.375C24.875 9.33947 24.0355 8.5 23 8.5C21.9645 8.5 21.125 9.33947 21.125 10.375V21.625H9.875C8.83947 21.625 8 22.4645 8 23.5C8 24.5355 8.83947 25.375 9.875 25.375H21.125V36.625C21.125 37.6605 21.9645 38.5 23 38.5C24.0355 38.5 24.875 37.6605 24.875 36.625V25.375H36.125C37.1605 25.375 38 24.5355 38 23.5C38 22.4645 37.1605 21.625 36.125 21.625Z"
                  fill="#2E71EB"
                />
              </svg>
            </button>
          </div>
          <div className="text-center mt-4">
            <p>
              {getTranslation(
                `Add your experience to enhance your profile and attract agents`, // -----> Englais
                `Ajoutez votre expérience pour valoriser votre profil
              et attirer les agents` //  -----> Francais
                //   ``,  //  -----> Turkey
                //   `` ,  //  -----> Allemagne
              )}
            </p>
          </div>
        </div>
      )}
      {experience.length > 0 && (
        <div className="py-4 w-full">
          <div>
            <ToastContainer />
          </div>
          <div className="w-full flex justify-between md:gap-5 text-3xl md:text-4xl font-bold whitespace-nowrap max-md:flex-wrap">
            <div className="flex">
              {getTranslation(
                `Expériences`, // -----> Englais
                `Experience` //  -----> Francais
                //   ``,  //  -----> Turkey
                //   `` ,  //  -----> Allemagne
              )}{" "}
            </div>
            <button onClick={handleAddExperience}>
              <svg
                width="30"
                height="30"
                viewBox="0 0 46 47"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36.125 21.625H24.875V10.375C24.875 9.33947 24.0355 8.5 23 8.5C21.9645 8.5 21.125 9.33947 21.125 10.375V21.625H9.875C8.83947 21.625 8 22.4645 8 23.5C8 24.5355 8.83947 25.375 9.875 25.375H21.125V36.625C21.125 37.6605 21.9645 38.5 23 38.5C24.0355 38.5 24.875 37.6605 24.875 36.625V25.375H36.125C37.1605 25.375 38 24.5355 38 23.5C38 22.4645 37.1605 21.625 36.125 21.625Z"
                  fill="#2E71EB"
                />
              </svg>
            </button>
          </div>
          {experience.map((item, index) => {
            return (
              <div
                key={item.id}
                className="flex gap-4 justify-between p-2 mt-6 w-full max-md:max-w-full"
              >
                <div className="flex gap-4 text-zinc-900">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1745_15519)">
                      <path
                        d="M21.975 26.6667H18.025C17.145 26.668 16.2873 26.3901 15.5753 25.8728C14.8634 25.3556 14.334 24.6257 14.0633 23.7883L12.8433 20.0333C12.5676 19.1956 12.5657 18.2918 12.8377 17.4528C13.1098 16.6138 13.6418 15.8832 14.3567 15.3667L17.55 13.0533C18.2608 12.5343 19.1182 12.2546 19.9983 12.2546C20.8785 12.2546 21.7359 12.5343 22.4467 13.0533L25.6417 15.3733C26.3568 15.8897 26.8889 16.6203 27.161 17.4594C27.4331 18.2984 27.431 19.2022 27.155 20.04L25.9367 23.795C25.6635 24.6303 25.1333 25.3578 24.4218 25.8736C23.7102 26.3894 22.8538 26.667 21.975 26.6667ZM40 20C40 23.9556 38.827 27.8224 36.6294 31.1114C34.4318 34.4004 31.3082 36.9638 27.6537 38.4776C23.9992 39.9913 19.9778 40.3874 16.0982 39.6157C12.2186 38.844 8.65492 36.9392 5.85787 34.1421C3.06082 31.3451 1.15601 27.7814 0.384303 23.9018C-0.387401 20.0222 0.00866572 16.0009 1.52242 12.3463C3.03617 8.69181 5.59962 5.56824 8.8886 3.37061C12.1776 1.17298 16.0444 0 20 0C25.3026 0.00573514 30.3863 2.11471 34.1358 5.8642C37.8853 9.61368 39.9943 14.6974 40 20ZM20 35C20.863 34.995 21.7239 34.9158 22.5733 34.7633L23.9867 30.1283C24.3074 29.1212 24.9399 28.2421 25.7927 27.6178C26.6456 26.9935 27.6747 26.6564 28.7317 26.655L33.4267 26.6467C34.1825 25.1301 34.6735 23.4954 34.8783 21.8133L31.1317 19.3133C30.267 18.7065 29.6174 17.8407 29.2766 16.8408C28.9357 15.841 28.9211 14.7587 29.235 13.75L30.6567 9.46167C29.4648 8.26339 28.08 7.27404 26.56 6.535L22.94 9.045C22.0863 9.66784 21.0568 10.0035 20 10.0035C18.9432 10.0035 17.9137 9.66784 17.06 9.045L13.5367 6.485C12.0399 7.20003 10.6715 8.15736 9.48668 9.31833L10.765 13.7467C11.0789 14.7553 11.0643 15.8376 10.7235 16.8375C10.3826 17.8373 9.733 18.7031 8.86834 19.31L5.14501 21.9683C5.35912 23.596 5.84179 25.1769 6.57334 26.6467L11.2667 26.655C12.3237 26.6559 13.3531 26.9927 14.2062 27.6167C15.0594 28.2407 15.6922 29.1196 16.0133 30.1267L17.455 34.7667C18.2951 34.9173 19.1466 34.9953 20 35Z"
                        fill="#1D1E21"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1745_15519">
                        <rect width="40" height="40" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>

                  <div className="flex flex-col">
                    <div className="text-xl font-bold">{item?.club}</div>
                    <div className="text-base font-medium">{item?.niveau}</div>
                    <div className="flex gap-4 mt-1 text-xs font-light text-neutral-500">
                      <div>{item?.startDate}</div>
                      <div>-</div>
                      <div>{item?.endDate}</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 justify-between self-start p-1">
                  <button
                    onClick={() => handleUpdateExperience(item?.id, index)}
                  >
                    <svg
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.99786 15.9174C0.370381 16.5447 0.0177676 17.3956 0.0175781 18.2828V20H1.73474C2.622 19.9998 3.47284 19.6472 4.10013 19.0197L15.2605 7.8594L12.1582 4.75713L0.99786 15.9174Z"
                        fill="#1D1E21"
                      />
                      <path
                        d="M19.3757 0.643149C19.1721 0.43926 18.9302 0.277514 18.664 0.167158C18.3977 0.0568016 18.1124 0 17.8242 0C17.536 0 17.2506 0.0568016 16.9844 0.167158C16.7182 0.277514 16.4763 0.43926 16.2726 0.643149L13.3401 3.57647L16.4424 6.67874L19.3757 3.74626C19.5796 3.54258 19.7414 3.30072 19.8517 3.03449C19.9621 2.76826 20.0189 2.4829 20.0189 2.1947C20.0189 1.90651 19.9621 1.62114 19.8517 1.35492C19.7414 1.08869 19.5796 0.846826 19.3757 0.643149Z"
                        fill="#1D1E21"
                      />
                    </svg>
                  </button>
                  <button onClick={() => handleDeleteExperience(item?.id)}>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.3325 13.9623L23.3224 7.96621C23.7113 7.5242 23.9172 6.95069 23.8985 6.36225C23.8797 5.77382 23.6375 5.21461 23.2212 4.79831C22.8049 4.38201 22.2457 4.13986 21.6573 4.12107C21.0688 4.10228 20.4953 4.30827 20.0533 4.69717L14.0572 10.6871L8.05035 4.67864C7.8352 4.46348 7.57977 4.29281 7.29866 4.17637C7.01754 4.05993 6.71625 4 6.41197 4C6.1077 4 5.8064 4.05993 5.52529 4.17637C5.24417 4.29281 4.98875 4.46348 4.77359 4.67864C4.55843 4.89379 4.38776 5.14922 4.27132 5.43034C4.15488 5.71145 4.09495 6.01275 4.09495 6.31702C4.09495 6.6213 4.15488 6.92259 4.27132 7.20371C4.38776 7.48482 4.55843 7.74025 4.77359 7.9554L10.782 13.9623L4.79212 19.9568C4.55721 20.1668 4.36761 20.4225 4.23492 20.7083C4.10224 20.9941 4.02925 21.304 4.02044 21.6189C4.01162 21.9339 4.06716 22.2473 4.18366 22.5401C4.30015 22.8329 4.47515 23.0988 4.69795 23.3216C4.92075 23.5444 5.18667 23.7194 5.47943 23.8359C5.77219 23.9524 6.08564 24.0079 6.40061 23.9991C6.71557 23.9903 7.02543 23.9173 7.31122 23.7846C7.597 23.6519 7.85272 23.4623 8.06271 23.2274L14.0572 17.2375L20.0456 23.2274C20.4801 23.6619 21.0695 23.906 21.684 23.906C22.2985 23.906 22.8878 23.6619 23.3224 23.2274C23.7569 22.7929 24.001 22.2035 24.001 21.589C24.001 20.9745 23.7569 20.3852 23.3224 19.9506L17.3325 13.9623Z"
                        fill="#1D1E21"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {isOpen && (
        <div className="bg-black/70  fixed inset-0  z-50 h-full w-full  overflow-hidden flex justify-center items-center px-8 ">
          <div
            ref={ref}
            className="flex flex-col px-4 md:px-8 py-7  max-w-full bg-white rounded-[10px] w-[1000px]"
          >
            <div className="text-xl md:text-4xl font-bold text-zinc-900 max-md:max-w-full">
              {getTranslation(
                `Expériences`, // -----> Englais
                `Experience` //  -----> Francais
                //   ``,  //  -----> Turkey
                //   `` ,  //  -----> Allemagne
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col">
                <div className="mt-6 mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap">
                  <div className="lg:flex-1 w-full">
                    <div className="flex gap-4 justify-between px-4 items-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1689_65479)">
                          <path
                            d="M10.9875 13.3333H9.0125C8.5725 13.334 8.14363 13.195 7.78766 12.9364C7.43169 12.6778 7.16699 12.3128 7.03167 11.8942L6.42167 10.0167C6.28382 9.59778 6.28284 9.14589 6.41887 8.72641C6.55491 8.30692 6.82089 7.94161 7.17834 7.68333L8.775 6.52667C9.13041 6.26715 9.5591 6.12729 9.99917 6.12729C10.4392 6.12729 10.8679 6.26715 11.2233 6.52667L12.8208 7.68667C13.1784 7.94485 13.4444 8.31016 13.5805 8.72968C13.7165 9.14919 13.7155 9.60112 13.5775 10.02L12.9683 11.8975C12.8318 12.3151 12.5666 12.6789 12.2109 12.9368C11.8551 13.1947 11.4269 13.3335 10.9875 13.3333ZM20 10C20 11.9778 19.4135 13.9112 18.3147 15.5557C17.2159 17.2002 15.6541 18.4819 13.8268 19.2388C11.9996 19.9957 9.98891 20.1937 8.0491 19.8079C6.10929 19.422 4.32746 18.4696 2.92894 17.0711C1.53041 15.6725 0.578004 13.8907 0.192152 11.9509C-0.193701 10.0111 0.00433286 8.00043 0.761209 6.17317C1.51809 4.3459 2.79981 2.78412 4.4443 1.6853C6.08879 0.58649 8.02219 0 10 0C12.6513 0.00286757 15.1932 1.05736 17.0679 2.9321C18.9426 4.80684 19.9971 7.34872 20 10ZM10 17.5C10.4315 17.4975 10.862 17.4579 11.2867 17.3817L11.9933 15.0642C12.1537 14.5606 12.4699 14.1211 12.8964 13.8089C13.3228 13.4968 13.8374 13.3282 14.3658 13.3275L16.7133 13.3233C17.0913 12.565 17.3367 11.7477 17.4392 10.9067L15.5658 9.65667C15.1335 9.35323 14.8087 8.92034 14.6383 8.42041C14.4678 7.92048 14.4606 7.37933 14.6175 6.875L15.3283 4.73083C14.7324 4.13169 14.04 3.63702 13.28 3.2675L11.47 4.5225C11.0431 4.83392 10.5284 5.00173 10 5.00173C9.47161 5.00173 8.95687 4.83392 8.53 4.5225L6.76834 3.2425C6.01995 3.60002 5.33574 4.07868 4.74334 4.65917L5.3825 6.87333C5.53944 7.37767 5.53217 7.91881 5.36173 8.41874C5.19129 8.91867 4.8665 9.35156 4.43417 9.655L2.5725 10.9842C2.67956 11.798 2.92089 12.5885 3.28667 13.3233L5.63334 13.3275C6.16184 13.328 6.67653 13.4963 7.10311 13.8083C7.5297 14.1203 7.84611 14.5598 8.00667 15.0633L8.7275 17.3833C9.14754 17.4586 9.57328 17.4977 10 17.5Z"
                            fill="#1D1E21"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1689_65479">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <div className="grow text-lg">
                        {getTranslation(
                          `Club/Academy`, // -----> Englais
                          `Club/Académie` //  -----> Francais
                          //   ``,  //  -----> Turkey
                          //   `` ,  //  -----> Allemagne
                        )}
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        {...register("club")}
                        name="club"
                        type="text"
                        placeholder="Real Madrid CF"
                        className={`text-grey-900 placeholder-zinc-400 form-control w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] max-md:pr-5 ${
                          errors.club
                            ? "is-invalid border-1 !border-red-500"
                            : ""
                        }`}
                      />
                      {errors.club && (
                        <span className="invalid-feedback block py-2 px-2">
                          {getTranslation(
                            `This field is required!`, // -----> Englais
                            `Ce champ est obligatoire!`, //  -----> Francais
                            ``, //  -----> Turkey
                            `` //  -----> Allemagne
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="lg:flex-1 w-full">
                    <div className="flex gap-4 justify-between px-4 items-center">
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1686_73389)">
                          <path
                            d="M19.2939 10.0004C19.1002 10.0011 18.9084 9.9636 18.7293 9.88993C18.5502 9.81627 18.3874 9.70794 18.2504 9.57115L12.4178 3.81304C11.3221 2.71944 9.4445 2.725 8.36412 3.80678L2.52461 9.57115C2.38604 9.7083 2.22177 9.81676 2.04123 9.89033C1.86068 9.96391 1.6674 10.0011 1.47244 9.99992C1.27748 9.99869 1.08468 9.95902 0.905073 9.88318C0.725467 9.80734 0.562588 9.69681 0.425755 9.55794C0.288769 9.41929 0.180478 9.25498 0.107091 9.07441C0.0337052 8.89385 -0.00333539 8.70058 -0.0019137 8.50568C-0.000492003 8.31078 0.0393673 8.11807 0.11538 7.9386C0.191392 7.75913 0.302063 7.59641 0.441058 7.45978L6.27361 1.70097C6.81262 1.15937 7.45376 0.730151 8.15988 0.438175C8.866 0.146198 9.62304 -0.0027247 10.3871 3.77378e-05C11.153 -0.00204364 11.9116 0.147908 12.619 0.4412C13.3264 0.734491 13.9686 1.16529 14.5083 1.70862L20.3339 7.45978C20.4727 7.59655 20.5832 7.75933 20.659 7.93882C20.7349 8.11831 20.7746 8.31098 20.776 8.50583C20.7773 8.70068 20.7403 8.89389 20.6669 9.07441C20.5936 9.25494 20.4854 9.41924 20.3485 9.55794C20.2104 9.69785 20.0459 9.80889 19.8645 9.88461C19.6831 9.96033 19.4884 9.99921 19.2918 9.99899L19.2939 10.0004Z"
                            fill="#1D1E21"
                          />
                          <path
                            d="M19.2939 19.9997C19.1003 20.0004 18.9085 19.9629 18.7294 19.8894C18.5504 19.8159 18.3876 19.7077 18.2504 19.5712L12.4178 13.8123C11.3221 12.7187 9.4445 12.725 8.36412 13.8068L2.52461 19.5712C2.38595 19.7082 2.22164 19.8165 2.04107 19.89C1.86051 19.9634 1.66723 20.0006 1.4723 19.9993C1.27736 19.998 1.0846 19.9583 0.905022 19.8824C0.725447 19.8066 0.562589 19.6961 0.425755 19.5572C0.288769 19.4186 0.180478 19.2543 0.107091 19.0737C0.0337052 18.8932 -0.00333539 18.6999 -0.0019137 18.505C-0.000492003 18.3101 0.0393673 18.1174 0.11538 17.9379C0.191392 17.7584 0.302063 17.5957 0.441058 17.4591L6.27361 11.701C6.81262 11.1594 7.45376 10.7302 8.15988 10.4382C8.866 10.1462 9.62304 9.99728 10.3871 10C11.1529 9.99783 11.9115 10.1477 12.619 10.4408C13.3264 10.734 13.9686 11.1647 14.5083 11.7079L20.3339 17.4591C20.4727 17.5959 20.5832 17.7586 20.659 17.9381C20.7349 18.1176 20.7746 18.3103 20.776 18.5051C20.7773 18.7 20.7403 18.8932 20.6669 19.0737C20.5936 19.2542 20.4854 19.4185 20.3485 19.5572C20.2105 19.6973 20.046 19.8084 19.8646 19.8841C19.6831 19.9599 19.4884 19.9987 19.2918 19.9983L19.2939 19.9997Z"
                            fill="#1D1E21"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1686_73389">
                            <rect width="20.7778" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <div className="grow text-lg">
                        {getTranslation(
                          `Level`, // -----> Englais
                          `Niveau`, //  -----> Francais
                          ``, //  -----> Turkey
                          `` //  -----> Allemagne
                        )}
                      </div>
                    </div>
                    <div className="relative">
                      <select
                        {...register("niveau")}
                        name="niveau"
                        type="text"
                        placeholder="Senior"
                        className={`text-grey-900 placeholder-zinc-400 form-control w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] ${
                          errors.niveau
                            ? "is-invalid border-1 !border-red-500"
                            : ""
                        }`}
                      >
                        <option value="seniors">Seniors</option>
                        <option value="cadets">Cadets</option>
                        <option value="minimes">Minimes </option>
                        <option value="ecoles">
                          {getTranslation(
                            `School`, // -----> Englais
                            `Ecole`, //  -----> Francais
                            ``, //  -----> Turkey
                            `` //  -----> Allemagne
                          )}{" "}
                        </option>
                        <option value="benjamins ">Benjamins </option>
                      </select>
                      <div className="absolute right-0 top-1/2 px-4">
                        <svg
                          width="21"
                          height="10"
                          viewBox="0 0 21 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.4995 9.80888C9.95196 9.80986 9.4096 9.70291 8.90342 9.49414C8.39723 9.28538 7.93716 8.97889 7.5495 8.59221L0.74117 1.78388C0.58425 1.62696 0.496094 1.41413 0.496094 1.19221C0.496094 0.970294 0.58425 0.757465 0.74117 0.600545C0.89809 0.443625 1.11092 0.355469 1.33284 0.355469C1.55475 0.355469 1.76758 0.443625 1.9245 0.600545L8.73284 7.40888C9.20159 7.87705 9.837 8.14001 10.4995 8.14001C11.162 8.14001 11.7974 7.87705 12.2662 7.40888L19.0745 0.600545C19.2314 0.443625 19.4443 0.355469 19.6662 0.355469C19.8881 0.355469 20.1009 0.443625 20.2578 0.600545C20.4148 0.757465 20.5029 0.970294 20.5029 1.19221C20.5029 1.41413 20.4148 1.62696 20.2578 1.78388L13.4495 8.59221C13.0618 8.97889 12.6018 9.28538 12.0956 9.49414C11.5894 9.70291 11.047 9.80986 10.4995 9.80888Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                      {errors.niveau && (
                        <span className="invalid-feedback block py-2 px-2">
                          {getTranslation(
                            `This field is required!`, // -----> Englais
                            `Ce champ est obligatoire!`, //  -----> Francais
                            ``, //  -----> Turkey
                            `` //  -----> Allemagne
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-6 mr-4 max-md:mr-2.5 max-md:max-w-full flex-col md:flex-row flex gap-4 flex-wrap">
                  <div className="lg:flex-1 w-full">
                    <div className="flex gap-4 justify-between px-4 items-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1686_73166)">
                          <path
                            d="M0 15.832C0.00132321 16.9367 0.440735 17.9957 1.22185 18.7768C2.00296 19.558 3.062 19.9974 4.16667 19.9987H15.8333C16.938 19.9974 17.997 19.558 18.7782 18.7768C19.5593 17.9957 19.9987 16.9367 20 15.832V8.33203H0V15.832ZM14.1667 12.082C14.4139 12.082 14.6556 12.1553 14.8611 12.2927C15.0667 12.43 15.2269 12.6253 15.3215 12.8537C15.4161 13.0821 15.4409 13.3334 15.3926 13.5759C15.3444 13.8184 15.2254 14.0411 15.0505 14.2159C14.8757 14.3907 14.653 14.5098 14.4105 14.558C14.1681 14.6062 13.9167 14.5815 13.6883 14.4869C13.4599 14.3923 13.2647 14.2321 13.1273 14.0265C12.99 13.8209 12.9167 13.5793 12.9167 13.332C12.9167 13.0005 13.0484 12.6826 13.2828 12.4481C13.5172 12.2137 13.8351 12.082 14.1667 12.082ZM10 12.082C10.2472 12.082 10.4889 12.1553 10.6945 12.2927C10.9 12.43 11.0602 12.6253 11.1548 12.8537C11.2495 13.0821 11.2742 13.3334 11.226 13.5759C11.1777 13.8184 11.0587 14.0411 10.8839 14.2159C10.7091 14.3907 10.4863 14.5098 10.2439 14.558C10.0014 14.6062 9.75005 14.5815 9.52165 14.4869C9.29324 14.3923 9.09801 14.2321 8.96066 14.0265C8.82331 13.8209 8.75 13.5793 8.75 13.332C8.75 13.0005 8.8817 12.6826 9.11612 12.4481C9.35054 12.2137 9.66848 12.082 10 12.082ZM5.83333 12.082C6.08056 12.082 6.32223 12.1553 6.5278 12.2927C6.73336 12.43 6.89357 12.6253 6.98818 12.8537C7.08279 13.0821 7.10755 13.3334 7.05931 13.5759C7.01108 13.8184 6.89203 14.0411 6.71722 14.2159C6.5424 14.3907 6.31967 14.5098 6.0772 14.558C5.83472 14.6062 5.58339 14.5815 5.35498 14.4869C5.12657 14.3923 4.93135 14.2321 4.794 14.0265C4.65664 13.8209 4.58333 13.5793 4.58333 13.332C4.58333 13.0005 4.71503 12.6826 4.94945 12.4481C5.18387 12.2137 5.50181 12.082 5.83333 12.082Z"
                            fill="#1D1E21"
                          />
                          <path
                            d="M15.8333 1.66667H15V0.833333C15 0.61232 14.9122 0.400358 14.7559 0.244078C14.5996 0.0877974 14.3877 0 14.1667 0C13.9457 0 13.7337 0.0877974 13.5774 0.244078C13.4211 0.400358 13.3333 0.61232 13.3333 0.833333V1.66667H6.66667V0.833333C6.66667 0.61232 6.57887 0.400358 6.42259 0.244078C6.26631 0.0877974 6.05435 0 5.83333 0C5.61232 0 5.40036 0.0877974 5.24408 0.244078C5.0878 0.400358 5 0.61232 5 0.833333V1.66667H4.16667C3.062 1.66799 2.00296 2.1074 1.22185 2.88852C0.440735 3.66963 0.00132321 4.72867 0 5.83333L0 6.66667H20V5.83333C19.9987 4.72867 19.5593 3.66963 18.7782 2.88852C17.997 2.1074 16.938 1.66799 15.8333 1.66667Z"
                            fill="#1D1E21"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1686_73166">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <div className="grow text-lg">
                        {getTranslation(
                          `Start date`, // -----> Englais
                          `Date de début` //  -----> Francais
                          //   ``,  //  -----> Turkey
                          //   `` ,  //  -----> Allemagne
                        )}
                      </div>
                    </div>
                    <div className="w-full">
                      <DatePicker
                        placeholderText="Choisir date de début"
                        showMonthYearPicker
                        wrapperClassName="w-full cursor-pointer"
                        calendarClassName={"w-full"}
                        className={`form-control w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] ${
                          errors.startDate
                            ? "is-invalid border-1 !border-red-500"
                            : ""
                        }`}
                        selected={startDate}
                        dateFormat="MM/yyyy"
                        onChange={(date) => {
                          setValue("startDate", date);
                          setStartDate(date);
                        }}
                      />
                    </div>
                    {errors.startDate && (
                      <span className="invalid-feedback block py-2 px-2">
                        {getTranslation(
                          `This field is required!`, // -----> Englais
                          `Ce champ est obligatoire!`, //  -----> Francais
                          ``, //  -----> Turkey
                          `` //  -----> Allemagne
                        )}
                      </span>
                    )}
                  </div>
                  <div className="lg:flex-1 w-full">
                    <div className="flex gap-4 justify-between px-4 items-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.8333 1.66667H15V0.833333C15 0.61232 14.9122 0.400358 14.7559 0.244078C14.5996 0.0877974 14.3877 0 14.1667 0C13.9457 0 13.7337 0.0877974 13.5774 0.244078C13.4211 0.400358 13.3333 0.61232 13.3333 0.833333V1.66667H6.66667V0.833333C6.66667 0.61232 6.57887 0.400358 6.42259 0.244078C6.26631 0.0877974 6.05435 0 5.83333 0C5.61232 0 5.40036 0.0877974 5.24408 0.244078C5.0878 0.400358 5 0.61232 5 0.833333V1.66667H4.16667C3.062 1.66799 2.00296 2.1074 1.22185 2.88852C0.440735 3.66963 0.00132321 4.72867 0 5.83333L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H15.8333C16.938 19.9987 17.997 19.5593 18.7782 18.7782C19.5593 17.997 19.9987 16.938 20 15.8333V5.83333C19.9987 4.72867 19.5593 3.66963 18.7782 2.88852C17.997 2.1074 16.938 1.66799 15.8333 1.66667ZM1.66667 5.83333C1.66667 5.17029 1.93006 4.53441 2.3989 4.06557C2.86774 3.59673 3.50363 3.33333 4.16667 3.33333H15.8333C16.4964 3.33333 17.1323 3.59673 17.6011 4.06557C18.0699 4.53441 18.3333 5.17029 18.3333 5.83333V6.66667H1.66667V5.83333ZM15.8333 18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 16.4964 1.66667 15.8333V8.33333H18.3333V15.8333C18.3333 16.4964 18.0699 17.1323 17.6011 17.6011C17.1323 18.0699 16.4964 18.3333 15.8333 18.3333Z"
                          fill="black"
                        />
                      </svg>

                      <div className="grow text-lg">
                        {getTranslation(
                          ` Date de fin`, // -----> Englais
                          `End date` //  -----> Francais
                          //   ``,  //  -----> Turkey
                          //   `` ,  //  -----> Allemagne
                        )}
                      </div>
                    </div>
                    <div className="w-full">
                      <DatePicker
                        placeholderText="Choisir date fin"
                        showMonthYearPicker
                        wrapperClassName="w-full cursor-pointer"
                        calendarClassName={"w-full"}
                        className={`form-control w-full justify-center items-start py-3.5 pr-16 pl-4 mt-2 text-base border border-solid border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] ${
                          errors.endDate
                            ? "is-invalid border-1 !border-red-500"
                            : ""
                        } `}
                        selected={endDate}
                        dateFormat={"MM/yyyy"}
                        onChange={(date) => {
                          setValue("endDate", date);
                          setEndDate(date);
                        }}
                      />
                    </div>
                    {errors.endDate && (
                      <span className="invalid-feedback block py-2 px-2">
                        {errors.endDate?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-y-2 justify-between py-2 mr-4 w-full text-base font-medium flex-nowrap">
                  <div className="hidden md:flex gap-2 items-center justify-center  px-4 py-2 text-orange-600 border-2 border-solid border-orange-600 rounded-[30px] max-md:px-5">
                    <svg
                      width="15"
                      height="16"
                      viewBox="0 0 15 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.651 0.848955C14.4275 0.625519 14.1244 0.5 13.8084 0.5C13.4924 0.5 13.1893 0.625519 12.9658 0.848955L7.5 6.31474L2.03422 0.848955C1.81071 0.625519 1.50762 0.5 1.19159 0.5C0.875553 0.5 0.572458 0.625519 0.348955 0.848955C0.125519 1.07246 0 1.37555 0 1.69159C0 2.00762 0.125519 2.31071 0.348955 2.53422L5.81474 8L0.348955 13.4658C0.125519 13.6893 0 13.9924 0 14.3084C0 14.6244 0.125519 14.9275 0.348955 15.151C0.572458 15.3745 0.875553 15.5 1.19159 15.5C1.50762 15.5 1.81071 15.3745 2.03422 15.151L7.5 9.68526L12.9658 15.151C13.1893 15.3745 13.4924 15.5 13.8084 15.5C14.1244 15.5 14.4275 15.3745 14.651 15.151C14.8745 14.9275 15 14.6244 15 14.3084C15 13.9924 14.8745 13.6893 14.651 13.4658L9.18526 8L14.651 2.53422C14.8745 2.31071 15 2.00762 15 1.69159C15 1.37555 14.8745 1.07246 14.651 0.848955Z"
                        fill="#FF7F00"
                      />
                    </svg>
                    <button onClick={handleClose} className="">
                      {getTranslation(
                        `Cancel`, // -----> Englais
                        ` Annuler`, //  -----> Francais
                        ``, //  -----> Turkey
                        `` //  -----> Allemagne
                      )}
                    </button>
                  </div>
                  <div className="flex mr-3 gap-2 items-center justify-center   px-4 py-2 text-white bg-blue-600 rounded-[30px] max-md:px-5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/810cd337099c18a7e6b11929296189496595f751eeaf9b41ac7fbc60598d6f03?"
                      className="w-5 aspect-square"
                    />
                    <button type="submit" className="">
                      {getTranslation(
                        `Submit`, // -----> Englais
                        `Confirmer`, //  -----> Francais
                        ``, //  -----> Turkey
                        `` //  -----> Allemagne
                      )}
                    </button>
                  </div>
                  <div className="md:hidden flex gap-2 items-center justify-center  px-4 py-2 text-orange-600 border-2 border-solid border-orange-600 rounded-[30px] max-md:px-5">
                    <svg
                      width="15"
                      height="16"
                      viewBox="0 0 15 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.651 0.848955C14.4275 0.625519 14.1244 0.5 13.8084 0.5C13.4924 0.5 13.1893 0.625519 12.9658 0.848955L7.5 6.31474L2.03422 0.848955C1.81071 0.625519 1.50762 0.5 1.19159 0.5C0.875553 0.5 0.572458 0.625519 0.348955 0.848955C0.125519 1.07246 0 1.37555 0 1.69159C0 2.00762 0.125519 2.31071 0.348955 2.53422L5.81474 8L0.348955 13.4658C0.125519 13.6893 0 13.9924 0 14.3084C0 14.6244 0.125519 14.9275 0.348955 15.151C0.572458 15.3745 0.875553 15.5 1.19159 15.5C1.50762 15.5 1.81071 15.3745 2.03422 15.151L7.5 9.68526L12.9658 15.151C13.1893 15.3745 13.4924 15.5 13.8084 15.5C14.1244 15.5 14.4275 15.3745 14.651 15.151C14.8745 14.9275 15 14.6244 15 14.3084C15 13.9924 14.8745 13.6893 14.651 13.4658L9.18526 8L14.651 2.53422C14.8745 2.31071 15 2.00762 15 1.69159C15 1.37555 14.8745 1.07246 14.651 0.848955Z"
                        fill="#FF7F00"
                      />
                    </svg>

                    <button onClick={handleClose} className="">
                      {getTranslation(
                        `Cancel`, // -----> Englais
                        ` Annuler`, //  -----> Francais
                        ``, //  -----> Turkey
                        `` //  -----> Allemagne
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Experience;
