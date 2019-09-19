import moment from "moment"

Date.prototype.toJSON = function () {
  return moment(this).format("YYYY-MM-DD HH:mm:ss")
}
