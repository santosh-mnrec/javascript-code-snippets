//const jest=require("jest");

const survey = require('../Survey/survey');
var $ = require("jquery");
survey;

describe("Micro Survey Component tests", () => {

  beforeEach(() => {
    const mockedEntries = [{
      isIntersecting: true,
      boundingClientRect: { x: 10, y: 20, width: 30, height: 40 },

    }];

    const root = jest.fn().mockReturnValueOnce(mockedEntries)
    const intersectionObserverMock = () => ({
      root: root,
      observe: () => null,
      unobserve: () => jest.fn()
    })
    window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);
  })

  it("should invoke IntersectionObserver", () => {

    document.body.innerHTML = `
        <div id="x" data-micro-survey-ur="wwww.google.com">
        <div "data-micro-survey-ur="wwww.google.com"></div>
        </div>`

    const mockedEntries = [{
      target: {
        hasAttribute: jest.fn().mockReturnValueOnce(true),
        removeAttribute: jest.fn().mockReturnValueOnce(true)
      },
      isIntersecting: true,
      boundingClientRect: { x: 10, y: 20, width: 30, height: 40 },
      removeAttribute: jest.fn()

    }];
    const spyFunc = jest.fn();
    var spy = jest.spyOn(survey, 'injectSurveyScript');

    Object.defineProperty(global.document, 'hasAttribute', { value: spyFunc });
    Object.defineProperty(global.document, 'removeAttribute', { value: spyFunc });

    jest.spyOn($.fn, "init").mockReturnValueOnce(mockedEntries);
    survey.surveyIntersection($("#x"));
   expect(spy).toHaveBeenCalledTimes(1);

  });
  it("should not call injectSurveyScript", () => {

    jest.clearAllMocks();
    document.body.innerHTML = `
        <div id="x" data-micro-survey-ur="wwww.google.com">
        <div "data-micro-survey-ur="wwww.google.com"></div>
        </div>`

    const mockedEntries = [{
      target: {
        hasAttribute: jest.fn().mockReturnValueOnce(true),
        removeAttribute: jest.fn().mockReturnValueOnce(true)
      },
      isIntersecting: false,
      boundingClientRect: { x: 10, y: 20, width: 30, height: 40 },
      removeAttribute: jest.fn()

    }];
    const spyFunc = jest.fn();
    var spy = jest.spyOn(survey, 'injectSurveyScript');

    Object.defineProperty(global.document, 'hasAttribute', { value: spyFunc });
    Object.defineProperty(global.document, 'removeAttribute', { value: spyFunc });

    jest.spyOn($.fn, "init").mockReturnValueOnce(mockedEntries);
    survey.surveyIntersection($("#x"));
   expect(spy).toHaveBeenCalledTimes(0);

  });
});
