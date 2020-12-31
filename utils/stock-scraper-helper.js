const axios = require('axios'),
  cheerio = require('cheerio');
// fetches data from url and converts to html
async function fetchData(url) {
  let result = await axios.get(url);
  return cheerio.load(result.data);
}

exports.cryptoScrape = async (url, req, res) => {
  const cleaned = [];
  const cd = await fetchData(url);
  cd("body").find("#scr-res-table > div > table > tbody > tr").each((i, elem) => {
    const img = cd(elem).find("img").attr("src");
    const abbr = cd(elem).find("a").text();
    const name = cd(elem).children()[1].children[1].data
    const cost = cd(elem).children()[2].children[0].children[0].data
    const change = cd(elem).children()[3].children[0].children[0].data;
    const per_change = cd(elem).children()[4].children[0].children[0].data;
    const cap = cd(elem).children()[5].children[0].children[0].data;
    cleaned.push({ img, abbr, name, cost, change, per_change, cap })
  });

  return cleaned;
}

exports.singleCrypto = async (url, req, res) => {
  const sn = await fetchData(url);
  const header = sn("body").find("h1").text();
  const currency = sn("body").find("h1").parent().siblings().text();
  const current_price = sn("body").find("div#quote-header-info").children()[2].firstChild.firstChild.firstChild.children[0].data;
  const current_change = sn("body").find("div#quote-header-info").children()[2].firstChild.firstChild.children[1].children[0].data;
  const prev_close = sn("body").find("div#quote-summary").children()[0].children[0].children[0].children[0].children[1].children[0].children[0].data;
  const current_open = sn("body").find("div#quote-summary").children()[0].children[0].children[0].children[1].children[1].children[0].children[0].data
  const day_range = sn("body").find("div#quote-summary").children()[0].children[0].children[0].children[2].children[1].children[0].data;
  const year_range = sn("body").find("div#quote-summary").children()[0].children[0].children[0].children[3].children[1].children[0].data;
  const mkt_cap = sn("body").find("div#quote-summary").children()[1].children[0].children[0].children[0].children[1].children[0].children[0].data;
  const supply = sn("body").find("div#quote-summary").children()[1].children[0].children[0].children[1].children[1].children[0].children[0].data;
  const volume = sn("body").find("div#quote-summary").children()[1].children[0].children[0].children[3].children[1].children[0].children[0].data;
  const day_volume = sn("body").find("div#quote-summary").children()[1].children[0].children[0].children[4].children[1].children[0].children[0].data;
  const day_volume_all = sn("body").find("div#quote-summary").children()[1].children[0].children[0].children[5].children[1].children[0].children[0].data;
  return {
    header, currency, current_price, current_change, prev_close,
    current_open, day_range, year_range, mkt_cap, supply, volume,
    day_volume, day_volume_all
  }
}

exports.getYoutube = async (url, req, res) => {
  const yt = await fetchData(url);
  const tube = yt("body").children()[9].children[0].data.split("var ytInitialData = ")[1].split(";")[0];
  const parsed = JSON.parse(tube);
  const vid_arr = parsed.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents
  const vids = vid_arr.filter(item => item.hasOwnProperty("videoRenderer"))
  return vids
}