const axios = require("axios").default;

const getYTVideo = async (playlistId, durationInMins) => {
  const durationInSeconds = durationInMins * 60;
  const apikey = process.argv[2];
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?&key=${apikey}&playlistId=${playlistId}&part=snippet,id&order=date&maxResults=50`;
  let validVideos = [];

  await axios(url).then(async (res) => {
    //data is an object, items is the array
    const videoArr = res.data.items;
    const idStr = videoArr.reduce((str, video) => {
      const id = video.snippet.resourceId.videoId;
      return str + "," + id;
    }, "");
    const secondUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${idStr}&key=${apikey}`;
    await axios(secondUrl).then((res) => {
      const videoArr = res.data.items;
      const videosOfCorrectLength = videoArr.filter((video) => {
        const durationStr = video.contentDetails.duration; // "PT1H22M17S" PT23M40S PT14S;
        const arrSplit = durationStr.match(/[^-_ \d]+|\d+/g);
        const numbers = arrSplit
          .filter((elem) => Number(elem) === Number(elem))
          .map((num) => parseInt(num));
        let durationOfVideo = 0;
        if (numbers.length === 3) {
          durationOfVideo = numbers[0] * 60 * 60 + numbers[1] * 60 + numbers[2];
        } else if (numbers.length === 2) {
          durationOfVideo = numbers[0] * 60 + numbers[1];
        } else {
          durationOfVideo = numbers[1];
        }
        return (
          durationOfVideo > durationInSeconds * 0.7 &&
          durationOfVideo <= durationInSeconds
        );
      });

      validVideos = videosOfCorrectLength.length > 1 ? videosOfCorrectLength : [videoArr[Math.floor(Math.random() * videoArr.length)]];
    });
  });
  return validVideos;
};

module.exports = getYTVideo;
