import React, { useState, Fragment, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Config } from "../config";
import {Context} from "../index"
function Login({ setAuthStatus }) {
  const {_currentLang, _setLang, getTranslation} = React.useContext(Context)
  const [verificationMessage, setVerificationMessage] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(false); // New state variable for login error
  const [invalidPassword, setInvalidPassword] = useState(false); // New state variable for invalid password
  const location = useLocation();

  // Use state to track whether to reload the component
  const [shouldReload, setShouldReload] = useState(false);

  // Check if the component needs to be reloaded when the route changes
  useEffect(() => {
    // Set the reload state to true when the route changes
    setShouldReload(true);

    // You can perform any additional logic or data fetching needed on reload

    // Example: Force a re-fetch of user data or perform other actions
    // fetchData();
  }, [location.pathname]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`${Config.LOCAL_URL}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: data.identifier, // Use the value from the identifier field
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(result));
        localStorage.setItem("accessToken", result.accessToken);

        // Call the setAuthStatus function with the token
        setAuthStatus(true, result.accessToken);

        const verificationResponse = await fetch(
          `${Config.LOCAL_URL}/api/auth/check-verification/${result.id}`
        );
        const verificationResult = await verificationResponse.json();

        if (!verificationResult.isVerified) {
          setIsEmailVerified(false);
          setVerificationMessage(
            <div className="bg-blue-200 text-base p-2 justify-center mt-8 mb-1 animate-pulse rounded-md">
              {
             getTranslation(
              `Check your email inbox to confirm your email address!`,  // -----> Englais
              `Vérifier votre boite email pour confirmer votre adresse  email!`, //  -----> Francais
              ``,  //  -----> Turkey
              `` ,  //  -----> Allemagne
              ) 

            } 

            </div>
          );
        } else {
          setIsEmailVerified(true);
          navigate("/home");
        }
      } else {
        if (response.status === 401) {
          setInvalidPassword(true); // Set invalidPassword to true if the password is invalid
        } else {
          setErrMsg({ status: "failed", message: result.message });
          setLoginError(true); // Set loginError to true for other login errors
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrMsg({
        status: "failed",
        message: "An error occurred during login.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationClose = () => {
    setShowVerificationPopup(false);
  };

  return (
    <Fragment>
      <div className="flex flex-col justify-center bg-gray-200">
        <div className="justify-center w-full rounded-2xl max-md:max-w-full">
          <div className="flex  max-md:flex-col max-md:gap-0 max-md:">
            <div className="flex flex-col w-[62%] max-md:ml-0 max-md:w-full  md:flex">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1cb97e1663c2da81f6d5683f20c7941dffda20d6bbb2d2c0c186a0b041803375?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                className="grow w-full aspect-[1.0] max-md:max-w-full"
              />
            </div>

            <div className="flex flex-col mb-10 ml-5 w-[38%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col  justify-between px-12  w-full bg-gray-200 max-md:px-5">
               <Link to="/"                   className="self-center mt-6 mb-6 max-w-full aspect-[2.78] w-[132px] max-md:mt-10"
> <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a1284a5dcef540714cf1bd78a1d61d4a149cfc66fd6e4422229107187f1c5f60?apiKey=1233a7f4653a4a1e9373ae2effa8babd&"
                  className="self-center mt-6 mb-6 max-w-full aspect-[2.78] w-[132px] max-md:mt-10"
                /></Link>
                <div className="tal1 text-5xl font-bold  text-center text-zinc-900 ">

                  {
             getTranslation(
              `Welcome ! `,  // -----> Englais
              ` Bienvenue !`, //  -----> Francais
              `Hoş geldin`,  //  -----> Turkey
              `` ,  //  -----> Allemagne
              ) 

            }                  
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="tal1 self-center mt-4  text-lg text-zinc-900 ">
                    
           {
             getTranslation(
              `Username / Email`,  // -----> Englais
              `Nom d'utilisateur / Email `, //  -----> Francais
              ``,  //  -----> Turkey
              `` ,  //  -----> Allemagne
              ) 

            } 
                  </div>
                  <input
                    type="text"
                    {...register("identifier")}
                    className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 w-full text-base whitespace-nowrap border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] text-zinc-900 max-md:pr-5 max-md:max-w-full"
                    placeholder={
                      getTranslation(
                       `Your Username or Email`,  // -----> Englais
                       `Votre Nom Utilisateur ou Email `, //  -----> Francais
                       ``,  //  -----> Turkey
                       `` ,  //  -----> Allemagne
                       ) 
         
                     } 
                  />
                  <div className="tal1 self-center mt-2 text-lg text-zinc-900">
                  {
                      getTranslation(
                       `Password`,  // -----> Englais
                       `Mot de Passe `, //  -----> Francais
                       ``,  //  -----> Turkey
                       `` ,  //  -----> Allemagne
                       ) 
         
                     }  
                  </div>

                  <input
                    type="password"
                    {...register("password")}
                    className="justify-center items-start py-3.5 pr-16 pl-4 mt-2 w-full text-base whitespace-nowrap border-solid bg-zinc-100 border-[0.5px] border-[color:var(--black-100-e-5-e-5-e-5,#E5E5E5)] rounded-[30px] text-zinc-900 max-md:pr-5 max-md:max-w-full"
                    placeholder={
                      getTranslation(
                       `Your Password`,  // -----> Englais
                       `Votre Mot de Passe `, //  -----> Francais
                       ``,  //  -----> Turkey
                       `` ,  //  -----> Allemagne
                       ) 
         
                     }  
                  />

<Link
                      to="/forgot"
                      className="tal2 flex flex-1 w-full justify-end text-right self-end md:text-base text-sm font-medium py-2 text-blue-600 underline whitespace-nowrap"
                    >
                    <p>
                    {
             getTranslation(
              `Forgot Password?`,  // -----> Englais
              `Mot de passe oublié ?`, //  -----> Francais
              ``,  //  -----> Turkey
              `` ,  //  -----> Allemagne
              ) 

            } </p>  
                    </Link>





                  {loginError && (
                    <div className="bg-red-100 text-sm mt-8 animate-pulse rounded-md">
                      
           {
             getTranslation(
              `Account does not exist! Please check your credentials!`,  // -----> Englais
              `Compte inexistant! Vérifier vos coordonnées! `, //  -----> Francais
              ``,  //  -----> Turkey
              `` ,  //  -----> Allemagne
              ) 

            } 
                    </div>
                  )}

                  <div className="flex gap-2 justify-between mt-1 max-md:flex-wrap max-md:max-w-full">
                    <div className="flex w-full gap-2 justify-between">
                      <div className="flex flex-col justify-center aspect-[2]"></div>
                      <div className="tal2 grow text-base whitespace-nowrap text-zinc-900">
                        <button
                          type="submit"
                          className="justify-center flex w-full  text-center items-center px-10 py-2  md:text-base  text-sm font-medium text-white whitespace-nowrap bg-blue-600 rounded-[30px] max-md:px-5 max-md:max-w-full hover:bg-blue-900
                          duration-150 border-5 border-blue-0 border-spacing-3 focus:border-blue-400 focus:outline-none-500 "
                        >
                           {
             getTranslation(
              `Log In`,  // -----> Englais
              `Se connecter `, //  -----> Francais
              ``,  //  -----> Turkey
              `` ,  //  -----> Allemagne
              ) 

            } 
                        </button>
                      </div>
                    </div>
                   
                  </div>
                  {!isEmailVerified && verificationMessage}
                  {invalidPassword && (
                    <div className="bg-red-100 text-sm mt-8 animate-pulse rounded-md">
                     

                      {
             getTranslation(
              `Invalid Password ! `,  // -----> Englais
              `Mot de passe invalide ! `, //  -----> Francais
              ``,  //  -----> Turkey
              `` ,  //  -----> Allemagne
              ) 

            } 

                    </div>
                  )}
                </form>

                <div className="flex gap-2 justify-between px-2 py-2 mt-2 text-base max-md:flex-wrap max-md:px-5 max-md:max-w-full flex-col">
                  <div className="flex-auto text-zinc-900  text-sm md:text-base text-center">
                    Vous n'avez pas compte ?
                  </div>
                  <Link
                    to="/register"
                    className="flex-auto font-medium text-blue-600 underline text-sm md:text-base text-center"
                  >
                    {
             getTranslation(
              ` creat account`,  // -----> Englais
              `Créer un Compte `, //  -----> Francais
              ``,  //  -----> Turkey
              `` ,  //  -----> Allemagne
              ) 

            } 
                
                     
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
