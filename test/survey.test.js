//const jest=require("jest");

const survey = require('../Survey/survey');
var $ = require("jquery");
survey;
let spy;

const JSDOM = require("jsdom").JSDOM;
const dom = new JSDOM()
global.document = dom.window.document
global.window = dom.window
describe("Micro Survey Component tests", () => {
  beforeAll(() => {
    // const intersectionObserverMock = () => ({
    //   observe: () => observe,
    //   unobserve: () => jest.fn()
    // })
    // window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);
    const spyFunc = jest.fn();
    var spy = jest.spyOn(survey, 'injectSurveyScript');

    Object.defineProperty(global.document, 'hasAttribute', { value: spyFunc });
    Object.defineProperty(global.document, 'removeAttribute', { value: spyFunc });

  })
  beforeEach(() => {


  })

  it("should invoke IntersectionObserver", () => {

    document.body.innerHTML = `
        <div id="x" data-micro-survey-ur="wwww.google.com">
        <div "data-micro-survey-ur="wwww.google.com"></div>
        </div>`

    const mockedEntries = [{
      length: 1,
      target: {
        hasAttribute: jest.fn().mockReturnValueOnce(true),
        removeAttribute: jest.fn().mockReturnValueOnce(true)
      },
      isIntersecting: true,
      boundingClientRect: { x: 10, y: 20, width: 30, height: 40 },
      removeAttribute: jest.fn()

    }];
    var spy = jest.spyOn(survey, 'injectSurveyScript');


    jest.spyOn($.fn, "init").mockReturnValueOnce(mockedEntries);
    survey.surveyIntersection($("#x"));
    expect(spy).toHaveBeenCalledTimes(1);

  });
  it("should not call injectSurveyScript", () => {

    jest.clearAllMocks();

    const mockedEntries = [{
      target: {
        hasAttribute: jest.fn().mockReturnValueOnce(true),
        removeAttribute: jest.fn().mockReturnValueOnce(true)
      },
      isIntersecting: true,
      boundingClientRect: { x: 10, y: 20, width: 30, height: 40 },
      removeAttribute: jest.fn(),


    },
    { length: 1 }
    ];
    // const MockIntersectionObserver = () => ({
    //   observe: () => observe,
    //   unobserve: () => jest.fn()
    // })
    // // window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);
    // Object.defineProperty(window, 'IntersectionObserver', {
    //   writable: true,
    //   configurable: true,
    //   value: MockIntersectionObserver
    // });

    // Object.defineProperty(global, 'IntersectionObserver', {
    //   writable: true,
    //   configurable: true,
    //   value: MockIntersectionObserver
    // });
    // let observe = jest.fn().mockReturnValue(null);
    // const mockIntersectionObserver = jest.fn();
    // mockIntersectionObserver.mockReturnValue({
    //   observe: () => observe,
    //   unobserve: () => null,
    //   disconnect: () => null,
    //   threshold:0.5,
    // });
    // window.IntersectionObserver = mockIntersectionObserver;
    const observe = jest.fn();
    const unobserve = jest.fn();

    // you can also pass the mock implementation
    // to jest.fn as an argument
    window.IntersectionObserver = jest.fn(() => ({
      observe,
      unobserve,
    }))
    document.body.innerHTML = '<div></div>';
    var spy = jest.spyOn(survey, 'injectSurveyScript');

    const spyFunc = jest.fn();
    Object.defineProperty(global.document, 'appendChild', { value: spyFunc });

    jest.spyOn($.fn, "init").mockReturnValueOnce(mockedEntries);
    survey.init();
    //survey.surveyIntersection($("#microsurvey"));
    //expect(spy).toHaveBeenCalledTimes(1);  
    expect(observe).toHaveBeenCalledTimes(2);
    let [callback] = window.IntersectionObserver.mock.calls[0]
    //callback(mockedEntries);  // test a callback 
  });
});
