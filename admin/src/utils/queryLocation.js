const queryLocation = {
  toString(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  },
  toObject(defaultValues = {}) {
    try {
      var search = window.location.search.substring(1);
      const obj = JSON.parse(
        '{"' +
          decodeURI(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
          '"}'
      );
      return { ...defaultValues, ...obj };
    } catch (err) {
      return defaultValues;
    }
  },
};

export default queryLocation;
