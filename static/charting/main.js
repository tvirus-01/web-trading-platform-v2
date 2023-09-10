// Datafeed implementation that you will add later
import Datafeed from './datafeed.js';

let per = 0.8;
if (window.innerWidth >= 2000){
    per = 0.82;
}else if (window.innerWidth < 1200){
    per = 0.75;
}else if (window.innerWidth < 1600){
    per = 0.78;
}

const chart_width = window.innerWidth * per;
const chart_height = window.innerHeight * 0.65;
// console.log(window.innerWidth, chart_width, window.innerHeight);

window.tvWidget = new TradingView.widget({
    symbol: 'EURUSD',            // Default symbol pair
    interval: '1D',                        // Default interval
    fullscreen: true,                      // Displays the chart in the fullscreen mode
    container: 'tv_chart_container',       // Reference to an attribute of a DOM element
    datafeed: Datafeed,
    library_path: '../static/charting_library/',
    theme: 'dark',
    custom_css_url: '/static/charting_library/themed.css',
    fullscreen: false,
    width: chart_width,
    height: chart_height,
});

$(".hide-table").click(function(){
    console.log("click");
})