import { c as create_ssr_component, b as subscribe, d as add_attribute, v as validate_component, e as escape, f as each } from "../../chunks/index2.js";
import "../../chunks/db.js";
import { p as page } from "../../chunks/stores.js";
import { I as Icon } from "../../chunks/Icon.js";
const app = "";
const NavbarLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { href } = $$props;
  let { icon } = $$props;
  let { name } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  $$unsubscribe_page();
  return `<a${add_attribute("href", href, 0)}${add_attribute(
    "class",
    $page.url.pathname === href ? "px-3 py-2 text-sm font-medium text-white bg-blue-900 rounded-md shadow hover:bg-blue-700 hover:shadow-lg" : "px-3 py-2 text-sm font-medium text-blue-900 bg-white rounded-md shadow hover:bg-blue-100 hover:shadow-lg",
    0
  )}><div class="${"flex items-center gap-2"}">${icon ? `${validate_component(Icon, "Icon").$$render($$result, { icon }, {}, {})}` : ``}
		<span class="${"hidden lg:block"}">${escape(name)}</span></div></a>

${``}`;
});
const NavbarLinks = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let session;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { links } = $$props;
  const reversedLinks = links.slice().reverse();
  if ($$props.links === void 0 && $$bindings.links && links !== void 0)
    $$bindings.links(links);
  session = $page.data.session;
  $$unsubscribe_page();
  return `<div class="${"flex-wrap hidden md:flex md:items-center md:gap-3 md:flex-row-reverse"}">${session ? `${each(reversedLinks, ({ name, icon, href }) => {
    return `${validate_component(NavbarLink, "NavbarLink").$$render($$result, { href, icon, name }, {}, {})}`;
  })}` : ``}</div>`;
});
const NavbarNavigation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let session;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const links = [
    {
      name: "Dashboard",
      icon: "mdi:chart-line",
      href: "/dashboard"
    },
    {
      name: "Properties",
      icon: "mdi:home",
      href: "/properties"
    },
    {
      name: "Customers",
      icon: "mdi:account-group",
      href: "/customers"
    },
    {
      name: "Evaluations",
      icon: "mdi:clipboard-check",
      href: "/evaluations"
    },
    {
      name: "Quotes",
      icon: "mdi:file-document-box",
      href: "/quotes"
    },
    {
      name: "Price Sheets",
      icon: "mdi:file-document",
      href: "/price-sheets"
    }
  ];
  session = $page.data.session;
  $$unsubscribe_page();
  return `${session ? `<div class="${"flex flex-row gap-4"}">${validate_component(NavbarLinks, "NavbarLinks").$$render($$result, { links }, {}, {})}
		
		<div class="${"flex flex-row items-center gap-2 md:hidden"}"><button type="${"button"}" title="${"Menu"}" class="${"text-2xl text-blue-900 hover:text-blue-700"}"><div class="${"p-1 bg-white border rounded shadow hover:bg-blue-600 hover:text-white hover:shadow-none focus:outline-none focus:bg-blue-600 focus:text-white focus:shadow-inner"}">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:menu" }, {}, {})}</div></button>
			${``}</div>
		<div id="${"account"}" class="${"flex flex-row items-center gap-2"}"><a href="${"/profile"}" title="${"Profile"}" class="${"text-2xl text-blue-900 hover:text-blue-700"}">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:user-circle" }, {}, {})}</a>
			<button type="${"button"}" title="${"Logout"}" class="${"text-2xl text-blue-900 hover:text-blue-700"}">${validate_component(Icon, "Icon").$$render($$result, { icon: "mdi:logout" }, {}, {})}</button></div></div>` : ``}`;
});
const NavbarBrand = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let session;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  session = $page.data.session;
  $$unsubscribe_page();
  return `<div id="${"brand"}"><a${add_attribute("href", session ? "/dashboard" : "/", 0)} class="${"flex flex-row gap-2 items-center"}"><img src="${"https://a.storyblok.com/f/192938/512x512/384274f919/app-logo.png/m/40x0/filters:format(webp)"}" alt="${"logo"}" class="${"p-1 h-[40px]"}">
		<span class="${"sm:block text-3xl font-semibold " + escape(session ? "hidden" : "block", true)}">EzEval</span></a></div>`;
});
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"w-full py-3 m-0 border-b bg-slate-100"}"><div class="${"w-5/6 mx-auto"}"><div class="${"flex flex-row items-center justify-between"}">${validate_component(NavbarBrand, "NavbarBrand").$$render($$result, {}, {}, {})}
			${validate_component(NavbarNavigation, "NavbarNavigation").$$render($$result, {}, {}, {})}</div></div></div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}
<div class="${"w-5/6 pt-4 mx-auto"}">${slots.default ? slots.default({}) : ``}</div>`;
});
export {
  Layout as default
};
