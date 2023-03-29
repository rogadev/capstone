export const useThemeStore = defineStore('theme', () => {
  const mode: Ref<'dark' | 'light'> = ref('dark');
  const darkMode = computed(() => mode.value === 'dark');

  const updateTheme = () => {
    useHead({
      htmlAttrs: {
        "data-theme": mode.value === 'dark' ? 'dracula' : 'light',
        class: mode.value,
      },
    });
  };

  updateTheme();

  const toggleTheme = () => {
    mode.value = mode.value === 'dark' ? 'light' : 'dark';
    updateTheme();
  };

  return { darkMode, toggleTheme, updateTheme };
});