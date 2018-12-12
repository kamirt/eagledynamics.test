export class Utils {}

Utils.install = function (Vue, options) {
  Vue.prototype.$addClass = (el, clName) => {
    const className = el.className
    if (el.tagName === 'svg') return
    el.className = className.length > 0
      ? className.concat(` ${clName}`)
      : clName
    return el.className
  }
  Vue.prototype.$removeClass = (el, clName) => {
    if (el.tagName === 'svg') return
    const classArr = el.className.split(' ')
    if (classArr.length < 2) {
      el.className = ''
      return ''
    }
    el.className = classArr.filter((cl) => cl !== clName).join(' ')
    return el.className
  }
}
