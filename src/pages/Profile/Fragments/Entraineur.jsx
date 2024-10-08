import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Terrain from "../../../components/Terrain";
import { useParams } from "react-router-dom";
import Placeholder from "../../../assets/placeholder.jpg";
import T343 from "../../../assets/3-4-3.png";
import T4231 from "../../../assets/4-2-3-1.png";
import T433 from "../../../assets/4-3-3.png";
import T442 from "../../../assets/4-4-2.png";
import T532 from "../../../assets/5-3-2.png";
import T541 from "../../../assets/5-4-1.png";
import { Config } from "../../../config";
import { paysAllInfo } from "../../../assets/data/Country";
import Modal from "react-modal";
import { Context } from "../../../index";
import Social from "../components/social";
import secureLocalStorage from "react-secure-storage";

const PlayerCard = ({ userInfo, sendNotification }) => {
  const { id } = useParams();
  const storedUserDatad = JSON.parse(
    secureLocalStorage.getItem("cryptedUser")
  );
  const isOwner = storedUserDatad.id == id;
  const [acceptedFriend, setAcceptedFriend] = useState(false);
  const [invitationSend, setInvitationSend] = useState(false);
  const [Invitation, setInvitation] = useState([]);
  const [isCopyLinkPopupVisible, setIsCopyLinkPopupVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

  const storedUserData = JSON.parse(localStorage.getItem("Secret"));
  const tokenn = storedUserData?.token;

  const isFriendAccepted = async () => {
    const response = await fetch(
      `${Config.LOCAL_URL}/api/user/${id}/checkFriends/${storedUserDatad.id}`,{
        headers : {
          'Authorization': `Bearer ${tokenn}`
        }
      }
    );
    const result = await response.json();
    setAcceptedFriend(result.exists);
  };
  const getCountryFlagFromCountryName = (countryName) => {
    const country = paysAllInfo.find((country) => country?.name == countryName);
    return country ? country.iso["alpha-2"].toLowerCase() : null;
  };
  const sendFriendRequest = async () => {
    const response = await fetch(
      `${Config.LOCAL_URL}/api/user/${id}/sendFriendRequest/${storedUserData.id}`,
      {
        method: "POST",
        headers : {
          'Authorization': `Bearer ${tokenn}`
        }
      }
    );
    isFriendAccepted();
    const result = await response.json();
    console.log("friend request sent");
  };

  const CheckIfInvitationIsSend = async () => {
    const response = await fetch(
      `${Config.LOCAL_URL}/api/user/${id}/friend-requests`,
      {
        method: "GET",
        headers : {
          Authorization: `Bearer ${tokenn}`,
        }
      }
    );
    const result = await response.json();

    setInvitation(result.receiver);

    // const isFriend = result.receiver.filter((item) => {
    //     console.log(item.id)
    //     return item.id === LocalStorageID.id
    // })
    // setInvitationSend(isFriend)
  };

  // Styles pour la modale
  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "transparent", // Fond transparent
      border: "none", // Supprimer les bordures
      // borderRadius: '50%', // Modal circulaire
      padding: 0, // Pas de padding
      width: "80vw", // Largeur relative de la fenêtre
      height: "80vw", // Hauteur relative de la fenêtre
      maxWidth: "400px", // Limite la largeur maximale
      maxHeight: "400px", // Limite la hauteur maximale
      overflow: "hidden", // Cacher tout contenu dépassant
      animation: "fadeIn 0.3s ease-out", // Animation d'apparition
    },
  };

  const openModal = (src) => {
    setImageSrc(src);
    setModalIsOpen(true);
  };

  // Fonction pour fermer la modale
  const closeModal = () => {
    setImageSrc(null);
    setModalIsOpen(false);
  };
  const copyLinkToClipboard = (articleId) => {
    // Assuming you have the URL of your articles, replace 'YOUR_BASE_URL' with the actual base URL
    const number = userInfo.user.numWSup;
    // Copy the URL to the clipboard
    if (acceptedFriend?.status === "accepted") {
      navigator.clipboard
        .writeText(number)
        .then(() => {
          console.log("Link copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy link to clipboard", err);
        });
    } else {
      console.log("add as friend to copy number");
    }
  };
  const getWhatsappPrefix = (string) => {
    return string.split(",")[0].substring(1);
  };
  useEffect(() => {
    isFriendAccepted();
  }, [id]);

  return (
    <>
      <div className="flex flex-col items-center px-4 py-6 bg-white rounded-[10px]">
        <div className="flex flex-col md:flex-row justify-between gap-4 w-full">
          <div className="flex items-center md:w-fit w-full justify-center  md:mx-[0px] ">
            <div>
              {/* Bouton/image cliquable */}
              <a
                href="#"
                onClick={() =>
                  openModal(
                    userInfo?.user.image ? userInfo?.user.image : Placeholder
                  )
                }
              >
                <img
                  alt="profile"
                  loading="lazy"
                  srcSet={
                    userInfo?.user.image ? userInfo?.user.image : Placeholder
                  }
                  className="max-w-full object-cover rounded-full aspect-square w-[100px] md:w-[120px]"
                />
              </a>

              {/* Modale d'agrandissement de l'image */}
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Image Modal"
                style={modalStyle} // Styles personnalisés pour la modale
              >
                <div style={{ width: "100%", height: "100%" }}>
                  <img
                    alt="profile"
                    loading="lazy"
                    className="object-cover"
                    srcSet={imageSrc ? imageSrc : Placeholder}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }} // Remplir tout l'espace disponible
                  />
                </div>
              </Modal>
            </div>

            {/* <img
                            alt="profile"
                            loading="lazy"
                            srcSet={userInfo?.user.image ? userInfo?.user.image : Placeholder}
                            className="max-w-full rounded-full aspect-square w-[100px] md:w-[120px]"
                        /> */}
            <div className="flex-col items-center  max-w-full pl-[16px] h-full md:pt-[5px]">
              <div className="text-xl font-bold text-zinc-900 flex gap-2 flex-wrap whitespace-normal">
                <p className="">
                  {userInfo?.user.nom} {userInfo?.user.prenom}
                </p>
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
          </div>
          <div className="flex flex-col justify-between h-full md:w-fit w-full">
            <div className="flex md:justify-end md:pt-[5px]">
              {isOwner ? (
                <div className="w-full md:w-[157px] flex gap-2 justify-center self-start px-8 py-2 text-base font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f7d9a4939e54a7ca6f05fbd6e6afe23371f01555ddc659faf9ced6ddeab6710b?"
                    className="shrink-0 my-auto aspect-square w-[15px]"
                  />
                  <Link
                    to={"/setting/personal"}
                    className="flex items-center hover:text-blue-900"
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
              ) : (
                <>
                  <div className="flex items-center gap-3 md:w-fit w-full">
                    <div
                      className={`w-full max-sm:w-full items-center flex gap-2  justify-center px-8 py-2 text-base font-medium text-white bg-blue-600 rounded-[30px]`}
                    >
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_61_30243)">
                          <path
                            d="M7.16569 10C9.92319 10 12.1657 7.7575 12.1657 5C12.1657 2.2425 9.92319 0 7.16569 0C4.40819 0 2.16569 2.2425 2.16569 5C2.16569 7.7575 4.40819 10 7.16569 10ZM9.66569 11.6667H4.66569C2.36819 11.6667 0.499023 13.5358 0.499023 15.8333V20H13.8324V15.8333C13.8324 13.5358 11.9632 11.6667 9.66569 11.6667ZM20.4632 7.9L16.3582 12.005C16.0282 12.3342 15.5957 12.4992 15.1632 12.4992C14.7307 12.4992 14.2982 12.3342 13.969 12.0058L11.5765 9.61333L12.7549 8.435L15.1465 10.8275L19.284 6.7225L20.4624 7.90083L20.4632 7.9Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_61_30243">
                            <rect
                              width="20"
                              height="20"
                              fill="white"
                              transform="translate(0.499023)"
                            />
                          </clipPath>
                        </defs>
                      </svg>

                      {acceptedFriend ? (
                        <div className="">
                          {acceptedFriend?.status == "pending"
                            ? "En Atente"
                            : "ami(e)"}
                        </div>
                      ) : (
                        <button
                          className="flex items-center "
                          onClick={() => {
                            sendNotification(id);
                            sendFriendRequest();
                          }}
                        >
                          <p>
                            {getTranslation(
                              `Add`, // -----> Englais
                              `Ajouter` //  -----> Francais
                              //   ``,  //  -----> Turkey
                              //   `` ,  //  -----> Allemagne
                            )}
                          </p>
                        </button>
                      )}
                    </div>
                    {acceptedFriend?.status === "accepted" ? (
                      <div>
                        <a
                          rel="noreferrer"
                          href={`https://wa.me/${getWhatsappPrefix(
                            userInfo.user.optionalattributs
                          )}${userInfo.user.numWSup}`}
                          target="_blank"
                        >
                          <svg
                            className="fill-white"
                            width="37"
                            height="36"
                            viewBox="0 0 37 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className={
                                acceptedFriend?.status === "accepted"
                                  ? "fill-green-500"
                                  : "fill-gray-500"
                              }
                              d="M36.4991 18C36.4991 27.0912 29.7597 34.6069 21.0054 35.8269C20.1865 35.9409 19.349 36 18.4991 36C17.5175 36 16.5546 35.9212 15.6155 35.7699C7.0436 34.3913 0.498047 26.9596 0.498047 18C0.498047 8.05885 8.5569 0 18.498 0C28.4392 0 36.498 8.05885 36.498 18H36.4991Z"
                              fill="#65676B"
                            />
                            <path
                              className={
                                acceptedFriend?.status === "accepted"
                                  ? "fill-white"
                                  : "fill-gray-200"
                              }
                              d="M21.8418 23.328C17.1785 23.3269 13.3838 19.5323 13.3828 14.8701C13.3849 13.6884 14.3457 12.7266 15.5263 12.7266C15.6476 12.7266 15.7678 12.7369 15.8818 12.7577C16.1347 12.7991 16.3742 12.8852 16.596 13.0137C16.6281 13.0323 16.6499 13.0634 16.6551 13.0997L17.1474 16.2061C17.1536 16.2424 17.1422 16.2787 17.1184 16.3056C16.8458 16.6073 16.4986 16.8239 16.113 16.9327L15.9274 16.9856L15.9979 17.1659C16.6343 18.7839 17.9279 20.0785 19.5469 20.7149L19.7273 20.7854L19.7791 20.5988C19.8879 20.2122 20.1046 19.865 20.4062 19.5934C20.428 19.5737 20.457 19.5623 20.487 19.5623C20.4933 19.5623 20.5005 19.5623 20.5067 19.5644L23.6121 20.0567C23.6494 20.063 23.6795 20.0837 23.6992 20.1158C23.8267 20.3376 23.9127 20.5781 23.9552 20.83C23.9749 20.943 23.9853 21.0611 23.9853 21.1855C23.9853 22.3661 23.0234 23.3269 21.8418 23.329V23.328Z"
                              fill="#D0D0D0"
                            />
                            <path
                              className={
                                acceptedFriend?.status === "accepted"
                                  ? "fill-white"
                                  : "fill-gray-200"
                              }
                              d="M30.1113 16.9777C29.8594 14.1356 28.5575 11.4997 26.4451 9.55626C24.3203 7.60037 21.5622 6.52344 18.6786 6.52344C12.3497 6.52344 7.20029 11.6728 7.20029 18.0017C7.20029 20.1255 7.78592 22.1954 8.89498 23.9979L6.42188 29.4738L14.3429 28.6301C15.7204 29.1939 17.1788 29.48 18.6786 29.48C19.0735 29.48 19.4777 29.4593 19.883 29.4178C20.2406 29.3795 20.6013 29.3235 20.9568 29.252C26.2575 28.1813 30.1268 23.4766 30.1569 18.0629V18.0017C30.1569 17.6566 30.1413 17.3125 30.1102 16.9787L30.1113 16.9777ZM14.6466 26.2264L10.2642 26.6928L11.5733 23.7937L11.3121 23.4424C11.2924 23.4164 11.2738 23.3905 11.252 23.3615C10.116 21.7933 9.51585 19.94 9.51585 18.0007C9.51585 12.9477 13.6266 8.83796 18.6786 8.83796C23.4123 8.83796 27.4236 12.531 27.8102 17.2451C27.831 17.498 27.8413 17.7519 27.8413 18.0017C27.8413 18.0732 27.8403 18.1437 27.8382 18.2184C27.7408 22.4452 24.7878 26.0347 20.6573 26.9489C20.3422 27.0193 20.0188 27.0722 19.6964 27.1074C19.3616 27.1458 19.0186 27.1645 18.6775 27.1645C17.4638 27.1645 16.2843 26.9292 15.169 26.4648C15.0456 26.4151 14.9244 26.3622 14.8103 26.3073L14.6445 26.2275L14.6466 26.2264Z"
                              fill="#D0D0D0"
                            />
                          </svg>
                        </a>
                      </div>
                    ) : (
                      <div>
                        <button onClick={() => {}}>
                          <svg
                            className="fill-white"
                            width="37"
                            height="36"
                            viewBox="0 0 37 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className={
                                acceptedFriend?.status === "accepted"
                                  ? "fill-green-500"
                                  : "fill-gray-500"
                              }
                              d="M36.4991 18C36.4991 27.0912 29.7597 34.6069 21.0054 35.8269C20.1865 35.9409 19.349 36 18.4991 36C17.5175 36 16.5546 35.9212 15.6155 35.7699C7.0436 34.3913 0.498047 26.9596 0.498047 18C0.498047 8.05885 8.5569 0 18.498 0C28.4392 0 36.498 8.05885 36.498 18H36.4991Z"
                              fill="#65676B"
                            />
                            <path
                              className={
                                acceptedFriend?.status === "accepted"
                                  ? "fill-white"
                                  : "fill-gray-200"
                              }
                              d="M21.8418 23.328C17.1785 23.3269 13.3838 19.5323 13.3828 14.8701C13.3849 13.6884 14.3457 12.7266 15.5263 12.7266C15.6476 12.7266 15.7678 12.7369 15.8818 12.7577C16.1347 12.7991 16.3742 12.8852 16.596 13.0137C16.6281 13.0323 16.6499 13.0634 16.6551 13.0997L17.1474 16.2061C17.1536 16.2424 17.1422 16.2787 17.1184 16.3056C16.8458 16.6073 16.4986 16.8239 16.113 16.9327L15.9274 16.9856L15.9979 17.1659C16.6343 18.7839 17.9279 20.0785 19.5469 20.7149L19.7273 20.7854L19.7791 20.5988C19.8879 20.2122 20.1046 19.865 20.4062 19.5934C20.428 19.5737 20.457 19.5623 20.487 19.5623C20.4933 19.5623 20.5005 19.5623 20.5067 19.5644L23.6121 20.0567C23.6494 20.063 23.6795 20.0837 23.6992 20.1158C23.8267 20.3376 23.9127 20.5781 23.9552 20.83C23.9749 20.943 23.9853 21.0611 23.9853 21.1855C23.9853 22.3661 23.0234 23.3269 21.8418 23.329V23.328Z"
                              fill="#D0D0D0"
                            />
                            <path
                              className={
                                acceptedFriend?.status === "accepted"
                                  ? "fill-white"
                                  : "fill-gray-200"
                              }
                              d="M30.1113 16.9777C29.8594 14.1356 28.5575 11.4997 26.4451 9.55626C24.3203 7.60037 21.5622 6.52344 18.6786 6.52344C12.3497 6.52344 7.20029 11.6728 7.20029 18.0017C7.20029 20.1255 7.78592 22.1954 8.89498 23.9979L6.42188 29.4738L14.3429 28.6301C15.7204 29.1939 17.1788 29.48 18.6786 29.48C19.0735 29.48 19.4777 29.4593 19.883 29.4178C20.2406 29.3795 20.6013 29.3235 20.9568 29.252C26.2575 28.1813 30.1268 23.4766 30.1569 18.0629V18.0017C30.1569 17.6566 30.1413 17.3125 30.1102 16.9787L30.1113 16.9777ZM14.6466 26.2264L10.2642 26.6928L11.5733 23.7937L11.3121 23.4424C11.2924 23.4164 11.2738 23.3905 11.252 23.3615C10.116 21.7933 9.51585 19.94 9.51585 18.0007C9.51585 12.9477 13.6266 8.83796 18.6786 8.83796C23.4123 8.83796 27.4236 12.531 27.8102 17.2451C27.831 17.498 27.8413 17.7519 27.8413 18.0017C27.8413 18.0732 27.8403 18.1437 27.8382 18.2184C27.7408 22.4452 24.7878 26.0347 20.6573 26.9489C20.3422 27.0193 20.0188 27.0722 19.6964 27.1074C19.3616 27.1458 19.0186 27.1645 18.6775 27.1645C17.4638 27.1645 16.2843 26.9292 15.169 26.4648C15.0456 26.4151 14.9244 26.3622 14.8103 26.3073L14.6445 26.2275L14.6466 26.2264Z"
                              fill="#D0D0D0"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="md:ml-[10px] max:lg-[150px] md:-mt-12 flex justify-center md:justify-between flex-wrap text-sm">
          <div className="flex gap-2 justify-center p-2 whitespace-nowrap">
            <span
              className={`flag-icon flag-icon-${getCountryFlagFromCountryName(
                userInfo.user?.countryresidence
              )}`}
              style={{ marginRight: "8px", width: "25px" }}
            ></span>
            <div className="grow self-start mt-1">
              {userInfo.user?.countryresidence}
            </div>
          </div>

          <div className="flex gap-2 justify-center p-2 whitespace-nowrap items-center">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_61_20390)">
                <mask
                  id="mask0_61_20390"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="21"
                  height="20"
                >
                  <path d="M20.5 0H0.5V20H20.5V0Z" fill="white" />
                </mask>
                <g mask="url(#mask0_61_20390)">
                  <path
                    d="M11.4875 13.3333H9.5125C9.0725 13.334 8.64363 13.195 8.28766 12.9364C7.93169 12.6778 7.66699 12.3128 7.53167 11.8942L6.92167 10.0167C6.78382 9.59778 6.78284 9.14589 6.91887 8.7264C7.05491 8.30692 7.32089 7.94161 7.67834 7.68333L9.275 6.52667C9.63041 6.26715 10.0591 6.12729 10.4992 6.12729C10.9392 6.12729 11.3679 6.26715 11.7233 6.52667L13.3208 7.68667C13.6784 7.94485 13.9444 8.31016 14.0805 8.72968C14.2165 9.14919 14.2155 9.60112 14.0775 10.02L13.4683 11.8975C13.3318 12.3151 13.0666 12.6789 12.7109 12.9368C12.3551 13.1947 11.9269 13.3335 11.4875 13.3333ZM20.5 10C20.5 11.9778 19.9135 13.9112 18.8147 15.5557C17.7159 17.2002 16.1541 18.4819 14.3268 19.2388C12.4996 19.9957 10.4889 20.1937 8.5491 19.8079C6.60929 19.422 4.82746 18.4696 3.42894 17.0711C2.03041 15.6725 1.078 13.8907 0.692152 11.9509C0.306299 10.0111 0.504333 8.00043 1.26121 6.17317C2.01809 4.3459 3.29981 2.78412 4.9443 1.6853C6.58879 0.58649 8.52219 0 10.5 0C13.1513 0.00286757 15.6932 1.05736 17.5679 2.9321C19.4426 4.80684 20.4971 7.34872 20.5 10ZM10.5 17.5C10.9315 17.4975 11.362 17.4579 11.7867 17.3817L12.4933 15.0642C12.6537 14.5606 12.9699 14.1211 13.3964 13.8089C13.8228 13.4968 14.3374 13.3282 14.8658 13.3275L17.2133 13.3233C17.5913 12.565 17.8367 11.7477 17.9392 10.9067L16.0658 9.65667C15.6335 9.35323 15.3087 8.92034 15.1383 8.42041C14.9678 7.92047 14.9606 7.37933 15.1175 6.875L15.8283 4.73083C15.2324 4.13169 14.54 3.63702 13.78 3.2675L11.97 4.5225C11.5431 4.83392 11.0284 5.00173 10.5 5.00173C9.97161 5.00173 9.45687 4.83392 9.03 4.5225L7.26834 3.2425C6.51995 3.60002 5.83574 4.07868 5.24334 4.65917L5.8825 6.87333C6.03944 7.37767 6.03217 7.91881 5.86173 8.41874C5.69129 8.91867 5.3665 9.35156 4.93417 9.655L3.0725 10.9842C3.17956 11.798 3.42089 12.5885 3.78667 13.3233L6.13334 13.3275C6.66184 13.328 7.17653 13.4963 7.60311 13.8083C8.0297 14.1203 8.34611 14.5598 8.50667 15.0633L9.2275 17.3833C9.64754 17.4586 10.0733 17.4977 10.5 17.5Z"
                    fill="#1D1E21"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_61_20390">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(0.5)"
                  />
                </clipPath>
              </defs>
            </svg>

            <div className="grow self-start mt-1">
              {userInfo?.coach?.ClubActuelCoach}
            </div>
          </div>
        </div>

        {userInfo.user.discreptionBio && (
          <div className="self-stretch text-base font-light text-center text-neutral-900 max-md:max-w-full">
            <div className="flex justify-center mt-2">
              <svg
                width="366"
                height="1"
                viewBox="0 0 366 1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.5"
                  y1="0.5"
                  x2="365.5"
                  y2="0.499968"
                  stroke="#D9E6F7"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <div className="py-4">{userInfo?.user.discreptionBio}</div>
            <div className="flex justify-center mt-2">
              <svg
                width="366"
                height="1"
                viewBox="0 0 366 1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="0.5"
                  y1="0.5"
                  x2="365.5"
                  y2="0.499968"
                  stroke="#D9E6F7"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </div>
        )}

        <span className="md:block hidden">
          <div className="flex gap-4 px-4 mt-8 text-lg whitespace-nowrap text-zinc-900">
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

            <div className="grow mb-3">
              {getTranslation(
                `Preferred Tactics`, // -----> Englais
                ` Tactiques Préférée` //  -----> Francais
                //   ``,  //  -----> Turkey
                //   `` ,  //  -----> Allemagne
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center text-xs text-center text-white whitespace-nowrap w-[366px]">
            <div className="relative flex relative flex-col py-9 pr-12 pl-4 w-full aspect-[1.45]">
              {userInfo.coach?.footballTactic == "3-4-3" && (
                <img
                  alt="terrain"
                  loading="lazy"
                  srcSet={T343}
                  className="object-cover absolute inset-0 size-full"
                />
              )}
              {userInfo.coach?.footballTactic == "4-3-3" && (
                <img
                  alt="terrain"
                  loading="lazy"
                  srcSet={T433}
                  className="object-cover absolute inset-0 size-full"
                />
              )}
              {userInfo.coach?.footballTactic === "4-4-2" && (
                <img
                  alt="terrain"
                  loading="lazy"
                  srcSet={T442}
                  className="object-cover absolute inset-0 size-full"
                />
              )}
              {userInfo.coach?.footballTactic === "5-4-1" && (
                <img
                  alt="terrain"
                  loading="lazy"
                  srcSet={T541}
                  className="object-cover absolute inset-0 size-full"
                />
              )}
              {userInfo.coach?.footballTactic === "4-2-3-1" && (
                <img
                  alt="terrain"
                  loading="lazy"
                  srcSet={T4231}
                  className="object-cover absolute inset-0 size-full"
                />
              )}
              {userInfo.coach?.footballTactic === "5-3-2" && (
                <img
                  alt="terrain"
                  loading="lazy"
                  srcSet={T532}
                  className="object-cover absolute inset-0 size-full"
                />
              )}
              {userInfo.coach?.footballTactic === "3-4-3" && (
                <img
                  alt="terrain"
                  loading="lazy"
                  srcSet={T343}
                  className="object-cover absolute inset-0 size-full"
                />
              )}
            </div>
          </div>
          <div className="flex hidden gap-4 px-4 mt-4 text-lg whitespace-nowrap text-zinc-900">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e9f295deb485341c8ef8867b332b44fca28ea634a4d9e5dd0f127dd63ac23138?"
              className="shrink-0 self-start w-5 aspect-square"
            />
            <div className="grow">
              {getTranslation(
                `Skills`, // -----> Englais
                ` Compétences` //  -----> Francais
                //   ``,  //  -----> Turkey
                //   `` ,  //  -----> Allemagne
              )}
            </div>
          </div>
          <div className="flex hidden  justify-center gap-2  mt-4 text-base font-semibold text-blue-600 whitespace-nowrap flex-wrap">
            {userInfo?.coach?.skills
              .split(",")
              .filter((item) => item.trim() !== "")
              .map((item) => {
                return (
                  <div className="text-center justify-center px-4 py-2 border-2 border-blue-600 border-solid rounded-[30px]">
                    {item}
                  </div>
                );
              })}
          </div>
        </span>

        {/* <div className="flex gap-5 justify-between">
                    {userInfo?.user.liensSM && <a target="_blank" href={`https://www.instagram.com/${userInfo?.user.liensSM}`}>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f2fa6031aa7cffb21186e5501126b3836a7c414e1752c9e64fdbcac1ce4100c?"
                            className="shrink-0 aspect-square w-[25px]"
                        />
                    </a>}
                    {userInfo?.user.tiktok && <a target="_blank" href={`https://www.tiktok.com/${userInfo?.user.tiktok}`}>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ee734d4428028617729c0185044032ddb130279e8139babab8caab0cdf7d6bd4?"
                            className="shrink-0 w-6 aspect-[0.96]"
                        />
                    </a>}
                    {userInfo?.user.linkedin && <a target="_blank" href={`https://www.linkedin.com/in/${userInfo?.user.linkedin}`}>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8667ac9987e1f4996c37f85b212f897fd480e345bd16b0eac52bb3f8adb76e66?"
                            className="shrink-0 w-6 aspect-[0.96]"
                        />
                    </a>}
                    {userInfo?.user.fb && <a target="_blank" href={`https://www.facebook.com/${userInfo?.user.fb}`}>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b78e7f165ad6d93ef824dbe6adbbd69b6e0d02007b0bbf390ad2538e8c398dde?"
                            className="shrink-0 aspect-square w-[25px]"
                        />
                    </a>}
                    {userInfo?.user.x && <a target="_blank" href={`https://www.facebook.com/${userInfo?.user.fb}`}>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/caac4cd0dd6b89529ac5104e789b62c6cbf2091f6a2f16366ce2bc247406f84a?"
                            className="shrink-0 w-6 aspect-[0.96]"
                        />
                    </a>}
                </div> */}

        {/* social icons */}

        <Social userInfo={userInfo} />
        {/* social icons */}
        <div className="flex justify-center items-center px-16 py-2 mt-4 max-w-full text-base font-medium text-white bg-zinc-900 rounded-[30px] w-[363px] max-md:px-5">
          <div className="flex gap-4 items-center">
            <svg
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_3636_1921)">
                <path
                  d="M8.5 3.41797C4.86364 3.41797 1.75818 5.67979 0.5 8.87252C1.75818 12.0653 4.86364 14.3271 8.5 14.3271C12.1364 14.3271 15.2418 12.0653 16.5 8.87252C15.2418 5.67979 12.1364 3.41797 8.5 3.41797ZM8.5 12.5089C6.49273 12.5089 4.86364 10.8798 4.86364 8.87252C4.86364 6.86525 6.49273 5.23616 8.5 5.23616C10.5073 5.23616 12.1364 6.86525 12.1364 8.87252C12.1364 10.8798 10.5073 12.5089 8.5 12.5089ZM8.5 6.6907C7.29273 6.6907 6.31818 7.66525 6.31818 8.87252C6.31818 10.0798 7.29273 11.0544 8.5 11.0544C9.70727 11.0544 10.6818 10.0798 10.6818 8.87252C10.6818 7.66525 9.70727 6.6907 8.5 6.6907Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_3636_1921">
                  <rect
                    width="16"
                    height="17"
                    fill="white"
                    transform="translate(0.5 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>

            <a href={`/profile/more/${id}`}>
              {getTranslation(
                `See more`, // -----> Englais
                ` Voir Plus` //  -----> Francais
                //   ``,  //  -----> Turkey
                //   `` ,  //  -----> Allemagne
              )}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerCard;
