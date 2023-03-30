const themeStore = useThemeStore();

export function useTheme() {
  const updateTheme = () => {
    useHead({
      htmlAttrs: {
        'data-theme': themeStore.darkMode ? 'dracula' : 'light',
        class: themeStore.darkMode ? 'dark' : 'light',
      },
    });
  };

  const toggleTheme = () => {
    themeStore.toggleTheme();
    updateTheme();
  };

  updateTheme();

  return { toggleTheme };
}
