</div>
    <div class="popup-footer-btns">
      <button class="popup-compare-this" id="popup-compare-this-btn">⚔ Compare</button>
      <button class="popup-close" id="popup-close">Close</button>
    </div>
  </div>
</div>

<!-- ══ COMPARE OVERLAY ══ -->
<div id="compare-overlay" class="overlay">
  <div class="compare-popup">
    <div class="compare-title">⚔ Compare Players</div>
    <div class="compare-sub">Select two runners to see a side-by-side breakdown</div>
    <div class="compare-picker">
      <div class="compare-slot">
        <div class="compare-slot-label">Player 1</div>
        <div class="compare-search-wrap">
          <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          <input class="compare-search-input" id="cmp-search-a" placeholder="Search player…" autocomplete="off">
          <div class="compare-dropdown" id="cmp-dropdown-a"></div>
        </div>
        <div class="compare-selected-card" id="cmp-card-selected-a">
          <img id="cmp-sel-avatar-a" src="" alt="">
          <div class="csc-info"><div class="csc-name" id="cmp-sel-name-a"></div><div class="csc-score" id="cmp-sel-score-a"></div></div>
          <button class="csc-clear" onclick="clearSlot('a')">×</button>
        </div>
        <input type="hidden" id="compare-select-a">
      </div>
      <div class="compare-slot">
        <div class="compare-slot-label">Player 2</div>
        <div class="compare-search-wrap">
          <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
          <input class="compare-search-input" id="cmp-search-b" placeholder="Search player…" autocomplete="off">
          <div class="compare-dropdown" id="cmp-dropdown-b"></div>
        </div>
        <div class="compare-selected-card" id="cmp-card-selected-b">
          <img id="cmp-sel-avatar-b" src="" alt="">
          <div class="csc-info"><div class="csc-name" id="cmp-sel-name-b"></div><div class="csc-score" id="cmp-sel-score-b"></div></div>
          <button class="csc-clear" onclick="clearSlot('b')">×</button>
        </div>
        <input type="hidden" id="compare-select-b">
      </div>
    </div>
    <button class="compare-go" id="compare-go-btn" disabled>Select two players to compare →</button>
    <div class="compare-result" id="compare-result">
      <div class="compare-players">
        <div class="compare-player-card" id="cmp-card-a">
          <img class="compare-avatar" id="cmp-avatar-a" src="" alt="">
          <div class="compare-pname" id="cmp-name-a"></div>
          <div class="compare-pdisplay" id="cmp-display-a"></div>
          <div class="compare-pscore" id="cmp-score-a"></div>
        </div>
        <div class="compare-vs">VS</div>
        <div class="compare-player-card" id="cmp-card-b">
          <img class="compare-avatar" id="cmp-avatar-b" src="" alt="">
          <div class="compare-pname" id="cmp-name-b"></div>
          <div class="compare-pdisplay" id="cmp-display-b"></div>
          <div class="compare-pscore" id="cmp-score-b"></div>
        </div>
      </div>
      <div class="compare-stats-grid" id="compare-stats-grid"></div>
    </div>
    <button class="compare-close" id="compare-close-btn">Close</button>
  </div>
</div>

<div id="error-overlay" class="overlay">
  <div class="error-box">
    <h2>Runner not found 😅</h2>
    <p>No one by that name is on the leaderboard. Double-check the spelling!</p>
    <button class="popup-close" id="error-close">Got it</button>
  </div>
</div>

<script>
/* ══ MOUSE GLOW — trails the cursor with easing, pauses off-screen/perf-mode ══ */
(function(){
  const glow=document.getElementById('mouse-glow');
  if(!glow)return;
  let mx=null,my=null,gx=innerWidth/2,gy=innerHeight/2,shown=false;
  window.addEventListener('pointermove',e=>{
    mx=e.clientX;my=e.clientY;
    if(!shown){shown=true;glow.style.opacity='1';}
  },{passive:true});
  window.addEventListener('pointerleave',()=>{shown=false;glow.style.opacity='0';});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){shown=false;glow.style.opacity='0';}});
  function loop(){
    requestAnimationFrame(loop);
    if(mx===null||document.hidden||document.documentElement.classList.contains('perf-mode'))return;
    gx+=(mx-gx)*0.14;gy+=(my-gy)*0.14;
    glow.style.transform=`translate3d(${gx}px,${gy}px,0) translate(-50%,-50%)`;
  }
  requestAnimationFrame(loop);
})();

/* ══ GALAXY STARFIELD — drifting stars + shooting stars ══ */
(function(){
  const c=document.getElementById('stars-canvas');
  const ctx=c.getContext('2d');
  let W,H,stars=[],shooters=[];
  let lastFrame=0;
  const FRAME_MS=1000/40; // cap redraw rate — background decoration doesn't need 60fps
  let resizeTimer;

  function resize(){W=c.width=window.innerWidth;H=c.height=window.innerHeight;}

  function mkStars(){
    stars=[];
    const n=Math.floor(W*H/3600);
    for(let i=0;i<n;i++){
      const z=Math.pow(Math.random(),1.4);
      const rnd=Math.random();
      let hue=0,sat=0;
      if(rnd<0.18){hue=260;sat=55;}
      else if(rnd<0.32){hue=220;sat=45;}
      else if(rnd<0.38){hue=300;sat=40;}
      stars.push({
        x:Math.random()*W, y:Math.random()*H,
        z, r:z*1.7+0.15,
        dx:(Math.random()-.5)*0.09*(z+0.08),
        dy:(Math.random()-.5)*0.045*(z+0.08),
        phase:Math.random()*Math.PI*2,
        ts:0.003+Math.random()*0.013,
        hue,sat,
      });
    }
  }

  function spawnShooter(){
    if(shooters.length>=2)return;
    const spd=7+Math.random()*9;
    const ang=(15+Math.random()*22)*Math.PI/180;
    shooters.push({
      x:Math.random()*W*0.65, y:Math.random()*H*0.38,
      vx:Math.cos(ang)*spd, vy:Math.sin(ang)*spd,
      life:1, decay:0.009+Math.random()*0.009,
      len:65+Math.random()*110,
      purple:Math.random()<0.45,
    });
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    // stars
    stars.forEach(s=>{
      s.x+=s.dx; s.y+=s.dy;
      if(s.x<-2)s.x=W+2; if(s.x>W+2)s.x=-2;
      if(s.y<-2)s.y=H+2; if(s.y>H+2)s.y=-2;
      s.phase+=s.ts;
      const a=0.16+0.74*Math.abs(Math.sin(s.phase));
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=s.sat>0?`hsla(${s.hue},${s.sat}%,98%,${a})`:`rgba(255,255,255,${a})`;
      ctx.fill();
    });
    // shooting stars
    shooters=shooters.filter(s=>s.life>0);
    shooters.forEach(s=>{
      const len=s.len/Math.hypot(s.vx,s.vy);
      const tx=s.x-s.vx*len, ty=s.y-s.vy*len;
      const g=ctx.createLinearGradient(tx,ty,s.x,s.y);
      if(s.purple){
        g.addColorStop(0,'rgba(167,139,250,0)');
        g.addColorStop(1,`rgba(220,210,255,${s.life*0.88})`);
      } else {
        g.addColorStop(0,'rgba(200,210,255,0)');
        g.addColorStop(1,`rgba(255,255,255,${s.life*0.92})`);
      }
      ctx.save();ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(s.x,s.y);
      ctx.strokeStyle=g;ctx.lineWidth=1.8*s.life;ctx.stroke();ctx.restore();
      s.x+=s.vx;s.y+=s.vy;s.life-=s.decay;
    });
  }

  function loop(ts){
    requestAnimationFrame(loop);
    if(document.hidden||document.documentElement.classList.contains('perf-mode'))return; // don't burn CPU on a background tab or in performance mode
    if(ts-lastFrame<FRAME_MS)return; // frame-rate cap
    lastFrame=ts;
    draw();
  }

  window.addEventListener('resize',()=>{
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(()=>{resize();mkStars();},150); // debounce so dragging the window doesn't rebuild the star array dozens of times
  },{passive:true});

  resize();mkStars();
  setInterval(()=>{if(!document.hidden&&!document.documentElement.classList.contains('perf-mode')&&Math.random()<0.42)spawnShooter();},2400);
  requestAnimationFrame(loop);
})();

/* ══ PERFORMANCE MODE TOGGLE ══ */
(function(){
  const KEY='tttiers-performance-mode';
  const btn=document.getElementById('perf-mode-btn');
  const chip=document.getElementById('perf-chip');
  function apply(on){
    document.documentElement.classList.toggle('perf-mode',on);
    if(btn)btn.classList.toggle('is-on',on);
    if(chip)chip.textContent=on?'On':'Off';
  }
  apply(document.documentElement.classList.contains('perf-mode'));
  if(btn)btn.onclick=()=>{
    const next=!document.documentElement.classList.contains('perf-mode');
    try{localStorage.setItem(KEY,next?'1':'0');}catch(e){}
    apply(next);
  };
})();

/* ══ LEADERBOARD LOGIC ══ */
const REGION_MAP={
  NA:{name:"North America",color:"#60a5fa",bg:"rgba(96,165,250,.18)"},
  EU:{name:"Europe",color:"#34d399",bg:"rgba(52,211,153,.18)"},
  OC:{name:"Oceania",color:"#fbbf24",bg:"rgba(251,191,36,.18)"},
  AS:{name:"Asia",color:"#f87171",bg:"rgba(248,113,113,.18)"},
  SA:{name:"South America",color:"#a78bfa",bg:"rgba(167,139,250,.18)"},
  "N/A":{name:"Unknown",color:"#6b8aaa",bg:"rgba(107,138,170,.12)"}
};
const TIERS=[
  {min:0,max:119,cls:"tier-f",label:"F"},{min:120,max:199,cls:"tier-d",label:"D"},
  {min:200,max:279,cls:"tier-c",label:"C"},{min:280,max:319,cls:"tier-b",label:"B"},
  {min:320,max:359,cls:"tier-a",label:"A"},{min:360,max:379,cls:"tier-s",label:"S"},
  {min:380,max:399,cls:"tier-ss",label:"SS"},{min:400,max:400,cls:"tier-z",label:"Z"},
];
const STAT_TIERS=[
  {min:0,max:29,cls:"tier-f",label:"F"},{min:30,max:49,cls:"tier-d",label:"D"},
  {min:50,max:69,cls:"tier-c",label:"C"},{min:70,max:79,cls:"tier-b",label:"B"},
  {min:80,max:89,cls:"tier-a",label:"A"},{min:90,max:94,cls:"tier-s",label:"S"},
  {min:95,max:99,cls:"tier-ss",label:"SS"},{min:100,max:100,cls:"tier-z",label:"Z"},
];
function getTier(v){return TIERS.find(t=>v>=t.min&&v<=t.max)||TIERS[0];}
function getStatTier(v){return STAT_TIERS.find(t=>v>=t.min&&v<=t.max)||STAT_TIERS[0];}
function crownIcon(rank){if(rank>3)return"";return`<span class="crown-icon crown-${rank}"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 16L3 7l5.5 4L12 4l3.5 7L21 7l-2 9H5zm0 2h14v2H5v-2z"/></svg></span>`;}
function getRegion(c){return REGION_MAP[(c||"").toUpperCase()]||REGION_MAP["N/A"];}
function calcOverall(r){return(r.bounce||0)+(r.nobounce||0)+(r.consistency||0)+(r.cam||0);}
function sv(v,max=100){return`${v}<span class="p-stat-max"> / ${max}</span>`;}
function tbHTML(v){const t=getStatTier(v);return`<span class="tier-badge ${t.cls}">${t.label}</span>`;}
function deviceSVG(d){
  if((d||"").toLowerCase()==="pc")return`<svg class="device-icon" viewBox="0 0 24 24"><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z"/></svg>`;
  if((d||"").toLowerCase()==="mob"||(d||"").toLowerCase()==="mobile")return`<svg class="device-icon" viewBox="0 0 24 24"><path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>`;
  return"";
}
function regionBadge(r){const reg=getRegion(r.region);const code=(r.region||"N/A").toUpperCase();return`<span class="region-badge" data-full="${reg.name}" style="background:${reg.bg};color:${reg.color};border:1px solid ${reg.color}40;">${code}</span>`;}
function statusPill(r){const isActive=(r.status||"active")==="active";return`<span class="status-pill ${isActive?"active":"inactive"}"><span class="status-dot ${isActive?"active":"inactive"}"></span>${isActive?"Active":"Inactive"}</span>`;}
/* ══ RANK MOVEMENT WORKFLOW ══
   The ↑/↓ badges compare runners.json against runners-previous.json — a plain
   snapshot file living next to it. This file is NOT generated automatically.
   To make badges appear after an update:
     1. Before editing runners.json, copy the CURRENT runners.json and save
        that copy as runners-previous.json (same folder).
     2. Edit runners.json as usual with the new scores.
     3. Upload/deploy both files together.
   Every visitor's browser then computes the same before/after comparison from
   these two static files, so everyone sees identical badges — nothing is
   stored per-browser. If runners-previous.json is missing (e.g. the very
   first time you do this), no badges show — that's expected, not a bug. */
function rankDeltaHTML(id){
  const d=rankDeltas[id];
  if(!d)return"";
  if(d>0)return`<span class="rank-delta up" title="Moved up ${d} place${d>1?"s":""} since the last runners.json update">↑ ${d}</span>`;
  return`<span class="rank-delta down" title="Moved down ${Math.abs(d)} place${Math.abs(d)>1?"s":""} since the last runners.json update">↓ ${Math.abs(d)}</span>`;
}

const PER_PAGE=20;
let allRunnersData=[],runnersData=[],currentPage=1,totalPages=1,currentMode="all",pendingMode="all",currentRegion="all",pendingRegion="all";
let rankDeltas={};
const avatarCache={};
let compareA=null,compareB=null;
let currentOpenRunner=null;

function renderPage(page){
  currentPage=page;
  const start=(page-1)*PER_PAGE,slice=runnersData.slice(start,start+PER_PAGE);
  const list=document.getElementById("speedrunnerList");
  list.innerHTML=slice.map((r,i)=>{
    const rank=start+i+1,rc=rank===1?"rank-1":rank===2?"rank-2":rank===3?"rank-3":"";
    const topCls=rank===1?"top-gold":rank===2?"top-silver":rank===3?"top-bronze":"";
    const crown=crownIcon(rank);
    const ov=calcOverall(r),ot=getTier(ov);
    const isActive=(r.status||"active")==="active";
    return`<li class="player-item${isActive?"":" is-inactive"}${topCls?" "+topCls:""}" data-userid="${r.id}" tabindex="0" role="button" aria-label="View ${r.name}">
      <div class="player-rank ${rc}">${rank}</div>
      <div class="player-info">
        <img class="avatar" loading="lazy" src="" alt="${r.name}">
        <div class="player-text">
          <div class="player-username">${crown}${deviceSVG(r.device)} @${r.name}</div>
          <div class="player-meta">${regionBadge(r)}<span class="player-display">(${r.display||r.name})</span></div>
        </div>
        ${rankDeltaHTML(r.id)}
      </div>
      <div class="score-cell"><span class="score-num">${r.bounce||0}</span>${tbHTML(r.bounce||0)}</div>
      <div class="score-cell"><span class="score-num">${r.nobounce||0}</span>${tbHTML(r.nobounce||0)}</div>
      <div class="score-cell"><span class="score-num">${r.consistency||0}</span>${tbHTML(r.consistency||0)}</div>
      <div class="score-cell"><span class="score-num">${r.cam||0}</span>${tbHTML(r.cam||0)}</div>
      <div class="overall-cell"><span class="overall-score">${ov}</span><span class="overall-max">/ 400</span></div>
      <div style="display:flex;align-items:center;justify-content:center;">${statusPill(r)}</div>
      <div class="overall-tier-cell"><span class="tier-badge big-tier ${ot.cls}">${ot.label}</span></div>
    </li>`;
  }).join("");
  document.getElementById("page-info").textContent=`Page ${page} of ${totalPages}`;
  document.getElementById("prev").disabled=page===1;
  document.getElementById("next").disabled=page===totalPages;
  list.querySelectorAll(".player-item").forEach(item=>{
    const go=()=>{const r=allRunnersData.find(x=>x.id==item.dataset.userid);if(r)openPopup(r);};
    item.onclick=go;item.onkeydown=e=>{if(e.key==="Enter"||e.key===" ")go();};
  });
  loadAvatars();
}

function applyMode(mode,regionCode){
  currentMode=mode;currentRegion=regionCode||"all";
  if(mode==="all")runnersData=[...allRunnersData];
  else if(mode==="pc")runnersData=allRunnersData.filter(r=>(r.device||"").toLowerCase()==="pc");
  else if(mode==="mobile")runnersData=allRunnersData.filter(r=>(r.device||"").toLowerCase()==="mob"||(r.device||"").toLowerCase()==="mobile");
  else if(mode==="active")runnersData=allRunnersData.filter(r=>(r.status||"active")==="active");
  else if(mode==="inactive")runnersData=allRunnersData.filter(r=>(r.status||"active")!=="active");
  else if(mode==="region")runnersData=currentRegion==="all"?[...allRunnersData]:allRunnersData.filter(r=>(r.region||"N/A").toUpperCase()===currentRegion);
  totalPages=Math.max(1,Math.ceil(runnersData.length/PER_PAGE));
  const regionNames={NA:"North America",EU:"Europe",OC:"Oceania",AS:"Asia",SA:"South America",AF:"Africa"};
  const labels={all:"All Players",pc:"PC Only",mobile:"Mobile Only",active:"Active Only",inactive:"Inactive Only",region:currentRegion==="all"?"All Regions":(regionNames[currentRegion]||currentRegion)};
  document.getElementById("mode-label-text").textContent=labels[mode]||"All Players";
  const text=document.getElementById("hero-badge-text");
  const icon=document.getElementById("hero-badge-icon");
  const badge=document.getElementById("hero-badge");
  if(mode==="pc"){icon.innerHTML=deviceSVG("pc");text.textContent="PC Players Only";icon.style.display="inline-flex";badge.classList.remove("no-icon");}
  else if(mode==="mobile"){icon.innerHTML=deviceSVG("mob");text.textContent="Mobile Players Only";icon.style.display="inline-flex";badge.classList.remove("no-icon");}
  else if(mode==="active"){icon.innerHTML="🟢";text.textContent="Active Players Only";icon.style.display="inline-flex";badge.classList.remove("no-icon");}
  else if(mode==="inactive"){icon.innerHTML="🔴";text.textContent="Inactive Players";icon.style.display="inline-flex";badge.classList.remove("no-icon");}
  else if(mode==="region"){icon.innerHTML="🌍";text.textContent=currentRegion==="all"?"All Regions":(regionNames[currentRegion]||currentRegion)+" Players";icon.style.display="inline-flex";badge.classList.remove("no-icon");}
  else{icon.innerHTML="";icon.style.display="none";badge.classList.add("no-icon");text.textContent="Top Community Rankings";}
  renderPage(1);
}

async function openPopup(runner){
  currentOpenRunner=runner;
  const rank=allRunnersData.findIndex(r=>r.id==runner.id)+1;
  const rb=document.getElementById("popup-rank-badge");
  rb.textContent="#"+rank;rb.className="popup-rank-badge"+(rank<=3?" rank-"+rank:"");
  document.getElementById("popup-main-name").textContent="@"+runner.name;
  document.getElementById("popup-display-name").textContent="("+(runner.display||runner.name)+")";
  const reg=getRegion(runner.region);
  const rel=document.getElementById("popup-region");
  rel.textContent=reg.name;rel.style.color=reg.color;rel.style.borderColor=reg.color+"40";rel.style.background=reg.bg;
  document.getElementById("popup-device").textContent=runner.device||"Unknown";
  const ov=calcOverall(runner);const t=getTier(ov);
  const tt=document.getElementById("popup-tier-tag");
  tt.textContent=t.label+" Tier";tt.className="popup-tag tier-badge "+t.cls;
  const isActive=(runner.status||"active")==="active";
  const st=document.getElementById("popup-status-tag");
  st.textContent=isActive?"🟢 Active":"🔴 Inactive";
  st.style.color=isActive?"#7fff7a":"#ff4f6d";
  st.style.borderColor=isActive?"rgba(127,255,122,.3)":"rgba(255,79,109,.3)";
  st.style.background=isActive?"rgba(127,255,122,.1)":"rgba(255,79,109,.1)";
  document.getElementById("popup-bounce").innerHTML=sv(runner.bounce||0);
  document.getElementById("popup-nobounce").innerHTML=sv(runner.nobounce||0);
  document.getElementById("popup-consistency").innerHTML=sv(runner.consistency||0);
  document.getElementById("popup-cam").innerHTML=sv(runner.cam||0);
  document.getElementById("popup-overall").innerHTML=sv(ov,400);
  document.getElementById("popup-roblox").href=`https://www.roblox.com/users/${runner.id}/profile`;
  const yt=document.getElementById("popup-youtube");
  yt.style.display=(runner.youtube&&runner.youtube.trim())?"flex":"none";
  if(runner.youtube)yt.href=runner.youtube;
  const img=document.getElementById("popup-avatar");img.src="";
  if(avatarCache[runner.id]){img.src=avatarCache[runner.id];}
  else{try{const res=await fetch(`https://thumbnails.roproxy.com/v1/users/avatar-headshot?userIds=${runner.id}&size=150x150&format=Png&isCircular=true`);const d=await res.json();if(d.data?.[0]){avatarCache[runner.id]=d.data[0].imageUrl;img.src=d.data[0].imageUrl;}}catch(e){}}
  const cmpBtn=document.getElementById("popup-compare-this-btn");
  if(compareA&&compareA.id==runner.id){cmpBtn.textContent="✓ Selected as P1";cmpBtn.classList.add("selected");}
  else if(compareB&&compareB.id==runner.id){cmpBtn.textContent="✓ Selected as P2";cmpBtn.classList.add("selected");}
  else{cmpBtn.textContent="⚔ Compare";cmpBtn.classList.remove("selected");}
  document.getElementById("player-overlay").classList.add("open");
  document.body.style.overflow="hidden";
}
document.getElementById("popup-compare-this-btn").onclick=function(){
  if(!currentOpenRunner)return;
  const slotA=document.getElementById("compare-select-a").value;
  if(!slotA){selectComparePlayer('a',currentOpenRunner.id);}
  else if(String(slotA)!==String(currentOpenRunner.id)){selectComparePlayer('b',currentOpenRunner.id);}
  else{clearSlot('a');selectComparePlayer('a',currentOpenRunner.id);}
  const a=document.getElementById("compare-select-a").value;
  const b=document.getElementById("compare-select-b").value;
  if(a&&b&&a!==b){closeOv("player-overlay");openCompare(allRunnersData.find(r=>String(r.id)===String(a)),allRunnersData.find(r=>String(r.id)===String(b)));}
  else{closeOv("player-overlay");document.getElementById("compare-result").classList.remove("show");document.getElementById("compare-overlay").classList.add("open");document.body.style.overflow="hidden";}
};

document.getElementById("compare-open-btn").onclick=()=>{document.getElementById("compare-result").classList.remove("show");document.getElementById("compare-overlay").classList.add("open");document.body.style.overflow="hidden";};
document.getElementById("compare-go-btn").onclick=()=>{const idA=document.getElementById("compare-select-a").value;const idB=document.getElementById("compare-select-b").value;if(!idA||!idB||idA===idB)return;const ra=allRunnersData.find(r=>String(r.id)===String(idA));const rb=allRunnersData.find(r=>String(r.id)===String(idB));if(ra&&rb)openCompare(ra,rb);};

async function openCompare(ra,rb){
  document.getElementById("compare-overlay").classList.add("open");document.body.style.overflow="hidden";
  document.getElementById("compare-select-a").value=ra.id;document.getElementById("compare-select-b").value=rb.id;
  for(const r of [ra,rb]){
    const key=r===ra?"a":"b";const imgEl=document.getElementById("cmp-avatar-"+key);imgEl.src="";
    if(avatarCache[r.id]){imgEl.src=avatarCache[r.id];}
    else{try{const res=await fetch(`https://thumbnails.roproxy.com/v1/users/avatar-headshot?userIds=${r.id}&size=150x150&format=Png&isCircular=true`);const d=await res.json();if(d.data?.[0]){avatarCache[r.id]=d.data[0].imageUrl;imgEl.src=d.data[0].imageUrl;}}catch(e){}}
    document.getElementById("cmp-name-"+key).textContent="@"+r.name;
    document.getElementById("cmp-display-"+key).textContent="("+(r.display||r.name)+")";
    document.getElementById("cmp-score-"+key).textContent=calcOverall(r)+" / 400";
  }
  const stats=[
    {label:"Bounce",ka:"bounce",kb:"bounce"},{label:"No Bounce",ka:"nobounce",kb:"nobounce"},
    {label:"Consistency",ka:"consistency",kb:"consistency"},{label:"Camera",ka:"cam",kb:"cam"},
    {label:"Overall",ka:null,kb:null,ova:calcOverall(ra),ovb:calcOverall(rb),max:400},
  ];
  document.getElementById("compare-stats-grid").innerHTML=stats.map(s=>{
    const va=s.ova!==undefined?s.ova:(ra[s.ka]||0);const vb=s.ovb!==undefined?s.ovb:(rb[s.kb]||0);
    const max=s.max||100;const diff=va-vb;
    const aClass=va>vb?"winner":va<vb?"loser":"tied";const bClass=vb>va?"winner":vb<va?"loser":"tied";
    const diffTxt=diff===0?"=":(diff>0?`A +${diff}`:`B +${Math.abs(diff)}`);
    return`<div class="compare-stat-row"><div class="compare-val ${aClass}">${va}<span style="font-size:.65rem;opacity:.5;"> /${max}</span></div><div class="compare-diff"><div style="font-size:.6rem;color:var(--muted);margin-bottom:2px;">${s.label}</div>${diffTxt}</div><div class="compare-val ${bClass}">${vb}<span style="font-size:.65rem;opacity:.5;"> /${max}</span></div></div>`;
  }).join("");
  document.getElementById("compare-result").classList.add("show");
}

document.getElementById("compare-close-btn").onclick=()=>closeOv("compare-overlay");
document.getElementById("compare-overlay").addEventListener("click",e=>{if(!e.target.closest(".compare-popup"))closeOv("compare-overlay");});
function closeOv(id){document.getElementById(id).classList.remove("open");document.body.style.overflow="";}

async function loadAvatars(){
  const items=Array.from(document.querySelectorAll(".player-item"));
  const ids=items.filter(i=>!avatarCache[i.dataset.userid]).map(i=>i.dataset.userid).filter(Boolean);
  items.forEach(i=>{const img=i.querySelector(".avatar");if(img&&avatarCache[i.dataset.userid]){img.src=avatarCache[i.dataset.userid];img.style.opacity="1";}});
  for(let i=0;i<ids.length;i+=100){
    try{const res=await fetch(`https://thumbnails.roproxy.com/v1/users/avatar-headshot?userIds=${ids.slice(i,i+100).join(",")}&size=150x150&format=Png&isCircular=true`);const d=await res.json();d.data?.forEach(x=>{avatarCache[x.targetId]=x.imageUrl;const img=document.querySelector(`.player-item[data-userid="${x.targetId}"] .avatar`);if(img){img.src=x.imageUrl;img.style.opacity="1";}});if(i+100<ids.length)await new Promise(r=>setTimeout(r,300));}catch(e){}
  }
}

document.getElementById("mode-selector-btn").onclick=()=>{
  pendingMode=currentMode;pendingRegion=currentRegion;
  document.querySelectorAll(".mode-option[data-mode]").forEach(o=>o.classList.toggle("selected",o.dataset.mode===currentMode));
  document.querySelectorAll(".region-pick-btn").forEach(b=>b.classList.toggle("selected",b.dataset.region===currentRegion));
  document.getElementById("region-picker").classList.toggle("show",currentMode==="region");
  document.getElementById("mode-overlay").classList.add("open");document.body.style.overflow="hidden";
};
document.querySelectorAll(".mode-option[data-mode]").forEach(btn=>{btn.onclick=function(){pendingMode=this.dataset.mode;document.querySelectorAll(".mode-option").forEach(o=>o.classList.remove("selected"));this.classList.add("selected");document.getElementById("region-picker").classList.toggle("show",pendingMode==="region");};});
document.querySelectorAll(".region-pick-btn").forEach(btn=>{btn.onclick=function(){pendingRegion=this.dataset.region;document.querySelectorAll(".region-pick-btn").forEach(b=>b.classList.remove("selected"));this.classList.add("selected");};});
document.getElementById("mode-apply").onclick=()=>{closeOv("mode-overlay");if(pendingMode==="stats"){window.location.href="stats.html";return;}applyMode(pendingMode,pendingRegion);};
document.querySelector('.mode-option[data-action="stats"]').onclick=function(){pendingMode="stats";document.querySelectorAll(".mode-option").forEach(o=>o.classList.remove("selected"));this.classList.add("selected");document.getElementById("region-picker").classList.remove("show");};
document.getElementById("mode-overlay").addEventListener("click",e=>{if(!e.target.closest(".mode-popup"))closeOv("mode-overlay");});
document.getElementById("popup-close").onclick=()=>closeOv("player-overlay");
document.getElementById("error-close").onclick=()=>closeOv("error-overlay");
document.getElementById("player-overlay").addEventListener("click",e=>{if(!e.target.closest(".popup")&&!e.target.closest(".compare-dropdown")&&!e.target.closest(".compare-search-wrap"))closeOv("player-overlay");});
document.getElementById("error-overlay").addEventListener("click",e=>{if(!e.target.closest(".error-box"))closeOv("error-overlay");});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeOv("player-overlay");closeOv("error-overlay");closeOv("mode-overlay");closeOv("compare-overlay");}});
document.getElementById("prev").onclick=()=>{if(currentPage>1)renderPage(currentPage-1);};
document.getElementById("next").onclick=()=>{if(currentPage<totalPages)renderPage(currentPage+1);};

function setupCompareSearch(slot){
  const inp=document.getElementById("cmp-search-"+slot);
  const drop=document.getElementById("cmp-dropdown-"+slot);
  inp.addEventListener("input",()=>{
    const q=inp.value.toLowerCase().trim();
    if(!q){drop.classList.remove("open");drop.innerHTML="";return;}
    const matches=allRunnersData.filter(r=>r.name.toLowerCase().includes(q)||(r.display||"").toLowerCase().includes(q)).slice(0,8);
    if(!matches.length){drop.innerHTML=`<div style="padding:10px 12px;color:var(--muted);font-size:.8rem;">No results</div>`;drop.classList.add("open");return;}
    drop.innerHTML=matches.map(r=>{const ov=(r.bounce||0)+(r.nobounce||0)+(r.consistency||0)+(r.cam||0);const av=avatarCache[r.id]||"";const isActive=(r.status||"active")==="active";return`<div class="compare-dropdown-item" data-id="${r.id}"><img src="${av}" onerror="this.src=''" alt=""><div><div class="cdi-name">@${r.name}${isActive?'':' 🔴'}</div><div class="cdi-meta">${r.display||r.name} · ${ov}/400</div></div></div>`;}).join("");
    drop.classList.add("open");
    drop.querySelectorAll(".compare-dropdown-item").forEach(item=>{item.onclick=(e)=>{e.stopPropagation();selectComparePlayer(slot,item.dataset.id);};});
  });
  inp.addEventListener("focus",(e)=>{e.stopPropagation();if(inp.value.trim())drop.classList.add("open");});
  inp.addEventListener("click",(e)=>e.stopPropagation());
  document.addEventListener("click",e=>{if(!e.target.closest("#cmp-search-"+slot)&&!e.target.closest("#cmp-dropdown-"+slot))drop.classList.remove("open");});
  inp.addEventListener("mousedown",e=>e.stopPropagation());drop.addEventListener("mousedown",e=>e.stopPropagation());
  inp.addEventListener("click",e=>e.stopPropagation());drop.addEventListener("click",e=>e.stopPropagation());
}

function selectComparePlayer(slot,id){
  const r=allRunnersData.find(x=>String(x.id)==String(id));if(!r)return;
  document.getElementById("compare-select-"+slot).value=id;
  document.getElementById("cmp-search-"+slot).value="";
  document.getElementById("cmp-dropdown-"+slot).classList.remove("open");
  document.getElementById("cmp-dropdown-"+slot).innerHTML="";
  document.getElementById("cmp-sel-name-"+slot).textContent="@"+r.name+" ("+(r.display||r.name)+")";
  const ov=(r.bounce||0)+(r.nobounce||0)+(r.consistency||0)+(r.cam||0);
  document.getElementById("cmp-sel-score-"+slot).textContent="Score: "+ov+" / 400";
  const img=document.getElementById("cmp-sel-avatar-"+slot);
  img.src=avatarCache[r.id]||"";
  if(!avatarCache[r.id]){fetch(`https://thumbnails.roproxy.com/v1/users/avatar-headshot?userIds=${r.id}&size=150x150&format=Png&isCircular=true`).then(res=>res.json()).then(d=>{if(d.data?.[0]){avatarCache[r.id]=d.data[0].imageUrl;img.src=d.data[0].imageUrl;}}).catch(()=>{});}
  document.getElementById("cmp-card-selected-"+slot).classList.add("show");
  const a=document.getElementById("compare-select-a").value;const b=document.getElementById("compare-select-b").value;
  const btn=document.getElementById("compare-go-btn");
  btn.disabled=!(a&&b&&a!==b);btn.textContent=(a&&b&&a!==b)?"Compare these two →":"Select two players to compare →";
}

function clearSlot(slot){
  document.getElementById("compare-select-"+slot).value="";
  document.getElementById("cmp-card-selected-"+slot).classList.remove("show");
  document.getElementById("cmp-search-"+slot).value="";
  const btn=document.getElementById("compare-go-btn");btn.disabled=true;btn.textContent="Select two players to compare →";
}
async function init(){
  try{
    const [res,prevRes]=await Promise.all([
      fetch("runners.json",{cache:"no-store"}),
      fetch("runners-previous.json",{cache:"no-store"}).catch(()=>null)
    ]);
    let runners=await res.json();
    runners.forEach(r=>r._overall=(r.bounce||0)+(r.nobounce||0)+(r.consistency||0)+(r.cam||0));
    runners.sort((a,b)=>b._overall-a._overall);
    allRunnersData=runners;

    // ── rank-movement tracking: compare this load's overall rank order to
    //    runners-previous.json — a snapshot of the leaderboard from before the
    //    last edit. This is a shared static file, not per-browser storage, so
    //    every visitor sees the exact same movement badges regardless of their
    //    own browsing history. See the note above renderPage() for the workflow. ──
    rankDeltas={};
    if(prevRes&&prevRes.ok){
      try{
        let prevRunners=await prevRes.json();
        prevRunners.forEach(r=>r._overall=(r.bounce||0)+(r.nobounce||0)+(r.consistency||0)+(r.cam||0));
        prevRunners.sort((a,b)=>b._overall-a._overall);
        const prevRanks={};
        prevRunners.forEach((r,i)=>{prevRanks[r.id]=i+1;});
        allRunnersData.forEach((r,i)=>{
          const rank=i+1;
          if(prevRanks[r.id]!=null){
            const delta=prevRanks[r.id]-rank; // positive = moved up (lower rank number)
            if(delta!==0)rankDeltas[r.id]=delta;
          }
        });
      }catch(e){/* missing/malformed snapshot — just show no badges this load */}
    }

    setupCompareSearch('a');setupCompareSearch('b');applyMode("all");
    document.getElementById("search").addEventListener("keydown",e=>{
      if(e.key!=="Enter")return;const q=e.target.value.toLowerCase().trim();if(!q)return;
      const m=allRunnersData.find(r=>r.name.toLowerCase().includes(q)||(r.display||"").toLowerCase().includes(q));
      if(m)openPopup(m);else document.getElementById("error-overlay").classList.add("open");
    });
  }catch(err){document.getElementById("speedrunnerList").innerHTML=`<li style="text-align:center;padding:40px;color:var(--muted)">Could not load runners.json</li>`;}
}
window.addEventListener("DOMContentLoaded",init);
</script>
</body>
</html>
