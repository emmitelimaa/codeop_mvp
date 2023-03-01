import React, { useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./NewCollabForm.css";

/* The form functions as a normal form, and has handleChange and handleSubmit functions.
It also works as an edit field,*/

const EMPTY_FORM = {
    influencer_name: "",
    handle: "",
    platform: "",
    date: "",
    brief: 0,
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

    //Here we are just reformatting the checkbox and date inputs so we can insert them to the database
    if (type === 'checkbox') {
      setFormData( (data) => ({
        ...data,
        [name]: checked ? 1 : 0,
      }));
    } else {
      setFormData( (data) => ({
        ...data,
        [name]: name==="date" ? new Date(value).toISOString().substring(0, 10) : value, //YYYY-MM-DD
      }))
    }
    //here we are saying that the first field also functions as a search field
    if(name === "influencer_name"){
       
        fetchInfluencers(value);
        
    }
  }
  //search function
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
  //prefills form with what we select from search
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
    props.addCollabCb(formData);
    setFormData(props.editedCollab || EMPTY_FORM);
    props.setEditingId && props.setEditingId(null);
  }


  return (
    <div>
    <Table className="NewCollabForm" responsive="sm">
      <tr>
      <td colSpan={INPUT_FIELDS.length + 1}>
        {/* <button onClick= {handleSubmit} >save</button> */}
        <InputGroup size="sm">
          <Button 
            onClick= {handleSubmit} 
            variant="outline-secondary" >
            save
          </Button>
          
          <Form.Control 
            key = "influencer_name"
            placeholder = "name"
            type = "text"
            name="influencer_name"
            value={formData.influencer_name}
            onChange={handleChange}
            checked={formData.influencer_name}
          />

          <Form.Control 
            key = "handle"
            placeholder = "handle"
            type = "text"
            name="handle"
            value={formData.handle}
            onChange={handleChange}
            checked={formData.handle}
          />

          <Form.Select
            key = "platform"
            placeholder = "platform"
            type = "text"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            checked={formData.platform} >
                    <option>Platform</option>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">Youtube</option>
                    <option value="tiktok">TikTok</option>
                    <option value="blog">Blog</option>
          </Form.Select>

          <Form.Control 
            key = "date"
            type = "date"
            name= "date"
            value= {formData.date}
            onChange={handleChange}
            checked={formData.date}
          />

          <Form.Control 
            key = "brief"
            placeholder = "brief"
            type = "number"
            name="brief"
            value={formData.brief}
            onChange={handleChange}
            checked={formData.brief}
          />

          <Form.Select
            key = "status_collab"
            placeholder = "Collab status"
            type = "text"
            name="status_collab"
            value={formData.status_collab}
            onChange={handleChange}
            checked={formData.status_collab} >
                    <option>Collab status</option>
                    <option value= "done">done</option>
                    <option value= "booked">booked</option>
                    <option value= "planning">planning</option>
                    <option value= "cancelled">cancelled</option>
          </Form.Select>

          <Form.Control 
            key = "followers"
            placeholder = "followers"
            type = "number"
            name="followers"
            value={formData.followers}
            onChange={handleChange}
            checked={formData.followers}
          />

          <Form.Control 
            key = "price_ex_vat"
            placeholder = "price ex VAT"
            type = "number"
            name="price_ex_vat"
            value={formData.price_ex_vat}
            onChange={handleChange}
            checked={formData.price_ex_vat}
          />

          <Form.Check
            key = "ig_post"
            type= "checkbox"
            name="ig_post"
            value={formData.ig_post}
            onChange={handleChange}
            checked={formData.ig_post}
          />

          <Form.Check
            key = "ig_story"
            type= "checkbox"
            name="ig_story"
            value={formData.ig_story}
            onChange={handleChange}
            checked={formData.ig_story}
          />

          <Form.Check
            key = "boosted"
            type= "checkbox"
            name="boosted"
            value={formData.boosted}
            onChange={handleChange}
            checked={formData.boosted}
          />

          <Form.Control 
            key = "comments"
            placeholder = "comments"
            type = "text"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            checked={formData.comments}
          />

          <Form.Select
            key = "country_code"
            placeholder = "Country code"
            type = "text"
            name="country_code"
            value={formData.country_code}
            onChange={handleChange}
            checked={formData.country_code} >
              <option>Country code</option>
              <option value= "SE">SE</option>
              <option value= "FI">FI</option>
              <option value= "DE">DE</option>
              <option value= "NO">NO</option>
          </Form.Select>


        {/* {INPUT_FIELDS.map(({ name, label, type }) => (

            <Form.Control classname="inputs"
              key = {name}
              aria-label={label}
              placeholder = {label}
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              checked={formData[name]}
            />
        ))} */}
        {/* <button onClick= {handleDelete} >delete</button> */}
        </InputGroup>
     </td>
      </tr>
    </Table>

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



