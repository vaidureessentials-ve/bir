function nextTab(n){
  document.getElementById("tab"+n).classList.remove("active");
  document.getElementById("tab"+(n+1)).classList.add("active");
  if(n===3) startFinal();
}

const images=[
  "../image/img1.png",
  "../image/img2.png",
  "../image/img3.png",
  "../image/img4.png",
  "../image/img5.png"
];

function startFinal(){
  document.getElementById("music").play();
  imageFlow();
  fireworks();
}

/* IMAGE FLOW */
function imageFlow(){
  const f=document.getElementById("flow");
  for(let i=0;i<30;i++){
    let im=document.createElement("img");
    im.src=images[i%images.length];
    im.style.left=Math.random()*100+"%";
    im.style.width=60+Math.random()*70+"px";
    im.style.animationDuration=16+Math.random()*14+"s";
    im.style.animationDelay=Math.random()*8+"s";
    f.appendChild(im);
  }
}

/* CONFETTI */
const cc=document.getElementById("confetti"),cx=cc.getContext("2d");
cc.width=innerWidth;cc.height=innerHeight;
const conf=[],colors=["#ff4d6d","#ffd166","#06d6a0","#4d96ff","#845ec2","#f15bb5"];

class Conf{
  constructor(){
    this.x=Math.random()*cc.width;
    this.y=Math.random()*cc.height-cc.height;
    this.s=Math.random()*6+4;
    this.v=Math.random()*2+2;
    this.c=colors[Math.floor(Math.random()*colors.length)];
  }
  u(){this.y+=this.v;if(this.y>cc.height){this.y=-20;this.x=Math.random()*cc.width}}
  d(){cx.fillStyle=this.c;cx.fillRect(this.x,this.y,this.s,this.s)}
}
for(let i=0;i<180;i++)conf.push(new Conf());

(function loop(){
  cx.clearRect(0,0,cc.width,cc.height);
  conf.forEach(c=>{c.u();c.d()});
  requestAnimationFrame(loop);
})();

/* FIREWORKS */
const fw=document.getElementById("fireworks"),fx=fw.getContext("2d");
fw.width=innerWidth;fw.height=innerHeight;
let p=[];

class Part{
  constructor(x,y){
    this.x=x;this.y=y;
    this.vx=(Math.random()-.5)*5;
    this.vy=(Math.random()-.5)*5;
    this.life=90;
    this.c=`hsl(${Math.random()*360},100%,60%)`;
  }
  u(){this.x+=this.vx;this.y+=this.vy;this.life--}
  d(){fx.fillStyle=this.c;fx.beginPath();fx.arc(this.x,this.y,2,0,7);fx.fill()}
}

function boom(){
  let x=Math.random()*fw.width,y=Math.random()*fw.height/2;
  for(let i=0;i<80;i++)p.push(new Part(x,y));
}

function fireworks(){
  (function loop(){
    fx.fillStyle="rgba(0,0,0,.15)";
    fx.fillRect(0,0,fw.width,fw.height);
    if(Math.random()<.05)boom();
    p=p.filter(o=>{o.u();o.d();return o.life>0});
    requestAnimationFrame(loop);
  })();
}
