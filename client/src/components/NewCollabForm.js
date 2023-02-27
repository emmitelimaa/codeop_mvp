import React, { useEffect, useState} from "react";
import "./NewCollabForm.css";

const EMPTY_FORM = {
    influencer_name: "",
    handle: "",
    platform: "",
    date: "",
    brief: "",
    status_collab: "",
    followers: 0,
    price_ex_vat: 0,
    ig_post: 0,
    ig_story: 0,
    boosted: 0,
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
  const [formData, setFormData] = useState(props.editedCollab || EMPTY_FORM);
  const [searchResult, setSearchResult] = useState([]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData( (data) => ({
        ...data,
        [name]: checked ? 1 : 0,
      }));
    } else {
      setFormData( (data) => ({
        ...data,
        [name]: name==="date" ? new Date(value).toISOString().substring(0, 10) : value,
      }))
    }
    if(name === "influencer_name"){
       
        fetchInfluencers(value);
        
    }
  }

  async function fetchInfluencers(value){
    try {
        let response = await fetch(`/influencers?search=${value}`);
        if (response.ok) {
            let data = await response.json();
            
            const updatedData = data.map(item => {
              const { date, ...rest } = item;
              const newDate = new Date(date).toISOString().substring(0, 10);
              return { ...rest, date: newDate };
            });

            setSearchResult(updatedData);
        } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
        }
    } catch (err) {
        console.log(`Server error: ${err.message}`);
    }
  }

  function handleInfluencerSelect(influencer) {
    const {date, ...rest} = influencer;
    const formattedDate = new Date(date).toISOString().substring(0, 10);
    setFormData((data) => ({
      ...data,
      ...rest,
      date: formattedDate,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    props.addCollabCb(formData);
    setFormData(props.editedCollab || EMPTY_FORM);
    props.setEditingId && props.setEditingId(null);
  }


  return (
    <div>
    <table className="NewCollabForm">
      <tr>
      <button onClick= {handleSubmit} >save</button>
      {INPUT_FIELDS.map(({ name, label, type }) => (

          <input
            key = {name}
            placeholder = {label}
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            checked={formData[name]}
          />
      ))}
      </tr>
    </table>

    <div>
    <div className="SearchResult">
          {searchResult.map((influencer) => (
            <div key={influencer.id} onClick={() => handleInfluencerSelect(influencer)}>
              {influencer.influencer_name} {influencer.platform} {influencer.date}
            </div>
          ))}
        </div>
    </div>

    </div>
  );
}

export default NewCollabForm;



