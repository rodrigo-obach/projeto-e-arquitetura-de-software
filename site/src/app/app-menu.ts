import { appPermissions } from "./app-permissions"

export interface MenuItem {
  key: string
  title: string
  link?: string
  permission?: string
  subMenu?: SubMenuItem[]
}

export interface SubMenuItem {
  title: string
  link: string
  permission?: string
}

export const appMenu: MenuItem[] = [
  {
    key: 'pacotes',
    title: 'Pacotes',
    link: '/pacotes',
    permission: appPermissions.pacote.ver
  },
  {
    key: 'remessas',
    title: 'Remessas',
    link: '/remessas',
    permission: appPermissions.remessa.ver
  },
  {
    key: 'usuarios',
    title: 'Usuários',
    link: '/usuarios',
    permission: appPermissions.usuario.ver
  }
]

export function getAppMenu(permissions: Set<string>) {
  return appMenu
    .map((item) => ({
      ...item,
      subMenu: item?.subMenu?.filter((subItem) => !subItem.permission || permissions.has(subItem.permission))
    }))
    .filter((item) => !item.permission || permissions.has(item.permission))
    .filter((item) => item.link || item.subMenu?.length)
}
