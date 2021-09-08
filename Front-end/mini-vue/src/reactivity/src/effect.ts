let activeEffect: ReactiveEffect
class ReactiveEffect{
    private _fn: Function;
    constructor(fn:Function){
        this._fn=fn
    }
    run(){
        activeEffect=this
        this._fn()
    }
}
/**
 * 副作用函数
 * @param fn 要执行的副作用 注意: 默认自执行一次 fn
 */
export function effect(fn: Function){

    const _effect = new ReactiveEffect(fn)

    _effect.run()
}

// TODO 这一段依赖收集的逻辑关系 需要多复习
const targetMap = new Map()
/**
 * 依赖收集
 * @param target 
 * @param key 
 */ 
export function track(target:object,key:unknown){
    /* 依赖对应关系: target -> key -> dep */
    let depsMap = targetMap.get(target)
    if(!depsMap){
        depsMap = new Map()
        targetMap.set(target,depsMap)
    }
    let dep = depsMap.get(key)
    if(!dep){
        dep = new Set()
        depsMap.set(key,dep)
    }
    dep.add(activeEffect)

}

/**
 * 触发依赖执行
 */
export function  trigger(target:object,key:unknown){
    let depsMap = targetMap.get(target)
    let dep = depsMap.get(key)

    for (const effect of dep) {
        if(effect)effect?.run()
    }
}