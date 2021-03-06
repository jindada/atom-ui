/**
 * 开始动画
 * @param {Event} event 
 */
export default function(event) {
    event.stopPropagation();
    const points = event.touches;
    const $el = event.currentTarget;

    // 禁止执行
    if('true' === $el.dataset.rippleIsDisabled) {
        return;
    }

    const options = {
        cssNameSpace: $el.dataset.rippleCssNameSpace
    };
    const $rippleNode = $el.querySelector(`.${options.cssNameSpace}--ready`);
    if ('true' == $el.dataset.rippleCancel) {
        // 删除ripple元素
        // ie<=12 不支持, 手机端都支持
        $rippleNode.remove();
    } else {
        // 添加开始动画class
        $rippleNode.className = `${options.cssNameSpace}--start`;
    }
}