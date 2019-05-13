import React from 'react';
import { Form, Field } from 'formik';
import TextInput from './input';
import Select from './select';

const BasicForm = ({     
    values,
    touched,
    dirty,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
}) => (
    <Form>
        <Select
            value={values.order}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            error={errors.order}
            touched={touched.order}
            label="Ordernar por"
            name="order"
        />
        <Field type="text" name="keyword" placeholder="Pesquisar por palavra chave" component={TextInput} />
        <button type="submit" disabled={isSubmitting}>Filtro avançado</button>
    </Form>
);

export default BasicForm;
