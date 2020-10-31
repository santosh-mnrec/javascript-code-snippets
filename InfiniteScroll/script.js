var page = 1;
const App = (() => {
  function loadPost() {
    var api = `https://jsonplaceholder.typicode.com/posts?_page=${page}&limit=50`;
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        if (data.length == 0) {
          alert("done");
          return;
        }
        render(data);
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
  window.addEventListener("DOMContentLoaded", (event) => {
    const options = {
      root: document.querySelector("#container"),
      threshold: 0.8,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          page++;
          loadPost();
        }
      });
    }, options);
    observer.observe(document.querySelector("#infinite-scroll-trigger"));
  });
  const api= {
    loadPost,
    render,
  };
  if(typeof module !== "undefined"){
      module.exports=api;
  }
  return api;;
})();
