import axios, {AxiosInstance} from "axios";
import authService from "../auth/AuthService";

import {v4 as uuidv4} from 'uuid';

export const getAxiosInstance: () => Promise<AxiosInstance> = async () => {
  let headers: any = {
    'X-Correlation-ID': uuidv4()
  };

  const identity = await authService.getIdentity();
  if (identity.accessToken) {
    localStorage.setItem("token", identity.accessToken);
    headers['Authorization'] = `Bearer ${identity.accessToken}`;
  } else {
    console.log('Token not found');
  }

  return axios.create({
    headers: headers
  });
};
