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
