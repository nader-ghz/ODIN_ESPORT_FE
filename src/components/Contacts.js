import React, { Component, useEffect, useState } from "react";
import { Config } from "../config";
import secureLocalStorage from "react-secure-storage";

function Contacts() {
  const [userpf, setUserpf] = useState(null);
  const [suggestedFriends, setSuggestedFriends] = useState([]);

  const storedUserData = JSON.parse(secureLocalStorage.getItem("cryptedUser"));

  useEffect(() => {
    const userId = JSON.parse(secureLocalStorage.getItem("cryptedUser"))?.id;

    if (userId) {
      fetch(`${Config.BASE_URL} /api/user/${userId}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setUserpf(data);
        })
        .catch((error) => console.error("Error fetching user info:", error));
    }
    const fetchSuggestedFriends = async () => {
      try {
        const userId = storedUserData.id;
        const response = await fetch(
          `${Config.LOCAL_URL}/${userId}/suggest/random`
        );
        const data = await response.json();
        setSuggestedFriends(data);
      } catch (error) {
        console.error("Error fetching suggested friends:", error);
      }
    };

    fetchSuggestedFriends();
  }, []);
  return (
    <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
      <div className="card-body d-flex align-items-center p-4">
        <h4 className="fw-700 mb-0 font-xssss text-grey-900">Confirm Friend</h4>
        <a
          href="/defaultmember"
          className="fw-600 ms-auto font-xssss text-primary"
        >
          See all
        </a>
      </div>
      {suggestedFriends?.map((friend) => (
        <div
          key={friend.id}
          className="card-body bg-transparent-card d-flex p-3 bg-greylight ms-3 me-3 rounded-3 mb-3"
        >
          <figure className="avatar me-2 mb-0">
            <img
              src={friend.image}
              alt="avater"
              className="shadow-sm rounded-circle w-16 h-16"
            />
          </figure>
          <h4 className="fw-700 text-grey-900 font-xssss mt-2">
            {friend.nom}{" "}
          </h4>
          <a
            href="/defaultmember"
            className="btn-round-sm bg-white ms-auto mt-2"
          >
            <span className="feather-chevron-right font-xss text-grey-900"></span>
          </a>
        </div>
      ))}
    </div>
  );
}

export default Contacts;
