var page = 1;
const App = (() => {
  function loadPost() {
    var url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&limit=50`;
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        data;
        if (data.length == 0) {
          alert("done");
          return;
        }
        api.render(data);
      })
      .catch((err) => console.log(err));
  }
  function render(todos) {
    var ipsum = document.getElementById("lipsum");
    var div = document.createElement("div");
    todos.forEach(function (e) {
      var p = document.createElement("p");
      p.innerHTML = e.title;
      div.appendChild(p);
    });

    ipsum.appendChild(div);
  }
  function init(){
    window.addEventListener("DOMContentLoaded", (event) => {
      const options = {
        root: document.querySelector("#container"),
        threshold: 0.8,
      };
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            page++;
            api.loadPost();
          }
        });
      }, options);
      observer.observe(document.querySelector("#infinite-scroll-trigger"));
    });
  }

  const api = {
    loadPost,
    render,
    init,
  };
  if (typeof module !== "undefined") {
    module.exports = api;
  }
  return api;
})();
