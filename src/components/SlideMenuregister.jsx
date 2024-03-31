import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import UserImage from "../assets/placeholder.jpg"
const SlideMenu = ({ setIsActive, setHumberger, Hamburger }) => {
  const [expanded, setExpanded] = useState(false);
  const [lang, setLang] = useState('Français')
  const [user, setUser] = useState({})
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    // Replace the API endpoint with your actual endpoint for fetching user data
    fetch(`http://localhost:5000/api/user/${storedUserData.id}`)
      .then((response) => response.json())
      .then((userData) => {
        console.log(user)
        setUser(userData.user)
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [])
  const toggleLanguage = () => {
    if (lang === 'Français') {
      setLang('English')
    } else {
      setLang('Français')
    }
  }
  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  const navigate = useNavigate();
  // Logout function
  const handleLogout = () => {
    // Clear the authentication token from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    // Update the authentication state to false
    // Redirect to the login page or another route
    navigate("/login");
  };

  // const [Hamburger, setHumberger] = useState(false);

  const handleClickHamburger = () => {
    setHumberger(!Hamburger);
    // Start animation for rectangle 1
    if (Hamburger === true) {
      rect1Ref.current.classList.remove("animate-rect1");
      rect2Ref.current.classList.remove("animate-rect2");
      rect3Ref.current.classList.remove("animate-rect3");
    } else {
      rect1Ref.current.classList.add("animate-rect1");
      rect2Ref.current.classList.add("animate-rect2");
      rect3Ref.current.classList.add("animate-rect3");
    }
  };
  const rect1Ref = useRef(null);
  const rect2Ref = useRef(null);
  const rect3Ref = useRef(null);
  return (
    <>
      <div className="relative flex justify-end">
       
      <div className="md:hidden">
                  <svg
                    width="60"
                    height="50"
                    viewBox="0 0 60 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleClickHamburger}
                  >
                    <rect
                      ref={rect1Ref}
                      width="59.0909"
                      height="4.54545"
                      rx="2.27273"
                      fill="#000000"
                    />
                    <rect
                      ref={rect2Ref}
                      y="22.7272"
                      width="59.0909"
                      height="4.54545"
                      rx="2.27273"
                      fill="#000000"
                    />
                    <rect
                      ref={rect3Ref}
                      y="45.4546"
                      width="59.0909"
                      height="4.54545"
                      rx="2.27273"
                      fill="#000000"
                    />
                  </svg>
                </div>

      </div>
    </>
  )
}
export default SlideMenu