export const db = (function () {
  const options = [
    { id: 1, name: 'rihanna', historicalOption: false },
    { id: 2, name: 'beyonce', historicalOption: false },
    { id: 3, name: 'the temper trap', historicalOption: false },
    { id: 4, name: 'sia', historicalOption: false },
    { id: 5, name: 'shakira', historicalOption: false },
    { id: 6, name: 'eminem', historicalOption: true },
    { id: 7, name: 'lady gaga', historicalOption: false },
    { id: 8, name: 'daughtry', historicalOption: false },
    { id: 9, name: 'sia feat eminem', historicalOption: false }
  ];

  const articles = [
    {
      id: 1,
      url: 'https://www.youtube.com/watch?v=lHp50YxMNB4',
      title: 'Sia - 1+1 (Audio)',
      description: 'Golden Globe nominee Best Picture - Musical or Comedy, Music, the new film written & directed by Sia + starring Kate Hudson, Leslie Odom Jr. & Maddie Ziegler, is available on demand now 🌈🎧 Get more info, and find out where and when to watch in your country',
      date: '20.02.2017 г.'
    },
    {
      id: 2,
      url: 'https://www.youtube.com/watch?v=eJSik6ejkr0',
      title: '"Naughty Boy ft. Beyoncé, Arrow Benjamin - Runnin" (Lose It All) [Official Video]',
      description: 'UMG (on behalf of Virgin Records Ltd); Sony ATV Publishing, LatinAutor - SonyATV, AMRA, CMRRA, UNIAO BRASILEIRA DE EDITORAS DE MUSICA - UBEM, LatinAutorPerf, LatinAutor - PeerMusic, BMI - Broadcast Music Inc., UMPI, LatinAutor, PEDL, Concord Music Publishing, SOLAR Music Rights Management, ASCAP, and 17 Music Rights Societies',
      date: '20.05.20167 г.'
    },
    {
      id: 3,
      url: 'https://www.youtube.com/watch?v=7bnX-6sJZBw',
      title: 'Daughtry - Home (Official Video)',
      description: 'SME; Audiam (Publishing), UMPG Publishing, BMI - Broadcast Music Inc., LatinAutorPerf, CMRRA, LatinAutor - UMPG, UNIAO BRASILEIRA DE EDITORAS DE MUSICA - UBEM, UMPI, Audiam Canada, and 14 Music Rights Societies',
      date: '20.02.2018 г.'
    },
    {
      id: 4,
      url: 'https://www.youtube.com/watch?v=niqrrmev4mA',
      title: 'Lady Gaga - Alejandro',
      description: 'UMG (on behalf of Interscope); CMRRA, SOLAR Music Rights Management, LatinAutorPerf, EMI Music Publishing, UNIAO BRASILEIRA DE EDITORAS DE MUSICA - UBEM, Sony ATV Publishing, LatinAutor - SonyATV, and 13 Music Rights Societies',
      date: '20.02.2017 г.'
    },
    {
      id: 5,
      url: 'https://www.youtube.com/watch?v=jxKjOOR9sPU',
      title: 'The Temper Trap - Sweet Disposition (Official Video)',
      description: 'SME, AWAL Digital Limited (Kobalt), Grupa BB Media Music, Rebeat Digital GmbH, [Merlin] Liberation Music, BMG Rights Management (Europe) GmbH (on behalf of Glassnote Entertainment Group LLC); LatinAutorPerf, LatinAutor - PeerMusic, ASCAP, Concord Music Publishing, UNIAO BRASILEIRA DE EDITORAS DE MUSICA - UBEM, UMPI, and 18 Music Rights Societies',
      date: '20.02.2017 г.'
    },
    {
      id: 6,
      url: 'https://www.youtube.com/watch?v=CvBfHwUxHIk',
      title: 'Rihanna - Umbrella (Orange Version) (Official Music Video) ft. JAY-Z',
      description: 'Music video by Rihanna performing Umbrella. (C) 2007 The Island Def Jam Music Group',
      date: '20.02.2017 г.'
    },
    {
      id: 7,
      url: 'https://www.youtube.com/watch?v=Dsp_8Lm1eSk',
      title: 'Shakira - La Tortura (Video) ft. Alejandro Sanz',
      description: 'Download Shakira\'s self-titled album on iTunes: http://smarturl.it/ShakiraiTunes?IQid=yt',
      date: '20.02.2017 г.'
    },
    {
      id: 8,
      url: 'https://www.youtube.com/watch?v=JByDbPn6A1o',
      title: 'Eminem - Space Bound (Official Video)',
      description: 'CMRRA, UMPI, SOLAR Music Rights Management, UMPG Publishing, Warner Chappell, Me Gusta Music (Publishing), Sony ATV Publishing, UNIAO BRASILEIRA DE EDITORAS DE MUSICA - UBEM, LatinAutorPerf, BMI - Broadcast Music Inc., LatinAutor - SonyATV, LatinAutor - UMPG, and 14 Music Rights Societies',
      date: '20.02.2017 г.'
    }
  ];

  function getArticles(/* searchString */) {
    const totalResults = Math.floor(Math.random() * 200000) + 1;
    const sliceCount = Math.floor(Math.random() * 8) + 1;
    return {
      meta: {
        totalResults,
      },
      // articles: articles.filter(x => x.title.startsWith(searchString))
      articles: articles.slice(0, sliceCount)
    };
  }

  function getOptions(searchString) {
    return options.filter(x => x.name.startsWith(searchString));
  }

  function getDefaultOptions() {
    return options.filter(x => x.historicalOption);
  }

  function setHistorical(id) {
    const option = options.find(x => x.id === id);

    if (option) option.historicalOption = true;
  }

  function removeHistorical(id) {
    const option = options.find(x => x.id === id);

    if (option) option.historicalOption = false;
  }

  return {
    getArticles,
    getOptions,
    setHistorical,
    removeHistorical,
    getDefaultOptions
  };
})();
