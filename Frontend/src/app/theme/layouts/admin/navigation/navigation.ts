export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'Orders',
    title: 'Quản lý bán hàng',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'OrdersList',
        title: 'Danh sách đơn hàng',
        type: 'item',
        classes: 'nav-item',
        url: '/Orders/List',
        icon: 'ti ti-credit-card',
        breadcrumbs: false
      },
      {
        id: 'Order',
        title: 'Lập đơn hàng',
        type: 'item',
        classes: 'nav-item',
        url: '/Orders/Order',
        icon: 'ti ti-shopping-cart',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'elements',
    title: 'Quản lý danh mục',
    type: 'group',
    // icon: 'icon-navigation',
    children: [
      {
        id: 'Categories',
        title: 'Loại hàng',
        type: 'item',
        classes: 'nav-item',
        url: '/Categories',
        icon: 'ti ti-archive'
      },
      {
        id: 'Suppliers',
        title: 'Nhà cung cấp',
        type: 'item',
        classes: 'nav-item',
        url: '/Suppliers',
        icon: 'ti ti-briefcase'
      },
      // {
      //   id: 'Customers',
      //   title: 'Khách hàng',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: '/Customers'
      //   // icon: 'ti ti-hierarchy-2'
      // },
      {
        id: 'Products',
        title: 'Mặt hàng',
        type: 'item',
        classes: 'nav-item',
        url: '/Products',
        icon: 'ti ti-heart'
      },
      {
        id: 'Employees',
        title: 'Nhân viên',
        type: 'item',
        classes: 'nav-item',
        url: '/Employees',
        icon: 'ti ti-user'
      }
    ]
  }
];
