function titleToUrlSafeId(title) {
  title = title.replace(/\s+/g, ' ') // Remove extra spaces
               .replace(/[^0-9a-zA-Z ]+/g, '') // Remove non alphanumeric characters.
               .toLowerCase();

  // Replace selected prepositions.
  // for (let word of ['the', 'a', 'an']) {
  //   title = title.replace(/(word + ' ')/g, '');
  // }

  // Replace spaces with dashes.
  title = title.replace(/ /g, '-');
  return title;
}

module.exports = { titleToUrlSafeId };
