import React from 'react';
import {Modal} from "antd";
import MaskedInput from 'react-input-mask'
import {useDispatch} from "react-redux";

import {useForm, Controller} from "react-hook-form";
import './styles.scss'
import {addClients} from "../../store/asyncActions/client";

const ModalForm = ({isModalVisible, handleOk, handleCancel}) => {
  const dispatch = useDispatch();

  const {
    register,
    control,
    formState: {errors, isValid},
    handleSubmit,
    reset
  } = useForm({mode: "onChange"});

  const addItem = (text) => {
    const newItem = {
      key: new Date().getUTCMilliseconds(),
      id: new Date().getUTCMilliseconds(),
      name: text.name,
      dob: text.dob,
      phone: text.phone,
      meet_date: text.meet_date,
      status: "Ожидает"
    }

    dispatch(addClients(newItem))
  }

  const onSubmit = (data) => {
    const res = {
      ...data,
      'dob': new Date(data.dob).toLocaleDateString('ru-RU'),
      'meet_date': new Date(data.meet_date).toLocaleDateString('ru-RU')
    }

    reset()
    return addItem(res)
  }

  return (
    <Modal
      title='Запись на прием'
      className='modal-form'
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={[
        <input form='myForm' key="submit" onSubmit={handleOk} type="submit" disabled={!isValid}
               value='Сохранить'/>
      ]}
    >

      <form id='myForm' onSubmit={handleSubmit(onSubmit)}>
        <label>
          *Имя пациента:
          <input
            {...register(
              'name',
              {
                required: "Имя обязательно к заполнению",
                minLength: {
                  value: 5,
                  message: 'Минимум 5 символов'
                },
                pattern: {
                  value: /^[A-Za-zА-Яа-яЁё ]+$/,
                  message: 'Только буквы'
                }

              }
            )}
          />
        </label>
        <div>
          {errors?.name && <p>{errors?.name?.message || "Ошибка"}</p>}
        </div>
        <label>
          *Дата рождения:
          <input
            type='date'
            {...register(
              'dob',
              {
                required: 'Дата рождения обязательно'
              }
            )}
          />
        </label>
        <div>
          {errors?.dob && <p>{errors?.dob?.message || "Ошибка"}</p>}
        </div>

        <label>
          *Номер телефона:
          <Controller
            name="phone"
            defaultValue=''
            control={control}
            rules={{
              required: true,
            }
            }
            render={({field}) => (
              <MaskedInput
                mask="+\9\96 (999) 99-99-99"
                maskChar=""
                value={field.value}
                onChange={field.onChange}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    placeholder="+996 (000) 00-00-00"
                    type="text"
                  />
                )}
              </MaskedInput>
            )}
          />
        </label>
        <div>
          {errors.phone && <p>{errors?.phone?.message}</p>}
        </div>
        <label>
          *Дата посещения:
          <input
            type='date'
            {...register(
              'meet_date',
              {
                required: 'Дата посещения обязательно'
              }
            )}
          />
        </label>
        <div>
          {errors?.meet_date && <p>{errors?.meet_date?.message || "Ошибка"}</p>}
        </div>
      </form>

    </Modal>
  );
};

export default ModalForm;