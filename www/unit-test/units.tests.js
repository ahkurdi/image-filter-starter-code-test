"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util/util");
const chai_1 = require("chai");
require("mocha");
describe('isValidUrl', () => {
    it('test valid url', () => {
        const validUrls = [
            "http://example.com",
            "http://example.com/blah",
            "http://127.0.0.1",
            "http://127.0.0.1/wow",
            "https://example.com",
            "https://example.com/blah",
            "https://127.0.0.1:1234",
        ];
        validUrls.forEach(url => {
            chai_1.expect(util_1.isValidUrl(url)).to.true;
        });
    });
    it('test invalid url', () => {
        const inValidUrls = [
            "oo.com",
            "://foo..",
            "//.com",
        ];
        inValidUrls.forEach(url => {
            chai_1.expect(util_1.isValidUrl(url)).to.false;
        });
    });
});
//# sourceMappingURL=units.tests.js.map