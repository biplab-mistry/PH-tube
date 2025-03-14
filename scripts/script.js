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


    const allButtons = document.querySelectorAll("#category-container button")
    allButtons.forEach(btn => btn.classList.remove("active"));


    btn.classList.add("active")




}


// get video data
async function loadVideo(value="") { 
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${value}`)
    const data = await res.json()
    const btn0 = document.getElementById("btn-0");
    const allButtons = document.querySelectorAll("#category-container button")
    allButtons.forEach(btn => btn.classList.remove("active"));

    btn0.classList.add("active")

    showVideo(data.videos);

}
// search video
document.getElementById('searching').addEventListener("keyup",function(e){
    const value=e.target.value;
   loadVideo(value)
    

})
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
                        <div class="flex gap-3 items-center pt-4 justify-between">
                            <div class="avatar w-5">
                                <div class="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                                  <img src="${video.authors[0].profile_picture}" />
                                </div>
                              </div>
                            <div>  <h3>${video.title}</h3>
                              <div class="flex gap-2">
                              <p>${video.authors[0].profile_name}</p> 

                         ${video.authors[0].verified ? `<img class="w-6" src="social-media.png" alt="social">` : ""}

                              

                              </div>
        
                              <p>${video.others.views} Views</p> 
                              </div>
                                <label for="my_modal_6" class="btn">Details</label>
                                 <input type="checkbox" id="my_modal_6" class="modal-toggle" />
        <div class="modal" role="dialog">
            <div class="modal-box">
                <h3 class="text-lg font-bold">Hello!</h3>
                <p class="py-4">${video.title}</p>
                <p class="py-4">${video.authors[0].profile_name}</p>
                <p class="py-4">${video.description}</p>
                <div class="modal-action">
                    <label for="my_modal_6" class="btn">Close!</label>
                </div>
            </div>
        </div>
                        </div>
                      
                    </div>      
            `
            container.appendChild(div)
        })

    }


}






loadCategory()