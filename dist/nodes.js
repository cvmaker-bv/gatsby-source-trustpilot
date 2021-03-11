"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SummaryNode = exports.ReviewNode = void 0;

var _gatsbyNodeHelpers = _interopRequireDefault(require("gatsby-node-helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _createNodeHelpers = (0, _gatsbyNodeHelpers.default)({
  typePrefix: "TrustPilot"
}),
    createNodeFactory = _createNodeHelpers.createNodeFactory;

var ReviewNode = createNodeFactory('Review', function (node) {
  return node;
});
exports.ReviewNode = ReviewNode;
var SummaryNode = createNodeFactory('Summary', function (node) {
  delete node.links;
  node.total = node.numberOfReviews.total;
  node.oneStar = node.numberOfReviews.oneStar;
  node.twoStars = node.numberOfReviews.twoStars;
  node.threeStars = node.numberOfReviews.threeStars;
  node.fourStars = node.numberOfReviews.fourStars;
  node.fiveStars = node.numberOfReviews.fiveStars;
  delete node.country;
  delete node.numberOfReviews;
  return node;
});
exports.SummaryNode = SummaryNode;