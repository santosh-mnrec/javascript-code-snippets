// Dell.Deals = Dell.Deals || {};
// Dell.Deals.lazyMicroSurvey = Dell.Deals.lazyMicroSurvey || {};
var $ = require("jquery");
const Survey = (() => {

  let $survey = $("#microsurvey"),

    $scriptUrl = $survey.attr("data-micro-survey-url"),
    observer;
  $scriptUrl;
  console.log($survey.html());

  const surveyIntersection = (survey) => {
    let targetSurvey;
    if (survey[0].isIntersecting) {
      targetSurvey = survey[0].target;
      if (targetSurvey.hasAttribute("data-micro-survey-url")) {
        targetSurvey.removeAttribute("data-micro-survey-url");
        m.injectSurveyScript();

      }
      if (observer)
        observer.unobserve(targetSurvey);
    }
  }

  const injectSurveyScript = () => {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = $scriptUrl;
    s.defer = "defer";
    document.body.appendChild(s);
  }

  const init = () => {
   
    console.log(new IntersectionObserver());
    //if (!$survey.length) {
     observer = new IntersectionObserver(m.surveyIntersection, {
        rootMargin: "100px 0px",
        threshold: 0.01,
      });
      observer;
      observer.observe($survey[0]);
   // }
  }
  const m = {
    surveyIntersection,
    injectSurveyScript,
    init
  };

  if (typeof module !== "undefined") {
    module.exports = m;
  }
  return m;

})();

