const reader = require('xlsx')
// Reading our test file
const file = reader.readFile('./Book.xlsx')
const data = []
const sheets = file.SheetNames
for (let i = 0; i < sheets.length; i++) {
    const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[i]])
    temp.forEach((res) => {
        data.push(res)
    })
}
// Printing data
console.log(data)
const output = []
data.forEach(v => {
    output.push({
        'title': v.title,
        'image': v.image,
        'time': {
            'year': v.year,
            'ad': v.ad,
            'month': v.month,
            'day': v.day,
            'display': v.display,
            
        }
    });

})
// console.log(output)
var json = JSON.stringify(output);
console.log(json)