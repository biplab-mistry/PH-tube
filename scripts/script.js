const loadCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    const data = await res.json()
    showCategory(data.categories);

}


const showCategory = (category) => {

    category.forEach(cate => {
    
        const container = document.getElementById("category-container")
        const div = document.createElement("div")
        div.innerHTML = `
  <button id="btn-${cate.category_id}" class="bg-[#25252520] py-2 px-3 rounded-lg"  onclick='categoryVideo(${cate.category_id})'>${cate.category}</button>
`
        container.appendChild(div)
    });
}

// load by category

async function categoryVideo(id) {
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    const data = await res.json()
    showVideo(data.category);

    const btn = document.getElementById(`btn-${id}`);


    const allButtons=document.querySelectorAll("#category-container button")
    allButtons.forEach(btn => btn.classList.remove("active"));
    

    btn.classList.add("active")

  
   

}


// get video data
async function loadVideo() {
    const res = await fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    const data = await res.json()
    const btn0 = document.getElementById("btn-0");
    const allButtons=document.querySelectorAll("#category-container button")
    allButtons.forEach(btn => btn.classList.remove("active"));
    
    btn0.classList.add("active")

    showVideo(data.videos);

}
//  show video
function showVideo(videos) {
    if (videos.length == 0) {
        document.getElementById("video-container").innerHTML = "";
        document.getElementById("no-video").innerHTML = ""
        const Vcontainer = document.getElementById("no-video")
        const div = document.createElement("div")
        div.innerHTML = `    <img class="text-center mx-auto" src="Icon.png" alt="">`
        Vcontainer.appendChild(div)
    }
    else {
        const container = document.getElementById("video-container")
        container.innerHTML = "";
        document.getElementById("no-video").innerHTML = ""
        videos.forEach(video => {
            const div = document.createElement("div")
            div.innerHTML = `
              <div class="flex flex-col">
                        <div >
                            <img class="object-cover h-[200px] w-[320px] rounded-md" src="${video.thumbnail}" alt="">
                        </div>
                        <div class="flex gap-3 items-center pt-4">
                            <div class="avatar w-5">
                                <div class="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                  <img src="${video.authors[0].profile_picture}" />
                                </div>
                              </div>
                            <div>  <h3>${video.title}</h3>
                              <p>${video.authors[0].profile_name}</p> 
                              <p>${video.others.views} Views</p> 
                              </div>
                        </div>
                      
                    </div>      
            `
            container.appendChild(div)
        })

    }


}






loadCategory()