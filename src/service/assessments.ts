import {useMutation, useQuery, useQueryClient} from "react-query";
import {getAxiosInstance} from "../infrastructure/axios";
import { BlobServiceClient, ContainerClient} from '@azure/storage-blob';

const sasToken = 'sv=2020-02-10&ss=bfqt&srt=sco&sp=rwdlacupx&se=2022-06-01T00:23:03Z&st=2021-03-10T17:23:03Z&spr=https,http&sig=%2B27gu9tt7u5Q5d%2FnJhXG%2B4Efzi1jEpo5%2BBXb4ONE%2Fps%3D'; // Fill string with your SAS token
const containerName = `videos`;
const baseURL='https://wupiter-backend.azurewebsites.net/api';
export const getAssessments = async () => {
  const axios = await getAxiosInstance();
  const data= await axios.get(`${baseURL}/assessments`).then(res=>{
    return res.data;
  });
  return data;
};
export const getAssessment = async (id) => {
  const axios = await getAxiosInstance();
  const data= await axios.get(`${baseURL}/assessments/${id}`).then(res=>{
    return res.data;
  });
  return data;
};
export const getAssessmentForAttempt = async (id) => {
  const axios = await getAxiosInstance();
  const data= await axios.get(`${baseURL}/attempts/${id}/assessment`).then(res=>{
    return res.data;
  });
  return data;
};
export const createAssessment = async (assessment) => {
  assessment.welcomeVideoUrl="";
  const axios = await getAxiosInstance();
  const data= await axios.post(`${baseURL}/assessments/`,assessment).then(res=>{
    return res.data;
  });
  return data;
};
export const deleteAssessment = async (id) => {
  const axios = await getAxiosInstance();
  const data= await axios.delete(`${baseURL}/api/assessments/${id}`).then(res=>{
    return res.data;
  });
  return data;
};
export const updateAssessment = async (assessment) => {
  const axios = await getAxiosInstance();
  const data= await axios.put(`${baseURL}/assessments/${assessment.id}`,assessment).then(res=>{
    return res.data;
  });
  return data;
};
export const getQuestions = async (id) => {
  const axios = await getAxiosInstance();
  const data= await axios.get(`${baseURL}/assessments/${id}/questions`).then(res=>{
    return res.data;
  });
  return data;
};

export const getQuestion = async (id) => {
  const axios = await getAxiosInstance();
  const data= await axios.get(`${baseURL}/questions/${id}`).then(res=>{
    return res.data;
  });
  return data;
};
export const createQuestion = async (question) => {
  const axios = await getAxiosInstance();
  const data= await axios.post(`${baseURL}/questions/`,question).then(res=>{
    return res.data;
  });
  return data;
};
export const postAnswer = async (answer) => {
  const axios = await getAxiosInstance();
  const data= await axios.post(`${baseURL}/answers/`,answer).then(res=>{
    return res.data;
  });
  return data;
};
export const updateQuestion = async (question) => {
  const axios = await getAxiosInstance();
  const data= await axios.put(`${baseURL}/questions/${question.id}`,question).then(res=>{
    return res.data;
  });
  return data;
};
export const deleteQuestion = async (id) => {
  const axios = await getAxiosInstance();
  const data= await axios.delete(`${baseURL}/questions/${id}`).then(res=>{
    return res.data;
  });
  return data;
};
export const getAttempt = async (attemptId) => {
  const axios = await getAxiosInstance();
  const data= await axios.get(`${baseURL}/attempts/${attemptId}`).then(res=>{
    return res.data;
  });
  return data;
};
export const getSubmissions = async (assessmentId) => {
  const axios = await getAxiosInstance();
  const data= await axios.get(`${baseURL}/assessments/${assessmentId}/completed`).then(res=>{
    return res.data;
  });
  return data;
};
export const getSubmission = async (assessmentId,attemptId) => {
  const axios = await getAxiosInstance();
  const data= await axios.get(`${baseURL}/assessments/${assessmentId}/submissions/${attemptId}`).then(res=>{
    return res.data;
  });
  return data;
};
export const completeTest = async (attemptId) => {
  const axios = await getAxiosInstance();
  let attempt=await getAttempt(attemptId);
  attempt.attempted=true;
  const data= await axios.put(`${baseURL}/attempts/${attemptId}`,attempt).then(res=>{
    return res.data;
  });
  return data;
};
export const sendInvitationForAssessment = async (attempt) => {
  const axios = await getAxiosInstance();
  attempt.attempted=false;
  attempt.score=0;
  const data= await axios.post(`${baseURL}/attempts/`,attempt).then(res=>{
    return res.data;
  });
  return data;
};
export const uploadVideo = async (file: File | null): Promise<string[]> => {
  if (!file) return [];

  // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
  const blobService = new BlobServiceClient(
    `https://wupiter1.blob.core.windows.net/?${sasToken}`
  );

  // get Container - full public read access
  const containerClient: ContainerClient = blobService.getContainerClient(containerName);

  // upload file
  await createBlobInContainer(containerClient, file);

};

const createBlobInContainer = async (containerClient: ContainerClient, file: File) => {

  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadBrowserData(file, options);
}
