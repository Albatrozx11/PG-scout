import React, { useContext, useEffect, useState, useRef } from "react";
import "./Dashboard.css";
import logo from "../../assets/logo-img-1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaPhone } from "react-icons/fa";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";
import {
  FaSearch,
  FaPlus,
  FaSignOutAlt,
  FaLightbulb,
  FaTrash,
} from "react-icons/fa";
import { app, database, storage, auth } from "../../Firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import { AuthContext } from "../../Context";

import { uploadBytes, getDownloadURL } from "firebase/storage";
import { ref } from "firebase/storage";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [selectedPGs, setSelectedPGs] = useState([]);
  const findPGRef = useRef(null);
  const addPGRef = useRef(null);
  const removePGRef = useRef(null);
  const [pg, setPg] = useState({
    house_name: "",
    rent: "",
    address: "",
    phone_number: "",
    img_url: "",
  });
  const [file, setFile] = useState(null);
  const [urlkey, seturlkey] = useState("");
  const { user } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const fetchPost = async () => {
    const db = database;
    await getDocs(collection(db, "pg")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(newData, "newData");
      setData(newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    if (findPGRef.current) {
      findPGRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [findPGRef]);

  useEffect(() => {
    if (addPGRef.current) {
      addPGRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [addPGRef]);

  useEffect(() => {
    if (removePGRef.current) {
      removePGRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [removePGRef]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPg({ ...pg, [name]: value });
  };

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleForm = () => {
    const PGImageRef = ref(storage, `images/${file.name}`);
    console.log("uploading:");

    console.log(file, "hello");
    uploadBytes(PGImageRef, file).then((snapshot) => {
      getDownloadURL(PGImageRef)
        .then((url) => {
          seturlkey(url);
          setPg({ ...pg, photo: url });
          console.log(url);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const handleAddDoc = () => {
    const dbInstance = collection(database, "pg");

    addDoc(dbInstance, {
      ...pg,
    });
  };


  const handleDeletePGs = async () => {
    for (const pgId of selectedPGs) {
      await deleteDoc(doc(database, "pg", pgId));
    }
    setSelectedPGs([]);
    console.log("PGs removed");
  };

  const handleSelectPG = (pgId) => {
    const isSelected = selectedPGs.includes(pgId);
    if (isSelected) {
      setSelectedPGs(selectedPGs.filter((id) => id !== pgId));
    } else {
      setSelectedPGs([...selectedPGs, pgId]);
    }
  };

  if (user) {
    return (
      <div className={`dashboard ${darkMode ? "dark-mode" : ""}`}>
        {/* sidebar */}
        <div className="sidebar-container">
          <nav className="sidebar">
            <div className="side-top">
              <a href="/">
                <img
                  src={logo}
                  alt="logo"
                  height={50}
                  width={50}
                  className="logo"
                />
              </a>
              <a href="/">
                <h3>Home</h3>
              </a>
            </div>
            <ul className="side-options">
              <li
                className="search option"
                onClick={() =>
                  findPGRef.current.scrollIntoView({ behavior: "smooth" })
                }
              >
                <FaSearch className="icon" />
                <p>Find a PG</p>
              </li>
              <li
                className="add option"
                onClick={() =>
                  addPGRef.current.scrollIntoView({ behavior: "smooth" })
                }
              >
                <FaPlus className="icon" />
                <p>Add new PG</p>
              </li>
              <a href="/" >
                <li className="signout option">
                  <FaSignOutAlt className="icon" />
                  <p>Sign out</p>
                </li>
              </a>
              <li className="toggle option" onClick={toggleDarkMode}>
                <FaLightbulb className="icon" />
                <p>Toggle l/d</p>
              </li>
              <li
                className="delete-pg option"
                onClick={() =>
                  removePGRef.current.scrollIntoView({ behavior: "smooth" })
                }
              >
                <FaTrash className="icon" />
                <p>Remove your PGs</p>
              </li>
            </ul>
          </nav>
        </div>
        <div className="main-box" ref={findPGRef}>
          {/* user-profile */}
          <div className="main-container">
            <div className="user">
              <img src={user.photoURL} alt="pfp" />
              <h3>
                Welcome Back! <p>{user.displayName}</p>
              </h3>
            </div>
            <h1>Dashboard</h1>
          </div>
          {/* FINDPG */}
          <div ref={findPGRef}>
            {data.length > 0 ? (
              <div className="find-pg">
                {data.map((pg) => (
                  <div key={pg.id} className="pg-content">
                    <img src={pg.photo} alt="house" />
                    <div className="pg-info">
                      <div className="pg-name">
                        <h1>{pg.house_name}</h1>
                        <p className="rent">{pg.rent}</p>
                      </div>
                      <div className="other-info">
                        <div className="address">
                          <FontAwesomeIcon
                            icon={faThumbtack}
                            className="pg-icon"
                          />
                          <span>{pg.address}</span>
                        </div>
                        <div className="contact">
                          <FaPhone className="pg-icon" />
                          <span>{pg.phone_number}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h1 className="nopg">No PGs Available</h1>
            )}
          </div>
          {/* ADDPG */}
          <div ref={addPGRef}>
            <div className="add-pg">
              <div className="form-div">
                <h2 className="form-header">Add New PG</h2>
                <form className="form">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Enter House Name"
                      className="form-input"
                      id="house_name"
                      name="house_name"
                      value={pg.house_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Enter Rent"
                      className="form-input"
                      id="rent"
                      name="rent"
                      value={pg.rent}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Enter Address"
                      className="form-input add-form"
                      id="address"
                      name="address"
                      value={pg.address}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      placeholder="Enter Phone Number"
                      className="form-input"
                      id="phone_number"
                      name="phone_number"
                      value={pg.phone_number}
                      onChange={handleChange}
                    />
                  </div>
                </form>
              </div>
              <div className="add-img">
                <h2 className="form-header">Add Images of your PG</h2>
                <div className="form-group img-div">
                  <input
                    type="file"
                    placeholder="Choose Image"
                    className="form-input img-input"
                    onChange={(event) => handleFileInputChange(event)}
                    accept="image/*"
                  ></input>
                  <button onClick={handleForm} type="button" className="upload">
                    Upload Image
                  </button>
                </div>
                <button
                  onClick={handleAddDoc}
                  type="button"
                  className="form-submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          {/* Remove your PGs */}
          <div className="remove-pgs" ref={removePGRef}>
            <h2>Remove your PGs</h2>
            <select
              multiple
              value={selectedPGs}
              onChange={(e) =>
                setSelectedPGs(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
            >
              {data.map((pg) => (
                <option key={pg.id} value={pg.id}>
                  {pg.house_name}
                </option>
              ))}
            </select>
            <button onClick={handleDeletePGs} type="button">
              Remove
            </button>
          </div>
        </div>
      </div>
    );
  }
}
