import React, { useState } from "react";
//import "./NewCollabForm.css";

const EMPTY_FORM = {
  influencer_name: "",
  handle: "",
  platform: ""
};

function NewCollabForm(props) {
  const [formData, setFormData] = useState(EMPTY_FORM);

  function handleChange(e) {
    let { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.addCollabCb(formData);
    setFormData(EMPTY_FORM);
  }

  return (
    <form className="NewCollabForm" onSubmit={handleSubmit}>
      <label>
        Influencer name
        <input
          type="text"
          name="influencer_name"
          value={formData.influencer_name}
          onChange={handleChange}
        />
      </label>

      <label>
        Handle
        <input
          type="text"
          name="handle"
          value={formData.handle}
          onChange={handleChange}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

export default NewCollabForm;
