import React, { useState, useEffect, useContext } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { Config } from "../../config";
import Header from "../../components/Header2";
import { Context } from "../../index";
import secureLocalStorage from "react-secure-storage";
import { AuthContext } from "../../AuthContext";

const Album = () => {
  const { checkTokenExpiration } = useContext(AuthContext);

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  const [isActive, setIsActive] = useState(false);
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

  const [album, setAlbum] = useState([]);
  const [users, setUsers] = useState([]);
  const { id } = useParams();

  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    setSelectedCard(id);
    // Navigate to the details page with the selected card's id
    navigate(`/defaultgroupevent/${id}`);
  };
  useEffect(() => {
    const storedUserData = JSON.parse(
      secureLocalStorage.getItem("cryptedUser")
    );
    const userId = storedUserData ? storedUserData.id : null;

    const fetchAlbums = async () => {
      try {
        const storedUserDataa = JSON.parse(localStorage.getItem("Secret"));
        const tokenn = storedUserDataa?.token;
        const response = await fetch(`${Config.LOCAL_URL}/api/albumevent`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenn}`,
          },
        });
        const result = await response.json();

        // Convert id to a number before filtering
        const numericId = parseInt(id, 10);

        // Filter out the current camp based on the numeric id from useParams
        const filteredAlbums = result.data.filter(
          (value) => value.id !== numericId
        );

        setAlbum(filteredAlbums);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchAlbums();
  }, [id]); // Include id in the dependency array to re-run the effect when id changes

  return (
    <>
      <Header />

      <div className="flex flex-col items-center pb-9 bg-zinc-100">
        <div className="flex justify-center items-center mx-4 md:mx-0 md:px-10 py-10 mt-24  md:mt-24 w-full bg-white rounded-xl">
          <div className="w-full max-w-[1120px]">
            <div className="flex flex-col md:flex-row-reverse gap-5">
              <div className="flex flex-col w-full md:w-2/5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a73a658e3d0a306d0d38890df623257c0eab42a02ed66c047d387e840dcd7be?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="grow w-full aspect-[0.79]"
                />
              </div>

              <div className="flex flex-col w-full md:w-3/5">
                <div className="flex flex-col self-stretch my-auto text-base">
                  <div className="text-2xl text-center md:text-4xl font-bold text-blue-600">
                    THANK YOU!
                  </div>
                  <div className="text-zinc-900 md:px-0 px-3">
                    {getTranslation(
                      `Your pre-registration for the soccer event is recorded! Don't forget to check your emails for the final confirmation. We look forward to seeing you on the field!`, // -----> Englais
                      `Votre préinscription a l'evennemnt de soccer est enregistrée! N'oubliez pas de vérifier vos e-mails pour la confirmation finale. Nous avons hâte de vous retrouver sur le terrain!` //  -----> Francais
                    )}{" "}
                  </div>
                  <div className="flex gap-4 items-center flex-1 justify-center mx-2 px-8 py-2 mt-6 font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] ">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9cb7dcd8e4198fc85a3fd9f3a4a89f77f8d22cc38535f84baf50f8089f909e1?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                      className="w-5 aspect-square fill-white"
                    />
                    <Link to="/home">
                      <div className="flex items-center justify-center flex-1 md:mr-0">
                        {getTranslation(
                          `Back to home`, // -----> Englais
                          `Revenir au page d’accueil` //  -----> Francais
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center px-4 md:px-0 mt-6 w-full bg-white rounded-xl shadow-sm">
          <div className="flex flex-col w-full max-w-[1115px]">
            <div className="flex gap-5 justify-between pt-4">
              <div className="flex-auto text-lg ml-2 md:text-3xl font-bold text-zinc-900">
                {getTranslation(
                  ` Events that might interest yous`,
                  `Evènement qui pourraient vous intéresser`
                )}
              </div>
            </div>
            <div className="px-2 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {album.map((value, index) => (
                  <div key={index} className="flex flex-col">
                    <div
                      onClick={() => handleCardClick(value.id)}
                      className="flex flex-col grow items-center pb-4 mx-auto w-full bg-white rounded-xl"
                    >
                      <img
                        loading="lazy"
                        srcSet={value.ImagesAlbumevents[0]?.image_url}
                        className="self-stretch w-full aspect-square rounded-t-xl object-cover"
                      />
                      <div className="mt-4 text-break font-semibold text-zinc-900">
                        {value.album_name}
                      </div>
                      <div className="flex justify-between mt-1 px-2 max-w-full text-xs font-light whitespace-nowrap text-zinc-900 w-[282px]">
                        <div className="flex gap-2">
                          <div className="grow">{value.date_debut}</div>
                          <div>-</div>
                          <div className="grow">{value.date_fin}</div>
                        </div>
                        <div>{value.payscamps}</div>
                      </div>
                      <div
                        className="text-left mt-2 font-sans text-sm leading-loose h-"
                        dangerouslySetInnerHTML={{
                          __html: value.description.slice(0, 100) + "...",
                        }}
                      />
                      <div className="flex gap-5 px-2 justify-between mt-2 max-w-full w-[282px]">
                        <div className="flex flex-col whitespace-nowrap text-zinc-900">
                          <div className="text-xs font-light">
                            {getTranslation(`Price`, `Prix`)}
                          </div>
                          <div className="mt-1 text-base font-semibold">
                            {value.prix}
                          </div>
                        </div>
                        <div className="flex justify-center items-center p-3 bg-blue-600 rounded-xl aspect-[1.13]">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/688459f573915c74266dcb5eb0235120d7e93fd088c5102dd26fe0420b9723d9?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                            className="w-5 h-3 aspect-[1.33] fill-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Album;
