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