const CollabHeaders = [
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
];

export default CollabHeaders;