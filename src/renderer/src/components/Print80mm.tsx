import { PosPrinter } from "electron-pos-printer";
// import * as path from "path";

const options = {
    preview: false,
    margin: '0 0 0 0',
    copies: 1,
    printerName: 'POS80', // printer name
    timeOutPerLine: 400,
    pageSize: '80mm', // page size
    boolean: true
}

const data = [
   {
        type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
        value: 'SAMPLE HEADING',
        style: { fontWeight: "700", textAlign: 'center', fontSize: "24px" }
    }, {
        type: 'text',                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
        value: 'Secondary text',
        style: { textDecoration: "underline", fontSize: "10px", textAlign: "center", color: "red" }
    }, {
        type: 'barCode',
        value: '023456789010',
        height: '40',                     // height of barcode, applicable only to bar and QR codes
        width: '2',                       // width of barcode, applicable only to bar and QR codes
        displayValue: true,             // Display value below barcode
        fontsize: 12,
    },{
        type: 'table',
        // style the table
        style: { border: '1px solid #ddd' },
        // list of the columns to be rendered in the table header
        tableHeader: ['Animal', 'Age'],
        // multi dimensional array depicting the rows and columns of the table body
        tableBody: [
            ['Cat', '2'],
            ['Dog', '4'],
            ['Horse', '12'],
            ['Pig', '4'],
        ],
        // list of columns to be rendered in the table footer
        tableFooter: ['Animal', 'Age'],
        // custom style for the table header
        tableHeaderStyle: { backgroundColor: '#000', color: 'white' },
        // custom style for the table body
        tableBodyStyle: { 'border': '0.5px solid #ddd' },
        // custom style for the table footer
        tableFooterStyle: { backgroundColor: '#000', color: 'white' },
    }, {
        type: 'table',
        style: { border: '1px solid #ddd' },             // style the table
        // list of the columns to be rendered in the table header
        tableHeader: [{ type: 'text', value: 'People' }, { type: 'text', value: 'People' }],
        // multi-dimensional array depicting the rows and columns of the table body
        tableBody: [
            [{ type: 'text', value: 'Marcus' }, { type: 'text', value: 'Marcus' }],
            [{ type: 'text', value: 'Boris' }, { type: 'text', value: 'Boris' }],
            [{ type: 'text', value: 'Andrew' }, { type: 'text', value: 'Andrew' }],
            [{ type: 'text', value: 'Tyresse' }, { type: 'text', value: 'Tyresse' }],
        ],
        // list of columns to be rendered in the table footer
        tableFooter: [{ type: 'text', value: 'People' }, { type: 'text', value: 'Image' }],
        // custom style for the table header
        tableHeaderStyle: { backgroundColor: 'red', color: 'white' },
        // custom style for the table body
        tableBodyStyle: { 'border': '0.5px solid #ddd' },
        // custom style for the table footer
        tableFooterStyle: { backgroundColor: '#000', color: 'white' },
    },
]

export function print80mm() {
    PosPrinter.print(data as any, options as any)
        .then(console.log)
        .catch((error) => {
            console.error(error);
        });
}