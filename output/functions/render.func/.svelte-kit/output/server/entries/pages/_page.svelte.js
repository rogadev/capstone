import { c as create_ssr_component, v as validate_component, b as subscribe } from "../../chunks/index2.js";
import { p as page } from "../../chunks/stores.js";
import { I as Icon } from "../../chunks/Icon.js";
const Auth = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `

<section class="${"h-screen"}"><div class="${"px-6 h-full text-gray-900"}"><div class="${"border flex flex-col items-center gap-4 pt-8 pb-9 rounded-lg shadow w-3/5 mx-auto mt-10"}"><h1 class="${"text-3xl font-semibold"}">Welcome</h1>
			<form method="${"POST"}"><button class="${"flex flex-col gap-2 items-center text-lg font-semibold px-8 py-3 rounded-lg shadow bg-gray-100 hover:bg-gray-200 "}" formaction="${"?/login&provider=google"}">Login
					${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "logos:google-icon",
      height: "30px",
      class: "mb-2"
    },
    {},
    {}
  )}</button></form></div></div></section>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let session;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  session = $page.data.session;
  $$unsubscribe_page();
  return `${!session ? `${validate_component(Auth, "Auth").$$render($$result, {}, {}, {})}` : ``}`;
});
export {
  Page as default
};
