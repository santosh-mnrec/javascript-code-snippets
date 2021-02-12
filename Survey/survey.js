// Dell.Deals = Dell.Deals || {};
// Dell.Deals.lazyMicroSurvey = Dell.Deals.lazyMicroSurvey || {};
var $ = require("jquery");
const Survey = function () {

  var $survey = $("#microsurvey"),
    $scriptUrl = $survey.attr("data-micro-survey-url"),
    observer;

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
    if ($survey.length && $scriptUrl) {
      observer = new IntersectionObserver(m.surveyIntersection, {
        rootMargin: "100px 0px",
        threshold: 0.01,
      });
      observer.observe($survey[0]);
    }
  }
  const m = {
    surveyIntersection,
    injectSurveyScript,
    init
  };
  m.init();
  return m;

}();
module.exports = Survey;

