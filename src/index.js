/**
 * @author Amittai (siavava)
 *
 */

// imports
import $ from 'jquery';
import './style.scss';

console.log('Starting up...');
$('#main').html('Here we go!');

let count = 0;
const renderCount = () => {
  $('#main').html(`You have been on this page for ${count} seconds.`);
};

const tick = () => {
  count += 1;
  renderCount();
};

setInterval(tick, 1000);

const body = $('#body');
// const tracker = $('#tracker');
const tracker = document.getElementById('tracker');

// follow mouse pointer with animation
body.on('pointermove', (event) => {
  const { pageX, pageY } = event;
  tracker.animate({
    top: `${pageY - 200}px`,
    left: `${pageX - 200}px`,
  }, {
    duration: 3000,
    fill: 'forwards',
  }, 'ease-in-out');
});
