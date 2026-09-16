// sprites.js — the pixel creatures from the April 2026 deck, shared.
//
// Any element with data-sprite="beaver|raccoon|otter" gets the sprite injected
// as inline SVG. data-px sets the pixel scale (default 3).
//
//   <div class="sprite" data-sprite="raccoon" data-px="4"></div>

(function () {
  var PAL = {
    beaver: {A:'#3f190e',B:'#af6127',C:'#fce6b0',D:'#773c1f',E:'#050003',F:'#fffee7',G:'#dd7a2d'},
    raccoon: {A:'#7f8894',B:'#282c33',C:'#40454b',D:'#f0ecf0',E:'#545c65',F:'#a0abbd',G:'#050029',H:'#efa09f'},
    otter: {A:'#402110',B:'#f2d79d',C:'#9f5332',D:'#ff6970',E:'#c47b4a'},
  };

  var MAP = {
    beaver: [
      '..AAA........AAA.....',
      '.ABBBA......ABBBA....',
      '.ABAAAAAAAAAAAABA....',
      '.ABABBBBBBBBBAABA....',
      '..ABBBBBBBBBBBAA.....',
      '..ABABBBBAEBBBAA.....',
      '..ABABBBBAEBBBAA.....',
      '.ABBAAAABAEBBBBA.....',
      '.ABACAACCCFABBBA.....',
      '.ABACCACCCFABBBA.AAA.',
      '.ABBAAAAAAEBBBAAADDDA',
      '..ABBCAFABBBBAA.AADDA',
      '...ABAAAABBBBBBAADADA',
      '..ABBBBBBBBBBBBAADDAA',
      '.ABBABCCCAEBBBBBAADDA',
      '.ABBACCCABBBBABBADADA',
      '.AGGACCCAGGGGABBADADA',
      '..AAACCCAAAAABBBADDA.',
      '..ABCCCCCCFABBBBAAAA.',
      '.AAABCCCCAAAABBBAA...',
      'ABBBACCCABBBBBBAA....',
      'AAAAAAAAAAAAAAAA.....',
    ],
    raccoon: [
      '...BB........BBB.........',
      '...BFGG.....GFFB.........',
      '...BABB.....BAAB.........',
      '...BCAABBBBBACCB.........',
      '...BAAAAAAAAAAAB.........',
      '...BCCCCAAACCCCB.........',
      '...BCBCCAAACCCCB.........',
      '.BBCCBBCBCCCBCBCB........',
      '.BBACBBCAAACBCCAB........',
      '.BBCAAADHHHDAAACB...BBB..',
      '.BBCAAADHHHDAAACB...BBB..',
      '...BCAADDDDDAEEB...BCCCB.',
      '....BCCCCEEECBB....BAAACB',
      '...BAAAAAAAAAAAB...BCCCBB',
      '...BAAAAAAAAAAAB...BCCCCB',
      '.BBAAAAAAAAAAAAAB..BAAAAB',
      '.BBAABBAAAAABAAAB..BCCCCB',
      '.BBAAAABAAABAAAABBBAACCCB',
      '.GGFAAABAAABAAAAGBBAABBCG',
      'BAABAAABAAABAAABABBCAAAB.',
      'BAAABBBBAAABBBBAABBCCBB..',
      'BCCAAAAAAAAAAAAACBBBB....',
      '.BBBBGGAAAAAGBBBB........',
      '.BBCCBBAAAAABCCCB........',
      '...BBBBBBBBBBBBB.........',
    ],
    otter: [
      '.....AAAAAAAA......',
      '..AAACCCCCCCCAAA...',
      '.ACCCCCCCCCCCCCCA..',
      '.ACACCCCCCCCCCACA..',
      '..ACCBACCCCBACCA...',
      '..ACCAACDDCAACCA...',
      'AAACBBBBAABBBBCAAA.',
      '..ABEBABAABABEBA...',
      '.AAABBBABBABBBAAA..',
      '...AABBBBBBBBAA....',
      '...ACCCCCCCCCCA....',
      '..ACCCCBBBBCCCCA...',
      '..ACCABBBBBBACCA...',
      '..ACCCABBBBACCCA...',
      '..AACCABBBBACCAA.AA',
      '..ACAABBBBBBAACAACA',
      '.ACCCBBBBBBBBCCCACA',
      '.ACAAABBBBBBAAACAA.',
      '.ACCCCABBBBACCCCA..',
      '..ACCCAAAAAACCCA...',
      '...AAA......AAA....',
    ],
  };

  function render(map, pal, px) {
    var cols = Math.max.apply(null, map.map(function (r) { return r.length; }));
    var rects = [];
    for (var r = 0; r < map.length; r++) {
      for (var c = 0; c < map[r].length; c++) {
        var ch = map[r][c];
        if (ch === ' ' || ch === '.') continue;
        var fill = pal[ch];
        if (!fill) continue;
        rects.push('<rect x="' + (c * px) + '" y="' + (r * px) + '" width="' + px +
                   '" height="' + px + '" fill="' + fill + '"/>');
      }
    }
    var w = cols * px, h = map.length * px;
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h +
      '" xmlns="http://www.w3.org/2000/svg" style="image-rendering:pixelated;display:block" ' +
      'shape-rendering="crispEdges">' + rects.join('') + '</svg>';
  }

  function paint() {
    document.querySelectorAll('[data-sprite]').forEach(function (el) {
      var name = el.getAttribute('data-sprite');
      if (!MAP[name] || el.firstElementChild) return;
      el.innerHTML = render(MAP[name], PAL[name], parseInt(el.getAttribute('data-px') || '3', 10));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', paint);
  } else {
    paint();
  }

  window.woltSprites = { render: render, paint: paint, MAP: MAP, PAL: PAL };
})();
