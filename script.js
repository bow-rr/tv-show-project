//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

/**
     * combine season number and episode number into an episode code
     * Each part should be zero-padded to two digits.
       Example: S02E07 would be the code for the 7th episode of the 2nd season. 
       S2E7 would be incorrect.
*/
function  makeSeasonAndEpisode(episode){
  const {season,number} = episode;    // this is Object destructuring
  //the above is the same as the two lines below
  // const season = episode.season;
  // const number = episode.number;
  // using String padStart() method to add 0 in front of season and episode number
  const paddedSeason = season.toString().padStart(2,'0');
  const paddedEpisode = number.toString().padStart(2, "0");

  return `S${paddedSeason}E${paddedEpisode}`;
};


function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  episodeList.forEach(episode => {
    //add the season and episode and name
    // i: create episode name
    const paragraph = document.createElement("p");
    //ii & iii: create season number and episode number
    // paragraph.textContent = `S${episode.season}E${episode.number}: ${episode.name}`;
    // rootElem.appendChild(paragraph);
    paragraph.textContent = `${makeSeasonAndEpisode(episode)}: ${episode.name}`;
    rootElem.appendChild(paragraph);

    //iv: create the episode's medium-sized image, add the image
    const image = document.createElement("img");
    image.src = episode.image.medium;
    rootElem.appendChild(image);

    //v: create the episode's summary text, add the summary paragraph nb 
    // the episode.summary is actually HTML
    // const summaryParagraph = document.createElement("p");
    // summaryParagraph.innerHTML = episode.summary; //   or`${episode.summary}`;
    // rootElem.appendChild(summaryParagraph);

    rootElem.innerHTML +=episode.summary   //alternative option 
  });
}

window.onload = setup;
