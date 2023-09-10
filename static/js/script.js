window.addEventListener('DOMContentLoaded', (event) => {
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    const sidebarHide = document.body.querySelector('#sidebarHide');
    if (!document.body.classList.contains('sb-sidenav-toggled')) {
         document.documentElement.style.setProperty("--visibleBefore", "none");
         sidebarToggle.style.visibility="hidden"
     }
    // const chart = document.getElementById("chart").shadowRoot.children[1].children[0].children[0].shadowRoot.children[1].children[0];
    // const mobileChart = document.getElementById("mobile-chart").shadowRoot.children[1].children[0].children[0].shadowRoot.children[1].children[0];

    // Changes background color of time scale 
    // chart.children[0].children[1].style.background = "#59aae9";
    // chart.children[0].children[1].children[0].style.opacity = "80%";
    // chart.children[0].children[1].children[1].style.opacity = "80%";
    // chart.children[0].children[1].children[2].style.opacity = "80%";

    // Changes background color of mobile time scale 
    // mobileChart.children[0].children[1].style.background = "#59aae9";
    // mobileChart.children[0].children[1].children[0].style.opacity = "80%";
    // mobileChart.children[0].children[1].children[1].style.opacity = "80%";
    // mobileChart.children[0].children[1].children[2].style.opacity = "80%";

    if (sidebarToggle || sidebarHide) {
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.documentElement.style.setProperty("--visibleBefore", "none");
            sidebarToggle.style.visibility="hidden"
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
            document.body.classList.contains('sb-sidenav-toggled') ? sidebarHide.style.visibility="hidden" : sidebarHide.style.visibility="visible"
             chart.style.width = "100%";
             chart.children[0].style.width = "100%";
             chart.children[0].children[0].children[1].style.width = "100%";
             chart.children[0].children[0].children[1].children[0].children[0].style.width = "100%";
             chart.children[0].children[0].children[1].children[0].children[1].style.width = "100%";
             if(document.body.classList.value === "sb-sidenav-toggled"){
                 sidebarToggle.nextElementSibling.style.visibility="hidden"
                 sidebarToggle.parentElement.style.borderRight="1px solid #4c5f77"
             }
             else{
                 sidebarToggle.nextElementSibling.style.visibility="visible"
                 sidebarToggle.parentElement.style.borderRight="none"
             }
        });

        sidebarHide.addEventListener('click', event => {
         event.preventDefault();
         document.documentElement.style.setProperty("--visibleBefore", "");
         sidebarToggle.style.visibility="visible"
         document.body.classList.toggle('sb-sidenav-toggled');
         localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
         document.body.classList.contains('sb-sidenav-toggled') ? sidebarHide.style.visibility="hidden" : sidebarHide.style.visibility="visible"
          chart.style.width = "100%";
          chart.children[0].style.width = "100%";
          chart.children[0].children[0].children[1].style.width = "100%";
          chart.children[0].children[0].children[1].children[0].children[0].style.width = "100%";
          chart.children[0].children[0].children[1].children[0].children[1].style.width = "100%";
          chart.children[0].children[1].children[1].children[0].children[0].style.width = "100%";
          
          if(document.body.classList.value === "sb-sidenav-toggled"){
              sidebarToggle.nextElementSibling.style.visibility="hidden"
              sidebarToggle.parentElement.style.borderRight="1px solid #4c5f77"
          }
          else{
              sidebarToggle.nextElementSibling.style.visibility="visible"
              sidebarToggle.parentElement.style.borderRight="none"
          }
     });
    }
    // Toggle the bottom table
    const bottomHideTable = document.body.querySelector('#hide-table');
    const bottomShowTable = document.body.querySelector('#show-table');
    const bottomTable = document.querySelector(".chart-bottom-panel");
    const bottomTableButtons = document.querySelector('.chart-bottom-buttons-container');
    const bottomTableContent = document.querySelector('.tabs-tables-container');
    const chartWrapper= document.querySelector('.chart-elements-wrapper');
    const outerChart = chart.getRootNode().host;
    const container = document.getElementsByClassName("chart-container")[0];
    const dimensions = container.getBoundingClientRect();
    const chartZoomControl = document.querySelector(".chart-zoom-buttons-container");
 
    bottomTable.classList.contains('hide-table') ? bottomShowTable.style.display="block" : bottomShowTable.style.display="none";

 if (bottomHideTable || bottomShowTable) {
     bottomHideTable.addEventListener('click', event => {
         event.preventDefault();
         bottomTable.classList.toggle('hide-table');
         chartWrapper.classList.toggle('full-height');
         chart.classList.toggle('chart-full-height');
         localStorage.setItem('hide-table', bottomTable.classList.contains('hide-table'));
         bottomHideTable.style.display="none"
         bottomShowTable.style.display="block"
         if(bottomTable.classList.contains('hide-table')){
            //  outerChart.style.height = "calc(100% - 74px)";
            //  chart.style.height = "100%";
             bottomTableButtons.style.visibility = "hidden";
             bottomTableContent.style.visibility = "hidden";
             window.dispatchEvent(new Event('resize'));
            //  chartZoomControl.style.bottom = "20%";
         }else{
            //  outerChart.style.height = `${dimensions.height * 0.60}px`;
            //  chart.style.height = `${dimensions.height * 0.60}px`;
             bottomTableButtons.style.visibility = "visible";
             bottomTableContent.style.visibility = "visible";
             window.dispatchEvent(new Event('resize'));
            //  chartZoomControl.style.bottom = "10%";
         }   
     });
     bottomShowTable.addEventListener('click', event => {
         event.preventDefault();
         bottomTable.classList.toggle('hide-table');
         chartWrapper.classList.toggle('full-height');
         chart.classList.toggle('chart-full-height');
         localStorage.setItem('hide-table', bottomTable.classList.contains('hide-table'));
         bottomShowTable.style.display="none"
         bottomHideTable.style.display="block";
         if(bottomTable.classList.contains('hide-table')){
            //  outerChart.style.height = "calc(100% - 74px)";
            //  chart.style.height = "100%";
             bottomTableButtons.style.visibility = "hidden";
             bottomTableContent.style.visibility = "hidden";
             window.dispatchEvent(new Event('resize'));
            //  chartZoomControl.style.bottom = "20%";
         }else{
            //  outerChart.style.height = `${dimensions.height * 0.60}px`;
            //  chart.style.height = `${dimensions.height * 0.60}px`;
             bottomTableButtons.style.visibility = "visible";
             bottomTableContent.style.visibility = "visible";
             window.dispatchEvent(new Event('resize'));
            //  chartZoomControl.style.bottom = "10%"
         }   
     });
 }


 // Toggle the chart stats dropdown
 const chartButtonsDropdown = document.querySelectorAll('.change-stats-button')
 chartButtonsDropdown.forEach((button, index) => {
     button.addEventListener('mouseover', ()=>{
         const chartStatsDropdownContainer = document.getElementById('change-stats-dropdown-container')
         const statsDropdownSize = chartStatsDropdownContainer.getBoundingClientRect();
         button.nextElementSibling.classList.add('show')
         button.nextElementSibling.style.left = `${statsDropdownSize.width}px`
         chartButtonsDropdown.forEach(btn => {
             if(btn !== button){
                 btn.nextElementSibling.classList.remove('show')
             }
         })
     })
 })



 // Initilialize data, these are the functions that you'll want to call when you want to update the data
 setInterval(() => {
    fillActiveTable();
 }, 1000);
 fillPendingTable();
 fillHistoryTable();
 leftPanelTableData();
 fillChartControlForex();
 leftPanelMobileTableData();
 fillMobileChartControl();
 ordersActiveMobileTableData();
 ordersPendingMobileTableData();
 ordersHistoryMobileTableData();

 // Enable popovers
 const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
 const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

 // Popover options
 var options = {
     html: true,
     content: document.getElementById('popover-content'),
     trigger: "focus",

 }

 var triggerElement = document.querySelectorAll('#table-popover')
 // Creates a custom wrapper for the all popovers
 triggerElement.forEach(element => new bootstrap.Popover(element, options))

 // Closes the popover when clicked outside of it
 $('body').on('click', function (e) {
     $('[data-bs-toggle=popover]').each(function () {
         // hide any open popovers when the anywhere else in the body is clicked
         if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
            //  bootstrap.Popover.getInstance($(this)).hide();
         }
         if($(this).has(e.target) && $(e.target).hasClass('popover-close')){
             bootstrap.Popover.getInstance($(this)).hide();
         }
     });
 });
});

// Fills the data for the active table
function fillActiveTable(){
 const table = document.getElementById('bottom-active-panel-table');
 const tableHead = document.getElementById('bottom-active-panel-table-head');
 const activeButton = document.getElementById('pills-active-tab');

 fetch(
    "/get/order-data?order_type=active"
 )
 .then(r => r.json())
 .then(r => {
    const ActiveTableData = r;
    const emptyTable = `<div class="empty-table-container">
    <div class="empty-table"></div>
    <span>There are no active orders yet</span>
    </div>`;
    const tableData = ActiveTableData?.reverse()?.map(datapoint => {
        const date = new Date(datapoint.time * 1000).toISOString()
        const time = date.split("T")[1].split(".")[0];
        if(datapoint.profitLoses < 0){
            var profit = '<td style="color: #dc3545 !important;">€ '+datapoint.profitLoses+'</td>';
        }else if(datapoint.profitLoses > 0){
            var profit = '<td style="color: #198754 !important;">€ '+datapoint.profitLoses+'</td>';
        }else{
            var profit = '<td style="color: #6c757d !important;">€ '+datapoint.profitLoses+'</td>';
        }
        return (`
        <tr class="bottom-table-row">
            <td><img src='./static/images/flags/${datapoint.symbol}.png' /></td>
            <td>${datapoint.id}</td>
            <td>${datapoint.symbol}</td>
            <td>${datapoint.type}</td>
            <td>${datapoint.amount}</td>
            <td>${datapoint.openRate}</td>
            <td>${date.split("T")[0].split("-").join("/")} | ${time}</td>
            <td>${datapoint.SL}</td>
            <td>${datapoint.TP}</td>
            <td>€ ${datapoint.swap}</td>
            <td>€ ${datapoint.commission}</td>
            ${profit}
            <td>
                <button id="table-popover" class="table-options-btn" role="button" data-bs-toggle="popover" data-bs-placement="top">
                </button>
            </td>
            <td>
                <div class="table-close-btn">
                    <span>${datapoint.close}</span>
                </div>
            </td>
        </tr>
        `)}).join('');
        activeButton.innerHTML =  `ACTIVE (${ActiveTableData.length})`
        tableHead.innerHTML = ActiveTableData.length === 0 ? "" : tableHead.innerHTML;
        table.innerHTML = ActiveTableData.length === 0 ? emptyTable : tableData;
 })    
 }

// Fills the data for the pending table
function fillPendingTable(){
 const table = document.getElementById('bottom-pending-panel-table');
 const tableHead = document.getElementById('bottom-pending-panel-table-head');
 const activeButton = document.getElementById('pills-pending-tab');
 const emptyTable = `<div class="empty-table-container">
                         <div class="empty-table"></div>
                         <span>There are no pending orders yet</span>
                     </div>`;
 const tableData = PendingTableData?.reverse()?.map(datapoint => {
     const date = new Date(datapoint.time * 1000).toISOString()
     const time = date.split("T")[1].split(".")[0];
     return (`
     <tr class="bottom-table-row">
         <td><img src='./images/flags/${datapoint.symbol}.png' /></td>
         <td>${datapoint.id}</td>
         <td>${datapoint.symbol}</td>
         <td>${datapoint.type}</td>
         <td>${datapoint.amount}</td>
         <td>${datapoint.tradeVolume}</td>
         <td>${datapoint.openRate}</td>
         <td>${date.split("T")[0].split("-").join("/")} | ${time}</td>
         <td>${datapoint.SL}</td>
         <td>${datapoint.TP}</td>
         <td>€ ${datapoint.swap}</td>
         <td>€ ${datapoint.commission}</td>
         <td>€ ${datapoint.profitLoses}</td>
         <td>
             <button class="table-options-btn" role="button" data-html="true" data-placement="top"
                 data-toggle="popover" data-trigger="focus" title="Popover title" 
                 data-popover-content="#a1">
             </button>
             <div class="hidden" id="a1">
                 <div class="popover-body">
                     <form role="form">
                         <div>asdasd</div>
                         <div></div>
                         <div></div>
                         <div></div>
                         <a>MODIFY ORDER</a>
                     </form>
                 </div>
             </div>
         </td>
         <td>
             <div class="table-close-btn">
                 <span>${datapoint.close}</span>
             </div>
          </td>
     </tr>
 `)}).join('');
 activeButton.innerHTML =  `PENDING (${PendingTableData.length})`
 table.innerHTML = PendingTableData.length === 0 ? emptyTable : tableData;
 tableHead.innerHTML = PendingTableData.length === 0 ? "" : tableHead.innerHTML;
}

// Fills the data for the history table
function fillHistoryTable(){
 const table = document.getElementById('bottom-history-panel-table');
 const tableHead = document.getElementById('bottom-history-panel-table-head');
 const activeButton = document.getElementById('pills-history-tab');
 const emptyTable = `<div class="empty-table-container">
                         <div class="empty-table"></div>
                         <span>There are no orders yet</span>
                     </div>`;
 const tableData = HistoryTableData?.reverse()?.map(datapoint => {
     const date = new Date(datapoint.time * 1000).toISOString()
     const time = date.split("T")[1].split(".")[0];
     return (`
     <tr class="bottom-table-row">
         <td><img src='./images/flags/${datapoint.symbol}.png' /></td>
         <td>${datapoint.id}</td>
         <td>${datapoint.symbol}</td>
         <td>${datapoint.type}</td>
         <td>${datapoint.amount}</td>
         <td>${datapoint.tradeVolume}</td>
         <td>${datapoint.openRate}</td>
         <td>${date.split("T")[0].split("-").join("/")} | ${time}</td>
         <td>${datapoint.SL}</td>
         <td>${datapoint.TP}</td>
         <td>€ ${datapoint.swap}</td>
         <td>€ ${datapoint.commission}</td>
         <td>€ ${datapoint.profitLoses}</td>
         <td>
             <button class="table-options-btn" role="button" data-html="true" data-placement="top"
                 data-toggle="popover" data-trigger="focus" title="Popover title" 
                 data-popover-content="#a1">
             </button>
             <div class="hidden" id="a1">
                 <div class="popover-body">
                     <form role="form">
                         <div>asdasd</div>
                         <div></div>
                         <div></div>
                         <div></div>
                         <a>MODIFY ORDER</a>
                     </form>
                 </div>
             </div>
         </td>
         <td>
             <div class="table-close-btn">
                 <span>${datapoint.close}</span>
             </div>
         </td>
     </tr>
 `)}).join('');
 activeButton.innerHTML =  `HISTORY`
 table.innerHTML = HistoryTableData.length === 0 ? emptyTable : tableData;
 tableHead.innerHTML = HistoryTableData.length === 0 ? "" : tableHead.innerHTML;
}

// Fills the data on the left panel
function leftPanelTableData(filter_type="all"){
    const tableForex = document.getElementById('forex');
    const tableCrypto = document.getElementById('crypto');

    if(filter_type === "forex"){
        $(tableForex).show();
        $(tableCrypto).hide();
        limit = 100;
    }else if(filter_type === "crypto"){
        $(tableForex).hide();
        $(tableCrypto).show();
        limit = 100;
    }else{
        $(tableForex).show();
        $(tableCrypto).show();
        limit = 20;
    }

    fetch(
        "/get/symbol-data"
    )
    .then(r => r.json())
    .then(r => {
        const tableDataFx = r['forex_data'].slice(0, limit).map(datapoint => {
            const date = new Date(datapoint.time * 1000).toISOString();
            const time = date.split("T")[1].split(".")[0];
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
        tableForex.innerHTML = tableDataFx;

        const tableDataCrypto = r['crypto_data'].slice(0, 20).map(datapoint => {
            const date = new Date(datapoint.time * 1000).toISOString();
            const time = date.split("T")[1].split(".")[0];
            return (`
                <div class="left-panel-table-row" symbol="${datapoint.symbol}" type="crypto">
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
        tableCrypto.innerHTML = tableDataCrypto;
    });
}

function leftPanelMobileTableData(){
 const table = document.getElementById('mobile-quotes-table');
 const tableData = MockedData.reverse().map((datapoint, index) => {
     const date = new Date(datapoint.time * 1000).toISOString()
     const time = date.split("T")[1].split(".")[0];
     return (`
     <div class="mobile-table-row-toggle">
         <div class="left-panel-table-row dropdown-toggle table-row-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}" aria-expanded="false" aria-controls="collapse-${index}">
             <div class="leftpanel-table-symbol-container">
                 <span class="favourite"></span>
                 <span><img src='./images/flags/${datapoint.symbol}.png' /></span>
                 <span>${datapoint.symbol}</span>
             </div>
             <span class="bid">${datapoint.open}</span>
             <span class="ask">${datapoint.close}</span>
         </div>
         <div class="collapse" id="collapse-${index}">
             <div class="card card-body mobile-table-collapse">
                 <div class="mobile-table-collapse-content">
                     <div class="mobile-table-collapse-data-container">
                         <span class="mobile-table-collapse-data-title">Symbol</span>
                         <span class="mobile-table-collapse-data-text">${datapoint.symbol}</span>
                     </div>
                     <div class="mobile-table-collapse-data-container">
                         <span class="mobile-table-collapse-data-title">Swap long</span>
                         <span class="mobile-table-collapse-data-text">${datapoint.open}</span>
                     </div>
                     <div class="mobile-table-collapse-data-container">
                         <span class="mobile-table-collapse-data-title">Swap short</span>
                         <span class="mobile-table-collapse-data-text">${datapoint.close}</span>
                     </div>
                     <div class="mobile-table-collapse-data-container">
                         <span class="mobile-table-collapse-data-title">Type</span>
                         <span class="mobile-table-collapse-data-text">FOREX</span>
                     </div>
                     <div class="mobile-table-collapse-data-container">
                         <span class="mobile-table-collapse-data-title">Spread</span>
                         <span class="mobile-table-collapse-data-text">0</span>
                     </div>
                     <div class="mobile-table-collapse-data-container">
                         <span class="mobile-table-collapse-data-title">Gap Level</span>
                         <span class="mobile-table-collapse-data-text">0</span>
                     </div>
                     <div class="mobile-table-collapse-data-container">
                         <span class="mobile-table-collapse-data-title">Digits</span>
                         <span class="mobile-table-collapse-data-text">5</span>
                     </div>
                     <div class="mobile-table-collapse-data-container">
                         <span class="mobile-table-collapse-data-title">Stop Level</span>
                         <span class="mobile-table-collapse-data-text">0</span>
                     </div>
                     <div class="mobile-table-collapse-data-container">
                         <span class="mobile-table-collapse-data-title">Commision</span>
                         <span class="mobile-table-collapse-data-text">${datapoint.commission}</span>
                     </div>
                     <div class="mobile-table-collapse-data-container">
                         <span class="mobile-table-collapse-data-title">Contract size:</span>
                         <span class="mobile-table-collapse-data-text">100000</span>
                     </div>
                     <div class="mobile-table-collapse-data-container">
                         <span class="mobile-table-collapse-data-title">Leverage:</span>
                         <span class="mobile-table-collapse-data-text">1 : 200</span>
                     </div>
                 </div>
                 <div class="mobile-table-collapse-button-container">
                     <button class="btn btn-sm btn-outline-secondary mobile-table-collapse-btn new-order" type="button" data-bs-toggle="modal" data-bs-target="#newOrderModal" onclick="document.getElementById('pills-new-market-tab').click()">New order</button>
                     <button class="btn btn-sm btn-outline-secondary mobile-table-collapse-btn new-pending" type="button" data-bs-toggle="modal" data-bs-target="#newOrderModal" onclick="document.getElementById('pills-new-pending-tab').click()">New pending order</button>
                     <button class="btn btn-sm btn-outline-secondary mobile-table-collapse-btn new-chart" onclick="document.getElementById('pills-charts-tab').click()">New chart</button>
                     <button class="btn btn-sm btn-outline-secondary mobile-table-collapse-btn trade-hours">Trade Hours</button>
                 </div>
             </div>
         </div>
     </div>
 `)}).join('');
 table.innerHTML = tableData;
}

function ordersActiveMobileTableData(){
    const button = document.getElementById('mobile-active-tab');
    const table = document.getElementById('mobile-active-orders-table');
    const tableHead = document.getElementById('mobile-active-orders-table-head');
    const emptyTable = `<div class="empty-table-container mobile">
                         <div class="empty-table"></div>
                         <span>There are no active orders yet</span>
                         <button class="btn btn-sm btn-outline-secondary mobile-table-collapse-btn new-chart">Open a new Order</button>
                     </div>`;
    const tableData = MockedData?.reverse()?.map((datapoint, index) => {
        const date = new Date(datapoint.time * 1000)
        const fromattedDate = `${date.toLocaleString()} | ${date.toLocaleTimeString()}`;
        return (`
        <div class="mobile-table-row-toggle">
            <div class="left-panel-table-row dropdown-toggle table-row-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}" aria-expanded="false" aria-controls="collapse-${index}">
                <div class="leftpanel-table-symbol-container">
                    <span><img src='./images/flags/${datapoint.symbol}.png' /></span>
                    <span>${datapoint.symbol}</span>
                </div>
                <span class="mobile-orders-type">${datapoint.type}</span>
                <span class="bid">${datapoint.open}</span>
                <span class="ask">${datapoint.close}</span>
            </div>
            <div class="collapse" id="collapse-${index}">
                <div class="card card-body mobile-table-collapse">
                    <div class="mobile-orders-table-collapse-content">
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">ID</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.symbol}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">Open Time</span>
                            <span class="mobile-table-collapse-data-text">${fromattedDate}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">Open Rate</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.close}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">Commission</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.commission}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">T/P</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.TP}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">S/L</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.SL}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">Swap</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.swap}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">Trade volume</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.tradeVolume}</span>
                        </div>
                    </div>
                    <div class="mobile-table-collapse-button-container">
                        <button class="btn btn-sm btn-outline-secondary mobile-table-collapse-btn new-pending">Close 1.07716</button>
                        <button class="btn btn-sm btn-outline-secondary mobile-table-collapse-btn new-chart">Modify Order</button>
                    </div>
                </div>
            </div>
        </div>
    `)}).join('');
    table.innerHTML = MockedData.length === 0 ? emptyTable : tableData;
    tableHead.style.display = MockedData.length === 0 ? 'none' : 'table';
    button.innerHTML = `ACTIVE (${MockedData.length})`;
}

function ordersPendingMobileTableData(){
    const button = document.getElementById('mobile-pending-tab');
    const table = document.getElementById('mobile-pending-orders-table');
    const tableHead = document.getElementById('mobile-pending-orders-table-head');
    const emptyTable = `<div class="empty-table-container mobile">
                         <div class="empty-table"></div>
                         <span>There are no pending orders yet</span>
                         <button class="btn btn-sm btn-outline-secondary mobile-table-collapse-btn new-chart">Open a new Order</button>
                     </div>`;
    const tableData = PendingTableData?.reverse()?.map((datapoint, index) => {
        const date = new Date(datapoint.time * 1000)
        const fromattedDate = `${date.toLocaleString()} | ${date.toLocaleTimeString()}`;
        return (`
        <div class="mobile-table-row-toggle">
            <div class="left-panel-table-row dropdown-toggle table-row-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}" aria-expanded="false" aria-controls="collapse-${index}">
                <div class="leftpanel-table-symbol-container">
                    <span><img src='./images/flags/${datapoint.symbol}.png' /></span>
                    <span>${datapoint.symbol}</span>
                </div>
                <span class="mobile-orders-type">${datapoint.type}</span>
                <span class="bid">${datapoint.open}</span>
                <span class="ask">${datapoint.close}</span>
            </div>
            <div class="collapse" id="collapse-${index}">
                <div class="card card-body mobile-table-collapse">
                    <div class="mobile-orders-table-collapse-content">
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">ID</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.symbol}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">Open Time</span>
                            <span class="mobile-table-collapse-data-text">${fromattedDate}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">Open Rate</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.close}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">Commission</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.commission}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">T/P</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.TP}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">S/L</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.SL}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">Swap</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.swap}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">Trade volume</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.tradeVolume}</span>
                        </div>
                    </div>
                    <div class="mobile-table-collapse-button-container">
                        <button class="btn btn-sm btn-outline-secondary mobile-table-collapse-btn new-pending">Close 1.07716</button>
                        <button class="btn btn-sm btn-outline-secondary mobile-table-collapse-btn new-chart">Modify Order</button>
                    </div>
                </div>
            </div>
        </div>
    `)}).join('');
    table.innerHTML = PendingTableData.length === 0 ? emptyTable : tableData;
    tableHead.style.display = PendingTableData.length === 0 ? 'none' : 'table';
    button.innerHTML = `PENDING (${MockedData.length})`;
}


function ordersHistoryMobileTableData(){
    const table = document.getElementById('mobile-history-orders-table');
    const tableHead = document.getElementById('mobile-history-orders-table-head');
    const emptyTable = `<div class="empty-table-container">
                         <div class="empty-history-table-filter">
                            <div class="dropdown drop-start">
                                <button class="btn btn-sm btn-outline-secondary history-dropdown dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-offset="0,15">
                                    General Report
                                </button>
                                <div class="dropdown-menu mobile-chart-control-dropdown-container">
                                    <ul id="mobile-chart-control-dropdown">
                                        <li role="dropdown-item">
                                            <a class="dropdown-item active" href="#">General report</a>
                                        </li>
                                        <li role="dropdown-item">
                                            <a class="dropdown-item" href="#">Trade Operations</a>
                                        </li>
                                        <li role="dropdown-item">
                                            <a class="dropdown-item" href="#">Monetary transactions</a>
                                        </li>
                                        <li role="dropdown-item">
                                            <a class="dropdown-item" href="#">Executed Orders</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="dropdown drop-start">
                                <button class="btn btn-sm btn-outline-secondary history-dropdown dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-bs-offset="0,15">
                                    Last Week
                                </button>
                                <div class="dropdown-menu mobile-chart-control-dropdown-container">
                                    <ul id="mobile-chart-control-dropdown">
                                        <li role="dropdown-item">
                                            <a class="dropdown-item" href="#">All Operations</a>
                                        </li>
                                        <li role="dropdown-item">
                                            <a class="dropdown-item" href="#">Today</a>
                                        </li>
                                        <li role="dropdown-item">
                                            <a class="dropdown-item active" href="#">Last Week</a>
                                        </li>
                                        <li role="dropdown-item">
                                            <a class="dropdown-item" href="#">Last Month</a>
                                        </li>
                                        <li role="dropdown-item">
                                            <a class="dropdown-item" href="#">Last 3 Month</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                         </div>
                         <div class="empty-table"></div>
                         <span>There are no history for this period yet</span>
                         <div class="empty-history-bottom-data">
                            <span>Deposit : €0.00</span>
                            <span>Bonus In : €0.00</span>
                            <span>Withdrawal : €0.00</span>
                            <span>Bonus Out : €0.00</span>
                            <span>Profit/Losses : <span class="bid">€0.00</span></span>
                         </div>
                     </div>`;
    const tableData = PendingTableData?.reverse()?.map((datapoint, index) => {
        const date = new Date(datapoint.time * 1000)
        const fromattedDate = `${date.toLocaleString()} | ${date.toLocaleTimeString()}`;
        return (`
        <div class="mobile-table-row-toggle">
            <div class="left-panel-table-row dropdown-toggle table-row-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index}" aria-expanded="false" aria-controls="collapse-${index}">
                <div class="leftpanel-table-symbol-container">
                    <span><img src='./images/flags/${datapoint.symbol}.png' /></span>
                    <span>${datapoint.symbol}</span>
                </div>
                <span class="mobile-orders-type">${datapoint.type}</span>
                <span class="bid">${datapoint.open}</span>
                <span class="ask">${datapoint.close}</span>
            </div>
            <div class="collapse" id="collapse-${index}">
                <div class="card card-body mobile-table-collapse">
                    <div class="mobile-orders-table-collapse-content">
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">ID</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.symbol}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">Open Time</span>
                            <span class="mobile-table-collapse-data-text">${fromattedDate}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">Open Rate</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.close}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">Commission</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.commission}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">T/P</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.TP}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">S/L</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.SL}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">Swap</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.swap}</span>
                        </div>
                        <div class="mobile-table-collapse-data-container">
                            <span class="mobile-table-collapse-data-title">Trade volume</span>
                            <span class="mobile-table-collapse-data-text">${datapoint.tradeVolume}</span>
                        </div>
                    </div>
                    <div class="mobile-table-collapse-button-container">
                        <button class="btn btn-sm btn-outline-secondary mobile-table-collapse-btn new-pending">Close 1.07716</button>
                        <button class="btn btn-sm btn-outline-secondary mobile-table-collapse-btn new-chart">Modify Order</button>
                    </div>
                </div>
            </div>
        </div>
    `)}).join('');
    table.innerHTML = PendingTableData.length === 0 ? emptyTable : tableData;
    tableHead.style.display = PendingTableData.length === 0 ? 'none' : 'table';
}

function fillMobileChartControl(){
    const options = ["ACB", "ACKERMANS", "ADABTC", "ADAEUR", "ADAUSD", "ADIDAS", "AEX", "AGEAS" , "AGRIC", "ALCOA", "ALIBABA", "ALLI", "ALUMINUIM",
    "AMAZON", "AMC", "AMEX", "APPLE", "ATOMUSD", "ATVI", "AUDCAD", "AUDCHF", "AUDJPY", "AUDNZD", "AUDUSD", "AUSTRALIAN200", "AVAXUSD", "AXA", "BAIDU",
    "BAYER", "BBRY", "BBVA", "BCHETH", "BCHEUR", "BCHUSD", "BELGACOM", "BERKB", "BMW", "BNBUSD", "BNPEU", "BOA", "BOEING", "BRENT", "BSANMD"
]

    const mobileChartControl = document.getElementById('mobile-chart-control-dropdown');
    const mobileChartControlData = options.map((option) => 
    `<li role="dropdown-item">
        <a class="dropdown-item" href="#">${option}</a>
    </li>`).join('');
    mobileChartControl.innerHTML = mobileChartControlData;
}

// Adds a new chart control button to the chart control bar
function addChartControl(Symbol, change=false){
 const normalizedSymbol = Symbol.toUpperCase();
 const chartControl = document.getElementById('chart-control-button-wrapper');

 if(change === true){
    document.getElementsByClassName('chart-control-btn')[0].getElementsByTagName("span")[0].innerHTML = normalizedSymbol;
 }else{
    const controlButton = document.createElement('button');
    controlButton.classList.add('btn', "btn-sm", "btn-outline-secondary", "chart-control-btn");
    controlButton.children.length === 1 ?
    controlButton.innerHTML = `
                                <img src="./images/flags/${normalizedSymbol}.png" /> 
                                <span>${normalizedSymbol}</span>` 
                                :
    controlButton.innerHTML = `
    <a class="deleteChartControl" onClick="removeChartControl(event)">X</a> 
    <span>${normalizedSymbol}</span>` 
    // chartControl.appendChild(controlButton);
 }
}

// Deletes the element that is clicked on the chart control
function removeChartControl(event){
 event.target.parentElement.remove()
}

function quickTradeChangeValue(value){
 const input = document.getElementById("quick-trading-value-input");
 input.value = value;
}
// Adds .01 from the quick-trading input 
function quickTradeAddValue(){    
 const input = $(event.target.parentElement.parentElement).find("input")[0];
 const value = parseFloat(input.value);
 const normalizedValue = value * 100 + 0.01 * 100;
 input.value = normalizedValue / 100
}

// Subtracts .01 from the quick-trading input 
function quickTradeSubtractValue(){
 const input = $(event.target.parentElement.parentElement).find("input")[0];
 const value = parseFloat(input.value);
 const normalizedValue = value * 100 - 0.01 * 100;
 if((normalizedValue / 100).toPrecision(1) < 0.01) return;

 input.value = normalizedValue / 100;
}

// Fills data for the dropdown menu on the chart control
function fillChartControlForex(){
 const chartControl = document.getElementById('new-chart-control-content-forex');
 const tableData = MockedData.reverse().map(datapoint => {
     return(
         `<div class="new-chart-control-row" type="button" onclick="addChartControl('${datapoint.symbol}')">
             <img src='./images/flags/${datapoint.symbol}.png' />
             <span>${datapoint.symbol}</span>
             <span class="new-chart-control-row-text"><span>B:</span>${datapoint.open}</span>
             <span class="new-chart-control-row-text"><span>A:</span>${datapoint.close}</span>
             <span class="favourite"></span>
         </div>`
     )
 })
//  chartControl.innerHTML = tableData.join('');
}

// Array of data used by the active table

// Array of data used by the pending table
const PendingTableData = Array(0).fill(0).map((_, i) => ({
 symbol: 'EURUSD',
 id: i,
 type: "Sell",
 amount: 0.01,
 tradeVolume: Math.floor(Math.random() * 100), 
 openRate: Math.floor(Math.random() * 10),
 SL: 0.0000,
 TP: 0.0000,
 swap: 0.0000,
 commission: 0.0000,
 profitLoses: 0.0000,
 time: Math.floor(Date.now() / 1000) - (86400 * i),
 open: Math.floor(Math.random() * 100),
 high: Math.floor(Math.random() * 100),
 low: Math.floor(Math.random() * 100),
 close: Math.floor(Math.random() * 100),
}))

// Array of data used by the history table
const HistoryTableData = Array(5).fill(0).map((_, i) => ({
 symbol: 'EURUSD',
 id: i,
 type: "Sell",
 amount: 0.01,
 tradeVolume: Math.floor(Math.random() * 100), 
 openRate: Math.floor(Math.random() * 10),
 SL: 0.0000,
 TP: 0.0000,
 swap: 0.0000,
 commission: 0.0000,
 profitLoses: 0.0000,
 time: Math.floor(Date.now() / 1000) - (86400 * i),
 open: Math.floor(Math.random() * 100),
 high: Math.floor(Math.random() * 100),
 low: Math.floor(Math.random() * 100),
 close: Math.floor(Math.random() * 100),
}))

// Array of data used by the chart
const MockedData = Array(15).fill(0).map((_, i) => ({
 symbol: 'EURUSD',
 id: i,
 type: "Sell",
 amount: 0.01,
 tradeVolume: Math.floor(Math.random() * 100), 
 openRate: Math.floor(Math.random() * 10),
 SL: 0.0000,
 TP: 0.0000,
 swap: 0.0000,
 commission: 0.0000,
 profitLoses: 0.0000,
 time: Math.floor(Date.now() / 1000) - (86400 * i),
 open: Math.floor(Math.random() * 100),
 high: Math.floor(Math.random() * 100),
 low: Math.floor(Math.random() * 100),
 close: Math.floor(Math.random() * 100),
}))

// Function to toggle the fullscreen
function toggleFullScreen() {
 if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
  (!document.mozFullScreen && !document.webkitIsFullScreen)) {
   if (document.documentElement.requestFullScreen) {  
     document.documentElement.requestFullScreen();  
   } else if (document.documentElement.mozRequestFullScreen) {  
     document.documentElement.mozRequestFullScreen();  
   } else if (document.documentElement.webkitRequestFullScreen) {  
     document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
   }  
 } else {  
   if (document.cancelFullScreen) {  
     document.cancelFullScreen();  
   } else if (document.mozCancelFullScreen) {  
     document.mozCancelFullScreen();  
   } else if (document.webkitCancelFullScreen) {  
     document.webkitCancelFullScreen();  
   }  
 }  
}