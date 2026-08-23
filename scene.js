// scene.js — injects the forest background scene into any slide.
// Include scene.css alongside it. Self-contained: builds its own markup.
(function () {
  var host = document.getElementById('bg-scene');
  if (!host) {
    host = document.createElement('div');
    host.className = 'bg-scene';
    host.id = 'bg-scene';
    document.body.insertBefore(host, document.body.firstChild);
  }
  var clouds = [
    { id: 'cl-1', top: '38%', dur: '150s', delay: '0s' },
    { id: 'cl-2', top: '52%', dur: '115s', delay: '-42s' },
    { id: 'cl-3', top: '42%', dur: '185s', delay: '-92s' },
    { id: 'cl-4', top: '56%', dur: '135s', delay: '-68s' },
    { id: 'cl-5', top: '46%', dur: '165s', delay: '-125s' },
    { id: 'cl-6', top: '49%', dur: '200s', delay: '-28s' }
  ].map(function (c) {
    return '<div id="' + c.id + '" class="bg-cloud" style="top:' + c.top +
      ';animation-duration:' + c.dur + ';animation-delay:' + c.delay + '"></div>';
  }).join('');

  host.innerHTML =
    '<div id="bg-nature"></div>' +
    '<div class="bg-river-shimmer"></div>' +
    clouds +
    '<div class="bg-beaver-main" id="bg-beaver-main"><div class="sprite-2frame">' +
      '<div class="frm-a" id="sp-bv-main-a"></div><div class="frm-b" id="sp-bv-main-b"></div></div></div>' +
    '<div class="bg-raccoon" id="bg-raccoon"><div class="sprite-2frame">' +
      '<div class="frm-a" id="sp-rc-a"></div><div class="frm-b" id="sp-rc-b"></div></div></div>' +
    '<div class="bg-log" id="bg-log"><div id="sp-log"></div></div>' +
    '<div class="bg-ripple-container"><div class="bg-ripple"></div><div class="bg-ripple"></div><div class="bg-ripple"></div></div>' +
    '<div class="bg-leaf"><div id="sp-leaf-g"></div></div>' +
    '<div class="bg-peek" id="bg-peek"><div id="sp-peek"></div></div>' +
    '<div class="bg-fish" id="bg-fish"><div id="sp-fish"></div></div>';
})();

// ── Sprite data — inlined from sprites.js ──
var BG_SPRITE_PAL = {
  bv:{A:'#3f190e',B:'#af6127',C:'#fce6b0',D:'#773c1f',E:'#050003',F:'#fffee7',G:'#dd7a2d'},
  rc:{A:'#7f8894',B:'#282c33',C:'#40454b',D:'#f0ecf0',E:'#545c65',F:'#a0abbd',G:'#050029',H:'#efa09f'},
  lg:{A:'#894f22',B:'#5a3614',C:'#ffca4e',D:'#d09023',E:'#291a09',F:'#327a00',G:'#ffed66'},
  lf:{A:'#19d024',B:'#009728'},
  fs:{A:'#04273c',B:'#63888b',C:'#ff6f61',D:'#0096d7',E:'#b1c4bb',F:'#fcfcf4',G:'#295a69',H:'#000219',I:'#86a4a1',J:'#d5d5c9',K:'#007efb',L:'#0075bf'},
  pk:{A:'#402110',B:'#f2d79d',C:'#9f5332',D:'#ff6970',E:'#c47b4a'},
};
var BG_SPRITE_MAPS = {
  bvA:['..AAA........AAA.....', '.ABBBA......ABBBA....', '.ABAAAAAAAAAAAABA....', '.ABABBBBBBBBBAABA....', '..ABBBBBBBBBBBAA.....', '..ABABBBBAEBBBAA.....', '..ABABBBBAEBBBAA.....', '.ABBAAAABAEBBBBA.....', '.ABACAACCCFABBBA.....', '.ABACCACCCFABBBA.AAA.', '.ABBAAAAAAEBBBAAADDDA', '..ABBCAFABBBBAA.AADDA', '...ABAAAABBBBBBAADADA', '..ABBBBBBBBBBBBAADDAA', '.ABBABCCCAEBBBBBAADDA', '.ABBACCCABBBBABBADADA', '.AGGACCCAGGGGABBADADA', '..AAACCCAAAAABBBADDA.', '..ABCCCCCCFABBBBAAAA.', '.AAABCCCCAAAABBBAA...', 'ABBBACCCABBBBBBAA....', 'AAAAAAAAAAAAAAAA.....'],
  bvB:['..AAA........AAA.....', '.ABBBA......ABBBA....', '.ABAAAAAAAAAAAABA....', '.ABABBBBBBBBBAABA....', '..ABBBBBBBBBBBAA.....', '..ABABBBBAEBBBAA.....', '..ABABBBBAEBBBAA.....', '.ABBAAAABAEBBBBA.....', '.ABACAACCCFABBBA.....', '.ABACCACCCFABBBA.AAA.', '.ABBAAAAAAEBBBAAADDDA', '..ABBCAFABBBBAA.AADDA', '...ABAAAABBBBBBAADADA', '..ABBBBBBBBBBBBAADDAA', '.ABBABCCCAEBBBBBAADDA', '.ABBACCCABBBBABBADADA', '.AGGACCCAGGGGABBADADA', '..AAACCCAAAAABBBADDA.', '..ABCCCCCCFABBBBAAAA.', '.AAABCCCCAAAABBBAA...', '.ABBBACCCABBBBBBAA...', '.AAAAAAAAAAAAAAAA....'],
  rcA:['...BB........BBB.........', '...BFGG.....GFFB.........', '...BABB.....BAAB.........', '...BCAABBBBBACCB.........', '...BAAAAAAAAAAAB.........', '...BCCCCAAACCCCB.........', '...BCBCCAAACCCCB.........', '.BBCCBBCBCCCBCBCB........', '.BBACBBCAAACBCCAB........', '.BBCAAADHHHDAAACB...BBB..', '.BBCAAADHHHDAAACB...BBB..', '...BCAADDDDDAEEB...BCCCB.', '....BCCCCEEECBB....BAAACB', '...BAAAAAAAAAAAB...BCCCBB', '...BAAAAAAAAAAAB...BCCCCB', '.BBAAAAAAAAAAAAAB..BAAAAB', '.BBAABBAAAAABAAAB..BCCCCB', '.BBAAAABAAABAAAABBBAACCCB', '.GGFAAABAAABAAAAGBBAABBCG', 'BAABAAABAAABAAABABBCAAAB.', 'BAAABBBBAAABBBBAABBCCBB..', 'BCCAAAAAAAAAAAAACBBBB....', '.BBBBGGAAAAAGBBBB........', '.BBCCBBAAAAABCCCB........', '...BBBBBBBBBBBBB.........'],
  rcB:['...BB........BBB.........', '...BFGG.....GFFB.........', '...BABB.....BAAB.........', '...BCAABBBBBACCB.........', '...BAAAAAAAAAAAB.........', '...BCCCCAAACCCCB.........', '...BCBCCAAACCCCB.........', '.BBCCBBCBCCCBCBCB........', '.BBACBBCAAACBCCAB........', '.BBCAAADHHHDAAACB...BBB..', '.BBCAAADHHHDAAACB...BBB..', '...BCAADDDDDAEEB...BCCCB.', '....BCCCCEEECBB....BAAACB', '...BAAAAAAAAAAAB...BCCCBB', '...BAAAAAAAAAAAB...BCCCCB', '.BBAAAAAAAAAAAAAB..BAAAAB', '.BBAABBAAAAABAAAB..BCCCCB', '.BBAAAABAAABAAAABBBAACCCB', '.GGFAAABAAABAAAAGBBAABBCG', '.BAABAAABAAABAAABABBCAAAB', '.BAAABBBBAAABBBBAABBCCBB.', '.BCCAAAAAAAAAAAAACBBBB...', '..BBBBGGAAAAAGBBBB.......', '..BBCCBBAAAAABCCCB.......', '....BBBBBBBBBBBBB........'],
  log:['..EEE............FEEEEE.', '.EAABE......F..FFBAACCCE', 'EAABBBFFFF..EF.EBAACCDDG', 'AAABBBAABBBBAAAABBBDCDCD', 'BBBAAAABBAAAAABBBBBDCCDG', 'BBBBBBBBBAABBBBAABBDCDDC', 'EBBBBBBBBBBBBBBBBBBCCDDC', '.EEEEEEEEEEEBEBBEBEEDDDE'],
  leafG:['..........B', '.........AB', '....AAAAAAB', '...AAAAABAB', '..AABABBAAB', '..AABBAAAAB', '..AABABBABB', '..AABABBABB', '..ABAAAAAB.', '..BAAAAAB..', 'BBBBBBBB...', 'BB.........'],
  fish:['........AABBBBA', '.......ABBBEAFA', '..AAAAAGBGEEAAA', '..BBBAGBEACEEFA', '..AGABBEBCACCH.', '..AAAGEECCIAA..', '...AGEEBCEJEA..', '...ABEBCJJBJA..', '..AGECCEBAAA...', '..ABECEEH......', '..ABEEEG.......', '...AEA.A.......', '.D.AEA.....D...', '.D.AGGA...DD...', '....ABBA..D....', 'DK..ABAA....DD.', 'DD..AA....D.L..', '..D..A...DD....', '..DDDDDDLDDD...', '....DLLDLDD....'],
  peek:['.....AAAAAAAA......', '..AAACCCCCCCCAAA...', '.ACCCCCCCCCCCCCCA..', '.ACACCCCCCCCCCACA..', '..ACCBACCCCBACCA...', '..ACCAACDDCAACCA...', 'AAACBBBBAABBBBCAAA.', '..ABEBABAABABEBA...', '.AAABBBABBABBBAAA..', '...AABBBBBBBBAA....', '...ACCCCCCCCCCA....', '..ACCCCBBBBCCCCA...'],
};

function renderBgSprite(map,pal,px){
  var rows=map.length,cols=Math.max.apply(null,map.map(function(r){return r.length;}));
  var rects=[];
  for(var r=0;r<rows;r++)for(var c=0;c<map[r].length;c++){
    var fill=pal[map[r][c]];if(!fill)continue;
    rects.push('<rect x="'+(c*px)+'" y="'+(r*px)+'" width="'+px+'" height="'+px+'" fill="'+fill+'"/>');
  }
  var w=cols*px,h=rows*px;
  return'<svg width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'" xmlns="http://www.w3.org/2000/svg" style="image-rendering:pixelated;display:block" shape-rendering="crispEdges">'+rects.join('')+'</svg>';
}

// ── Inject sprites — from home-scene.js ──
(function(){
  var PX=8;
  function inject(id,mapKey,palKey,px){
    var el=document.getElementById(id);
    if(el)el.innerHTML=renderBgSprite(BG_SPRITE_MAPS[mapKey],BG_SPRITE_PAL[palKey],px||PX);
  }
  inject('sp-bv-main-a','bvA','bv',4);
  inject('sp-bv-main-b','bvB','bv',4);
  inject('sp-rc-a','rcA','rc',3);
  inject('sp-rc-b','rcB','rc',3);
  inject('sp-log','log','lg',4);
  inject('sp-leaf-g','leafG','lf',4);
  inject('sp-fish','fish','fs',3);
  inject('sp-peek','peek','pk',4);

  document.querySelectorAll('.sprite-2frame').forEach(function(el){
    var svg=el.querySelector('svg');
    if(svg){el.style.width=svg.getAttribute('width')+'px';el.style.height=svg.getAttribute('height')+'px';}
  });
})();

// ── Landscape generator — from home-scene.js ──
(function(){
  var S=5,W=Math.ceil(Math.max(window.innerWidth,screen.width||1920)/S)+6,H=48,BANK=34,RIVER=40;
  var C={fa:'#8AA6BA',fb:'#6A8698',sn:'#F0F4F8',sb:'#C8D8E8',na:'#3E5A32',nb:'#293E20',ta:'#3A7030',tb:'#2A5225',tc:'#1A3A18',tt:'#4A2810',ga:'#72B855',gb:'#4A8838',gc:'#2A5A1A',ea:'#5A4020',eb:'#3A2810',ra:'#90D4E8',rb:'#4AAAC8',rc:'#2A7AAA',rd:'#1A5888',ba:'#3A7030',bb:'#224A1A'};
  function dot(x,y,c){return'<rect x="'+(x*S)+'" y="'+(y*S)+'" width="'+S+'" height="'+S+'" fill="'+c+'"/>';}
  var fp=[],np=[];
  for(var x=0;x<W;x++){fp[x]=Math.round(7+5*Math.sin(x*0.05+0.3)+3*Math.sin(x*0.12+1.7)+1.5*Math.sin(x*0.04+0.9));np[x]=Math.round(6+6*Math.sin(x*0.08+1.0)+3.5*Math.sin(x*0.16+0.5)+1.5*Math.sin(x*0.22+2.4));}
  var out=[];
  // Far hills with snow caps
  for(var x=0;x<W;x++){var ft=BANK-16-fp[x];var snowLine=ft+3;for(var y=Math.max(ft,0);y<BANK;y++){var col;if(y<=snowLine){col=y===ft?C.sn:(y===snowLine?C.sb:C.sn);}else{col=y===ft?C.fb:C.fa;}out.push(dot(x,y,col));}}
  // Near hills
  for(var x=0;x<W;x++){var nt=BANK-2-np[x];for(var y=Math.max(nt,1);y<BANK;y++)out.push(dot(x,y,y===nt?C.nb:C.na));}
  // Grass + earth
  for(var x=0;x<W;x++){out.push(dot(x,BANK,C.ga));out.push(dot(x,BANK+1,C.gb));out.push(dot(x,BANK+2,C.gc));out.push(dot(x,BANK+3,C.ea));for(var y=BANK+4;y<RIVER;y++)out.push(dot(x,y,C.eb));}
  // River with shimmer variation
  for(var x=0;x<W;x++){out.push(dot(x,RIVER,C.ba));var sh=((x*3+2)%9<2)?C.ra:(x%5===0?C.rb:C.rc);out.push(dot(x,RIVER+1,sh));out.push(dot(x,RIVER+2,C.rc));out.push(dot(x,RIVER+3,C.rd));for(var y=RIVER+4;y<H;y++)out.push(dot(x,y,C.rd));}
  // Trees
  function tree(cx,baseY,h){for(var dy=0;dy<h;dy++){var hw=Math.floor((dy+1)*0.55),tc=dy<2?C.ta:(dy<h-2?C.tb:C.tc);for(var dx=-hw;dx<=hw;dx++){var tx=cx+dx;if(tx>=0&&tx<W)out.push(dot(tx,baseY-h+1+dy,tc));}}if(cx>=0&&cx<W){out.push(dot(cx,baseY+1,C.tt));out.push(dot(cx,baseY+2,C.tt));}}
  var tx=3;while(tx<W-3){var nt2=BANK-2-np[tx];if(nt2<BANK-7)tree(tx,nt2+Math.floor(np[tx]*0.55),5+((tx*7)%4));tx+=7+((tx*13+5)%5);}

  var el=document.getElementById('bg-nature');
  if(el)el.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" width="'+(W*S)+'" height="'+(H*S)+'" style="image-rendering:pixelated;display:block" shape-rendering="crispEdges">'+out.join('')+'</svg>';
})();

// ── Clouds — from home-scene.js ──
(function(){
  var CP={O:'#8898A8',w:'#E0E8EE',W:'#F8FCFF',s:'#BCC8D0'};
  var SHAPES={
    lg:['......OOOO...OOOO.......', '.....OwwWwOOOwwWwO......', '....OwWWWWwOwWWWWwO.....', '...OOwWWWWWwwWWWWWwOO...', '..OwwWWWWWWWWWWWWWWwO...', '..OwWWWWWWWWWWWWWWWWwO..', '..OwWWWWWWWWWWWWWWWWwO..', '..OwWWWWWWWWWWWWWWWWwO..', '..OwwWWWWWWWWWWWWWWwwO..', '..OssssssssssssssssssO..', '...OOOOOOOOOOOOOOOOOO...'],
    md:['....OOO...OOO.......', '...OwWwOOOwWwO......', '..OwWWWwOwWWWwO.....', '.OOwWWWWwwWWWWwOO...', '.OwwWWWWWWWWWWWwO...', '.OwWWWWWWWWWWWWwO...', '.OwWWWWWWWWWWWWwO...', '.OwwWWWWWWWWWWwwO...', '.OssssssssssssssO...', '..OOOOOOOOOOOOOO....'],
    sm:['...OOO..OOO....', '..OwWwOOwWwO...', '.OwWWWwwWWWwO..', '.OwwWWWWWWwwO..', '.OwWWWWWWWWwO..', '.OwwWWWWWWwwO..', '.OssssssssssO..', '..OOOOOOOOOO...'],
  };
  function renderCloud(map,px){var cols=Math.max.apply(null,map.map(function(r){return r.length;})),rects=[];for(var r=0;r<map.length;r++)for(var c=0;c<map[r].length;c++){var fill=CP[map[r][c]];if(!fill)continue;rects.push('<rect x="'+(c*px)+'" y="'+(r*px)+'" width="'+px+'" height="'+px+'" fill="'+fill+'"/>');}var w=cols*px,h=map.length*px;return'<svg width="'+w+'" height="'+h+'" xmlns="http://www.w3.org/2000/svg" style="image-rendering:pixelated;display:block" shape-rendering="crispEdges">'+rects.join('')+'</svg>';}
  [{id:'cl-1',shape:'lg',px:7},{id:'cl-2',shape:'md',px:6},{id:'cl-3',shape:'sm',px:6},{id:'cl-4',shape:'lg',px:6},{id:'cl-5',shape:'md',px:5},{id:'cl-6',shape:'sm',px:5}].forEach(function(c){var el=document.getElementById(c.id);if(el)el.innerHTML=renderCloud(SHAPES[c.shape],c.px);});
})();

// ── Wackiness engine — from home-scene.js ──
(function(){
  var WACKY_EMOJIS=['🐟','🍂','💦','🌿','🪵','🦆','🐸','🍄','🌊','🪨','🌰','🐛'];
  function spawnFloatingEmoji(){
    var scene=document.getElementById('bg-scene');
    if(!scene)return;
    var el=document.createElement('div');
    el.className='bg-emoji-float';
    el.textContent=WACKY_EMOJIS[Math.floor(Math.random()*WACKY_EMOJIS.length)];
    el.style.left=(8+Math.random()*84)+'%';
    el.style.bottom=(8+Math.random()*35)+'%';
    el.style.fontSize=(14+Math.random()*18)+'px';
    el.style.opacity='0.7';
    scene.appendChild(el);
    setTimeout(function(){el.remove();},3500);
  }
  function triggerPeek(){
    var peek=document.getElementById('bg-peek');
    if(!peek||peek.classList.contains('active'))return;
    peek.style.left=(15+Math.random()*55)+'%';
    peek.classList.add('active');
    setTimeout(function(){peek.classList.remove('active');},5500);
  }
  function triggerFishJump(){
    var fish=document.getElementById('bg-fish');
    if(!fish||fish.classList.contains('active'))return;
    fish.style.right=(80+Math.random()*200)+'px';
    fish.classList.add('active');
    setTimeout(function(){fish.classList.remove('active');},2800);
  }
  var events=[triggerPeek,triggerPeek,triggerPeek,triggerFishJump,spawnFloatingEmoji,spawnFloatingEmoji];
  function scheduleNext(){
    var delay=5000+Math.random()*12000;
    setTimeout(function(){events[Math.floor(Math.random()*events.length)]();scheduleNext();},delay);
  }
  setTimeout(triggerPeek,2000);
  setTimeout(scheduleNext,6000);
})();
