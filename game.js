
const player = document.getElementById('player');
const key = document.getElementById('key');
const door = document.getElementById('door');

let posX = 50;
let posY = 0;
let vy = 0;
let onGround = false;
const gravity = 1;
const groundY = 0;

function moveLeft(){posX -= 10; update();}
function moveRight(){posX += 10; update();}
function jump(){if(onGround){vy = 15; onGround=false;}}

function update(){
  // apply gravity
  vy -= gravity;
  posY -= vy;
  if(posY < 0){posY = 0; vy = 0; onGround = true;}

  // update player position
  player.style.left = posX + 'px';
  player.style.bottom = posY + 'px';

  // collision with key
  const pRect = player.getBoundingClientRect();
  const kRect = key.getBoundingClientRect();
  if(!key.dataset.taken && pRect.left < kRect.right && pRect.right > kRect.left &&
     pRect.bottom > kRect.top && pRect.top < kRect.bottom){
      key.dataset.taken = 'yes';
      key.style.display = 'none';
      alert('🔑 خديت المفتاح!');
  }

  // collision with door
  const dRect = door.getBoundingClientRect();
  if(key.dataset.taken && pRect.left < dRect.right && pRect.right > dRect.left &&
     pRect.bottom > dRect.top && pRect.top < dRect.bottom){
      alert('🏆 فزت! مبروك يا بطل');
      // reset
      key.dataset.taken='';
      key.style.display='block';
      posX = 50; posY = 0;
  }
}
update();
