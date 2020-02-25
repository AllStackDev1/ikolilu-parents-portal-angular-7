/**
 * Created by Chinedu Ekene Okpala on 12/02/2018.
 */
export interface BillsPayments {
    term: string;
    amount: number;
    currency: string;
    billitem: string;
    debit: number;
    credit: number;
    trans: string;
    receiptno: string;
    date: string;
    symbol: string;
    billitemid: string;
}
