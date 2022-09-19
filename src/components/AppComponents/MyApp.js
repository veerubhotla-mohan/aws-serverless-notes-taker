import React, { useEffect } from "react";
import Navigationbar from "./Navigationbar";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const axios = require("axios");
const MyApp = () => {
  const navigate = useNavigate();
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({});
  const [userNotes, setUserNotes] = useState([]);
  const [newNoteEntered, setNewNoteEntered] = useState("");

  useEffect(() => {
    async function checkAnyUser() {
      try {
        const userLoggedin = await Auth.currentAuthenticatedUser();
        setLoggedInUserDetails({
          token: userLoggedin.signInUserSession.idToken.jwtToken,
          name: userLoggedin.attributes.name,
        });
      } catch (error) {
        navigate("/");
      }
    }
    checkAnyUser();
  }, []);

  async function getNotes() {
    try {
      const notes = await axios({
        method: "get",
        url: process.env.REACT_APP_APIGATEWAYURL,
        headers: {
          Authorization: loggedInUserDetails.token,
        },
        params: {
          username: loggedInUserDetails.name,
        },
      });
      setUserNotes(notes.data.Items);
    } catch (error) {}
  }
  useEffect(() => {
    getNotes();
  }, [loggedInUserDetails]);

  const newNoteInputChangeHandler = (event) => {
    setNewNoteEntered(event.target.value);
  };
  const addNoteHandler = async (event) => {
    event.preventDefault();
    const newNote = {
      note: newNoteEntered,
      creation_timestamp: Date.now(),
    };
    try {
      const addNoteResult = await axios({
        method: "post",
        url: process.env.REACT_APP_APIGATEWAYURL,
        data: newNote,
        headers: {
          Authorization: loggedInUserDetails.token,
        },
        params: {
          username: loggedInUserDetails.name,
        },
      });
      setNewNoteEntered("");
      getNotes();
    } catch (error) {}
  };
  const deleteNoteHandler = async (event, creation_timestamp) => {
    event.preventDefault();
    await axios({
      method: "delete",
      url: process.env.REACT_APP_APIGATEWAYURL,
      headers: {
        Authorization: loggedInUserDetails.token,
      },
      data: {
        creation_timestamp: creation_timestamp,
      },
      params: {
        username: loggedInUserDetails.name,
      },
    });
    getNotes();
  };
  return (
    <div className="text-center">
      <Navigationbar></Navigationbar>
      <form className="text-center mt-4" onSubmit={addNoteHandler}>
        <input
          className="form-control"
          type="text"
          name="userNote"
          id="userNote"
          value={newNoteEntered}
          onChange={newNoteInputChangeHandler}
        />
        <button className="btn btn-primary mt-3" type="submit">
          Add Note
        </button>
      </form>
      <h4 className="mt-4">Your notes</h4>
      {userNotes.length ? (
        <div className="text-center">
          {userNotes.map((note, index) => {
            return (
              <div key={index} className="mt-3">
                <h3>{note.note}</h3>
                <button
                  className="btn btn-danger"
                  onClick={(event) =>
                    deleteNoteHandler(event, note.creation_timestamp)
                  }
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MyApp;
