// in this file you can append custom step methods to 'I' object

module.exports = function () {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.
    seeMainWrapper () {
      this.seeHeader()
      this.seeFooter()
    },

    seeHeader () {
      this.see('explorer')
    },

    seeFooter () {
      this.see('© 2021 Diem Association')
    },

    navTo(pageName) {
      this.see(pageName, 'a')
      this.click(pageName)
    },
  })
}
