import { effect, stop } from '../src/effect'
import { reactive, isReactive } from '../src/reactive'
describe('reactive', () => {
    it('happy path', () => {
        const original = { foo: 1 }
        const observed = reactive(original)
        expect(observed).not.toBe(original) // 包装后的对象与源对象不同
        expect(observed.foo).toBe(1) // 可以获取到被包装对象内的值 与源对象对应的值一致
        expect(isReactive(original)).toBe(false) // 验证 original 不是是一个 reactive
        expect(isReactive(observed)).toBe(true) // 验证 observed 是一个 reactive
    })

    it('nested reactives', () => {
        const original = {
            text: 'some text',
            nested: {
                foo: 1
            },
            array: [{ bar: 2 }]
        }
        const observed = reactive(original)
        // 只有嵌套的对象被转换为 reactive
        expect(isReactive(observed.text)).toBe(false)
        expect(isReactive(observed.nested)).toBe(true)
        expect(isReactive(observed.array)).toBe(true)
        expect(isReactive(observed.array[0])).toBe(true)
    })
})
