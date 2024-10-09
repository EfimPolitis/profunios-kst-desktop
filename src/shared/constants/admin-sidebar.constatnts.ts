import { URL_PAGES } from '@shared/config/url.config'
import {
  BookCopy,
  CalendarRange,
  FileSpreadsheet,
  Newspaper,
  SquareGanttChart,
  Users
} from 'lucide-react'

export const AdminSidebar = [
  {
    link: URL_PAGES.MANAGE_EVENTS,
    name: 'Мероприятия',
    icon: CalendarRange
  },
  {
    link: URL_PAGES.MANAGE_USERS,
    name: 'Пользователи',
    icon: Users
  },
  {
    link: URL_PAGES.MANAGE_RESERVATIONS,
    name: 'Бронь',
    icon: SquareGanttChart
  },
  {
    link: URL_PAGES.MANAGE_APPLICATIONS,
    name: 'Заявки',
    icon: SquareGanttChart
  },
  {
    link: URL_PAGES.MANAGE_NEWS,
    name: 'Новости',
    icon: Newspaper
  },
  {
    link: URL_PAGES.MANAGE_CATEGORY,
    name: 'Категории',
    icon: BookCopy
  },
  {
    link: URL_PAGES.MANAGE_REPORTS,
    name: 'Отчёты',
    icon: FileSpreadsheet
  }
]
