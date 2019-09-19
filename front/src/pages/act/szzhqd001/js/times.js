function GetWeek () {
  this.nowTime = new Date();
  this.init = function () {
    this.dayInWeek = this.nowTime.getDay();
    this.dayInWeek == 0 && (this.dayInWeek = 7);
    this.thsiWeekFirstDay =
      this.nowTime.getTime() - (this.dayInWeek - 1) * 86400000;
    return this;
  };
  this.getWeekType = function () {
    var times = [];
    for (var i = 0; i < 7; i++) {
      times.push(this.formateDate(this.thsiWeekFirstDay + i * 86400000));
    }
    return times;
  };
  this.formateDate = function (time) {
    var newTime = new Date(time);
    var day = newTime.getDate();
    return day >= 10 ? day : '0' + day;
  };
}

export default new GetWeek()
