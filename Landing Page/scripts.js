const navList =document.getElementById("nav-list").classList;
const dropdown = document.getElementById("dropdown");

dropdown.addEventListener("click", ()=>{
  navList.toggle("active");
})

const slides = document.querySelectorAll(".slide");
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
let counter = 0;

nextBtn.addEventListener('click', ()=>{
  counter++;
  carousel();
});

prevBtn.addEventListener('click', ()=>{
  counter--;
  carousel();
});

slides.forEach((slide,index)=>{
  slide.style.left = `${index * 100}%`;
});

const carousel= ()=>{
  if(counter==slides.length){
    counter=0;
  }
  if(counter<0){
    counter=slides.length-1;
  }
  slides.forEach((slide)=>{
    slide.style.transform = `translateX(-${counter * 100}%)`
  })
}