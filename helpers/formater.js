"use strict";
module.exports = {
  formatCurrency(num) {
    return num.toLocaleString("id-ID", {style: "currency", currency:"IDR"})
  }
};