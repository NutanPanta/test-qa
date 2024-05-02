import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  useAddSliderMutation,
  useDeleteSliderMutation,
  useGetHomeDataQuery,
  useUpdateSliderMutation,
} from './app/redux/home.slice';
import { Button, CircularProgress, TextField } from '@mui/material';

const initialValues = {
  id: null,
  title: '',
  text: '',
  image: null,
};

const App = () => {
  const {
    data: homeData,
    isLoading: isLoadingHomeData,
    isSuccess: isHomeDataSuccess,
    isError: isHomeDataError,
  } = useGetHomeDataQuery('');
  const [
    addSlider,
    { isLoading: isAddingSlider, isError: isAddingSliderError },
  ] = useAddSliderMutation();

  const [editMode, setEditMode] = useState(false);

  const [deleteSlider] = useDeleteSliderMutation();

  const [updateSlider] = useUpdateSliderMutation();

  const sliders = homeData?.data?.sliders;

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      if (editMode) {
        formData.append('slider_id', values.id);
      }
      formData.append('title', values.title.trim());
      formData.append('text', values.text.trim());
      if (values.image) {
        formData.append('image', values.image);
      }

      if (editMode) {
        await updateSlider(formData);
        console.log('Slider updated successfully');
      } else {
        await addSlider(formData);
        console.log('Slider added successfully');
      }
      resetForm();
      setEditMode(false); // Reset edit mode after successful operation
    } catch (error) {
      console.error('Failed to update slider:', error);
      console.log('Error updating slider', { variant: 'error' });
    }
  };

  const handleDelete = async (slider_id) => {
    await deleteSlider({ slider_id });
    console.log('Slider deleted successfully');
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting, setFieldValue }) => (
          <Form className='grid '>
            <div className='mb-5'>
              <Field
                className='mb-2 rounded-md bg-slate-300'
                name='title'
                as={TextField}
                variant='outlined'
                placeholder='Title goes here ...'
                fullWidth
              />
              <ErrorMessage name='title' render={(msg) => <div>{msg}</div>} />
            </div>

            <div className='mb-5'>
              <Field
                className='rounded-md mb- bg-slate-300'
                name='text'
                as={TextField}
                variant='outlined'
                placeholder='Text goes here ...'
                fullWidth
              />
              <ErrorMessage name='text' render={(msg) => <div>{msg}</div>} />
            </div>

            <div className='mb-5'>
              <label htmlFor='imageUpload'>
                <Button
                  className='!bg-primary hover:!bg-blue-700/5 '
                  variant='contained'
                  component='span'
                  disabled={isSubmitting || isAddingSlider}
                >
                  Choose Image
                </Button>
              </label>
              <input
                type='file'
                id='imageUpload'
                style={{ display: 'none' }}
                onChange={(event) => {
                  if (event.target.files) {
                    setFieldValue('image', event.target.files[0]);
                  }
                }}
              />
              <ErrorMessage name='image' render={(msg) => <div>{msg}</div>} />
            </div>

            <Button
              className='!bg-primary hover:!bg-blue-700/5 '
              disabled={isSubmitting || isAddingSlider}
              type='submit'
              variant='contained'
              fullWidth
            >
              {isSubmitting || isAddingSlider ? (
                <CircularProgress size={24} />
              ) : editMode ? (
                'Update Slider'
              ) : (
                'Add Slider'
              )}
            </Button>
            {isAddingSliderError && <div>Error adding slider</div>}
          </Form>
        )}
      </Formik>
      {isHomeDataSuccess && !isHomeDataError && !isLoadingHomeData ? (
        sliders?.map((slider, id) => {
          return (
            <div key={id}>
              <div>{slider.title}</div>
              <button onClick={() => setEditMode(true)}>edit</button>
              <button onClick={() => handleDelete(slider.id)}>delete</button>
            </div>
          );
        })
      ) : (
        <div>loading</div>
      )}
    </>
  );
};

export default App;
