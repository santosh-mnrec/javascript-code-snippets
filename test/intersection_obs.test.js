const api=require("../InfiniteScroll/script");
// This is just dummy data - change its shape in a format that your API renders.
const dummyMoviesData = [
    {title: 'some-tilte-1', body: 'some-1'},
    {title: 'some-tilte-2', body: 'some-2'},
    {title: 'some-tilte-3', body: 'some-3'}
];
global.fetch = jest.fn(() => Promise.resolve(dummyMoviesData));

describe('Intersection Observer',()=>{

    it('should call fetc',async()=>{

        const res=api.loadPost();
    console.log(res);
    })
})