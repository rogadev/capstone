export const useThemeStore = defineStore('theme', () => {
  const mode: Ref<'dark' | 'light'> = ref('dark');
  const darkMode = computed(() => mode.value === 'dark');

  const toggleTheme = () => {
    mode.value = mode.value === 'dark' ? 'light' : 'dark';
  };

  return { darkMode, toggleTheme };
});