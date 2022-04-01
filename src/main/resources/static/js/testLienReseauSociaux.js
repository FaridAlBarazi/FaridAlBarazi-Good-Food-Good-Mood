let whatsapp = document.querySelector(".whatsapp")
let telegram = document.querySelector(".telegram")
let twitter = document.querySelector(".twitter")

let pageUrl = location.href
// console.log(pageUrl)
let message="Enjoy this awesome recipe application enjoy GOOD Foo Good Mood"

const whatsappApi='https://wa.me/?text=${pageUrl}.${message}';
const telegramApi="https://t.me/share/url?url=${pageUrl}&text=${message}";
const twitterApi=" https://twitter.com/intent/tweet?text=" //${pageUrl}.${message};

whatsapp.addEventListener('click', ()=> {
    // console.log('whatsapp button clicked')
    window.open(url=whatsappApi,target="blank")
    })
telegram.addEventListener('click', ()=> {
    // console.log('telegram button clicked')
    window.open(url=telegramApi,target="blank")

})
twitter.addEventListener('click', ()=> {
    // console.log('twitter button clicked')
    window.open(url=twitterApi,target="blank")

})