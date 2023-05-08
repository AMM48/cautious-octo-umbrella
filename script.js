const clientId = "ntAAc6qzGqX70bvN3ng-O6cUwZM8Is19iYA6Wuhvknw";

var defaultAlbumId = "";

function requestAlbumXHR() {
  let albumId = document.getElementById("albumIdField").value;
  let resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (req.readyState == 4 && req.status == 200) {
      //processAlbumRequest(req.responseText);
      let response = JSON.parse(req.responseText);
      for (item of response.results) {
        let imgElem = document.createElement("img");
        imgElem.src = item.urls.full;

        resultDiv.appendChild(imgElem);
      }
    } else if (req.readyState == 4 && req.status != 200) {
      console.log(req.status + " Error with the imgur API: ", req.responseText);
    }
  };
  req.open(
    "GET",
    `https://api.unsplash.com/search/photos?page=1&per_page=10&query=${albumId}&client_id=${clientId}`,
    true
  ); // true for asynchronous
  req.setRequestHeader("Authorization", "Client-ID " + clientId);
  req.send();
}

function requestAlbumFetch() {
  let albumId = document.getElementById("albumIdField").value;
  let resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch(
    `https://api.unsplash.com/search/photos?page=1&per_page=10&query=${albumId}&client_id=${clientId}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      for (item of result.results) {
        let imgElem = document.createElement("img");
        imgElem.src = item.urls.full;

        resultDiv.appendChild(imgElem);
      }
    })
    .catch((error) => console.log("error", error));
}

async function requestAlbumAsyncAwait() {
  let albumId = document.getElementById("albumIdField").value;
  let resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  try {
    const req = await fetch(
      `https://api.unsplash.com/search/photos?page=1&per_page=10&query=${albumId}&client_id=${clientId}`,
      requestOptions
    );
    const res = await req.json();
    for (item of res.results) {
      let imgElem = document.createElement("img");
      imgElem.src = item.urls.full;

      resultDiv.appendChild(imgElem);
    }
  } catch (e) {
    console.log("error", e);
  }
}
