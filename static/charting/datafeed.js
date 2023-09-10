import { makeApiRequest, generateSymbol, parseFullSymbol, makeFcsAPiReq } from './helpers.js';

// DatafeedConfiguration implementation
const configurationData = {
    // Represents the resolutions for bars supported by your datafeed
    supported_resolutions: ['1', '1H', '1D', '1W', '1M'],
    // The `exchanges` arguments are used for the `searchSymbols` method if a user selects the exchange
    exchanges: [
        // { value: 'Bitfinex', name: 'Bitfinex', desc: 'Bitfinex'},
        // { value: 'Kraken', name: 'Kraken', desc: 'Kraken bitcoin exchange'},
        // { value: 'ABCC', name: 'ABCC', desc: 'ABCC bitcoin exchange'},
        { value: 'FCS', name: 'FCS', desc: 'FCS API'},
    ],
    // The `symbols_types` arguments are used for the `searchSymbols` method if a user selects this symbol type
    symbols_types: [
        { name: 'all', value: ''},
        { name: 'crypto', value: 'crypto'},
        { name: 'forex', value: 'forex'},
    ]
};

// Obtains all symbols for all exchanges supported by CryptoCompare API
async function getAllSymbols() {
    const data = await makeApiRequest('data/v3/all/exchanges');
    let allSymbols = [];

    for (const exchange of configurationData.exchanges) {
        const pairs = data.Data[exchange.value].pairs;

        for (const leftPairPart of Object.keys(pairs)) {
            const symbols = pairs[leftPairPart].map(rightPairPart => {
                const symbol = generateSymbol(exchange.value, leftPairPart, rightPairPart);
                return {
                    symbol: symbol.short,
                    full_name: symbol.full,
                    description: symbol.full,
                    exchange: exchange.value,
                    type: 'crypto',
                };
            });
            allSymbols = [...allSymbols, ...symbols];
        }
    }
    return allSymbols;
}

async function get_all_symbol(){
    const data = await makeFcsAPiReq('currency-lists');
    let allSymbols = [];

    const pairs = data.currency_data
    for (const pair of pairs){
        const symbols = {
            symbol: pair.symbol_short,
            full_name: pair.symbol,
            description: pair.name,
            exchange: "FCS",
            type: pair.symbol_type,
        };

        allSymbols.push(symbols);
    }

    return allSymbols;
}

export default {
    onReady: (callback) => {
        console.log('[onReady]: Method call');
        setTimeout(() => callback(configurationData));
    },

    searchSymbols: async (
        userInput,
        exchange,
        symbolType,
        onResultReadyCallback
    ) => {
        console.log('[searchSymbols]: Method call');
        const symbols = await get_all_symbol();
        const newSymbols = symbols.filter(symbol => {
            const isExchangeValid = exchange === '' || symbol.exchange === exchange;
            const isTypeValid = symbolType === '' || symbol.type === symbolType;
            const isFullSymbolContainsInput = symbol.full_name
                .toLowerCase()
                .indexOf(userInput.toLowerCase()) !== -1;
            return isExchangeValid && isFullSymbolContainsInput && isTypeValid;
        });
        onResultReadyCallback(newSymbols);
    },

    resolveSymbol: async (
        symbolName,
        onSymbolResolvedCallback,
        onResolveErrorCallback,
        extension
    ) => {
        console.log('[resolveSymbol]: Method call', symbolName);
        const symbols = await get_all_symbol();
        const symbolItem = symbols.find(({ full_name }) => full_name === symbolName);
        if (!symbolItem) {
            console.log('[resolveSymbol]: Cannot resolve symbol', symbolName);
            onResolveErrorCallback('Cannot resolve symbol');
            return;
        }
        // Symbol information object
        const symbolInfo = {
            ticker: symbolItem.full_name,
            name: symbolItem.symbol,
            description: symbolItem.description,
            type: symbolItem.type,
            session: '24x7',
            timezone: 'Etc/UTC',
            exchange: symbolItem.exchange,
            minmov: 1,
            pricescale: 100,
            has_intraday: false,
            visible_plots_set: 'ohlc',
            has_weekly_and_monthly: false,
            supported_resolutions: configurationData.supported_resolutions,
            volume_precision: 2,
            data_status: 'streaming',
        };
        console.log('[resolveSymbol]: Symbol resolved', symbolName);
        onSymbolResolvedCallback(symbolInfo);
    },

    getBars: async (symbolInfo, resolution, periodParams, onHistoryCallback, onErrorCallback) => {
        const { from, to, firstDataRequest } = periodParams;
        console.log('[getBars]: Method call', symbolInfo, resolution, from, to);

        try {
            const data = await makeFcsAPiReq('history-data');
            if (data.Response && data.Response === 'Error' || data.Data.length === 0) {
                // "noData" should be set if there is no data in the requested period
                onHistoryCallback([], { noData: true });
                return;
            }
            console.log(data);
            let bars = [];
            data.Data.forEach(bar => {
                if (bar.time >= from && bar.time < to) {
                    bars = [...bars, {
                        time: bar.time * 1000,
                        low: bar.low,
                        high: bar.high,
                        open: bar.open,
                        close: bar.close,
                    }];
                }
            });
            console.log(`[getBars]: returned ${bars.length} bar(s)`);
            onHistoryCallback(bars, { noData: false });
        } catch (error) {
            console.log('[getBars]: Get error', error);
            onErrorCallback(error);
        }
    },

    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
        console.log('[subscribeBars]: Method call with subscriberUID:', subscriberUID, resolution);
    },
    unsubscribeBars: (subscriberUID) => {
        console.log('[unsubscribeBars]: Method call with subscriberUID:', subscriberUID);
    },
};
