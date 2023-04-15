/**
 * @author Amittai (siavava)
 *
 */

// imports
import $ from 'jquery';
import './style.scss';

const circle = document.getElementById('ring');
const clock = document.getElementById('main');
// const progressDot = document.getElementById('progress-dot');
function Counter() {
  this.count = 0;

  this.minutes = 0;
  this.seconds = 0;

  this.tick = () => {
    // this.count += 1;
    this.seconds += 1;
    if (this.seconds === 60) {
      this.minutes += 1;
      this.seconds = 0;
    }
    this.renderCount();
  };

  this.renderCount = () => {
    $('#minutes').html(this.minutes > 9 ? `${this.minutes}` : `0${this.minutes}`);
    $('#seconds').html(this.seconds > 9 ? `${this.seconds}` : `0${this.seconds}`);
    // move the progress along the circle
    // It should start at 0 when this.tick is 0 and end at 360 when this.tick is 60

    const progress = this.minutes * 360 + this.seconds * 6;
    circle.animate({
      transform: `rotate(${progress}deg)`,
    }, {
      duration: 1000,
      fill: 'forwards',
    }, 'ease-in-out');

    clock.animate({
      transform: `rotate(${-progress}deg)`,
    }, {
      duration: 1000,
      fill: 'forwards',
    }, 'ease-in-out');
  };

  this.start = () => {
    setInterval(this.tick, 1000);
  };
}

console.log('Starting up...');

new Counter().start();

const body = document.getElementById('body');

// follow mouse pointer with animation
body.onpointermove = (event) => {
  const blob = document.getElementById('tracker');
  const cursor = document.getElementById('cursor');
  const { pageX, pageY } = event;

  // set cursor to current position
  cursor.style.top = `${pageY}px`;
  cursor.style.left = `${pageX}px`;

  // cursor.animate({
  //   top: `${pageY}px`,
  //   left: `${pageX}px`,
  // }, {
  //   duration: 10,
  //   fill: 'forwards',
  // }, 'ease-in-out');

  const elemWidth = blob.offsetWidth;
  const elemHeight = blob.offsetHeight;
  const elemX = pageX - elemWidth / 2;
  const elemY = pageY - elemHeight / 2;

  blob.animate({
    top: `${elemY}px`,
    left: `${elemX}px`,
  }, {
    duration: 3000,
    fill: 'forwards',
  }, 'ease-in-out');
};

// load data/quotes.json
$.getJSON('data/quotes.json', (data) => {
  const quote = document.getElementById('quote');
  const author = document.getElementById('author');

  const cycle = () => {
    const currentIndex = Math.floor(Math.random() * data.length);
    const currentQuote = data[currentIndex];

    quote.classList.add('pre-animation');
    setTimeout(() => {
      quote.innerHTML = currentQuote.quote;
      author.innerHTML = currentQuote.person;
    }, 1000);

    setTimeout(() => {
      quote.classList.remove('pre-animation');
    }, 1000);
  };

  cycle();
  setInterval(cycle, 10000);
});
