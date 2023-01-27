const checkURL = (url: String): String => {
  if (url === 'null') url = 'https://dummyimage.com/160x160/EFEFEF';
  else url = `https://ya-praktikum.tech/api/v2/resources${url}`;
  return url;
};

export default checkURL;
