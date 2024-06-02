import React, { Component, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import Darkbutton from "../components/Darkbutton";
import Logo from "../assets/ODIN22.png";
import SlideMenu from "./SlideMenu";
import "../components/Hamburger.css";
import campImg from "../assets/campImg.png"
import challengeImg from "../assets/challengeImg.png"
import eventImg from "../assets/challengeImg.png"

import noNot from "../assets/noNot.png";
import SelfNot from "./selfNotification";

import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Config } from "../config";
import Profilesearch from "../assets/Profilesearch.png";
import Football from "../assets/Football.png";
import Parametre from "../assets/Parametre.png";
import Userdefault from "../assets/userdefault.jpg";
import BurgerMenuLink from "./BurgerMenuLink";
import LanguageToggler from "../fixDesignComponents/languageToggler";
import { Context } from "../index";
import MobileNotification from "./MobileNotification" 
// notification importation
import gsap from "gsap";
import { io } from "socket.io-client";
import NotificationService from "../api/notification.server";
import DesktopNotification from "./DesktopNotification";
import MobileNotificationPopup from "./MobileNotificationPopup";
import DesktopNotificationPopup from "./DesktopNotificationPopup";
//end

function Header() {
  let [notificationData, setnotificationData] = useState([]);
  let [ isNotifyBlocked, setNotifyBlocked] = useState(true);
  let [activeBtn, setActiveBtn] = useState(true); 
  
  let animateRinging = () => {
    gsap.timeline()
    .to('.notifyContainer', {
      opacity: 1,
      x: 0
    })
    .to('.notifyContainer img', {
      duration: .1,
      rotate: "0deg"      
    })
    .to('.notifyContainer img', {
      duration: .1,
      rotate: "10deg"      
    })

    .to('.notifyContainer img', {
      duration: .1,
      rotate: "-10deg"   ,
    })
    .to('.notifyContainer img', {
      duration: .1,
      rotate: "10deg"      
    })
    .to('.notifyContainer img', {
      duration: .1,
      rotate: "-10deg"   ,
    })
    .to('.notifyContainer img', {
      duration: .1,
      rotate: "10deg"      
    })
    .to('.notifyContainer img', {
      duration: .1,
      rotate: "-10deg"   ,
    })
    .to('.notifyContainer img', {
      duration: .1,
      rotate: "0deg"      
    })
    .to('.notifyContainer', {
      delay: 1,
      opacity: 0,
      x: -3
    })
    .to('.notifyContainer', {
      duration: 0,
      opacity: 0,
      x: 5
    })
  }
  
  let animateBell = () =>  {
    gsap.timeline()
    
    .to('.bellImageBlueX21Notification ', {
      duration: .1,
      rotate: "0deg"      
    })
    .to('.bellImageBlueX21Notification ', {
      duration: .1,
      rotate: "10deg"      
    })

    .to('.bellImageBlueX21Notification ', {
      duration: .1,
      rotate: "-10deg"   ,
    })
    .to('.bellImageBlueX21Notification ', {
      duration: .1,
      rotate: "10deg"      
    })
    .to('.bellImageBlueX21Notification ', {
      duration: .1,
      rotate: "-10deg"   ,
    })
    .to('.bellImageBlueX21Notification ', {
      duration: .1,
      rotate: "10deg"      
    })
    .to('.bellImageBlueX21Notification ', {
      duration: .1,
      rotate: "-10deg"   ,
    })
    .to('.bellImageBlueX21Notification', {
      duration: .1,
      rotate: "0deg"      
    })

    
  }

  let notifyBrowser = () => {
    if(window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
       let lastNotificationData =  notificationData[0] 
        
        function getBodyContent() {
          if (lastNotificationData.forWichAction ==  "like") {
            return "Aimeé Ton poste."
          } 
          if (lastNotificationData.forWichAction ==  "likeComment") {
            return "Aimeé Ton commentaire " +  lastNotificationData.content.substring(0,10) + "..."  
          }
          if (lastNotificationData.forWichAction ==  "comment") {
            return "Commenteé a Ton commentaire " +  lastNotificationData.content.substring(0,10) + "..."  
          }
          if (lastNotificationData.forWichAction ==  "reply") {
            return "Repondre Ton commentaire "  +  lastNotificationData.content.substring(0,10) + "..."  
          }
          if (lastNotificationData.forWichAction ==  "AcceptRequest") {
            return "Accepté Ton  invitation."
          }
          if (lastNotificationData.forWichAction ==  "AddRequest") {
            return "Envoyeé a vous invitation."
          } 
          if (lastNotificationData.forWichAction ==  "share") {
            return "Partageé Ton poste."
          }
          if (lastNotificationData.forWichAction ==  "camp") {
            return 'Camp valable  "' + lastNotificationData.content + '"'
          }
          if (lastNotificationData.forWichAction ==  "challenge") {
            return 'Challenge valable dans "'  +  lastNotificationData.content + '"'
          } 
          if (lastNotificationData.forWichAction ==  "event") {
            return 'Odin event valable dans "'  +  lastNotificationData.content + '"'
          } 
           
          if (lastNotificationData.forWichAction ==  "likeChallenge") {
            return 'A aimé votre participation au défi ' +  lastNotificationData.content + '"'  
          }
          if (lastNotificationData.forWichAction ==  "commentChallenge") {
            return 'A commenté votre participation au défi "' +  lastNotificationData.content + '"'  
          }
          if (lastNotificationData.forWichAction ==  "voteChallenge") {
            return 'A voté votre participation au défi "' +  lastNotificationData.content + '"'  
          }
          if (lastNotificationData.forWichAction ==  "likeCommentChallenge") {
            return 'A aimé votre commentaire dans participation au défi "' +  lastNotificationData.content + '"'  
          }
        }

        function getBodyImage() {
          if (lastNotificationData.forWichAction == "share" ||
          lastNotificationData.forWichAction == "like" ||
          lastNotificationData.forWichAction == "comment" ||
          lastNotificationData.forWichAction == "reply" ||
          lastNotificationData.forWichAction == "likeComment" ||
          lastNotificationData.forWichAction == "AddRequest" ||
          lastNotificationData.forWichAction == "AcceptRequest"||
          lastNotificationData.forWichAction == "likeChallenge" ||
          lastNotificationData.forWichAction == "commentChallenge"||
          lastNotificationData.forWichAction == "voteChallenge"||
          lastNotificationData.forWichAction == "likeCommentChallenge") {
            return lastNotificationData.fromUser_image 
          }

          if (lastNotificationData.forWichAction == "camp" ) {
            return  campImg
          } 
          if (lastNotificationData.forWichAction == "challenge" ) {
            return  challengeImg
          } 
          if (lastNotificationData.forWichAction == "event" ) {
            return  eventImg
          } 
        }

        
        function getLink() {
          const url = {

            LOCAL_URL :  'http://localhost:3000',
            HOST_URL :  'https://odinesport.com/home',
        }
          if (lastNotificationData.forWichAction == "share" ||
          lastNotificationData.forWichAction == "like" ||
          lastNotificationData.forWichAction == "comment" ||
          lastNotificationData.forWichAction == "reply" ||
          lastNotificationData.forWichAction == "likeComment") {
            return  url.LOCAL_URL + "/onepost/" + lastNotificationData.postId
          }
          
          if(
          
            lastNotificationData.forWichAction == "AcceptRequest") {
              http://localhost:3000/friends
              return  url.LOCAL_URL + "/profile/" + lastNotificationData.fromUser_id
            }
            if(
              lastNotificationData.forWichAction == "AddRequest" ) {
                return  url.LOCAL_URL + "/friends/" 
              }
          if(
          lastNotificationData.forWichAction == "likeChallenge" ||
          lastNotificationData.forWichAction == "commentChallenge"||
          lastNotificationData.forWichAction == "voteChallenge"||
          lastNotificationData.forWichAction == "likeCommentChallenge") {
            return  url.LOCAL_URL + "/challenges/details/" + lastNotificationData.postId
          }
  
          if (lastNotificationData.forWichAction == "camp" ) {
            return  url.LOCAL_URL + "/defaultgroup/" 
          }    
          if (lastNotificationData.forWichAction == "challenge" ) {
            return  url.LOCAL_URL + "/challenges"
          } 
          if (lastNotificationData.forWichAction == "event" ) {
            return  url.LOCAL_URL + "/defaultgroupEvents/" 
          }  
        }
      //  let bodyContent =  lastNotificationData.fromUser_name + " " + getBodyContent()
       let bodyContent = lastNotificationData.fromUser_name + " " +  getBodyContent()

       //test data not
        // alert(JSON.stringify (lastNotificationData)) 
        let n = new Notification('ODIN E-SPORT', {  
          body: bodyContent,
          icon:  getBodyImage(),// optional
          
        }); 

        
        n.onclick =  (event) => {
          event.preventDefault(); // prevent the browser from focusing the Notification's tab
          window.open(getLink(), "_blank");
        };     
      }); 
    }
  }

  //socket
  const [socket, setSocket] = useState(null);
  //get all notifcation data 
  let getNotificationForCurrentUser =  () => {
   setTimeout( async () =>  {
    let data =
    await NotificationService.getNotificationForCurrentUser();
  setnotificationData(data.reverse());

  let unReadedData = data.filter(raw => {
    if (raw.isReaded == false) return raw
  })
  setUnreadedData( unReadedData)
   }, 1000)
  };
  useEffect(() => {
    const socketInstance = io(Config.LOCAL_URL);
    setSocket(socketInstance);

    // listen for events emitted by the server

    socketInstance.on("connect", () => {
      console.log("Connected to server");
    });
 
    socketInstance.on("get-notification", () => {
      getNotificationForCurrentUser();

    });

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  useEffect(() => {
      getNotificationForCurrentUser();

        Notification.requestPermission()
      
       

  }, []);

  //notify
  const tone = useRef(new Audio(require('../assets/sound/simple_notif.mp3')));

  useEffect(() => {

    setTimeout(() => {
      setNotifyBlocked(false)
    }, 6000)
    if (!isNotifyBlocked && notificationData.length != 0) {
      // animateRinging()
      animateBell() 
      notifyBrowser()
      tone.current.play(); 

    }
  }, [notificationData.length])

  // all & unread filtrage notification


  //delete notification by id
  let deleteNotData = (id) => {
    NotificationService.deleteNotificationById(id);
    setnotificationData(
      notificationData.filter((not) => {
        return not.id != id;
      })
    );
  };
  const iconImages = {
    Profilesearch,
    Football,
    Parametre,
    // Add other icon-image mappings here
  };
  const handleClick = () => {
    // Use setState to update showMenu
    this.setState((prevState) => ({
      showMenu: !prevState.showMenu,
    }));
  };
  // Fetch user information based on the id from localStorage
  const storedUserData = JSON.parse(localStorage.getItem("user"));
  const [isOpen, setIsOpen] = useState(null);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
const [UnreadedData, setUnreadedData] = useState([])
  const { _currentLang, _setLang, getTranslation } = React.useContext(Context);

  const [isActive, setIsActive] = useState(null);
  const [isNoti, setisNoti] = useState(null);
  const location = useLocation();
  useEffect(() => {
    setHumberger(false);
  }, [location]);

  useEffect(() => {
    // Replace the API endpoint with your actual endpoint for fetching user data
    fetch(`${Config.LOCAL_URL}/api/user/${storedUserData.id}`)
      .then((response) => response.json())
      .then((userData) => {
        setUser(userData);
        console.log("user from header3", user);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  useEffect(() => {
    fetch(`${Config.LOCAL_URL}/api/AllTarget`)
      .then((response) => response.json())
      .then((data) => {
        setSearch(data);
      })
      .catch((error) => console.error("Error fetching data:", error));

    // Fetch users
    fetch(`${Config.LOCAL_URL}/api/user`)
      .then((response) => response.json())
      .then((userData) => {
        setUsers(userData);
        console.log("🚀 ~ .then ~ userData:", userData);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleSearch = (event) => {
    const searchString = event.target.value;
    setSearchTerm(searchString);
    if (searchString.trim() === "") {
      setSearchResults([]);
    } else {
      const filteredTargets = search
        .filter(
          (item) =>
            item.titre.toLowerCase().startsWith(searchString.toLowerCase()) ||
            item.titre.toLowerCase().includes(searchString.toLowerCase())
        )
        .map((target) => ({ ...target, origin: "Page" })); // Adding origin property to filtered targets

      const filteredUsers = users
        .filter(
          (user) =>
            user?.user?.nom
              .toLowerCase()
              .startsWith(searchString.toLowerCase()) ||
            user?.user?.nom.toLowerCase().includes(searchString.toLowerCase())
        )
        .map((user) => ({ ...user.user, origin: "Personne" })); // Adding origin property to filtered users

      setSearchResults([...filteredTargets, ...filteredUsers]);
    }
  };

  const toggleActive = () => setIsOpen(!isActive);
  const toggleisNoti = () => setisNoti(!isNoti);
  const navClass = `${isOpen ? " nav-active" : ""}`;
  const buttonClass = `${isOpen ? " active" : ""}`;
  const searchClass = `${isActive ? " show" : ""}`;
  const notiClass = `${isNoti ? " show" : ""}`;
  // const userProfileType = storedUserData ? storedUserData.profil : null;

  // const shouldHideForProfiles = ["other", "player"];
  // const shouldShowAgentItem = ["player", "other"].includes(userProfileType);

  // const shouldShowForProfile = !shouldHideForProfiles.includes(userProfileType);

  const id = storedUserData.id ? storedUserData.id : null;

  const userProfileType = storedUserData ? storedUserData.profil : null;

  const shouldHideForProfiles = ["other", "player"];
  const shouldShowAgentItem = ["player"].includes(userProfileType);

  const shouldShowForProfile = !shouldHideForProfiles.includes(userProfileType);
  const [Hamburger, setHumberger] = useState(false);
  const [mobileNotificationPopUpContainer, setMobileNotificationPopUpContainer] = useState(false);
  
  const handleClickHamburger = () => {
    setHumberger(!Hamburger);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    // Update the authentication state to false

    // Redirect to the login page or another route
    navigate("/login");
  };

 
  return (
    <>
      <div
        className={`w-full dark-bg fixed z-50 shadow-xs ${
          Hamburger || mobileNotificationPopUpContainer ? "fixed top-0 h-screen overflow-hidden z-50" : ""
        }`}
      >
        {" "}
        <div className="max-sm:px-4 max-w-[1280px] h-[80px] w-full dark-bg  border-0 flex items-center justify-between mx-auto py-2 ">
          <div className="flex flex-row">
            <a href="/home" className="mt-3">
              {/* <svg
                className="odinLightLogo"
                width="209"
                height="53"
                viewBox="0 0 209 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_983_61844)">
                  <path
                    d="M66.8102 14.0668V52.3118H40.5283L38.1046 47.5324L35.7149 42.7481L33.3204 37.9687L30.9307 33.1893L33.3204 28.4099L35.7149 23.6256L38.1046 18.8656L40.5283 14.0668H66.8102ZM42.9034 18.8656L40.5283 23.6256L38.1046 28.4099L35.7149 33.1893L38.1046 37.9687L40.4943 42.7481L42.884 47.5324H62.0066V18.8656H42.9034Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M26.2965 14.0668L28.6862 18.8462L31.0759 23.6256L33.4656 28.4099L35.8601 33.1893L33.4656 37.9687L31.0759 42.7481L28.6862 47.5324L26.2965 52.3118H0V14.0668H26.2965ZM4.78426 18.8656V47.5518H23.9068L26.2965 42.7675L28.6862 37.9881L31.0759 33.2087L28.6862 28.4292L26.2965 23.645L23.9068 18.8656H4.78426Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M73.1696 0H68.3369V4.60491H73.1696V0Z"
                    fill="#FF7F00"
                  />
                  <path
                    d="M80.5764 29.1129C79.5627 29.1388 78.5564 28.9332 77.6341 28.5118C76.8426 28.1445 76.1399 27.6104 75.574 26.9461C75.0476 26.3249 74.6342 25.6162 74.3525 24.8521C74.0952 24.1566 73.9591 23.4221 73.9502 22.6805V22.3024C73.9549 21.5218 74.0943 20.7478 74.3622 20.0145C74.6438 19.2285 75.0825 18.508 75.6517 17.8972C76.2209 17.2863 76.9087 16.7978 77.6729 16.4615C79.5284 15.716 81.6002 15.716 83.4557 16.4615C84.2212 16.7958 84.9099 17.2837 85.4794 17.8948C86.0488 18.5059 86.4869 19.2274 86.7664 20.0145C87.0369 20.7471 87.1764 21.5215 87.1784 22.3024V22.6805C87.1719 23.4223 87.0357 24.1572 86.7761 24.8521C86.4981 25.6169 86.0861 26.3259 85.5594 26.9461C84.9926 27.6094 84.2901 28.1433 83.4993 28.5118C82.5834 28.9318 81.5837 29.1374 80.5764 29.1129ZM80.5764 26.8492C81.1679 26.858 81.7546 26.7407 82.2972 26.505C82.7973 26.2807 83.2423 25.9499 83.6011 25.5356C83.9632 25.1296 84.2431 24.6571 84.4252 24.1444C84.6168 23.6145 84.7136 23.055 84.7112 22.4915C84.7169 21.9009 84.6201 21.3137 84.4252 20.7562C84.2474 20.2472 83.9669 19.7803 83.6011 19.3844C83.235 18.9906 82.7887 18.6798 82.2923 18.4731C81.1827 18.0399 79.9507 18.0399 78.8411 18.4731C78.344 18.6811 77.8964 18.9916 77.5275 19.3844C77.1633 19.7815 76.883 20.2481 76.7034 20.7562C76.5102 21.314 76.415 21.9011 76.4223 22.4915C76.4182 23.0547 76.5134 23.6142 76.7034 24.1444C76.8874 24.6562 77.167 25.1283 77.5275 25.5356C77.8898 25.9502 78.3381 26.281 78.8411 26.505C79.3888 26.7407 79.9802 26.858 80.5764 26.8492Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M89.5293 28.8558V16.1753H91.9529V28.8558H89.5293ZM91.6233 28.8558V26.5921H94.2118C94.8071 26.6017 95.3989 26.4998 95.9568 26.2916C96.4443 26.1054 96.8858 25.816 97.251 25.4433C97.6071 25.0713 97.8841 24.6311 98.0653 24.1491C98.2607 23.6185 98.3576 23.0567 98.3513 22.4913C98.3596 21.9147 98.2627 21.3414 98.0653 20.7996C97.8873 20.3217 97.6098 19.8872 97.251 19.5248C96.8849 19.1624 96.4428 18.8859 95.9568 18.7153C95.3947 18.5266 94.8046 18.4348 94.2118 18.4438H91.6233V16.1753H94.0469C95.0573 16.1518 96.0632 16.3162 97.0135 16.66C97.8063 16.9568 98.5255 17.4215 99.122 18.0221C99.6753 18.5873 100.106 19.2606 100.387 19.9998C100.663 20.7309 100.805 21.5061 100.804 22.2877V22.6658C100.802 23.4282 100.661 24.1839 100.387 24.8955C100.086 25.6646 99.6294 26.363 99.0455 26.9469C98.4615 27.5309 97.7631 27.9877 96.9941 28.2886C96.051 28.6634 95.0421 28.8447 94.0276 28.8218L91.6233 28.8558Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M103.058 28.7879V16.2626H105.482V28.7879H103.058Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M108.593 28.7879V16.2626H112.587L117.856 26.7618H118.424L118.079 27.072V16.2626H120.377V28.7879H116.363L111.094 18.2887H110.513L110.857 17.9785V28.7879H108.593Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M74.687 49.4034V36.8538H77.0767V49.4034H74.687ZM76.7326 38.9332V36.878H82.273V38.9332H76.7326ZM76.7326 44.0665V42.0064H81.9628V44.0665H76.7326ZM76.7326 49.3985V47.319H82.4087V49.4034L76.7326 49.3985Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M89.0832 49.704C88.1201 49.7321 87.1624 49.5502 86.2767 49.1708C85.5699 48.8618 84.9661 48.3573 84.5365 47.7166C84.1341 47.0841 83.9252 46.3479 83.9354 45.5984H86.3203C86.3229 45.9406 86.4184 46.2756 86.5966 46.5678C86.8049 46.9077 87.113 47.1752 87.4788 47.3337C87.9858 47.5471 88.5336 47.6464 89.0832 47.6245C89.593 47.6394 90.1007 47.5521 90.5762 47.3676C90.9316 47.2302 91.2409 46.9949 91.4681 46.689C91.6655 46.4049 91.7674 46.0654 91.7589 45.7195C91.7625 45.5075 91.7129 45.2979 91.6147 45.11C91.5165 44.922 91.3728 44.7616 91.1967 44.6434C90.6638 44.3363 90.0617 44.1695 89.4468 44.1587L88.3465 44.0715C87.2896 44.0281 86.2777 43.6322 85.472 42.9469C85.1172 42.6235 84.8375 42.2264 84.6525 41.7834C84.4674 41.3405 84.3815 40.8624 84.4008 40.3827C84.3758 39.6661 84.568 38.9587 84.952 38.3533C85.3361 37.7478 85.8941 37.2725 86.553 36.9896C87.3205 36.668 88.1444 36.5024 88.9766 36.5024C89.8088 36.5024 90.6327 36.668 91.4002 36.9896C92.0543 37.2929 92.6078 37.7774 92.995 38.3856C93.3835 39.0244 93.5804 39.7613 93.5621 40.5087H91.1772C91.1825 40.1693 91.0971 39.8347 90.93 39.5393C90.7539 39.2415 90.499 38.9983 90.1933 38.8364C89.8068 38.6448 89.3785 38.5531 88.9475 38.5698C88.5335 38.5566 88.122 38.6396 87.7454 38.8122C87.4463 38.9534 87.1952 39.1793 87.0231 39.4617C86.8653 39.7323 86.7833 40.0404 86.7856 40.3536C86.7843 40.544 86.8213 40.7327 86.8946 40.9085C86.9679 41.0842 87.0759 41.2434 87.2122 41.3764C87.5913 41.6965 88.0733 41.8687 88.5694 41.8611L89.6698 41.9629C90.4786 42.0154 91.2723 42.2072 92.0158 42.53C92.6435 42.7983 93.1865 43.2323 93.5864 43.7855C93.9697 44.3452 94.165 45.0124 94.1438 45.6905C94.1581 46.4321 93.9431 47.16 93.5282 47.7748C93.0875 48.399 92.4767 48.8836 91.7686 49.1708C90.9204 49.5337 90.0057 49.7153 89.0832 49.704Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M96.3784 49.4035V36.8005H98.8021V49.4035H96.3784ZM98.4676 45.5596V43.4462H100.891C101.325 43.4597 101.754 43.3595 102.137 43.1553C102.467 42.9683 102.735 42.6885 102.908 42.3507C103.083 41.9802 103.174 41.5754 103.174 41.1655C103.174 40.7556 103.083 40.3508 102.908 39.9804C102.735 39.6449 102.467 39.3682 102.137 39.1854C101.753 38.985 101.324 38.8866 100.891 38.8994H98.4676V36.7908H100.702C101.623 36.7642 102.537 36.9396 103.383 37.3047C104.08 37.6085 104.669 38.1152 105.074 38.7588C105.475 39.4412 105.676 40.2219 105.656 41.0128V41.2891C105.676 42.08 105.475 42.8607 105.074 43.5431C104.671 44.1938 104.082 44.7087 103.383 45.0215C102.539 45.3925 101.623 45.5713 100.702 45.545L98.4676 45.5596Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M113.552 49.7039C112.539 49.7274 111.533 49.522 110.61 49.1028C109.819 48.7321 109.117 48.1967 108.55 47.5323C108.021 46.9125 107.608 46.2034 107.328 45.4383C107.07 44.7429 106.934 44.0083 106.926 43.2667V42.8935C106.93 42.1112 107.069 41.3355 107.338 40.6007C107.614 39.8374 108.037 39.1358 108.584 38.5358C109.159 37.8995 109.863 37.3923 110.648 37.0477C112.504 36.3021 114.576 36.3021 116.431 37.0477C117.196 37.3837 117.884 37.8721 118.453 38.483C119.022 39.094 119.461 39.8145 119.742 40.6007C120.013 41.3348 120.152 42.111 120.154 42.8935V43.2667C120.148 44.0085 120.012 44.7435 119.752 45.4383C119.476 46.2041 119.064 46.9135 118.535 47.5323C117.967 48.1956 117.265 48.7309 116.475 49.1028C115.558 49.5206 114.559 49.726 113.552 49.7039ZM113.552 47.4402C114.144 47.449 114.73 47.3317 115.273 47.0961C115.773 46.8715 116.218 46.5407 116.577 46.1266C116.939 45.7224 117.219 45.2515 117.401 44.7403C117.592 44.2086 117.689 43.6476 117.687 43.0825C117.693 42.4934 117.596 41.9078 117.401 41.352C117.223 40.8416 116.943 40.3731 116.577 39.9754C116.21 39.5831 115.764 39.274 115.268 39.069C114.158 38.6358 112.926 38.6358 111.817 39.069C111.32 39.2751 110.872 39.584 110.503 39.9754C110.139 40.3743 109.858 40.8425 109.679 41.352C109.485 41.9081 109.39 42.4937 109.398 43.0825C109.394 43.6473 109.489 44.2083 109.679 44.7403C109.863 45.2506 110.143 45.7212 110.503 46.1266C110.866 46.5409 111.314 46.8716 111.817 47.0961C112.363 47.3401 112.954 47.4656 113.552 47.4645V47.4402Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M122.505 49.4035V36.8005H124.929V49.4035H122.505ZM124.221 45.2154V43.2426H127.411C127.815 43.2537 128.214 43.1584 128.569 42.9663C128.893 42.7876 129.159 42.5202 129.335 42.1956C129.523 41.8476 129.619 41.4569 129.611 41.0613C129.619 40.661 129.524 40.2655 129.335 39.9125C129.159 39.5879 128.893 39.3204 128.569 39.1418C128.214 38.9497 127.815 38.8544 127.411 38.8655H124.221V36.7909H127.154C128.047 36.7714 128.935 36.9227 129.771 37.2368C130.468 37.5004 131.064 37.9749 131.478 38.594C131.9 39.2768 132.109 40.07 132.079 40.8723V41.1486C132.111 41.9532 131.9 42.749 131.473 43.4316C131.049 44.0382 130.453 44.504 129.762 44.7695C128.929 45.0839 128.044 45.2353 127.154 45.2154H124.221ZM130.159 49.4035L126.325 43.9212H129.054L133.005 49.4035H130.159Z"
                    fill="#2E71EB"
                  />
                  <path
                    d="M133.382 38.9963V36.8538H143.077V38.9963H133.382ZM136.989 49.4034V38.6521H139.412V49.4034H136.989Z"
                    fill="#2E71EB"
                  />
                  <rect
                    x="148.288"
                    y="33.7975"
                    width="60.3486"
                    height="18.1507"
                    rx="4.48373"
                    stroke="#0D055B"
                    stroke-width="0.727092"
                  />
                  <path
                    d="M169.267 46.5707C168.724 46.5707 168.247 46.4505 167.836 46.2101C167.433 45.9696 167.115 45.6323 166.882 45.1979C166.657 44.7636 166.537 44.2634 166.521 43.6972H166.789V46.3729H166.091V37.8805H166.963V42.1267L166.626 42.9062C166.641 42.2857 166.766 41.7622 166.998 41.3356C167.239 40.9013 167.557 40.5717 167.952 40.3468C168.355 40.1219 168.813 40.0094 169.325 40.0094C169.775 40.0094 170.182 40.0947 170.546 40.2654C170.911 40.436 171.221 40.6686 171.477 40.9634C171.741 41.2581 171.939 41.5993 172.07 41.9871C172.21 42.3671 172.28 42.7704 172.28 43.197V43.3599C172.28 43.7787 172.21 44.182 172.07 44.5697C171.931 44.9498 171.729 45.291 171.466 45.5935C171.21 45.896 170.895 46.1364 170.523 46.3148C170.151 46.4854 169.732 46.5707 169.267 46.5707ZM169.174 45.8029C169.639 45.8029 170.038 45.6904 170.372 45.4655C170.705 45.2406 170.961 44.9381 171.14 44.5581C171.318 44.1781 171.407 43.7515 171.407 43.2784C171.407 42.7976 171.314 42.371 171.128 41.9987C170.95 41.6187 170.69 41.3201 170.349 41.103C170.015 40.8858 169.624 40.7772 169.174 40.7772C168.755 40.7772 168.375 40.8703 168.034 41.0564C167.692 41.2426 167.421 41.5063 167.219 41.8475C167.025 42.181 166.928 42.5765 166.928 43.0341V43.6042C166.928 44.0385 167.025 44.4224 167.219 44.7559C167.421 45.0816 167.692 45.3375 168.034 45.5237C168.375 45.7098 168.755 45.8029 169.174 45.8029ZM176.614 46.5707C176.087 46.5707 175.629 46.4815 175.242 46.3031C174.854 46.117 174.536 45.8727 174.288 45.5702C174.04 45.26 173.853 44.9149 173.729 44.5348C173.613 44.1548 173.555 43.7632 173.555 43.3599V43.197C173.555 42.8015 173.613 42.4137 173.729 42.0336C173.853 41.6536 174.04 41.3124 174.288 41.0099C174.536 40.7074 174.846 40.467 175.218 40.2886C175.598 40.1025 176.04 40.0094 176.545 40.0094C177.188 40.0094 177.723 40.1529 178.15 40.4399C178.584 40.7268 178.91 41.0952 179.127 41.545C179.344 41.9871 179.453 42.4641 179.453 42.976V43.4297H173.95V42.7549H178.848L178.627 43.0923C178.627 42.6347 178.546 42.2353 178.383 41.894C178.228 41.545 177.995 41.2736 177.685 41.0797C177.382 40.8781 177.002 40.7772 176.545 40.7772C176.064 40.7772 175.664 40.8897 175.346 41.1146C175.028 41.3395 174.788 41.6381 174.625 42.0104C174.47 42.3826 174.392 42.8053 174.392 43.2784C174.392 43.7438 174.47 44.1703 174.625 44.5581C174.788 44.9381 175.032 45.2406 175.358 45.4655C175.691 45.6904 176.11 45.8029 176.614 45.8029C177.15 45.8029 177.584 45.6827 177.917 45.4422C178.251 45.1941 178.456 44.9032 178.534 44.5697H179.348C179.271 44.9808 179.108 45.3375 178.86 45.64C178.611 45.9347 178.297 46.1635 177.917 46.3264C177.537 46.4893 177.103 46.5707 176.614 46.5707ZM183.366 46.4427C182.94 46.4427 182.571 46.3807 182.261 46.2566C181.951 46.1325 181.71 45.9231 181.54 45.6284C181.369 45.3259 181.284 44.9226 181.284 44.4185V38.276H182.121V44.5465C182.121 44.9032 182.218 45.1786 182.412 45.3724C182.606 45.5586 182.881 45.6516 183.238 45.6516H184.343V46.4427H183.366ZM180.179 40.8819V40.2188H184.343V40.8819H180.179ZM189.752 46.3729V44.5232H189.613V42.3361C189.613 41.8785 189.493 41.5295 189.252 41.2891C189.012 41.0409 188.639 40.9168 188.135 40.9168C187.903 40.9168 187.666 40.9207 187.426 40.9285C187.193 40.9362 186.968 40.9479 186.751 40.9634C186.541 40.9711 186.355 40.9828 186.192 40.9983V40.2305C186.363 40.2149 186.538 40.1994 186.716 40.1839C186.894 40.1684 187.077 40.1607 187.263 40.1607C187.457 40.1529 187.643 40.149 187.821 40.149C188.449 40.149 188.953 40.2266 189.334 40.3817C189.721 40.5368 190.004 40.7811 190.183 41.1146C190.361 41.4403 190.45 41.8747 190.45 42.4175V46.3729H189.752ZM187.67 46.5358C187.236 46.5358 186.852 46.4582 186.518 46.3031C186.185 46.148 185.925 45.9231 185.739 45.6284C185.56 45.3337 185.471 44.9769 185.471 44.5581C185.471 44.1471 185.564 43.7981 185.75 43.5111C185.944 43.2241 186.22 43.007 186.576 42.8596C186.941 42.7045 187.379 42.6269 187.891 42.6269H189.694V43.2901H187.833C187.344 43.2901 186.968 43.4103 186.704 43.6507C186.448 43.8834 186.32 44.1897 186.32 44.5697C186.32 44.9575 186.456 45.2677 186.728 45.5004C186.999 45.7253 187.367 45.8378 187.833 45.8378C188.12 45.8378 188.395 45.7874 188.659 45.6866C188.922 45.578 189.143 45.3996 189.322 45.1514C189.5 44.8955 189.597 44.5465 189.613 44.1044L189.869 44.465C189.838 44.9226 189.729 45.3065 189.543 45.6167C189.357 45.9192 189.105 46.148 188.787 46.3031C188.469 46.4582 188.096 46.5358 187.67 46.5358Z"
                    fill="#0D055B"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_983_61844">
                    <rect width="209" height="52.3118" fill="white" />
                  </clipPath>
                </defs>
              </svg> */}

              <svg
                width="86"
                height="60"
                viewBox="0 0 86 77"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M77.8128 16.125V59.9531H47.2049L44.3747 54.4746L41.5911 48.9961L38.8075 43.5519L36.0239 38.0734L38.8075 32.5949L41.5911 27.1164L44.3747 21.6608L47.2049 16.1594L77.8128 16.125ZM49.9652 21.6264L47.2049 27.082L44.3747 32.5605L41.5911 38.039L44.3747 43.5519L47.1583 49.0304L49.9419 54.509H72.2107V21.6264H49.9652Z"
                  fill="#2E71EB"
                />
                <path
                  d="M30.6312 16.125L33.4148 21.6035L36.1984 27.082L38.982 32.5605L41.7656 38.039L38.982 43.5519L36.1984 49.0304L33.4148 54.509L30.6312 59.9531H0V16.125H30.6312ZM5.56719 21.6264V54.4975H27.8476L30.6312 49.019L33.4148 43.5519L36.1984 38.0734L33.4148 32.5949L30.6312 27.1049L27.8476 21.6264H5.56719Z"
                  fill="#2E71EB"
                />
                <path
                  d="M85.2197 0H79.5942V5.27221H85.2197V0Z"
                  fill="#FF7F00"
                />
                <path
                  d="M62.2526 64.8242H15.9797C14.1593 64.8242 12.6836 66.2764 12.6836 68.0678V72.7554C12.6836 74.5468 14.1593 75.999 15.9797 75.999H62.2526C64.073 75.999 65.5486 74.5468 65.5486 72.7554V68.0678C65.5486 66.2764 64.073 64.8242 62.2526 64.8242Z"
                  stroke="#2E71EB"
                  stroke-width="0.25"
                  stroke-miterlimit="10"
                />
                <path
                  d="M30.9451 73.2142C30.6175 73.2234 30.2942 73.1399 30.0134 72.9735C29.7459 72.8229 29.5277 72.6002 29.3845 72.3317C29.2286 72.0295 29.1449 71.6963 29.1399 71.3575H29.3146V73.0881H28.8604V67.6211H29.431V70.3489L29.2098 70.8532C29.2073 70.4975 29.2954 70.1468 29.466 69.8331C29.6084 69.5708 29.8221 69.3525 30.0833 69.2028C30.3574 69.0533 30.6668 68.9782 30.9801 68.985C31.2563 68.984 31.5297 69.0386 31.7837 69.1455C32.016 69.2549 32.2223 69.4111 32.3893 69.6039C32.566 69.7903 32.6974 70.0136 32.7737 70.2572C32.868 70.5065 32.9154 70.7706 32.9135 71.0366V71.1397C32.9131 71.4055 32.8658 71.6692 32.7737 71.9191C32.6861 72.1635 32.5516 72.3892 32.3777 72.5838C32.2088 72.7796 31.998 72.9361 31.7604 73.0423C31.5053 73.1595 31.2266 73.2182 30.9451 73.2142ZM30.8753 72.7214C31.1551 72.7259 31.4303 72.6502 31.6672 72.5036C31.8816 72.3534 32.0539 72.1524 32.1681 71.9191C32.2861 71.6596 32.3457 71.3781 32.3428 71.0939C32.348 70.8094 32.2883 70.5274 32.1681 70.2687C32.0556 70.0339 31.8779 69.8352 31.6556 69.6956C31.4246 69.5454 31.152 69.4693 30.8753 69.4778C30.6155 69.4801 30.3601 69.5429 30.1299 69.6612C29.9098 69.7766 29.7279 69.9516 29.6057 70.1655C29.4711 70.3994 29.4027 70.6646 29.4078 70.9334V71.3002C29.4038 71.558 29.4723 71.8118 29.6057 72.0337C29.7313 72.245 29.9123 72.4192 30.1299 72.538C30.3601 72.6563 30.6155 72.7191 30.8753 72.7214Z"
                  fill="#2E71EB"
                />
                <path
                  d="M37.2699 73.2154C36.9605 73.2236 36.6534 73.1609 36.3731 73.032C36.1328 72.9249 35.9214 72.764 35.7558 72.5621C35.5885 72.3685 35.4654 72.1418 35.3947 71.8973C35.3108 71.6536 35.2675 71.3982 35.2666 71.1409V71.0606C35.2684 70.8072 35.3116 70.5556 35.3947 70.3157C35.4661 70.069 35.5889 69.8397 35.7553 69.6423C35.9218 69.445 36.1282 69.284 36.3614 69.1695C36.6322 69.0501 36.9266 68.9914 37.2233 68.9976C37.5966 68.9827 37.9659 69.0785 38.2831 69.2727C38.5547 69.4486 38.7722 69.6944 38.9121 69.9833C39.0615 70.2704 39.1374 70.5891 39.1334 70.9116V71.1982H35.5345V70.7627H38.7374L38.586 70.9804C38.5933 70.7166 38.5416 70.4545 38.4345 70.2125C38.3419 69.995 38.1833 69.8108 37.9803 69.6853C37.8134 69.5755 37.6237 69.5038 37.425 69.4752C37.2264 69.4466 37.0237 69.462 36.8319 69.5202C36.64 69.5784 36.4637 69.6779 36.3159 69.8115C36.168 69.9452 36.0523 70.1096 35.9771 70.2927C35.869 70.5505 35.8174 70.8278 35.8256 71.1065C35.8198 71.385 35.8713 71.6618 35.9771 71.9202C36.0752 72.1597 36.2409 72.3665 36.4546 72.5162C36.6993 72.6647 36.9824 72.7403 37.2699 72.734C37.576 72.7473 37.8783 72.6629 38.1317 72.4933C38.3283 72.3593 38.469 72.1598 38.5277 71.9317H39.0635C39.0167 72.1837 38.9071 72.4204 38.7445 72.6204C38.5819 72.8205 38.3713 72.9776 38.1317 73.0778C37.8565 73.1793 37.5636 73.226 37.2699 73.2154Z"
                  fill="#2E71EB"
                />
                <path
                  d="M41.1255 69.5484V69.1243H43.8509V69.5484H41.1255ZM43.2103 73.1357C42.9636 73.14 42.7183 73.0972 42.4882 73.0097C42.2868 72.9283 42.1187 72.7831 42.0106 72.5971C41.8921 72.3585 41.836 72.0945 41.8476 71.8292V67.875H42.395V71.9094C42.3865 72.1021 42.4532 72.2907 42.5813 72.4366C42.6556 72.5015 42.7422 72.5512 42.8362 72.5827C42.9302 72.6142 43.0297 72.6268 43.1287 72.62H43.8509V73.1357H43.2103Z"
                  fill="#2E71EB"
                />
                <path
                  d="M47.5543 73.1911C47.2943 73.1927 47.0367 73.142 46.7973 73.0421C46.5895 72.9453 46.4124 72.7947 46.2848 72.6066C46.1644 72.3971 46.104 72.1595 46.1101 71.9189C46.099 71.6799 46.1641 71.4434 46.2965 71.2427C46.4276 71.0515 46.6143 70.9037 46.8322 70.8186C47.1061 70.7115 47.3995 70.6608 47.6941 70.6696H48.8588V71.0593H47.6941C47.4288 71.0414 47.1665 71.1233 46.9603 71.2885C46.8761 71.3635 46.8096 71.4557 46.7653 71.5587C46.721 71.6616 46.7002 71.7728 46.7041 71.8845C46.6972 71.9977 46.7179 72.1108 46.7645 72.2145C46.8111 72.3182 46.8823 72.4094 46.972 72.4805C47.1762 72.641 47.433 72.7226 47.6941 72.7097C47.8778 72.7098 48.0597 72.6747 48.2298 72.6066C48.4045 72.5359 48.5543 72.4163 48.6608 72.2627C48.7901 72.0601 48.8587 71.8258 48.8588 71.5865L49.0218 71.8158C49.0099 72.0765 48.9382 72.3311 48.8122 72.5607C48.6898 72.7519 48.5166 72.9065 48.3114 73.0077C48.0764 73.1246 47.8175 73.1873 47.5543 73.1911ZM48.917 73.088V71.9418H48.8238V70.4862C48.8335 70.363 48.8167 70.239 48.7746 70.1226C48.7324 70.0061 48.6659 69.8996 48.5792 69.81C48.4821 69.7233 48.3679 69.6571 48.2437 69.6157C48.1194 69.5743 47.9878 69.5585 47.8571 69.5693H46.9487H46.5876V69.0765H46.9254H47.2864H47.6475C47.9842 69.0625 48.3204 69.1131 48.6375 69.2255C48.8759 69.3097 49.0748 69.4768 49.1965 69.6954C49.3244 69.9557 49.3844 70.2433 49.3712 70.5321V73.088H48.917Z"
                  fill="#2E71EB"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="209"
                height="53"
                viewBox="0 0 209 53"
                className="odinDarkLogo hidden opacity-0"
              >
                <defs>
                  <style
                    dangerouslySetInnerHTML={{
                      __html:
                        ".cls-1,.cls-5{fill:none;}.cls-2{clip-path:url(#clip-path);}.cls-3{fill:#fff;}.cls-4{fill:#ff7f00;}.cls-5{stroke:#fff;stroke-width:0.73px;}",
                    }}
                  />
                  <clipPath id="clip-path">
                    <rect className="cls-1" width={209} height="52.31" />
                  </clipPath>
                </defs>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <g className="cls-2">
                      <path
                        className="cls-3"
                        d="M66.81,14.07V52.31H40.53L38.1,47.53l-2.39-4.78L33.32,38l-2.39-4.78,2.39-4.78,2.39-4.78,2.39-4.76,2.43-4.8ZM42.9,18.87l-2.37,4.76L38.1,28.41l-2.39,4.78L38.1,38l2.39,4.78,2.39,4.78H62V18.87Z"
                      />
                      <path
                        className="cls-3"
                        d="M26.3,14.07l2.39,4.78,2.39,4.78,2.39,4.78,2.39,4.78L33.47,38l-2.39,4.78-2.39,4.78L26.3,52.31H0V14.07ZM4.78,18.87V47.55H23.91l2.39-4.78L28.69,38l2.39-4.78-2.39-4.78L26.3,23.65l-2.39-4.78Z"
                      />
                      <path className="cls-4" d="M73.17,0H68.34V4.6h4.83Z" />
                      <path
                        className="cls-3"
                        d="M80.58,29.11a6.67,6.67,0,0,1-3-.6A6.18,6.18,0,0,1,75.57,27a7.13,7.13,0,0,1-1.22-2.1,6.67,6.67,0,0,1-.4-2.17V22.3A6.66,6.66,0,0,1,74.36,20a6.13,6.13,0,0,1,1.29-2.11,6.28,6.28,0,0,1,2-1.44,7.83,7.83,0,0,1,5.79,0A6.11,6.11,0,0,1,86.77,20a6.66,6.66,0,0,1,.41,2.29v.38a6.41,6.41,0,0,1-.4,2.17A6.8,6.8,0,0,1,85.56,27a6.18,6.18,0,0,1-2.06,1.56A6.57,6.57,0,0,1,80.58,29.11Zm0-2.26a4.11,4.11,0,0,0,1.72-.35,3.73,3.73,0,0,0,1.3-1,4.4,4.4,0,0,0,.83-1.4,4.85,4.85,0,0,0,.28-1.65,5.06,5.06,0,0,0-.28-1.73,4,4,0,0,0-.83-1.38,3.77,3.77,0,0,0-1.31-.91,4.77,4.77,0,0,0-3.45,0,3.86,3.86,0,0,0-1.31.91,4,4,0,0,0-.83,1.38,5.31,5.31,0,0,0-.28,1.73,4.89,4.89,0,0,0,.28,1.65,4.4,4.4,0,0,0,.83,1.4,3.77,3.77,0,0,0,1.31,1A4.17,4.17,0,0,0,80.58,26.85Z"
                      />
                      <path
                        className="cls-3"
                        d="M89.53,28.86V16.18H92V28.86Zm2.09,0V26.59h2.59a4.74,4.74,0,0,0,1.75-.3,3.46,3.46,0,0,0,1.29-.85,3.88,3.88,0,0,0,.82-1.29,4.67,4.67,0,0,0,.28-1.66,4.84,4.84,0,0,0-.28-1.69,3.69,3.69,0,0,0-.82-1.28,3.54,3.54,0,0,0-1.29-.8,5.26,5.26,0,0,0-1.75-.28H91.62V16.18h2.43a8.07,8.07,0,0,1,3,.48A5.81,5.81,0,0,1,99.12,18a5.69,5.69,0,0,1,1.27,2,6.4,6.4,0,0,1,.41,2.29v.38a6.33,6.33,0,0,1-.41,2.23A6,6,0,0,1,97,28.29a7.68,7.68,0,0,1-3,.53Z"
                      />
                      <path
                        className="cls-3"
                        d="M103.06,28.79V16.26h2.42V28.79Z"
                      />
                      <path
                        className="cls-3"
                        d="M108.59,28.79V16.26h4l5.27,10.5h.56l-.34.31V16.26h2.3V28.79h-4l-5.27-10.5h-.58l.35-.31V28.79Z"
                      />
                      <path
                        className="cls-3"
                        d="M74.69,49.4V36.85h2.39V49.4Zm2-10.47v-2h5.54v2Zm0,5.14V42H82v2.06Zm0,5.33V47.32h5.68V49.4Z"
                      />
                      <path
                        className="cls-3"
                        d="M89.08,49.7a6.56,6.56,0,0,1-2.8-.53,4,4,0,0,1-1.74-1.45,3.81,3.81,0,0,1-.6-2.12h2.38a1.85,1.85,0,0,0,.28,1,1.82,1.82,0,0,0,.88.76,3.53,3.53,0,0,0,1.6.29,3.85,3.85,0,0,0,1.5-.25,2.13,2.13,0,0,0,.89-.68,1.61,1.61,0,0,0,.29-1,1.31,1.31,0,0,0-.15-.61,1.24,1.24,0,0,0-.41-.47,3.74,3.74,0,0,0-1.75-.48l-1.1-.09A4.76,4.76,0,0,1,85.47,43a3.44,3.44,0,0,1-.82-1.17,3.34,3.34,0,0,1-.25-1.4,3.65,3.65,0,0,1,.55-2A3.59,3.59,0,0,1,86.55,37a6.25,6.25,0,0,1,4.85,0,3.8,3.8,0,0,1,1.6,1.4,3.92,3.92,0,0,1,.56,2.12H91.18a1.92,1.92,0,0,0-.25-1,1.85,1.85,0,0,0-.74-.7A2.42,2.42,0,0,0,89,38.57a2.71,2.71,0,0,0-1.2.24,1.76,1.76,0,0,0-.73.65,1.74,1.74,0,0,0-.23.89,1.35,1.35,0,0,0,.1.56,1.86,1.86,0,0,0,.32.47,2,2,0,0,0,1.36.48l1.1.1a7.36,7.36,0,0,1,2.35.57,3.78,3.78,0,0,1,1.57,1.26,3.13,3.13,0,0,1,.55,1.9,3.57,3.57,0,0,1-.61,2.08,4,4,0,0,1-1.76,1.4A6.53,6.53,0,0,1,89.08,49.7Z"
                      />
                      <path
                        className="cls-3"
                        d="M96.38,49.4V36.8H98.8V49.4Zm2.09-3.84V43.45h2.42a2.61,2.61,0,0,0,1.25-.29,1.94,1.94,0,0,0,.77-.81,2.82,2.82,0,0,0,.26-1.18,2.86,2.86,0,0,0-.26-1.19,1.84,1.84,0,0,0-.77-.79,2.61,2.61,0,0,0-1.25-.29H98.47V36.79h2.23a6.31,6.31,0,0,1,2.68.51,3.81,3.81,0,0,1,1.69,1.46,4.24,4.24,0,0,1,.59,2.25v.28a4.24,4.24,0,0,1-.59,2.25A3.79,3.79,0,0,1,103.38,45a6.17,6.17,0,0,1-2.68.52Z"
                      />
                      <path
                        className="cls-3"
                        d="M113.55,49.7a6.63,6.63,0,0,1-2.94-.6,6.08,6.08,0,0,1-2.06-1.57,6.87,6.87,0,0,1-1.22-2.09,6.22,6.22,0,0,1-.4-2.17v-.38a6.66,6.66,0,0,1,.41-2.29,6.2,6.2,0,0,1,1.24-2.06,6,6,0,0,1,2.07-1.49,7.71,7.71,0,0,1,5.78,0,6,6,0,0,1,2,1.43,6.08,6.08,0,0,1,1.29,2.12,6.62,6.62,0,0,1,.41,2.29v.38a6.22,6.22,0,0,1-.4,2.17,6.84,6.84,0,0,1-1.21,2.09,6.12,6.12,0,0,1-2.07,1.57A6.51,6.51,0,0,1,113.55,49.7Zm0-2.26a4.23,4.23,0,0,0,1.72-.34,3.93,3.93,0,0,0,1.31-1,4.26,4.26,0,0,0,.82-1.39,4.91,4.91,0,0,0,.29-1.66,5.11,5.11,0,0,0-.29-1.73,4,4,0,0,0-.82-1.37,3.69,3.69,0,0,0-1.31-.91,4.77,4.77,0,0,0-3.45,0,3.77,3.77,0,0,0-1.32.91,4,4,0,0,0-.82,1.37,5.1,5.1,0,0,0-.28,1.73,4.67,4.67,0,0,0,.28,1.66,4.26,4.26,0,0,0,.82,1.39,4,4,0,0,0,1.32,1,4.1,4.1,0,0,0,1.73.36Z"
                      />
                      <path
                        className="cls-3"
                        d="M122.5,49.4V36.8h2.43V49.4Zm1.72-4.18v-2h3.19a2.33,2.33,0,0,0,1.16-.27,2,2,0,0,0,.77-.77,2.37,2.37,0,0,0,.27-1.14,2.43,2.43,0,0,0-.27-1.15,2,2,0,0,0-.77-.77,2.23,2.23,0,0,0-1.16-.27h-3.19V36.79h2.93a6.89,6.89,0,0,1,2.62.45,3.55,3.55,0,0,1,1.71,1.35,4.09,4.09,0,0,1,.6,2.28v.28a4,4,0,0,1-.61,2.28,3.71,3.71,0,0,1-1.71,1.34,7,7,0,0,1-2.61.45Zm5.94,4.18-3.84-5.48h2.73l4,5.48Z"
                      />
                      <path
                        className="cls-3"
                        d="M133.38,39V36.85h9.7V39ZM137,49.4V38.65h2.42V49.4Z"
                      />
                      <rect
                        className="cls-5"
                        x="148.29"
                        y="33.8"
                        width="60.35"
                        height="18.15"
                        rx="4.48"
                      />
                      <path
                        className="cls-3"
                        d="M169.27,46.57a2.76,2.76,0,0,1-1.43-.36,2.59,2.59,0,0,1-1-1,3.6,3.6,0,0,1-.36-1.5h.27v2.67h-.7V37.88H167v4.25l-.33.78a3.37,3.37,0,0,1,.37-1.57,2.46,2.46,0,0,1,.95-1,2.7,2.7,0,0,1,1.37-.34,2.77,2.77,0,0,1,1.23.26,2.9,2.9,0,0,1,.93.69,3,3,0,0,1,.59,1,3.46,3.46,0,0,1,.21,1.21v.16a3.54,3.54,0,0,1-.21,1.21,3.27,3.27,0,0,1-.6,1,2.61,2.61,0,0,1-.95.72A2.83,2.83,0,0,1,169.27,46.57Zm-.1-.77a2.11,2.11,0,0,0,1.2-.33,2.2,2.2,0,0,0,.77-.91,3,3,0,0,0,.27-1.28,2.9,2.9,0,0,0-.28-1.28,2.14,2.14,0,0,0-.78-.9,2.19,2.19,0,0,0-1.18-.32,2.35,2.35,0,0,0-1.14.28,2,2,0,0,0-.81.79,2.25,2.25,0,0,0-.29,1.18v.57a2.22,2.22,0,0,0,.29,1.16,2.12,2.12,0,0,0,.81.76A2.35,2.35,0,0,0,169.17,45.8Zm7.44.77a3.25,3.25,0,0,1-1.37-.27,2.68,2.68,0,0,1-1-.73,3.18,3.18,0,0,1-.56-1,3.86,3.86,0,0,1-.18-1.17V43.2a3.86,3.86,0,0,1,.18-1.17,3,3,0,0,1,.56-1,2.77,2.77,0,0,1,.93-.72,2.91,2.91,0,0,1,1.32-.28,2.8,2.8,0,0,1,1.61.43,2.87,2.87,0,0,1,1,1.1,3.34,3.34,0,0,1,.32,1.44v.45H174v-.68h4.9l-.22.34a2.68,2.68,0,0,0-.25-1.2,1.73,1.73,0,0,0-.7-.81,2.31,2.31,0,0,0-2.33,0,2.23,2.23,0,0,0-.73.9,3.38,3.38,0,0,0-.23,1.27,3.55,3.55,0,0,0,.23,1.28,2.14,2.14,0,0,0,.74.91,2.55,2.55,0,0,0,2.56,0,1.5,1.5,0,0,0,.61-.87h.82a2.34,2.34,0,0,1-.49,1.07,2.64,2.64,0,0,1-.94.69A3.36,3.36,0,0,1,176.61,46.57Zm6.76-.13a3.07,3.07,0,0,1-1.11-.18,1.47,1.47,0,0,1-.72-.63,2.47,2.47,0,0,1-.26-1.21V38.28h.84v6.27a1.12,1.12,0,0,0,.29.82,1.14,1.14,0,0,0,.83.28h1.1v.79Zm-3.19-5.56v-.66h4.16v.66Zm9.57,5.49V44.52h-.14V42.34a1.42,1.42,0,0,0-.36-1.05,1.48,1.48,0,0,0-1.12-.37h-.7l-.68,0-.56,0v-.77l.53,0,.54,0h.56a4.17,4.17,0,0,1,1.51.23,1.62,1.62,0,0,1,.85.73,2.72,2.72,0,0,1,.27,1.31v3.95Zm-2.08.17a2.63,2.63,0,0,1-1.15-.24,1.77,1.77,0,0,1-.78-.67,2,2,0,0,1-.27-1.07,1.87,1.87,0,0,1,.28-1.05,1.76,1.76,0,0,1,.83-.65,3.23,3.23,0,0,1,1.31-.23h1.8v.66h-1.86a1.63,1.63,0,0,0-1.13.36,1.2,1.2,0,0,0-.38.92,1.16,1.16,0,0,0,.41.93,1.65,1.65,0,0,0,1.1.34,2.31,2.31,0,0,0,.83-.15,1.55,1.55,0,0,0,.66-.54,1.84,1.84,0,0,0,.29-1l.26.37a2.51,2.51,0,0,1-.33,1.15,1.76,1.76,0,0,1-.75.68A2.46,2.46,0,0,1,187.67,46.54Z"
                      />
                    </g>
                  </g>
                </g>
              </svg>

              <span className="d-inline-block fredoka-font ls-3 fw-300 text-current font-l logo-text mb-0">
                {" "}
              </span>
            </a>
             
            <div className="hidden md:flex  pl-2 pt-4 w-full min-w-[250px]  ">
              <div className="flex items-center relative ">
                <div className="flex items-center whitespace-nowrap dark-bg pr-2 pl-2 h-11 w-[250px] rounded-full mr-4 border border-black absolute top-0">
                  <input
                    type="text"
                    onChange={handleSearch}
                    value={searchTerm}
                    placeholder="Search"
                    className="dark-bg w-[230px]"
                  />
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.0787 17.871L16.2077 13.9984C19.1041 10.1278 18.3144 4.64195 14.4437 1.74551C10.5731 -1.15092 5.08726 -0.361157 2.19083 3.50949C-0.705607 7.38013 0.0841559 12.866 3.9548 15.7624C7.06402 18.0891 11.3345 18.0891 14.4437 15.7624L18.3163 19.635C18.803 20.1216 19.592 20.1216 20.0786 19.635C20.5653 19.1483 20.5653 18.3593 20.0786 17.8727L20.0787 17.871ZM9.23154 15.015C5.7915 15.015 3.00282 12.2263 3.00282 8.78623C3.00282 5.34618 5.7915 2.55751 9.23154 2.55751C12.6716 2.55751 15.4603 5.34618 15.4603 8.78623C15.4566 12.2247 12.6701 15.0113 9.23154 15.015Z"
                      fill="#65676B"
                    />
                  </svg>
                </div>

                <div className="">
                  {searchResults.length > 0 && (
                    <ul className="bg-white shadow-md rounded-md mt-1 px-4 py-2 max-h-60 absolute top-[40px]  min-w-[350px] overflow-y-scroll ">
                      {searchResults.map((item, index) => (
                        <React.Fragment key={index}>
                          {index === 0 ||
                          searchResults[index - 1].origin !== item.origin ? (
                            <li className="text-gray-500 gap-y-2 text-sm px-2 py-1">
                              {item.origin === "Page" ? "Pages" : "Personnes"}
                            </li>
                          ) : null}
                          <li
                            key={item.id}
                            className="flex items-center py-1 space-x-4 "
                          >
                            {item.icon ? (
                              <img
                                src={iconImages[item.icon]}
                                alt={item.titre}
                                width="20"
                                height="20"
                                className=""
                              />
                            ) : (
                              <img
                                src={item.image || Userdefault}
                                alt={item.nom}
                                className="rounded-full object-fill w-10 h-10"
                              />
                            )}
                            {/* <a href={`/profile/${item.id}`} className="pr-4">
                              {item.titre || item.nom + " " + item.prenom}
                            </a> */}
                            <a
                              href={`/profile/${item.id}`}
                              className="pr-4 flex flex-row"
                            >
                              <div className="flex pr-2">
                                {" "}
                                {item.titre || item.nom + " " + item.prenom}
                              </div>
                              {/* <div className="flex text-gray-400 text-xs pt-1 ">
                         {item.titre || item?.profil == 'other' ? item?.other?.profession : ''}
                         
                         
                         </div> */}
                            </a>
                          </li>
                        </React.Fragment>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
          </div>
            </div>
          <div className="flex items-center">


          <DesktopNotification 
             deleteNotData={deleteNotData}
             notificationData={notificationData}
             setnotificationData={setnotificationData} 
             NotificationService={NotificationService} />
          <DesktopNotificationPopup 
           deleteNotData={deleteNotData}
           notificationData={activeBtn ? notificationData: UnreadedData}
           setnotificationData={setnotificationData} 
           NotificationService={NotificationService} 
           activeBtn={activeBtn} setActiveBtn = { setActiveBtn}
           setMobileNotificationPopUpContainer={setMobileNotificationPopUpContainer}
           getNotificationForCurrentUser={getNotificationForCurrentUser}
          />
          <MobileNotification 
                    
                    deleteNotData={deleteNotData}
                    notificationData={notificationData}
                    setnotificationData={setnotificationData} 
                    NotificationService={NotificationService} 
                    setMobileNotificationPopUpContainer={setMobileNotificationPopUpContainer}
                    /> 

                  
            <SlideMenu
              setIsActive={setIsActive}
              setHumberger={setHumberger}
              Hamburger={Hamburger}

             deleteNotData={deleteNotData}
             notificationData={notificationData}
             setnotificationData={setnotificationData} 
             NotificationService={NotificationService}
            />
          </div>
        </div>
      {
        mobileNotificationPopUpContainer &&  
        <MobileNotificationPopup
        deleteNotData={deleteNotData}
        notificationData={activeBtn ? notificationData: UnreadedData}
        setnotificationData={setnotificationData} 
        NotificationService={NotificationService} 
        activeBtn={activeBtn} setActiveBtn = { setActiveBtn}
        getNotificationForCurrentUser={getNotificationForCurrentUser}


        setMobileNotificationPopUpContainer={setMobileNotificationPopUpContainer}
        />
      }
      
        {Hamburger && (
          
          <div className="bg-zinc-100 fixed left-0 z-0 py-4 md:hidden w-screen h-screen overflow-y-scroll z-90">
            <div className="flex flex-col items-center pb-12 mx-auto w-full max-w-[480px]  overflow-hidden ">
              <div className="flex flex-col gap-y-4 items-center pb-12 mx-auto w-full max-w-[480px] h-[1000] ">
                <div className="flex gap-5 justify-between p-6  w-full text-base bg-white rounded-[10px] max-w-[366px] text-zinc-900">
                  <img
                    loading="lazy"
                    srcSet={user?.user?.image}
                    className="my-auto rounded-full aspect-square w-[35px]"
                  />

                  <div className="flex flex-col flex-1">
                    <div className="text-lg">
                      {user?.user?.nom + " " + user?.user?.prenom}
                    </div>
                    <Link to={`/profile/${user?.user?.id}`} className="text-sm">
                      {" "}
                      {getTranslation(
                        `Profile`, // -----> Englais
                        `Profil` //  -----> Francais
                        //   ``,  //  -----> Turkey
                        //   `` ,  //  -----> Allemagne
                      )}
                    </Link>
                  </div>
                </div>

                <BurgerMenuLink
                  Href={"/searchpage"}
                  Title={getTranslation(
                    `Research`, // -----> Englais
                    `Recherche` //  -----> Francais
                    //   ``,  //  -----> Turkey
                    //   `` ,  //  -----> Allemagne
                  )}
                  Svg={``}
                >
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.0787 17.871L16.2077 13.9984C19.1041 10.1278 18.3144 4.64195 14.4437 1.74551C10.5731 -1.15092 5.08726 -0.361157 2.19083 3.50949C-0.705607 7.38013 0.0841559 12.866 3.9548 15.7624C7.06402 18.0891 11.3345 18.0891 14.4437 15.7624L18.3163 19.635C18.803 20.1216 19.592 20.1216 20.0786 19.635C20.5653 19.1483 20.5653 18.3593 20.0786 17.8727L20.0787 17.871ZM9.23154 15.015C5.7915 15.015 3.00282 12.2263 3.00282 8.78623C3.00282 5.34618 5.7915 2.55751 9.23154 2.55751C12.6716 2.55751 15.4603 5.34618 15.4603 8.78623C15.4566 12.2247 12.6701 15.0113 9.23154 15.015Z"
                      fill="#2E71EB"
                    />
                  </svg>
                </BurgerMenuLink>
                <BurgerMenuLink
                  Href={"/home"}
                  Title={getTranslation(
                    `Home`, // -----> Englais
                    `Acceuil` //  -----> Francais
                    //   ``,  //  -----> Turkey
                    //   `` ,  //  -----> Allemagne
                  )}
                  Svg={``}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.3299 4.77286V1.6701C18.3299 1.21019 17.9575 0.836926 17.4967 0.836926C17.036 0.836926 16.6635 1.21019 16.6635 1.6701V3.6414L12.3285 0.716116C10.913 -0.238705 9.0833 -0.238705 7.66773 0.716116L1.83549 4.65204C0.686538 5.42773 0 6.71832 0 8.10556V15.8341C0 18.1312 1.86882 20 4.16589 20H5.83224C6.29299 20 6.66542 19.6267 6.66542 19.1668V11.6682C6.66542 11.2091 7.03868 10.8351 7.49859 10.8351H12.4977C12.9576 10.8351 13.3308 11.2091 13.3308 11.6682V19.1668C13.3308 19.6267 13.7033 20 14.164 20H15.8304C18.1274 20 19.9963 18.1312 19.9963 15.8341V8.10556C19.9963 6.78831 19.3764 5.55771 18.3299 4.77286Z"
                      fill="#2E71EB"
                    />
                  </svg>
                </BurgerMenuLink>

                {shouldShowAgentItem && (
                  <div className="flex gap-4 px-6 py-3 items-center w-full text-base whitespace-nowrap bg-white rounded-[10px] max-w-[366px] text-zinc-900">
                    <svg
                      width="19"
                      height="20"
                      viewBox="0 0 19 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.16667 7.5C9.16667 7.27899 9.25446 7.06702 9.41074 6.91074C9.56703 6.75446 9.77899 6.66667 10 6.66667C10.221 6.66667 10.433 6.75446 10.5893 6.91074C10.7455 7.06702 10.8333 7.27899 10.8333 7.5C10.8333 7.72101 10.7455 7.93297 10.5893 8.08926C10.433 8.24554 10.221 8.33333 10 8.33333C9.77899 8.33333 9.56703 8.24554 9.41074 8.08926C9.25446 7.93297 9.16667 7.72101 9.16667 7.5ZM18.3333 4.16667V15.8333C18.332 16.938 17.8926 17.997 17.1115 18.7782C16.3304 19.5593 15.2713 19.9987 14.1667 20H5.83333C5.02353 19.9989 4.23158 19.7619 3.55434 19.3179C2.8771 18.8739 2.34392 18.2422 2.02 17.5H0.833333C0.61232 17.5 0.400358 17.4122 0.244078 17.2559C0.0877973 17.0996 0 16.8877 0 16.6667C0 16.4457 0.0877973 16.2337 0.244078 16.0774C0.400358 15.9211 0.61232 15.8333 0.833333 15.8333H1.66667V14.1667H0.833333C0.61232 14.1667 0.400358 14.0789 0.244078 13.9226C0.0877973 13.7663 0 13.5543 0 13.3333C0 13.1123 0.0877973 12.9004 0.244078 12.7441C0.400358 12.5878 0.61232 12.5 0.833333 12.5H1.66667V10.8333H0.833333C0.61232 10.8333 0.400358 10.7455 0.244078 10.5893C0.0877973 10.433 0 10.221 0 10C0 9.77899 0.0877973 9.56702 0.244078 9.41074C0.400358 9.25446 0.61232 9.16667 0.833333 9.16667H1.66667V7.5H0.833333C0.61232 7.5 0.400358 7.4122 0.244078 7.25592C0.0877973 7.09964 0 6.88768 0 6.66667C0 6.44565 0.0877973 6.23369 0.244078 6.07741C0.400358 5.92113 0.61232 5.83333 0.833333 5.83333H1.66667V4.16667H0.833333C0.61232 4.16667 0.400358 4.07887 0.244078 3.92259C0.0877973 3.76631 0 3.55435 0 3.33333C0 3.11232 0.0877973 2.90036 0.244078 2.74408C0.400358 2.5878 0.61232 2.5 0.833333 2.5H2.02C2.34392 1.7578 2.8771 1.12608 3.55434 0.682083C4.23158 0.238088 5.02353 0.00106531 5.83333 0L14.1667 0C15.2713 0.00132321 16.3304 0.440735 17.1115 1.22185C17.8926 2.00296 18.332 3.062 18.3333 4.16667ZM7.5 7.5C7.5 8.16304 7.76339 8.79893 8.23223 9.26777C8.70107 9.73661 9.33696 10 10 10C10.663 10 11.2989 9.73661 11.7678 9.26777C12.2366 8.79893 12.5 8.16304 12.5 7.5C12.5 6.83696 12.2366 6.20107 11.7678 5.73223C11.2989 5.26339 10.663 5 10 5C9.33696 5 8.70107 5.26339 8.23223 5.73223C7.76339 6.20107 7.5 6.83696 7.5 7.5ZM14.1667 15C13.9908 9.49333 6.0075 9.495 5.83333 15C5.83333 15.221 5.92113 15.433 6.07741 15.5893C6.23369 15.7455 6.44565 15.8333 6.66667 15.8333C6.88768 15.8333 7.09964 15.7455 7.25592 15.5893C7.4122 15.433 7.5 15.221 7.5 15C7.5 14.337 7.76339 13.7011 8.23223 13.2322C8.70107 12.7634 9.33696 12.5 10 12.5C10.663 12.5 11.2989 12.7634 11.7678 13.2322C12.2366 13.7011 12.5 14.337 12.5 15C12.5 15.221 12.5878 15.433 12.7441 15.5893C12.9004 15.7455 13.1123 15.8333 13.3333 15.8333C13.5543 15.8333 13.7663 15.7455 13.9226 15.5893C14.0789 15.433 14.1667 15.221 14.1667 15Z"
                        fill="#2E71EB"
                      />
                    </svg>
                    <Link
                      to="/defaultgroupagent"
                      className="flex-auto self-start mt-1"
                    >
                      Agent
                    </Link>
                  </div>
                )}

                {shouldShowForProfile && (
                  <div className="flex gap-4 px-6 py-3 items-center w-full text-base whitespace-nowrap bg-white rounded-[10px] max-w-[366px] text-zinc-900">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_488_16850)">
                        <path
                          d="M10.9875 13.3333H9.0125C8.5725 13.334 8.14363 13.195 7.78766 12.9364C7.43169 12.6778 7.16699 12.3128 7.03167 11.8942L6.42167 10.0167C6.28382 9.59778 6.28284 9.14589 6.41887 8.7264C6.55491 8.30692 6.82089 7.94161 7.17834 7.68333L8.775 6.52667C9.13041 6.26715 9.5591 6.12729 9.99917 6.12729C10.4392 6.12729 10.8679 6.26715 11.2233 6.52667L12.8208 7.68667C13.1784 7.94485 13.4444 8.31016 13.5805 8.72968C13.7165 9.14919 13.7155 9.60112 13.5775 10.02L12.9683 11.8975C12.8318 12.3151 12.5666 12.6789 12.2109 12.9368C11.8551 13.1947 11.4269 13.3335 10.9875 13.3333ZM20 10C20 11.9778 19.4135 13.9112 18.3147 15.5557C17.2159 17.2002 15.6541 18.4819 13.8268 19.2388C11.9996 19.9957 9.98891 20.1937 8.0491 19.8079C6.10929 19.422 4.32746 18.4696 2.92894 17.0711C1.53041 15.6725 0.578004 13.8907 0.192152 11.9509C-0.193701 10.0111 0.00433286 8.00043 0.761209 6.17317C1.51809 4.3459 2.79981 2.78412 4.4443 1.6853C6.08879 0.58649 8.02219 0 10 0C12.6513 0.00286757 15.1932 1.05736 17.0679 2.9321C18.9426 4.80684 19.9971 7.34872 20 10ZM10 17.5C10.4315 17.4975 10.862 17.4579 11.2867 17.3817L11.9933 15.0642C12.1537 14.5606 12.4699 14.1211 12.8964 13.8089C13.3228 13.4968 13.8374 13.3282 14.3658 13.3275L16.7133 13.3233C17.0913 12.565 17.3367 11.7477 17.4392 10.9067L15.5658 9.65667C15.1335 9.35323 14.8087 8.92034 14.6383 8.42041C14.4678 7.92047 14.4606 7.37933 14.6175 6.875L15.3283 4.73083C14.7324 4.13169 14.04 3.63702 13.28 3.2675L11.47 4.5225C11.0431 4.83392 10.5284 5.00173 10 5.00173C9.47161 5.00173 8.95687 4.83392 8.53 4.5225L6.76834 3.2425C6.01995 3.60002 5.33574 4.07868 4.74334 4.65917L5.3825 6.87333C5.53944 7.37767 5.53217 7.91881 5.36173 8.41874C5.19129 8.91867 4.8665 9.35156 4.43417 9.655L2.5725 10.9842C2.67956 11.798 2.92089 12.5885 3.28667 13.3233L5.63334 13.3275C6.16184 13.328 6.67653 13.4963 7.10311 13.8083C7.5297 14.1203 7.84611 14.5598 8.00667 15.0633L8.7275 17.3833C9.14754 17.4586 9.57328 17.4977 10 17.5Z"
                          fill="#2E71EB"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_488_16850">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <Link
                      to="/defaultbadge"
                      className="flex-auto self-start mt-1"
                    >
                      {" "}
                      {getTranslation(
                        `Players`, // -----> Englais
                        `Joueurs` //  -----> Francais
                        //   ``,  //  -----> Turkey
                        //   `` ,  //  -----> Allemagne
                      )}
                    </Link>
                  </div>
                )}

                <BurgerMenuLink
                  Href={"/defaultgroupEvents"}
                  Title={getTranslation(
                    `Odin Event`, // -----> Englais
                    `Evènnement Odin` //  -----> Francais
                    //   ``,  //  -----> Turkey
                    //   `` ,  //  -----> Allemagne
                  )}
                  Svg={``}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.6375 11.8192C13.6375 12.135 13.4175 12.4008 13.1658 12.5408L11.8625 13.2658L12.4408 14.8433C12.5525 15.1492 12.4517 15.4917 12.1917 15.6875C11.9258 15.8875 11.5592 15.885 11.2958 15.6817L9.99917 14.6792L8.7025 15.6817C8.43917 15.885 8.0725 15.8875 7.80667 15.6875C7.54667 15.4917 7.44583 15.1492 7.5575 14.8433L8.13583 13.2658L6.8325 12.5408C6.58083 12.4008 6.36083 12.135 6.36083 11.8192C6.36083 11.5517 6.59333 11.2558 6.97 11.2558H8.8425L9.33917 9.35333C9.4175 9.05167 9.68833 8.84167 9.99917 8.83583C10.31 8.84167 10.5808 9.05167 10.6592 9.35333L11.1558 11.2558H13.0283C13.405 11.2558 13.6375 11.5508 13.6375 11.8192ZM15.4167 1.66667H15V1.25C15 0.559167 14.4408 0 13.75 0C13.0592 0 12.5 0.559167 12.5 1.25V1.66667H7.5V1.25C7.5 0.559167 6.94083 0 6.25 0C5.55917 0 5 0.559167 5 1.25V1.66667H4.58333C2.05583 1.66667 0 3.7225 0 6.25V15.4167C0 17.9442 2.05583 20 4.58333 20H15.4167C17.9442 20 20 17.9442 20 15.4167V6.25C20 3.7225 17.9442 1.66667 15.4167 1.66667ZM15.4167 17.5H4.58333C3.435 17.5 2.5 16.565 2.5 15.4167V7.5H17.5V15.4167C17.5 16.565 16.565 17.5 15.4167 17.5Z"
                      fill="#2E71EB"
                    />
                  </svg>
                </BurgerMenuLink>

                <BurgerMenuLink
                  Href={"/challenges"}
                  Title={"Challenges"}
                  Svg={``}
                >
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 14.9967C15 17.7542 12.7575 19.9967 10 19.9967C7.2425 19.9967 5 17.7542 5 14.9967C5 12.2392 7.2425 9.99667 10 9.99667C10.46 9.99667 10.8333 10.3692 10.8333 10.83C10.8333 11.2908 10.46 11.6633 10 11.6633C8.16167 11.6633 6.66667 13.1583 6.66667 14.9967C6.66667 16.835 8.16167 18.33 10 18.33C11.8383 18.33 13.3333 16.835 13.3333 14.9967C13.3333 14.5358 13.7067 14.1633 14.1667 14.1633C14.6267 14.1633 15 14.5358 15 14.9967ZM15.3033 12.4967C15.745 12.4967 16.1692 12.3208 16.4817 12.0083L17.2867 11.2033C17.7325 10.7575 17.4167 9.99667 16.7867 9.99667H15V8.21C15 7.58 14.2383 7.26417 13.7933 7.71L12.9883 8.515C12.6758 8.8275 12.5 9.25167 12.5 9.69333V11.3183L10.4317 13.3867C10.2942 13.35 10.1492 13.33 10 13.33C9.07917 13.33 8.33333 14.0758 8.33333 14.9967C8.33333 15.9175 9.07917 16.6633 10 16.6633C10.9208 16.6633 11.6667 15.9175 11.6667 14.9967C11.6667 14.8475 11.6467 14.7025 11.61 14.565L13.6783 12.4967H15.3033ZM12.615 6.53167C13.2967 5.85167 14.3117 5.64917 15.2008 6.0175C15.5558 6.16417 15.86 6.38833 16.0983 6.66667H20.0317L20.0267 5.8075C20.0125 3.51667 18.1517 1.66667 15.86 1.66667H15.0008V0.833333C15 0.373333 14.6267 0 14.1667 0C13.7067 0 13.3333 0.373333 13.3333 0.833333V1.66667H6.66667V0.833333C6.66667 0.373333 6.29333 0 5.83333 0C5.37333 0 5 0.373333 5 0.833333V1.66667H4.16667C1.86583 1.66667 0 3.53167 0 5.83333V6.66667H12.48L12.615 6.53167ZM3.33333 15C3.33333 11.3242 6.32417 8.33333 10 8.33333H0V15.8325C0 18.1325 1.86417 19.9975 4.16417 19.9992H5.59583C4.20917 18.7775 3.33333 16.9892 3.33333 15ZM20 8.33H16.7867C17.7508 8.33 18.6108 8.905 18.98 9.79583C19.3492 10.6867 19.1467 11.7017 18.465 12.3825L17.6608 13.1867C17.3325 13.515 16.9475 13.7667 16.5275 13.9325C16.6133 14.4358 16.6675 14.8233 16.6675 15C16.6675 16.9892 15.7917 18.7775 14.405 20H16.3075C18.3817 19.9975 20.0608 18.3133 20.055 16.2392L20 8.33Z"
                      fill="#2E71EB"
                    />
                  </svg>
                </BurgerMenuLink>
                <BurgerMenuLink
                  Href={"/defaultgroup"}
                  Title={"Football Camps"}
                  Svg={``}
                >
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.5689 18.0481H16.9897C16.8607 18.0485 16.7349 18.008 16.6305 17.9323C16.526 17.8565 16.4484 17.7496 16.4086 17.6269L16.2303 17.0775C16.19 16.9549 16.1896 16.8226 16.2294 16.6998C16.2691 16.577 16.3469 16.4701 16.4515 16.3944L16.9188 16.056C17.0229 15.98 17.1483 15.9391 17.2771 15.9391C17.4059 15.9391 17.5313 15.98 17.6353 16.056L18.103 16.3955C18.2076 16.4711 18.2855 16.5779 18.3253 16.7007C18.3651 16.8234 18.3649 16.9556 18.3245 17.0782L18.1473 17.628C18.1072 17.7504 18.0294 17.857 17.9251 17.9324C17.8207 18.0079 17.6951 18.0484 17.5663 18.0481H17.5689ZM20.2052 17.0724C20.2053 17.6513 20.0337 18.2172 19.7121 18.6986C19.3906 19.1799 18.9335 19.5551 18.3987 19.7767C17.8639 19.9983 17.2754 20.0563 16.7076 19.9434C16.1398 19.8305 15.6182 19.5518 15.2089 19.1425C14.7995 18.7332 14.5207 18.2117 14.4078 17.6439C14.2948 17.0761 14.3527 16.4876 14.5742 15.9528C14.7958 15.4179 15.1709 14.9608 15.6522 14.6392C16.1336 14.3176 16.6995 14.1459 17.2784 14.1459C18.0545 14.1459 18.7989 14.4542 19.3478 15.003C19.8967 15.5518 20.2051 16.2962 20.2052 17.0724ZM17.2784 19.2675C17.4047 19.2664 17.5307 19.2542 17.6549 19.2312L17.8619 18.554C17.9088 18.4066 18.0013 18.2779 18.1261 18.1865C18.2509 18.0951 18.4015 18.0458 18.5562 18.0456H19.2433C19.3544 17.8236 19.4268 17.5842 19.4572 17.3378L18.9088 16.9722C18.7819 16.8835 18.6864 16.7568 18.6363 16.6103C18.5862 16.4638 18.5839 16.3051 18.6299 16.1573L18.8398 15.5305C18.6653 15.3552 18.4627 15.2104 18.2403 15.102L17.7087 15.4695C17.5838 15.5607 17.4332 15.6098 17.2785 15.6098C17.1239 15.6098 16.9733 15.5607 16.8484 15.4695L16.3342 15.0948C16.1151 15.1994 15.9149 15.3395 15.7416 15.5095L15.9271 16.1573C15.9731 16.3049 15.971 16.4633 15.9212 16.6096C15.8713 16.7559 15.7762 16.8826 15.6497 16.9714L15.105 17.3604C15.1363 17.5987 15.2069 17.8302 15.3138 18.0456H16.0005C16.1552 18.0458 16.3059 18.0951 16.4307 18.1865C16.5556 18.2779 16.6482 18.4065 16.6952 18.554L16.9061 19.233C17.029 19.2549 17.1535 19.2667 17.2784 19.2675Z"
                      fill="#2E71EB"
                    />
                    <path
                      d="M19.5741 14.034L13.7589 2.40829C13.5286 1.91264 13.203 1.46719 12.8006 1.09739C12.3982 0.727584 11.9269 0.440663 11.4136 0.253008C10.9003 0.0653542 10.3551 -0.0193581 9.80903 0.00370844C9.263 0.026775 8.72686 0.157169 8.23122 0.387444C7.34749 0.797776 6.63579 1.50524 6.22018 2.3865L0.387512 14.0606C0.15733 14.5556 0.0269271 15.0912 0.00374815 15.6367C-0.0194308 16.1822 0.0650693 16.7269 0.252422 17.2397C0.439776 17.7526 0.726312 18.2234 1.09567 18.6255C1.46503 19.0276 1.90997 19.353 2.40509 19.5831C2.93608 19.83 3.51323 19.9619 4.09875 19.9702L7.76096 13.0438C7.90268 12.7516 8.1006 12.4901 8.34341 12.2744C8.58621 12.0587 8.86914 11.893 9.17603 11.7867C9.48292 11.6804 9.80775 11.6356 10.132 11.6549C10.4562 11.6742 10.7734 11.7572 11.0655 11.8992C11.5776 12.148 11.9881 12.5661 12.2275 13.0826L13.8493 16.4598C13.8863 15.785 14.1278 15.1375 14.5417 14.6033C14.9556 14.0691 15.5222 13.6736 16.1664 13.4691C16.8105 13.2647 17.5015 13.2611 18.1477 13.4589C18.7939 13.6566 19.3646 14.0463 19.784 14.5762C19.7266 14.3909 19.6565 14.2097 19.5741 14.034ZM10.7223 13.7886C10.6424 13.6122 10.5018 13.4704 10.3261 13.3891C10.132 13.2988 9.91006 13.2892 9.70889 13.3624C9.50772 13.4356 9.3438 13.5856 9.25308 13.7795L5.97906 19.9702H13.6888L10.7223 13.7886Z"
                      fill="#2E71EB"
                    />
                  </svg>
                </BurgerMenuLink>

                <BurgerMenuLink
                  Href={"/homeoffre"}
                  Title={getTranslation(
                    `Job offers`, // -----> Englais
                    `Offre d'emploi` //  -----> Francais
                    //   ``,  //  -----> Turkey
                    //   `` ,  //  -----> Allemagne
                  )}
                  Svg={``}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.6375 11.8192C13.6375 12.135 13.4175 12.4008 13.1658 12.5408L11.8625 13.2658L12.4408 14.8433C12.5525 15.1492 12.4517 15.4917 12.1917 15.6875C11.9258 15.8875 11.5592 15.885 11.2958 15.6817L9.99917 14.6792L8.7025 15.6817C8.43917 15.885 8.0725 15.8875 7.80667 15.6875C7.54667 15.4917 7.44583 15.1492 7.5575 14.8433L8.13583 13.2658L6.8325 12.5408C6.58083 12.4008 6.36083 12.135 6.36083 11.8192C6.36083 11.5517 6.59333 11.2558 6.97 11.2558H8.8425L9.33917 9.35333C9.4175 9.05167 9.68833 8.84167 9.99917 8.83583C10.31 8.84167 10.5808 9.05167 10.6592 9.35333L11.1558 11.2558H13.0283C13.405 11.2558 13.6375 11.5508 13.6375 11.8192ZM15.4167 1.66667H15V1.25C15 0.559167 14.4408 0 13.75 0C13.0592 0 12.5 0.559167 12.5 1.25V1.66667H7.5V1.25C7.5 0.559167 6.94083 0 6.25 0C5.55917 0 5 0.559167 5 1.25V1.66667H4.58333C2.05583 1.66667 0 3.7225 0 6.25V15.4167C0 17.9442 2.05583 20 4.58333 20H15.4167C17.9442 20 20 17.9442 20 15.4167V6.25C20 3.7225 17.9442 1.66667 15.4167 1.66667ZM15.4167 17.5H4.58333C3.435 17.5 2.5 16.565 2.5 15.4167V7.5H17.5V15.4167C17.5 16.565 16.565 17.5 15.4167 17.5Z"
                      fill="#2E71EB"
                    />
                  </svg>
                </BurgerMenuLink>

                <BurgerMenuLink
                  Href={"/friends"}
                  Title={getTranslation(
                    `Friends Request`, // -----> Englais
                    `Demandes` //  -----> Francais
                    //   ``,  //  -----> Turkey
                    //   `` ,  //  -----> Allemagne
                  )}
                  Svg={``}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 10C10.2614 10 12.5 7.76142 12.5 5C12.5 2.23858 10.2614 0 7.5 0C4.73858 0 2.5 2.23858 2.5 5C2.5 7.76142 4.73858 10 7.5 10Z"
                      fill="#2E71EB"
                    />
                    <path
                      d="M10.8692 11.6667H4.13083C3.03567 11.668 1.98575 12.1036 1.21135 12.878C0.43696 13.6524 0.00132319 14.7023 0 15.7975V20H15V15.7975C14.9987 14.7023 14.563 13.6524 13.7886 12.878C13.0143 12.1036 11.9643 11.668 10.8692 11.6667Z"
                      fill="#2E71EB"
                    />
                    <path
                      d="M17.5 8.33333V5.83333H15.8333V8.33333H13.3333V10H15.8333V12.5H17.5V10H20V8.33333H17.5Z"
                      fill="#2E71EB"
                    />
                  </svg>
                </BurgerMenuLink>

                <BurgerMenuLink
                  Href={"/setting/personal"}
                  Title={getTranslation(
                    `Personal Information`, // -----> Englais
                    `Informations personnelles` //  -----> Francais
                    //   ``,  //  -----> Turkey
                    //   `` ,  //  -----> Allemagne
                  )}
                  Svg={``}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 5C2.5 2.2425 4.7425 0 7.5 0C10.2575 0 12.5 2.2425 12.5 5C12.5 7.7575 10.2575 10 7.5 10C4.7425 10 2.5 7.7575 2.5 5ZM18.1033 15.4725L19.6375 16.3558L18.8058 17.8L17.2725 16.9167C16.6842 17.58 15.9008 18.065 15.0008 18.2483V19.9992H13.3342V18.2483C12.4342 18.065 11.65 17.58 11.0625 16.9167L9.52917 17.8L8.6975 16.3558L10.2317 15.4725C10.0942 15.0592 10.0017 14.6258 10.0017 14.1667C10.0017 13.7075 10.0942 13.2742 10.2317 12.8608L8.6975 11.9775L9.52917 10.5333L11.0625 11.4167C11.6508 10.7533 12.4342 10.2683 13.3342 10.085V8.33417H15.0008V10.085C15.9008 10.2683 16.685 10.7533 17.2725 11.4167L18.8058 10.5333L19.6375 11.9775L18.1033 12.8608C18.2408 13.2742 18.3333 13.7075 18.3333 14.1667C18.3333 14.6258 18.2408 15.0592 18.1033 15.4725ZM15.4167 14.1667C15.4167 13.4775 14.8558 12.9167 14.1667 12.9167C13.4775 12.9167 12.9167 13.4775 12.9167 14.1667C12.9167 14.8558 13.4775 15.4167 14.1667 15.4167C14.8558 15.4167 15.4167 14.8558 15.4167 14.1667ZM6.66667 14.1667C6.66667 13.2883 6.825 12.45 7.1025 11.6667H4.16667C1.86917 11.6667 0 13.5358 0 15.8333V20H9.4575C7.75667 18.625 6.66667 16.5242 6.66667 14.1667Z"
                      fill="#2E71EB"
                    />
                  </svg>
                </BurgerMenuLink>

                <BurgerMenuLink
                  Href={"/setting/information"}
                  Title={getTranslation(
                    `Profile information`, // -----> Englais
                    `Informations du profil` //  -----> Francais
                    //   ``,  //  -----> Turkey
                    //   `` ,  //  -----> Allemagne
                  )}
                  Svg={``}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 5C2.5 2.2425 4.7425 0 7.5 0C10.2575 0 12.5 2.2425 12.5 5C12.5 7.7575 10.2575 10 7.5 10C4.7425 10 2.5 7.7575 2.5 5ZM18.1033 15.4725L19.6375 16.3558L18.8058 17.8L17.2725 16.9167C16.6842 17.58 15.9008 18.065 15.0008 18.2483V19.9992H13.3342V18.2483C12.4342 18.065 11.65 17.58 11.0625 16.9167L9.52917 17.8L8.6975 16.3558L10.2317 15.4725C10.0942 15.0592 10.0017 14.6258 10.0017 14.1667C10.0017 13.7075 10.0942 13.2742 10.2317 12.8608L8.6975 11.9775L9.52917 10.5333L11.0625 11.4167C11.6508 10.7533 12.4342 10.2683 13.3342 10.085V8.33417H15.0008V10.085C15.9008 10.2683 16.685 10.7533 17.2725 11.4167L18.8058 10.5333L19.6375 11.9775L18.1033 12.8608C18.2408 13.2742 18.3333 13.7075 18.3333 14.1667C18.3333 14.6258 18.2408 15.0592 18.1033 15.4725ZM15.4167 14.1667C15.4167 13.4775 14.8558 12.9167 14.1667 12.9167C13.4775 12.9167 12.9167 13.4775 12.9167 14.1667C12.9167 14.8558 13.4775 15.4167 14.1667 15.4167C14.8558 15.4167 15.4167 14.8558 15.4167 14.1667ZM6.66667 14.1667C6.66667 13.2883 6.825 12.45 7.1025 11.6667H4.16667C1.86917 11.6667 0 13.5358 0 15.8333V20H9.4575C7.75667 18.625 6.66667 16.5242 6.66667 14.1667Z"
                      fill="#2E71EB"
                    />
                  </svg>
                </BurgerMenuLink>

                {shouldShowAgentItem && (
                  <BurgerMenuLink
                    Href={"/setting/experience"}
                    Title={"Experience"}
                    Svg={``}
                  >
                    <svg
                      width="21"
                      height="24"
                      viewBox="0 0 21 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.5417 21.2507C13.689 21.2517 13.8324 21.2997 13.9511 21.3881L13.9511 21.3881L13.9568 21.3922C14.0724 21.4758 14.1586 21.5943 14.2025 21.7308L14.5105 22.8916L14.5999 23.2286L14.9471 23.2612C15.1739 23.2824 15.4022 23.2832 15.6291 23.2633C15.8579 23.2622 16.0861 23.2404 16.311 23.198L16.6086 23.1419L16.6967 22.8522L17.0345 21.7417C17.0809 21.6001 17.1698 21.4767 17.2888 21.3884L17.2893 21.3881C17.408 21.2997 17.5514 21.2517 17.6987 21.2507H18.8277H19.1264L19.268 20.9876C19.4819 20.59 19.6327 20.1614 19.7149 19.7173L19.7743 19.3969L19.505 19.2132L18.5682 18.5742C18.4494 18.488 18.36 18.3665 18.3128 18.2265C18.2655 18.0863 18.2631 17.9348 18.3058 17.7931L18.6432 16.7684L18.7378 16.481L18.5271 16.2638C18.2152 15.9424 17.8534 15.6738 17.4556 15.4685L17.1876 15.3301L16.9402 15.5028L16.0735 16.1075L16.0735 16.1075L16.0684 16.1111C15.9471 16.1981 15.8019 16.2447 15.6532 16.2447C15.5053 16.2447 15.361 16.1986 15.2402 16.1127L14.3952 15.4911L14.1461 15.3079L13.8708 15.4489C13.4754 15.6516 13.1145 15.9159 12.8016 16.2319L12.596 16.4395L12.676 16.7206L12.9775 17.7789L12.9804 17.7893L12.9838 17.7995C13.0303 17.9395 13.0303 18.0909 12.9838 18.2309L12.9838 18.2309L12.9812 18.239C12.9389 18.3742 12.8521 18.4907 12.7355 18.5696L12.7355 18.5696L12.7339 18.5707L11.7919 19.2132L11.5358 19.3879L11.5784 19.6949C11.64 20.1402 11.774 20.5724 11.9749 20.9743L12.1131 21.2507H12.4222H13.5417ZM14.848 20.1973L14.8413 20.1923L14.8344 20.1876C14.7522 20.131 14.6912 20.048 14.6616 19.9518L14.6617 19.9518L14.6592 19.944L14.3671 19.0464L14.367 19.0458C14.3337 18.9441 14.3337 18.8344 14.367 18.7326L14.367 18.7327L14.3696 18.7243C14.3992 18.6281 14.4602 18.5451 14.5424 18.4886L14.5483 18.4845L14.554 18.4803L15.317 17.9228L15.3262 17.9161L15.3351 17.909C15.4136 17.846 15.5108 17.8118 15.6108 17.8118C15.7108 17.8118 15.808 17.846 15.8864 17.909L15.8953 17.9161L15.9046 17.9228L16.6676 18.4803L16.6733 18.4845L16.6791 18.4886C16.7614 18.5451 16.8224 18.6281 16.852 18.7243L16.8519 18.7244L16.8546 18.7326C16.8878 18.8344 16.8878 18.9441 16.8546 19.0458L16.8544 19.0464L16.5624 19.944L16.5624 19.944L16.56 19.9518C16.5304 20.048 16.4694 20.131 16.3871 20.1876L16.3803 20.1923L16.3736 20.1972C16.2866 20.2614 16.182 20.2966 16.0744 20.298H15.1406C15.0353 20.2952 14.9332 20.2601 14.848 20.1973ZM19.2868 16.9962C19.6853 17.6623 19.8974 18.4239 19.9007 19.2008C19.8971 20.0509 19.6445 20.8812 19.1746 21.5884C18.7017 22.2971 18.0301 22.8489 17.2448 23.1743C16.4595 23.4996 15.5956 23.5839 14.7626 23.4165L14.7606 23.4161C13.927 23.2522 13.1608 22.8428 12.5599 22.24C11.9589 21.6372 11.5504 20.8682 11.3869 20.0312L11.3869 20.0312L11.3861 20.0273C11.2162 19.1933 11.3013 18.3274 11.6302 17.5429C11.9607 16.7598 12.5127 16.0914 13.2177 15.6201C13.8655 15.189 14.6175 14.942 15.3937 14.9052C16.1702 14.8684 16.9421 15.0433 17.6275 15.4114C18.313 15.7795 18.8864 16.3271 19.2868 16.9962Z"
                        fill="#2E71EB"
                        stroke="#2E71EB"
                      />
                      <path
                        d="M9.89996 10.8008V12.1781C9.90079 12.2226 9.89306 12.2667 9.87728 12.3075C9.8615 12.3483 9.83805 12.3848 9.80855 12.4145C9.7664 12.4606 9.71319 12.4918 9.65547 12.5043C9.59774 12.5169 9.53802 12.5102 9.48363 12.4851C9.42925 12.46 9.38258 12.4175 9.34935 12.363C9.31613 12.3084 9.29781 12.2442 9.29664 12.1781V10.8008H0V15.6008C0.00241507 16.873 0.452954 18.0923 1.25302 18.9919C2.05308 19.8915 3.1375 20.3981 4.26896 20.4008H12.3864C12.3091 20.1576 12.2539 19.9062 12.2218 19.6505L12.5692 19.3729H4.26896C3.37817 19.3662 2.5251 18.9678 1.89224 18.2629C1.58086 17.9138 1.3341 17.4988 1.16621 17.0419C0.998323 16.585 0.912644 16.0952 0.914124 15.6008V11.8286H8.38251V12.1781C8.38056 12.3579 8.41116 12.5363 8.47245 12.7024C8.53374 12.8685 8.62444 13.0188 8.73902 13.1443C8.97143 13.3907 9.27883 13.528 9.5983 13.528C9.91777 13.528 10.2252 13.3907 10.4576 13.1443C10.6856 12.8881 10.8139 12.5405 10.8141 12.1781V11.8286H18.2825V15.6008C18.2964 15.7683 18.2964 15.9369 18.2825 16.1044C18.2869 16.1557 18.2869 16.2073 18.2825 16.2586C18.2195 16.6821 18.0895 17.0894 17.8985 17.4612C17.8205 17.7247 17.8205 18.0096 17.8985 18.2732C17.9523 18.4552 18.0431 18.6206 18.1636 18.7562L18.2459 18.6637L18.2825 18.6021C18.8002 17.8777 19.118 16.9987 19.1966 16.0736C19.1966 16.0119 19.1966 15.9502 19.1966 15.8886C19.2011 15.827 19.2011 15.7651 19.1966 15.7036V10.8008H9.89996ZM17.2769 18.2834C17.2507 18.3163 17.2198 18.3441 17.1855 18.3657C17.1598 18.4049 17.129 18.4396 17.0941 18.4684C16.4884 19.0458 15.7217 19.3659 14.9276 19.3729H14.0775L14.2969 20.1233C14.3254 20.2213 14.3653 20.3146 14.4157 20.4008H14.9276C15.6146 20.3948 16.2907 20.2082 16.9021 19.856L17.0575 19.7532L17.2038 19.6505L17.3501 19.1468C17.4143 18.9265 17.4143 18.6888 17.3501 18.4684C17.3312 18.4042 17.3067 18.3422 17.2769 18.2834Z"
                        fill="#2E71EB"
                      />
                      <path
                        d="M15.3234 3.2214H14.4334C14.245 2.31258 13.7497 1.49622 13.0307 0.909357C12.3139 0.319983 11.4144 -0.0015262 10.4864 1.62842e-05H8.87091C7.9419 -0.00262866 7.04072 0.317003 6.32099 0.904426C5.60127 1.49185 5.10754 2.3107 4.92398 3.2214H4.03399C2.9649 3.22396 1.94032 3.64979 1.18435 4.40576C0.428384 5.16172 0.0025546 6.1863 0 7.2554V9.67386H19.3477V7.2554C19.3451 6.18797 18.9206 5.16485 18.1668 4.40916C17.4129 3.65346 16.3908 3.22651 15.3234 3.2214ZM6.61691 3.2214C6.7846 2.75346 7.09188 2.34827 7.49722 2.06054C7.89827 1.7741 8.37808 1.61866 8.87091 1.61555H10.4864C10.9827 1.61602 11.4664 1.77161 11.8698 2.06054C12.2751 2.34827 12.5824 2.75346 12.7501 3.2214H6.61691Z"
                        fill="#2E71EB"
                      />
                    </svg>
                  </BurgerMenuLink>
                )}

                <BurgerMenuLink
                  Href={"/setting/parametre"}
                  Title={getTranslation(
                    `Account sittings`, // -----> Englais
                    `Paramètres du compte` //  -----> Francais
                    //   ``,  //  -----> Turkey
                    //   `` ,  //  -----> Allemagne
                  )}
                  Svg={``}
                >
                  <svg
                    width="21"
                    height="23"
                    viewBox="0 0 21 23"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.23598 9.58445C7.90059 9.58445 7.5834 9.64865 7.27772 9.74065V7.66794C7.27772 7.13899 7.70702 6.70969 8.23598 6.70969C8.76493 6.70969 9.19423 7.13899 9.19423 7.66794V9.74065C8.88855 9.64865 8.57136 9.58445 8.23598 9.58445ZM8.23598 11.0218C7.1771 11.0218 6.31947 11.8795 6.31947 12.9383C6.31947 13.6455 6.70756 14.2569 7.27772 14.5894V15.334C7.27772 15.8629 7.70702 16.2922 8.23598 16.2922C8.76493 16.2922 9.19423 15.8629 9.19423 15.334V14.5894C9.76439 14.2579 10.1525 13.6465 10.1525 12.9383C10.1525 11.8795 9.29485 11.0218 8.23598 11.0218ZM13.0272 8.41251V7.66794C13.0272 7.13899 12.5979 6.70969 12.069 6.70969C11.54 6.70969 11.1107 7.13899 11.1107 7.66794V8.41251C10.5406 8.74406 10.1525 9.35543 10.1525 10.0636C10.1525 11.1224 11.0101 11.9801 12.069 11.9801C13.1279 11.9801 13.9855 11.1224 13.9855 10.0636C13.9855 9.35639 13.5974 8.74502 13.0272 8.41251ZM11.1107 13.2613V15.334C11.1107 15.8629 11.54 16.2922 12.069 16.2922C12.5979 16.2922 13.0272 15.8629 13.0272 15.334V13.2613C12.7216 13.3533 12.4044 13.4175 12.069 13.4175C11.7336 13.4175 11.4164 13.3533 11.1107 13.2613ZM20.1126 17.2466C19.8462 17.7076 19.3632 17.9663 18.8659 17.9663C18.6225 17.9663 18.3753 17.905 18.1491 17.7746L17.6316 17.4757C16.1588 19.3155 14.0238 20.5948 11.5899 20.9637V21.5626C11.5899 22.3561 10.9469 23 10.1525 23C9.35809 23 8.7151 22.3561 8.7151 21.5626V20.9637C6.2821 20.5948 4.14615 19.3155 2.67331 17.4757L2.15586 17.7746C1.92971 17.905 1.68248 17.9663 1.43908 17.9663C0.94175 17.9663 0.458791 17.7076 0.192396 17.2466C-0.204321 16.5586 0.0323678 15.6799 0.719435 15.2832L1.23593 14.9852C0.811428 13.9033 0.569948 12.7304 0.569948 11.5C0.569948 10.2696 0.811428 9.0967 1.23593 8.01483L0.719435 7.71681C0.0323678 7.3201 -0.204321 6.44138 0.192396 5.75335C0.590071 5.06629 1.46879 4.83151 2.15586 5.22536L2.67331 5.52433C4.14615 3.68448 6.28114 2.40522 8.7151 2.03629V1.43738C8.7151 0.643946 9.35809 0 10.1525 0C10.9469 0 11.5899 0.643946 11.5899 1.43738V2.03629C14.0229 2.40522 16.1588 3.68448 17.6316 5.52433L18.1491 5.22536C18.8381 4.83151 19.7168 5.06629 20.1126 5.75335C20.5093 6.44138 20.2726 7.3201 19.5855 7.71681L19.069 8.01483C19.4935 9.0967 19.735 10.2696 19.735 11.5C19.735 12.7304 19.4935 13.9033 19.069 14.9852L19.5855 15.2832C20.2726 15.6799 20.5093 16.5586 20.1126 17.2466ZM16.8603 11.501C16.8603 7.80306 13.8513 4.79318 10.1525 4.79318C6.45362 4.79318 3.44471 7.80306 3.44471 11.501C3.44471 15.1989 6.45362 18.2087 10.1525 18.2087C13.8513 18.2087 16.8603 15.1989 16.8603 11.501Z"
                      fill="#2E71EB"
                    />
                  </svg>
                </BurgerMenuLink>

                <BurgerMenuLink
                  Href={"/setting/social"}
                  Title={getTranslation(
                    `Social media`, // -----> Englais
                    `Réseaux sociaux` //  -----> Francais
                    //   ``,  //  -----> Turkey
                    //   `` ,  //  -----> Allemagne
                  )}
                  Svg={``}
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.44383e-05 10.9871C-0.00932125 13.3378 1.88872 15.251 4.23945 15.2603C5.32205 15.2646 6.36563 14.8562 7.15773 14.1182L13.5006 16.9821C13.4565 17.2192 13.4324 17.4596 13.4283 17.7008C13.4208 20.0677 15.3334 21.9925 17.7003 22C20.0673 22.0075 21.992 20.0948 21.9995 17.7279C22.0071 15.361 20.0944 13.4362 17.7275 13.4287C16.3133 13.4242 14.9881 14.1176 14.1854 15.2819L8.22617 12.5911C8.64945 11.569 8.65108 10.421 8.23076 9.3977L14.1818 6.69317C15.5218 8.6313 18.1793 9.11608 20.1175 7.77603C22.0556 6.43598 22.5403 3.77853 21.2003 1.8404C19.8602 -0.0977258 17.2027 -0.582505 15.2646 0.757547C14.1104 1.55561 13.4224 2.87017 13.4246 4.27344C13.4284 4.51497 13.453 4.75569 13.4978 4.99305L7.17147 7.86783C5.45745 6.25835 2.76322 6.34311 1.15375 8.05713C0.408852 8.85047 -0.00399966 9.89887 3.44383e-05 10.9871Z"
                      fill="#2E71EB"
                    />
                  </svg>
                </BurgerMenuLink>

                <BurgerMenuLink Svg={``}>
                  <svg
                    width="30"
                    height="20"
                    viewBox="0 0 30 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.75 0H6.25C2.79875 0 0 2.7975 0 6.25V13.75C0 17.2013 2.79875 20 6.25 20H23.75C27.1963 20 30 17.1963 30 13.75V6.25C30 2.80375 27.1963 0 23.75 0ZM10.15 15C9.7425 15 9.38875 14.7188 9.2975 14.3212L8.96625 12.875H5.955L5.6125 14.3263C5.51875 14.7213 5.1675 15 4.76125 15C4.1975 15 3.78125 14.4738 3.91 13.925L5.67625 6.43375C5.9275 5.35125 7.0975 4.67625 8.24625 5.1575C8.795 5.3875 9.16375 5.915 9.29875 6.495L11.0025 13.93C11.1275 14.4775 10.7125 15 10.15 15ZM27.5 13.75C27.5 15.8175 25.8175 17.5 23.75 17.5H15V2.5H23.75C25.8175 2.5 27.5 4.1825 27.5 6.25V13.75ZM25.625 7.02V7.04625C25.625 7.47125 25.28 7.81625 24.855 7.81625H24.46C24.3088 9.41 23.6888 11.23 22.4513 12.6488C23.1287 13.06 23.9412 13.3538 24.9312 13.4475C25.325 13.485 25.625 13.8175 25.625 14.2138V14.24C25.625 14.6975 25.23 15.05 24.775 15.0062C23.3538 14.87 22.2012 14.395 21.265 13.7288C20.3237 14.4012 19.1575 14.8725 17.725 15.0062C17.27 15.0487 16.8763 14.6962 16.8763 14.2387V14.2125C16.8763 13.8112 17.1863 13.4825 17.5863 13.445C18.5713 13.3512 19.3837 13.0613 20.0575 12.6513C19.6437 12.1775 19.2987 11.6588 19.0163 11.1175C18.75 10.6075 19.1275 9.9975 19.7025 9.9975H19.715C19.9975 9.9975 20.2612 10.15 20.3913 10.4C20.6225 10.84 20.9113 11.2637 21.2575 11.6525C22.28 10.5025 22.7475 9.0175 22.8862 7.81375H17.6475C17.2225 7.81375 16.8775 7.46875 16.8775 7.04375V7.0175C16.8775 6.5925 17.2225 6.2475 17.6475 6.2475H20.4688V5.7675C20.4688 5.3425 20.8137 4.9975 21.2387 4.9975H21.265C21.69 4.9975 22.035 5.3425 22.035 5.7675V6.2475H24.8563C25.2812 6.2475 25.6262 6.5925 25.6262 7.0175L25.625 7.02ZM7.58125 6.82875L8.565 11.125H6.36875L7.3825 6.82875C7.39375 6.7825 7.43375 6.75 7.48125 6.75C7.52875 6.75 7.57125 6.7825 7.58125 6.82875Z"
                      fill="#2E71EB"
                    />
                  </svg>
                  <LanguageToggler isCenter={true} hide={true} color={true} />
                </BurgerMenuLink>

                <div className=" mx-2 flex justify-center items-center px-14 py-2  w-[92%] text-base font-medium text-white whitespace-nowrap bg-orange-500 max-w-[358px] rounded-[30px]">
                  <div className="flex gap-4 justify-center px-2">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/30585a5bb8d62f74b1b9c52dc172f1b6ee4a54abd3586b6ad999e50fc95fae16?"
                      className="w-5 aspect-square"
                    />
                    <div className="flex-auto " onClick={handleLogout}>
                      {getTranslation(
                        `Log-out`, // -----> Englais
                        `Déconnexion` //  -----> Francais
                        //   ``,  //  -----> Turkey
                        //   `` ,  //  -----> Allemagne
                      )}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default Header;
