import React from 'react';
import {Controller, useForm} from "react-hook-form";
import MaskedInput from "react-input-mask";

const InputPhoneMask = ({err = null, required, defaultValue = '', onChange = null}) => {
  const {control} = useForm();

  return (
    <>
      <label>
        *Номер телефона:
        <Controller
          name="phone"
          defaultValue=''
          control={control}
          rules={{required}}
          render={({field}) => (
            <MaskedInput
              mask="+\9\96 (999) 99-99-99"
              maskChar=""
              value={field.value}
              onChange={field.onChange}
            >
              {(inputProps) => {
                console.log('Input:', {...inputProps})
                return (
                  <input
                    {...inputProps}
                    onChange={onChange}
                    value={defaultValue}
                    placeholder="+996 (000) 00-00-00"
                    type="text"
                  />
                )
              }}
            </MaskedInput>
          )}
        />
      </label>
      <div>
        {err.phone && <p>{err?.phone?.message}</p>}
      </div>
    </>
  );
};

export default InputPhoneMask;