const url = "https://api.tvmaze.com/shows/82/episodes";
let allEpisodes = [];
//You can edit ALL of the code here
function setup() {
  fetch(url)
    .then(res => res.json())
    .then(data =>{
      //in here we can do whatever we want with the data
      allEpisodes = data;
      makePageForEpisodes(allEpisodes);
  })
  .catch((err)=> console.error(err));
}
/**
     * combine season number and episode number into an episode code
     * Each part should be zero-padded to two digits.
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
 //level 300: episode selector
  const selectElem = document.getElementById("select-input");
   
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

   //level 300: also,one more thing, add it to the select element as an option
   // i: list all episodes in the format: 'S01E01- Winter is coming'
    const option = document.createElement("option");
    option.textContent = `${makeSeasonAndEpisode(episode)} - ${episode.name}`;
    option.value = episode.id;
    selectElem.appendChild(option);
  });
}

//level 200: add a 'live' search input
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", (event)=>{
   e.preventDefault();     //if use 'form' in HTML
   const searchString = event.target.value.toLowerCase();
   const filteredEpisodes = allEpisodes.filter((episode)=>{
     //localeCompare might be neater here, make case-insensitive
     return(
        episode.summary.toLowerCase().includes(searchString) ||
        episode.name.toLowerCase().includes(searchString)
        );
   });
    // console.log(filteredEpisodes);
    makePageForEpisodes(filteredEpisodes);
});

//level 300: 
const selectElem = document.getElementById("select-input");
selectElem.addEventListener("change", (e) => {
  //we now have shown that e.target.value === the episode id  that has been clicked on
  const idSelectedByUser =Number(e.target.value);
  const selectedEpisode = allEpisodes.find(
    (ep) =>ep.id === idSelectedByUser 
  );
  if(selectedEpisode){
    makePageForEpisodes([selectedEpisode]);
  }
});



window.onload = setup;
