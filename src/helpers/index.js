
const alphabetic = (information) => {
  return information.sort(function (a, b) {
    var nameA = a.original_title.toLowerCase(), nameB = b.original_title.toLowerCase();
    if (nameA < nameB)
      return -1;
    if (nameA > nameB)
      return 1;
    return 0;
  });
}

const numbers = (information) => {
  return information.sort(function (a, b) {
    return b.vote_average - a.vote_average;
  });
}

const getDataWithCheck = (results) => {
  return results.results.map((item) => {
    return { ...item, check: false, name: `check${item.id}` }
  });
}

const getFavorites = (information) => {
  return information.filter((item) => {
    return item.check == true;
  });
}

const getOriginal = (information) => {
  return information.map((item) => {
    return { ...item, some: '' };
  });
}

export {
  alphabetic,
  numbers,
  getDataWithCheck,
  getFavorites,
  getOriginal
}