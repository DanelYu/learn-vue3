/** 对象属性合并 */
/** 空对象 */
const EMPTY_OBJ = {};

/** 判断是不是对象 */
const isObject = (val) => !!val && typeof val === 'object';

/** 创建组件实例 */
function createComponentInstance(vnode) {
    const type = vnode.type;
    return {
        vnode,
        type,
        render: null,
        subTree: null,
        setupState: EMPTY_OBJ
    };
}
/** 初始化组件 */
function setupComponent(instance) {
    // TODO
    // initProps()
    // initSlots()
    setupStatefulComponent(instance);
}
/** 初始化 有状态的(非函数式)组件 */
function setupStatefulComponent(instance) {
    const component = instance.type;
    const { setup } = component;
    if (setup) {
        const setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}
/** 处理组件内 setup函数 的返回值 */
function handleSetupResult(instance, setupResult) {
    // TODO setup 返回的是函数时
    // 如果 setup 返回的是对象时 将setupResult赋值给组件实例对象上的setupState
    if (isObject(setupResult)) {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
/** 组件初始化 完成 */
function finishComponentSetup(instance) {
    const Component = instance.type;
    instance.render = Component.render;
}

/**  */
function render(vnode, container) {
    // 调用 patch 方法
    patch(vnode);
}
/** 处理各种vnode */
function patch(vnode, container) {
    // TODO 处理Element类型的vnode
    // processElement()
    // 处理组件vnode
    processComponent(vnode);
}
/** 处理组件 */
const processComponent = (vnode, container) => mountComponent(vnode);
/** 挂载组件 */
const mountComponent = (vnode, container) => {
    const instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance);
};
function setupRenderEffect(instance, container) {
    const subTree = instance.render();
    patch(subTree);
}

/** 创建虚拟节点 */
function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children
    };
    return vnode;
}

/** 创建一个提供应用上下文的应用实例 */
function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            // 先把组件转化成虚拟节点 component -> VNode
            // 所有逻辑操作都会基于 VNode 做处理
            const vnode = createVNode(rootComponent);
            render(vnode);
        }
    };
}

/** 返回一个`虚拟节点` */
function h(type, props, children) {
    return createVNode(type, props, children);
}

export { createApp, h };
