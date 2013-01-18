function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = A$(Ti.UI.createTableViewRow({
        backgroundColor: "transparent",
        transparentBackground: !0,
        id: "row"
    }), "TableViewRow", null);
    $.addTopLevelView($.__views.row);
    $.__views.__alloyId2 = A$(Ti.UI.createView({
        backgroundColor: "#c9c9c9",
        top: 12,
        right: 8,
        left: 11,
        bottom: 5,
        borderRadius: 4,
        layout: "vertical",
        id: "__alloyId2"
    }), "View", $.__views.row);
    $.__views.row.add($.__views.__alloyId2);
    $.__views.newsItemView = A$(Ti.UI.createView({
        layout: "vertical",
        left: 10,
        top: 10,
        bottom: 5,
        right: 10,
        backgroundColor: "white",
        borderRadius: 4,
        borderColor: "#dedede",
        borderWidth: 0,
        id: "newsItemView"
    }), "View", $.__views.row);
    $.__views.row.add($.__views.newsItemView);
    $.__views.thumbnail = A$(Ti.UI.createImageView({
        id: "thumbnail"
    }), "ImageView", $.__views.newsItemView);
    $.__views.newsItemView.add($.__views.thumbnail);
    $.__views.newsStoryHeadline = A$(Ti.UI.createLabel({
        height: 46,
        color: "#000000",
        top: 6,
        left: 8,
        right: 8,
        font: {
            fontSize: 18,
            fontFamily: "DINMittelschriftStd"
        },
        id: "newsStoryHeadline"
    }), "Label", $.__views.newsItemView);
    $.__views.newsItemView.add($.__views.newsStoryHeadline);
    $.__views.mewsStoryHeadlineBorder = A$(Ti.UI.createView({
        id: "mewsStoryHeadlineBorder"
    }), "View", $.__views.newsItemView);
    $.__views.newsItemView.add($.__views.mewsStoryHeadlineBorder);
    $.__views.newsExcerptView = A$(Ti.UI.createLabel({
        height: 60,
        left: 8,
        right: 8,
        top: 2,
        color: "#888888",
        font: {
            fontSize: 14,
            fontFamily: "SourceSansPro-Regular"
        },
        id: "newsExcerptView"
    }), "Label", $.__views.newsItemView);
    $.__views.newsItemView.add($.__views.newsExcerptView);
    $.__views.newsMetaView = A$(Ti.UI.createView({
        height: 22,
        backgroundColor: "#dedede",
        left: 0,
        right: 0,
        top: 5,
        id: "newsMetaView"
    }), "View", $.__views.newsItemView);
    $.__views.newsItemView.add($.__views.newsMetaView);
    $.__views.newsDate = A$(Ti.UI.createLabel({
        color: "#777777",
        top: 2,
        left: 8,
        font: {
            fontSize: 14
        },
        id: "newsDate"
    }), "Label", $.__views.newsMetaView);
    $.__views.newsMetaView.add($.__views.newsDate);
    $.__views.newsAuthor = A$(Ti.UI.createLabel({
        color: "#777777",
        top: 2,
        right: 8,
        font: {
            fontSize: 13
        },
        id: "newsAuthor"
    }), "Label", $.__views.newsMetaView);
    $.__views.newsMetaView.add($.__views.newsAuthor);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.thumbnail.image = args.thumbnailURL;
    $.newsStoryHeadline.text = args.headline || "";
    $.newsStoryExcerptView.text = args.excerpt || "";
    $.newsDate.text = args.date || "";
    $.newsAuthor.text = args.author || "";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;