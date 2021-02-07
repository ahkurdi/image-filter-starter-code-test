import { isValidUrl } from '../util/util';

import { expect } from 'chai';
import 'mocha';

describe('isValidUrl', ()=>{

it('test valid url',() =>
{

  const validUrls = [
    "http://example.com",
    "http://example.com/blah",
    "http://127.0.0.1",
    "http://127.0.0.1/wow",
    "https://example.com",
    "https://example.com/blah",
    "https://127.0.0.1:1234",
  ]

validUrls.forEach(url => {
    expect(isValidUrl(url)).to.true;
});

}
);

it('test invalid url',() =>
{
  const inValidUrls = [
    "oo.com",
    "://foo..",
    "//.com",
];

inValidUrls.forEach(url => {
  expect(isValidUrl(url)).to.false;
});

}
);

});