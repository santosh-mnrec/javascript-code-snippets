const api = require("../InfiniteScroll/script");
const fetchMock=require('jest-fetch-mock');
fetchMock.enableMocks();
describe("Intersection Observer", () => {
    beforeEach(() => {
        fetch.resetMocks();
      });
  it("should call fetc", async () => {
    fetch.mockResponseOnce(JSON.stringify([ {rates: { CAD: 1.42 } }]));
    
    var renderMock=jest.spyOn(api,'render');
    const res = await api.loadPost();
    console.log(res);
   
    expect(renderMock).toBeCalledTimes(1);

  });
});
