import React from "react";
import { Link } from "react-router-dom";

export default function NavItem({ to, children, ...rest }) {
  if (to.startsWith("/")) return <Link to={to} {...rest}>{children}</Link>;
  const external = to.startsWith("http");
  return (
    <a href={to} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {children}
    </a>
  );
}