import api from "./api";



export const getContactInfo = async (idInstance, apiTokenInstance, chatId) => {
  const response = await api
    .post(`/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`,
      {
        chatId
      });
  return response.data;
}

export const sendMessage = async (idInstance, apiTokenInstance, chatId, message) => {
  const response = await api
    .post(`/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
      {
        chatId,
        message
      });
  return response.data;
}


export const receiveNotification = async (idInstance, apiTokenInstance) => {
  const response = await api
    .get(`/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`)
  return response.data;
}

export const deleteNotification = async (idInstance, apiTokenInstance, receiptId) => {
  const response = await api
    .delete(`/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`);

  return response.data;
}





