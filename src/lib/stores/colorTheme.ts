import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const mode = writable('light');

export const toggleMode = () => {
	mode.update((current) => (current === 'dark' ? 'light' : 'dark'));
};

export const setMode = (theme: 'dark' | 'light') => {
	mode.set(theme);
};

export const useBrowserPreference = () => {
	if (browser) {
		const lightPreference = window.matchMedia('(prefers-color-scheme: light)').matches;
		const darkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const preference = darkPreference ? 'dark' : lightPreference ? 'light' : 'dark';
		setMode(preference);
	}
};

export const getMode = () => {
	let currentMode;
	const unsubscribe = mode.subscribe((value) => {
		currentMode = value;
	});
	unsubscribe();
	return currentMode;
};
