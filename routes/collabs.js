var express = require('express');
var router = express.Router();
const db = require("../model/helper");


/* GET home page. */
router.get("/", function(req, res, next) {
  db("SELECT * FROM collabs;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err.message));
});

//Getting 
router.get("/:", async (req, res, next) => {
  let id = req.params.id;

  try {
    let result = await db(`SELECT * FROM collabs WHERE collab_id = ${id};`);

    if (result.data.length !== 0) {
      res.send(result.data);
    } else {
      res.status(404).send({ error: "collaboration not found" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res, next) => {
  let { firstname, lastname } = req.body;

  try {
    await db(`INSERT INTO collabs (influencer_name, 
      handle, 
      platform,
      date,
      brief,
      status_collab,
      followers,
      price_ex_vat,
      ig_post,
      ig_story,
      boosted,
      comments,
      country_code
      )
      VALUES ('${influencer_name}', 
      '${handle}',
      '${platform}',
      '${date}',
      '${brief}',
      '${status_collab}',
      '${followers}',
      '${price_ex_vat}',
      '${ig_post}',
      '${ig_story}',
      '${boosted}',
      '${comments}',
      '${country_code}')`);

    let result = await db("SELECT * FROM collabs ORDER BY collab_id DESC");
    res.send(result.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:collab_id", async (req, res) => {
  let id = req.params.collab_id;
  let { influencer_name, 
    handle, 
    platform,
    date,
    brief,
    status_collab,
    followers,
    price_ex_vat,
    ig_post,
    ig_reel,
    ig_video,
    boosted,
    comments,
    country_code } = req.body;

  try {
      let result = await db(`SELECT * FROM collabs WHERE collab_id = ${id}`);  // does duck exist?
      if (result.data.length === 0) {
          res.status(404).send({ error: 'Collaboration not found' });
      } else {
          let sql = `
              UPDATE collabs 
              SET influencer_name = '${influencer_name}', 
              handle = '${handle}', 
              platform = '${platform}',
              date = '${date}',
              brief = '${brief}',
              status_collab = '${status_collab}',
              followers = '${followers}',
              price_ex_vat = '${price_ex_vat}',
              ig_post= '${ig_post}',
              ig_story = '${ig_story}',
              boosted = '${boosted}',
              reminder = '${reminder}',
              comments = '${comments}',
              country_code = '${country_code}',
              WHERE collab_id = ${id}
          `;

          await db(sql);  // update duck
          let result = await db('SELECT * FROM collabs');
          let collabs = result.data;
          res.send(collabs);  // return updated array
      }
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

router.delete("/:collab_id", async (req, res, next) => {
  let id = req.params.id;

  try {
    let result = await db(`SELECT * FROM students WHERE id = ${id}`);

    if (result.data.length !== 0) {
      await db(`DELETE FROM students WHERE id = ${id}`);
      let result = await db("SELECT * FROM students");
      res.send(result.data);
    } else {
      res.status(404).send({ error: "student not found" });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
