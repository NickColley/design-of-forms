function sortPagesByPageNumber(pageA, pageB) {
  const startA = pageA.data.pageNumber && pageA.data.pageNumber.start;
  const endA = pageA.data.pageNumber && pageA.data.pageNumber.end;
  const startB = pageB.data.pageNumber && pageB.data.pageNumber.start;
  const endB = pageB.data.pageNumber && pageB.data.pageNumber.end;
  if (startA > startB) {
    return 1;
  }
  if (startA < startB) {
    return -1;
  }
  // If the start numbers match check the end pages so that
  // Content on the same page comes first.
  if (endA > endB) {
    return 1;
  }
  if (endA < endB) {
    return -1;
  }
  return 0;
}

module.exports = function sortedPages(collectionApi) {
  return collectionApi.getFilteredByTag("page").sort(sortPagesByPageNumber);
};
