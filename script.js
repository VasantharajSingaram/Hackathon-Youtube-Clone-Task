const videoCardContainer = document.querySelector('.video-container');
const searchInput = document.querySelector('.form-control');
const searchBtn = document.querySelector('.btn');

let searchLink = "https://www.youtube.com/results?search_query=";

var row = document.createElement("div");
row.setAttribute("class", "row");
row.classList.add("row","m-3")
videoCardContainer.append(row);




async function youtubedata(){
    let res =  await fetch("https://youtube.googleapis.com/youtube/v3/videos?" + new URLSearchParams({
        key: "AIzaSyB61dObTeztn6IlIFIzc73qbIZsGcKD78g",
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 50,
        regionCode: 'IN'
}))
    let res1= await res.json();
    console.log(res1);
try{
    res1.items.forEach(item => {getChannelIcon(item);
    })

}catch{
    console.log(error);
}
}
youtubedata();

async function getChannelIcon(item){
    let res2 = await fetch("https://www.googleapis.com/youtube/v3/channels?" + new URLSearchParams({
        key: "AIzaSyB61dObTeztn6IlIFIzc73qbIZsGcKD78g",
        part: 'snippet',
        id: item.snippet.channelId
    }))
    let result = await res2.json();
    console.log(result);
    result.channelThumbnail = result.items[0].snippet.thumbnails.default.url;
    makeVideoCard(item);
    
}


function makeVideoCard(item) {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${item.id}'">
       <div class="col-md-4 video-container">
    <div class="mb-5 video">
        <img src="${item.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="card-body">
            <img src="${item.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${item.snippet.title}</h4>
                <p class="channel-name">${item.snippet.channelTitle}</p>
            </div>
        </div>
</div>
    </div>
    `;
}


searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})

// https://youtube.googleapis.com/youtube/v3/videos?

// https://www.googleapis.com/youtube/v3/channels?

// AIzaSyB61dObTeztn6IlIFIzc73qbIZsGcKD78g








