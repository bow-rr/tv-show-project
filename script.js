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
 // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  //clear out the rootElement's HTML before we add the new stuff
  rootElem.innerHTML = "";
  const countParagraph = document.createElement("p");
  countParagraph.innerText = `Showing ${episodeList.length} episode(s)`
  rootElem.appendChild(countParagraph);

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

//level 200: add a 'live' search input
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", (event)=>{
   //console.log(event);
   const searchString = event.target.value.toLowerCase();
   const filteredEpisodes = getAllEpisodes().filter((episode)=>{
     //localeCompare might be neater here, make case-insensitive
     return(
        episode.summary.toLowerCase().includes(searchString) ||
        episode.name.toLowerCase().includes(searchString)
        );
   });
    // console.log(filteredEpisodes);
    makePageForEpisodes(filteredEpisodes);
});

window.onload = setup;
