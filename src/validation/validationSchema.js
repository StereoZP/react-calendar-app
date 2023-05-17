import * as yup from "yup";

export const validationSchema = yup.object().shape({
    title: yup.string().min(2, 'Min size 2 letters').max(10, 'Max size 10 letters').required('Add title'),
    body:yup.string().min(2, 'Min size 2 letters').max(100, 'Max size 100 letters').required('Add event'),
});

export const validationSchemaConfirm = yup.object().shape({
    newTitle: yup.string().max(10, 'Max size 10 letters').min(1, 'Add title').required(),
    newBody:yup.string().min(1, 'Add event').required(),
});