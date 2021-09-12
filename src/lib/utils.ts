import * as http from "http";
import * as fs from "fs";

export type Request = http.IncomingMessage;
export type Response = http.ServerResponse;

export const readFile = async (path) => {
    return await new Promise((resolve, reject) => {
      fs.readFile(path, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };