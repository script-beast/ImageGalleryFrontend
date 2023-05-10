import React from "react";
import "./NewForm.css";
import { useNavigate } from "react-router-dom";

import BaseURL from "../Api/BaseURL";

export default function NewForm() {
  const navigate = useNavigate();

  const [Imgs, setImgs] = React.useState({
    ImgName: "",
    ImgURL: "",
    ImgDetails: "",
  });

  function onChange(event) {
    const { name, value } = event.target;

    setImgs((prevdata) => {
      return {
        ...prevdata,
        [name]: value,
      };
    });
  }

  const onSubmitImg = async (event) => {
    event.preventDefault();
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Imgs),
      };
      const response = await fetch(BaseURL, requestOptions);
      const data = await response.json();
      console.log(data);
      if (data) {
        navigate("/");
        window.alert("Image Added");
      }
    } catch (error) {
      console.log(error.message);
      window.alert("Image not Added. Please Check Console");
    }
  };

  return (
    <div className="NewFormContainer">
      <div className="form">
        <div className="title">Add Image</div>
        <div className="subtitle">Fill the details !</div>
        <div className="input-container ic1">
          <input
            id="ImgName"
            className="input"
            type="text"
            name="ImgName"
            placeholder=" "
            onChange={onChange}
            value={Imgs.ImgName}
          />
          <div className="cut"></div>
          <label htmlFor="ImgName" className="labplaceholder">
            Image Name
          </label>
        </div>
        <div className="input-container ic2">
          <input
            id="ImgURL"
            className="input"
            type="text"
            name="ImgURL"
            placeholder=" "
            onChange={onChange}
            value={Imgs.ImgURL}
          />
          <div className="cut"></div>
          <label htmlFor="ImgURL" className="labplaceholder">
            Image URL
          </label>
        </div>
        <div className="input-container ic2">
          <input
            id="ImgDetails"
            className="input"
            type="text"
            name="ImgDetails"
            placeholder=" "
            onChange={onChange}
            value={Imgs.ImgDetails}
          />
          <div className="cut cut-short"></div>
          <label htmlFor="ImgDetails" className="labplaceholder">
            Details
          </label>
        </div>
        <button type="text" onClick={onSubmitImg} className="submit">
          Add
        </button>
      </div>
    </div>
  );
}
