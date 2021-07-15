import moment from "../../utils/moment.min"

Page({
  data: {
    logs: []
  },
  onLoad: function() {
    console.log(moment().format("YYYY-MM-DD HH:mm:ss"))
  }
})