import React from 'react';
import ReactDOM from 'react-dom/client';

class Word {
  constructor(word, audioUrl) {
    this.word = word;
    this.audioUrl = audioUrl;
  }
}

class Phrase {
  constructor(words, translation) {
    this.words = words;
    this.translation = translation;
  }
}

class PhraseWordRender extends React.Component {
  handleClick(word) {
    let audioUrl = word.audioUrl;
    if (audioUrl === null) {
      return;
    }
    if (!audioUrl) {
      audioUrl = `/audio/De-${word.word.replaceAll(' ', '_').replaceAll('?', '%253F')}.ogg`;
    }
    audioUrl = (audioUrl.startsWith('/audio/')) ? process.env.PUBLIC_URL + audioUrl : audioUrl;
    let audio = new Audio(audioUrl);
    audio.play();
  }

  render() {
    return (
            <>
              <span onClick={() => this.handleClick(this.props.word)}>{this.props.word.word}</span>
              {' '}
            </>
    );
  }
}

function PhraseItem(props) {
  return <li>{props.phrase.words.map((word, i) => <PhraseWordRender key={i} word={word}/>)}<small>{props.phrase.translation}</small></li>;
}

class PhraseList extends React.Component {
  constructor(props) {
    super(props);
    const phrasesList = [
      [[['Guten Abend', '/audio/De-guten_Abend.ogg'], ['!', null]], 'Good evening!'],
      [[['Wie', '/audio/De-wie.ogg'], ['heißen', ''], ['Sie', ''], ['?', null]], 'What\'s your name?'],
      [[['Ich heiße ...', '']], 'My name is ...'],
      [[['Wie heißt du?', '']], 'What is your name?'],
      [[['Und', '/audio/De-und.ogg'], ['wer', ''], ['bist', ''], ['du', ''], ['?', null]], 'And who are you?'],
      [[['Freut', '/audio/De-freut.ogg'], ['mich', ''], ['.', null]], 'I am glad.'],
      [[['Woher', '/audio/De-woher.ogg'], ['kommen', '/audio/De-kommen2.ogg'], ['Sie', ''], ['?', null]], 'Where are you from?'],
      [[['Ich', '/audio/De-ich.ogg'], ['kommen', '/audio/De-kommen2.ogg'], ['aus', ''], ['...', null]], 'I come from ...'],
      [[['Woher', '/audio/De-woher.ogg'], ['kommst', ''], ['du', ''], ['?', null]], 'Where do you come from?'],
      [[['Kommen', '/audio/De-kommen2.ogg'], ['Sie', ''], ['aus', ''], ['...?', null]], 'Are you from ...?'],
      [[['Wo', '/audio/De-wo.ogg'], ['wohnst', ''], ['du', ''], ['?', null]], 'Where do you live?'],
      [[['Welche', '/audio/De-welche.ogg'], ['Sprachen', '/audio/De-sprachen.ogg'], ['sprichst', ''], ['du', ''], ['?', null]], 'Which languages do you speak?'],
    ];
    let phrases = [];
    for (const phrase of phrasesList) {
      let words = [];
      for (const word of phrase[0]) {
        words.push(new Word(word[0], word[1]));
      }
      phrases.push(new Phrase(words, phrase[1]))
    }
    this.state = {
      phrases: phrases,
    };
  }

  render() {
    return (
      <ol>
        {this.state.phrases.map((phrase, i) => <PhraseItem key={i} phrase={phrase}/>)}
      </ol>
    );
  }
}

function Page(props) {
  return (
    <>
      <header>
        <h1>My German Phrase List</h1>
        <small>Click on the German words or phrases to listen to the pronunciation.</small>
      </header>
      <main>
        <PhraseList />
      </main>
      <footer>
        <small>On <a href='https://github.com/allc/my-german-phrase-list'>GitHub</a>. Content is available under the <a href='https://creativecommons.org/licenses/by-sa/3.0/'>Creative Commons Attribution-ShareAlike License</a>. Audio files are from <a href='https://commons.wikimedia.org/wiki/Main_Page'>Wikimedia Commons</a> licensed under <a href='https://www.gnu.org/licenses/fdl-1.3.html'>GNU Free Documentation License</a> and/or <a href='https://creativecommons.org/licenses/by-sa/3.0/'> Creative Commons Attribution-ShareAlike License</a>. See <a href='https://github.com/allc/my-german-phrase-list/blob/master/LICENSE.md'>LICENSE.md</a> for more information.</small>
      </footer>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Page />);
