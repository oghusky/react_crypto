require("dotenv").config();
const express = require('express'),
  app = express(),
  path = require('path'),
  mongoose = require('mongoose'),
  PORT = process.env.PORT || 3001;


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("CONNECTED TO DB")
})

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.urlencoded({ extended: true }));

// initiate routes
const stockRoutes = require('./routes/stock-routes');
// use routes
app.use("/api", stockRoutes);

// test route
app.get("/config", (req, res) => {
  res.json({
    status: "SERVER WORKS"
  })
})

// index html route
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// })

// listening port
app.listen(PORT, () => {
  console.log('SERVER STARTED ON PORT: ' + PORT);
})

// const fetchData = async (url) => {
//   const axios = require("axios");
//   const cheerio = require("cheerio");
//   let result = await axios.get(url);
//   return cheerio.load(result.data);
// }

// const getYoutube = async (url) => {
//   const yt = await fetchData(url);
//   const tube = yt("body").children()[9].children[0].data.split("var ytInitialData = ")[1].split(";")[0];
//   const parsed = JSON.parse(tube);
//   const vid_arr = parsed.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents
//   const vids = vid_arr.filter(item => item.hasOwnProperty("videoRenderer"))
//   console.log(vids)
// }
// getYoutube("https://www.youtube.com/results?search_query=ethereum")
// async function removeBadChars(file) {
//   if (file === "bitcoin.json") {
//     fs.readFile(`./db/${file}`, "utf-8", (err, data) => {
//       if (`${data.charAt(data.length - 6)}` === "}"
//         && `${data.charAt(data.length - 5)}` === "]"
//         && `${data.charAt(data.length - 4)}` === "}"
//         && `${data.charAt(data.length - 3)}` === "}"
//         && `${data.charAt(data.length - 2)}` === "]"
//         && `${data.charAt(data.length - 1)}` === "}") {
//         let newData = data.slice(0, -3)
//         fs.writeFile(`./db/${file}`, newData, (err) => {
//           if (err) console.error(err);
//           console.log(`${file} file saved`);
//         })
//       }
//     })
//   } else {
//     if (file === "bitcoin.json") {
//       fs.readFile(`./db/${file}`, "utf-8", (err, data) => {
//         fs.writeFile(`./db/${file}`, data, (err) => {
//           if (err) console.log(`${file} file saved`)
//         })
//       })
//     }
//   }
// }

// app.get("/api", async (req, res) => {
//   console.log("yup")
//   const data = [];
//   const stockArray = [];
//   const cd = await fetchData("https://finance.yahoo.com/cryptocurrencies");
//   cd("body").find("#scr-res-table > div > table > tbody > tr > td").each((i, elem) => {
//     const stockInfo = cd(elem).text()
//     data.push(stockInfo);
//   });
//   const joined = data.join(" ").split("  ");
//   const filtered = joined.filter(d => {
//     // ==================== if data isn't empty or trash =======
//     if (d !== "" && d !== undefined && d.trim().split(" ")[0] !== "BAT-USD" && d !== null) {
//       // ================== object to return ===================
//       return d;
//     }
//   })
//   const cleaned = filtered.map(d => {
//     const date = new Date();
//     const hour = date.getHours();
//     const minute = date.getMinutes();
//     const dom = date.getDate();
//     const month = date.getMonth();
//     const year = date.getFullYear();
//     // ================= object to push to file ==============
//     let fileData = {
//       id: `${hour}${minute}${month}${dom}${year}_${d.trim().split(" ")[0]}`,
//       name: d.trim().split(" ")[1],
//       cost: d.trim().split(" ")[3] === "USD" || d.trim().split(" ")[3] === "Token" ? d.trim().split(" ")[4] : d.trim().split(" ")[3],
//       hour,
//       minute,
//       dom,
//       month,
//       year
//     }
//     if (fs.existsSync(`./db/${d.trim().split(" ")[1].toLowerCase()}.json`)) {
//       fs.readFile(`./db/${d.trim().split(" ")[1].toLowerCase()}.json`, "utf-8", async (err, data) => {
//         if (!err) {
//           const stockData = await JSON.parse(data);
//           await stockData.stock.push(fileData);
//           const jsonStr = JSON.stringify(stockData);
//           fs.writeFile(`./db/${d.trim().split(" ")[1].toLowerCase()}.json`, jsonStr, (err) => {
//             if (err) console.log(err);
//             console.log("saved");
//           })
//           await removeBadChars("bitcoin.json")
//         } else {
//           console.log(err);
//         }
//       })
//     } else {
//       fs.writeFile(`./db/${d.trim().split(" ")[1].toLowerCase()}.json`, JSON.stringify({ "stock": [] }), (err) => {
//         if (err) console.log(err);
//         console.log("saved");
//       });
//     }
//     return {
//       abbr: d.trim().split(" ")[0],
//       name: d.trim().split(" ")[1],
//       cost: d.trim().split(" ")[3] === "USD" || d.trim().split(" ")[3] === "Token" ? d.trim().split(" ")[4] : d.trim().split(" ")[3],
//       change: d.trim().split(" ")[4].charAt(0) === "+" || d.trim().split(" ")[4].charAt(0) === "-" ? d.trim().split(" ")[4] : d.trim().split(" ")[5],
//       per_change: d.trim().split(" ")[5].charAt(d.trim().split(" ")[5].length - 1) === "%" ? d.trim().split(" ")[5] : d.trim().split(" ")[6],
//       cap: d.trim().split(" ")[6].charAt(d.trim().split(" ")[6].length - 1) === "%" ? d.trim().split(" ")[7] : d.trim().split(" ")[6],
//     }
//   })

//   res.json({
//     path: "home",
//     data: cleaned
//   })
// })

// app.get("/api/:name", async (req, res) => {
//   const { name } = req.params;
//   fs.readFile(`./db/${name.toLowerCase()}.json`, "utf-8", async (err, data) => {
//     const namedStock = JSON.parse(data);
//     res.json({
//       path: name,
//       data: namedStock.stock
//     })
//   })
// })
