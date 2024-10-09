import { ipcMain } from "electron";
import { authService } from "./services/auth/auth.service";
import { IFormData } from "@shared/types/auth.types";
import { userService } from "./services/user.service";
import { IGetData } from "@shared/types/sort.types";
import { eventService } from "./services/events.service";
import { IEventFormData } from "@shared/types/event.types";

export const ipcMainApi = () => {
  ipcMainAuth();
  ipcMainUser();
  ipcMainEvent();
};

function ipcMainAuth() {
  ipcMain.handle("auth", (_, type: "login" | "register", data: IFormData) => {
    return authService.main(type, data);
  });

  ipcMain.handle("logout", (_) => {
    authService.logout();
  });

  ipcMain.handle("getProfile", (_) => {
    userService.getProfile();
  });
}

function ipcMainUser() {
  ipcMain.handle("getUsers", (_, search: IGetData) => {
    userService.getUsers(search);
  });

  ipcMain.handle("getUser", (_, userId: string) => {
    userService.getUser(userId);
  });

  ipcMain.handle("updateUser", (_, data: IFormData, userId: string) => {
    userService.updateUser(data, userId);
  });
}

function ipcMainEvent() {
  ipcMain.handle("getEvent", (_, eventId: string) => {
    eventService.getById(eventId);
  });

  ipcMain.handle("getEvents", (_, search: IGetData) => {
    eventService.getAll(search);
  });

  ipcMain.handle("createEvent", (_, data: IEventFormData) => {
    eventService.create(data);
  });

  ipcMain.handle("updateEvent", (_, data: IEventFormData, eventId: string) => {
    eventService.update(data, eventId);
  });

  ipcMain.handle("deleteEvent", (_, eventId: string) => {
    eventService.delete(eventId);
  });
}
