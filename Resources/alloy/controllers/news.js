function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.news = A$(Ti.UI.createWindow({
        id: "news"
    }), "Window", null);
    $.addTopLevelView($.__views.news);
    $.__views.activeSection = A$(Ti.UI.createTableViewSection({
        id: "activeSection"
    }), "TableViewSection", null);
    var __alloyId1 = [];
    __alloyId1.push($.__views.activeSection);
    $.__views.jobsTable = A$(Ti.UI.createTableView({
        data: __alloyId1,
        id: "jobsTable"
    }), "TableView", $.__views.news);
    $.__views.news.add($.__views.jobsTable);
    onRowClick ? $.__views.jobsTable.on("click", onRowClick) : __defers["$.__views.jobsTable!click!onRowClick"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.jobsTable!click!onRowClick"] && $.__views.jobsTable.on("click", onRowClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;