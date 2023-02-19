


(function() {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	const container = document.getElementById("mobile-chart-container");
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
    #mobile-chart {
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
        
      #mobile-chart {
        height: 100%;
      }


	</style>
	<div id="example">
		<div id="example-container">
			<lightweight-chart id="mobile-chart"
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

			this.chartElement = this.shadowRoot.querySelector('#mobile-chart');
			this._changeData();

			this.addButtonClickHandlers();
			this.chartElement.chart.timeScale().fitContent();
			this.chartElement.chart.timeScale().applyOptions({
				timeVisible: true,
				secondsVisible: true,
				barSpacing: 20,
				tickMarkType: 4,
				tickMarkFormatter: (time, tickMarkType, locale) => {
					const date = new Date(time * 1000)
					const formattedDate = `${date.getDay()} ${monthNames[date.getMonth()]}/${date.getFullYear()}`;
					return String(formattedDate);
				},
			})
			this.chartElement.chart.applyOptions({
				layout:{
					fontSize: 11,
				},
				leftPriceScale: {
					visible: false,
				},
				rightPriceScale: {
					scaleMargins: {
						top: 0.25, // leave some space for the legend
						bottom: 0.25,
					},
				},
			})

            this.chartElement.seriesOptions = {
                wickUpColor: 'rgb(42,165,63)',
                upColor: 'rgb(42,165,63)',
                wickDownColor: 'rgb(218,72,48)',
                downColor: 'rgb(218,72,48)',
                borderVisible: false,
            }
		}

		addButtonClickHandlers() {
			this.changeColours = () => this._changeColours();
			this.changeType = (type) => this._changeType(type);
			this.changeData = () => this._changeData();
			this.zoomIn = () => this._zoomIn();
			this.zoomOut = () => this._zoomOut();
			const changeAreaButton = document.querySelector('#mobile-change-type-area'); 
			const changeLineButton = document.querySelector('#mobile-change-type-line');
			const changeBarsButton = document.querySelector('#mobile-change-type-bar');
			const changeCandlestickButton = document.querySelector('#mobile-change-type-candlestick');
			changeAreaButton.addEventListener('click', () => {
				this.changeType('area');
				changeLineButton.classList.remove('active');
				changeBarsButton.classList.remove('active');
				changeCandlestickButton.classList.remove('active');
				changeAreaButton.classList.add('active');
			});

            changeLineButton.addEventListener('click', () => {
				this.changeType('line');
				changeAreaButton.classList.remove('active');
				changeBarsButton.classList.remove('active');
				changeCandlestickButton.classList.remove('active');
				changeLineButton.classList.add('active');
			});

			changeBarsButton.addEventListener('click', () => {
				this.changeType('bar');
				changeAreaButton.classList.remove('active');
				changeLineButton.classList.remove('active');
				changeCandlestickButton.classList.remove('active');
				changeBarsButton.classList.add('active');
			});

			changeCandlestickButton.addEventListener('click', () => {
				this.changeType('candlestick');
				changeAreaButton.classList.remove('active');
				changeLineButton.classList.remove('active');
				changeBarsButton.classList.remove('active');
				changeCandlestickButton.classList.add('active');
			});
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
			const newData = generateSampleData(candlestickTypeData);
			this.chartElement.data = newData;
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
			this.chartElement.type = types.filter((types) => types === type)[0];
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
			this.chartElement.chart.timeScale().applyOptions({
				barSpacing: 20,
			})
			this._changeData();

			// call a method on the component.
			this.chartElement.chart.timeScale().fitContent();
		}

		disconnectedCallback() {}
	}

	window.customElements.define(
		'mobile-lightweight-chart',
		LightweightChartExampleWC
	);
})();