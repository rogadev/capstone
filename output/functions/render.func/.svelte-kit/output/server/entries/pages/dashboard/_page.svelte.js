import { c as create_ssr_component, d as add_attribute, v as validate_component, f as each, e as escape, b as subscribe } from "../../../chunks/index2.js";
import { p as page } from "../../../chunks/stores.js";
import { I as Icon } from "../../../chunks/Icon.js";
const DashboardActionBarLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { href } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  return `<a${add_attribute("href", href, 0)} class="${"p-1 text-white bg-blue-900 rounded shadow font hover:bg-blue-700 hover:shadow-lg"}">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "mdi:plus",
      class: "hidden mr-2 font-semibold text-white lg:inline-block"
    },
    {},
    {}
  )}
	${slots.default ? slots.default({}) : ``}</a>`;
});
const DashboardActionBar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const actions = [
    {
      href: "/properties/new",
      label: "Property"
    },
    {
      href: "/customers/new",
      label: "Customer"
    },
    {
      href: "/evaluations/new",
      label: "Evaluation"
    },
    { href: "/quotes/new", label: "Quote" },
    {
      href: "/price-sheets/new",
      label: "Price Sheet"
    }
  ];
  return `<div><h3 class="${"my-4 text-2xl font-semibold text-center sm:text-left"}">Quick Links</h3>
	<div id="${"dashboard-options"}" class="${"grid grid-cols-2 gap-4 text-center md:grid-cols-3 lg:grid-cols-5"}">${each(actions, ({ href, label }) => {
    return `${validate_component(DashboardActionBarLink, "DashboardActionBarLink").$$render($$result, { href }, {}, {
      default: () => {
        return `${escape(label)}`;
      }
    })}`;
  })}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  email = $page.data.session?.user.email;
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-mc1kyo_START -->${$$result.title = `<title>Dashboard</title>`, ""}<!-- HEAD_svelte-mc1kyo_END -->`, ""}

<div class="${"flex flex-row items-baseline justify-between"}"><h1 class="${"my-8 text-3xl font-semibold"}">Dashboard</h1>
	<div><span class="${"hidden text-2xl font-semibold md:block"}">Welcome back, </span>
		<a href="${"/profile"}" title="${"Profile"}"><span class="${"text-2xl font-semibold text-blue-500"}">${escape(email)}</span></a></div></div>

${validate_component(DashboardActionBar, "DashboardActionBar").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
