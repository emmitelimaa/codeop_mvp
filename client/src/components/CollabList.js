import React, { useState } from "react";
//import "./CollabList.css";

function CollabList(props) {

    const headers = [
        {name: "Influencer name", id: "influencer_name", type:"string"},
        {name: "handle"}
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