import React, { useState } from "react";
//import "./CollabList.css";

function CollabList(props) {

    const headers = [
        {name: "Influencer name", id: "influencer_name", type:"string"},
        {name: "handle", id: "handle", type:"string"},
        {name: "platform", id: "platform", type:"string"},
        {name: "date", id: "date", type:"date"},
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
  return (
    <table className="StudentList">
        <thead>
            <tr>
                {
                    headers.map(header => <th>{header.name}</th>)
                }
                {/* <th>influencer name</th>
                <th>handle</th>
                <th>platform</th>
                <th>date</th>
                <th>brief</th>
                <th>material status</th>
                <th>collab status</th>
                <th>followers</th>
                <th>relevant followers %</th>
                <th>price ex vat</th>
                <th>ig post</th>
                <th>ig reel</th>
                <th>ig video</th>
                <th>boosted</th>
                <th>reminder</th>
                <th>comments</th>
                <th>country code</th> */}
            </tr>
        </thead>
        <tbody>
            {props.collabs.map(c => (
                <tr key={c.id}>
                    {/* <td>
                        {c.influencer_name}
                        
                    </td> */}
                    {
                    headers.map(header => <td>{c[header.id]}</td>)
                }

                </tr>
            ))}
        </tbody>
    </table>
  );
}

export default CollabList;