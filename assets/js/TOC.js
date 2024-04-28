document.getElementById('toggle').addEventListener('click', function() {
    var tocList = document.querySelector('#TableOfContents ul');
    if (tocList.style.display === 'none') {
        tocList.style.display = 'block'; // 展開列表
        this.textContent = '▼'; // 更改箭頭方向
    } else {
        tocList.style.display = 'none'; // 收縮列表
        this.textContent = '▶'; // 更改箭頭方向
    }
});
