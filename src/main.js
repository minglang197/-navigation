const $mainList = $('.mainList')
const $lastLi = $mainList.find('.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
window.hashMap = xObject || [
    { logo: 'A', url: "https://www.acfun.cn" },
    { logo: 'B', url: "https://www.baidu.com" }
]
const reset = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}
const render = () => {
    $mainList.find('li:not(.last').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
                <div class="site">
                    <div class="logo">${node.logo}</div>
                    <div class="link">${reset(node.url)}</div>
                    <div class="close">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </div>
                </div>
        </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    });
}
render()
$('.last',).on('click', () => {
    let url = prompt('亲，请输入网址')
    if (url.indexOf('http') != 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: reset(url)[0].toUpperCase(),
        url: url
    })
    render();
})
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})