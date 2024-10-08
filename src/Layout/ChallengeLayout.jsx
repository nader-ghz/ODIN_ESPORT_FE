import React from "react";
import HomeLayout from "./HomeLayout";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useEffect } from "react";

import { Config } from "../config";
import LeftMenu from "../components/LeftMenu";

import secureLocalStorage from "react-secure-storage";


const ChallengeLayout = ({ children }) => {


  // for left slide barre ---------------------------------
  const [user, setUser] = useState([]);

  useEffect(() => {
    const storedUserDatad = JSON.parse(
      secureLocalStorage.getItem("cryptedUser")
    );
    const storedUserData = JSON.parse(localStorage.getItem("Secret"));
    const tokenn = storedUserData?.token;

    if (storedUserData) {
      fetch(`${Config.LOCAL_URL}/api/user/${storedUserDatad.id}` , {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenn}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          setUser(userData);
          console.log("user offre", user)
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }


  }, []);

  const storedUserData = JSON.parse(secureLocalStorage.getItem("cryptedUser"));


  const id = storedUserData.id ? storedUserData.id : null;

  const userProfileType = storedUserData ? storedUserData.profil : null;

  const shouldHideForProfiles = ["other", "player"];
  const shouldShowAgentItem = ["player"].includes(userProfileType);

  const shouldShowForProfile = !shouldHideForProfiles.includes(userProfileType);

  const [eventTogglerIsOpenned, setEventTogglerIsOpenned] = useState(false);

  // left slide barre ------------------------------




  return (
    <div className="flex mt-[100px] gap-4">
      
      {/* left menu */}
      <LeftMenu id={id} shouldShowAgentItem={shouldShowAgentItem} shouldShowForProfile={shouldShowForProfile} setEventTogglerIsOpenned={setEventTogglerIsOpenned}  eventTogglerIsOpenned={eventTogglerIsOpenned}  user={user} userProfileType={userProfileType} />
      {/* left menu */}










      <div className="grid grid-cols-1 md:grid-cols-3 grow gap-y-2 md:gap-x-4 md:gap-y-4">
        {children}
      </div>
    </div>
  )

}
export default ChallengeLayout