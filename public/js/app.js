const nav = document.querySelector(".navbar"),
  homeBtn = document.querySelector(".fa-home"),
  header = document.querySelector("#crypto-header"),
  subHeader = document.querySelector("#sub-header");

function getHome(url) {
  // thead.innerHTML = "";
  // tbody.innerHTML = "";
  // header.textContent = "";
  // header.style.color = "#81818b"
  // homeBtn.style.color = "#81818b";
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const stocks = data.stocks;
      const articles = data.articles.articles;
      const stockTable = document.createElement("table");
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");
      const stockSeeMore = document.createElement("p");
      header.textContent = data.path.toUpperCase();
      document.title = data.path.toUpperCase();
      subHeader.textContent = "CLICK ON STOCK NAME TO NAVIGATE";
      stockTable.setAttribute("id", "stock-table");
      stockTable.classList.add("table", "table-dark", "mb-0");
      stockSeeMore.classList.add("text-right");
      thead.innerHTML += `
          <th scope="col">SYM.</th>
          <th scope="col">NAME</th>
          <th scope="col">PRICE</th>
          <th scope="col">CHANGE</th>
          <th scope="col">%CHANGE</th>
          <th scope="col">MKT. CAP</th>
        `;
      stocks.map((d, i) => {
        if (i < 4) {

          tbody.innerHTML += `
          <tr>
              <td>${d.abbr}</td>
              <td class="stock-name" onclick="getStockName('/api/${d.name.toLowerCase()}')" style="color:#f7f7f7">${d.name}</td>
              <td>${d.cost}</td>
              <td style="color:${d.change.charAt(0) === "+" ? "#5cb85c" :
              d.change.charAt(0) === "-" ? "#d9534f" : "#f7f7f7"}">${d.change}</td>
            <td style="color:${d.per_change.charAt(0) === "+" ? "#5cb85c" :
              d.per_change.charAt(0) === "-" ? "#d9534f" : "#f7f7f7"}">${d.per_change}</td>
            <td>${d.cap}</td>
            </tr>
            `;
        }
      })
      stockSeeMore.innerHTML = `
        <small>SEE MORE...</small>
      `;
      subHeader.after(stockTable);
      stockTable.append(thead, tbody);
      stockTable.after(stockSeeMore);
    });
}
// function getStockName(url) {
//   thead.innerHTML = "";
//   tbody.innerHTML = "";
//   header.textContent = "";
//   header.style.color = "#f7f7f7 !important"
//   homeBtn.style.color = "#f7f7f7";
//   fetch(url)
//     .then(res => res.json())
//     .then(data => {
//       let stocks = data.data;
//       header.textContent = data.path.toUpperCase();
//       document.title = data.path.toUpperCase();
//       thead.innerHTML += `
//         <th scope="col">NAME</th>
//         <th scope="col">COST</th>
//         <th scope="col">DATE</th>
//         <th scope="col">TIME</th>
//       `;
//       stocks.reverse().map(d => {
//         tbody.innerHTML += `
//         <tr>
//         <td>${d.name}</td>
//         <td>${d.cost}</td>
//         <td>${parseInt(d.month) + 1}/${parseInt(d.dom) < 10 ? "0" + d.dom : d.dom}/${d.year}</td>
//         <td>${parseInt(d.hour) < 10 ? "0" + d.hour : d.hour}:${parseInt(d.minute) < 10 ? "0" + d.hour : d.hour}</td>
//         </tr>
//         `;
//       })
//     })
// }
// homeBtn.addEventListener("click", () => {
//   getHome("/api")
// })
getHome("/api")