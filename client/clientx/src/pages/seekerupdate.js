import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AWS from "aws-sdk";
import React from "react";

function Profile() {
  const [file, setFile] = useState(null);

  const [userData, setUserData] = useState({
    id: "",
    username: "",
    email: "",
    UserType: "",
    FirstName: "",
    LastName: "",
    ProfileImage: "",
    ContactInformation: "",
    ResumeFilePath: "",
  });

  useEffect(() => {
    let isMounted = true;

    axios
      .get(`http://localhost:3001/profile`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (isMounted) {
          console.log(JSON.stringify(response.data));
          setUserData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });

    return () => {
      isMounted = false; // Set isMounted to false when the component is unmounted
    };
  }, []);

  const handleInputChange = (e) => {
    // Update the corresponding field in the state when input changes
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  let navi = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a request to update the user profile
      const response = await axios.put(
        `http://localhost:3001/profile/${userData.id}`,
        userData,
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      );

      console.log("Profile updated successfully:", response.data);
      navi("/");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const uploadFile = async () => {
    const fileName = `${userData.id}_${file.name}`;
    const fileType = file.type;

    try {
      // Request pre-signed URL from server
      const s3response = await axios.post("http://localhost:3001/auth/upload", {
        fileName,
        fileType,
      });

      const { url } = s3response.data;
      alert(url);
      //const Fileurl = url.split("?")[0];
      // Upload the file to S3 using pre-signed URL
      await axios.put(url, file, {
        headers: {
          "Content-Type": fileType,
        },
      });

      setUserData({
        ...userData,
        ResumeFilePath: url.split("?")[0], // Extract URL without query parameters
      });
      alert(userData);
      alert("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error);
      //alert("Error uploading file.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    console.log("isssss", file);
  };

  return (
    <div>
      <h1>Profile</h1>
      <div className="">
        <form onSubmit={handleSubmit}>
          <div>
            <label>ID:</label>
            <p>{userData.id}</p>
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="FirstName"
              value={userData.FirstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="LastName"
              value={userData.LastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Profile Image:</label>
            <input
              type="text"
              name="ProfileImage"
              value={userData.ProfileImage}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Contact Information:</label>
            <input
              type="text"
              name="ContactInformation"
              value={userData.ContactInformation}
              onChange={handleInputChange}
            />
          </div>
          <div className="innerFile">
            <label>Resume File Path:</label>
            <input type="file" onChange={handleFileChange} />
            <label>{userData.ResumeFilePath}</label>

            <button onClick={uploadFile}>Upload</button>
          </div>

          <button type="submit">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
