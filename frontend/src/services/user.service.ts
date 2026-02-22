import { api } from '../lib/api';

export const userService = {
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data.user;
  },
  updateAssessment: async (data: any) => {
    const response = await api.patch('/auth/assessment', data);
    return response.data.user;
  },
};
