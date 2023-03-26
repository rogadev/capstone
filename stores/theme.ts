export const useThemeStore = defineStore('theme', () => {
  const colorMode = useColorMode();
  const mode = ref<'light' | 'dark'>(colorMode.value === 'light' ? 'light' : 'dark');
  const theme = ref<'dracula' | 'light'>(mode.value === 'light' ? 'light' : 'dracula');
  const darkMode = computed(() => mode.value === 'dark');

  const toggleTheme = () => {
    mode.value = mode.value === 'light' ? 'dark' : 'light';
    theme.value = mode.value === 'light' ? 'light' : 'dracula';
    useHead({
      htmlAttrs: {
        class: mode.value,
        "data-theme": theme.value
      },
    });
  };

  return { mode, theme, darkMode, toggleTheme };
});