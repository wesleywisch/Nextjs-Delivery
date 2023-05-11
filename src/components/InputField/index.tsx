import { HTMLInputTypeAttribute, useState } from "react";

import EyeOn from './eyeOn.svg'
import EyeOff from './eyeOff.svg'

import { Container } from "./styles";

type InputFieldProps = {
  color: string;
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
  type?: HTMLInputTypeAttribute;
  id?: string;
  error?: boolean;
}

export function InputField({ color, placeholder, value, onChange, type = 'text', id, error }: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Container tenantBorderColor={color} error={error}>
      <input
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        className="inputField"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        id={id}
      />

      {type === 'password' && (
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="showPassword"
        >
          {showPassword ? (
            <EyeOn color={'#bbb'} />
          ) : (
            <EyeOff color={'#bbb'} />
          )}
        </div>
      )}
    </Container>
  )
}
