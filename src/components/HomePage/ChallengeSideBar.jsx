import React, { useEffect, useState } from "react";
import Friends from "../Friends";
import { Context } from "../../index";
import Events from "../Events";
import ChallengeSideBarItem from "./ChallengeSideBarItem";
import { Config } from "../../config";
import secureLocalStorage from "react-secure-storage";


const ChallengeSideBar = () => {

    const [challenges, setChallenges] = useState([])
    const { _currentLang, _setLang, getTranslation } = React.useContext(Context);
    const storedUserDatad = JSON.parse(
        secureLocalStorage.getItem("cryptedUser")
      );
      const storedUserData = JSON.parse(localStorage.getItem("Secret"));
      const tokenn = storedUserData?.token;
    const fetchChallenges = async () => {
        const response = await fetch(`${Config.LOCAL_URL}/api/challenges`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${tokenn}`,

            },
            // credentials: 'include',
        })
        const result = await response.json()
        setChallenges(result.challenges)
    }
    useEffect(() => {
        fetchChallenges()
    }, [])
    return (
        <>
            <div className="w-100 rounded-md border-0 mb-3">
                <div className="d-flex align-items-center py-4">
                    <h4 className=" mb-0 pr-9 font-bold text-lg text-grey-900 ">
                        {getTranslation(
                            `Requests`, // -----> Englais
                            `Challenge qui pourraient vous intéresser` //  -----> Francais
                        )}
                    </h4>
                    <a
                        href="/challenges"
                        className="text-nowrap ms-auto text-sm font-medium text-blue-600"
                    >
                        {getTranslation(
                            `See All`, // -----> Englais
                            `Voir Tout` //  -----> Francais
                        )}
                    </a>
                </div>
                <div className="flex flex-col gap-y-3">
                {challenges?.slice(0, 2).map((item) => {
                    return(<ChallengeSideBarItem item={item}/>)
                })}
                </div>



            </div>
        </>
    )


}
export default ChallengeSideBar