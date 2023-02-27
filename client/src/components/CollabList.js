import React, { useState } from "react";
import NewCollabForm from "./NewCollabForm";
import "./CollabList.css";

function CollabList(props) {

    const headers = [
        {name: "Influencer name", id: "influencer_name", type:"string"},
        {name: "handle", id: "handle", type:"string"},
        {name: "platform", id: "platform", type:"string"},
        {name: "date", id: "date", type:"date", format: "yyyy-MM-dd"},
        {name: "brief", id: "brief", type:"int"},
        {name: "collaboration status", id: "status_collab", type:"string"},
        {name: "followers", id: "followers", type:"int"},
        {name: "price (ex VAT)", id: "price_ex_vat", type:"int"},
        {name: "ig post", id: "ig_post", type:"boolean"},
        {name: "ig story", id: "ig_story", type:"boolean"},
        {name: "boosted content", id: "boosted", type:"boolean"},
        {name: "comments", id: "comments", type:"text"},
        {name: "country code", id: "country_code", type:"text"},
    ]

    const [editingId, setEditingId] = useState(null);
    const [editedCollab, setEditedCollab] = useState(null);

    async function handleEditClick(id) {
        setEditingId(id);
        setEditedCollab(props.collabs.find((c) => c.collab_id === id));

    }

    return (
        <table className="CollabList">
          <thead>
            <tr>
              <p></p>
              {headers.map(header => (
                <th key={header.name}>{header.name}</th>
              ))}
            </tr>
          </thead>
      
          <tbody>
            {props.collabs.map(c => (
              c.collab_id === editingId ? (
                <tr key={c.collab_id}>
                  <td colSpan={headers.length + 1}>
                    <NewCollabForm 
                    editingId = {editingId}
                    editedCollab = {editedCollab}
                    setEditingId = {setEditingId}
                    addCollabCb = {props.addCollabCb}
                    />
                  </td>
                </tr>
              ) : (
                <tr key={c.collab_id}>
                  <td>
                    <button
                      onClick={e => handleEditClick(c.collab_id)}
                      title="edit"
                      type="button"
                    >
                      edit
                    </button>
                  </td>
                  {headers.map(header => {
                    const value =
                      header.id === "date"
                        ? new Date(c[header.id]).toISOString().substring(0, 10)
                        : c[header.id];
                    return <td key={header.id}>{value}</td>;
                  })}
                </tr>
              )
            ))}
          </tbody>
        </table>
      );
      
}

export default CollabList;