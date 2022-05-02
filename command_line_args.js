process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`)
})

console.log("\n---")

// For one argument without an index name:
console.log(process.argv.slice(2)[0])

console.log("\n---")
// if args[0] is <index>=<val>, and you need to parse it. The best way to do so is by using the minimist library, which helps dealing with arguments:

const args = require('minimist')(process.argv.slice(2))
console.info(args['name']) // you need to use double dashes, e.g.--name=john
