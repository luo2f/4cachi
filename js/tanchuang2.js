$("#dialog-1").on("click", function () {
	Helper.ui.dialog({
		title: "图库",
		width: 600,
		contentHeight: "100%",
		contentScroll: false,
		draggable: true,
		iframe: "./pic/index.html"
	});
})
$("#dialog-2").on("click", function () {
	Helper.ui.dialog({
		title: "视频库",
		width: 600,
		contentHeight: "100%",
		contentScroll: false,
		draggable: true,
		iframe: "./video/index.html"
	});
})
