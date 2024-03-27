import Link from "next/link";
import { usePathname } from "next/navigation";

import style from "./nav.module.css";

function SideNav() {
  const pathname = usePathname();
  const routes = [
    {
      text: "Home",
      nav: "/management/home",
    },
    {
      text: "Products",
      nav: "/management/products",
    },
    {
      text: "Billings",
      nav: "/management/billings",
    },
    {
      text: "Users",
      nav: "/management/users",
    },
  ];

  return (
    <div className={style.sidenav}>
      {routes.map((route) => (
        <Link
          className={`${style.nav} ${
            pathname.startsWith(route.nav) ? style.active : ""
          }`}
          key={route.nav}
          href={route.nav}
        >
          {route.text}
        </Link>
      ))}
    </div>
  );
}

export default SideNav;
