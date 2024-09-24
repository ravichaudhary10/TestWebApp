import React from "react";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem, MenuItemOptions } from "primereact/menuitem";

interface BreadcrumbProps {
  items: MenuItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const breadcrumbItemTemplate = (item: MenuItem, options: MenuItemOptions) => (
    <a className={options.className} href={item.url}>
      <span className={`${options.labelClassName} ${item.icon} mr-1`}></span>
      <span className={options.labelClassName}>{item.label}</span>
    </a>
  );

  const itemsWithTemplate = items.map((i) => ({
    ...i,
    template: breadcrumbItemTemplate,
  }));

  return (
    <BreadCrumb
      model={itemsWithTemplate}
      style={{ padding: 0, border: "none", height: "1.5rem" }}
    />
  );
};

export default Breadcrumb;
