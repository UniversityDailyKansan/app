function Controller() {
    function onRowClick(e) {
        var w = Ti.UI.createWindow({
            title: section
        }), twitter_url = "http://twitter.com/intent/tweet?text=" + e.row.headline + "&url=" + e.row.url + "&related=udk_news&via=udk_news", twitter_button = "http://kansan.com/assets/css/images/social/circle-twitter.png", twitter_share = "<a href='" + twitter_url + "' title='" + e.row.headline + "'><img src='" + twitter_button + "' height='20' width='20' alt='Share '" + e.row.headline + "' on Twitter' /></a>", facebook_button = "http://kansan.com/assets/css/images/social/circle-facebook.png", facebook_url = "http://www.facebook.com/sharer/sharer.php?u=" + e.row.url + "&t=" + e.row.headline, facebook_share = "<a href='" + facebook_url + "' title='" + e.row.headline + "'><img src='" + facebook_button + "' height='20' width='20' alt='Share '" + e.row.headline + "' on Facebook' /></a>", articleContent = "<body style='" + font1 + "; width:96%; margin:0 auto;font-size:15px;'><h3 style='font-size:25px;text-transform:uppercase;color:#358CCB;margin-top:10px;line-height:14px" + font2 + "'>" + e.row.headline + "</h3><div style='font-size:16px;color:#999999;margin-top:-18px;'>By " + e.row.author;
        articleContent += "20 | " + e.row.date + twitter_share + facebook_share + "</div>" + e.row.articleCopy + "</body>";
        var wb = Ti.UI.createWebView({
            html: "<html><head><link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:700|Source+Sans+Pro:300,400' rel='stylesheet' type='text/css'><style>img{ max-width:100%; }</style><meta name='viewport' content='width=device-width, initial-scale=1.0' /></head>" + articleContent,
            bottom: 0,
            width: "100%",
            scalesPageToFit: !0
        });
        w.add(wb);
        var b = Titanium.UI.createButton({
            title: "Close",
            style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
        });
        w.setLeftNavButton(b);
        b.addEventListener("click", function() {
            w.close();
        });
        w.open({
            modal: !0
        });
    }
    function setTableData(data) {
        var rawData = [];
        _.each(data, function(story) {
            var args = {
                url: story.url,
                articleCopy: story.articleCopy,
                theTags: story.theTags
            }, row = Alloy.getController("newsRow", args).getView();
            rawData.push(row);
        });
        $.table.setData(rawData);
    }
    function retrieveNews(feed) {
        var xhr = Ti.Network.createHTTPClient({
            onload: function(e) {
                processBookData(this.responseText);
            },
            onerror: function(e) {
                Titanium.API.log(xhr.onerror);
                var no_internet = Titanium.UI.createAlertDialog({
                    title: "No Internet Connection",
                    message: "Sorry, but you're not connected to the internet, and we can't load the map information or feed view. Please try again when a internet connection is avaiable.",
                    buttonNames: [ "Shucks" ]
                });
                no_internet.show();
            },
            timeout: 5000
        });
        xhr.open("GET", "http://kansan.com/api/get_category_posts/?slug=" + feed);
        xhr.send();
    }
    function processBookData(feedData) {
        var data = [];
        try {
            var items = JSON.parse(feedData).posts;
        } catch (e) {
            alert("Invalid response from server. Try again.");
            return;
        }
        for (var i = 0; i < stories.length; i++) {
            var headline = stories[i].title, excerpt = stories[i].excerpt;
            excerpt = excerpt.replace("&nbsp;", " ");
            excerpt = excerpt.replace("&#8220;", "\"");
            excerpt = excerpt.replace("&#8221;", "\"");
            excerpt = excerpt.replace("&#8243;", "\"");
            excerpt = excerpt.replace("&#8217;", "'");
            excerpt = excerpt.replace("&#8216;", "'");
            headline = headline.replace("&#8220;", "\"");
            headline = headline.replace("&#8221;", "\"");
            headline = headline.replace("&#8243;", "\"");
            headline = headline.replace("&#8217;", "'");
            headline = headline.replace("&#8216;", "'");
            var date_raw = stories[i].date, categories = stories[i].categories, thumbheight = 0, thumbnail = "";
            if (stories[i].attachments) {
                var attMeta = stories[i].attachments;
                for (var v = 0; v < attMeta.length; v++) if (attMeta[v].mime_type === "image/png" || attMeta[v].mime_type === "image/jpg" || attMeta[v].mime_type === "image/jpeg" || attMeta[v].mime_type === "image/gif") {
                    thumbnail = attMeta[v].images.medium.url;
                    thumbheight = attMeta[v].images.medium.height - 12;
                }
            }
            var tags = stories[i].tags, tagged = "";
            for (var t = 0; t < tags.length; t++) tagged += tags[t].title + ", ";
            var month = date_raw.substring(5, 7);
            month = month.replace("01", "Jan");
            month = month.replace("02", "Feb");
            month = month.replace("03", "March");
            month = month.replace("04", "April");
            month = month.replace("05", "May");
            month = month.replace("06", "June");
            month = month.replace("07", "July");
            month = month.replace("08", "Aug");
            month = month.replace("09", "Sept");
            month = month.replace("10", "Oct");
            month = month.replace("11", "Nov");
            month = month.replace("12", "Dec");
            var day = date_raw.substring(8, 10), date = month + " " + day, row = Ti.UI.createTableViewRow({
                height: 159 + thumbheight
            }), newsitem_view = Ti.UI.createView({
                height: 144 + thumbheight
            }), newsitem_shadow = Ti.UI.createView({
                height: 144 + thumbheight
            });
            if (thumbnail) {
                story_headline.top = 4;
                excerpt_view.top = 0;
                meta_view.top = 2;
            }
            data.push({
                excerpt: excerpt,
                url: stories[i].url,
                date: date,
                headline: headline,
                articleCopy: stories[i].content,
                author: stories[i].author.nickname,
                theTags: tagged,
                thumbnailURL: thumbnail
            });
        }
        setTableData(data);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = A$(Ti.UI.createWindow({
        backgroundColor: "white",
        id: "index"
    }), "Window", null);
    $.addTopLevelView($.__views.index);
    $.__views.callXhr = A$(Ti.UI.createButton({
        top: 5,
        width: 250,
        height: 30,
        title: "XHR Call",
        id: "callXhr"
    }), "Button", $.__views.index);
    $.__views.index.add($.__views.callXhr);
    $.__views.table = A$(Ti.UI.createTableView({
        id: "table"
    }), "TableView", $.__views.index);
    $.__views.index.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.callXhr.addEventListener("click", function(e) {
        retrieveNews("news");
    });
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A, $model;

module.exports = Controller;