import React, { useState, useEffect } from "react";
import Header from "../../components/Header2";
// import Leftnav from '../../components/Leftnav';
// import Rightchat from '../../components/Rightchat';

// import Appfooter from '../../components/Appfooter';
// import Popupchat from '../../components/Popupchat';

import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import { Context } from "../../index";
import { Config } from "../../config";
import LeftMenu from "../../components/LeftMenu";

const Album = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [eventTogglerIsOpenned, setEventTogglerIsOpenned] = useState(false);
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);
  const [user, setUser] = useState([]);

  const [modalHeight, setModalHeight] = useState("70%");
  const [modalWidth, setModalWidth] = useState("70%");
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    const id = storedUserData ? storedUserData.id : null;

    if (id) {
      fetch(`${Config.LOCAL_URL}/api/user/${id}`)
        .then((response) => response.json())
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 767;
      setModalHeight(isMobile ? "50%" : "70%");
      setModalWidth(isMobile ? "90%" : "70%");
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleCardClick = (index) => {
    setSelectedImageIndex(index + 1); // Increment index by 1 to start from index 1
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const navigate = useNavigate();
  const { id: eventodinId } = useParams();
  const [albumDetails, setAlbumDetails] = useState(null);
  const [inscriptions, setInscriptions] = useState([]);
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const userId = storedUserData ? storedUserData.id : null;
  const [isUserPreinscribed, setIsUserPreinscribed] = useState(false); // Add this line

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        const response = await fetch(
          `${Config.LOCAL_URL}/api/eventodin/${eventodinId}`
        );

        const result = await response.json();

        if (result.message === "done" && result.data) {
          setAlbumDetails(result.data);
        } else {
          console.error("No data received from the API for album details");
        }
      } catch (error) {
        console.error("Error fetching album details:", error);
      }
    };

    const fetchInscriptions = async () => {
      try {
        const response = await fetch(
          `${Config.LOCAL_URL}/api/inscritinfoevent`
        );

        const result = await response.json();

        if (Array.isArray(result) && result.length > 0) {
          setInscriptions(result);
          const userPreinscribed = result.find(
            (inscription) =>
              inscription.userId == userId &&
              inscription.eventodinId == eventodinId
          );

          if (userPreinscribed) {
            setIsUserPreinscribed(true);
          }
        } else {
          console.error("No data received for inscriptions");
        }
      } catch (error) {
        console.error("Error fetching inscriptions:", error);
      }
    };

    fetchAlbumDetails();
    fetchInscriptions();
  }, [eventodinId, userId]);

  if (!albumDetails) {
    return <div>Loading...</div>;
  }

  const handleAlbumButtonClick = () => {
    navigate(`/FormEvent/${eventodinId}`);
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    // Format the date object into the desired format
    return dateObject.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const id = storedUserData.id ? storedUserData.id : null;

  const userProfileType = storedUserData ? storedUserData.profil : null;

  const shouldHideForProfiles = ["other", "player"];
  const shouldShowAgentItem = ["player"].includes(userProfileType);

  const shouldShowForProfile = !shouldHideForProfiles.includes(userProfileType);

  return (
    <>
      <Header />

      <div className="flex flex-col pb-12    mt-0 lg:mt-8 bg-zinc-100">
        <div className="self-center md:mt-20  w-full max-w-[1344px]  max-md:max-w-full">
          <div className="flex max-md:flex-col max-md:gap-0">
            {/* left menu */}
            <LeftMenu
              id={id}
              classothercomponent={true}
              shouldShowAgentItem={shouldShowAgentItem}
              shouldShowForProfile={shouldShowForProfile}
              setEventTogglerIsOpenned={setEventTogglerIsOpenned}
              eventTogglerIsOpenned={eventTogglerIsOpenned}
              user={user}
              userProfileType={userProfileType}
            />

            {/* left menu */}

            <div className="flex flex-col md:px-0 px-3 ml-5 mr-7 mt-20 md:mt-2 w-[76%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-6 max-md:max-w-full">
                <div className="justify-between px-8 py-6  bg-white rounded-xl max-md:px-5 max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col  max-md:gap-0:">
                    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
                      <Link to="/defaultgroupEvents">
                        <button className="w-full bg-orange-400 md:hidden rounded-full flex items-center justify-center py-2 mb-3">
                          <svg
                            width={20}
                            height={21}
                            viewBox="0 0 20 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_2249_46735)">
                              <path
                                d="M14.9341 19.3598C14.9338 19.0284 14.8019 18.7107 14.5674 18.4765L8.17408 12.0831C7.98057 11.8897 7.82706 11.66 7.72233 11.4072C7.6176 11.1544 7.56369 10.8834 7.56369 10.6098C7.56369 10.3362 7.6176 10.0652 7.72233 9.81241C7.82706 9.55962 7.98057 9.32993 8.17408 9.13646L14.5591 2.7473C14.7868 2.51154 14.9128 2.19579 14.9099 1.86804C14.9071 1.5403 14.7756 1.22678 14.5439 0.995023C14.3121 0.763263 13.9986 0.631802 13.6708 0.628954C13.3431 0.626105 13.0273 0.752098 12.7916 0.979796L6.40658 7.36396C5.54805 8.22418 5.06588 9.38988 5.06588 10.6052C5.06588 11.8206 5.54805 12.9862 6.40658 13.8465L12.7999 20.2398C12.9745 20.4145 13.1969 20.5335 13.439 20.5819C13.6812 20.6304 13.9323 20.606 14.1606 20.5118C14.3889 20.4177 14.5842 20.258 14.7219 20.053C14.8595 19.848 14.9334 19.6068 14.9341 19.3598Z"
                                fill="white"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_2249_46735">
                                <rect
                                  width={20}
                                  height={20}
                                  fill="white"
                                  transform="matrix(-1 0 0 1 20 0.609375)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                          <span className=" text-white">
                            {" "}
                            Revenir aux Events
                          </span>
                        </button>
                      </Link>
                      <img
                        loading="lazy"
                        src={albumDetails.ImagesAlbumevents[0]?.image_url}
                        className="grow w-full aspect-[0.7] mt-0 object-cover max-md:mt-10"
                      />
                    </div>
                    <div className="flex flex-col ml-5 w-[67%] p-0 max-md:ml-0 max-md:w-full">
                      <div className="flex flex-col grow mt-0 text-base text-zinc-900 max-md:mt-10 max-md:max-w-full">
                        <div className="text-3xl font-bold text-break max-md:max-w-full">
                          {albumDetails.album_name}
                        </div>
                        <div className="mt-4 font-light text-break max-md:max-w-full">
                          {albumDetails.description}
                        </div>

                        <div className="flex gap-2 justify-between py-3  mt-4 whitespace-nowrap rounded-xl border border-solid border-neutral-200 max-md:flex-wrap max-md:max-w-full">
                          <div className="flex flex-col flex-1">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/28072299919cd6610830b1b847db76fa736c975769fafa1e967a25837aa2c386?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="self-center w-5 aspect-square"
                            />
                            <div className="flex items-center justify-center mt-2">
                              {albumDetails.Duree}
                            </div>
                          </div>
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d8c4e34e8ff936ac4ca2f90bbfb6d639f9c40c5ad3b863ecccfae927ceb4861?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="my-auto w-px aspect-[0.04] stroke-[1px] stroke-gray-200"
                          />
                          <div className="flex flex-col flex-1">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e7fe0f54388243cde5eda2567d634e20fcaedc6593a7e131847cf26794a55f35?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="self-center w-5 aspect-square"
                            />
                            <div className="flex items-center justify-center mt-2">
                              {albumDetails.payscamps}
                            </div>
                          </div>
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d8c4e34e8ff936ac4ca2f90bbfb6d639f9c40c5ad3b863ecccfae927ceb4861?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="my-auto w-px aspect-[0.04] stroke-[1px] stroke-gray-200"
                          />
                          <div className="flex flex-col flex-1">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/545e939511a47d6db83d17be743c494bcd9b7824f609f0def7b7a0a0da2ac415?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="self-center w-5 aspect-square"
                            />
                            <div className="flex items-center justify-center mt-2">
                              {formatDate(albumDetails.date_debut)}
                            </div>
                          </div>
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d8c4e34e8ff936ac4ca2f90bbfb6d639f9c40c5ad3b863ecccfae927ceb4861?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="my-auto w-px aspect-[0.04] stroke-[1px] stroke-gray-200"
                          />
                          <div className="flex flex-col flex-1">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3d803e2aa84cc65dafa06294cf90b747ef51e660e2c45f13da33c1f8a6c4b0e?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="self-center w-5 aspect-square"
                            />

                            <div className="flex items-center justify-center mt-2">
                              {formatDate(albumDetails.date_fin)}
                            </div>
                          </div>
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1d8c4e34e8ff936ac4ca2f90bbfb6d639f9c40c5ad3b863ecccfae927ceb4861?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="my-auto w-px aspect-[0.04] stroke-[1px] stroke-gray-200"
                          />
                          <div className="flex flex-col flex-1">
                            <img
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/dff4dfbc9781a939e5690bf8f047fdfc420dbf36c9e00ec905ac56bf410a2e14?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                              className="self-center aspect-[0.9] fill-zinc-900 w-[18px] mr-3"
                            />
                            <div className="flex items-center justify-center mt-2">
                              {albumDetails.prix} €
                            </div>
                          </div>
                        </div>

                        {!isUserPreinscribed &&
                          userProfileType === "player" && (
                            <div className="flex justify-center items-center px-16 py-2 mt-4 font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5 max-md:max-w-full">
                              <div className="flex gap-2">
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4185b5905b50428887ea8bc5135f9d41832f7a4a61c88cd3baa7301b1591ace2?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                                  className="w-5 aspect-square"
                                />

                                <button
                                  className="grow"
                                  onClick={handleAlbumButtonClick}
                                >
                                  {getTranslation(
                                    `Pre-register`, // -----> Englais
                                    ` Pré-inscrire` //  -----> Francais
                                    //   ``,  //  -----> Turkey
                                    //   `` ,  //  -----> Allemagne
                                  )}
                                </button>
                              </div>
                            </div>
                          )}
                        {isUserPreinscribed && (
                          <div className="flex justify-center items-center p-4 mt-4 font-medium text-green-600 bg-green-100 rounded-md">
                            {getTranslation(
                              `You are already pre-registered!`, // -----> Englais
                              ` Vous étes deja pré-inscrit !` //  -----> Francais
                              //   ``,  //  -----> Turkey
                              //   `` ,  //  -----> Allemagne
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 mt-6 max-md:max-w-full">
                  <div className="flex flex-wrap gap-1">
                    {albumDetails.ImagesAlbumevents.slice(1).map(
                      (image, index) => (
                        <div
                          key={index}
                          className="ml-3 w-[45%] md:w-[30%] lg:w-[30%]"
                        >
                          <img
                            loading="lazy"
                            src={image.image_url}
                            className="w-full aspect-square "
                            onClick={() => handleCardClick(index)}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="custom-modalCamps" // Add the desired class name
        style={{
          content: {
            overflow: "hidden", // Hide scroll
            position: "absolute",
            top: "50%", // Center vertically
            left: "50%", // Center horizontally
            width: modalWidth,
            height: modalHeight,
            margin: "0", // Remove default margin
            padding: "0", // Remove default padding
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)", // Add overlay color
          },
        }}
      >
        <button onClick={closeModal}>Close Modal</button>
        {albumDetails.ImagesAlbumevents[selectedImageIndex] && (
          <img
            loading="lazy"
            src={albumDetails.ImagesAlbumevents[selectedImageIndex].image_url}
            alt={`Image ${selectedImageIndex}`}
            style={{
              width: "100%", // Set width to 100% for responsiveness
              height: "100%", // Set height to 100% for responsiveness
              objectFit: "contain", // Maintain aspect ratio and cover the container
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: "1%",
            cursor: "pointer",
          }}
          onClick={() =>
            setSelectedImageIndex((prevIndex) => Math.max(prevIndex - 1, 0))
          }
        >
          <p className="bg-amber-500 text-white p-2 rounded-full text-2xl">
            {" "}
            {`<`}
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            right: "1%",
            cursor: "pointer",
          }}
          onClick={() =>
            setSelectedImageIndex((prevIndex) =>
              Math.min(prevIndex + 1, albumDetails.ImagesAlbumcamps.length - 1)
            )
          }
        >
          <p className="bg-amber-500 text-white p-2 rounded-full text-2xl ">
            {" "}
            {`>`}
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Album;
