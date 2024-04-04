$.hulla = new hullabaloo();
setTimeout(function () {
	$.hulla.send("欢迎访问！", "info");
}, 1000);
setTimeout(function () {
	$.hulla.send("图库和视频库可能加载稍慢", "danger");
}, 2000);
setTimeout(function () {
	$.hulla.send("如需浏览请耐心等待或到下载页下载", "warning");
}, 3000);
function d1() {
	location.href = ("./dow/photo.zip")
}
function d2() {
	location.href = ("./dow/video.zip")
}
