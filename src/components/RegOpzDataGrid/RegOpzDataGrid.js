import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import RegOpzDataGridHeader from './RegOpzDataGridHeader';
import RegOpzDataGridSideMarker from './RegOpzGridSideMarker';
import RegOpzDataGridHorizontalLines from './RegOpzDataGridHorizontalLines';
import RegOpzDataGridVerticalLines from './RegOpzDataGridVerticalLines';
import RegOpzDataGridBody from './RegOpzDataGridBody';
require('./RegOpzDataGrid.css');
export default class RegOpzDataGrid extends Component {
  constructor(props){
    super(props);
    this.numberofCols = 26;
    this.numberofRows = 1000;
    this.data = [
  {
    "matrix": [
      {
        "cell": "A2",
        "merged": "V2",
        "value": "THE MONETARY AUTHORITY OF SINGAPORE\nTotal Foreign ExDhange Business TransaDted By LGT BANK (SINGAPORE) LTD"
      },
      {
        "cell": "U3",
        "merged": "V3",
        "value": "Institution Code : D7117"
      },
      {
        "cell": "U4",
        "merged": "V4",
        "value": "ACU        S$000"
      },
      {
        "cell": "A5",
        "merged": "B7",
        "value": "Type of Currency"
      },
      {
        "cell": "C5",
        "merged": "V5",
        "value": "Total Transactions with"
      },
      {
        "cell": "C6",
        "merged": "F6",
        "value": "Banks and Asian Currency Units\nin Singapore"
      },
      {
        "cell": "G6",
        "merged": "J6",
        "value": "Non-Bank Dustomers\nin Singapore"
      },
      {
        "cell": "K6",
        "merged": "N6",
        "value": "Banks outside Singapore"
      },
      {
        "cell": "O6",
        "merged": "R6",
        "value": "Non-bank Dustomers\n outside  Singapore"
      },
      {
        "cell": "S6",
        "merged": "V6",
        "value": "Total"
      },
      {
        "cell": "V1",
        "value": "1003 App4aN"
      },
      {
        "cell": "C7",
        "value": "Spot"
      },
      {
        "cell": "D7",
        "value": "Forward"
      },
      {
        "cell": "E7",
        "value": "Swap"
      },
      {
        "cell": "F7",
        "value": "Sub-total"
      },
      {
        "cell": "G7",
        "value": "Spot"
      },
      {
        "cell": "H7",
        "value": "Forward"
      },
      {
        "cell": "I7",
        "value": "Swap"
      },
      {
        "cell": "J7",
        "value": "Sub-total"
      },
      {
        "cell": "K7",
        "value": "Spot"
      },
      {
        "cell": "L7",
        "value": "Forward"
      },
      {
        "cell": "M7",
        "value": "Swap"
      },
      {
        "cell": "N7",
        "value": "Sub-total"
      },
      {
        "cell": "O7",
        "value": "Spot"
      },
      {
        "cell": "P7",
        "value": "Forward"
      },
      {
        "cell": "Q7",
        "value": "Swap"
      },
      {
        "cell": "R7",
        "value": "Sub-total"
      },
      {
        "cell": "S7",
        "value": "Spot"
      },
      {
        "cell": "T7",
        "value": "Forward"
      },
      {
        "cell": "U7",
        "value": "Swap"
      },
      {
        "cell": "V7",
        "value": "Total"
      },
      {
        "cell": "A8",
        "value": "Code"
      },
      {
        "cell": "B8",
        "value": "S$ against :"
      },
      {
        "cell": "A9",
        "value": "US$"
      },
      {
        "cell": "B9",
        "value": "US$"
      },
      {
        "cell": "A10",
        "value": "GBP"
      },
      {
        "cell": "B10",
        "value": "£ Stg"
      },
      {
        "cell": "A11",
        "value": "EUR"
      },
      {
        "cell": "B11",
        "value": "Euro"
      },
      {
        "cell": "A12",
        "value": "YEN"
      },
      {
        "cell": "B12",
        "value": "Jap yen"
      },
      {
        "cell": "A13",
        "value": "AUD"
      },
      {
        "cell": "B13",
        "value": "Aust $"
      },
      {
        "cell": "A14",
        "value": "CAD"
      },
      {
        "cell": "B14",
        "value": "Can $"
      },
      {
        "cell": "A15",
        "value": "CHF"
      },
      {
        "cell": "B15",
        "value": "Swiss Fr"
      },
      {
        "cell": "B16",
        "value": "Others"
      },
      {
        "cell": "B17",
        "value": "Sub-total"
      },
      {
        "cell": "A18",
        "value": "Code"
      },
      {
        "cell": "B18",
        "value": "US$ against :"
      },
      {
        "cell": "A19",
        "value": "GBP"
      },
      {
        "cell": "B19",
        "value": "£ Stg"
      },
      {
        "cell": "A20",
        "value": "EUR"
      },
      {
        "cell": "B20",
        "value": "Euro"
      },
      {
        "cell": "A21",
        "value": "JPY"
      },
      {
        "cell": "B21",
        "value": "Jap yen"
      },
      {
        "cell": "A22",
        "value": "AUD"
      },
      {
        "cell": "B22",
        "value": "Aust $"
      },
      {
        "cell": "A23",
        "value": "CAD"
      },
      {
        "cell": "B23",
        "value": "Can $"
      },
      {
        "cell": "A24",
        "value": "CHF"
      },
      {
        "cell": "B24",
        "value": "Swiss Fr"
      },
      {
        "cell": "B25",
        "value": "Others"
      },
      {
        "cell": "B26",
        "value": "Sub-total"
      },
      {
        "cell": "A27",
        "value": "Code"
      },
      {
        "cell": "B27",
        "value": "3rd Currency Transactions"
      },
      {
        "cell": "A28",
        "value": "GBP/JPY"
      },
      {
        "cell": "B28",
        "value": "£ Stg/ Jap Yen"
      },
      {
        "cell": "A29",
        "value": "EUR/GBP"
      },
      {
        "cell": "B29",
        "value": "Euro / £ Stg"
      },
      {
        "cell": "A30",
        "value": "EUR/JPY"
      },
      {
        "cell": "B30",
        "value": "Euro/ Jap Yen"
      },
      {
        "cell": "B31",
        "value": "Others"
      },
      {
        "cell": "B32",
        "value": "Sub-total"
      },
      {
        "cell": "B34",
        "value": "GRAND-TOTAL"
      }
    ],
    "sheet": "MAS 1003 - ACU I"
  },
  {
    "matrix": [
      {
        "cell": "A2",
        "merged": "V2",
        "value": "THE MONETARY AUTHORITY OF SINGAPORE\nTotal Foreign ExDhange Business TransaDted By LGT BANK (SINGAPORE) LTD"
      },
      {
        "cell": "U3",
        "merged": "V3",
        "value": "Institution Code : D7117"
      },
      {
        "cell": "U4",
        "merged": "V4",
        "value": "DBU        S$000"
      },
      {
        "cell": "A5",
        "merged": "B7",
        "value": "Type of Currency"
      },
      {
        "cell": "C5",
        "merged": "V5",
        "value": "Total Transactions with"
      },
      {
        "cell": "C6",
        "merged": "F6",
        "value": "Banks and Asian Currency Units\nin Singapore"
      },
      {
        "cell": "G6",
        "merged": "J6",
        "value": "Non-Bank Dustomers\nin Singapore"
      },
      {
        "cell": "K6",
        "merged": "N6",
        "value": "Banks outside Singapore"
      },
      {
        "cell": "O6",
        "merged": "R6",
        "value": "Non-bank Dustomers\n outside  Singapore"
      },
      {
        "cell": "S6",
        "merged": "V6",
        "value": "Total"
      },
      {
        "cell": "V1",
        "value": "1003 App4aN"
      },
      {
        "cell": "C7",
        "value": "Spot"
      },
      {
        "cell": "D7",
        "value": "Forward"
      },
      {
        "cell": "E7",
        "value": "Swap"
      },
      {
        "cell": "F7",
        "value": "Sub-total"
      },
      {
        "cell": "G7",
        "value": "Spot"
      },
      {
        "cell": "H7",
        "value": "Forward"
      },
      {
        "cell": "I7",
        "value": "Swap"
      },
      {
        "cell": "J7",
        "value": "Sub-total"
      },
      {
        "cell": "K7",
        "value": "Spot"
      },
      {
        "cell": "L7",
        "value": "Forward"
      },
      {
        "cell": "M7",
        "value": "Swap"
      },
      {
        "cell": "N7",
        "value": "Sub-total"
      },
      {
        "cell": "O7",
        "value": "Spot"
      },
      {
        "cell": "P7",
        "value": "Forward"
      },
      {
        "cell": "Q7",
        "value": "Swap"
      },
      {
        "cell": "R7",
        "value": "Sub-total"
      },
      {
        "cell": "S7",
        "value": "Spot"
      },
      {
        "cell": "T7",
        "value": "Forward"
      },
      {
        "cell": "U7",
        "value": "Swap"
      },
      {
        "cell": "V7",
        "value": "Total"
      },
      {
        "cell": "A8",
        "value": "Code"
      },
      {
        "cell": "B8",
        "value": "S$ against :"
      },
      {
        "cell": "A9",
        "value": "US$"
      },
      {
        "cell": "B9",
        "value": "US$"
      },
      {
        "cell": "A10",
        "value": "GBP"
      },
      {
        "cell": "B10",
        "value": "£ Stg"
      },
      {
        "cell": "A11",
        "value": "EUR"
      },
      {
        "cell": "B11",
        "value": "Euro"
      },
      {
        "cell": "A12",
        "value": "YEN"
      },
      {
        "cell": "B12",
        "value": "Jap yen"
      },
      {
        "cell": "A13",
        "value": "AUD"
      },
      {
        "cell": "B13",
        "value": "Aust $"
      },
      {
        "cell": "A14",
        "value": "CAD"
      },
      {
        "cell": "B14",
        "value": "Can $"
      },
      {
        "cell": "A15",
        "value": "CHF"
      },
      {
        "cell": "B15",
        "value": "Swiss Fr"
      },
      {
        "cell": "B16",
        "value": "Others"
      },
      {
        "cell": "B17",
        "value": "Sub-total"
      },
      {
        "cell": "A18",
        "value": "Code"
      },
      {
        "cell": "B18",
        "value": "US$ against :"
      },
      {
        "cell": "A19",
        "value": "GBP"
      },
      {
        "cell": "B19",
        "value": "£ Stg"
      },
      {
        "cell": "A20",
        "value": "EUR"
      },
      {
        "cell": "B20",
        "value": "Euro"
      },
      {
        "cell": "A21",
        "value": "JPY"
      },
      {
        "cell": "B21",
        "value": "Jap yen"
      },
      {
        "cell": "A22",
        "value": "AUD"
      },
      {
        "cell": "B22",
        "value": "Aust $"
      },
      {
        "cell": "A23",
        "value": "CAD"
      },
      {
        "cell": "B23",
        "value": "Can $"
      },
      {
        "cell": "A24",
        "value": "CHF"
      },
      {
        "cell": "B24",
        "value": "Swiss Fr"
      },
      {
        "cell": "B25",
        "value": "Others"
      },
      {
        "cell": "B26",
        "value": "Sub-total"
      },
      {
        "cell": "A27",
        "value": "Code"
      },
      {
        "cell": "B27",
        "value": "3rd Currency Transactions"
      },
      {
        "cell": "A28",
        "value": "GBP/JPY"
      },
      {
        "cell": "B28",
        "value": "£ Stg/ Jap Yen"
      },
      {
        "cell": "A29",
        "value": "EUR/GBP"
      },
      {
        "cell": "B29",
        "value": "Euro / £ Stg"
      },
      {
        "cell": "A30",
        "value": "EUR/JPY"
      },
      {
        "cell": "B30",
        "value": "Euro/ Jap Yen"
      },
      {
        "cell": "B31",
        "value": "Others"
      },
      {
        "cell": "B32",
        "value": "Sub-total"
      },
      {
        "cell": "B34",
        "value": "GRAND-TOTAL"
      }
    ],
    "sheet": "MAS 1003 -DBU I"
  },
  {
    "matrix": [
      {
        "cell": "B2",
        "merged": "J2",
        "value": "THE MONETARY AUTHORITY OF SINGAPORE\nTotal Foreign Exchange Business Transacted By LGT BANK (SINGAPORE) LTD"
      },
      {
        "cell": "B6",
        "merged": "C6",
        "value": "Currency Options"
      },
      {
        "cell": "C38",
        "merged": "D38",
        "value": "Total nomilal S$ Millions"
      },
      {
        "cell": "E38",
        "merged": "F38",
        "value": "Number of Contracts"
      },
      {
        "cell": "J1",
        "value": "1003 App4aN"
      },
      {
        "cell": "D5",
        "value": "Total transactions with"
      },
      {
        "cell": "D6",
        "value": "Banks and Asian Currency Units\nin Singapore"
      },
      {
        "cell": "E6",
        "value": "Non-Bank Customers\nin Singapore"
      },
      {
        "cell": "F6",
        "value": "Banks outside Singapore"
      },
      {
        "cell": "G6",
        "value": "Non-bank Customers\n outside  Singapore"
      },
      {
        "cell": "H6",
        "value": "Total"
      },
      {
        "cell": "I6",
        "value": "Written"
      },
      {
        "cell": "J6",
        "value": "Bought"
      },
      {
        "cell": "B7",
        "value": "Code"
      },
      {
        "cell": "C7",
        "value": "S$ against :"
      },
      {
        "cell": "B8",
        "value": "Usd"
      },
      {
        "cell": "C8",
        "value": "US$"
      },
      {
        "cell": "B9",
        "value": "EUR"
      },
      {
        "cell": "C9",
        "value": "Euro"
      },
      {
        "cell": "B10",
        "value": "JPY"
      },
      {
        "cell": "C10",
        "value": "Jap yen"
      },
      {
        "cell": "C11",
        "value": "Others"
      },
      {
        "cell": "C12",
        "value": "Sub-total"
      },
      {
        "cell": "B13",
        "value": "Code"
      },
      {
        "cell": "C13",
        "value": "US$ against :"
      },
      {
        "cell": "B14",
        "value": "GBP"
      },
      {
        "cell": "C14",
        "value": "£ Stg"
      },
      {
        "cell": "B15",
        "value": "EUR"
      },
      {
        "cell": "C15",
        "value": "Euro"
      },
      {
        "cell": "B16",
        "value": "JPY"
      },
      {
        "cell": "C16",
        "value": "Jap yen"
      },
      {
        "cell": "B17",
        "value": "AUD"
      },
      {
        "cell": "C17",
        "value": "Aust $"
      },
      {
        "cell": "B18",
        "value": "CAD"
      },
      {
        "cell": "C18",
        "value": "Can $"
      },
      {
        "cell": "B19",
        "value": "CHF"
      },
      {
        "cell": "C19",
        "value": "Swiss Fr"
      },
      {
        "cell": "C20",
        "value": "Others"
      },
      {
        "cell": "C21",
        "value": "Sub-total"
      },
      {
        "cell": "B22",
        "value": "Code"
      },
      {
        "cell": "C22",
        "value": "3rd Currency:"
      },
      {
        "cell": "B23",
        "value": "GBP/JPY"
      },
      {
        "cell": "C23",
        "value": "£ Stg/ Jap Yen"
      },
      {
        "cell": "B24",
        "value": "EUR/GBP"
      },
      {
        "cell": "C24",
        "value": "Euro / £ Stg"
      },
      {
        "cell": "B25",
        "value": "EUR/JPY"
      },
      {
        "cell": "C25",
        "value": "Euro/ Jap Yen"
      },
      {
        "cell": "C26",
        "value": "Others"
      },
      {
        "cell": "C27",
        "value": "SUBTOT"
      },
      {
        "cell": "C29",
        "value": "GRAND TOTAL"
      },
      {
        "cell": "B36",
        "value": "S$ CURRENCY OPTIONS"
      },
      {
        "cell": "B39",
        "value": "OPTIONS BOUGHT"
      },
      {
        "cell": "B40",
        "value": "from other banks and merchant banks"
      },
      {
        "cell": "B41",
        "value": "in Singapore"
      },
      {
        "cell": "B42",
        "value": "outside Singapore"
      },
      {
        "cell": "B43",
        "value": "from other financial institutions"
      },
      {
        "cell": "B44",
        "value": "in Singapore"
      },
      {
        "cell": "B45",
        "value": "outside Singapore"
      },
      {
        "cell": "B46",
        "value": "from non-financial customers"
      },
      {
        "cell": "B47",
        "value": "in Singapore"
      },
      {
        "cell": "B48",
        "value": "outside Singapore"
      },
      {
        "cell": "B49",
        "value": "TOTAL"
      },
      {
        "cell": "B51",
        "value": "OPTIONS SOLD"
      },
      {
        "cell": "B52",
        "value": "to other banks and merchant banks"
      },
      {
        "cell": "B53",
        "value": "in Singapore"
      },
      {
        "cell": "B54",
        "value": "outside Singapore"
      },
      {
        "cell": "B55",
        "value": "to other financial institutions"
      },
      {
        "cell": "B56",
        "value": "in Singapore"
      },
      {
        "cell": "B57",
        "value": "outside Singapore"
      },
      {
        "cell": "B58",
        "value": "to non-financial customers"
      },
      {
        "cell": "B59",
        "value": "in Singapore"
      },
      {
        "cell": "B60",
        "value": "outside Singapore"
      },
      {
        "cell": "B61",
        "value": "TOTAL"
      }
    ],
    "sheet": "MAS 1003 - ACU II"
  },
  {
    "matrix": [
      {
        "cell": "B2",
        "merged": "J2",
        "value": "THE MONETARY AUTHORITY OF SINGAPORE\nTotal Foreign Exchange Business Transacted By LGT BANK (SINGAPORE) LTD"
      },
      {
        "cell": "B6",
        "merged": "C6",
        "value": "Currency Options"
      },
      {
        "cell": "C38",
        "merged": "D38",
        "value": "Total nomilal S$ Millions"
      },
      {
        "cell": "E38",
        "merged": "F38",
        "value": "Number of Contracts"
      },
      {
        "cell": "J1",
        "value": "1003 App4aN"
      },
      {
        "cell": "D5",
        "value": "Total transactions with"
      },
      {
        "cell": "D6",
        "value": "Banks and Asian Currency Units\nin Singapore"
      },
      {
        "cell": "E6",
        "value": "Non-Bank Customers\nin Singapore"
      },
      {
        "cell": "F6",
        "value": "Banks outside Singapore"
      },
      {
        "cell": "G6",
        "value": "Non-bank Customers\n outside  Singapore"
      },
      {
        "cell": "H6",
        "value": "Total"
      },
      {
        "cell": "I6",
        "value": "Written"
      },
      {
        "cell": "J6",
        "value": "Bought"
      },
      {
        "cell": "B7",
        "value": "Code"
      },
      {
        "cell": "C7",
        "value": "S$ against :"
      },
      {
        "cell": "B8",
        "value": "Usd"
      },
      {
        "cell": "C8",
        "value": "US$"
      },
      {
        "cell": "B9",
        "value": "EUR"
      },
      {
        "cell": "C9",
        "value": "Euro"
      },
      {
        "cell": "B10",
        "value": "JPY"
      },
      {
        "cell": "C10",
        "value": "Jap yen"
      },
      {
        "cell": "C11",
        "value": "Others"
      },
      {
        "cell": "C12",
        "value": "Sub-total"
      },
      {
        "cell": "B13",
        "value": "Code"
      },
      {
        "cell": "C13",
        "value": "US$ against :"
      },
      {
        "cell": "B14",
        "value": "GBP"
      },
      {
        "cell": "C14",
        "value": "£ Stg"
      },
      {
        "cell": "B15",
        "value": "EUR"
      },
      {
        "cell": "C15",
        "value": "Euro"
      },
      {
        "cell": "B16",
        "value": "JPY"
      },
      {
        "cell": "C16",
        "value": "Jap yen"
      },
      {
        "cell": "B17",
        "value": "AUD"
      },
      {
        "cell": "C17",
        "value": "Aust $"
      },
      {
        "cell": "B18",
        "value": "CAD"
      },
      {
        "cell": "C18",
        "value": "Can $"
      },
      {
        "cell": "B19",
        "value": "CHF"
      },
      {
        "cell": "C19",
        "value": "Swiss Fr"
      },
      {
        "cell": "C20",
        "value": "Others"
      },
      {
        "cell": "C21",
        "value": "Sub-total"
      },
      {
        "cell": "B22",
        "value": "Code"
      },
      {
        "cell": "C22",
        "value": "3rd Currency:"
      },
      {
        "cell": "B23",
        "value": "GBP/JPY"
      },
      {
        "cell": "C23",
        "value": "£ Stg/ Jap Yen"
      },
      {
        "cell": "B24",
        "value": "EUR/GBP"
      },
      {
        "cell": "C24",
        "value": "Euro / £ Stg"
      },
      {
        "cell": "B25",
        "value": "EUR/JPY"
      },
      {
        "cell": "C25",
        "value": "Euro/ Jap Yen"
      },
      {
        "cell": "C26",
        "value": "Others"
      },
      {
        "cell": "C27",
        "value": "SUBTOT"
      },
      {
        "cell": "C29",
        "value": "GRAND TOTAL"
      },
      {
        "cell": "B36",
        "value": "S$ CURRENCY OPTIONS"
      },
      {
        "cell": "B39",
        "value": "OPTIONS BOUGHT"
      },
      {
        "cell": "B40",
        "value": "from other banks and merchant banks"
      },
      {
        "cell": "B41",
        "value": "in Singapore"
      },
      {
        "cell": "B42",
        "value": "outside Singapore"
      },
      {
        "cell": "B43",
        "value": "from other financial institutions"
      },
      {
        "cell": "B44",
        "value": "in Singapore"
      },
      {
        "cell": "B45",
        "value": "outside Singapore"
      },
      {
        "cell": "B46",
        "value": "from non-financial customers"
      },
      {
        "cell": "B47",
        "value": "in Singapore"
      },
      {
        "cell": "B48",
        "value": "outside Singapore"
      },
      {
        "cell": "B49",
        "value": "TOTAL"
      },
      {
        "cell": "B51",
        "value": "OPTIONS SOLD"
      },
      {
        "cell": "B52",
        "value": "to other banks and merchant banks"
      },
      {
        "cell": "B53",
        "value": "in Singapore"
      },
      {
        "cell": "B54",
        "value": "outside Singapore"
      },
      {
        "cell": "B55",
        "value": "to other financial institutions"
      },
      {
        "cell": "B56",
        "value": "in Singapore"
      },
      {
        "cell": "B57",
        "value": "outside Singapore"
      },
      {
        "cell": "B58",
        "value": "to non-financial customers"
      },
      {
        "cell": "B59",
        "value": "in Singapore"
      },
      {
        "cell": "B60",
        "value": "outside Singapore"
      },
      {
        "cell": "B61",
        "value": "TOTAL"
      }
    ],
    "sheet": "MAS 1003 - DBU II"
  },
  {
    "matrix": [
      {
        "cell": "B15",
        "merged": "F15",
        "value": "PART IV FRAs, INTEREST RATE AND CURRENCY SWAPS"
      },
      {
        "cell": "B17",
        "merged": "B18",
        "value": "Code"
      },
      {
        "cell": "C17",
        "merged": "C18",
        "value": "Currencies"
      },
      {
        "cell": "D17",
        "merged": "F17",
        "value": "Principal Amount Transacted"
      },
      {
        "cell": "B2",
        "merged": "F2",
        "value": "THE MONETARY AUTHORITY OF SINGAPORE\nTotal Foreign Exchange Business Transacted By LGT BANK (SINGAPORE) LTD"
      },
      {
        "cell": "B4",
        "merged": "F4",
        "value": "PART III CURRENCY FUTURES"
      },
      {
        "cell": "D6",
        "merged": "F6",
        "value": "Nominal Value"
      },
      {
        "cell": "C6",
        "merged": "C7",
        "value": "Currency\nFutures"
      },
      {
        "cell": "B6",
        "merged": "B7",
        "value": "Code"
      },
      {
        "cell": "F1",
        "value": "1003 App4aN"
      },
      {
        "cell": "D7",
        "value": "Transacted through\nExchanges in Singapore"
      },
      {
        "cell": "E7",
        "value": "Transacted through Exchanges\nOutside Singapore"
      },
      {
        "cell": "F7",
        "value": "Total"
      },
      {
        "cell": "B8",
        "value": "EUR"
      },
      {
        "cell": "C8",
        "value": "US$/Euro"
      },
      {
        "cell": "B9",
        "value": "JPY"
      },
      {
        "cell": "C9",
        "value": "US$/Jap yen"
      },
      {
        "cell": "B10",
        "value": "GBP"
      },
      {
        "cell": "C10",
        "value": "US$/£ Stg"
      },
      {
        "cell": "C11",
        "value": "Others"
      },
      {
        "cell": "C12",
        "value": "Total"
      },
      {
        "cell": "D18",
        "value": "Interest Rate and\nCurrency Swaps"
      },
      {
        "cell": "E18",
        "value": "Forward\nRate Agreements"
      },
      {
        "cell": "F18",
        "value": "Total"
      },
      {
        "cell": "B19",
        "value": "USD"
      },
      {
        "cell": "C19",
        "value": "US$"
      },
      {
        "cell": "B20",
        "value": "EUR"
      },
      {
        "cell": "C20",
        "value": "Euro"
      },
      {
        "cell": "B21",
        "value": "JPY"
      },
      {
        "cell": "C21",
        "value": "Jap yen"
      },
      {
        "cell": "B22",
        "value": "SGD"
      },
      {
        "cell": "C22",
        "value": "S$"
      },
      {
        "cell": "C23",
        "value": "Others"
      },
      {
        "cell": "C24",
        "value": "Total"
      }
    ],
    "sheet": "MAS 1003 - III & IV"
  }
]
console.log(this.data);
  }

  render(){
    return(
      <div className="reg_gridHolder">
        <RegOpzDataGridHeader numberofCols={this.numberofCols} />
        <div className="clearfix"></div>
        <RegOpzDataGridSideMarker numberofRows={this.numberofRows} />
        <div className="reg_grid_drawing_container">
            <RegOpzDataGridHorizontalLines numberofRows={this.numberofRows} />
            <RegOpzDataGridVerticalLines numberofCols={this.numberofCols} height={this.numberofRows * 30} />
          <RegOpzDataGridBody data={this.data[0].matrix} />
        </div>
      </div>
    )
  }
}
