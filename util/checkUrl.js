const fetch = require("node-fetch");
const validUrl = require("valid-url");

// function urlExists(url, cb) {
//   request({ url: url, method: "HEAD" }, function (err, res) {
//     if (err) return cb(null, false);
//     cb(null, /4\d\d/.test(res.statusCode) === false);
//   });
// }
// const checkUrl = async (url = "") => {
//   try {
//     if (!validUrl.isUri(url)) return false;
//     console.log("pass1");
// fetch(url, { method: "HEAD" })
//   .then((res) => {
//     console.log(res.status);
//     if (validUrl.isUri(url)) flag = false;
//     if (/4\d\d/.test(res.status)) flag = false;
//     console.log(flag);
//   })
//   .catch((err) => {
//     if (err) flag = false;
//     console.log(flag);
//   });
//     const res = await fetch(url, { method: "HEAD" });
//     console.log(res.status);
//     if (/4\d\d/.test(res.status)) return false;
//     if (res.status === 200) return true;
//   } catch (error) {
//     return false;
//   }
// };

// console.log(checkUrl());

const checkUrl = (url) => {
  if (validUrl.isUri(url)) return true;
  return false;
};

module.exports = checkUrl;
