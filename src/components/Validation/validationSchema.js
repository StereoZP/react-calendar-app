import * as yup from "yup";

export const validationSchema = yup.object().shape({
    title: yup.string().max(10, 'Max size 10 letters').min(1, 'Add title').required(),
    body:yup.string().min(1, 'Add event').required(),
});

export const validationSchemaConfirm = yup.object().shape({
    newTitle: yup.string().max(10, 'Max size 10 letters').min(1, 'Add title').required(),
    newBody:yup.string().min(1, 'Add event').required(),
});