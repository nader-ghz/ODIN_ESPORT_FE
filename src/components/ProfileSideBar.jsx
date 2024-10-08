import React from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import { Context } from "../index";
import secureLocalStorage from "react-secure-storage";
import { Config } from "../config";

const ProfileSideBar = () => {
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

  const handleLogout = async () => {
    try {
      // Send a request to the backend to logout and clear cookies
      const response = await fetch(`${Config.LOCAL_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include", // Include credentials to handle cookies
      });

      // Check if the response is successful
      if (response.ok) {
        // Clear the authentication token from localStorage
        localStorage.removeItem("Secret");
        secureLocalStorage.removeItem("cryptedUser");

        // Redirect to the login page or another route
        Navigate("/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };
  return (
    <div className="flex-col px-4 py-5 mt-4 w-full bg-white rounded-xl text-zinc-900 hidden md:flex">
      {/* <div className="text-blue-600">Informations Personnelles</div> */}
      <Link to="/accountinformation" className="mt-4">
        {getTranslation(
          `Personal Information`, // -----> Englais
          `Information Personnelle` //  -----> Francais
        )}
      </Link>
      <div className="shrink-0 mt-4 h-px bg-blue-100" />
      <Link to="/informationProfile" className="mt-4">
        {getTranslation(
          `Profile Information`, // -----> Englais
          `Information du Profil` //  -----> Francais
        )}
      </Link>
      <div className="shrink-0 mt-4 h-px bg-blue-100" />
      <Link to="/parametrecompte" className="mt-4">
        {getTranslation(
          `Account Sittings`, // -----> Englais
          `Paramètres du Compte` //  -----> Francais
        )}
      </Link>
      <div className="shrink-0 mt-4 h-px bg-blue-100" />
      <Link to="/social" className="mt-4">
        {getTranslation(
          `Social Media`, // -----> Englais
          `Réseaux Sociaux` //  -----> Francais
        )}
      </Link>
      <div className="shrink-0 mt-4 h-px bg-blue-100" />
      <div className="flex gap-4 justify-between px-3.5 py-2 mt-2 text-orange-500 whitespace-nowrap">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cded10bad9b00bba1f301a02f5bfc764d8bff607a7af5b3849d13ad9750d0472?"
          className="w-5 aspect-square"
        />
        <button type="submit" onClick={handleLogout} className="flex-auto">
          {getTranslation(
            `Log Out`, // -----> Englais
            `Déconnexion` //  -----> Francais
          )}
        </button>
      </div>
    </div>
  );
};
export default ProfileSideBar;
