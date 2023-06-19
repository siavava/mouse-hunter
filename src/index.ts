/**
 * @author Amittai (siavava)
 *
 */

// imports
import $ from 'jquery';
import './style.scss';
import './colors.scss';
import { shuffle } from './modules/utils';

class Counter {
  count: number = 0;

  minutes: number = 0;

  seconds: number = 0;

  circle: HTMLElement = document.getElementById('ring')!;

  clock: HTMLElement = document.getElementById('main')!;

  quote: HTMLElement = document.getElementById('quote')!;

  author: HTMLElement = document.getElementById('author')!;

  isTicking: boolean = true;

  data: any[] = [];

  currentIndex: number = 0;

  constructor() {
    // get the data
    $.getJSON('data/quotes.json', (data: any) => {
      this.data = shuffle(data);
      // start up!
      this.start();
    });
  }

  renderCount = () => {
    $('#minutes').html(this.minutes > 9 ? `${this.minutes}` : `0${this.minutes}`);
    $('#seconds').html(this.seconds > 9 ? `${this.seconds}` : `0${this.seconds}`);
    // move the progress along the circle
    // It should start at 0 when this.tick is 0 and end at 360 when this.tick is 60

    const progress = this.minutes * 360 + this.seconds * 6;
    this.circle.animate({
      transform: `rotate(${progress}deg)`,
    }, {
      duration: 1000,
      fill: 'forwards',
    });

    this.clock.animate({
      transform: `rotate(${-progress}deg)`,
    }, {
      duration: 1000,
      fill: 'forwards',
    });
  };

  cycle = () => {
    if (this.isTicking) {
      // const currentIndex = Math.floor(Math.random() * this.data.length);
      if (this.currentIndex === this.data.length - 1) {
        this.currentIndex = 0;
        shuffle(this.data);
      }
      const currentQuote = this.data[this.currentIndex];
      this.currentIndex += 1;
      this.quote.classList.add('pre-animation');
      setTimeout(() => {
        this.quote.innerHTML = currentQuote.quote;
        this.author.innerHTML = currentQuote.person;
        this.quote.classList.remove('pre-animation');
      }, 1000);
    }
  };

  tick = () => {
    if (this.isTicking) {
      this.seconds += 1;
      if (this.seconds === 60) {
        this.minutes += 1;
        this.seconds = 0;
      }
    }
    this.renderCount();
  };

  start = () => {
    setInterval(this.tick, 1000);
    this.cycle();
    setInterval(this.cycle, 10000);
  };

  toggle = () => {
    this.isTicking = !this.isTicking;

    if (!this.isTicking) {
      this.quote.innerHTML = 'Paused.';
      this.author.innerHTML = 'Click anywhere to resume...';
    } else {
      this.cycle();
    }
  };
}

const counter = new Counter();

const body = document.getElementById('body')!;
const blob = document.getElementById('tracker')!;

body.onclick = () => {
  counter.toggle();
};

// follow mouse pointer with animation
body.onpointermove = (event) => {
  const { pageX, pageY } = event;
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
  });
};
