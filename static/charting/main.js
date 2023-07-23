// Datafeed implementation that you will add later
import Datafeed from './datafeed.js';

window.tvWidget = new TradingView.widget({
    symbol: 'Bitfinex:BTC/USD',            // Default symbol pair
    interval: '1D',                        // Default interval
    fullscreen: true,                      // Displays the chart in the fullscreen mode
    container: 'tv_chart_container',       // Reference to an attribute of a DOM element
    datafeed: Datafeed,
    library_path: '../static/charting_library/',
    theme: 'dark',
    custom_css_url: '/static/charting_library/themed.css',
    fullscreen: false,
    width: 1200,
});
