import { createEffect, createSignal, type Accessor, createMemo } from 'solid-js'

const createSvelteSignal = <T>(value: T) => {
	const [signal, setSignal] = createSignal<T>(value)
	return [
		Object.assign(signal, {
			set: (newValue: Exclude<T, Function> | ((prev: T) => T)) => setSignal(newValue),
			subscribe: (fn: (value: T) => () => void) => {
				createEffect(() => fn(signal()))
				return () => {}
			},
		}),
		setSignal,
	] as const
}

const createSvelteMemo = <T>(fn: () => T) => {
	const signal = createMemo(fn)
	return Object.assign(signal, {
		subscribe: (fn: (value: T) => () => void) => {
			createEffect(() => fn(signal()))
			return () => {}
		},
	})
}

export const [count, setCount] = createSvelteSignal(0)
export const double = createSvelteMemo(() => count() * 2)
