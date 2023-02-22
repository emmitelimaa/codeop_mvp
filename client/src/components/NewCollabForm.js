import React, { useState } from "react";
//import "./NewCollabForm.css";

const EMPTY_FORM = {
    influencer_name: "",
    handle: "",
    platform: "",
    date: "",
    brief: "",
    status_collab: "",
    followers: 0,
    price_ex_vat: 0,
    ig_post: false,
    ig_story: false,
    boosted: false,
    comments: "",
    country_code: ""
  };
  

  const INPUT_FIELDS = [
    {
      name: "influencer_name",
      label: "Influencer Name",
      type: "text"
    },
    {
      name: "handle",
      label: "Handle",
      type: "text"
    },
    {
      name: "platform",
      label: "Platform",
      type: "text"
    },
    {
      name: "date",
      label: "Date",
      type: "date"
    },
    {
      name: "brief",
      label: "Brief",
      type: "text"
    },
    {
      name: "status_collab",
      label: "Collab Status",
      type: "text"
    },
    {
      name: "followers",
      label: "Followers",
      type: "number"
    },
    {
      name: "price_ex_vat",
      label: "Price (ex. VAT)",
      type: "number"
    },
    {
      name: "ig_post",
      label: "Instagram Post",
      type: "checkbox"
    },
    {
      name: "ig_story",
      label: "Instagram Story",
      type: "checkbox"
    },
    {
      name: "boosted",
      label: "Boosted",
      type: "checkbox"
    },
    {
      name: "comments",
      label: "Comments",
      type: "text"
    },
    {
      name: "country_code",
      label: "Country Code",
      type: "text"
    }
  ];

function NewCollabForm(props) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [searchResults, setSearchResults] = useState([]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData(data => ({
      ...data,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.addCollabCb(formData);
    setFormData(EMPTY_FORM);
  }

  return (
    <form className="NewCollabForm" onSubmit={handleSubmit}>
      {INPUT_FIELDS.map(({ name, label, type }) => (
        <label key={name}>
          {label}
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            checked={formData[name]}
          />
        </label>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
}

export default NewCollabForm;



