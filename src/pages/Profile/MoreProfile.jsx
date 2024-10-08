import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Terrain from "../../components/Terrain";
import SlideMenu from "../../components/SlideMenu";
import Logo from "../../assets/ODIN22.png";
import { Link, redirect, useParams, useNavigate } from "react-router-dom";
import ProfileLayout from "../../Layout/ProfileLayout";
import Player from "./Fragments/Player";
import General from "./Fragments/General";
import Entraineur from "./Fragments/Entraineur";
import HomeLayout from "../../Layout/HomeLayout";
import Placeholder from "../../assets/placeholder.jpg";
import T343 from "../../assets/3-4-3.png";
import T4231 from "../../assets/4-2-3-1.png";
import T433 from "../../assets/4-3-3.png";
import T442 from "../../assets/4-4-2.png";
import T532 from "../../assets/5-3-2.png";
import T541 from "../../assets/5-4-1.png";
import { Config } from "../../config";
import { Context } from "../../index";
import { Langue } from "../../assets/data/Langue";
import { paysAllInfo } from "../../assets/data/Country";
import Other from "./../Setting/Fragments/Other";
import Social from "./components/social";
import secureLocalStorage from "react-secure-storage";

const More = () => {
  const { id } = useParams();
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

  const [player, setPlayer] = useState(null);
  const [agent, setAgent] = useState(null);
  const [user, setUser] = useState([]);
  const [skills, setSkills] = useState([]);
  const [showInvitation, setShowInvitation] = useState();
  const [isActive, setIsActive] = useState();
  const [owner, setOwner] = useState(false);
  const [acceptedFriend, setAcceptedFriend] = useState(false);
  const [invitationSend, setInvitationSend] = useState(false);
  const [Invitation, setInvitation] = useState([]);
  const [isCopyLinkPopupVisible, setIsCopyLinkPopupVisible] = useState(false);
  const [CurrentUser, setCurrentUser] = useState(null);
  const LocalStorageID = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
  const [experience, setExperience] = useState([]);

  // const user = JSON.parse(secureLocalStorage.getItem("cryptedUser"));
  const storedUserDatad = JSON.parse(
    secureLocalStorage.getItem("cryptedUser")
  );
  const storedUserData = JSON.parse(localStorage.getItem("Secret"));
  const tokenn = storedUserData?.token;

  const isOwner = storedUserDatad.id == id;
  const sendFriendRequest = async () => {
    const response = await fetch(
      `${Config.LOCAL_URL}/api/user/${id}/sendFriendRequest/${storedUserDatad.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenn}`,
        },
      }
    );

    const result = await response.json();
  };
  const copyLinkToClipboard = (articleId) => {
    // Assuming you have the URL of your articles, replace 'YOUR_BASE_URL' with the actual base URL
    const articleUrl = `${Config.LOCAL_URL}/articles/${articleId}`;

    // Copy the URL to the clipboard
    navigator.clipboard
      .writeText(articleUrl)
      .then(() => {})
      .catch((err) => {
        console.error("Failed to copy link to clipboard", err);
      });
  };

  const navigate = useNavigate();
  const fetchUser = async () => {
    const response = await fetch(`${Config.LOCAL_URL}/api/user/${id}`,{
      credentials: "include",
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${tokenn}`,
      },

    });
    const result = await response.json();

    if (result.message) {
      navigate("/404");
    } else {
      setCurrentUser(result);
    }
  };
  useEffect(() => {
    // isFriendAccepted()
    try {
      fetchUser();
    } catch (e) {
      console.log(e);
    }
  }, [user]);
  const getCountryFlagFromCountryName = (countryName) => {
    const country = paysAllInfo.find((country) => country?.name == countryName);
    return country ? country.iso["alpha-2"].toLowerCase() : null;
  };

  const fetchExperience = async () => {
    try {
      const response = await fetch(
        `${Config.LOCAL_URL}/api/experience/fetch/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenn}`, // Set the content type to JSON
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

  useEffect(() => {
    fetchExperience();
  }, [id]);

  return (
    <>
      <HomeLayout>
        <div className="flex flex-col mt-[120px] px-2">
          <div className="md:self-end items-end flex gap-2 justify-center md:w-[224px] text-center py-2 text-white whitespace-nowrap bg-orange-500 rounded-[30px]  w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac20d9bf5dc01e69f2a6e82df157e82794a74dd3d3c80d0437777183828a95ba?"
              className="my-auto aspect-square w-[15px]"
            />
            <Link to={`/profile/${id}`} className="hover:text-orange-300">
              {getTranslation(
                `Back to profile`, // -----> Englais
                `Revenir au Profil` //  -----> Francais
                //   ``,  //  -----> Turkey
                //   `` ,  //  -----> Allemagne
              )}
            </Link>
          </div>
          {CurrentUser?.user.profil === "player" && (
            <div className="flex mt-8 gap-y-8 flex-col items-center px-1 md:px-4 py-6 bg-white rounded-[10px] jusitfy-center ">
              <div className="flex justify-center ">
                <div className="max-w-[1110px] flex gap-3 justify-center items-center max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col  max-md:ml-0 ">
                    <img
                      loading="lazy"
                      srcSet={
                        CurrentUser?.user.image
                          ? CurrentUser?.user.image
                          : Placeholder
                      }
                      className="self-start max-w-full object-cover rounded-full aspect-square w-[227px] max-md:mt-4"
                    />
                  </div>
                  <div className="max-w-[865px] flex flex-col items-center justify-between gap-y-4">
                    <div className="flex flex-col w-full ">
                      <div className="flex gap-2 md:justify-between justify-center w-full max-md:flex-wrap max-md:max-w-full">
                        <div className="flex flex-col justify-between max-sm:text-center">
                          <div className="text-xl font-bold text-zinc-900">
                            {CurrentUser?.user.nom} {CurrentUser?.user.prenom}
                          </div>
                          <div className="text-base font-medium text-blue-600">
                            {CurrentUser?.user?.profil == "other"
                              ? CurrentUser?.other?.profession
                              : ""}
                            {CurrentUser?.user?.profil == "player"
                              ? " Joueur"
                              : ""}
                            {CurrentUser?.user?.profil == "agent" &&
                            CurrentUser?.agent?.typeresponsable == "players"
                              ? "Manager de Joueur"
                              : ""}
                            {CurrentUser?.user?.profil == "agent" &&
                            CurrentUser?.agent?.typeresponsable == "club"
                              ? "Manager de CLub"
                              : ""}
                            {CurrentUser?.user?.profil == "scout"
                              ? "Scout"
                              : ""}
                          </div>
                        </div>
                        {isOwner ? (
                          <div className="max-sm:w-full flex gap-2 max-sm:justify-center justify-between px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px]">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7d9a4939e54a7ca6f05fbd6e6afe23371f01555ddc659faf9ced6ddeab6710b?"
                              className="shrink-0 my-auto aspect-square w-[15px]"
                            />
                            <Link
                              to={"/setting/personal"}
                              className="flex items-center"
                            >
                              <p>
                                {" "}
                                {getTranslation(
                                  `Edit`, // -----> Englais
                                  `Modifier` //  -----> Francais
                                  //   ``,  //  -----> Turkey
                                  //   `` ,  //  -----> Allemagne
                                )}
                              </p>
                            </Link>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="mt-3 flex gap-x-4 px gap-y-2 justify-center  items-start mt-1 text-xs font-light text-center text-zinc-900 flex-wrap max-w-full">
                        <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                          <span
                            className={`flag-icon flag-icon-${getCountryFlagFromCountryName(
                              CurrentUser.user.countryresidence
                            )}`}
                            style={{ marginRight: "8px", width: "25px" }}
                          ></span>
                          <div className="grow self-start mt-1">
                            {CurrentUser.user?.countryresidence}
                          </div>
                        </div>
                        <div className="flex gap-2 justify-center items-center self-stretch py-2">
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.0481 1.33333C20.0481 1.11232 19.9603 0.900358 19.804 0.744078C19.6478 0.587797 19.4358 0.5 19.2148 0.5H15.4073C15.2425 0.500035 15.0814 0.548928 14.9444 0.640499C14.8074 0.732069 14.7006 0.862205 14.6375 1.01445C14.5745 1.1667 14.558 1.33423 14.5901 1.49586C14.6223 1.65749 14.7016 1.80596 14.8181 1.9225L15.8423 2.94667L14.1439 4.645C13.2795 4.10723 12.2801 3.82617 11.2621 3.83458C10.244 3.84299 9.24937 4.14052 8.39395 4.6925C7.73089 4.26727 6.98302 3.9919 6.20254 3.88559C5.42205 3.77928 4.62777 3.84461 3.87515 4.07702C3.12252 4.30942 2.42969 4.70329 1.84503 5.23114C1.26037 5.75899 0.797963 6.40809 0.490099 7.13313C0.182235 7.85816 0.0363313 8.64165 0.0625756 9.42891C0.0888198 10.2162 0.286579 10.9882 0.642046 11.6911C0.997513 12.394 1.50212 13.0109 2.12064 13.4986C2.73916 13.9864 3.45668 14.3332 4.22311 14.515V15.5H3.38978C3.05826 15.5 2.74032 15.6317 2.5059 15.8661C2.27148 16.1005 2.13978 16.4185 2.13978 16.75C2.13978 17.0815 2.27148 17.3995 2.5059 17.6339C2.74032 17.8683 3.05826 18 3.38978 18H4.22311V19.25C4.22311 19.5815 4.35481 19.8995 4.58923 20.1339C4.82365 20.3683 5.14159 20.5 5.47311 20.5C5.80463 20.5 6.12258 20.3683 6.357 20.1339C6.59142 19.8995 6.72311 19.5815 6.72311 19.25V18H7.55645C7.88797 18 8.20591 17.8683 8.44033 17.6339C8.67475 17.3995 8.80645 17.0815 8.80645 16.75C8.80645 16.4185 8.67475 16.1005 8.44033 15.8661C8.20591 15.6317 7.88797 15.5 7.55645 15.5H6.72311V14.5075C7.31414 14.3697 7.87764 14.1331 8.38978 13.8075C9.42127 14.4701 10.6473 14.7624 11.8668 14.6366C13.0863 14.5108 14.2268 13.9742 15.1013 13.115C15.9757 12.2557 16.5322 11.1248 16.6794 9.90771C16.8266 8.69061 16.5558 7.45962 15.9114 6.41667L17.6098 4.71833L18.6339 5.7425C18.7508 5.85937 18.8998 5.93883 19.062 5.97079C19.2242 6.00274 19.3922 5.98575 19.5447 5.92197C19.6972 5.85818 19.8273 5.75049 19.9184 5.61258C20.0095 5.47468 20.0576 5.31279 20.0564 5.1475L20.0481 1.33333ZM2.55645 9.25C2.55448 8.76821 2.67238 8.2935 2.89952 7.86861C3.12666 7.44372 3.4559 7.08199 3.85762 6.816C4.25933 6.55001 4.72089 6.38811 5.20074 6.34487C5.68059 6.30164 6.16366 6.37843 6.60645 6.56833C6.13694 7.38408 5.88983 8.30879 5.88983 9.25C5.88983 10.1912 6.13694 11.1159 6.60645 11.9317C6.16366 12.1216 5.68059 12.1984 5.20074 12.1551C4.72089 12.1119 4.25933 11.95 3.85762 11.684C3.4559 11.418 3.12666 11.0563 2.89952 10.6314C2.67238 10.2065 2.55448 9.73179 2.55645 9.25ZM11.3064 12.1667C10.7296 12.1667 10.1657 11.9956 9.68603 11.6751C9.20639 11.3546 8.83255 10.8991 8.6118 10.3662C8.39104 9.83321 8.33328 9.24676 8.44582 8.68099C8.55836 8.11521 8.83615 7.59551 9.24405 7.18761C9.65196 6.7797 10.1717 6.50192 10.7374 6.38938C11.3032 6.27684 11.8897 6.3346 12.4226 6.55535C12.9556 6.77611 13.4111 7.14994 13.7316 7.62959C14.0521 8.10923 14.2231 8.67314 14.2231 9.25C14.2231 10.0235 13.9158 10.7654 13.3688 11.3124C12.8219 11.8594 12.08 12.1667 11.3064 12.1667Z"
                              fill="#1D1E21"
                            />
                          </svg>
                          <div className="self-stretch my-auto">
                            {CurrentUser.user.gender == "male"
                              ? "Homme"
                              : "Femme"}
                          </div>
                        </div>
                        <div className="flex gap-2 justify-center items-center self-stretch py-2">
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_87_12064)">
                              <path
                                d="M0.112793 16.332C0.114116 17.4367 0.553528 18.4957 1.33464 19.2768C2.11576 20.058 3.1748 20.4974 4.27946 20.4987H15.9461C17.0508 20.4974 18.1098 20.058 18.8909 19.2768C19.6721 18.4957 20.1115 17.4367 20.1128 16.332V8.83203H0.112793V16.332ZM14.2795 12.582C14.5267 12.582 14.7684 12.6553 14.9739 12.7927C15.1795 12.93 15.3397 13.1253 15.4343 13.3537C15.5289 13.5821 15.5537 13.8334 15.5054 14.0759C15.4572 14.3184 15.3382 14.5411 15.1633 14.7159C14.9885 14.8907 14.7658 15.0098 14.5233 15.058C14.2808 15.1062 14.0295 15.0815 13.8011 14.9869C13.5727 14.8923 13.3775 14.7321 13.2401 14.5265C13.1028 14.3209 13.0295 14.0793 13.0295 13.832C13.0295 13.5005 13.1612 13.1826 13.3956 12.9481C13.63 12.7137 13.9479 12.582 14.2795 12.582ZM10.1128 12.582C10.36 12.582 10.6017 12.6553 10.8073 12.7927C11.0128 12.93 11.173 13.1253 11.2676 13.3537C11.3623 13.5821 11.387 13.8334 11.3388 14.0759C11.2905 14.3184 11.1715 14.5411 10.9967 14.7159C10.8219 14.8907 10.5991 15.0098 10.3567 15.058C10.1142 15.1062 9.86285 15.0815 9.63444 14.9869C9.40603 14.8923 9.21081 14.7321 9.07346 14.5265C8.9361 14.3209 8.86279 14.0793 8.86279 13.832C8.86279 13.5005 8.99449 13.1826 9.22891 12.9481C9.46333 12.7137 9.78127 12.582 10.1128 12.582ZM5.94613 12.582C6.19335 12.582 6.43503 12.6553 6.64059 12.7927C6.84615 12.93 7.00637 13.1253 7.10098 13.3537C7.19559 13.5821 7.22034 13.8334 7.17211 14.0759C7.12388 14.3184 7.00483 14.5411 6.83001 14.7159C6.65519 14.8907 6.43247 15.0098 6.18999 15.058C5.94751 15.1062 5.69618 15.0815 5.46777 14.9869C5.23936 14.8923 5.04414 14.7321 4.90679 14.5265C4.76944 14.3209 4.69613 14.0793 4.69613 13.832C4.69613 13.5005 4.82782 13.1826 5.06224 12.9481C5.29666 12.7137 5.61461 12.582 5.94613 12.582Z"
                                fill="#1D1E21"
                              />
                              <path
                                d="M15.9461 2.16667H15.1128V1.33333C15.1128 1.11232 15.025 0.900358 14.8687 0.744078C14.7124 0.587797 14.5005 0.5 14.2795 0.5C14.0584 0.5 13.8465 0.587797 13.6902 0.744078C13.5339 0.900358 13.4461 1.11232 13.4461 1.33333V2.16667H6.77946V1.33333C6.77946 1.11232 6.69166 0.900358 6.53538 0.744078C6.3791 0.587797 6.16714 0.5 5.94613 0.5C5.72511 0.5 5.51315 0.587797 5.35687 0.744078C5.20059 0.900358 5.11279 1.11232 5.11279 1.33333V2.16667H4.27946C3.1748 2.16799 2.11576 2.6074 1.33464 3.38852C0.553528 4.16963 0.114116 5.22867 0.112793 6.33333L0.112793 7.16667H20.1128V6.33333C20.1115 5.22867 19.6721 4.16963 18.8909 3.38852C18.1098 2.6074 17.0508 2.16799 15.9461 2.16667Z"
                                fill="#1D1E21"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_87_12064">
                                <rect
                                  width="20"
                                  height="20"
                                  fill="white"
                                  transform="translate(0.112793 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <div className="self-stretch my-auto">
                            {CurrentUser.user.date_naissance}
                          </div>
                        </div>
                        <div className="flex gap-2 justify-center items-center self-stretch py-2">
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_87_12069)">
                              <path
                                d="M15.1689 5.5C15.1689 2.7425 12.9264 0.5 10.1689 0.5C7.41145 0.5 5.16895 2.7425 5.16895 5.5C5.16895 7.9725 6.97478 10.0258 9.33561 10.425V20.5H11.0023V10.425C13.3631 10.0267 15.1689 7.97333 15.1689 5.5Z"
                                fill="black"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_87_12069">
                                <rect
                                  width="20"
                                  height="20"
                                  fill="white"
                                  transform="translate(0.168945 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>

                          <div className="self-stretch my-auto">
                            {CurrentUser.user.countryresidence} ,
                            {CurrentUser?.user?.cityresidence}{" "}
                          </div>
                        </div>
                        <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                          <svg
                            width="17"
                            height="21"
                            viewBox="0 0 17 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.3789 6.38645L11.7674 1.77495C10.9098 0.956593 9.76995 0.5 8.58457 0.5C7.39919 0.5 6.25935 0.956593 5.40179 1.77495L0.790291 6.38645C0.428596 6.74832 0.225465 7.23904 0.225586 7.75068C0.225707 8.26231 0.429068 8.75295 0.790934 9.11464C1.1528 9.47634 1.64353 9.67947 2.15516 9.67935C2.6668 9.67923 3.15743 9.47586 3.51912 9.114L6.65561 5.97751V18.571C6.65561 19.0826 6.85884 19.5733 7.22059 19.935C7.58234 20.2968 8.07298 20.5 8.58457 20.5C9.09616 20.5 9.5868 20.2968 9.94855 19.935C10.3103 19.5733 10.5135 19.0826 10.5135 18.571V5.97751L13.65 9.114C13.8291 9.29318 14.0417 9.43532 14.2758 9.53233C14.5098 9.62933 14.7606 9.67929 15.014 9.67935C15.2673 9.67941 15.5182 9.62957 15.7523 9.53268C15.9863 9.43578 16.199 9.29373 16.3782 9.11464C16.5574 8.93555 16.6995 8.72292 16.7965 8.48889C16.8935 8.25486 16.9435 8.00402 16.9436 7.75068C16.9436 7.49734 16.8938 7.24648 16.7969 7.0124C16.7 6.77833 16.5579 6.56563 16.3789 6.38645Z"
                              fill="#1D1E21"
                            />
                          </svg>

                          <div className="grow self-start mt-1">
                            {CurrentUser?.player?.height}cm
                          </div>
                        </div>
                        <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                          <svg
                            width="20"
                            height="21"
                            viewBox="0 0 20 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.4455 11.435C18.9664 10.8408 18.2539 10.5 17.4922 10.5H16.2497C15.5597 10.5 14.9997 11.0592 14.9997 11.75C14.9997 12.4408 15.5597 13 16.2497 13L17.5005 12.99C16.8897 15.8158 14.0297 17.51 11.2497 17.9075V13H12.083C12.773 13 13.333 12.4408 13.333 11.75C13.333 11.0592 12.773 10.5 12.083 10.5H11.2497V7.77C12.7014 7.2525 13.7497 5.8775 13.7497 4.25C13.7497 2.1825 12.0672 0.5 9.9997 0.5C7.9322 0.5 6.2497 2.1825 6.2497 4.25C6.2497 5.8775 7.29803 7.25167 8.7497 7.77V10.5H7.91637C7.22553 10.5 6.66637 11.0592 6.66637 11.75C6.66637 12.4408 7.22553 13 7.91637 13H8.7497V17.9075C5.97053 17.51 3.11137 15.8175 2.5072 13H3.7497C4.44053 13 4.9997 12.4408 4.9997 11.75C4.9997 11.0592 4.44053 10.5 3.7497 10.5H2.5072C1.74553 10.5 1.03303 10.8408 0.553867 11.4358C0.0788672 12.025 -0.102799 12.7842 0.0563672 13.5192C1.0472 18.1025 5.80887 20.5008 10.0005 20.5008C14.1922 20.5008 18.9539 18.1025 19.9447 13.5192C20.103 12.7842 19.9222 12.025 19.4464 11.4358L19.4455 11.435ZM9.9997 3C10.6889 3 11.2497 3.56083 11.2497 4.25C11.2497 4.93917 10.6889 5.5 9.9997 5.5C9.31053 5.5 8.7497 4.93917 8.7497 4.25C8.7497 3.56083 9.31053 3 9.9997 3Z"
                              fill="#1D1E21"
                            />
                          </svg>

                          <div className="grow self-start mt-1">
                            {CurrentUser?.player?.weight} Kg
                          </div>
                        </div>
                        <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d609bf65a79e970c6866ad932e5fdd62a603a912852f0024386dcf0730b04895?"
                            className="w-5 aspect-square"
                          />
                          <div className="grow  self-start mt-1">
                            {CurrentUser?.player?.champsoptionelle}
                          </div>
                        </div>

                        <div className="flex gap-2 justify-left items-center py-2">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a2ad5d0e7c1cc757b7d699a58b21f17f4dfeb3117bc9f1e3f4d361257cb7cc63?"
                            className="self-stretch w-5 aspect-[1.3]"
                          />
                          <div className="my-auto">
                            {getTranslation(
                              `License :`, // -----> Englais
                              `Licence :` //  -----> Francais
                              //   ``,  //  -----> Turkey
                              //   `` ,  //  -----> Allemagne
                            )}
                          </div>

                          {CurrentUser?.player?.Licence ? "✔️" : "❌"}
                        </div>

                        <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                          <svg
                            width="33"
                            height="21"
                            viewBox="0 0 33 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_121_15800)">
                              <path
                                d="M32.8175 17.9516C32.6757 18.4739 32.508 18.9837 32.15 19.4092C31.4993 20.1826 30.6591 20.5005 29.6654 20.4988C26.2985 20.4927 22.9334 20.4927 19.5698 20.4988H3.93179C2.54344 20.4988 1.47215 19.8314 1.00242 18.6633C0.909805 18.4347 0.852231 18.1911 0.778809 17.9549V16.4531C0.893113 16.4581 1.00742 16.4681 1.12172 16.4681H32.4746C32.5889 16.4681 32.7032 16.4581 32.8175 16.4531V17.9516Z"
                                fill="#1D1E21"
                              />
                              <path
                                d="M0.778809 8.94138C0.862243 8.60764 0.926487 8.27391 1.02911 7.94935C1.34747 6.97697 1.95999 6.12747 2.78203 5.51826C3.60407 4.90905 4.59504 4.57022 5.61799 4.54858C6.26627 4.5394 6.63171 4.88231 6.66926 5.52142C6.75269 6.9398 7.42017 7.97188 8.75011 8.47999C10.0642 8.9806 11.2531 8.67523 12.2543 7.68653C13.1813 6.76876 14.0982 5.84264 15.0218 4.92236C15.464 4.48099 15.8278 4.42759 16.3693 4.72712C17.4072 5.30115 18.4426 5.87768 19.4948 6.46256C19.4113 6.54599 19.3529 6.61941 19.287 6.68449C16.7217 9.25148 14.1539 11.8168 11.5835 14.3805C11.472 14.4937 11.3245 14.5646 11.1664 14.5807C7.75613 14.5913 4.3459 14.5938 0.935665 14.5882C0.883936 14.5882 0.832208 14.579 0.780479 14.574L0.778809 8.94138Z"
                                fill="#1D1E21"
                              />
                              <path
                                d="M32.8177 14.5731C32.7342 14.5781 32.6508 14.5881 32.5674 14.5881H20.4344C20.3451 14.5881 20.255 14.5781 20.1123 14.5706C20.2049 14.4696 20.2617 14.4037 20.3242 14.3394C21.8933 12.7681 23.4622 11.1965 25.0308 9.62458C25.1726 9.4819 25.2977 9.47189 25.493 9.48441C26.2923 9.53363 27.0941 9.55449 27.8959 9.56784C28.9244 9.57819 29.9245 9.90729 30.7581 10.5098C31.5918 11.1123 32.2181 11.9585 32.5507 12.9319C32.6625 13.2656 32.7301 13.6102 32.8177 13.9506V14.5731Z"
                                fill="#1D1E21"
                              />
                              <path
                                d="M14.1118 14.5892L21.2596 7.44141L23.373 8.61533C23.2896 8.71127 23.222 8.78803 23.1511 8.85895C21.3094 10.7012 19.4655 12.5412 17.6194 14.379C17.4874 14.5003 17.317 14.5715 17.138 14.58C16.1401 14.6017 15.1414 14.5892 14.1118 14.5892Z"
                                fill="#1D1E21"
                              />
                              <path
                                d="M10.1708 6.88219C9.44824 5.347 9.36732 3.87856 10.0239 2.4193C10.2843 1.8436 10.6914 1.32548 11.0944 0.825707C11.168 0.732494 11.2603 0.655609 11.3652 0.599935C11.4701 0.544261 11.5855 0.511015 11.704 0.502306C11.8224 0.493597 11.9414 0.509616 12.0534 0.549347C12.1653 0.589078 12.2678 0.651653 12.3543 0.733097C13.096 1.44479 13.8027 2.19236 14.5135 2.91406C13.2261 3.91527 12.1774 5.18097 10.9884 6.29148C10.7548 6.50757 10.4678 6.67444 10.1708 6.88219Z"
                                fill="#1D1E21"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_121_15800">
                                <rect
                                  width="32.0387"
                                  height="20"
                                  fill="white"
                                  transform="translate(0.778809 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>

                          <div className="grow self-start mt-1">
                            {CurrentUser?.player?.PiedFort}
                          </div>
                        </div>

                        {CurrentUser.user.langueparlee && (
                          <div className="flex gap-2   justify-center p-2 whitespace-nowrap">
                            <svg
                              className="size-6"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M11 5C11.1463 5.00005 11.2893 5.04286 11.4115 5.12317C11.5338 5.20348 11.6299 5.31778 11.688 5.452L14.938 12.952C14.98 13.0428 15.0035 13.1411 15.007 13.2411C15.0105 13.3411 14.9939 13.4408 14.9583 13.5343C14.9226 13.6278 14.8686 13.7133 14.7995 13.7856C14.7303 13.8579 14.6474 13.9157 14.5555 13.9554C14.4637 13.9952 14.3649 14.0162 14.2648 14.0172C14.1647 14.0182 14.0655 13.9991 13.9729 13.9611C13.8803 13.9232 13.7962 13.8671 13.7257 13.7961C13.6551 13.7252 13.5995 13.6408 13.562 13.548L12.89 12H9.10899L8.43899 13.548C8.35996 13.7306 8.21162 13.8743 8.02662 13.9476C7.84161 14.0208 7.63509 14.0175 7.45249 13.9385C7.26989 13.8595 7.12616 13.7111 7.05293 13.5261C6.9797 13.3411 6.98296 13.1346 7.06199 12.952L10.312 5.452C10.3701 5.31778 10.4662 5.20348 10.5884 5.12317C10.7107 5.04286 10.8537 5.00005 11 5ZM9.75999 10.5H12.24L11 7.636L9.75999 10.5ZM4.99999 1C5.1989 1 5.38967 1.07902 5.53032 1.21967C5.67097 1.36032 5.74999 1.55109 5.74999 1.75V3.011C6.61904 3.03659 7.4862 3.10702 8.34799 3.222C8.54518 3.24852 8.72376 3.35229 8.84444 3.51048C8.96512 3.66866 9.01801 3.86831 8.99149 4.0655C8.96497 4.26269 8.8612 4.44127 8.70301 4.56195C8.54483 4.68262 8.34518 4.73552 8.14799 4.709C7.92799 4.679 7.70799 4.653 7.48599 4.629C7.13418 5.84232 6.60659 6.99758 5.91999 8.058C6.15699 8.362 6.40799 8.653 6.67199 8.931C6.80924 9.07501 6.88366 9.26765 6.87888 9.46653C6.8741 9.66541 6.7905 9.85425 6.64649 9.9915C6.50248 10.1288 6.30984 10.2032 6.11096 10.1984C5.91208 10.1936 5.72324 10.11 5.58599 9.966C5.3833 9.75299 5.18786 9.53319 4.99999 9.307C4.18263 10.2901 3.22543 11.1479 2.15899 11.853C1.9931 11.9575 1.79287 11.993 1.60119 11.9517C1.40951 11.9104 1.24162 11.7956 1.13349 11.6321C1.02535 11.4685 0.985581 11.2691 1.02268 11.0766C1.05979 10.884 1.17082 10.7137 1.33199 10.602C2.38018 9.9086 3.30835 9.049 4.07999 8.057C3.88229 7.75222 3.69746 7.43928 3.52599 7.119C3.43224 6.94356 3.41202 6.73806 3.46978 6.54771C3.52754 6.35736 3.65855 6.19775 3.83399 6.104C4.00943 6.01025 4.21493 5.99003 4.40528 6.04779C4.59563 6.10555 4.75524 6.23656 4.84899 6.412C4.89799 6.502 4.94799 6.593 4.99899 6.683C5.38699 6.003 5.70699 5.278 5.95099 4.519C4.58141 4.46485 3.2097 4.52842 1.85099 4.709C1.6538 4.73552 1.45415 4.68262 1.29597 4.56195C1.13778 4.44127 1.03401 4.26269 1.00749 4.0655C0.98097 3.86831 1.03387 3.66866 1.15455 3.51048C1.27523 3.35229 1.4538 3.24852 1.65099 3.222C2.50399 3.108 3.37099 3.037 4.24899 3.011V1.75C4.24899 1.65143 4.26842 1.55382 4.30618 1.46276C4.34393 1.3717 4.39926 1.28897 4.46901 1.21932C4.53876 1.14966 4.62156 1.09444 4.71267 1.0568C4.80378 1.01917 4.90142 0.999869 4.99999 1Z"
                                fill="black"
                              />
                            </svg>

                            <div className=" self-start mt-1">
                              {CurrentUser.user.langueparlee}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex text-break md:text-left  text-center  font-light  text-neutral-900">
                      {CurrentUser?.user.discreptionBio}
                    </div>
                  </div>
                </div>
              </div>
              <span className="h-1 w-full bg-gray-100"></span>
              <div className="max-w-[1110px] gap-8 w-full flex flex-col md:flex-row ">
                <div className=" gap-y-4 max-w-xl  flex flex-col justify-center">
                  <div className="flex items-center justify-center gap-1 px-4  text-lg whitespace-nowrap text-zinc-900">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_878_80013)">
                        <path
                          d="M20.1242 17.1658C20.1242 19.0042 18.6292 20.4992 16.7909 20.4992H6.66925L8.37341 18.8325H16.7917C17.7109 18.8325 18.4584 18.085 18.4584 17.1658C18.4584 16.2467 17.7109 15.4992 16.7917 15.4992H12.6251C10.7867 15.4992 9.29175 14.0042 9.29175 12.1658C9.29175 10.56 10.4334 9.21667 11.9476 8.9025L13.5801 10.4992H12.6251C11.7059 10.4992 10.9584 11.2467 10.9584 12.1658C10.9584 13.085 11.7059 13.8325 12.6251 13.8325H16.7917C18.6301 13.8325 20.1242 15.3275 20.1242 17.1658ZM18.9034 7.6125L15.9576 10.4942L13.0176 7.61917C11.3867 5.9875 11.3867 3.345 13.0109 1.72C13.7984 0.933333 14.8451 0.5 15.9576 0.5C17.0701 0.5 18.1167 0.933333 18.9034 1.72C20.5284 3.345 20.5284 5.98833 18.9034 7.6125ZM7.23675 11.72C8.86175 13.345 8.86175 15.9883 7.23675 17.6125L4.29091 20.4942L1.35091 17.6192C-0.279921 15.9875 -0.279921 13.345 1.34425 11.72C2.13175 10.9333 3.17841 10.5 4.29091 10.5C5.40341 10.5 6.45008 10.9333 7.23675 11.72Z"
                          fill="#1D1E21"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_878_80013">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0.125 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <div className="">
                      {getTranslation(
                        `The positions`, // -----> Englais
                        `Les positions` //  -----> Francais
                        //   ``,  //  -----> Turkey
                        //   `` ,  //  -----> Allemagne
                      )}
                    </div>
                  </div>
                  <Terrain
                    positionPlay={CurrentUser?.player?.positionPlay}
                    positionSecond={CurrentUser?.player?.positionSecond}
                  />
                </div>
                <div className="flex flex-col gap-y-4">
                  <div className="max-w-xl flex items-center flex gap-4 px-4  text-lg whitespace-nowrap text-zinc-900">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9f295deb485341c8ef8867b332b44fca28ea634a4d9e5dd0f127dd63ac23138?"
                      className="shrink-0 w-5 aspect-square"
                    />
                    <div className="grow">
                      {getTranslation(
                        `Skills`, // -----> Englais
                        ` Compétences` //  -----> Francais
                        //   ``,  //  -----> Turkey
                        //   `` ,  //  -----> Allemagne
                      )}{" "} 
                    </div>
                  </div>
                  <div className="flex   justify-center text-base font-semibold text-blue-600 whitespace-nowrap flex-wrap">
                    {CurrentUser?.player?.skillsInProfile
                      .split(",")
                      .filter((item) => item !== "")
                      .map((item) => {
                        return (
                          <div className="justify-center px-4 py-2 m-1 border-2 border-blue-600 border-solid rounded-[30px] text-wrap text-center">
                            {item}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <span className="h-1 w-full bg-gray-100"></span>
              <div className="max-w-[1110px] justify-between w-full flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <div className=" flex-1 items-center max-w-xl  flex gap-4 px-4  text-lg whitespace-nowrap text-zinc-900">
                    <svg
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.8333 3.77474H14.9167C14.7233 2.83425 14.2115 1.98919 13.4677 1.382C12.7239 0.774815 11.7935 0.442618 10.8333 0.441406H9.16667C8.2065 0.442618 7.2761 0.774815 6.53229 1.382C5.78848 1.98919 5.27675 2.83425 5.08333 3.77474H4.16667C3.062 3.77606 2.00297 4.21547 1.22185 4.99659C0.440735 5.7777 0.00132351 6.83674 2.98023e-07 7.94141V10.4414H20V7.94141C19.9987 6.83674 19.5593 5.7777 18.7782 4.99659C17.997 4.21547 16.938 3.77606 15.8333 3.77474ZM6.82 3.77474C6.99174 3.28898 7.30936 2.86815 7.72942 2.56981C8.14948 2.27148 8.65145 2.11021 9.16667 2.10807H10.8333C11.3486 2.11021 11.8505 2.27148 12.2706 2.56981C12.6906 2.86815 13.0083 3.28898 13.18 3.77474H6.82Z"
                        fill="#1D1E21"
                      />
                      <path
                        d="M10.8333 12.9414C10.8333 13.1624 10.7455 13.3744 10.5893 13.5307C10.433 13.6869 10.221 13.7747 10 13.7747C9.77899 13.7747 9.56703 13.6869 9.41074 13.5307C9.25446 13.3744 9.16667 13.1624 9.16667 12.9414V12.1081H0V16.2747C0.00132321 17.3794 0.440735 18.4384 1.22185 19.2196C2.00296 20.0007 3.062 20.4401 4.16667 20.4414H15.8333C16.938 20.4401 17.997 20.0007 18.7782 19.2196C19.5593 18.4384 19.9987 17.3794 20 16.2747V12.1081H10.8333V12.9414Z"
                        fill="#1D1E21"
                      />
                    </svg>

                    <div className="grow">
                      {getTranslation(
                        `Experiences`, // -----> Englais
                        ` Expériences` //  -----> Francais
                        //   ``,  //  -----> Turkey
                        //   `` ,  //  -----> Allemagne
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 ">
                    {experience.map((item) => {
                      return (
                        <div className="flex gap-4 p-6 bg-white rounded-xl border border-solid border-neutral-200 text-zinc-900">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/252eced4db1a059984632875be2c6aa225083a0aaee940c137523f3515403684?"
                            className="shrink-0 self-start w-10 aspect-square"
                          />
                          <div className="flex flex-col">
                            <div className="text-xl font-bold">{item.club}</div>
                            <div className="text-base font-medium">
                              {item.niveau}
                            </div>
                            <div className="flex gap-4 mt-1 text-xs font-light text-neutral-500">
                              <div>{item.startDate}</div>
                              <div>-</div>
                              <div>{item.endDate}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* social icons */}

              <Social userInfo={CurrentUser} />

              {/* social icons */}
            </div>
          )}
          {CurrentUser?.user.profil === "coach" && (
            <div className="flex mt-8 gap-y-8 flex-col items-center px-4 py-6 bg-white rounded-[10px] jusitfy-center">
              <div className="flex justify-center ">
                <div className="max-w-[1110px] flex gap-3 justify-center items-center max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col  max-md:ml-0 ">
                    <img
                      loading="lazy"
                      srcSet={
                        CurrentUser?.user.image
                          ? CurrentUser?.user.image
                          : Placeholder
                      }
                      className="max-w-full rounded-full aspect-square w-[227px] max-md:mt-4"
                    />
                  </div>
                  <div className="max-w-[865px] flex flex-col items-center justify-between gap-y-4">
                    <div className="flex flex-col w-full ">
                      <div className="flex gap-2 md:justify-between justify-center w-full max-md:flex-wrap max-md:max-w-full">
                        <div className="flex flex-col justify-between max-sm:text-center">
                          <div className="text-xl font-bold text-zinc-900">
                            {CurrentUser?.user.nom} {CurrentUser?.user.prenom}
                          </div>
                          <div className="text-base font-medium text-blue-600">
                            {CurrentUser?.user?.profil == "other"
                              ? CurrentUser?.other?.profession
                              : ""}
                            {CurrentUser?.user?.profil == "player"
                              ? " Joueur"
                              : ""}
                            {CurrentUser?.user?.profil == "agent" &&
                            CurrentUser?.agent?.typeresponsable == "players"
                              ? "Manager de Joueur"
                              : ""}
                            {CurrentUser?.user?.profil == "agent" &&
                            CurrentUser?.agent?.typeresponsable == "club"
                              ? "Manager de CLub"
                              : ""}
                            {CurrentUser?.user?.profil == "scout"
                              ? "Scout"
                              : ""}
                          </div>
                          <div className="text-base font-medium text-blue-600">
                            {getTranslation(
                              `Coach`, // -----> Englais
                              `Entraîneur` //  -----> Francais
                              //   ``,  //  -----> Turkey
                              //   `` ,  //  -----> Allemagne
                            )}
                          </div>
                        </div>
                        {isOwner ? (
                          <div className="max-sm:w-full flex gap-2 max-sm:justify-center justify-between px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px]">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7d9a4939e54a7ca6f05fbd6e6afe23371f01555ddc659faf9ced6ddeab6710b?"
                              className="shrink-0 my-auto aspect-square w-[15px]"
                            />
                            <Link
                              to={"/setting/personal"}
                              className="flex items-center"
                            >
                              <p>
                                {getTranslation(
                                  `Edit`, // -----> Englais
                                  `Modifier` //  -----> Francais
                                  //   ``,  //  -----> Turkey
                                  //   `` ,  //  -----> Allemagne
                                )}
                              </p>
                            </Link>
                          </div>
                        ) : null}
                      </div>

                      {/* khnafis2 */}
                      <div className="flex  gap-x-8 gap-y-2 justify-between items-center mt-1 text-xs font-light text-center text-zinc-900 flex-wrap max-w-full">
                        <div className="flex gap-2 justify-center py-2 whitespace-nowrap">
                          <span
                            className={`flag-icon flag-icon-${getCountryFlagFromCountryName(
                              CurrentUser.user?.countryresidence
                            )}`}
                            style={{ marginRight: "8px", width: "25px" }}
                          ></span>
                          <div className="grow self-start mt-1">
                            {CurrentUser.user?.countryresidence}
                          </div>
                        </div>
                        <div className="flex gap-2 justify-center items-center self-stretch py-2">
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.0481 1.33333C20.0481 1.11232 19.9603 0.900358 19.804 0.744078C19.6478 0.587797 19.4358 0.5 19.2148 0.5H15.4073C15.2425 0.500035 15.0814 0.548928 14.9444 0.640499C14.8074 0.732069 14.7006 0.862205 14.6375 1.01445C14.5745 1.1667 14.558 1.33423 14.5901 1.49586C14.6223 1.65749 14.7016 1.80596 14.8181 1.9225L15.8423 2.94667L14.1439 4.645C13.2795 4.10723 12.2801 3.82617 11.2621 3.83458C10.244 3.84299 9.24937 4.14052 8.39395 4.6925C7.73089 4.26727 6.98302 3.9919 6.20254 3.88559C5.42205 3.77928 4.62777 3.84461 3.87515 4.07702C3.12252 4.30942 2.42969 4.70329 1.84503 5.23114C1.26037 5.75899 0.797963 6.40809 0.490099 7.13313C0.182235 7.85816 0.0363313 8.64165 0.0625756 9.42891C0.0888198 10.2162 0.286579 10.9882 0.642046 11.6911C0.997513 12.394 1.50212 13.0109 2.12064 13.4986C2.73916 13.9864 3.45668 14.3332 4.22311 14.515V15.5H3.38978C3.05826 15.5 2.74032 15.6317 2.5059 15.8661C2.27148 16.1005 2.13978 16.4185 2.13978 16.75C2.13978 17.0815 2.27148 17.3995 2.5059 17.6339C2.74032 17.8683 3.05826 18 3.38978 18H4.22311V19.25C4.22311 19.5815 4.35481 19.8995 4.58923 20.1339C4.82365 20.3683 5.14159 20.5 5.47311 20.5C5.80463 20.5 6.12258 20.3683 6.357 20.1339C6.59142 19.8995 6.72311 19.5815 6.72311 19.25V18H7.55645C7.88797 18 8.20591 17.8683 8.44033 17.6339C8.67475 17.3995 8.80645 17.0815 8.80645 16.75C8.80645 16.4185 8.67475 16.1005 8.44033 15.8661C8.20591 15.6317 7.88797 15.5 7.55645 15.5H6.72311V14.5075C7.31414 14.3697 7.87764 14.1331 8.38978 13.8075C9.42127 14.4701 10.6473 14.7624 11.8668 14.6366C13.0863 14.5108 14.2268 13.9742 15.1013 13.115C15.9757 12.2557 16.5322 11.1248 16.6794 9.90771C16.8266 8.69061 16.5558 7.45962 15.9114 6.41667L17.6098 4.71833L18.6339 5.7425C18.7508 5.85937 18.8998 5.93883 19.062 5.97079C19.2242 6.00274 19.3922 5.98575 19.5447 5.92197C19.6972 5.85818 19.8273 5.75049 19.9184 5.61258C20.0095 5.47468 20.0576 5.31279 20.0564 5.1475L20.0481 1.33333ZM2.55645 9.25C2.55448 8.76821 2.67238 8.2935 2.89952 7.86861C3.12666 7.44372 3.4559 7.08199 3.85762 6.816C4.25933 6.55001 4.72089 6.38811 5.20074 6.34487C5.68059 6.30164 6.16366 6.37843 6.60645 6.56833C6.13694 7.38408 5.88983 8.30879 5.88983 9.25C5.88983 10.1912 6.13694 11.1159 6.60645 11.9317C6.16366 12.1216 5.68059 12.1984 5.20074 12.1551C4.72089 12.1119 4.25933 11.95 3.85762 11.684C3.4559 11.418 3.12666 11.0563 2.89952 10.6314C2.67238 10.2065 2.55448 9.73179 2.55645 9.25ZM11.3064 12.1667C10.7296 12.1667 10.1657 11.9956 9.68603 11.6751C9.20639 11.3546 8.83255 10.8991 8.6118 10.3662C8.39104 9.83321 8.33328 9.24676 8.44582 8.68099C8.55836 8.11521 8.83615 7.59551 9.24405 7.18761C9.65196 6.7797 10.1717 6.50192 10.7374 6.38938C11.3032 6.27684 11.8897 6.3346 12.4226 6.55535C12.9556 6.77611 13.4111 7.14994 13.7316 7.62959C14.0521 8.10923 14.2231 8.67314 14.2231 9.25C14.2231 10.0235 13.9158 10.7654 13.3688 11.3124C12.8219 11.8594 12.08 12.1667 11.3064 12.1667Z"
                              fill="#1D1E21"
                            />
                          </svg>
                          <div className="self-stretch my-auto">
                            {CurrentUser.user.gender == "male"
                              ? "Homme"
                              : "Femme"}
                          </div>
                        </div>
                        <div className="flex gap-2 justify-center items-center self-stretch py-2">
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_87_12064)">
                              <path
                                d="M0.112793 16.332C0.114116 17.4367 0.553528 18.4957 1.33464 19.2768C2.11576 20.058 3.1748 20.4974 4.27946 20.4987H15.9461C17.0508 20.4974 18.1098 20.058 18.8909 19.2768C19.6721 18.4957 20.1115 17.4367 20.1128 16.332V8.83203H0.112793V16.332ZM14.2795 12.582C14.5267 12.582 14.7684 12.6553 14.9739 12.7927C15.1795 12.93 15.3397 13.1253 15.4343 13.3537C15.5289 13.5821 15.5537 13.8334 15.5054 14.0759C15.4572 14.3184 15.3382 14.5411 15.1633 14.7159C14.9885 14.8907 14.7658 15.0098 14.5233 15.058C14.2808 15.1062 14.0295 15.0815 13.8011 14.9869C13.5727 14.8923 13.3775 14.7321 13.2401 14.5265C13.1028 14.3209 13.0295 14.0793 13.0295 13.832C13.0295 13.5005 13.1612 13.1826 13.3956 12.9481C13.63 12.7137 13.9479 12.582 14.2795 12.582ZM10.1128 12.582C10.36 12.582 10.6017 12.6553 10.8073 12.7927C11.0128 12.93 11.173 13.1253 11.2676 13.3537C11.3623 13.5821 11.387 13.8334 11.3388 14.0759C11.2905 14.3184 11.1715 14.5411 10.9967 14.7159C10.8219 14.8907 10.5991 15.0098 10.3567 15.058C10.1142 15.1062 9.86285 15.0815 9.63444 14.9869C9.40603 14.8923 9.21081 14.7321 9.07346 14.5265C8.9361 14.3209 8.86279 14.0793 8.86279 13.832C8.86279 13.5005 8.99449 13.1826 9.22891 12.9481C9.46333 12.7137 9.78127 12.582 10.1128 12.582ZM5.94613 12.582C6.19335 12.582 6.43503 12.6553 6.64059 12.7927C6.84615 12.93 7.00637 13.1253 7.10098 13.3537C7.19559 13.5821 7.22034 13.8334 7.17211 14.0759C7.12388 14.3184 7.00483 14.5411 6.83001 14.7159C6.65519 14.8907 6.43247 15.0098 6.18999 15.058C5.94751 15.1062 5.69618 15.0815 5.46777 14.9869C5.23936 14.8923 5.04414 14.7321 4.90679 14.5265C4.76944 14.3209 4.69613 14.0793 4.69613 13.832C4.69613 13.5005 4.82782 13.1826 5.06224 12.9481C5.29666 12.7137 5.61461 12.582 5.94613 12.582Z"
                                fill="#1D1E21"
                              />
                              <path
                                d="M15.9461 2.16667H15.1128V1.33333C15.1128 1.11232 15.025 0.900358 14.8687 0.744078C14.7124 0.587797 14.5005 0.5 14.2795 0.5C14.0584 0.5 13.8465 0.587797 13.6902 0.744078C13.5339 0.900358 13.4461 1.11232 13.4461 1.33333V2.16667H6.77946V1.33333C6.77946 1.11232 6.69166 0.900358 6.53538 0.744078C6.3791 0.587797 6.16714 0.5 5.94613 0.5C5.72511 0.5 5.51315 0.587797 5.35687 0.744078C5.20059 0.900358 5.11279 1.11232 5.11279 1.33333V2.16667H4.27946C3.1748 2.16799 2.11576 2.6074 1.33464 3.38852C0.553528 4.16963 0.114116 5.22867 0.112793 6.33333L0.112793 7.16667H20.1128V6.33333C20.1115 5.22867 19.6721 4.16963 18.8909 3.38852C18.1098 2.6074 17.0508 2.16799 15.9461 2.16667Z"
                                fill="#1D1E21"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_87_12064">
                                <rect
                                  width="20"
                                  height="20"
                                  fill="white"
                                  transform="translate(0.112793 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <div className="self-stretch my-auto">
                            {CurrentUser.user.date_naissance}
                          </div>
                        </div>
                        <div className="flex gap-2 justify-center items-center self-stretch py-2">
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_87_12069)">
                              <path
                                d="M15.1689 5.5C15.1689 2.7425 12.9264 0.5 10.1689 0.5C7.41145 0.5 5.16895 2.7425 5.16895 5.5C5.16895 7.9725 6.97478 10.0258 9.33561 10.425V20.5H11.0023V10.425C13.3631 10.0267 15.1689 7.97333 15.1689 5.5Z"
                                fill="black"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_87_12069">
                                <rect
                                  width="20"
                                  height="20"
                                  fill="white"
                                  transform="translate(0.168945 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>

                          <div className="self-stretch my-auto">
                            {CurrentUser.user.countryresidence} ,
                            {CurrentUser?.user?.cityresidence}{" "}
                          </div>
                        </div>

                        <div className="flex gap-2 justify-center py-2 whitespace-nowrap">
                          <svg
                            width="20"
                            height="21"
                            viewBox="0 0 20 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_3422_17104)">
                              <mask
                                id="mask0_3422_17104"
                                maskUnits="userSpaceOnUse"
                                x="0"
                                y="0"
                                width="20"
                                height="21"
                              >
                                <path d="M20 0.5H0V20.5H20V0.5Z" fill="white" />
                              </mask>
                              <g mask="url(#mask0_3422_17104)">
                                <path
                                  d="M10.9875 13.8333H9.0125C8.5725 13.834 8.14363 13.695 7.78766 13.4364C7.43169 13.1778 7.16699 12.8128 7.03167 12.3942L6.42167 10.5167C6.28382 10.0978 6.28284 9.64589 6.41887 9.2264C6.55491 8.80692 6.82089 8.44161 7.17834 8.18333L8.775 7.02667C9.13041 6.76715 9.5591 6.62729 9.99917 6.62729C10.4392 6.62729 10.8679 6.76715 11.2233 7.02667L12.8208 8.18667C13.1784 8.44485 13.4444 8.81016 13.5805 9.22968C13.7165 9.64919 13.7155 10.1011 13.5775 10.52L12.9683 12.3975C12.8318 12.8151 12.5666 13.1789 12.2109 13.4368C11.8551 13.6947 11.4269 13.8335 10.9875 13.8333ZM20 10.5C20 12.4778 19.4135 14.4112 18.3147 16.0557C17.2159 17.7002 15.6541 18.9819 13.8268 19.7388C11.9996 20.4957 9.98891 20.6937 8.0491 20.3079C6.10929 19.922 4.32746 18.9696 2.92894 17.5711C1.53041 16.1725 0.578004 14.3907 0.192152 12.4509C-0.193701 10.5111 0.00433302 8.50043 0.761209 6.67317C1.51809 4.8459 2.79981 3.28412 4.4443 2.1853C6.08879 1.08649 8.02219 0.5 10 0.5C12.6513 0.502868 15.1932 1.55736 17.0679 3.4321C18.9426 5.30684 19.9971 7.84872 20 10.5ZM10 18C10.4315 17.9975 10.862 17.9579 11.2867 17.8817L11.9933 15.5642C12.1537 15.0606 12.4699 14.6211 12.8964 14.3089C13.3228 13.9968 13.8374 13.8282 14.3658 13.8275L16.7133 13.8233C17.0913 13.065 17.3367 12.2477 17.4392 11.4067L15.5658 10.1567C15.1335 9.85323 14.8087 9.42034 14.6383 8.92041C14.4678 8.42047 14.4606 7.87933 14.6175 7.375L15.3283 5.23083C14.7324 4.63169 14.04 4.13702 13.28 3.7675L11.47 5.0225C11.0431 5.33392 10.5284 5.50173 10 5.50173C9.47161 5.50173 8.95687 5.33392 8.53 5.0225L6.76834 3.7425C6.01995 4.10002 5.33574 4.57868 4.74334 5.15917L5.3825 7.37333C5.53944 7.87767 5.53217 8.41881 5.36173 8.91874C5.19129 9.41867 4.8665 9.85156 4.43417 10.155L2.5725 11.4842C2.67956 12.298 2.92089 13.0885 3.28667 13.8233L5.63334 13.8275C6.16184 13.828 6.67653 13.9963 7.10311 14.3083C7.5297 14.6203 7.84611 15.0598 8.00667 15.5633L8.7275 17.8833C9.14754 17.9586 9.57328 17.9977 10 18Z"
                                  fill="#1D1E21"
                                />
                              </g>
                            </g>
                            <defs>
                              <clipPath id="clip0_3422_17104">
                                <rect
                                  width="20"
                                  height="20"
                                  fill="white"
                                  transform="translate(0 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>

                          <div className="grow self-start mt-1">
                            {CurrentUser?.coach?.ClubActuelCoach}
                          </div>
                        </div>
                        <div className="flex gap-2 justify-center items-center self-stretch py-2">
                          <svg
                            width="20"
                            height="21"
                            viewBox="0 0 20 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_2149_15029)">
                              <path
                                d="M10.0037 0.5C4.47238 0.5 -0.0117188 4.9841 -0.0117188 10.5155C-0.0117188 16.0468 4.47238 20.5309 10.0037 20.5309C15.5351 20.5309 20.0192 16.0468 20.0192 10.5155C20.0192 4.9841 15.5351 0.5 10.0037 0.5ZM16.211 7.86684L16.8577 5.77602C17.7291 7.0391 18.2325 8.51937 18.3119 10.0518L16.5269 8.79434C16.2318 8.58625 16.1042 8.2118 16.211 7.86684ZM12.1677 2.46266H12.161L10.4943 3.67598C10.2022 3.88836 9.80648 3.88836 9.51434 3.67598L7.84766 2.46266C9.26098 2.07047 10.7544 2.07047 12.1677 2.46266ZM3.14434 5.77684L3.79102 7.86684C3.89781 8.2118 3.77027 8.58625 3.4752 8.79434L1.6902 10.0518C1.76953 8.51965 2.27297 7.03961 3.14434 5.77684ZM3.3402 15.4885L5.62937 15.496C5.99074 15.4968 6.31047 15.7303 6.42105 16.0743L7.14106 18.3185C5.62766 17.7615 4.30766 16.7787 3.3402 15.4885ZM12.8618 18.3185L13.581 16.0743C13.6915 15.7306 14.0108 15.4971 14.3718 15.496L16.6618 15.4885C15.6949 16.7788 14.3751 17.7617 12.8618 18.3185ZM17.6418 13.8185L14.3668 13.8293C13.2825 13.8307 12.3234 14.5328 11.9943 15.566L10.9652 18.7743C10.3249 18.8555 9.67703 18.8555 9.03684 18.7743L8.00766 15.5652C7.6782 14.532 6.71875 13.8303 5.63434 13.8293L2.36016 13.8193C2.10816 13.238 1.92391 12.6295 1.81098 12.006L4.43516 10.1568C5.32219 9.53426 5.70551 8.40996 5.38348 7.37516L4.43766 4.31516C4.91563 3.88082 5.4425 3.50355 6.00766 3.19098L8.53098 5.0243C9.40684 5.66328 10.5951 5.66328 11.471 5.0243L13.9943 3.19098C14.5593 3.50375 15.0862 3.88098 15.5643 4.31516L14.6185 7.37516C14.2965 8.40992 14.6798 9.53422 15.5668 10.1568L18.191 12.006C18.0782 12.6293 17.8939 13.2374 17.6418 13.8185Z"
                                fill="black"
                              />
                              <path
                                d="M12.8226 8.18828L11.2251 7.02828C10.4958 6.49578 9.506 6.49578 8.77678 7.02828L7.17928 8.18828C6.44581 8.71824 6.13975 9.66203 6.4226 10.5216L7.0326 12.3991C7.31139 13.2568 8.11155 13.8368 9.01342 13.8349H10.9884C11.8912 13.835 12.6913 13.2536 12.9701 12.3949L13.5793 10.5174C13.8604 9.6591 13.5545 8.7175 12.8226 8.18828ZM11.9942 10.0024L11.3851 11.8799C11.3294 12.0519 11.1692 12.1684 10.9884 12.1682H9.01339C8.83292 12.168 8.67315 12.0516 8.61757 11.8799L8.0076 10.0016C7.95147 9.82961 8.01276 9.64106 8.15928 9.53492L9.75596 8.3766C9.90206 8.27043 10.0999 8.27043 10.246 8.3766L11.8435 9.5366C11.9892 9.64285 12.0501 9.83086 11.9942 10.0024Z"
                                fill="black"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2149_15029">
                                <rect
                                  width="20"
                                  height="20"
                                  fill="white"
                                  transform="translate(0 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>

                          <div className="self-stretch my-auto">
                            {" "}
                            {CurrentUser.coach?.totalTeam}
                            {getTranslation(
                              ` Clubs coached`, // -----> Englais
                              ` Equipes entrainées` //  -----> Francais
                              //   ``,  //  -----> Turkey
                              //   `` ,  //  -----> Allemagne
                            )}
                          </div>
                          {CurrentUser.user.langueparlee && (
                            <div className="flex gap-2   justify-center p-2 whitespace-nowrap">
                              <svg
                                className="size-6"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M11 5C11.1463 5.00005 11.2893 5.04286 11.4115 5.12317C11.5338 5.20348 11.6299 5.31778 11.688 5.452L14.938 12.952C14.98 13.0428 15.0035 13.1411 15.007 13.2411C15.0105 13.3411 14.9939 13.4408 14.9583 13.5343C14.9226 13.6278 14.8686 13.7133 14.7995 13.7856C14.7303 13.8579 14.6474 13.9157 14.5555 13.9554C14.4637 13.9952 14.3649 14.0162 14.2648 14.0172C14.1647 14.0182 14.0655 13.9991 13.9729 13.9611C13.8803 13.9232 13.7962 13.8671 13.7257 13.7961C13.6551 13.7252 13.5995 13.6408 13.562 13.548L12.89 12H9.10899L8.43899 13.548C8.35996 13.7306 8.21162 13.8743 8.02662 13.9476C7.84161 14.0208 7.63509 14.0175 7.45249 13.9385C7.26989 13.8595 7.12616 13.7111 7.05293 13.5261C6.9797 13.3411 6.98296 13.1346 7.06199 12.952L10.312 5.452C10.3701 5.31778 10.4662 5.20348 10.5884 5.12317C10.7107 5.04286 10.8537 5.00005 11 5ZM9.75999 10.5H12.24L11 7.636L9.75999 10.5ZM4.99999 1C5.1989 1 5.38967 1.07902 5.53032 1.21967C5.67097 1.36032 5.74999 1.55109 5.74999 1.75V3.011C6.61904 3.03659 7.4862 3.10702 8.34799 3.222C8.54518 3.24852 8.72376 3.35229 8.84444 3.51048C8.96512 3.66866 9.01801 3.86831 8.99149 4.0655C8.96497 4.26269 8.8612 4.44127 8.70301 4.56195C8.54483 4.68262 8.34518 4.73552 8.14799 4.709C7.92799 4.679 7.70799 4.653 7.48599 4.629C7.13418 5.84232 6.60659 6.99758 5.91999 8.058C6.15699 8.362 6.40799 8.653 6.67199 8.931C6.80924 9.07501 6.88366 9.26765 6.87888 9.46653C6.8741 9.66541 6.7905 9.85425 6.64649 9.9915C6.50248 10.1288 6.30984 10.2032 6.11096 10.1984C5.91208 10.1936 5.72324 10.11 5.58599 9.966C5.3833 9.75299 5.18786 9.53319 4.99999 9.307C4.18263 10.2901 3.22543 11.1479 2.15899 11.853C1.9931 11.9575 1.79287 11.993 1.60119 11.9517C1.40951 11.9104 1.24162 11.7956 1.13349 11.6321C1.02535 11.4685 0.985581 11.2691 1.02268 11.0766C1.05979 10.884 1.17082 10.7137 1.33199 10.602C2.38018 9.9086 3.30835 9.049 4.07999 8.057C3.88229 7.75222 3.69746 7.43928 3.52599 7.119C3.43224 6.94356 3.41202 6.73806 3.46978 6.54771C3.52754 6.35736 3.65855 6.19775 3.83399 6.104C4.00943 6.01025 4.21493 5.99003 4.40528 6.04779C4.59563 6.10555 4.75524 6.23656 4.84899 6.412C4.89799 6.502 4.94799 6.593 4.99899 6.683C5.38699 6.003 5.70699 5.278 5.95099 4.519C4.58141 4.46485 3.2097 4.52842 1.85099 4.709C1.6538 4.73552 1.45415 4.68262 1.29597 4.56195C1.13778 4.44127 1.03401 4.26269 1.00749 4.0655C0.98097 3.86831 1.03387 3.66866 1.15455 3.51048C1.27523 3.35229 1.4538 3.24852 1.65099 3.222C2.50399 3.108 3.37099 3.037 4.24899 3.011V1.75C4.24899 1.65143 4.26842 1.55382 4.30618 1.46276C4.34393 1.3717 4.39926 1.28897 4.46901 1.21932C4.53876 1.14966 4.62156 1.09444 4.71267 1.0568C4.80378 1.01917 4.90142 0.999869 4.99999 1Z"
                                  fill="black"
                                />
                              </svg>

                              <div className="mt-1">
                                {CurrentUser.user.langueparlee}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex text-base font-light max-sm:text-center text-neutral-900">
                      {CurrentUser?.user.discreptionBio}
                    </div>
                  </div>
                </div>
              </div>
              <span className="h-1 w-full bg-gray-100"></span>
              <div className="max-w-[1110px] gap-8 w-full flex flex-col md:flex-row ">
                <div className=" gap-y-4 max-w-xl flex  flex-col justify-center">
                  <div className="flex gap-4  text-lg whitespace-nowrap text-zinc-900">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_878_80013)">
                        <path
                          d="M20.1242 17.1658C20.1242 19.0042 18.6292 20.4992 16.7909 20.4992H6.66925L8.37341 18.8325H16.7917C17.7109 18.8325 18.4584 18.085 18.4584 17.1658C18.4584 16.2467 17.7109 15.4992 16.7917 15.4992H12.6251C10.7867 15.4992 9.29175 14.0042 9.29175 12.1658C9.29175 10.56 10.4334 9.21667 11.9476 8.9025L13.5801 10.4992H12.6251C11.7059 10.4992 10.9584 11.2467 10.9584 12.1658C10.9584 13.085 11.7059 13.8325 12.6251 13.8325H16.7917C18.6301 13.8325 20.1242 15.3275 20.1242 17.1658ZM18.9034 7.6125L15.9576 10.4942L13.0176 7.61917C11.3867 5.9875 11.3867 3.345 13.0109 1.72C13.7984 0.933333 14.8451 0.5 15.9576 0.5C17.0701 0.5 18.1167 0.933333 18.9034 1.72C20.5284 3.345 20.5284 5.98833 18.9034 7.6125ZM7.23675 11.72C8.86175 13.345 8.86175 15.9883 7.23675 17.6125L4.29091 20.4942L1.35091 17.6192C-0.279921 15.9875 -0.279921 13.345 1.34425 11.72C2.13175 10.9333 3.17841 10.5 4.29091 10.5C5.40341 10.5 6.45008 10.9333 7.23675 11.72Z"
                          fill="#1D1E21"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_878_80013">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0.125 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <div className="grow">
                      {getTranslation(
                        ``, // -----> Englais
                        `Tactique préférée` //  -----> Francais
                        //   ``,  //  -----> Turkey
                        //   `` ,  //  -----> Allemagne
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center text-xs text-center w-full md:w-[366px]  text-white whitespace-nowrap ">
                    <div className=" flex relative flex-col py-9 pr-12 pl-4 w-full aspect-[1.45]">
                      {CurrentUser.coach?.footballTactic == "3-4-3" && (
                        <img
                          alt="terrain"
                          loading="lazy"
                          srcSet={T343}
                          className="object-cover absolute inset-0 size-full"
                        />
                      )}
                      {CurrentUser.coach?.footballTactic == "4-3-3" && (
                        <img
                          alt="terrain"
                          loading="lazy"
                          srcSet={T433}
                          className="object-cover absolute inset-0 size-full"
                        />
                      )}
                      {CurrentUser.coach?.footballTactic === "4-4-2" && (
                        <img
                          alt="terrain"
                          loading="lazy"
                          srcSet={T442}
                          className="object-cover absolute inset-0 size-full"
                        />
                      )}
                      {CurrentUser.coach?.footballTactic === "5-4-1" && (
                        <img
                          alt="terrain"
                          loading="lazy"
                          srcSet={T541}
                          className="object-cover absolute inset-0 size-full"
                        />
                      )}
                      {CurrentUser.coach?.footballTactic === "4-2-3-1" && (
                        <img
                          alt="terrain"
                          loading="lazy"
                          srcSet={T4231}
                          className="object-cover absolute inset-0 size-full"
                        />
                      )}
                      {CurrentUser.coach?.footballTactic === "5-3-2" && (
                        <img
                          alt="terrain"
                          loading="lazy"
                          srcSet={T532}
                          className="object-cover absolute inset-0 size-full"
                        />
                      )}
                      {CurrentUser.coach?.footballTactic === "3-4-3" && (
                        <img
                          alt="terrain"
                          loading="lazy"
                          srcSet={T343}
                          className="object-cover absolute inset-0 size-full"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-y-4">
                  <div className="max-w-xl  items-center flex gap-4 text-lg whitespace-nowrap text-zinc-900">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9f295deb485341c8ef8867b332b44fca28ea634a4d9e5dd0f127dd63ac23138?"
                      className="shrink-0 w-5 aspect-square"
                    />
                    <div className="grow">
                      {getTranslation(
                        `Skills`, // -----> Englais
                        ` Compétences` //  -----> Francais
                        //   ``,  //  -----> Turkey
                        //   `` ,  //  -----> Allemagne
                      )}{" "}
                    </div>
                  </div>
                  <div className="  max-w-xl  flex gap-2  text-base font-semibold text-blue-600 whitespace-nowrap flex-wrap">
                    {CurrentUser?.coach?.skills
                      .split(",")
                      .filter((item) => item !== "")
                      .map((item) => {
                        return (
                          <div className="grow text-center justify-center px-4 py-2 border-2 border-blue-600 border-solid rounded-[30px]">
                            {item}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* social icons */}
              <div div className="  max-w-xl  flex gap-4 justify-between mt-3">
                {CurrentUser?.user.liensSM && (
                  <a
                    target="_blank"
                    href={`https://www.instagram.com/${CurrentUser?.user.liensSM}`}
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25 12.5C25 18.8133 20.3199 24.0326 14.2405 24.8798C13.6718 24.959 13.0902 25 12.5 25C11.8184 25 11.1497 24.9453 10.4975 24.8402C4.54624 23.8822 0 18.7212 0 12.4993C0 5.59642 5.59642 0 12.5 0C19.4036 0 25 5.59642 25 12.5Z"
                        fill="url(#paint0_linear_250_40236)"
                      />
                      <path
                        d="M16.4145 4.99609H8.58526C6.42227 4.99609 4.66309 6.75528 4.66309 8.91827V16.081C4.66309 18.244 6.42227 20.0031 8.58526 20.0031H16.4145C18.5775 20.0031 20.3367 18.244 20.3367 16.081V8.91827C20.3367 6.75528 18.5775 4.99609 16.4145 4.99609ZM6.04654 8.91827C6.04654 7.51826 7.18526 6.37954 8.58526 6.37954H16.4145C17.8145 6.37954 18.9532 7.51826 18.9532 8.91827V16.081C18.9532 17.481 17.8145 18.6197 16.4145 18.6197H8.58526C7.18526 18.6197 6.04654 17.481 6.04654 16.081V8.91827Z"
                        fill="white"
                      />
                      <path
                        d="M12.4983 16.1489C14.5101 16.1489 16.1469 14.512 16.1469 12.5002C16.1469 10.4884 14.5101 8.85156 12.4983 8.85156C10.4864 8.85156 8.84961 10.4884 8.84961 12.5002C8.84961 14.512 10.4864 16.1489 12.4983 16.1489ZM12.4983 10.2357C13.7471 10.2357 14.7627 11.2514 14.7627 12.5002C14.7627 13.7491 13.7471 14.7647 12.4983 14.7647C11.2494 14.7647 10.2338 13.7491 10.2338 12.5002C10.2338 11.2514 11.2494 10.2357 12.4983 10.2357Z"
                        fill="white"
                      />
                      <path
                        d="M16.4862 9.43914C17.0282 9.43914 17.4694 8.99791 17.4694 8.4559C17.4694 7.91389 17.0282 7.47266 16.4862 7.47266C15.9442 7.47266 15.5029 7.91389 15.5029 8.4559C15.5029 8.99791 15.9442 9.43914 16.4862 9.43914Z"
                        fill="white"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_250_40236"
                          x1="12.5"
                          y1="0"
                          x2="12.5"
                          y2="25"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#E001CE" />
                          <stop offset="0.185" stop-color="#CD01BD" />
                          <stop offset="0.455" stop-color="#F61079" />
                          <stop offset="0.78" stop-color="#FF4935" />
                          <stop offset="1" stop-color="#E39816" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </a>
                )}

                {CurrentUser?.user.tiktok ? (
                  <a
                    target="_blank"
                    href={`https://www.tiktok.com/${CurrentUser?.user.tiktok}`}
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24.9993 12.5004C24.9993 18.8135 20.3193 24.0326 14.2401 24.8798C13.6714 24.959 13.0899 25 12.4996 25C11.818 25 11.1493 24.9453 10.4972 24.8402C4.54611 23.8822 0 18.7214 0 12.4996C0 5.59626 5.59626 0 12.4996 0C19.403 0 24.9993 5.59626 24.9993 12.4996V12.5004Z"
                        fill="black"
                      />
                      <path
                        d="M18.6181 9.00229V11.3905C18.1999 11.3502 17.6587 11.2552 17.0576 11.0349C16.2738 10.7477 15.6901 10.3547 15.3086 10.0503V14.8785L15.2992 14.8634C15.3057 14.9592 15.3086 15.0563 15.3086 15.1549C15.3086 17.5532 13.358 19.5045 10.959 19.5045C8.55996 19.5045 6.60938 17.5525 6.60938 15.1549C6.60938 12.7574 8.55996 10.8046 10.959 10.8046C11.1936 10.8046 11.424 10.8233 11.6492 10.8593V13.2137C11.4326 13.136 11.2008 13.0942 10.959 13.0942C9.82317 13.0942 8.89826 14.0184 8.89826 15.1549C8.89826 16.2915 9.82317 17.2157 10.959 17.2157C12.0948 17.2157 13.0197 16.2907 13.0197 15.1549C13.0197 15.1125 13.019 15.07 13.0161 15.0275V5.64453H15.4036C15.4122 5.84679 15.4209 6.05049 15.4288 6.25274C15.4446 6.65078 15.5864 7.03298 15.8333 7.34608C16.1234 7.71389 16.5509 8.14144 17.1527 8.48261C17.7155 8.80147 18.2438 8.93823 18.6181 9.00301V9.00229Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                ) : (
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.9016 13.1918C25.9016 19.5049 21.2216 24.724 15.1424 25.5712C14.5738 25.6504 13.9922 25.6914 13.402 25.6914C12.7204 25.6914 12.0517 25.6367 11.3996 25.5316C5.44845 24.5736 0.902344 19.4128 0.902344 13.191C0.902344 6.28767 6.49861 0.691406 13.402 0.691406C20.3054 0.691406 25.9016 6.28767 25.9016 13.191V13.1918Z"
                      fill="#BBC0CE"
                    />
                    <path
                      d="M19.5205 9.6937V12.0819C19.1023 12.0416 18.561 11.9466 17.96 11.7263C17.1762 11.4392 16.5924 11.0462 16.2109 10.7417V15.57L16.2016 15.5548C16.2081 15.6506 16.2109 15.7477 16.2109 15.8463C16.2109 18.2446 14.2603 20.196 11.8613 20.196C9.46231 20.196 7.51172 18.2439 7.51172 15.8463C7.51172 13.4488 9.46231 11.496 11.8613 11.496C12.096 11.496 12.3263 11.5147 12.5516 11.5507V13.9051C12.3349 13.8274 12.1032 13.7856 11.8613 13.7856C10.7255 13.7856 9.8006 14.7098 9.8006 15.8463C9.8006 16.9829 10.7255 17.9071 11.8613 17.9071C12.9971 17.9071 13.922 16.9822 13.922 15.8463C13.922 15.8039 13.9213 15.7614 13.9185 15.7189V6.33594H16.3059C16.3146 6.53819 16.3232 6.74189 16.3311 6.94415C16.347 7.34219 16.4888 7.72439 16.7356 8.03749C17.0257 8.40529 17.4533 8.83284 18.055 9.17402C18.6179 9.49288 19.1462 9.62964 19.5205 9.69442V9.6937Z"
                      fill="white"
                    />
                  </svg>
                )}
                {CurrentUser?.user.linkedin ? (
                  <a
                    target="_blank"
                    href={`https://www.linkedin.com/in/${CurrentUser?.user.linkedin}`}
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24.9983 12.5004C24.9983 18.8135 20.3183 24.0326 14.2391 24.8798C13.6705 24.959 13.0889 25 12.4987 25C11.817 25 11.1484 24.9453 10.4962 24.8402C4.54513 23.8822 -0.000976562 18.7214 -0.000976562 12.4996C-0.000976562 5.59626 5.59528 0 12.4987 0C19.402 0 24.9983 5.59626 24.9983 12.4996V12.5004Z"
                        fill="#0A66C2"
                      />
                      <path
                        d="M6.07961 8.27762C5.74635 7.96811 5.58008 7.58519 5.58008 7.12958C5.58008 6.67396 5.74635 6.27376 6.07961 5.96426C6.41286 5.65475 6.84184 5.5 7.368 5.5C7.89416 5.5 8.30587 5.65475 8.63841 5.96426C8.97166 6.27376 9.13794 6.66244 9.13794 7.12958C9.13794 7.59671 8.97166 7.96811 8.63841 8.27762C8.30515 8.58712 7.88192 8.74188 7.368 8.74188C6.85408 8.74188 6.41286 8.58712 6.07961 8.27762ZM8.85722 10.0526V19.5371H5.86079V10.0526H8.85722Z"
                        fill="#FEFFFC"
                      />
                      <path
                        d="M18.8344 10.9921C19.4872 11.7011 19.814 12.6749 19.814 13.9144V19.3732H16.9673V14.2994C16.9673 13.6747 16.8053 13.1888 16.4814 12.8426C16.1575 12.4964 15.7221 12.3237 15.175 12.3237C14.628 12.3237 14.1926 12.4971 13.8687 12.8426C13.5448 13.1888 13.3828 13.6747 13.3828 14.2994V19.3732H10.5195V10.0297H13.3828V11.2692C13.6729 10.856 14.0637 10.53 14.5553 10.2896C15.0462 10.0499 15.599 9.92969 16.213 9.92969C17.307 9.92969 18.1808 10.2845 18.8337 10.9928L18.8344 10.9921Z"
                        fill="#FEFFFC"
                      />
                    </svg>
                  </a>
                ) : (
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.9983 12.5004C24.9983 18.8135 20.3183 24.0326 14.2391 24.8798C13.6705 24.959 13.0889 25 12.4987 25C11.817 25 11.1484 24.9453 10.4962 24.8402C4.54513 23.8822 -0.000976562 18.7214 -0.000976562 12.4996C-0.000976562 5.59626 5.59528 0 12.4987 0C19.402 0 24.9983 5.59626 24.9983 12.4996V12.5004Z"
                      fill="#BBC0CE"
                    />
                    <path
                      d="M6.07961 8.27762C5.74635 7.96811 5.58008 7.58519 5.58008 7.12958C5.58008 6.67396 5.74635 6.27376 6.07961 5.96426C6.41286 5.65475 6.84184 5.5 7.368 5.5C7.89416 5.5 8.30587 5.65475 8.63841 5.96426C8.97166 6.27376 9.13794 6.66244 9.13794 7.12958C9.13794 7.59671 8.97166 7.96811 8.63841 8.27762C8.30515 8.58712 7.88192 8.74188 7.368 8.74188C6.85408 8.74188 6.41286 8.58712 6.07961 8.27762ZM8.85722 10.0526V19.5371H5.86079V10.0526H8.85722Z"
                      fill="#FEFFFC"
                    />
                    <path
                      d="M18.8344 10.9921C19.4872 11.7011 19.814 12.6749 19.814 13.9144V19.3732H16.9673V14.2994C16.9673 13.6747 16.8053 13.1888 16.4814 12.8426C16.1575 12.4964 15.7221 12.3237 15.175 12.3237C14.628 12.3237 14.1926 12.4971 13.8687 12.8426C13.5448 13.1888 13.3828 13.6747 13.3828 14.2994V19.3732H10.5195V10.0297H13.3828V11.2692C13.6729 10.856 14.0637 10.53 14.5553 10.2896C15.0462 10.0499 15.599 9.92969 16.213 9.92969C17.307 9.92969 18.1808 10.2845 18.8337 10.9928L18.8344 10.9921Z"
                      fill="#FEFFFC"
                    />
                  </svg>
                )}
                {CurrentUser?.user.fb ? (
                  <a
                    target="_blank"
                    href={`https://www.facebook.com/${CurrentUser?.user.fb}`}
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24.9997 12.5C24.9997 18.8133 20.3196 24.0326 14.2402 24.8798C13.6716 24.959 13.09 25 12.4997 25C11.8181 25 11.1494 24.9453 10.4973 24.8402C4.54454 23.8822 -0.000976562 18.7219 -0.000976562 12.5C-0.000976562 5.59642 5.59545 0 12.499 0C19.4026 0 24.999 5.59642 24.999 12.5H24.9997Z"
                        fill="#2E71EB"
                      />
                      <path
                        d="M14.2392 10.0355V12.7585H17.6079L17.0745 16.4273H14.2392V24.8791C13.6706 24.9583 13.089 24.9994 12.4988 24.9994C11.8171 24.9994 11.1484 24.9446 10.4963 24.8396V16.4273H7.38965V12.7585H10.4963V9.42726C10.4963 7.36 12.172 5.68359 14.24 5.68359V5.68575C14.2457 5.68575 14.2515 5.68359 14.2572 5.68359H17.6086V8.85574H15.419C14.7676 8.85574 14.24 9.38335 14.24 10.0348L14.2392 10.0355Z"
                        fill="white"
                      />
                    </svg>
                  </a>
                ) : (
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.9997 12.5C24.9997 18.8133 20.3196 24.0326 14.2402 24.8798C13.6716 24.959 13.09 25 12.4997 25C11.8181 25 11.1494 24.9453 10.4973 24.8402C4.54454 23.8822 -0.000976562 18.7219 -0.000976562 12.5C-0.000976562 5.59642 5.59545 0 12.499 0C19.4026 0 24.999 5.59642 24.999 12.5H24.9997Z"
                      fill="#BBC0CE"
                    />
                    <path
                      d="M14.2392 10.0355V12.7585H17.6079L17.0745 16.4273H14.2392V24.8791C13.6706 24.9583 13.089 24.9994 12.4988 24.9994C11.8171 24.9994 11.1484 24.9446 10.4963 24.8396V16.4273H7.38965V12.7585H10.4963V9.42726C10.4963 7.36 12.172 5.68359 14.24 5.68359V5.68575C14.2457 5.68575 14.2515 5.68359 14.2572 5.68359H17.6086V8.85574H15.419C14.7676 8.85574 14.24 9.38335 14.24 10.0348L14.2392 10.0355Z"
                      fill="white"
                    />
                  </svg>
                )}
                {CurrentUser?.user.x ? (
                  <a
                    target="_blank"
                    href={`https://www.facebook.com/${CurrentUser?.user.x}`}
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_250_40254)">
                        <circle cx="12.499" cy="12.5" r="12.5" fill="white" />
                        <path
                          d="M7.14648 6.41406L16.3923 18.5026H17.809L8.66836 6.41406H7.14648Z"
                          fill="#1D1E21"
                        />
                        <path
                          d="M12.499 0C5.5959 0 -0.000976562 5.59687 -0.000976562 12.5C-0.000976562 19.4031 5.5959 25 12.499 25C19.4021 25 24.999 19.4031 24.999 12.5C24.999 5.59687 19.4021 0 12.499 0ZM15.6896 20.0333L11.6584 14.7677L7.05215 20.0333H4.49173L10.4636 13.2062L4.16569 4.96667H9.43861L13.0782 9.78021L17.2896 4.96667H19.8469L14.2626 11.3479L20.8324 20.0323L15.6896 20.0333Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_250_40254">
                          <rect
                            width="25"
                            height="25"
                            fill="white"
                            transform="translate(-0.000976562)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                ) : (
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_251_40304)">
                      <circle cx="12.499" cy="12.5" r="12.5" fill="white" />
                      <path
                        d="M7.14648 6.41406L16.3923 18.5026H17.809L8.66836 6.41406H7.14648Z"
                        fill="#BBC0CE"
                      />
                      <path
                        d="M12.499 0C5.5959 0 -0.000976562 5.59687 -0.000976562 12.5C-0.000976562 19.4031 5.5959 25 12.499 25C19.4021 25 24.999 19.4031 24.999 12.5C24.999 5.59687 19.4021 0 12.499 0ZM15.6896 20.0333L11.6584 14.7677L7.05215 20.0333H4.49173L10.4636 13.2062L4.16569 4.96667H9.43861L13.0782 9.78021L17.2896 4.96667H19.8469L14.2626 11.3479L20.8324 20.0323L15.6896 20.0333Z"
                        fill="#BBC0CE"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_251_40304">
                        <rect
                          width="25"
                          height="25"
                          fill="white"
                          transform="translate(-0.000976562)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                )}
              </div>
            </div>
          )}
          {CurrentUser?.user.profil === "agent" && (
            <div className="flex mt-8 gap-y-8 flex-col items-center px-4 py-6 bg-white rounded-[10px] jusitfy-center">
              <div className="flex justify-center ">
                <div className="max-w-[1110px] flex gap-3 justify-center items-center max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col  max-md:ml-0 ">
                    <img
                      loading="lazy"
                      srcSet={
                        CurrentUser?.user.image
                          ? CurrentUser?.user.image
                          : Placeholder
                      }
                      className="max-w-full rounded-full aspect-square w-[227px] max-md:mt-4"
                    />
                  </div>
                  <div className="lg:min-w-[865px] flex flex-col items-center justify-between gap-y-4">
                    <div className="flex flex-col w-full ">
                      <div className="flex gap-2 md:justify-between justify-center w-full max-md:flex-wrap max-md:max-w-full">
                        <div className="flex flex-col justify-between max-sm:text-center">
                          <div className="text-xl font-bold text-zinc-900">
                            {CurrentUser?.user.nom} {CurrentUser?.user.prenom}
                          </div>
                          <div className="text-base font-medium text-blue-600">
                            {CurrentUser?.user?.profil == "other"
                              ? CurrentUser?.other?.profession
                              : ""}
                            {CurrentUser?.user?.profil == "player"
                              ? " Joueur"
                              : ""}
                            {CurrentUser?.user?.profil == "agent" &&
                            CurrentUser?.agent?.typeresponsable == "players"
                              ? "Manager de Joueur"
                              : ""}
                            {CurrentUser?.user?.profil == "agent" &&
                            CurrentUser?.agent?.typeresponsable == "club"
                              ? "Manager de CLub"
                              : ""}
                            {CurrentUser?.user?.profil == "scout"
                              ? "Scout"
                              : ""}
                          </div>
                        </div>
                        {isOwner ? (
                          <div className="max-sm:w-full flex gap-2 max-sm:justify-center justify-between px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px]">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7d9a4939e54a7ca6f05fbd6e6afe23371f01555ddc659faf9ced6ddeab6710b?"
                              className="shrink-0 my-auto aspect-square w-[15px]"
                            />
                            <Link
                              to={"/setting/personal"}
                              className="flex items-center"
                            >
                              <p>
                                {getTranslation(
                                  `Edit`, // -----> Englais
                                  `Modifier` //  -----> Francais
                                  //   ``,  //  -----> Turkey
                                  //   `` ,  //  -----> Allemagne
                                )}
                              </p>
                            </Link>
                          </div>
                        ) : null}
                      </div>

                      {/* khnafis2 */}
                      <div className="flex mt-2 gap-x-4 gap-y-2 justify-center md:justify-between items-start mt-1 text-xs font-light text-center text-zinc-900 flex-wrap">
                        <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                          <span
                            className={`flag-icon flag-icon-${getCountryFlagFromCountryName(
                              CurrentUser.user.countryresidence
                            )}`}
                            style={{ marginRight: "8px", width: "25px" }}
                          ></span>
                          <div className="grow self-start mt-1">
                            {CurrentUser.user?.countryresidence}
                          </div>
                        </div>
                        {CurrentUser.user.langueparlee && (
                          <div className="flex gap-2   justify-center p-2 whitespace-nowrap">
                            <svg
                              className="size-6"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M11 5C11.1463 5.00005 11.2893 5.04286 11.4115 5.12317C11.5338 5.20348 11.6299 5.31778 11.688 5.452L14.938 12.952C14.98 13.0428 15.0035 13.1411 15.007 13.2411C15.0105 13.3411 14.9939 13.4408 14.9583 13.5343C14.9226 13.6278 14.8686 13.7133 14.7995 13.7856C14.7303 13.8579 14.6474 13.9157 14.5555 13.9554C14.4637 13.9952 14.3649 14.0162 14.2648 14.0172C14.1647 14.0182 14.0655 13.9991 13.9729 13.9611C13.8803 13.9232 13.7962 13.8671 13.7257 13.7961C13.6551 13.7252 13.5995 13.6408 13.562 13.548L12.89 12H9.10899L8.43899 13.548C8.35996 13.7306 8.21162 13.8743 8.02662 13.9476C7.84161 14.0208 7.63509 14.0175 7.45249 13.9385C7.26989 13.8595 7.12616 13.7111 7.05293 13.5261C6.9797 13.3411 6.98296 13.1346 7.06199 12.952L10.312 5.452C10.3701 5.31778 10.4662 5.20348 10.5884 5.12317C10.7107 5.04286 10.8537 5.00005 11 5ZM9.75999 10.5H12.24L11 7.636L9.75999 10.5ZM4.99999 1C5.1989 1 5.38967 1.07902 5.53032 1.21967C5.67097 1.36032 5.74999 1.55109 5.74999 1.75V3.011C6.61904 3.03659 7.4862 3.10702 8.34799 3.222C8.54518 3.24852 8.72376 3.35229 8.84444 3.51048C8.96512 3.66866 9.01801 3.86831 8.99149 4.0655C8.96497 4.26269 8.8612 4.44127 8.70301 4.56195C8.54483 4.68262 8.34518 4.73552 8.14799 4.709C7.92799 4.679 7.70799 4.653 7.48599 4.629C7.13418 5.84232 6.60659 6.99758 5.91999 8.058C6.15699 8.362 6.40799 8.653 6.67199 8.931C6.80924 9.07501 6.88366 9.26765 6.87888 9.46653C6.8741 9.66541 6.7905 9.85425 6.64649 9.9915C6.50248 10.1288 6.30984 10.2032 6.11096 10.1984C5.91208 10.1936 5.72324 10.11 5.58599 9.966C5.3833 9.75299 5.18786 9.53319 4.99999 9.307C4.18263 10.2901 3.22543 11.1479 2.15899 11.853C1.9931 11.9575 1.79287 11.993 1.60119 11.9517C1.40951 11.9104 1.24162 11.7956 1.13349 11.6321C1.02535 11.4685 0.985581 11.2691 1.02268 11.0766C1.05979 10.884 1.17082 10.7137 1.33199 10.602C2.38018 9.9086 3.30835 9.049 4.07999 8.057C3.88229 7.75222 3.69746 7.43928 3.52599 7.119C3.43224 6.94356 3.41202 6.73806 3.46978 6.54771C3.52754 6.35736 3.65855 6.19775 3.83399 6.104C4.00943 6.01025 4.21493 5.99003 4.40528 6.04779C4.59563 6.10555 4.75524 6.23656 4.84899 6.412C4.89799 6.502 4.94799 6.593 4.99899 6.683C5.38699 6.003 5.70699 5.278 5.95099 4.519C4.58141 4.46485 3.2097 4.52842 1.85099 4.709C1.6538 4.73552 1.45415 4.68262 1.29597 4.56195C1.13778 4.44127 1.03401 4.26269 1.00749 4.0655C0.98097 3.86831 1.03387 3.66866 1.15455 3.51048C1.27523 3.35229 1.4538 3.24852 1.65099 3.222C2.50399 3.108 3.37099 3.037 4.24899 3.011V1.75C4.24899 1.65143 4.26842 1.55382 4.30618 1.46276C4.34393 1.3717 4.39926 1.28897 4.46901 1.21932C4.53876 1.14966 4.62156 1.09444 4.71267 1.0568C4.80378 1.01917 4.90142 0.999869 4.99999 1Z"
                                fill="black"
                              />
                            </svg>
                            <div className=" self-start mt-1">
                              {CurrentUser.user.langueparlee}
                            </div>
                          </div>
                        )}
                        <div className="flex gap-2 justify-center items-center self-stretch py-2">
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.0481 1.33333C20.0481 1.11232 19.9603 0.900358 19.804 0.744078C19.6478 0.587797 19.4358 0.5 19.2148 0.5H15.4073C15.2425 0.500035 15.0814 0.548928 14.9444 0.640499C14.8074 0.732069 14.7006 0.862205 14.6375 1.01445C14.5745 1.1667 14.558 1.33423 14.5901 1.49586C14.6223 1.65749 14.7016 1.80596 14.8181 1.9225L15.8423 2.94667L14.1439 4.645C13.2795 4.10723 12.2801 3.82617 11.2621 3.83458C10.244 3.84299 9.24937 4.14052 8.39395 4.6925C7.73089 4.26727 6.98302 3.9919 6.20254 3.88559C5.42205 3.77928 4.62777 3.84461 3.87515 4.07702C3.12252 4.30942 2.42969 4.70329 1.84503 5.23114C1.26037 5.75899 0.797963 6.40809 0.490099 7.13313C0.182235 7.85816 0.0363313 8.64165 0.0625756 9.42891C0.0888198 10.2162 0.286579 10.9882 0.642046 11.6911C0.997513 12.394 1.50212 13.0109 2.12064 13.4986C2.73916 13.9864 3.45668 14.3332 4.22311 14.515V15.5H3.38978C3.05826 15.5 2.74032 15.6317 2.5059 15.8661C2.27148 16.1005 2.13978 16.4185 2.13978 16.75C2.13978 17.0815 2.27148 17.3995 2.5059 17.6339C2.74032 17.8683 3.05826 18 3.38978 18H4.22311V19.25C4.22311 19.5815 4.35481 19.8995 4.58923 20.1339C4.82365 20.3683 5.14159 20.5 5.47311 20.5C5.80463 20.5 6.12258 20.3683 6.357 20.1339C6.59142 19.8995 6.72311 19.5815 6.72311 19.25V18H7.55645C7.88797 18 8.20591 17.8683 8.44033 17.6339C8.67475 17.3995 8.80645 17.0815 8.80645 16.75C8.80645 16.4185 8.67475 16.1005 8.44033 15.8661C8.20591 15.6317 7.88797 15.5 7.55645 15.5H6.72311V14.5075C7.31414 14.3697 7.87764 14.1331 8.38978 13.8075C9.42127 14.4701 10.6473 14.7624 11.8668 14.6366C13.0863 14.5108 14.2268 13.9742 15.1013 13.115C15.9757 12.2557 16.5322 11.1248 16.6794 9.90771C16.8266 8.69061 16.5558 7.45962 15.9114 6.41667L17.6098 4.71833L18.6339 5.7425C18.7508 5.85937 18.8998 5.93883 19.062 5.97079C19.2242 6.00274 19.3922 5.98575 19.5447 5.92197C19.6972 5.85818 19.8273 5.75049 19.9184 5.61258C20.0095 5.47468 20.0576 5.31279 20.0564 5.1475L20.0481 1.33333ZM2.55645 9.25C2.55448 8.76821 2.67238 8.2935 2.89952 7.86861C3.12666 7.44372 3.4559 7.08199 3.85762 6.816C4.25933 6.55001 4.72089 6.38811 5.20074 6.34487C5.68059 6.30164 6.16366 6.37843 6.60645 6.56833C6.13694 7.38408 5.88983 8.30879 5.88983 9.25C5.88983 10.1912 6.13694 11.1159 6.60645 11.9317C6.16366 12.1216 5.68059 12.1984 5.20074 12.1551C4.72089 12.1119 4.25933 11.95 3.85762 11.684C3.4559 11.418 3.12666 11.0563 2.89952 10.6314C2.67238 10.2065 2.55448 9.73179 2.55645 9.25ZM11.3064 12.1667C10.7296 12.1667 10.1657 11.9956 9.68603 11.6751C9.20639 11.3546 8.83255 10.8991 8.6118 10.3662C8.39104 9.83321 8.33328 9.24676 8.44582 8.68099C8.55836 8.11521 8.83615 7.59551 9.24405 7.18761C9.65196 6.7797 10.1717 6.50192 10.7374 6.38938C11.3032 6.27684 11.8897 6.3346 12.4226 6.55535C12.9556 6.77611 13.4111 7.14994 13.7316 7.62959C14.0521 8.10923 14.2231 8.67314 14.2231 9.25C14.2231 10.0235 13.9158 10.7654 13.3688 11.3124C12.8219 11.8594 12.08 12.1667 11.3064 12.1667Z"
                              fill="#1D1E21"
                            />
                          </svg>
                          <div className="self-stretch my-auto">
                            {CurrentUser.user.gender == "male"
                              ? "Homme"
                              : "Femme"}
                          </div>
                        </div>
                        <div className="flex gap-2 justify-center items-center self-stretch py-2">
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_87_12064)">
                              <path
                                d="M0.112793 16.332C0.114116 17.4367 0.553528 18.4957 1.33464 19.2768C2.11576 20.058 3.1748 20.4974 4.27946 20.4987H15.9461C17.0508 20.4974 18.1098 20.058 18.8909 19.2768C19.6721 18.4957 20.1115 17.4367 20.1128 16.332V8.83203H0.112793V16.332ZM14.2795 12.582C14.5267 12.582 14.7684 12.6553 14.9739 12.7927C15.1795 12.93 15.3397 13.1253 15.4343 13.3537C15.5289 13.5821 15.5537 13.8334 15.5054 14.0759C15.4572 14.3184 15.3382 14.5411 15.1633 14.7159C14.9885 14.8907 14.7658 15.0098 14.5233 15.058C14.2808 15.1062 14.0295 15.0815 13.8011 14.9869C13.5727 14.8923 13.3775 14.7321 13.2401 14.5265C13.1028 14.3209 13.0295 14.0793 13.0295 13.832C13.0295 13.5005 13.1612 13.1826 13.3956 12.9481C13.63 12.7137 13.9479 12.582 14.2795 12.582ZM10.1128 12.582C10.36 12.582 10.6017 12.6553 10.8073 12.7927C11.0128 12.93 11.173 13.1253 11.2676 13.3537C11.3623 13.5821 11.387 13.8334 11.3388 14.0759C11.2905 14.3184 11.1715 14.5411 10.9967 14.7159C10.8219 14.8907 10.5991 15.0098 10.3567 15.058C10.1142 15.1062 9.86285 15.0815 9.63444 14.9869C9.40603 14.8923 9.21081 14.7321 9.07346 14.5265C8.9361 14.3209 8.86279 14.0793 8.86279 13.832C8.86279 13.5005 8.99449 13.1826 9.22891 12.9481C9.46333 12.7137 9.78127 12.582 10.1128 12.582ZM5.94613 12.582C6.19335 12.582 6.43503 12.6553 6.64059 12.7927C6.84615 12.93 7.00637 13.1253 7.10098 13.3537C7.19559 13.5821 7.22034 13.8334 7.17211 14.0759C7.12388 14.3184 7.00483 14.5411 6.83001 14.7159C6.65519 14.8907 6.43247 15.0098 6.18999 15.058C5.94751 15.1062 5.69618 15.0815 5.46777 14.9869C5.23936 14.8923 5.04414 14.7321 4.90679 14.5265C4.76944 14.3209 4.69613 14.0793 4.69613 13.832C4.69613 13.5005 4.82782 13.1826 5.06224 12.9481C5.29666 12.7137 5.61461 12.582 5.94613 12.582Z"
                                fill="#1D1E21"
                              />
                              <path
                                d="M15.9461 2.16667H15.1128V1.33333C15.1128 1.11232 15.025 0.900358 14.8687 0.744078C14.7124 0.587797 14.5005 0.5 14.2795 0.5C14.0584 0.5 13.8465 0.587797 13.6902 0.744078C13.5339 0.900358 13.4461 1.11232 13.4461 1.33333V2.16667H6.77946V1.33333C6.77946 1.11232 6.69166 0.900358 6.53538 0.744078C6.3791 0.587797 6.16714 0.5 5.94613 0.5C5.72511 0.5 5.51315 0.587797 5.35687 0.744078C5.20059 0.900358 5.11279 1.11232 5.11279 1.33333V2.16667H4.27946C3.1748 2.16799 2.11576 2.6074 1.33464 3.38852C0.553528 4.16963 0.114116 5.22867 0.112793 6.33333L0.112793 7.16667H20.1128V6.33333C20.1115 5.22867 19.6721 4.16963 18.8909 3.38852C18.1098 2.6074 17.0508 2.16799 15.9461 2.16667Z"
                                fill="#1D1E21"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_87_12064">
                                <rect
                                  width="20"
                                  height="20"
                                  fill="white"
                                  transform="translate(0.112793 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <div className="self-stretch my-auto">
                            {CurrentUser.user.date_naissance}
                          </div>
                        </div>
                        <div className="flex gap-2 justify-center items-center self-stretch py-2">
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_87_12069)">
                              <path
                                d="M15.1689 5.5C15.1689 2.7425 12.9264 0.5 10.1689 0.5C7.41145 0.5 5.16895 2.7425 5.16895 5.5C5.16895 7.9725 6.97478 10.0258 9.33561 10.425V20.5H11.0023V10.425C13.3631 10.0267 15.1689 7.97333 15.1689 5.5Z"
                                fill="black"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_87_12069">
                                <rect
                                  width="20"
                                  height="20"
                                  fill="white"
                                  transform="translate(0.168945 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <div className="self-stretch my-auto">
                            {CurrentUser.user.countryresidence} ,
                            {CurrentUser?.user?.cityresidence}{" "}
                          </div>
                        </div>
                        {CurrentUser.agent?.typeresponsable == "club" && (
                          <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                            <>
                              <svg
                                width="17"
                                height="21"
                                viewBox="0 0 17 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16.3789 6.38645L11.7674 1.77495C10.9098 0.956593 9.76995 0.5 8.58457 0.5C7.39919 0.5 6.25935 0.956593 5.40179 1.77495L0.790291 6.38645C0.428596 6.74832 0.225465 7.23904 0.225586 7.75068C0.225707 8.26231 0.429068 8.75295 0.790934 9.11464C1.1528 9.47634 1.64353 9.67947 2.15516 9.67935C2.6668 9.67923 3.15743 9.47586 3.51912 9.114L6.65561 5.97751V18.571C6.65561 19.0826 6.85884 19.5733 7.22059 19.935C7.58234 20.2968 8.07298 20.5 8.58457 20.5C9.09616 20.5 9.5868 20.2968 9.94855 19.935C10.3103 19.5733 10.5135 19.0826 10.5135 18.571V5.97751L13.65 9.114C13.8291 9.29318 14.0417 9.43532 14.2758 9.53233C14.5098 9.62933 14.7606 9.67929 15.014 9.67935C15.2673 9.67941 15.5182 9.62957 15.7523 9.53268C15.9863 9.43578 16.199 9.29373 16.3782 9.11464C16.5574 8.93555 16.6995 8.72292 16.7965 8.48889C16.8935 8.25486 16.9435 8.00402 16.9436 7.75068C16.9436 7.49734 16.8938 7.24648 16.7969 7.0124C16.7 6.77833 16.5579 6.56563 16.3789 6.38645Z"
                                  fill="#1D1E21"
                                />
                              </svg>
                              <div className="grow self-start mt-1">
                                {CurrentUser.agent.clubCovered}
                              </div>
                            </>{" "}
                            :
                            <>
                              <svg
                                width="20"
                                height="21"
                                viewBox="0 0 20 21"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clip-path="url(#clip0_121_29087)">
                                  <path
                                    d="M0 4.66667L0 16.3333C0 18.6308 1.86917 20.5 4.16667 20.5H15.8333C18.1308 20.5 20 18.6308 20 16.3333V4.66667C20 2.36917 18.1308 0.5 15.8333 0.5H4.16667C1.86917 0.5 0 2.36917 0 4.66667ZM8.94417 11.525L7.36583 13H14.1667C14.6267 13 15 13.3725 15 13.8333C15 14.2942 14.6267 14.6667 14.1667 14.6667H7.3275L8.9225 16.2617C9.24833 16.5875 9.24833 17.1142 8.9225 17.44C8.59667 17.7658 8.07 17.7658 7.74417 17.44L5.61 15.3058C4.7975 14.4933 4.7975 13.1717 5.61 12.36L7.80667 10.3075C8.1425 9.99333 8.67 10.0117 8.985 10.3475C9.135 10.5075 9.20917 10.7125 9.20917 10.9167C9.20917 11.14 9.12083 11.3617 8.945 11.525H8.94417ZM12.2558 3.55917L14.39 5.69333C14.7958 6.09917 14.9992 6.6325 14.9992 7.16667C14.9992 7.70083 14.7958 8.23333 14.39 8.64L12.2558 10.7742C11.93 11.1 11.4033 11.1 11.0775 10.7742C10.7517 10.4483 10.7517 9.92167 11.0775 9.59583L12.6725 8.00083H5.83333C5.37333 8.00083 5 7.62833 5 7.1675C5 6.70667 5.37333 6.33417 5.83333 6.33417H12.6725L11.0775 4.73917C10.7517 4.41333 10.7517 3.88667 11.0775 3.56083C11.4033 3.235 11.93 3.235 12.2558 3.56083V3.55917Z"
                                    fill="#1D1E21"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_121_29087">
                                    <rect
                                      width="20"
                                      height="20"
                                      fill="white"
                                      transform="matrix(0 -1 1 0 0 20.5)"
                                    />
                                  </clipPath>
                                </defs>
                              </svg>

                              <div className="grow self-start mt-1">
                                {CurrentUser.agent.totalCareerTransfers}{" "}
                                {getTranslation(
                                  ` Total Transfers`, // -----> Englais
                                  `Total Transferts` //  -----> Francais
                                  //   ``,  //  -----> Turkey
                                  //   `` ,  //  -----> Allemagne
                                )}
                              </div>
                            </>
                          </div>
                        )}
                        {CurrentUser.agent?.typeresponsable == "player" && (
                          <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                            {" "}
                            <>
                              <div className="flex gap-2 justify-center items-center self-stretch py-2">
                                <svg
                                  width="20"
                                  height="21"
                                  viewBox="0 0 20 21"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clip-path="url(#clip0_121_29079)">
                                    <mask
                                      id="mask0_121_29079"
                                      maskUnits="userSpaceOnUse"
                                      x="0"
                                      y="0"
                                      width="20"
                                      height="21"
                                    >
                                      <path
                                        d="M20 0.5H0V20.5H20V0.5Z"
                                        fill="white"
                                      />
                                    </mask>
                                    <g mask="url(#mask0_121_29079)">
                                      <path
                                        d="M10.9875 13.8333H9.0125C8.5725 13.834 8.14363 13.695 7.78766 13.4364C7.43169 13.1778 7.16699 12.8128 7.03167 12.3942L6.42167 10.5167C6.28382 10.0978 6.28284 9.64589 6.41887 9.2264C6.55491 8.80692 6.82089 8.44161 7.17834 8.18333L8.775 7.02667C9.13041 6.76715 9.5591 6.62729 9.99917 6.62729C10.4392 6.62729 10.8679 6.76715 11.2233 7.02667L12.8208 8.18667C13.1784 8.44485 13.4444 8.81016 13.5805 9.22968C13.7165 9.64919 13.7155 10.1011 13.5775 10.52L12.9683 12.3975C12.8318 12.8151 12.5666 13.1789 12.2109 13.4368C11.8551 13.6947 11.4269 13.8335 10.9875 13.8333ZM20 10.5C20 12.4778 19.4135 14.4112 18.3147 16.0557C17.2159 17.7002 15.6541 18.9819 13.8268 19.7388C11.9996 20.4957 9.98891 20.6937 8.0491 20.3079C6.10929 19.922 4.32746 18.9696 2.92894 17.5711C1.53041 16.1725 0.578004 14.3907 0.192152 12.4509C-0.193701 10.5111 0.00433302 8.50043 0.761209 6.67317C1.51809 4.8459 2.79981 3.28412 4.4443 2.1853C6.08879 1.08649 8.02219 0.5 10 0.5C12.6513 0.502868 15.1932 1.55736 17.0679 3.4321C18.9426 5.30684 19.9971 7.84872 20 10.5ZM10 18C10.4315 17.9975 10.862 17.9579 11.2867 17.8817L11.9933 15.5642C12.1537 15.0606 12.4699 14.6211 12.8964 14.3089C13.3228 13.9968 13.8374 13.8282 14.3658 13.8275L16.7133 13.8233C17.0913 13.065 17.3367 12.2477 17.4392 11.4067L15.5658 10.1567C15.1335 9.85323 14.8087 9.42034 14.6383 8.92041C14.4678 8.42047 14.4606 7.87933 14.6175 7.375L15.3283 5.23083C14.7324 4.63169 14.04 4.13702 13.28 3.7675L11.47 5.0225C11.0431 5.33392 10.5284 5.50173 10 5.50173C9.47161 5.50173 8.95687 5.33392 8.53 5.0225L6.76834 3.7425C6.01995 4.10002 5.33574 4.57868 4.74334 5.15917L5.3825 7.37333C5.53944 7.87767 5.53217 8.41881 5.36173 8.91874C5.19129 9.41867 4.8665 9.85156 4.43417 10.155L2.5725 11.4842C2.67956 12.298 2.92089 13.0885 3.28667 13.8233L5.63334 13.8275C6.16184 13.828 6.67653 13.9963 7.10311 14.3083C7.5297 14.6203 7.84611 15.0598 8.00667 15.5633L8.7275 17.8833C9.14754 17.9586 9.57328 17.9977 10 18Z"
                                        fill="#1D1E21"
                                      />
                                    </g>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_121_29079">
                                      <rect
                                        width="20"
                                        height="20"
                                        fill="white"
                                        transform="translate(0 0.5)"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <div className="grow self-start mt-1">
                                  {CurrentUser.agent.totalPlayer}
                                  {getTranslation(
                                    `Players`, // -----> Englais
                                    `Joueurs` //  -----> Francais
                                    //   ``,  //  -----> Turkey
                                    //   `` ,  //  -----> Allemagne
                                  )}
                                </div>
                              </div>
                            </>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex text-base font-light max-sm:text-center text-neutral-900">
                      {CurrentUser?.user.discreptionBio}
                    </div>
                  </div>
                </div>
              </div>
              <span className="h-1 w-full bg-gray-100"></span>
              <div className="max-w-[1110px] w-full flex-wrap">
                <div className="flex  flex-1 flex-col gap-y-4">
                  <div className=" items-center  flex gap-4 px-4  text-lg whitespace-nowrap text-zinc-900">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9f295deb485341c8ef8867b332b44fca28ea634a4d9e5dd0f127dd63ac23138?"
                      className="shrink-0 w-5 aspect-square"
                    />
                    <div className="grow">
                      {" "}
                      {getTranslation(
                        `Skills`, // -----> Englais
                        ` Compétences` //  -----> Francais
                        //   ``,  //  -----> Turkey
                        //   `` ,  //  -----> Allemagne
                      )}{" "}
                    </div>
                  </div>
                  <div className="flex-1 max-sm:justify-center  w-full  flex gap-2  text-base font-semibold text-blue-600 whitespace-nowrap flex-wrap">
                    {CurrentUser?.agent?.skillsagent
                      .split(",")
                      .filter((item) => item !== "")
                      .map((item) => {
                        return (
                          <div
                            style={{
                              fontSize: 16,
                            }}
                            className=" text-center px-2  justify-center px:1 md:px-4 py-2 border-2 border-blue-600 border-solid rounded-[30px]"
                          >
                            {item}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <span className="h-1 w-full bg-gray-100"></span>
              <Social userInfo={CurrentUser} />
            </div>
          )}
          {CurrentUser?.user.profil === "other" && (
            <div className="flex mt-8 gap-y-8 flex-col items-center px-1 md:px-4 py-6 bg-white rounded-[10px] jusitfy-center ">
              <div className="max-w-[1110px] flex gap-3 justify-center items-center max-md:flex-col max-md:gap-0">
                <div className="flex flex-col  max-md:ml-0 ">
                  <img
                    loading="lazy"
                    srcSet={
                      CurrentUser?.user.image
                        ? CurrentUser?.user.image
                        : Placeholder
                    }
                    className="max-w-full rounded-full aspect-square w-[227px] max-md:mt-4 object-cover"
                  />
                </div>
                <div className="lg:min-w-[865px] flex flex-col items-center justify-between gap-y-4">
                  <div className="flex flex-col w-full ">
                    <div className="flex gap-2 md:justify-between justify-center w-full max-md:flex-wrap max-md:max-w-full">
                      <div className="flex flex-col justify-between max-sm:text-center">
                        <div className="text-xl font-bold text-zinc-900">
                          {CurrentUser?.user.nom} {CurrentUser?.user.prenom}
                        </div>
                        <div className="text-base font-medium text-blue-600">
                          {CurrentUser?.user?.profil == "other"
                            ? CurrentUser?.other?.profession
                            : ""}
                          {CurrentUser?.user?.profil == "player"
                            ? " Joueur"
                            : ""}
                          {CurrentUser?.user?.profil == "agent" &&
                          CurrentUser?.agent?.typeresponsable == "players"
                            ? "Manager de Joueur"
                            : ""}
                          {CurrentUser?.user?.profil == "agent" &&
                          CurrentUser?.agent?.typeresponsable == "club"
                            ? "Manager de CLub"
                            : ""}
                          {CurrentUser?.user?.profil == "scout" ? "Scout" : ""}
                        </div>
                      </div>
                      {isOwner ? (
                        <div className="max-sm:w-full flex gap-2 max-sm:justify-center justify-between px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px]">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7d9a4939e54a7ca6f05fbd6e6afe23371f01555ddc659faf9ced6ddeab6710b?"
                            className="shrink-0 my-auto aspect-square w-[15px]"
                          />
                          <Link
                            to={"/setting/personal"}
                            className="flex items-center"
                          >
                            <p>
                              {getTranslation(
                                `Edit`, // -----> Englais
                                `Modifier` //  -----> Francais
                                //   ``,  //  -----> Turkey
                                //   `` ,  //  -----> Allemagne
                              )}
                            </p>
                          </Link>
                        </div>
                      ) : null}
                    </div>

                    {/* khnafis2 */}
                    <div className="flex mt-2 gap-x-4 gap-y-2 justify-center md:justify-between items-start mt-1 text-xs font-light text-center text-zinc-900 flex-wrap">
                      <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                        <span
                          className={`flag-icon flag-icon-${getCountryFlagFromCountryName(
                            CurrentUser.user.countryresidence
                          )}`}
                          style={{ marginRight: "8px", width: "25px" }}
                        ></span>
                        <div className="grow self-start mt-1">
                          {CurrentUser.user?.countryresidence}
                        </div>
                      </div>
                      {CurrentUser.user.langueparlee && (
                        <div className="flex gap-2   justify-center p-2 whitespace-nowrap">
                          <svg
                            className="size-6"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M11 5C11.1463 5.00005 11.2893 5.04286 11.4115 5.12317C11.5338 5.20348 11.6299 5.31778 11.688 5.452L14.938 12.952C14.98 13.0428 15.0035 13.1411 15.007 13.2411C15.0105 13.3411 14.9939 13.4408 14.9583 13.5343C14.9226 13.6278 14.8686 13.7133 14.7995 13.7856C14.7303 13.8579 14.6474 13.9157 14.5555 13.9554C14.4637 13.9952 14.3649 14.0162 14.2648 14.0172C14.1647 14.0182 14.0655 13.9991 13.9729 13.9611C13.8803 13.9232 13.7962 13.8671 13.7257 13.7961C13.6551 13.7252 13.5995 13.6408 13.562 13.548L12.89 12H9.10899L8.43899 13.548C8.35996 13.7306 8.21162 13.8743 8.02662 13.9476C7.84161 14.0208 7.63509 14.0175 7.45249 13.9385C7.26989 13.8595 7.12616 13.7111 7.05293 13.5261C6.9797 13.3411 6.98296 13.1346 7.06199 12.952L10.312 5.452C10.3701 5.31778 10.4662 5.20348 10.5884 5.12317C10.7107 5.04286 10.8537 5.00005 11 5ZM9.75999 10.5H12.24L11 7.636L9.75999 10.5ZM4.99999 1C5.1989 1 5.38967 1.07902 5.53032 1.21967C5.67097 1.36032 5.74999 1.55109 5.74999 1.75V3.011C6.61904 3.03659 7.4862 3.10702 8.34799 3.222C8.54518 3.24852 8.72376 3.35229 8.84444 3.51048C8.96512 3.66866 9.01801 3.86831 8.99149 4.0655C8.96497 4.26269 8.8612 4.44127 8.70301 4.56195C8.54483 4.68262 8.34518 4.73552 8.14799 4.709C7.92799 4.679 7.70799 4.653 7.48599 4.629C7.13418 5.84232 6.60659 6.99758 5.91999 8.058C6.15699 8.362 6.40799 8.653 6.67199 8.931C6.80924 9.07501 6.88366 9.26765 6.87888 9.46653C6.8741 9.66541 6.7905 9.85425 6.64649 9.9915C6.50248 10.1288 6.30984 10.2032 6.11096 10.1984C5.91208 10.1936 5.72324 10.11 5.58599 9.966C5.3833 9.75299 5.18786 9.53319 4.99999 9.307C4.18263 10.2901 3.22543 11.1479 2.15899 11.853C1.9931 11.9575 1.79287 11.993 1.60119 11.9517C1.40951 11.9104 1.24162 11.7956 1.13349 11.6321C1.02535 11.4685 0.985581 11.2691 1.02268 11.0766C1.05979 10.884 1.17082 10.7137 1.33199 10.602C2.38018 9.9086 3.30835 9.049 4.07999 8.057C3.88229 7.75222 3.69746 7.43928 3.52599 7.119C3.43224 6.94356 3.41202 6.73806 3.46978 6.54771C3.52754 6.35736 3.65855 6.19775 3.83399 6.104C4.00943 6.01025 4.21493 5.99003 4.40528 6.04779C4.59563 6.10555 4.75524 6.23656 4.84899 6.412C4.89799 6.502 4.94799 6.593 4.99899 6.683C5.38699 6.003 5.70699 5.278 5.95099 4.519C4.58141 4.46485 3.2097 4.52842 1.85099 4.709C1.6538 4.73552 1.45415 4.68262 1.29597 4.56195C1.13778 4.44127 1.03401 4.26269 1.00749 4.0655C0.98097 3.86831 1.03387 3.66866 1.15455 3.51048C1.27523 3.35229 1.4538 3.24852 1.65099 3.222C2.50399 3.108 3.37099 3.037 4.24899 3.011V1.75C4.24899 1.65143 4.26842 1.55382 4.30618 1.46276C4.34393 1.3717 4.39926 1.28897 4.46901 1.21932C4.53876 1.14966 4.62156 1.09444 4.71267 1.0568C4.80378 1.01917 4.90142 0.999869 4.99999 1Z"
                              fill="black"
                            />
                          </svg>
                          <div className=" self-start mt-1">
                            {CurrentUser.user.langueparlee}
                          </div>
                        </div>
                      )}
                      <div className="flex gap-2 justify-center items-center self-stretch py-2">
                        <svg
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.0481 1.33333C20.0481 1.11232 19.9603 0.900358 19.804 0.744078C19.6478 0.587797 19.4358 0.5 19.2148 0.5H15.4073C15.2425 0.500035 15.0814 0.548928 14.9444 0.640499C14.8074 0.732069 14.7006 0.862205 14.6375 1.01445C14.5745 1.1667 14.558 1.33423 14.5901 1.49586C14.6223 1.65749 14.7016 1.80596 14.8181 1.9225L15.8423 2.94667L14.1439 4.645C13.2795 4.10723 12.2801 3.82617 11.2621 3.83458C10.244 3.84299 9.24937 4.14052 8.39395 4.6925C7.73089 4.26727 6.98302 3.9919 6.20254 3.88559C5.42205 3.77928 4.62777 3.84461 3.87515 4.07702C3.12252 4.30942 2.42969 4.70329 1.84503 5.23114C1.26037 5.75899 0.797963 6.40809 0.490099 7.13313C0.182235 7.85816 0.0363313 8.64165 0.0625756 9.42891C0.0888198 10.2162 0.286579 10.9882 0.642046 11.6911C0.997513 12.394 1.50212 13.0109 2.12064 13.4986C2.73916 13.9864 3.45668 14.3332 4.22311 14.515V15.5H3.38978C3.05826 15.5 2.74032 15.6317 2.5059 15.8661C2.27148 16.1005 2.13978 16.4185 2.13978 16.75C2.13978 17.0815 2.27148 17.3995 2.5059 17.6339C2.74032 17.8683 3.05826 18 3.38978 18H4.22311V19.25C4.22311 19.5815 4.35481 19.8995 4.58923 20.1339C4.82365 20.3683 5.14159 20.5 5.47311 20.5C5.80463 20.5 6.12258 20.3683 6.357 20.1339C6.59142 19.8995 6.72311 19.5815 6.72311 19.25V18H7.55645C7.88797 18 8.20591 17.8683 8.44033 17.6339C8.67475 17.3995 8.80645 17.0815 8.80645 16.75C8.80645 16.4185 8.67475 16.1005 8.44033 15.8661C8.20591 15.6317 7.88797 15.5 7.55645 15.5H6.72311V14.5075C7.31414 14.3697 7.87764 14.1331 8.38978 13.8075C9.42127 14.4701 10.6473 14.7624 11.8668 14.6366C13.0863 14.5108 14.2268 13.9742 15.1013 13.115C15.9757 12.2557 16.5322 11.1248 16.6794 9.90771C16.8266 8.69061 16.5558 7.45962 15.9114 6.41667L17.6098 4.71833L18.6339 5.7425C18.7508 5.85937 18.8998 5.93883 19.062 5.97079C19.2242 6.00274 19.3922 5.98575 19.5447 5.92197C19.6972 5.85818 19.8273 5.75049 19.9184 5.61258C20.0095 5.47468 20.0576 5.31279 20.0564 5.1475L20.0481 1.33333ZM2.55645 9.25C2.55448 8.76821 2.67238 8.2935 2.89952 7.86861C3.12666 7.44372 3.4559 7.08199 3.85762 6.816C4.25933 6.55001 4.72089 6.38811 5.20074 6.34487C5.68059 6.30164 6.16366 6.37843 6.60645 6.56833C6.13694 7.38408 5.88983 8.30879 5.88983 9.25C5.88983 10.1912 6.13694 11.1159 6.60645 11.9317C6.16366 12.1216 5.68059 12.1984 5.20074 12.1551C4.72089 12.1119 4.25933 11.95 3.85762 11.684C3.4559 11.418 3.12666 11.0563 2.89952 10.6314C2.67238 10.2065 2.55448 9.73179 2.55645 9.25ZM11.3064 12.1667C10.7296 12.1667 10.1657 11.9956 9.68603 11.6751C9.20639 11.3546 8.83255 10.8991 8.6118 10.3662C8.39104 9.83321 8.33328 9.24676 8.44582 8.68099C8.55836 8.11521 8.83615 7.59551 9.24405 7.18761C9.65196 6.7797 10.1717 6.50192 10.7374 6.38938C11.3032 6.27684 11.8897 6.3346 12.4226 6.55535C12.9556 6.77611 13.4111 7.14994 13.7316 7.62959C14.0521 8.10923 14.2231 8.67314 14.2231 9.25C14.2231 10.0235 13.9158 10.7654 13.3688 11.3124C12.8219 11.8594 12.08 12.1667 11.3064 12.1667Z"
                            fill="#1D1E21"
                          />
                        </svg>
                        <div className="self-stretch my-auto">
                          {CurrentUser.user.gender == "male"
                            ? "Homme"
                            : "Femme"}
                        </div>
                      </div>
                      <div className="flex gap-2 justify-center items-center self-stretch py-2">
                        <svg
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_87_12064)">
                            <path
                              d="M0.112793 16.332C0.114116 17.4367 0.553528 18.4957 1.33464 19.2768C2.11576 20.058 3.1748 20.4974 4.27946 20.4987H15.9461C17.0508 20.4974 18.1098 20.058 18.8909 19.2768C19.6721 18.4957 20.1115 17.4367 20.1128 16.332V8.83203H0.112793V16.332ZM14.2795 12.582C14.5267 12.582 14.7684 12.6553 14.9739 12.7927C15.1795 12.93 15.3397 13.1253 15.4343 13.3537C15.5289 13.5821 15.5537 13.8334 15.5054 14.0759C15.4572 14.3184 15.3382 14.5411 15.1633 14.7159C14.9885 14.8907 14.7658 15.0098 14.5233 15.058C14.2808 15.1062 14.0295 15.0815 13.8011 14.9869C13.5727 14.8923 13.3775 14.7321 13.2401 14.5265C13.1028 14.3209 13.0295 14.0793 13.0295 13.832C13.0295 13.5005 13.1612 13.1826 13.3956 12.9481C13.63 12.7137 13.9479 12.582 14.2795 12.582ZM10.1128 12.582C10.36 12.582 10.6017 12.6553 10.8073 12.7927C11.0128 12.93 11.173 13.1253 11.2676 13.3537C11.3623 13.5821 11.387 13.8334 11.3388 14.0759C11.2905 14.3184 11.1715 14.5411 10.9967 14.7159C10.8219 14.8907 10.5991 15.0098 10.3567 15.058C10.1142 15.1062 9.86285 15.0815 9.63444 14.9869C9.40603 14.8923 9.21081 14.7321 9.07346 14.5265C8.9361 14.3209 8.86279 14.0793 8.86279 13.832C8.86279 13.5005 8.99449 13.1826 9.22891 12.9481C9.46333 12.7137 9.78127 12.582 10.1128 12.582ZM5.94613 12.582C6.19335 12.582 6.43503 12.6553 6.64059 12.7927C6.84615 12.93 7.00637 13.1253 7.10098 13.3537C7.19559 13.5821 7.22034 13.8334 7.17211 14.0759C7.12388 14.3184 7.00483 14.5411 6.83001 14.7159C6.65519 14.8907 6.43247 15.0098 6.18999 15.058C5.94751 15.1062 5.69618 15.0815 5.46777 14.9869C5.23936 14.8923 5.04414 14.7321 4.90679 14.5265C4.76944 14.3209 4.69613 14.0793 4.69613 13.832C4.69613 13.5005 4.82782 13.1826 5.06224 12.9481C5.29666 12.7137 5.61461 12.582 5.94613 12.582Z"
                              fill="#1D1E21"
                            />
                            <path
                              d="M15.9461 2.16667H15.1128V1.33333C15.1128 1.11232 15.025 0.900358 14.8687 0.744078C14.7124 0.587797 14.5005 0.5 14.2795 0.5C14.0584 0.5 13.8465 0.587797 13.6902 0.744078C13.5339 0.900358 13.4461 1.11232 13.4461 1.33333V2.16667H6.77946V1.33333C6.77946 1.11232 6.69166 0.900358 6.53538 0.744078C6.3791 0.587797 6.16714 0.5 5.94613 0.5C5.72511 0.5 5.51315 0.587797 5.35687 0.744078C5.20059 0.900358 5.11279 1.11232 5.11279 1.33333V2.16667H4.27946C3.1748 2.16799 2.11576 2.6074 1.33464 3.38852C0.553528 4.16963 0.114116 5.22867 0.112793 6.33333L0.112793 7.16667H20.1128V6.33333C20.1115 5.22867 19.6721 4.16963 18.8909 3.38852C18.1098 2.6074 17.0508 2.16799 15.9461 2.16667Z"
                              fill="#1D1E21"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_87_12064">
                              <rect
                                width="20"
                                height="20"
                                fill="white"
                                transform="translate(0.112793 0.5)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <div className="self-stretch my-auto">
                          {CurrentUser.user.date_naissance}
                        </div>
                      </div>
                      <div className="flex gap-2 justify-center items-center self-stretch py-2">
                        <svg
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_87_12069)">
                            <path
                              d="M15.1689 5.5C15.1689 2.7425 12.9264 0.5 10.1689 0.5C7.41145 0.5 5.16895 2.7425 5.16895 5.5C5.16895 7.9725 6.97478 10.0258 9.33561 10.425V20.5H11.0023V10.425C13.3631 10.0267 15.1689 7.97333 15.1689 5.5Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_87_12069">
                              <rect
                                width="20"
                                height="20"
                                fill="white"
                                transform="translate(0.168945 0.5)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <div className="self-stretch my-auto">
                          {CurrentUser.user.countryresidence} ,
                          {CurrentUser?.user?.cityresidence}{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex text-base font-light max-sm:text-center text-neutral-900">
                    {CurrentUser?.user.discreptionBio}
                  </div>
                </div>
              </div>
              <span className="h-1 w-full bg-gray-100"></span>
              <div className="max-w-[1110px] gap-8 w-full flex flex-col md:flex-row ">
                <div className="flex flex-col gap-y-4">
                  <div className="max-w-xl  items-center flex gap-4 px-4  text-lg whitespace-nowrap text-zinc-900">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9f295deb485341c8ef8867b332b44fca28ea634a4d9e5dd0f127dd63ac23138?"
                      className="shrink-0 w-5 aspect-square"
                    />
                    <div className="grow">
                      {getTranslation(
                        `Skills`, // -----> Englais
                        ` Compétences` //  -----> Francais
                        //   ``,  //  -----> Turkey
                        //   `` ,  //  -----> Allemagne
                      )}{" "}
                    </div>
                  </div>
                  <div className="flex  gap-2  justify-center text-base font-semibold text-blue-600 whitespace-nowrap flex-wrap">
                    {CurrentUser?.other?.skillsAutre

                      .split(",")
                      .filter((item) => item !== "")
                      .map((item) => {
                        return (
                          <div className="justify-center px-4 py-2 border-2 border-blue-600 border-solid rounded-[30px]">
                            {item}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <span className="h-1 w-full bg-gray-100"></span>
              <div className="max-w-[1110px] justify-between w-full flex flex-col md:flex-row gap-4">
                <div className="w-full"></div>
              </div>

              <Social userInfo={CurrentUser} />
            </div>
          )}
          {CurrentUser?.user.profil === "scout" && (
            <div className="flex mt-8 gap-y-8 flex-col items-center px-4 py-6 bg-white rounded-[10px] jusitfy-center ">
              <div className="flex justify-center ">
                <div className="max-w-[1110px] flex gap-3 justify-center items-center max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col  max-md:ml-0 ">
                    <img
                      loading="lazy"
                      srcSet={
                        CurrentUser?.user.image
                          ? CurrentUser?.user.image
                          : Placeholder
                      }
                      className="max-w-full rounded-full aspect-square w-[227px] max-md:mt-4"
                    />
                  </div>
                  <div className="max-w-[865px] flex flex-col items-center justify-between gap-y-4">
                    <div className="flex flex-col w-full ">
                      <div className="flex gap-2 md:justify-between justify-center w-full max-md:flex-wrap max-md:max-w-full">
                        <div className="flex flex-col justify-between max-sm:text-center">
                          <div className="text-xl font-bold text-zinc-900">
                            {CurrentUser?.user.nom} {CurrentUser?.user.prenom}
                          </div>
                          <div className="text-base font-medium text-blue-600">
                            {CurrentUser?.user.profil == "other"
                              ? CurrentUser?.other?.profession
                              : ""}
                            {CurrentUser?.user?.profil == "player"
                              ? " Joueur"
                              : ""}
                            {CurrentUser?.user.profil == "agent" &&
                            CurrentUser?.agent?.typeresponsable == "players"
                              ? "Manager de Joueur"
                              : ""}
                            {CurrentUser?.user.profil == "agent" &&
                            CurrentUser?.agent?.typeresponsable == "club"
                              ? "Manager de CLub"
                              : ""}
                            {CurrentUser?.user.profil == "scout" ? "Scout" : ""}
                          </div>
                        </div>
                        {isOwner ? (
                          <div className="max-sm:w-full flex gap-2 max-sm:justify-center justify-between px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px]">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7d9a4939e54a7ca6f05fbd6e6afe23371f01555ddc659faf9ced6ddeab6710b?"
                              className="shrink-0 my-auto aspect-square w-[15px]"
                            />
                            <Link
                              to={"/setting/personal"}
                              className="flex items-center"
                            >
                              <p>
                                {getTranslation(
                                  `Edit`, // -----> Englais
                                  `Modifier` //  -----> Francais
                                  //   ``,  //  -----> Turkey
                                  //   `` ,  //  -----> Allemagne
                                )}{" "}
                              </p>
                            </Link>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="flex gap-x-5 gap-y-2 justify-left mt-3 items-start mt-1 text-xs font-light text-center text-zinc-900 flex-wrap max-w-full">
                        <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                          <span
                            className={`flag-icon flag-icon-${getCountryFlagFromCountryName(
                              CurrentUser.user.countryresidence
                            )}`}
                            style={{ marginRight: "8px", width: "25px" }}
                          ></span>
                          <div className="grow self-start mt-1">
                            {CurrentUser.user?.countryresidence}
                          </div>
                        </div>
                        <div className="flex gap-2 justify-center items-center self-stretch py-2">
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.0481 1.33333C20.0481 1.11232 19.9603 0.900358 19.804 0.744078C19.6478 0.587797 19.4358 0.5 19.2148 0.5H15.4073C15.2425 0.500035 15.0814 0.548928 14.9444 0.640499C14.8074 0.732069 14.7006 0.862205 14.6375 1.01445C14.5745 1.1667 14.558 1.33423 14.5901 1.49586C14.6223 1.65749 14.7016 1.80596 14.8181 1.9225L15.8423 2.94667L14.1439 4.645C13.2795 4.10723 12.2801 3.82617 11.2621 3.83458C10.244 3.84299 9.24937 4.14052 8.39395 4.6925C7.73089 4.26727 6.98302 3.9919 6.20254 3.88559C5.42205 3.77928 4.62777 3.84461 3.87515 4.07702C3.12252 4.30942 2.42969 4.70329 1.84503 5.23114C1.26037 5.75899 0.797963 6.40809 0.490099 7.13313C0.182235 7.85816 0.0363313 8.64165 0.0625756 9.42891C0.0888198 10.2162 0.286579 10.9882 0.642046 11.6911C0.997513 12.394 1.50212 13.0109 2.12064 13.4986C2.73916 13.9864 3.45668 14.3332 4.22311 14.515V15.5H3.38978C3.05826 15.5 2.74032 15.6317 2.5059 15.8661C2.27148 16.1005 2.13978 16.4185 2.13978 16.75C2.13978 17.0815 2.27148 17.3995 2.5059 17.6339C2.74032 17.8683 3.05826 18 3.38978 18H4.22311V19.25C4.22311 19.5815 4.35481 19.8995 4.58923 20.1339C4.82365 20.3683 5.14159 20.5 5.47311 20.5C5.80463 20.5 6.12258 20.3683 6.357 20.1339C6.59142 19.8995 6.72311 19.5815 6.72311 19.25V18H7.55645C7.88797 18 8.20591 17.8683 8.44033 17.6339C8.67475 17.3995 8.80645 17.0815 8.80645 16.75C8.80645 16.4185 8.67475 16.1005 8.44033 15.8661C8.20591 15.6317 7.88797 15.5 7.55645 15.5H6.72311V14.5075C7.31414 14.3697 7.87764 14.1331 8.38978 13.8075C9.42127 14.4701 10.6473 14.7624 11.8668 14.6366C13.0863 14.5108 14.2268 13.9742 15.1013 13.115C15.9757 12.2557 16.5322 11.1248 16.6794 9.90771C16.8266 8.69061 16.5558 7.45962 15.9114 6.41667L17.6098 4.71833L18.6339 5.7425C18.7508 5.85937 18.8998 5.93883 19.062 5.97079C19.2242 6.00274 19.3922 5.98575 19.5447 5.92197C19.6972 5.85818 19.8273 5.75049 19.9184 5.61258C20.0095 5.47468 20.0576 5.31279 20.0564 5.1475L20.0481 1.33333ZM2.55645 9.25C2.55448 8.76821 2.67238 8.2935 2.89952 7.86861C3.12666 7.44372 3.4559 7.08199 3.85762 6.816C4.25933 6.55001 4.72089 6.38811 5.20074 6.34487C5.68059 6.30164 6.16366 6.37843 6.60645 6.56833C6.13694 7.38408 5.88983 8.30879 5.88983 9.25C5.88983 10.1912 6.13694 11.1159 6.60645 11.9317C6.16366 12.1216 5.68059 12.1984 5.20074 12.1551C4.72089 12.1119 4.25933 11.95 3.85762 11.684C3.4559 11.418 3.12666 11.0563 2.89952 10.6314C2.67238 10.2065 2.55448 9.73179 2.55645 9.25ZM11.3064 12.1667C10.7296 12.1667 10.1657 11.9956 9.68603 11.6751C9.20639 11.3546 8.83255 10.8991 8.6118 10.3662C8.39104 9.83321 8.33328 9.24676 8.44582 8.68099C8.55836 8.11521 8.83615 7.59551 9.24405 7.18761C9.65196 6.7797 10.1717 6.50192 10.7374 6.38938C11.3032 6.27684 11.8897 6.3346 12.4226 6.55535C12.9556 6.77611 13.4111 7.14994 13.7316 7.62959C14.0521 8.10923 14.2231 8.67314 14.2231 9.25C14.2231 10.0235 13.9158 10.7654 13.3688 11.3124C12.8219 11.8594 12.08 12.1667 11.3064 12.1667Z"
                              fill="#1D1E21"
                            />
                          </svg>
                          <div className="self-stretch my-auto">
                            {CurrentUser.user.gender == "male"
                              ? "Homme"
                              : "Femme"}
                          </div>
                        </div>
                        <div className="flex gap-2 justify-center items-center self-stretch py-2">
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_87_12064)">
                              <path
                                d="M0.112793 16.332C0.114116 17.4367 0.553528 18.4957 1.33464 19.2768C2.11576 20.058 3.1748 20.4974 4.27946 20.4987H15.9461C17.0508 20.4974 18.1098 20.058 18.8909 19.2768C19.6721 18.4957 20.1115 17.4367 20.1128 16.332V8.83203H0.112793V16.332ZM14.2795 12.582C14.5267 12.582 14.7684 12.6553 14.9739 12.7927C15.1795 12.93 15.3397 13.1253 15.4343 13.3537C15.5289 13.5821 15.5537 13.8334 15.5054 14.0759C15.4572 14.3184 15.3382 14.5411 15.1633 14.7159C14.9885 14.8907 14.7658 15.0098 14.5233 15.058C14.2808 15.1062 14.0295 15.0815 13.8011 14.9869C13.5727 14.8923 13.3775 14.7321 13.2401 14.5265C13.1028 14.3209 13.0295 14.0793 13.0295 13.832C13.0295 13.5005 13.1612 13.1826 13.3956 12.9481C13.63 12.7137 13.9479 12.582 14.2795 12.582ZM10.1128 12.582C10.36 12.582 10.6017 12.6553 10.8073 12.7927C11.0128 12.93 11.173 13.1253 11.2676 13.3537C11.3623 13.5821 11.387 13.8334 11.3388 14.0759C11.2905 14.3184 11.1715 14.5411 10.9967 14.7159C10.8219 14.8907 10.5991 15.0098 10.3567 15.058C10.1142 15.1062 9.86285 15.0815 9.63444 14.9869C9.40603 14.8923 9.21081 14.7321 9.07346 14.5265C8.9361 14.3209 8.86279 14.0793 8.86279 13.832C8.86279 13.5005 8.99449 13.1826 9.22891 12.9481C9.46333 12.7137 9.78127 12.582 10.1128 12.582ZM5.94613 12.582C6.19335 12.582 6.43503 12.6553 6.64059 12.7927C6.84615 12.93 7.00637 13.1253 7.10098 13.3537C7.19559 13.5821 7.22034 13.8334 7.17211 14.0759C7.12388 14.3184 7.00483 14.5411 6.83001 14.7159C6.65519 14.8907 6.43247 15.0098 6.18999 15.058C5.94751 15.1062 5.69618 15.0815 5.46777 14.9869C5.23936 14.8923 5.04414 14.7321 4.90679 14.5265C4.76944 14.3209 4.69613 14.0793 4.69613 13.832C4.69613 13.5005 4.82782 13.1826 5.06224 12.9481C5.29666 12.7137 5.61461 12.582 5.94613 12.582Z"
                                fill="#1D1E21"
                              />
                              <path
                                d="M15.9461 2.16667H15.1128V1.33333C15.1128 1.11232 15.025 0.900358 14.8687 0.744078C14.7124 0.587797 14.5005 0.5 14.2795 0.5C14.0584 0.5 13.8465 0.587797 13.6902 0.744078C13.5339 0.900358 13.4461 1.11232 13.4461 1.33333V2.16667H6.77946V1.33333C6.77946 1.11232 6.69166 0.900358 6.53538 0.744078C6.3791 0.587797 6.16714 0.5 5.94613 0.5C5.72511 0.5 5.51315 0.587797 5.35687 0.744078C5.20059 0.900358 5.11279 1.11232 5.11279 1.33333V2.16667H4.27946C3.1748 2.16799 2.11576 2.6074 1.33464 3.38852C0.553528 4.16963 0.114116 5.22867 0.112793 6.33333L0.112793 7.16667H20.1128V6.33333C20.1115 5.22867 19.6721 4.16963 18.8909 3.38852C18.1098 2.6074 17.0508 2.16799 15.9461 2.16667Z"
                                fill="#1D1E21"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_87_12064">
                                <rect
                                  width="20"
                                  height="20"
                                  fill="white"
                                  transform="translate(0.112793 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <div className="self-stretch my-auto">
                            {CurrentUser.user.date_naissance}
                          </div>
                        </div>
                        <div className="flex gap-2 justify-center items-center self-stretch py-2">
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_87_12069)">
                              <path
                                d="M15.1689 5.5C15.1689 2.7425 12.9264 0.5 10.1689 0.5C7.41145 0.5 5.16895 2.7425 5.16895 5.5C5.16895 7.9725 6.97478 10.0258 9.33561 10.425V20.5H11.0023V10.425C13.3631 10.0267 15.1689 7.97333 15.1689 5.5Z"
                                fill="black"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_87_12069">
                                <rect
                                  width="20"
                                  height="20"
                                  fill="white"
                                  transform="translate(0.168945 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>

                          <div className="self-stretch my-auto">
                            {CurrentUser.user.countryresidence} ,
                            {CurrentUser?.user?.cityresidence}{" "}
                          </div>
                        </div>
                        <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
                          <svg
                            width="17"
                            height="21"
                            viewBox="0 0 17 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.3789 6.38645L11.7674 1.77495C10.9098 0.956593 9.76995 0.5 8.58457 0.5C7.39919 0.5 6.25935 0.956593 5.40179 1.77495L0.790291 6.38645C0.428596 6.74832 0.225465 7.23904 0.225586 7.75068C0.225707 8.26231 0.429068 8.75295 0.790934 9.11464C1.1528 9.47634 1.64353 9.67947 2.15516 9.67935C2.6668 9.67923 3.15743 9.47586 3.51912 9.114L6.65561 5.97751V18.571C6.65561 19.0826 6.85884 19.5733 7.22059 19.935C7.58234 20.2968 8.07298 20.5 8.58457 20.5C9.09616 20.5 9.5868 20.2968 9.94855 19.935C10.3103 19.5733 10.5135 19.0826 10.5135 18.571V5.97751L13.65 9.114C13.8291 9.29318 14.0417 9.43532 14.2758 9.53233C14.5098 9.62933 14.7606 9.67929 15.014 9.67935C15.2673 9.67941 15.5182 9.62957 15.7523 9.53268C15.9863 9.43578 16.199 9.29373 16.3782 9.11464C16.5574 8.93555 16.6995 8.72292 16.7965 8.48889C16.8935 8.25486 16.9435 8.00402 16.9436 7.75068C16.9436 7.49734 16.8938 7.24648 16.7969 7.0124C16.7 6.77833 16.5579 6.56563 16.3789 6.38645Z"
                              fill="#1D1E21"
                            />
                          </svg>

                          <div className="grow self-start mt-1">
                            {CurrentUser?.scout?.engagement}
                          </div>
                        </div>
                        <div className="flex gap-2 justify-center p-2 whitespace-nowrap items-center">
                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 21 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clip-path="url(#clip0_2149_4318)">
                              <path
                                d="M11.3449 13.8333H9.36993C8.92992 13.834 8.50105 13.695 8.14508 13.4364C7.78911 13.1778 7.52441 12.8128 7.38909 12.3942L6.77909 10.5167C6.64124 10.0978 6.64026 9.64589 6.7763 9.22641C6.91233 8.80692 7.17832 8.44161 7.53576 8.18333L9.13243 7.02667C9.48783 6.76715 9.91652 6.62729 10.3566 6.62729C10.7967 6.62729 11.2254 6.76715 11.5808 7.02667L13.1783 8.18667C13.5358 8.44485 13.8019 8.81016 13.9379 9.22968C14.074 9.64919 14.0729 10.1011 13.9349 10.52L13.3258 12.3975C13.1892 12.8151 12.9241 13.1789 12.5683 13.4368C12.2125 13.6947 11.7843 13.8335 11.3449 13.8333ZM20.3574 10.5C20.3574 12.4778 19.7709 14.4112 18.6721 16.0557C17.5733 17.7002 16.0115 18.9819 14.1843 19.7388C12.357 20.4957 10.3463 20.6937 8.40652 20.3079C6.46671 19.922 4.68488 18.9696 3.28636 17.5711C1.88783 16.1725 0.935426 14.3907 0.549574 12.4509C0.163721 10.5111 0.361755 8.50043 1.11863 6.67317C1.87551 4.8459 3.15723 3.28412 4.80172 2.1853C6.44622 1.08649 8.37961 0.5 10.3574 0.5C13.0087 0.502868 15.5506 1.55736 17.4253 3.4321C19.3001 5.30684 20.3546 7.84872 20.3574 10.5ZM10.3574 18C10.7889 17.9975 11.2194 17.9579 11.6441 17.8817L12.3508 15.5642C12.5111 15.0606 12.8274 14.6211 13.2538 14.3089C13.6802 13.9968 14.1948 13.8282 14.7233 13.8275L17.0708 13.8233C17.4487 13.065 17.6942 12.2477 17.7966 11.4067L15.9233 10.1567C15.4909 9.85323 15.1661 9.42034 14.9957 8.92041C14.8253 8.42048 14.818 7.87933 14.9749 7.375L15.6858 5.23083C15.0898 4.63169 14.3974 4.13702 13.6374 3.7675L11.8274 5.0225C11.4006 5.33392 10.8858 5.50173 10.3574 5.50173C9.82903 5.50173 9.31429 5.33392 8.88743 5.0225L7.12576 3.7425C6.37737 4.10002 5.69316 4.57868 5.10076 5.15917L5.73993 7.37333C5.89687 7.87767 5.88959 8.41881 5.71915 8.91874C5.54872 9.41867 5.22392 9.85156 4.79159 10.155L2.92993 11.4842C3.03698 12.298 3.27832 13.0885 3.64409 13.8233L5.99076 13.8275C6.51926 13.828 7.03395 13.9963 7.46054 14.3083C7.88712 14.6203 8.20353 15.0598 8.36409 15.5633L9.08493 17.8833C9.50496 17.9586 9.9307 17.9977 10.3574 18Z"
                                fill="#1D1E21"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2149_4318">
                                <rect
                                  width="20"
                                  height="20"
                                  fill="white"
                                  transform="translate(0.357422 0.5)"
                                />
                              </clipPath>
                            </defs>
                          </svg>

                          <div className="grow  mt-1">
                            {CurrentUser?.scout?.nb_joueurdetecter}

                            {getTranslation(
                              `Players detected`, // -----> Englais
                              ` Joueurs Détectés` //  -----> Francais
                              //   ``,  //  -----> Turkey
                              //   `` ,  //  -----> Allemagne
                            )}
                          </div>
                        </div>
                        {CurrentUser.user.langueparlee && (
                          <div className="flex gap-2   justify-center p-2 whitespace-nowrap">
                            <svg
                              className="size-6"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M11 5C11.1463 5.00005 11.2893 5.04286 11.4115 5.12317C11.5338 5.20348 11.6299 5.31778 11.688 5.452L14.938 12.952C14.98 13.0428 15.0035 13.1411 15.007 13.2411C15.0105 13.3411 14.9939 13.4408 14.9583 13.5343C14.9226 13.6278 14.8686 13.7133 14.7995 13.7856C14.7303 13.8579 14.6474 13.9157 14.5555 13.9554C14.4637 13.9952 14.3649 14.0162 14.2648 14.0172C14.1647 14.0182 14.0655 13.9991 13.9729 13.9611C13.8803 13.9232 13.7962 13.8671 13.7257 13.7961C13.6551 13.7252 13.5995 13.6408 13.562 13.548L12.89 12H9.10899L8.43899 13.548C8.35996 13.7306 8.21162 13.8743 8.02662 13.9476C7.84161 14.0208 7.63509 14.0175 7.45249 13.9385C7.26989 13.8595 7.12616 13.7111 7.05293 13.5261C6.9797 13.3411 6.98296 13.1346 7.06199 12.952L10.312 5.452C10.3701 5.31778 10.4662 5.20348 10.5884 5.12317C10.7107 5.04286 10.8537 5.00005 11 5ZM9.75999 10.5H12.24L11 7.636L9.75999 10.5ZM4.99999 1C5.1989 1 5.38967 1.07902 5.53032 1.21967C5.67097 1.36032 5.74999 1.55109 5.74999 1.75V3.011C6.61904 3.03659 7.4862 3.10702 8.34799 3.222C8.54518 3.24852 8.72376 3.35229 8.84444 3.51048C8.96512 3.66866 9.01801 3.86831 8.99149 4.0655C8.96497 4.26269 8.8612 4.44127 8.70301 4.56195C8.54483 4.68262 8.34518 4.73552 8.14799 4.709C7.92799 4.679 7.70799 4.653 7.48599 4.629C7.13418 5.84232 6.60659 6.99758 5.91999 8.058C6.15699 8.362 6.40799 8.653 6.67199 8.931C6.80924 9.07501 6.88366 9.26765 6.87888 9.46653C6.8741 9.66541 6.7905 9.85425 6.64649 9.9915C6.50248 10.1288 6.30984 10.2032 6.11096 10.1984C5.91208 10.1936 5.72324 10.11 5.58599 9.966C5.3833 9.75299 5.18786 9.53319 4.99999 9.307C4.18263 10.2901 3.22543 11.1479 2.15899 11.853C1.9931 11.9575 1.79287 11.993 1.60119 11.9517C1.40951 11.9104 1.24162 11.7956 1.13349 11.6321C1.02535 11.4685 0.985581 11.2691 1.02268 11.0766C1.05979 10.884 1.17082 10.7137 1.33199 10.602C2.38018 9.9086 3.30835 9.049 4.07999 8.057C3.88229 7.75222 3.69746 7.43928 3.52599 7.119C3.43224 6.94356 3.41202 6.73806 3.46978 6.54771C3.52754 6.35736 3.65855 6.19775 3.83399 6.104C4.00943 6.01025 4.21493 5.99003 4.40528 6.04779C4.59563 6.10555 4.75524 6.23656 4.84899 6.412C4.89799 6.502 4.94799 6.593 4.99899 6.683C5.38699 6.003 5.70699 5.278 5.95099 4.519C4.58141 4.46485 3.2097 4.52842 1.85099 4.709C1.6538 4.73552 1.45415 4.68262 1.29597 4.56195C1.13778 4.44127 1.03401 4.26269 1.00749 4.0655C0.98097 3.86831 1.03387 3.66866 1.15455 3.51048C1.27523 3.35229 1.4538 3.24852 1.65099 3.222C2.50399 3.108 3.37099 3.037 4.24899 3.011V1.75C4.24899 1.65143 4.26842 1.55382 4.30618 1.46276C4.34393 1.3717 4.39926 1.28897 4.46901 1.21932C4.53876 1.14966 4.62156 1.09444 4.71267 1.0568C4.80378 1.01917 4.90142 0.999869 4.99999 1Z"
                                fill="black"
                              />
                            </svg>

                            <div className=" self-start mt-1">
                              {CurrentUser.user.langueparlee}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex text-left text-break font-light  text-neutral-900">
                      {CurrentUser?.user.discreptionBio}
                    </div>
                  </div>
                </div>
              </div>
              <span className="h-1 w-full bg-gray-100"></span>
              <div className="max-w-[1110px] gap-8 w-full flex flex-col md:flex-row ">
                <div className="flex flex-col gap-y-4">
                  <div className="max-w-xl  items-center flex gap-4 px-4  text-lg whitespace-nowrap text-zinc-900">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9f295deb485341c8ef8867b332b44fca28ea634a4d9e5dd0f127dd63ac23138?"
                      className="shrink-0 w-5 aspect-square"
                    />
                    <div className="grow">
                      {" "}
                      {getTranslation(
                        `Skills`, // -----> Englais
                        ` Compétences` //  -----> Francais
                        //   ``,  //  -----> Turkey
                        //   `` ,  //  -----> Allemagne
                      )}{" "}
                    </div>
                  </div>
                  <div className=" w-full  flex gap-2  text-base font-semibold text-blue-600 whitespace-nowrap flex-wrap">
                    {CurrentUser?.scout?.skillsscout
                      .split(",")
                      .filter((item) => item !== "")
                      .map((item) => {
                        return (
                          <div className="text-wrap text-center grow justify-center px-4 py-2 border-2 border-blue-600 border-solid rounded-[30px]">
                            {item}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
              <Social userInfo={CurrentUser} />
            </div>
          )}
        </div>
      </HomeLayout>
    </>
  );
};

export default More;
