var args = arguments[0] || {};
$.thumbnail.image = args.thumbnailURL;
$.newsStoryHeadline.text = args.headline || '';
$.newsStoryExcerptView.text = args.excerpt || '';
$.newsDate.text = args.date || '';
$.newsAuthor.text = args.author || '';