import { createEffect, createSignal, type Accessor, createMemo } from 'solid-js'

const createSvelteSignal = <T>(value: T) => {
	const [signal, setSignal] = createSignal<T>(value)
  Object.assign(signal, {
		set: (newValue: Exclude<T, Function> | ((prev: T) => T)) => setSignal(newValue),
		subscribe: (fn: (value: T) => () => void) => {
			createEffect(() => fn(signal()))
			return () => {}
		},
	})
	return [signal as Accessor<T> & {
		set: (newValue: Exclude<T, Function> | ((prev: T) => T)) => void
		subscribe: (fn: (value: T) => () => void) => void
	}, setSignal] as const
}

const createSvelteMemo = <T>(fn: () => T) => {
	const signal = createMemo(fn)
	Object.assign(signal, {
		subscribe: (fn: (value: T) => () => void) => {
			createEffect(() => fn(signal()))
			return () => {}
		},
	})
	return signal as Accessor<T> & {
		subscribe: (fn: (value: T) => () => void) => void
	}
}

export const [count, setCount] = createSvelteSignal(0)
export const double = createSvelteMemo(() => count() * 2)
