window.chartType = getCookie("chartType");
window.activeSymbol = $("#user_current_symbol").val();
window.activeType = $("#active_symbol_type").val();
window.chartInterval = $("#user_interval").val();
$(".interval-btn").text(window.chartInterval);

if (window.chartType == null) {
    document.cookie="chartType=candlestick";
    window.top.location = window.top.location;
}
if (window.activeSymbol == null) {
    document.cookie="activeSymbol=USDJPY";
    window.top.location = window.top.location;
}
if (window.activeType == null) {
    document.cookie="activeType=forex";
    window.top.location = window.top.location;
}
if (window.chartInterval == null) {
    document.cookie="chartInterval=5m";
    window.top.location = window.top.location;
}
addChartControl(window.activeSymbol);

function chnageAddTime(){
    if(window.chartInterval == '1m'){
        window.chartTimeToAdd = 60;
    }else if(window.chartInterval == '5m'){
        window.chartTimeToAdd = 300;
    }else if(window.chartInterval == '15m'){
        window.chartTimeToAdd = 900;
    }else if(window.chartInterval == '30m'){
        window.chartTimeToAdd = 1800;
    }else if(window.chartInterval == '1h'){
        window.chartTimeToAdd = 3600;
    }else{
        window.chartTimeToAdd = 0;
    }
}
chnageAddTime();

function changeAskBid(datapoint){
    ask_p = document.querySelector("#ask_"+datapoint.id);
    bid_p = document.querySelector("#bid_"+datapoint.id);

    ask_diff = parseFloat(datapoint.ask) - parseFloat(ask_p.innerHTML);
    bid_diff = parseFloat(datapoint.bid) - parseFloat(bid_p.innerHTML);

    if(bid_diff < 0){
        bid_p.classList.remove("ask-bid-white");
        bid_p.classList.remove("bid");
        bid_p.classList.add("bid-red");
    }else if(bid_diff > 0){
        bid_p.classList.remove("ask-bid-white");
        bid_p.classList.add("bid");
        bid_p.classList.remove("bid-red");
    }else{
        bid_p.classList.add("ask-bid-white");
        bid_p.classList.remove("bid");
        bid_p.classList.remove("bid-red");
    }
    
    if(ask_diff < 0){
        ask_p.classList.remove("ask-bid-white");
        ask_p.classList.add("ask");
        ask_p.classList.remove("ask-green");
    }else if(ask_diff > 0){
        ask_p.classList.remove("ask-bid-white");
        ask_p.classList.remove("ask");
        ask_p.classList.add("ask-green");
    }else{
        ask_p.classList.add("ask-bid-white");
        ask_p.classList.remove("ask");
        ask_p.classList.remove("ask-green");
    }

    ask_p.innerHTML = datapoint.ask;
    bid_p.innerHTML = datapoint.bid;

    if (window.activeSymbol === datapoint.symbol) {
        $("#quick-trding-sell-value").text(datapoint.ask);
        $("#quick-trding-buy-value").text(datapoint.bid);
    }
}

setInterval(() => {
    fetch(
        "/get/symbol-data"
    )
    .then(r => r.json())
    .then(r => {
        r['forex_data'].slice(0, 20).map(datapoint => changeAskBid(datapoint))
        r['crypto_data'].slice(0, 20).map(datapoint => changeAskBid(datapoint));
    });
}, 500);


// get cookie value 
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();

    return null;
}

function getHistoryData(force_new){
    
    const chartWrapperReference = document.getElementById("chart");

        fetch(
            "/get/history-data?"
        )
        .then(r => r.json())
        .then(chart_data => {
            line_data = chart_data.map(datapoint => ({
                time: datapoint.time,
                value: (datapoint.close + datapoint.open) / 2,
            }));

            if(window.chartType == 'candlestick'){
                window.chart_data = chart_data;
            }else{
                window.chart_data = line_data;
            }
            // console.log(window.chart_data);
            chartWrapperReference.changeData();

            chart_data_last = chart_data[chart_data.length - 1];
            window.chart_current_timestamp = chart_data_last.time;
            window.chart_next_timestamp = chart_data_last.time + window.chartTimeToAdd;
        });
}

setInterval(() => {
    getHistoryData(true);
}, 500);

function changeActiveSymbol(){
    symbol = $(this).attr("symbol");
    symbol_type = $(this).attr("type");

    document.cookie=`activeSymbol=${symbol}`;
    document.cookie=`activeType=${symbol_type}`;
    window.activeSymbol = symbol;
    window.activeType = symbol_type;

    document.getElementsByClassName('legend-symbol')[0].innerHTML = window.activeSymbol;

    fetch(
        "/set/user-symbol?symbol="+symbol+"symbol_type="+symbol_type
    )
    .then(r => {
        if (r.status == 200) {
            getHistoryData(true);
            addChartControl(window.activeSymbol, true);
        }
    });    
}

function changeChartInterval(){
    interval = $(this).attr("interval");

    document.cookie=`chartInterval=${interval}`;
    window.chartInterval = interval;
    $(".interval-btn").text(interval);

    fetch(
        "/set/user-interval?userinterval="+interval
    )
    .then(r => {
        if (r.status == 200) {
            getHistoryData(true);
            chnageAddTime();
        }
    });
}
// function chnageChartType(){
//     chartType = $(this).attr("val");

//     document.cookie="chartType="+chartType;
//     window.chartType = chartType;
// }
$(document).on("click", ".left-panel-table-row", changeActiveSymbol);
$(document).on("click", ".change-stats-button", changeChartInterval);
// $(document).on("click", ".change-chart-type-btn", chnageChartType);

$("#left-panel-search").keyup(function () {
    const tableSearch = document.getElementById('search_result_container');
    const tableForex = document.getElementById('forex');
    const tableCrypto = document.getElementById('crypto');
    search_key = $(this).val();

    if(search_key.length >= 3){
        fetch(
            "/get/currency-data?q="+search_key
        )
        .then(r => r.json())
        .then(r => {
            console.log(r);
            
            const tableDataSearch = r.slice().map(datapoint => {
                return (`
                    <div class="left-panel-table-row" symbol="${datapoint.symbol}" type="forex">
                        <div style="display:flex">
                            <span class="favourite"></span>
                            <span><img src='./static/images/flags/${datapoint.symbol}.png' onerror="this.onerror=null; this.src='./static/images/flags/default-1.png'" /></span>
                            <span>${datapoint.symbol}</span>
                        </div>
                        <span class="bid" id="bid_${datapoint.id}">${datapoint.bid}</span>
                        <span class="ask" id="ask_${datapoint.id}">${datapoint.ask}</span>
                        <span class="info"></span>
                    </div>
                `)
            }).join('');
            tableSearch.innerHTML = tableDataSearch;

            $(tableForex).hide();
            $(tableCrypto).hide();
            $(tableSearch).show();
        })
    }else{
        $(tableForex).show();
        $(tableCrypto).show();
        $(tableSearch).hide();
    }
});

$(".left-panel-dropdown-select").click(function () {
    select_type = $(this).attr("select_type");
    selected_type = $("#left-panel-dropdown-select-container");

    if(select_type == selected_type.attr("val")){
        console.log(select_type);
    }else{
        leftPanelTableData(select_type);
        selected_type.attr("val", select_type);
        selected_type.text(select_type);
    }
})

$(".quick-trade-now").click(function (){
    order_type = $(this).attr("type");
    open_price = $("#quick-trding-"+order_type+"-value").text();
    trade_amount = $("#quick-trading-value-input").val();

    fetch(
        `/save/new-order?symbol=${window.activeSymbol}&open_price=${open_price}&order_type=${order_type}&trade_amount=${trade_amount}`
    )
    .then(r => r.json())
    .then(r => {
        if(r['msg'] == "success"){
            console.log("new trade added");
        }
    })
})

console.log("hello")