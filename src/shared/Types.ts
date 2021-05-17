export const enum Direction {
    "BUY",
    "SELL"
};

// Trades represents trades that will be validated
export interface Trade {
    start_date: Date;
    end_date: Date;
    portfolio: string;
    asset: string;
    market: string;
    quantity: number;
    price: number;
}

export type Facts = Map<string, number>;

export interface TradeFact {
    start_date: Date;
    end_date: Date;
    portfolio: string;
    asset: string;
    direction: Direction;
    market?: string;
    facts: Map<string, number>;
    // facts: Facts;
}

export type TradeIdentifier = Partial<Omit<TradeFact, "facts"> >



/**
 * Describes parameter type to trade keyword handlers.
 * Passed in as "data".
 */
export interface TradeParameter {
    field: string;
    trade: Trade;
};