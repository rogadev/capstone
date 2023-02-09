import { c as create_ssr_component, b as subscribe, e as escape } from "../../../chunks/index2.js";
import { p as page } from "../../../chunks/stores.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-17k2j1r_START -->${$$result.title = `<title>EzEval | Profile | ${escape($page.data.session?.user.user_metadata.full_name)}</title>`, ""}<!-- HEAD_svelte-17k2j1r_END -->`, ""}

<p class="${"text-center mt-8 text-3xl font-semibold"}">Welcome, ${escape($page.data.session?.user.email)}</p>`;
});
export {
  Page as default
};
