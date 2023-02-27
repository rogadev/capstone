import { render, fireEvent, screen } from '@testing-library/svelte';
import ThemeToggle from './ThemeToggle.svelte';
import { getMode } from '$lib/stores/colorTheme.ts';

describe('Test Component ThemeToggle.svelte', async () => {
  it('We can see the toggle button on the screen.', async () => {
    render(ThemeToggle);
    // expect button of title "Toggle Theme" to be in the document
    expect(screen.getByTitle('Toggle Theme')).toBeInTheDocument();
  });
  it('We can click the toggle button.', async () => {
    render(ThemeToggle);
    // click the button
    fireEvent.click(screen.getByTitle('Toggle Theme'));
    // expect button of title "Toggle Theme" to be in the document
    expect(screen.getByTitle('Toggle Theme')).toBeInTheDocument();
  });
  it('The theme toggles when clicked.', async () => {
    render(ThemeToggle, { mode: 'dark' });
    // get the current theme
    const currentTheme = getMode();
    // click the button
    fireEvent.click(screen.getByTitle('Toggle Theme'));
    // expect the theme to be different from the original
    const expectedTheme = currentTheme === 'dark' ? 'light' : 'dark';
    expect(getMode()).toBe(expectedTheme);
  });
  it('Theme is toggled back and forth when clicked twice.', async () => {
    render(ThemeToggle, { mode: 'dark' });
    // get the current theme
    const currentTheme = getMode();
    // click the button
    fireEvent.click(screen.getByTitle('Toggle Theme'));
    // expect the theme to be different from the original
    const expectedTheme = currentTheme === 'dark' ? 'light' : 'dark';
    expect(getMode()).toBe(expectedTheme);
    // click the button again
    fireEvent.click(screen.getByTitle('Toggle Theme'));
    // expect the theme to be the same as the original
    expect(getMode()).toBe(currentTheme);
  });
});
