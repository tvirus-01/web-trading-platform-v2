
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


(function() {
	const container = document.getElementsByClassName("chart-container")[0];
	const dimensions = container.getBoundingClientRect();
	const template = document.createElement('template');
	template.innerHTML = `
    <style>
    :host {
        display: block;
    }
    :host[hidden] {
        display: none;
    }
    #example {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
    }
    #chart {
        flex-grow: 1;
    }
    #buttons {
        flex-direction: row;
    }
    button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.5em 1em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: var(--hero-button-background-color-active, #e9e9e9);
        color: var(--hero-button-text-color, #e9e9e9);
        cursor: pointer;
        transition: border-color 0.25s;
        margin-left: 0.5em;
      }
      button:hover {
        border-color: #3179F5;
        background-color: var(--hero-button-background-color-hover);
        color: var(--hero-button-text-color-hover-active);
      }
      button:focus,
      button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
      }

	  #example-container {
		position:relative;
		height:100%;
	  }
        
      #chart {
        height: ${dimensions.height * 0.60}px;
      }


	</style>
	<div id="example">
		<div id="example-container">
			<lightweight-chart id="chart"
				autosize
				type="candlestick"
			></lightweight-chart>
		</div>
	</div>
  `;
  
	function generateSampleData(ohlc) {
		//Generates candle data
		const candleData = Array(100).fill(0).map((_, i) => ({
			time: Math.floor(Date.now() / 1000) - (86400 * i),
			open: Math.floor(Math.random() * 100),
			high: Math.floor(Math.random() * 100),
			low: Math.floor(Math.random() * 100),
			close: Math.floor(Math.random() * 100),
		}))

		//Transforms candle data to line data
		const lineData = candleData.map(datapoint => ({
			time: datapoint.time,
			value: (datapoint.close + datapoint.open) / 2,
		}));
		//if the chart type is candle or bar returns passes the candle data to the chart
		//otherwise passes the lineData
		const res = ohlc ? candleData : lineData;
		return res.reverse();
	}

	class LightweightChartExampleWC extends HTMLElement {
		constructor() {
			super();
			this.chartElement = undefined;
		}

		connectedCallback() {
			this.attachShadow({ mode: 'open' });
			this.shadowRoot.appendChild(template.content.cloneNode(true));

			this.chartElement = this.shadowRoot.querySelector('#chart');
			this._changeData();

			this.addButtonClickHandlers();
			this.chartElement.chart.timeScale().fitContent();
			this.chartElement.chart.timeScale().applyOptions({
				timeVisible: true,
				secondsVisible: true,
				barSpacing: 10,
				tickMarkType: 4,
				tickMarkFormatter: (time, tickMarkType, locale) => {
					const date = new Date(time * 1000)
					const formattedDate = `${date.getDay()} ${monthNames[date.getMonth()]}/${date.getFullYear()}`;
					return String(formattedDate);
				},
			})
            this.chartElement.seriesOptions = {
				priceFormat: {
					minMove: 0.00001,
					precision: 5,
				},
                wickUpColor: 'rgb(42,165,63)',
                upColor: 'rgb(42,165,63)',
                wickDownColor: 'rgb(218,72,48)',
                downColor: 'rgb(218,72,48)',
                borderVisible: false,
            }

			// Chart legend logic
			const symbolName = window.activeSymbol;
			const legend = document.getElementsByClassName('legend-container')[0];
			const firstRow = document.createElement('h2');
			const favouriteButton = document.createElement('span');
			const positionInfo = document.createElement('div');
			firstRow.classList.add('legend-symbol')
			favouriteButton.classList.add('favourite')
			positionInfo.classList.add('position-info')
			positionInfo.textContent = 'Position info |';
			firstRow.innerHTML = symbolName;
			legend.appendChild(firstRow);
			legend.appendChild(positionInfo);
			firstRow.appendChild(favouriteButton);
			const getLastBar = () => this.chartElement.__data[this.chartElement.__data.length - 1];
			const setTooltipHtml = (open, high, low, close) => {
				positionInfo.innerHTML = `<div class="position-info">
												<span>Position info |</span>
												<span style="margin-left: 0.5em;">O: ${open}</span>
												<span style="margin-left: 0.5em;">H: ${high}</span>
												<span style="margin-left: 0.5em;">L: ${low}</span>
												<span style="margin-left: 0.5em;">C: ${close}</span>
									</div>`;
			};
			
			const updateLegend = param => {
				const validCrosshairPoint = !(
					param === undefined || param.time === undefined || param.point.x < 0 || param.point.y < 0
				);
				const bar = validCrosshairPoint ? param : getLastBar();
				const pointData = validCrosshairPoint ? param.seriesPrices.get(param.seriesPrices.keys().next().value) : bar.value;
				const open = pointData?.open;
				const high = pointData?.high;
				const low = pointData?.low;
				const close = pointData?.close;
				setTooltipHtml(open, high, low, close);
			};

			this.chartElement.chart.subscribeCrosshairMove(updateLegend);

			updateLegend(undefined);
		}

		addButtonClickHandlers() {
			this.changeColours = () => this._changeColours();
			this.changeType = (type) => this._changeType(type);
			this.changeData = () => this._changeData();
			this.zoomIn = () => this._zoomIn();
			this.zoomOut = () => this._zoomOut();
			document.querySelector('#change-type-area').addEventListener('click', () => this.changeType('area'));
            document.querySelector('#change-type-line').addEventListener('click', () => this.changeType('line'));
			document.querySelector('#change-type-bar').addEventListener('click', () => this.changeType('bar'));
			document.querySelector('#change-type-candlestick').addEventListener('click', () => this.changeType('candlestick'));
			document.querySelector('#chart-zoom-in').addEventListener('click', () => this.zoomIn());
			document.querySelector('#chart-zoom-out').addEventListener('click', () => this.zoomOut());
			document.getElementById('chart-move-button').addEventListener('click', () => this.chartElement.chart.timeScale().scrollToRealTime());
		}

		_zoomIn(){
			if (!this.chartElement) {
				return;
			}
			this.chartElement.chart.timeScale().setVisibleRange({
				from: this.chartElement.chart.timeScale().getVisibleRange().from + (this.chartElement.chart.timeScale().getVisibleRange().to / 5000),
				to: this.chartElement.chart.timeScale().getVisibleRange().to,
			});
		}

		_zoomOut(){
			if (!this.chartElement) {
				return;
			}
			this.chartElement.chart.timeScale().setVisibleRange({
				from: this.chartElement.chart.timeScale().getVisibleRange().from - (this.chartElement.chart.timeScale().getVisibleRange().to / 5000),
				to: this.chartElement.chart.timeScale().getVisibleRange().to,
			});
		}

		_changeData() {
			if (!this.chartElement) {
				return;
			}
			const candlestickTypeData = ['candlestick', 'bar'].includes(
				this.chartElement.type,
			);

			var newData = '';
			if (typeof window.chart_data === 'undefined'){
				newData = Array();
			}else{
				newData = window.chart_data;
			}

			const lineData = newData.map(datapoint => ({
				time: datapoint.time,
				value: (datapoint.close + datapoint.open) / 2,
			}));
			
			this.chartElement.type = window.chartType;
			if(this.chartElement.type === "candlestick" || this.chartElement.type === "bar"){
				this.chartElement.data = newData;
			}else if(this.chartElement.type === "line" || this.chartElement.type === "area"){
				this.chartElement.data = lineData;
			}
			// console.log(this.chartElement.type);
			// console.log(newData);
			if (this.chartElement.type === 'baseline') {
				const average =
					newData.reduce((s, c) => s + c.value, 0) / newData.length;
				this.chartElement.seriesOptions = {
					baseValue: { type: 'price', price: average },
				};
			}
		}

		_changeType(type) {
			if (!this.chartElement) {
				return;
			}
			const types = [
				'line',
				'area',
				'baseline',
				'histogram',
				'candlestick',
				'bar',
			].filter(t => t !== this.chartElement.type);
			// this.chartElement.type = types.filter((types) => types === type)[0];
			this.chartElement.type = window.chartType;
            switch(this.chartElement.type){
                case 'area': this.chartElement.seriesOptions = {
                    lineColor: 'white',
                    topColor: 'rgba(255, 255, 255, 0.2)',  
                    bottomColor: 'rgba(255, 255, 255, 0.1)',
                }; break;
                case 'line': this.chartElement.seriesOptions = {
                    color: 'white',
                }; break; 
                case 'bar': this.chartElement.seriesOptions = {
                    wickUpColor: 'rgb(42,165,63)',
                    upColor: 'rgb(42,165,63)',
                    wickDownColor: 'rgb(218,72,48)',
                    downColor: 'rgb(218,72,48)',
                    borderVisible: false,
                }; break;
                case 'candlestick': this.chartElement.seriesOptions = {
                    wickUpColor: 'rgb(42,165,63)',
                    upColor: 'rgb(42,165,63)',
                    wickDownColor: 'rgb(218,72,48)',
                    downColor: 'rgb(218,72,48)',
                    borderVisible: false,
                }; break;
            }
			this._changeData();

			// call a method on the component.
			this.chartElement.chart.timeScale().fitContent();
		}

		disconnectedCallback() {}
	}

	window.customElements.define(
		'custom-lightweight-chart',
		LightweightChartExampleWC
	);
})();