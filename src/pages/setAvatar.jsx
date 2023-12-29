import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { Buffer } from "buffer";
import axios from "axios";

const SetAvatar = () => {
  const api = "https://api.multiavatar.com/45678945";

  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState([]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = () => {};

  useEffect(async () => {
    const data = [];

    for (let i = 0; i < 4; i++) {
      try {
        const response = await fetch(
          `${api}/${Math.round(Math.random() * 1000)}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch avatar. Status: ${response.status}`);
        }

        const svg = await response.text();
        const base64 = btoa(svg);

        // Store the base64 string in the data array
        data.push(base64);
      } catch (error) {
        console.error("Error fetching avatar:", error);
      }
    }

    // Now you can use the data array as needed
    console.log(data);
    setAvatars(data);
    setIsLoading(false);
  }, []);
  console.log(avatars);
  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Pick an avatar</h1>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar == index ? "selected " : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="Avattar"
                    onClick={() => {
                      setSelectedAvatar(index);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

export default SetAvatar;
